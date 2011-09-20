Ext.regStore( 'TopGameStore', {
  id					: 'TopGameStore',
  model				: 'Game',
  proxy				: { 
  		type	: 'scripttag', 
  		id		: 'ign-gamestore-app-localstore',
  		url		: 'http://content-api.ign.com/v1/games.json',
  		reader:  {
  			type	: 'json',
  			root	: 'games.game',
  			
  		}
  }
});

Ext.regStore( 'RecommendedGameStore', {
  id					: 'RecommendedGameStore',
  model				: 'Game',
  proxy				: { 
  		type	: 'scripttag', 
  		id		: 'ign-gamestore-app-localstore',
  		url		: 'http://content-api.ign.com/v1/games.json',
  		reader:  {
  			type	: 'json',
  			root	: 'games.game',
  			
  		}
  }
});

Ext.regStore( 'CollectionStore', {
	id					: 'CollectionStore',
  model				: 'Game',
  proxy				: { 
  		type	: 'scripttag', 
  		id		: 'ign-gamestore-app-localstore',
  		url		: 'http://content-api.ign.com/v1/games.json',
  		reader:  {
  			type	: 'json',
  			root	: 'games.game',
  			
  		}
  }
});