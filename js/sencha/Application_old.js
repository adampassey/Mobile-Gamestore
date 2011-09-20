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
			
			V1API.loadTopGames();
			
			//	add listeners to toolbar elements
			//IGNGamestore.views.viewport.getTabBar().getComponent(1).addListener('tap', V1API.loadRecommendedGames() );
			V1API.loadRecommendedGames();
			IGNGamestore.views.gameCloseupToolbar.getComponent(0).addListener('tap', function() { IGNGamestore.views.gameCloseupContainer.hide(); } );		
		}

		//	dependencies
		//	if / when you add to these, take note
		//	of the order in which you load them. 
		//	Also, these will need to be minified and
		//	combined into a single file for anything
		//	other than dev
		LazyLoad.loadOnce([
		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/sencha/MaskedPanel.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/models/Game.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/models/Comment.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/stores/GameStore.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/ImageHelper.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/RecordsHelper.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/GameHelper.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/TargetVerifyer.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/CarouselAutoRotator.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/CheatsHelper.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/CloseupPanelHelper.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/helpers/CollectionHelper.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/api/V1API.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/api/APAPI.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/api/CollectionAPI.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/api/CheatsAPI.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/templates/GameTemplate.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/templates/CloseupTemplate.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/panels/TopGames.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/panels/RecommendedGames.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/panels/StoreTabPanel.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/panels/CollectionPanel.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/panels/Viewport.js',
  		'http://o.oyster.ignimgs.com/dev/apassey/static/core/js/widgets/portals/gamestore/panels/GameCloseup.js',
		], startApplication);

	}
});	
