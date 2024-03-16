class textObject{
	constructor(text, x, y){
		this.text = text;
		this.bounds = false;
		this.size = false;
		this.rot = false;
		this.frames = [{p: {x: x, y: y}, t: 0}];
		this.pos = {x: x, y: y};
		this.target = {old: {x: x, y: y, t: 0}, new: {x: x, y: y, t: 0}};
		this.on = 0;
	}
	setBounds(x, y){
		this.bounds = [x, y];
		return this;
	}
	textSize(s){
		this.size = s;
		return this;
	}
	rotate(r){
		this.rot = r;
		return this;
	}
	move(x, y, start, end){
		let top = this.frames[this.frames.length-1];
		if(start != top.t){
			this.frames.push({p: {x: top.p.x, y: top.p.y}, t: start});
		}
		this.frames.push({p: {x: x, y: y}, t: end});
		return this;
	}
	render(t){
		if(t > this.target.new.t){
			this.target.old.x = this.target.new.x;
			this.target.old.y = this.target.new.y;
			this.target.old.t = this.target.new.t;
			this.on++;
			if(this.on < this.frames.length){
				this.target.new.x = this.frames[this.on].p.x;
				this.target.new.y = this.frames[this.on].p.y;
				this.target.new.t = this.frames[this.on].t;
			}
		}
		if(this.target.new.x == this.target.old.x && this.target.new.y == this.target.old.y){
			this.pos.x = this.target.new.x;
			this.pos.y = this.target.new.y;
			if(this.pos.x > -170 && this.pos.x < 570 && this.pos.y > -50 && this.pos.y < 650){
				push(); fill(0); noStroke();
				if(this.size) textSize(this.size);
				translate(this.pos.x, this.pos.y);
				if(this.rot) rotate(this.rot*TWO_PI/360);
				if(this.bounds) text(this.text, -this.bounds[0]/2, -this.bounds[1]/2, ...this.bounds);
				else text(this.text, 0, 0);
				pop();
			}
		}else{
			let ox = this.pos.x, oy = this.pos.y;
			let factor = (t - this.target.old.t)/(this.target.new.t - this.target.old.t);
			// factor = 3*Math.pow(factor, 2) - 2*Math.pow(factor, 3);
			if(factor > 0.5) factor -= 1;
			factor = Math.pow(factor*2, 5)/2;
			if(factor <= 0) factor += 1;
			this.pos.x = this.target.new.x*factor + this.target.old.x*(1-factor);
			this.pos.y = this.target.new.y*factor + this.target.old.y*(1-factor);
			if(this.pos.x > -170 && this.pos.x < 570 && this.pos.y > -50 && this.pos.y < 650){
				comp_buf.clear(); comp_buf.push(); comp_buf.fill(0); comp_buf.noStroke();
				if(this.size) comp_buf.textSize(this.size);
				comp_buf.translate(this.pos.x, this.pos.y);
				if(this.rot) comp_buf.rotate(this.rot*TWO_PI/360);
				if(this.bounds) comp_buf.text(this.text, -this.bounds[0]/2, -this.bounds[1]/2, ...this.bounds);
				else comp_buf.text(this.text, 0, 0);
				compose(this.pos.x - ox, this.pos.y - oy); comp_buf.pop();
			}
		}
	}
}
