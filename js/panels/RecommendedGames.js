//	the recommendedGames list container
IGNGamestore.views.recommendedGamesListContainer = new MaskedPanel({
  id					: 'recommendedGamesListContainer',
  title				: 'Recommended',
  scroll			: 'vertical',
  tpl					: IGNGamestore.views.gameTemplate,
  style 			: '',
  listeners		:	{
  	interact: function(event, target) {

  		var validClasses = [ 'thumbnailImg', 'aImg', 'aTitle', 'buy' ];
  		
  		if( TargetVerifyer.verifyTargetIsValidClass( target, validClasses ) ) {
  			IGNGamestore.views.recommendedGamesListContainer.showLoader();
  			var gameId = GameHelper.getIdFromTarget( target );
  			V1API.loadGame( gameId, function(Game) {
  				//console.log( Game );
  				
  				if( CollectionHelper.isGameInCollection(Game) ) 
  					Game.inCollection = true;
  				
  				IGNGamestore.views.gameCloseupToolbar.setTitle( Game.name );
  				IGNGamestore.views.gameCloseupContainer.update(Game);
  				IGNGamestore.views.gameCloseupContainer.show('slide');
  				IGNGamestore.views.recommendedGamesListContainer.hideLoader();
  			});
  		}
  		
  	}
  }
});