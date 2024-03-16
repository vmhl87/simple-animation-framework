let bg_fragShader = `
precision lowp float;

uniform float iTime;

#define PI 3.14159
#define iResolution vec2(X_WIDTH, X_HEIGHT);

void main(){
	vec2 pos = vec2(gl_FragCoord)/iResolution;
	vec3 col = vec3(1, 1, 1);
	for(int i=0; i<3; ++i){
		float cl = .5+sin(iTime/200. + float(i)*2.*PI/3.)/2.;
		cl = cl + (.5-cl)*2.*pos[i];
		col[i] *= cl;
	}
	float t = col[2]; col[2] = col[1]; col[1] = t;
	col = vec3(1) - (vec3(1) - col)*.5;
	gl_FragColor=vec4(col, 1);
}
`
