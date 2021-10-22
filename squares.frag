#version 330 core

#define SQUARES_X 8
#define SQUARES_Y 8

in vec2 v_texcoord;
uniform float u_time;

/*
420.13420
67.1397513
.0148991047
2.2498452
31.4958425
84.27945792
*/

float random(float seed)
{
    return mod((pow(67.1397513 * seed, .25) * sin(seed * 2.134224860) - 31.4958425) * 2.2498452, 1.);
}

void main()
{
    vec2 squares = vec2(SQUARES_X, SQUARES_Y);
    ivec2 whichSquare = ivec2(floor(v_texcoord * squares));
    int squareIndex = whichSquare.y * SQUARES_X + whichSquare.x;
    vec2 squareCoord = mod(v_texcoord * squares, 1.);
    vec2 sqrCenCoord = squareCoord - .5;
    vec2 sqrMenCoord = abs(squareCoord - .5) * 2.;
    float centdistthreshold = 0.8803590331;
    float peofs = (max(sqrMenCoord.x, sqrMenCoord.y) ) * random(float(squareIndex) + u_time * 0.015625);
    gl_FragColor = vec4(vec3(peofs), 1.);
}
