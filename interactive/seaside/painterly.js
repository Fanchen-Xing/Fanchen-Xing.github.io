import * as THREE from 'three';

// Restrained shadow tint and post-tone-map saturation; no bloom or rim highlights.
export function createAtmosphere(renderer){
 const target=new THREE.WebGLRenderTarget(1,1,{type:THREE.HalfFloatType,depthBuffer:true,samples:4});
 const uniforms={saturation:{value:1.09},contrast:{value:1},source:{value:target.texture},texel:{value:new THREE.Vector2(1,1)}};
 const material=new THREE.ShaderMaterial({uniforms,depthTest:false,depthWrite:false,
 vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.0,1.0);}`,
 fragmentShader:`uniform sampler2D source;uniform vec2 texel;uniform float saturation;uniform float contrast;varying vec2 vUv;
 void main(){vec3 c=texture2D(source,vUv).rgb;
 float l=dot(c,vec3(.2126,.7152,.0722));
 c+=vec3(.010,.008,.017)*(1.0-smoothstep(.05,.6,l));

 gl_FragColor=vec4(c,1.0);
 #include <tonemapping_fragment>
 float gradedLuma=dot(gl_FragColor.rgb,vec3(.2126,.7152,.0722));
 gl_FragColor.rgb=clamp(mix(vec3(gradedLuma),gl_FragColor.rgb,saturation),0.0,1.0);
 gl_FragColor.rgb=clamp((gl_FragColor.rgb-.18)*contrast+.18,0.0,1.0);
 #include <colorspace_fragment>
 }`});
 const scene=new THREE.Scene(),camera=new THREE.Camera();scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
 return {setLook(saturation,contrast){uniforms.saturation.value=saturation;uniforms.contrast.value=contrast;},resize(w,h){const dpr=renderer.getPixelRatio();target.setSize(Math.round(w*dpr),Math.round(h*dpr));uniforms.texel.value.set(1/(w*dpr),1/(h*dpr));},render(world,view){renderer.setRenderTarget(target);renderer.render(world,view);renderer.setRenderTarget(null);renderer.render(scene,camera);}};
}