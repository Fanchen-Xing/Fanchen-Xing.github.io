import {generate} from './generator.js';
onmessage=e=>{let start=performance.now();try{let result=generate(e.data.params);postMessage({id:e.data.id,...result,ms:performance.now()-start},[...Object.values(result.batches),...Object.values(result.themeRoles)].map(x=>x.buffer))}catch(error){postMessage({id:e.data.id,error:error.message})}};
