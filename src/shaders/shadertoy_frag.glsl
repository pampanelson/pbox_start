precision mediump float;
precision mediump int;
uniform sampler2D texture;
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
varying vec2 vUv;
void main() {
    vec2 st = gl_FragCoord.xy/iResolution.xy;
    // gl_FragColor=vec4(st.x,st.y,1.0,1.0);
    // gl_FragColor=vec4(texture2D(texture,st * 0.5));
    // if(vUv.x >= 0.5){
    	gl_FragColor=vec4(texture2D(texture,vUv));

    // }
}