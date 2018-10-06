// Sets precision for float and int types
precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec3 position;
attribute vec4 color;

// Passed to fragment shader
varying vec3 vPosition;
varying vec4 vColor;

void main()	{
// Assign varyings for fragment shader
	vPosition = position;
	vColor = color;

// some kind of boilerplate to set clipcoords
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}