import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {tmpdir} from 'node:os';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const base=process.env.SITE_URL||'http://127.0.0.1:4173/decision_bureau/';
const screenshots=resolve(tmpdir(),'decision-bureau-qa');
await mkdir(screenshots,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
const routes=['home','approach','services','business','individual','rates','calculator','reviews','contacts','ndfl','debt','staff','optimization','registration','inspections','recovery','audit','sbis','foreign-accounts','foreign-companies','foreign-report'];
const sections=new Set(['home','approach','services','business','individual','rates','calculator','reviews','contacts']);
const errors=[];
const results=[];
try {
  const page=await browser.newPage({viewport:{width:1280,height:1156},deviceScaleFactor:1});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)errors.push(response.status()+' '+response.url());});
  for(const width of [1280,768,390,320]){
    await page.setViewportSize({width,height:1156});
    for(const route of routes){
      await page.goto(base+'#'+route);
      await page.waitForSelector('main[data-page="'+(sections.has(route)?'home':route)+'"]');
      await page.evaluate(()=>document.fonts.ready);
      const geometry=await page.evaluate(async()=>{
        await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
        return {
          width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
          overflowing:[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,class:el.className,right:el.getBoundingClientRect().right})).slice(0,12),
          headings:document.querySelectorAll('main h1').length,
          broken:[...document.images].filter(img=>!img.naturalWidth).map(img=>img.src),
          images:[...document.querySelectorAll('main img')].map(img=>({src:img.getAttribute('src'),width:img.getBoundingClientRect().width,height:img.getBoundingClientRect().height})),
          fonts:document.fonts.check('16px Inter'),
          clippedText:[...document.querySelectorAll('.card > p,.sbis-card > p,.review-card > p')].filter(p=>{
            const parent=p.parentElement.getBoundingClientRect(),text=p.getBoundingClientRect();
            return text.bottom>parent.bottom+3||text.left<parent.left-3||text.right>parent.right+3;
          }).map(p=>p.textContent.slice(0,80)),
          footerTop:document.querySelector('footer').getBoundingClientRect().top+scrollY
        };
      });
      assert.equal(geometry.headings,1,route+' heading');
      assert.deepEqual(geometry.broken,[],route+' broken images');
      assert.ok(geometry.scrollWidth<=width,route+' horizontal overflow at '+width+': '+geometry.scrollWidth+' '+JSON.stringify(geometry.overflowing));
      assert.ok(geometry.fonts,route+' missing Inter');
      assert.deepEqual(geometry.clippedText,[],route+' card text exceeds its container at '+width);
      for(const img of geometry.images){
        assert.ok(img.width>0&&img.height>0,route+' zero image slot '+img.src);
        if(img.src.endsWith('.svg'))assert.ok(img.width<=100&&img.height<=100,route+' unexpectedly enlarged icon '+img.src);
      }
      results.push({route,width,...geometry});
      await page.screenshot({path:join(screenshots,route+'-'+width+'.png'),fullPage:!sections.has(route)||route==='home'});
    }
  }
  await page.setViewportSize({width:1280,height:1156});
  await page.goto(base+'#calculator');
  await page.waitForSelector('#cost');
  assert.equal(await page.locator('#cost').textContent(),'5234 ₽');
  await page.locator('#operations').fill('10');
  await page.locator('#employees').fill('3');
  await page.locator('#employees').press('Tab');
  assert.equal(await page.locator('#cost').textContent(),'6034 ₽');
  await page.getByRole('button',{name:'оставить заявку',exact:true}).click();
  await page.waitForSelector('dialog[open]');
  assert.ok((await page.locator('#request-comment').inputValue()).includes('6034'));
  await page.locator('#request-name').fill('Проверка');
  await page.locator('#request-phone').fill('+7 000 000 00 00');
  await page.getByRole('button',{name:'отправить',exact:true}).click();
  const mail=await page.locator('#request-form .form-status a').getAttribute('href');
  assert.ok(mail.startsWith('mailto:buroresh01@mail.ru?'));
  assert.ok(decodeURIComponent(mail).includes('Проверка'));
  await page.screenshot({path:join(screenshots,'request-dialog.png')});
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('dialog[open]').count(),0);
  await page.locator('.header a[href="#contacts"]').click();
  await page.locator('.header a[href="#calculator"]').click();
  assert.equal(await page.locator('#operations').inputValue(),'10','Anchor navigation must retain calculator state');
  await page.locator('.header a[href="#services"]').click();
  assert.equal(await page.locator('#contacts').count(),1,'Landing retains all main sections in one document');
  await page.goto(base+'#rates');
  await page.locator('.landing-rate').nth(1).locator('summary').click();
  assert.ok(await page.locator('.landing-rate').nth(1).locator('.landing-rate-content').isVisible());
  await page.goto(base+'#contacts');
  await page.locator('.city-selector summary').click();
  await page.getByRole('button',{name:'Иркутск',exact:true}).click();
  await page.waitForSelector('dialog[open]');
  assert.ok((await page.locator('#request-comment').inputValue()).includes('Иркутск'));
  await page.keyboard.press('Escape');
  await page.locator('#contact-name').fill('Проверка');
  await page.locator('#contact-phone').fill('+7 000 000 00 00');
  await page.getByRole('button',{name:'Отправить заявку',exact:true}).click();
  assert.ok((await page.locator('#contact-form .form-status').textContent()).includes('Заявка ещё не отправлена'));
  await page.goto(base+'#business');
  await page.getByRole('link',{name:'СБИС',exact:true}).click();
  await page.waitForSelector('main[data-page="sbis"]');
  await page.goBack();
  await page.waitForSelector('main[data-page="home"]');
  assert.equal(await page.locator('#business').count(),1);
  await page.goto(base+'#constructor');
  await page.waitForSelector('main[data-page="home"]');
  assert.deepEqual(errors,[],'Browser errors');
  await writeFile(join(screenshots,'results.json'),JSON.stringify(results,null,2));
  console.log('PASS: 21 screens × 4 viewport widths; images, fonts, overflow, calculator, dialogs, email preparation, navigation and browser history. Screenshots: '+screenshots);
} finally {await browser.close();}
