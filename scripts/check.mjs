import {readFileSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
const read=file=>readFileSync(resolve(root,file),'utf8');
const stub=()=>({addEventListener(){},classList:{toggle(){}},dataset:{},focus(){},querySelector(){return stub();},reset(){},replaceChildren(){},setAttribute(){},removeAttribute(){}});
const main=stub();
const context=vm.createContext({document:{querySelector:selector=>selector==='#content'?main:stub(),querySelectorAll:()=>[],addEventListener(){},body:stub()},location:{hash:''},window:{scrollTo(){},addEventListener(){}}});
vm.runInContext(read('design-assets.js'),context,{filename:'design-assets.js'});
vm.runInContext(read('service-pages.js'),context,{filename:'service-pages.js'});
vm.runInContext(read('script.js'),context,{filename:'script.js'});
const screens=vm.runInContext('Object.fromEntries(Object.entries(pages).map(([key,page])=>[key,page.render()]))',context);
let assetCount=0;
for(const [route,html] of Object.entries(screens)){
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route+' needs one heading');
  assert.ok(!html.includes('undefined'),route+' contains undefined');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(ids).size,ids.length,route+' duplicate IDs');
  for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(screens[match[1]],route+' broken route '+match[1]);
  for(const match of html.matchAll(/src="\.\/([^"]+)"/g)){assert.ok(statSync(resolve(root,match[1])).size>0,match[1]);assetCount++;}
}
const shell=read('index.html');
for(const match of (shell+read('style.css')).matchAll(/(?:src="\.\/|href="\.\/|url\('\.\/)([^"')]+)/g))assert.ok(statSync(resolve(root,match[1])).size>0,match[1]);
assert.equal(vm.runInContext('calculateCost(0,0,0,0,2)',context),5234);
assert.equal(vm.runInContext('calculateCost(0,0,0,10,3)',context),6034);
assert.equal(vm.runInContext('calculateCost(0,0,0,-100,-5)',context),5234);
assert.equal(vm.runInContext('calculateCost(0,0,0,100000,10000)',context),284234);
assert.equal(vm.runInContext('escapeHtml("<script>")',context),'&lt;script&gt;');
assert.ok(!read('script.js').includes('www.figma.com/api/mcp/asset'),'Temporary runtime URL');
assert.ok(!read('design-assets.js').includes('https://'),'Temporary asset URL');
console.log('PASS: '+Object.keys(screens).length+' routes, '+assetCount+' image slots, local resources, calculator bounds and HTML escaping.');
