const {chromium}=require('C:/Users/bexxx/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const base=process.argv[2]||'http://127.0.0.1:3000';
 fs.mkdirSync('qa',{recursive:true}); const report=[];
 for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:width===1440?960:844},isMobile:width<600,hasTouch:width<600});
  const page=await context.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  const res=await page.goto(base,{waitUntil:'networkidle'}); await page.waitForTimeout(2200);
  await page.screenshot({path:`qa/hero-${width}.png`});
  const initial=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,heading:document.querySelector('h1').getBoundingClientRect().toJSON(),links:Array.from(document.querySelectorAll('a')).map(a=>({label:a.textContent.trim(),href:a.getAttribute('href')}))}));
  if(width<600){
   await page.getByRole('button',{name:'Открыть меню'}).click(); await page.waitForTimeout(950); await page.screenshot({path:`qa/menu-${width}.png`});
   await page.keyboard.press('Escape'); await page.waitForTimeout(950);
   await page.getByRole('button',{name:'Открыть меню'}).click(); await page.waitForTimeout(950);
   await page.getByRole('navigation',{name:'Мобильная навигация'}).getByRole('link',{name:'Работы',exact:true}).click(); await page.waitForTimeout(1300);
  }
  for(const id of ['services','gallery','studio','pricing','contact','location']){
   await page.locator('#'+id).scrollIntoViewIfNeeded(); await page.waitForTimeout(1400); await page.screenshot({path:`qa/${id}-${width}.png`});
  }
  await page.locator('#services').scrollIntoViewIfNeeded();
  for(const label of ['Автовинил','Пошив и перешив салона','Полировка']){await page.getByRole('button',{name:new RegExp(label)}).click(); await page.waitForTimeout(900);}
  await page.locator('#pricing').scrollIntoViewIfNeeded();
  for(const f of ['Кузов','Салон','Стиль','Все']){await page.getByRole('button',{name:f,exact:true}).click(); await page.waitForTimeout(700); if(await page.getByRole('button',{name:f,exact:true}).getAttribute('aria-pressed')!=='true')throw Error('Filter failed');}
  const imgs=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.getBoundingClientRect().width>0&&i.getBoundingClientRect().height>0).map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0,width:i.naturalWidth,renderWidth:i.getBoundingClientRect().width})));
  const badAnchors=await page.locator('a[href^="#"]').evaluateAll(as=>as.filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')));
  await page.screenshot({path:`qa/full-${width}.png`,fullPage:true});
  report.push({width,status:res.status(),initial,imgs,badAnchors,errors}); await context.close();
 }
 const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}); const rp=await reduced.newPage(); await rp.goto(base,{waitUntil:'networkidle'}); await rp.waitForTimeout(500); await rp.screenshot({path:'qa/reduced-motion.png'}); await reduced.close();
 fs.writeFileSync('qa/report.json',JSON.stringify(report,null,2)); console.log(JSON.stringify(report.map(r=>({width:r.width,status:r.status,overflow:r.initial.overflow,brokenImages:r.imgs.filter(i=>!i.loaded),badAnchors:r.badAnchors,errors:r.errors})),null,2)); await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
