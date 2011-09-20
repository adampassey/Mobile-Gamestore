var V1API = {

	jsonpUrl: 'http://content-api.ign.com/v1/games.json',
	jsonpGamestopUrl: 'http://content-api.ign.com/v1/games/{id}/products.json.us',

	//	wrapper that loads top games
	loadTopGames: function() {
			V1API.storeQuery( 
				Ext.StoreMgr.lookup('TopGameStore'), 
				{ 
					max: 15, 
					projection: 'med', 
					platform: '661955', 
					sort: 'rating', 
					releaseStartDate: '20090701', 
					releaseEndDate: '20090924' 
				}, 
				IGNGamestore.views.topGamesListContainer );
		},
		
		//	wrapper that load the recommended games
		loadRecommendedGames: function() {
			V1API.storeQuery( 
				Ext.StoreMgr.lookup('RecommendedGameStore'), 
				{ 
					max: 15, 
					projection: 'med', 
					platform: 661955, 
				}, 
				IGNGamestore.views.recommendedGamesListContainer );		
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
		
		//	run a raq jsonp query
		jsonpQuery: function( url, params, customCallback ) {
			Ext.util.JSONP.request({
				url: url,
				params: params,
				callbackKey: 'callback',
				callback: customCallback
			});
		},
		
		//	load a game closeup and then display
		loadGame: function(id, callback) {
			V1API.jsonpQuery( V1API.jsonpUrl,
				{
					ids: id,
					projection: 'med'
				},
				function(data) {
					var game = data.games.game;
					
					//	make a new game model object
					var Game = Ext.ModelMgr.create({
						id: 							game['@id'],
						name: 						game['@name'],
						url:							game['@url'],
						articlesPageUrl:	game['articlesPageUrl'],
						available:				game['available'],
						boxart:						game['boxart'],
						buyAtProducts:		game['buyAtProducts'],
						cheatsUrl:				game['cheatsUrl'],
						commonName:				game['commonName'],
						communityRating:	game['communityRatingAvg'],
						contentRating:		game['contentRating'],
						description:			game['description'],
						developers:				game.hasOwnProperty('developers') ? game['developers']['gameCompany']['@name'] : 'Unknown',
						editorsChoice:		game['editorsChoice'],
						editorialRating:	game['editorialRating'],
						expectedReleaseDate:	game['expectedReleaseDate'],
						faqsUrl:							game['faqsUrl'],
						filePlanetProducts:		game['filePlanetProducts'],
						genres:								game['genres'],
						gpm:									game['gpm'],
						guideUrl:							game['guideUrl'],
						imageGalleryUrl:			game['imageGalleryUrl'],
						platform:							game['platform'],
						publishers:						game['publishers'],
						readerReviewAvg:			game['readerReviewAvg'],
						shortDescription:			game['shortDescription'],
						teaserThumbnailUrl:		game['teaserThumbnailUrl'],
						videoGalleryUrl:			game['videoGalleryUrl'],
						editorialRating:			game['editorialRating'],
						gamestopUrl:					null,
						msrp:									game['msrp'],
						price:								GameHelper.formatCurrency( game.hasOwnProperty('msrp') ? game['msrp'].price : null ),
						image:								game.hasOwnProperty('boxart') ? game.boxart.imageFile[0]['@url'] : ImageHelper.notAvailableImage,
						rating:								GameHelper.calculateRating( game['editorialRating'] ),				
						comments:							[],
					}, 'Game');
					
					Game = Game.data;
					
					//	query for the gamestop url
					//	nevermind asynch
					V1API.jsonpQuery( V1API.jsonpGamestopUrl.replace( /{id}/, Game.id ),
						{ projection: 'full', }, 
						function(data) {
						
							if( data.products.hasOwnProperty('product') )
								Game.gamestopUrl = data.products.product.url;
							
							//	query for the comments
							APAPI.loadComments(Game, function(data) {
								
								if( data ) {
									var rawComments = [];
									
									for( var i=0; i < data.length; i++ ) {
										rawComments[i] = Ext.ModelMgr.create({
											comment:	data[i]['comment'],
											dev:			data[i]['dev'],
											game_id:	data[i]['game_id'],
											time:			data[i]['time'],
											time_text:data[i]['time_text']
										}, 'Comment');
									}
									
									Game.comments = RecordsHelper.objectsFromRecords( rawComments );
								
								} else {
									Game.noComments = true;
								}
								
								//	perform the callback if one
								//	was specified.
								if( callback ) 	
									callback.call(this, Game);
								
							});
							
						}
					);
				}
			);
		},
};