#version 330 core

in vec2 v_texcoord;
uniform float u_time;

#define PI 3.14159265358979323846

// Get an RGB colour with the given hue, where x is the hue in radians
// (from 0 to 2 * pi)
vec3 hueToRgb(float x)
{
    vec3 rgb = cos(x - PI * 2 * vec3(0., 0.333333333333, 0.666666666666)) + .5;
    /*
    float r = cos(x) + .5;
    float g = cos(x - PI * 2 * .333333333333333333) + .5;
    float b = cos(x - PI * 2 * .666666666666666666) + .5;
    return clamp(vec3(r, g, b), 0., 1.);
    */
    return clamp(rgb, 0., 1.);
}

vec3 applyLightness(float lightness, vec3 colour)
{
    vec3 toMix = vec3(step(.5, lightness));
    float mixFactor = abs(lightness * 2. - 1.);
    return mix(colour, toMix, mixFactor);
}

vec3 applyValue(float value, vec3 colour)
{
    return colour * value;
}

vec3 applySaturation(float sat, vec3 colour)
{
    vec3 rgbFactors = vec3(0.5, 0.625, 0.25);
    float gray = length(colour * rgbFactors);
    // float gray = dot(colour, vec3(1.));
    return mix(colour, vec3(gray), 1. - sat);
}

void main()
{
    float h = v_texcoord.x * PI * 2;
    float l = v_texcoord.y;
    // vec3 c = mix(hueToRgb(h), vec3(0.), v);
    vec3 c = applyLightness(l, hueToRgb(h));
    c = applySaturation((sin(u_time) + 1) * .5, c);
    gl_FragColor = vec4(c, 1.);
}
