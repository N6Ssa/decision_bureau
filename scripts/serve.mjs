import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ttf':'font/ttf','.json':'application/json'};
const server=http.createServer(async(req,res)=>{
  try {
    let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(pathname.startsWith('/decision_bureau/'))pathname=pathname.slice('/decision_bureau'.length);
    const target=resolve(root,'.'+(pathname.endsWith('/')?pathname+'index.html':pathname));
    if(!target.startsWith(root+sep))throw new Error('Outside root');
    if(!(await stat(target)).isFile())throw new Error('Not a file');
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream','Cache-Control':'no-store'});
    res.end(await readFile(target));
  }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/decision_bureau/'));
