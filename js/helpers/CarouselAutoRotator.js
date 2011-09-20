var CarouselAutoRotatorDirection = {
	Forward:			0,
	Backward:			1
};

CarouselAutoRotator = function( Carousel, timer ) {
	this.Carousel = Carousel;
	this.timer = timer;
	this.direction = CarouselAutoRotatorDirection.Forward;
	var interval;
	var self = this;
	
	interval = setInterval( (function() { self.doAction(); } ), this.timer );
	
	this.doAction = function() {
		var index = this.Carousel.getActiveIndex();
		var length = (this.Carousel.items.length) - 1;
		
		if( index >= length && this.direction == CarouselAutoRotatorDirection.Forward )
			this.direction = CarouselAutoRotatorDirection.Backward;
		else if( index == 0 && this.direction == CarouselAutoRotatorDirection.Backward )
			this.direction = CarouselAutoRotatorDirection.Forward;
			
		if( this.direction == CarouselAutoRotatorDirection.Forward )
			this.Carousel.next();
		else
			this.Carousel.prev();

	};
	
};