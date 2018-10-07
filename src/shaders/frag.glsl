precision mediump float;
precision mediump int;

uniform float time;

varying vec2 vUv;
uniform sampler2D texture0;

varying vec3 vPosition;
varying vec4 vColor;

void main()	{
// Grab vertex color
	//vec4 color = vec4( vColor );
// Alter red channel 
	//color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

	vec4 color = texture2D( texture0 , vPosition.xy + vec2(0.5,0.5));
	//vec4 color = texture2D( texture0 , gl_FragCoord.xy);
// Set fragment color
	gl_FragColor = color;
}