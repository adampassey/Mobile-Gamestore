var App = new Ext.Application({
	name: 'IGNGamestore',
	useLoadMask: true,
	tabletStartupScreen: 'img/tablet_startup.png',
	icon: 'img/icon.png',
	glossOnIcon: true,
	launch: function() {
	
		//	the collection
		IGNGamestore.gameCollection = [];
	
		//	this will fire when the dependencies
		//	are finished loading. 
		//	load the top games and then add
		//	a listener to load recommended games
		//	when the specific button is tapped.
		var startApplication = function() {
			
			RexAPI.loadTopGames();
			RexAPI.loadRecommendedGames();
			
			//	add listeners to toolbar elements
			//IGNGamestore.views.viewport.getTabBar().getComponent(1).addListener('tap', V1API.loadRecommendedGames() );
			//RexAPI.loadRecommendedGames();
			IGNGamestore.views.gameCloseupToolbar.getComponent(0).addListener('tap', function() { IGNGamestore.views.gameCloseupContainer.hide(); } );		
		}

		//	dependencies
		//	if / when you add to these, take note
		//	of the order in which you load them. 
		//	Also, these will need to be minified and
		//	combined into a single file for anything
		//	other than dev
		LazyLoad.loadOnce([
		'js/sencha/MaskedPanel.js',
  		'js/models/Game.js',
  		'js/models/Comment.js',
  		'js/stores/GameStore.js',
  		'js/helpers/ImageHelper.js',
  		'js/helpers/RecordsHelper.js',
  		'js/helpers/GameHelper.js',
  		'js/helpers/TargetVerifyer.js',
  		'js/helpers/CarouselAutoRotator.js',
  		'js/helpers/CheatsHelper.js',
  		'js/helpers/CloseupPanelHelper.js',
  		'js/helpers/CollectionHelper.js',
  		'js/helpers/DateHelper.js',
  		//'js/api/V1API.js',
  		'js/api/RexAPI.js',
  		'js/api/APAPI.js',
  		'js/api/CollectionAPI.js',
  		'js/api/CheatsAPI.js',
  		'js/templates/GameTemplate.js',
  		'js/templates/CloseupTemplate.js',
  		'js/panels/TopGames.js',
  		'js/panels/RecommendedGames.js',
  		'js/panels/StoreTabPanel.js',
  		'js/panels/CollectionPanel.js',
  		'js/panels/Viewport.js',
  		'js/panels/GameCloseup.js',
		], startApplication);

	}
});	
