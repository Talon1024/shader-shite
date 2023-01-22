#version 330 core
in vec2 v_texcoord;
out vec4 FragColor;
uniform float thickness = 0.0625;

// Anti-aliased line
void main() {
	float dist = abs(.5 - v_texcoord.x) * 2.;
	float factor = 1. / (1. - thickness);
	if (thickness > 0.) {
		dist = max(0., dist - thickness) * factor;
	}
	vec4 colour = vec4(vec3(dist), 1.);
	FragColor = colour;
}
