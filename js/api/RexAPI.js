var RexAPI = {

	RexURL: 'http://69.10.18.21/rex/?',
	proxyUrl: 'http://adampassey.com/Sencha/game-store-mobile/proxy/httpproxy.php',
	
	parseGames: function(List) {
		
		var Games = List;
		
		for( var i=0; i < Games.length; i++ ) {
	    	Games[i].AverageRating  = GameHelper.calculateRating( Games[i].AverageRating );
	    	Games[i].noComments = true;
	    }
	    
	    return Games;
	},

	//	wrapper that loads top games
	loadTopGames: function() {
	    $.ajax({
	    	url: 	RexAPI.proxyUrl,
	    	type:	'POST',
	    	data: 	'url='+escape(RexAPI.RexURL)+
	    			escape('do=recommend'+
	    			'&maxGames=30'+
	    			'&gameProps=all'),
	    	success: function(data) {
	    	
	    		var json = $.parseJSON(data);
	    	
	    		var Games = RexAPI.parseGames( json.RecoList.List );
	    		
	    		IGNGamestore.views.topGamesListContainer.update( Games );
	    		
	    	}
	    });
	},
	
	//	wrapper that load the recommended games
	loadRecommendedGames: function() {
	    $.ajax({
	    	url: 	RexAPI.proxyUrl,
	    	type:	'POST',
	    	data: 	'url='+escape(RexAPI.RexURL)+
	    			escape('do=recommend'+
	    			'&maxGames=30'+
	    			'&gameProps=all'),
	    	success: function(data) {
	    	
	    		var json = $.parseJSON(data);
	    	
	    		var Games = RexAPI.parseGames( json.RecoList.List );
	    		
	    		IGNGamestore.views.recommendedGamesListContainer.update( Games );
	    		
	    	}
	    });	
	},
	
	loadGame: function( id, callbackFunction ) {
		$.ajax({
	    	url: 	RexAPI.proxyUrl,
	    	type:	'POST',
	    	data: 	'url='+escape(RexAPI.RexURL)+
	    			escape('do=game'+
	    			'&id='+id+
	    			'&gameProps=all'),
	    	success: function(data) {
	    	
	    		var parsedJson = $.parseJSON( data );
	    		var Game = parsedJson.Game;
	    		
	    		//console.log( Game );
	    		
	    		Game.AverageRating = GameHelper.calculateRating( Game.AverageRating );
	    		Game.Description = Game.Description.replace( /[^a-zA-Z 0-9]+/g,'' );
	    		
	    		if( CollectionHelper.isGameInCollection( Game ) )
	    			Game.inCollection = true;
	    		else
	    			Game.inCollection = false;
	    		
				//	query for the comments
				APAPI.loadComments(Game.Id, function(data) {
				    
				    console.log( 'comments: ' );
				    console.log( data );
				    
				    if( data ) {
				    
				    	var rawComments = [];
				    	
				    	for( var i=0; i < data.length; i++ ) {
				    		rawComments[i] = Ext.ModelMgr.create({
				    			comment:	data[i]['comment'],
				    			dev:			data[i]['dev'],
				    			game_id:	data[i]['game_id'],
				    			time:			data[i]['time'],
				    			time_text:data[i]['timeText']
				    		}, 'Comment');
				    	}
				    	
				    	Game.comments = RecordsHelper.objectsFromRecords( rawComments );
				    
				    } else {
				    	Game.noComments = true;
				    }
				    
				    //console.log( Game );
				    
				    //	load recommended games
				    $.ajax({
	    				url: 	RexAPI.proxyUrl,
	    				type:	'POST',
	    				data: 	'url='+escape(RexAPI.RexURL)+
	    						escape('do=recommend'+
	    						'&gameId='+id+
	    						'&gameProps=all'+
	    						'&maxGames=12'),
	    				success: function(data) {
	    					
	    					var json = $.parseJSON(data);
	    	
	    					var RecommendedGames = RexAPI.parseGames( json.RecoList.List );
	    					
	    					Game.RecommendedGames = RecommendedGames;
	    					
	    					console.log( Game );
	    					
	    					if( callbackFunction )
	    						callbackFunction.call( this, Game );
	    					
	    				}
	    			});
				    
				});
	    	}
	    });		
	},
	
	getCollection: function( callbackFunction ) {
	
		var GameList = IGNGamestore.gameCollection.join(',');
		var url = escape( RexAPI.RexURL + 'do=gameList&idList=' );
		url += escape( '{List:['+GameList+']}' );
		
		$.ajax({
	    	url: 	RexAPI.proxyUrl,
	    	type:	'POST',
	    	data: 	'url='+url,
	    	success: function(data) {
	    		
	    		//console.log( data );
	    	
	    		var json = $.parseJSON(data);
				var Games = RexAPI.parseGames(json.GameList.List);
				
				console.log( Games );
				
	    		callbackFunction.call(this, Games );
	    		
	    	}
	    });
	},
	
	//	load games using params into Store
	//	displayed to Panel
	storeQuery: function( Store, params, Panel, callback ) {
	
	    if( !callback )
	    	callback = function( records, operation, success ) {
	    		var objects = RecordsHelper.objectsFromRecords( records );
	    		Panel.update( objects );
	    	};
	    	
	    Store.load({
	    	params: params,
	    	scope   : this,
        callback: callback
	    });
	    
	},
};