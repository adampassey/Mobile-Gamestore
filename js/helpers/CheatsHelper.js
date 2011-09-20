var CheatsHelper = {
	getCheatsFromResult : function(result) {
		if( result.cheatSummary.cheats.hasOwnProperty('cheat') )
			return result.cheatSummary.cheats.cheat;
		return false;
	},
};