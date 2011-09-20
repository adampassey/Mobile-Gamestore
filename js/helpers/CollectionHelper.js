var CollectionHelper = {
	isGameInCollection : function(Game) {
		for(var i = 0; i < IGNGamestore.gameCollection.length; i++) {
			if( Game.Id == IGNGamestore.gameCollection[i] )
				return true;
		}
		return false;
	},
};