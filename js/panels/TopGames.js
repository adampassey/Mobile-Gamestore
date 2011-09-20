//	the 'hero' unit carousel
IGNGamestore.views.topGamesCarousel = new Ext.Carousel({
  height: 300,
  items: [
  	{ html: '<div id="static-banner-sword-and-sorcery"></div>', cls: 'staticBanner01' },
  	{ html: '<div id="static-banner-dead-space"></div>', cls: 'staticBanner02' },
  ]
});

//	the topGames list container
IGNGamestore.views.topGamesListContainer = new MaskedPanel({
  id					: 'topGamesListcontainer',
  title				: 'Top Games',
  cls					: 'topGames',
  scroll			: 'vertical',
  items				: [ IGNGamestore.views.topGamesCarousel ],
  tpl					: IGNGamestore.views.gameTemplate,
  style 			: '',
  listeners		:	{
  	interact: function(event, target) {
  	
  		//	check to see if target is something we want
  		//	if not, ignore it
  		var validClasses = [ 'thumbnailImg', 'aImg', 'aTitle', 'buy' ];
  		
  		if( TargetVerifyer.verifyTargetIsValidClass( target, validClasses ) ) {
  			IGNGamestore.views.topGamesListContainer.showLoader();
  			var gameId = GameHelper.getIdFromTarget( target );
  			RexAPI.loadGame( gameId, function(Game) {
  				//console.log( Game );
  				
  				if( CollectionHelper.isGameInCollection(Game) ) 
  					Game.inCollection = true;
  				else
  					Game.inCollection = false;
  				
  				IGNGamestore.views.gameCloseupToolbar.setTitle( Game.Name );
  				IGNGamestore.views.gameCloseupContainer.update(Game);
  				IGNGamestore.views.gameCloseupContainer.show('slide');
  				IGNGamestore.views.topGamesListContainer.hideLoader();
  				IGNGamestore.views.gameCloseupContainer.doLayout();
  			});
  		}
  		
  	},
  	
  	//	setup the auto-rotating carousel
  	render: function() {
  		var CarouselRotator = new CarouselAutoRotator( IGNGamestore.views.topGamesCarousel, 10000 );
  	}
  }
});