import * as THREE from 'three';
export const shopNames=['SURF CLUB','SEA CAFE','SALT & SUN','THE PIER','CORAL BAR','COASTAL','ICE CREAM','PALM INN','WAVE SHOP','BAKERY','FISH HOUSE','SUN MARKET'];
const vertical=['SURF','CAFE','SALT','PIER','CORL','COAS','ICES','PALM','WAVE','BAKE','FISH','SAND'];
export function signMaterials(){const result={};for(let i=0;i<12;i++)for(let j=-1;j<4;j++){let id=j<0?i:100+i*4+j,text=j<0?shopNames[i]:vertical[i][j],canvas=document.createElement('canvas');canvas.width=j<0?1024:128;canvas.height=128;let ctx=canvas.getContext('2d');ctx.fillStyle='#fff7df';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${j<0?88:110}px Arial, sans-serif`;ctx.fillText(text,canvas.width/2,68,canvas.width*.94);let map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;result['glyph'+id]=new THREE.MeshStandardMaterial({map,transparent:true,alphaTest:.1,roughness:1,side:THREE.DoubleSide})}return result}
export function coastalGeometry(){const leaf=new THREE.BufferGeometry();leaf.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,.5,.3,-.17,.5,.3,.17,.5,.3,-.17,1.15,-.22,0,.5,.3,.17],3));leaf.computeVertexNormals();const sail=new THREE.BufferGeometry();sail.setAttribute('position',new THREE.Float32BufferAttribute([0,1,0,1,0,0,Math.SQRT1_2,0,Math.SQRT1_2],3));sail.computeVertexNormals();const ringSegment=new THREE.TorusGeometry(.4,.13,6,4,Math.PI/4);ringSegment.rotateX(-Math.PI/2);return {leaf,sail,ringSegment}}
export function oceanMaterial(){return new THREE.ShaderMaterial({uniforms:{time:{value:0},shallow:{value:new THREE.Color(0x87bdb7)},deep:{value:new THREE.Color(0x548f9c)}},side:THREE.DoubleSide,vertexShader:`attribute float coastDepth;varying float vDepth;varying vec3 vWorld;uniform float time;
void main(){vDepth=coastDepth;vec3 p=position;p.y+=(sin(p.x*.9+p.z*.8+time*.7)+sin(p.x*.4-p.z*.7-time*.5))*.04*smoothstep(0.0,.18,coastDepth);vWorld=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,fragmentShader:`varying float vDepth;varying vec3 vWorld;uniform float time;uniform vec3 shallow;uniform vec3 deep;
void main(){vec3 c=mix(shallow,deep,smoothstep(0.0,.85,vDepth));float wave=sin(vWorld.x*.9+vWorld.z*.8+time*.7)+sin(vWorld.x*.4-vWorld.z*.7-time*.5);c*=1.0+wave*.018;float foam=1.0-smoothstep(.006,.021,abs(vDepth-(.020+.008*sin(time*.7+vWorld.x*.5))));c=mix(c,vec3(.82,.91,.84),foam*.4);gl_FragColor=vec4(c,1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`})}
const sandMaterial=new THREE.MeshStandardMaterial({color:0xe7d7b7,roughness:1,flatShading:false,side:THREE.DoubleSide});
export function oceanMesh(coast,material){
 const group=new THREE.Group(),surface=coast.surface,positions=[],depths=[];
 for(let i=0;i<surface.water.length;i+=4){positions.push(...surface.water.slice(i,i+3));depths.push(surface.water[i+3])}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('coastDepth',new THREE.Float32BufferAttribute(depths,1));g.computeVertexNormals();const waterMesh=new THREE.Mesh(g,material);waterMesh.userData.coastOwned=true;group.add(waterMesh);
 // Weld shared vertices before computing normals: continuous shading across triangles.
 const sand=new THREE.BufferGeometry(),unique=[],indices=[],lookup=new Map();
 for(let i=0;i<surface.sand.length;i+=3){const p=surface.sand.slice(i,i+3),key=p.join(',');let index=lookup.get(key);if(index===undefined){index=unique.length/3;lookup.set(key,index);unique.push(...p)}indices.push(index)}
 sand.setAttribute('position',new THREE.Float32BufferAttribute(unique,3));sand.setIndex(indices);sand.computeVertexNormals();const beach=new THREE.Mesh(sand,sandMaterial);beach.receiveShadow=true;beach.userData.coastOwned=true;beach.userData.coastSand=true;group.add(beach);
 return group;
}
