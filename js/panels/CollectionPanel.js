//	the toolbar for the tabpanel
IGNGamestore.views.collectionToolbar = new Ext.Toolbar({
	dock: 'top',
	title: 'My Collection',
	ui: 'ign',
	items: [ ],
});

//	the panel holding the collection
IGNGamestore.views.collectionPanel = new MaskedPanel({
  cardSwitchAnimation	: 'slide',
  title				: 'Collection',
  iconCls			: 'tabbarcollection',
  ui					: 'ign',
  centered		: true,
  html				: '<p style="display: block; text-align: center; margin: 25px 0;">Your collection is currently empty.</p>',
  scroll			: 'vertical',
  tpl					: IGNGamestore.views.gameCollectionTemplate,
  dockedItems	: [ IGNGamestore.views.collectionToolbar ],
  listeners		: {
  	beforeShow: function(event, target) {
  		console.log( 'IGNGamestore.views.collectionPanel.beforeShow()' );

  		IGNGamestore.views.gameCloseupContainer.hide();
  		CollectionAPI.getCollection();
			
  	},
  	interact: function(event, target) {
  	
  		//	check to see if target is something we want
  		//	if not, ignore it
  		var validClasses = [ 'thumbnailImg', 'aImg', 'aTitle', 'buy' ];
  		
  		if( TargetVerifyer.verifyTargetIsValidClass( target, validClasses ) ) {
  			IGNGamestore.views.collectionPanel.showLoader();
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
  				IGNGamestore.views.collectionPanel.hideLoader();
  			});
  		}
  		
  	},
  }
});