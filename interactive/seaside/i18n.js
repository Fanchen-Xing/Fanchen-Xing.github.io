const dictionary=await fetch('./translations.json').then(r=>r.json());
let language='zh';
export const translate=text=>language==='en'?(dictionary[text]??text):text;
export function installLanguage(onChange){
 const originals=new WeakMap(),attributes=new WeakMap();let observer;
 const render=()=>{observer?.disconnect();const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=walker.nextNode()){if(['SCRIPT','STYLE'].includes(n.parentElement?.tagName)||n.parentElement?.id==='language')continue;let record=originals.get(n);if(!record||![record.zh,record.en].includes(n.nodeValue)){const raw=n.nodeValue,key=raw.trim();record={zh:raw,en:dictionary[key]?raw.replace(key,dictionary[key]):raw};originals.set(n,record);}const value=record[language];if(n.nodeValue!==value)n.nodeValue=value;}
 for(const el of document.querySelectorAll('[title],[aria-label],[placeholder]')){let saved=attributes.get(el)||{};for(const attr of ['title','aria-label','placeholder'])if(el.hasAttribute(attr)){let raw=el.getAttribute(attr),r=saved[attr];if(!r||![r.zh,r.en].includes(raw))saved[attr]={zh:raw,en:dictionary[raw]??raw};el.setAttribute(attr,saved[attr][language]);}attributes.set(el,saved);}
 document.documentElement.lang=language==='en'?'en':'zh-CN';document.title=translate('海岸工坊 · 程序化街区生成器');const button=document.getElementById('language');button.textContent=language==='en'?'中文':'EN';button.setAttribute('aria-pressed',String(language==='en'));observer?.observe(document.body,{subtree:true,childList:true,characterData:true});};
 observer=new MutationObserver(render);
 document.getElementById('language').onclick=()=>{language=language==='zh'?'en':'zh';render();onChange();};render();
}
