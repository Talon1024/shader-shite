#version 330 core
// #define SHADERTOY
#ifdef SHADERTOY

#define INPUT_TEXTURE iChannel0
#define MOUSE_POS iMouse.xy
#define VIEW_RESOLUTION iResolution.xy
#define OUTPUT fragColor
#define TEXCOORD fragCoord/iResolution.xy
#define TIMER iTime

#else

#define INPUT_TEXTURE u_scene
#define MOUSE_POS u_mouse
#define VIEW_RESOLUTION u_resolution
#define OUTPUT gl_FragColor
#define TEXCOORD v_texcoord
#define TIMER u_time

uniform sampler2D INPUT_TEXTURE;
uniform vec2 VIEW_RESOLUTION;
uniform vec2 MOUSE_POS;
uniform float TIMER;

in vec2 TEXCOORD;

#endif

#define BLUR_SAMPLES 3
#define MAX_ROTATION .125
#define BLUR_MIX_FACTOR .25

#ifdef SHADERTOY
void mainImage(out vec4 fragColor, in vec2 fragCoord)
#else
void main()
#endif
{
    vec4 colour = texture(INPUT_TEXTURE, TEXCOORD);
    vec2 mousePos = MOUSE_POS / VIEW_RESOLUTION * 2. - 1.;
    /*
    float ef1 = min(v_texcoord.x, v_texcoord.y);
    float ef2 = 1 - max(v_texcoord.x, v_texcoord.y);
    float edgeFactor = min(ef1, ef2) * 2;
    */
    for (int i = BLUR_SAMPLES - 1; i >= 0; i--)
    {
        float th = mousePos.x * float(i + 1) * MAX_ROTATION;
        mat2 rotation = mat2(cos(th), sin(th), -sin(th), cos(th));
        vec2 rotUv = TEXCOORD;
        rotUv -= .5; // Set rotation pivot point
        rotUv = rotation * rotUv; // Rotate
        rotUv += .5; // Don't show the bottom of the screen
        vec4 blurred = texture(INPUT_TEXTURE, rotUv);
        colour = mix(colour, blurred, abs(sin(TIMER)) * BLUR_MIX_FACTOR);
    }
    OUTPUT = colour;
}
