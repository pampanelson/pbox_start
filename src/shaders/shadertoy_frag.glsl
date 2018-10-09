precision mediump float;
precision mediump int;
uniform sampler2D texture;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
varying vec2 vUv;
uniform int id;
void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    // gl_FragColor=vec4(st.x,st.y,1.0,1.0);
    // gl_FragColor=vec4(texture2D(texture,st * 0.5));
    if(id == 1){

    		gl_FragColor=vec4(texture2D(texture,vec2(vUv.x * 0.5 + 0.5,vUv.y)));

    }
    if(id == 2){

    		gl_FragColor=vec4(texture2D(texture,vec2(vUv.x * 0.5,vUv.y)));


    }
    // if(vUv.x >= 0.8){
    // 	gl_FragColor=vec4(texture2D(texture,vUv));
    // 	// gl_FragColor *= vec4(0.5,0.5,0.5,1.0);

    // }else if(vUv.x <= 0.2){
    // 	gl_FragColor=vec4(texture2D(texture,vUv));
    // 	gl_FragColor *= vec4(1.0,1.0,1.0,0.5);


    // }
    // else{
    // 	gl_FragColor=vec4(texture2D(texture,vUv));

    // }
}