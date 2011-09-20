var RecordsHelper = {
	objectsFromRecords : function( records ) {
		var objects = [];
    
    if( records.length > 0 ) {
      for( var i = 0; i < records.length; i ++ ) {
      	objects[i] = records[i].data;
      }
    }
    return objects;
	},
};