// Shared deterministic terrain: rendering and prop placement sample identical triangles.
export function coastSurface(c,random){
 const nx=Math.max(12,Math.ceil(c.width/1.2)),nz=12,edge=[],sand=[],water=[];
 const phase=random()*Math.PI*2;
 for(let i=0;i<=nx;i++){let x=c.width*i/nx;edge.push(c.shore+.6*Math.sin(x*.27+phase)+.14*Math.sin(x*.57+phase))}
 const points=[];
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
  const t=j/nz,x=-c.width/2+c.width*i/nx,z=c.back+(edge[i]-c.back)*t;
  const y=j===0?.055:j===nz?-.075:.055+Math.sin(t*Math.PI)*(.10+.035*Math.sin(x*.25+phase));
  points.push([x,y,z]);
 }
 const emit=(target,a,b,d)=>target.push(...a,...b,...d);
 for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){let a=points[j*(nx+1)+i],b=points[j*(nx+1)+i+1],d=points[(j+1)*(nx+1)+i],e=points[(j+1)*(nx+1)+i+1];emit(sand,a,b,d);emit(sand,b,e,d)}
 const nw=Math.max(7,Math.ceil(c.seaDepth/1.2)),wp=[];
 for(let j=0;j<=nw;j++)for(let i=0;i<=nx;i++){let t=j/nw;wp.push([-c.width/2+c.width*i/nx,.005,edge[i]+.5+(c.shore-c.seaDepth-edge[i]-.5)*t,t])}
 for(let j=0;j<nw;j++)for(let i=0;i<nx;i++){let a=wp[j*(nx+1)+i],b=wp[j*(nx+1)+i+1],d=wp[(j+1)*(nx+1)+i],e=wp[(j+1)*(nx+1)+i+1];emit(water,a,b,d);emit(water,b,e,d)}
 return {sand,water,edge};
}
export function sandHeight(c,x,z){let a=c.surface.sand;for(let i=0;i<a.length;i+=9){let ax=a[i],az=a[i+2],bx=a[i+3],bz=a[i+5],cx=a[i+6],cz=a[i+8],den=(bz-cz)*(ax-cx)+(cx-bx)*(az-cz),u=((bz-cz)*(x-cx)+(cx-bx)*(z-cz))/den,v=((cz-az)*(x-cx)+(ax-cx)*(z-cz))/den;if(u>=-1e-6&&v>=-1e-6&&u+v<=1.000001)return u*a[i+1]+v*a[i+4]+(1-u-v)*a[i+7]}return .055}
