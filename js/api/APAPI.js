var APAPI = {
	url: 'http://adampassey.com/Sencha/game-store-05/api/comments/comments.json',
	
	loadComments: function( id, callbackFunction ) {
		Ext.util.JSONP.request({
			url: APAPI.url,
			type: 'JSONP',
			params: {
				id: id
			},
			callbackKey: 'callback',
			callback: function(data) {
				if( callbackFunction )
					callbackFunction.call(this, data);
			}
		});
	},
	
};