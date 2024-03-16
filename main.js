let bg_shader, blur_shader,
		dim = [400, 600],
		bg_compositor, blur_compositor,
		comp_buf;

let textObjects = [];

let im;

// let rec, chunks = [], recording = false;

function setup(){
	createCanvas(...dim); noStroke();
	comp_buf = createGraphics(...dim);
	bg_compositor = createGraphics(...dim, WEBGL);
	blur_compositor = createGraphics(...dim, WEBGL);
	textAlign(CENTER, CENTER); comp_buf.textAlign(CENTER, CENTER);
	
	/* screen cap
		let stream = document.querySelector('canvas').captureStream(60);
		frameRate(40);

		rec = new MediaRecorder(stream);
		rec.ondataavailable = function(e){
			if(e.data.size) chunks.push(e.data);
		}
		rec.onstop = function(){
			let blob = new Blob(chunks, { 'type' : 'video/webm' });
			let videoElement = document.createElement('video');
			videoElement.setAttribute("id", Date.now());
			videoElement.controls = true;
			document.body.appendChild(videoElement);
			videoElement.src = window.URL.createObjectURL(blob);
			let url = URL.createObjectURL(blob);
			let a = document.createElement('a');
			document.body.appendChild(a);
			a.style = 'display: none';
			a.href = url;
			a.download = 'newVid.webm';
			a.click();
			window.URL.revokeObjectURL(url);
		}
	*/
	
	// intro
	textObjects.push(new textObject("New York Times", -150, 200).move(200, 200, 1, 2).move(199, 200, 3.4, 3.5).move(200, 200, 3.5, 3.6)
									 .move(201, 200, 3.9, 4).move(200, 200, 4, 4.1).move(201, 200, 4.4, 4.5).move(200, 200, 4.5, 4.6)
									 .move(200, -200, 6, 7).textSize(30).rotate(-3));
	textObjects.push(new textObject("V.S.", 500, 300).move(200, 300, 1.75, 2.75).move(199, 300, 3.4, 3.5).move(200, 300, 3.5, 3.6)
									 .move(201, 300, 3.9, 4).move(200, 300, 4, 4.1).move(201, 300, 4.4, 4.5).move(200, 300, 4.5, 4.6)
									 .move(200, -100, 6.3, 7.3).rotate(7).textSize(40));
	textObjects.push(new textObject("U", -200, 400).move(155, 400, 2.75, 3.75).move(155, -150, 6.6, 7.6).textSize(50));
	textObjects.push(new textObject(".S", 500, 400).move(194, 400, 3.25, 4.25).move(194, -150, 6.6, 7.6).textSize(50));
	textObjects.push(new textObject(".A", 550, 400).move(238, 400, 3.75, 4.75).move(238, -150, 6.6, 7.6).textSize(50));
	
	// summary of event
	textObjects.push(new textObject("In 1971, the New York Times", 200, 700).move(200, 403, 7.3, 8.3).move(-180, 403, 14, 15).textSize(25));
	textObjects.push(new textObject("published classified documents", 200, 730).move(200, 434.3, 7.6, 8.6).move(-180, 434.3, 14.3, 15.3).textSize(25));
	textObjects.push(new textObject("about US military activity in", 200, 750).move(200, 465.7, 7.9, 8.9).move(-180, 465.7, 14.6, 15.6).textSize(25));
	textObjects.push(new textObject("the Vietnam war.", 200, 780).move(200, 497, 8.2, 9.2).move(-180, 497, 14.9, 15.9).textSize(25));
	
	textObjects.push(new textObject("The Pentagon Papers, as they", 580, 403).move(200, 403, 14.9, 15.9).move(-180, 403, 22, 23).textSize(25));
	textObjects.push(new textObject("were called, had been copied by", 580, 434.3).move(200, 434.3, 15.2, 16.2).move(-180, 434.3, 22.3, 23.3).textSize(25));
	textObjects.push(new textObject("reporter Neil Sheehan against the", 580, 465.7).move(200, 465.7, 15.5, 16.5).move(-180, 465.7, 22.6, 23.6).textSize(25));
	textObjects.push(new textObject("writer's request.", 580, 497).move(200, 497, 15.8, 16.8).move(-180, 497, 22.9, 23.9).textSize(25));
	
	textObjects.push(new textObject("The government did not like that", 580, 403).move(200, 403, 22.9, 23.9).move(-180, 403, 29, 30).textSize(25));
	textObjects.push(new textObject("these papers were published, and", 580, 434.3).move(200, 434.3, 23.2, 24.2).move(-180, 434.3, 29.3, 30.3).textSize(25));
	textObjects.push(new textObject("ordered the Times to take them", 580, 465.7).move(200, 465.7, 23.5, 24.5).move(-180, 465.7, 29.6, 30.6).textSize(25));
	textObjects.push(new textObject("down, citing the Espionage Act.", 580, 497).move(200, 497, 23.8, 24.8).move(-180, 497, 29.9, 30.9).textSize(25));
	
	textObjects.push(new textObject("Did these actions violate the First", 580, 465.7).move(200, 465.7, 30.2, 31.2).move(-180, 465.7, 36.3, 37.3).textSize(25));
	textObjects.push(new textObject("Amendment right to free press?", 580, 497).move(200, 497, 30.5, 31.5).move(-180, 497, 36.6, 37.6).textSize(25));
	
	// espionage act clause
	textObjects.push(new textObject(
		"Whoever having unauthorized possession of, access to, or control over any document, writing, code book, signal book, sketch, photograph, photographic negative, blueprint, plan, map, model, instrument, appliance, or note relating to the national defense, or information relating to the national defense which information the possessor has reason to believe could be used to the injury of the United States or to the advantage of any foreign nation, willfully communicates, delivers, transmits or causes to be communicated, delivered, or transmitted, or attempts to communicate, deliver, transmit or cause to be communicated, delivered, or transmitted the same to any person not entitled to receive it, or willfully retains the same and fails to deliver it to the officer or employee of the United States entitled to receive it [shall be fined under this title or imprisoned not more than ten years, or both].",
		200, -300
	).move(200, 200, 26, 27).move(200, -300, 36.6, 37.6).setBounds(350, 500).textSize(15));
	
	// opinion reveal!
	textObjects.push(new textObject("The Supreme court ruled...", 200, -150).move(200, 150, 37, 38)
									 .move(200, -100, 44, 45).textSize(25));
	textObjects.push(new textObject("Yes!", 200, 700).move(200, 220, 38, 38.5)
									 .move(200, -100, 44.3, 45.3).textSize(40).rotate(-10));
	textObjects.push(new textObject("(6-3)", 200, 700).move(200, 270, 38.2, 38.7)
									 .move(200, -100, 44.5, 45.5).textSize(20));
	
	textObjects.push(new textObject("The court decided that the New", 200, 700).move(200, 353, 39.5, 40.5)
									 .move(200, -100, 44.8, 45.8).textSize(25));
	textObjects.push(new textObject("York Times's publication was not", 200, 700).move(200, 384.3, 39.8, 40.8)
									 .move(200, -100, 45.1, 46.1).textSize(25));
	textObjects.push(new textObject("a clear and immediate danger and", 200, 700).move(200, 415.7, 40.1, 41.1)
									 .move(200, -100, 45.4, 46.4).textSize(25));
	textObjects.push(new textObject("could not be suppressed.", 200, 700).move(200, 447, 40.4, 41.4)
									 .move(200, -100, 45.7, 46.7).textSize(25));
	
	// opinions
	textObjects.push(new textObject("Opinions:", 200, 700).move(200, 100, 46, 47).move(-180, 100, 61, 62).textSize(30));
	
	textObjects.push(new textObject("Justice William Douglas argued that the First Amendment freedom of press was meant as "+
																	"a way to keep the government in check, and so, the government could not restrict the press.", 580, 230)
									 .move(200, 230, 47, 48).move(-180, 230, 53, 54).setBounds(350, 500).textSize(20));
	textObjects.push(new textObject("He said that the 'potential danger' argument was only applicable in specific situations, "+
																	"such as publishing the location of ships in wartime.", 580, 380)
									 .move(200, 380, 47.6, 48.6).move(-180, 380, 53.6, 54.6).textSize(20).setBounds(350, 500));
	
	textObjects.push(new textObject("However, Chief Justice Warren E. Burger disagreed.", 580, 320)
									 .move(200, 320, 54, 55).move(-180, 320, 56, 57).textSize(25).setBounds(350, 500).rotate(5));
	
	textObjects.push(new textObject("He said that there had not been enough investigation into the repercussions of "+
																	"the publication, and that a decision could not be made.", 580, 230).move(200, 230, 56.6, 57.6)
									 .move(-180, 230, 61.6, 62.6).textSize(20).setBounds(350, 500));
	textObjects.push(new textObject("Additionally, he said that the New York Times was in the wrong and should have "+
																	"considered the impacts of publishing the piece, but that there was not grounds "+
																	"for a charge.", 580, 380).move(200, 380, 57.2, 58.2)
									 .move(-180, 380, 62.2, 63.2).textSize(20).setBounds(350, 500));
	
	// resolution & future impact
	textObjects.push(new textObject("In the end, the New York Times was allowed to resume publishing the Pentagon Papers.", 580, 300)
								 	.move(200, 300, 62.5, 63.5).move(200, 800, 66, 67).textSize(25).setBounds(350, 500));
	
	textObjects.push(new textObject("Future impact:", 200, -100).move(200, 150, 66.5, 67.5)
									.move(200, -100, 75, 76).textSize(25));
	
	textObjects.push(new textObject("The Supreme Court's decision clarified", 580, 250)
									 .move(200, 250, 67, 68).move(-180, 250, 75, 76).textSize(20));
	textObjects.push(new textObject("what the government could and could", -180, 250)
									 .move(200, 276, 67, 68).move(580, 250, 75, 76).textSize(20));
	textObjects.push(new textObject("not censor, and what it meant for", 580, 250)
									 .move(200, 302, 67, 68).move(-180, 250, 75, 76).textSize(20));
	textObjects.push(new textObject("something to be harmful.", -180, 250)
									 .move(200, 328, 67, 68).move(580, 250, 75, 76).textSize(20));
	
	textObjects.push(new textObject("Additionally, this incident served as a", 580, 410)
									.move(200, 410, 71, 72).move(-180, 410, 75, 76).textSize(20));
	textObjects.push(new textObject("reminder to the press to be careful of", -180, 410)
									.move(200, 436, 71, 72).move(580, 410, 75, 76).textSize(20));
	textObjects.push(new textObject("what they publish, and to think about", 580, 410)
									.move(200, 462, 71, 72).move(-180, 410, 75, 76).textSize(20));
	textObjects.push(new textObject("potential side effects.", -180, 410)
									.move(200, 488, 71, 72).move(580, 410, 75, 76).textSize(20));
	
	// credits/sources
	textObjects.push(new textObject("Thanks for watching!", 200, -100).move(200, 100, 76, 77).textSize(30));
	
	textObjects.push(new textObject("Sources:", 200, 720).move(200, 170, 75, 80).textSize(20));
	textObjects.push(new textObject("\"New York Times Company v. United States.\" Oyez, www.oyez.org/cases/1970/1873. Accessed 14 Mar. 2024.",
																 200, 770)
									.move(200, 220, 75, 80).textSize(17).setBounds(350, 500));
	textObjects.push(new textObject("\"New York Times Co. v. United States, 403 U.S. 713 (1971)\" Justia, Justia Inc., Accessed 14 Mar. 2024, https://supreme.justia.com/cases/federal/us/403/713/.",
																 200, 890)
									.move(200, 340, 75, 80).textSize(17).setBounds(350, 500));
	
	textObjects.push(new textObject("Background gradient &\ntext animations coded by me! :)", 200, 700)
									.move(200, 520, 80, 82).textSize(13).setBounds(350, 500));
}

function preload(){
	bg_fragShader = bg_fragShader.replace("X_WIDTH", dim[0]);
	bg_fragShader = bg_fragShader.replace("X_HEIGHT", dim[1]);
	bg_shader = new p5.Shader(this.renderer, vertShader, bg_fragShader);
	blur_fragShader = blur_fragShader.replace("X_WIDTH", dim[0]);
	blur_fragShader = blur_fragShader.replace("X_HEIGHT", dim[1]);
	blur_shader = new p5.Shader(this.renderer, vertShader, blur_fragShader);
	
	im = loadImage("https://media.licdn.com/dms/image/C5612AQHs53XgaLIhFQ/article-cover_image-shrink_600_2000/0/1538987542939?e=2147483647&v=beta&t=yXcTaKix70WvFb3DiOY25lpba6Jp-5R-clxUARPmP2k");
}

let firstframe;

function draw(){
	if(frameCount < 3) firstframe = Date.now();
	
	/* recording
		if(frameCount == 4){
			rec.start();
			recording = true;
		}
		if(Date.now() > firstframe + 85000 && recording){
			recording = false;
			rec.stop();
		}
	*/
	
	background(255);
	
	bg_shader.setUniform("iTime", (Date.now()-firstframe)/20 + 200);
	bg_compositor.background(255);
	bg_compositor.shader(bg_shader);
	bg_compositor.rect(0, 0, width, height);
	image(bg_compositor, 0, 0, width, height);
	
	image(im, 400 - ((Date.now()-firstframe)/1000 - 9.2)*60, 30, im.width*0.6, im.height*0.6);
	
	for(let o of textObjects){
		o.render((Date.now()-firstframe)/1000);
	}
}
