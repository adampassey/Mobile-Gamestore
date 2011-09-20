/**
 *	This is not a 'real' API, but a stand-in
 *	for a future API that would require some type
 *	of JSON requests.
 *
 *	For now, it is stored locally so it will reset
 * 	with every re-load.
 *	
 */
var CollectionAPI = {
	
	addToCollection: function( gameId, callbackFunction ) {
		IGNGamestore.gameCollection[IGNGamestore.gameCollection.length] = gameId;
		if( callbackFunction )
			callbackFunction.call(this);
	},
	
	getCollection: function( callbackFunction ) {
	
		if( IGNGamestore.gameCollection.length > 1 )
			var idString = IGNGamestore.gameCollection.join(',');
		else
			var idString = IGNGamestore.gameCollection[0];
		RexAPI.getCollection(function(Games) {
			IGNGamestore.views.collectionPanel.update( Games );
		});
	},
	
};