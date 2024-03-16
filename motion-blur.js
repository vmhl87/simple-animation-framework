let blur_fragShader = `
precision lowp float;

uniform sampler2D iBlur;
uniform vec2 iVel;

#define iResolution vec2(X_WIDTH, X_HEIGHT)

void main(){
	vec2 pos = vec2(gl_FragCoord)/iResolution;
	vec4 mask = vec4(0);
	for(int i=0; i<6; ++i){
		mask += texture2D(iBlur, pos + (iVel/iResolution)*(float(i)-3.)/3.);
	}
	mask /= 6.;
	gl_FragColor = mask;
}
`

function compose(x, y){
	blur_shader.setUniform("iBlur", comp_buf);
	blur_shader.setUniform("iVel", [x, y]);
	blur_compositor.clear();
	blur_compositor.shader(blur_shader);
	blur_compositor.rect(0, 0, width, height);
	push(); scale(1, -1); translate(0, -height);
	image(blur_compositor, 0, height, width, -height);
	pop();
}
