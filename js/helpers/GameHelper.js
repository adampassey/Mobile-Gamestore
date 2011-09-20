var GameHelper = {

	// format currency
	formatCurrency: function( price ) {
		if(price)
			price = price.toFixed(2);
		else
			price = "0.00";
		return '$' + price;
	},	
	
	//	turn a 10 point rating into
	//	a 1-5 star rating
	calculateRating: function( rating ) {
	
		//	that's all we need for the mobile gamestore :P
		return parseInt( rating );
	
		rating = parseInt( rating );

		  switch( rating ) {
		  	case 10 :
		  		rating = 5;
		  	break;
		  	case 9:
		  		rating = 5;
		  	break;
		  	case 8 :
		  		rating = 4;
		  	break;
		  	case 7:
		  		rating = 4;
		  	break;
		  	case 6 :
		  		rating = 3;
		  	break;
		  	case 5:
		  		rating = 3;
		  	break;
		  	case 4 :
		  		rating = 2;
		  	break;
		  	case 3:
		  		rating = 2;
		  	break;
		  	case 2 :
		  		rating = 1;
		  	break;
		  	case 1:
		  		rating = 1;
		  	break;
		  }
		return rating; 
	},
	
	getIdFromTarget: function(theTarget) {
		if( theTarget.target.hasOwnProperty('href') ) {
			return GameHelper.getIdFromUrl( theTarget.target.href );
		} else if( theTarget.target.parentElement.hasOwnProperty('href') ) {
			return GameHelper.getIdFromUrl( theTarget.target.parentElement.href );
		}
	},
	
	getIdFromUrl: function(url) {
		var id = url.split('#');
		return id[1];
	}, 
	
};