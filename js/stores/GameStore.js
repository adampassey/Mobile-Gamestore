Ext.regStore( 'TopGameStore', {
  id					: 'TopGameStore',
  model				: 'Game',
  proxy				: { 
  		type	: 'scripttag', 
  		id		: 'ign-gamestore-app-localstore',
  		url		: 'http://69.10.18.21/rex',
  		reader:  {
  			type	: 'json',
  			root	: 'RecoList.List',
  			
  		}
  },
});

Ext.regStore( 'RecommendedGameStore', {
  id					: 'RecommendedGameStore',
  model				: 'Game',
  proxy				: { 
  		type	: 'scripttag', 
  		id		: 'ign-gamestore-app-localstore',
  		url		: 'http://69.10.18.21/rex',
  		reader:  {
  			type	: 'json',
  			root	: 'RecoList.List',
  			
  		}
  }
});

Ext.regStore( 'CollectionStore', {
	id					: 'CollectionStore',
  	model				: 'Game',
  	proxy				: { 
  			type	: 'scripttag', 
  			id		: 'ign-gamestore-app-localstore',
  			url		: 'http://69.10.18.21/rex',
  			reader:  {
  				type	: 'json',
  				root	: 'RecoList.List',
  				
  			}
  	}
});