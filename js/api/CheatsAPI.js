var CheatsAPI = {

	jsonpUrl: 'http://content-api.ign.com/v1/games/{id}/cheats.json',
	
		getCheats: function( id, callbackFunction ) {
			Ext.util.JSONP.request({
				url: CheatsAPI.jsonpUrl.replace( /{id}/, 882301 ),
				type: 'scripttag',
				callbackKey: 'callback',
				callback: function(data) {
					if( callbackFunction )
						callbackFunction.call(this, data);
				}
			});
		},
		
};