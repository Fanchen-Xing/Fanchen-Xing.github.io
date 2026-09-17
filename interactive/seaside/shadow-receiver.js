import * as THREE from 'three';

// PCF compares neighbouring texels against one depth. On sloping surfaces this
// creates repeated self-shadow bands; account for the receiver's depth slope.
export function stabilizeShadows(material){
 const chunk=THREE.ShaderChunk.shadowmap_pars_fragment.replace(
  'shadowCoord.z += shadowBias;',
  `vec3 receiverDx=dFdx(shadowCoord.xyz);
   vec3 receiverDy=dFdy(shadowCoord.xyz);
   float receiverDet=receiverDx.x*receiverDy.y-receiverDx.y*receiverDy.x;
   vec2 receiverSlope=vec2(0.0);
   if(abs(receiverDet)>1e-12){
    receiverSlope=vec2(receiverDx.z*receiverDy.y-receiverDy.z*receiverDx.y,
      receiverDx.x*receiverDy.z-receiverDy.x*receiverDx.z)/receiverDet;
   }
   float receiverBias=min(dot(abs(receiverSlope),1.5/shadowMapSize),0.004);
   shadowCoord.z += shadowBias-receiverBias;`
 );
 material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace('#include <shadowmap_pars_fragment>',chunk)};
 material.customProgramCacheKey=()=> 'slope-corrected-shadow-v1';
 return material;
}
