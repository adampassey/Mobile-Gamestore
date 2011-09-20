//	the toolbar for the gameCloseup container
IGNGamestore.views.gameCloseupToolbar = new Ext.Toolbar({
	dock: 'top',
	title: 'Closeup',
	ui: 'ign',
	items: [ { text: 'Back', ui: 'back' } ]
});

//	the gameCloseup container
IGNGamestore.views.gameCloseupContainer = new MaskedPanel({
  id					: 'GameCloseupContainer',
  title				: 'Closeup',
  scroll			: 'vertical',
  dockedItems : [IGNGamestore.views.gameCloseupToolbar ],
  fullscreen	: true,
  hidden			: true,
  ui					: 'dark',
  tpl					: IGNGamestore.views.gameCloseupTemplate,
  style 			: '',
  html				: '',
  listeners		:	{
  	interact: function(event, target) {
  	
  		//	check to see if target is something we want
  		//	if not, ignore it
  		var validClasses = [ 'buy', 'addToCollection', 'loadCheats', 'loadComments', 'recommendedBoxart' ];
  		
  		if( targetClass = TargetVerifyer.verifyTargetIsValidClass( target, validClasses ) ) {
  			
  			switch(targetClass) {
  			
  				//	add this game to your collection
  				case 'addToCollection':
  				
  					//	let's animate the game
  					//	create a new image object, append it, and animate it,
  					//	then remove it.
  					var imageHTMLElement = $('.closeupBoxart');
  					var imageObject = document.createElement( 'img' );
  					var imageOffset = $(imageHTMLElement).offset();
  					imageObject.setAttribute( 'src', $(imageHTMLElement).attr('src') );
  					imageObject.setAttribute( 'height', $(imageHTMLElement).height() );
  					imageObject.setAttribute( 'width', $(imageHTMLElement).width() );
  					imageObject.setAttribute( 'class', 'animatingBoxart' );
  					imageObject.style.top = imageOffset.top + 5;
  					imageObject.style.left = imageOffset.left + 5;
  					$('body').append(imageObject);
  					
  					$('.addToCollection').addClass('added');
  					$('.addToCollection').html('Added to Collection');
  					
  					$('.animatingBoxart').animate({
  						top: 675,
  						left: 530,
  						opacity: .1,
  						width: 30,
  						height: 50
  					}, 1000, function() {
  						//	remove the element?
  						$(imageObject).remove();
  					});
  					
  					var gameId = GameHelper.getIdFromTarget( target );
  					
  					CollectionAPI.addToCollection(gameId, function() {
  						console.log( IGNGamestore.gameCollection );
  					});
  					
  				break;
  				
  				//	load the cheats
  				case 'loadCheats':

  					var container = $('.cheatsInnerContainer');
  					var gameId = GameHelper.getIdFromTarget( target );
  					
  					CheatsAPI.getCheats( gameId , function(data){
  					
  						console.log(data);
  						
  						var cheats = CheatsHelper.getCheatsFromResult( data );
  						var cheatsHtml = '';
  							
  						for( var i=0; i < cheats.length; i++) {
  							cheatsHtml += '<strong>' + cheats[i]['@name'] + '</strong><br />' + cheats[i]['cheatText'] + '<hr />';
  						}
  						
  						if( cheatsHtml == '' ) {
  							cheatsHtml = '<strong>No cheats have been submitted yet.</strong>';	
  						}
  						
  						$(container).append(cheatsHtml);
  						
  						CloseupPanelHelper.activateTabBySelectors( '.loadCheats', '.cheatsContainer' );

  					});
  					
  				break;
  				
  				case 'loadComments':
  					
  					CloseupPanelHelper.activateTabBySelectors( '.loadComments', '#comments' );
  					
  				break;
  				
  				case 'recommendedBoxart' :
  					
  					var gameId = GameHelper.getIdFromTarget( target );
  					IGNGamestore.views.gameCloseupContainer.showLoader();
  					
  					RexAPI.loadGame( gameId, function(Game) {
  						//console.log( Game );
  						
  						if( CollectionHelper.isGameInCollection(Game) ) 
  							Game.inCollection = true;
  						else
  							Game.inCollection = false;
  						
  						IGNGamestore.views.gameCloseupToolbar.setTitle( Game.Name );
  						IGNGamestore.views.gameCloseupContainer.update(Game);
  						IGNGamestore.views.gameCloseupContainer.hideLoader();
  					});
  					
  				break;
  			}
  			
  		}
  		
  	}
  }
});