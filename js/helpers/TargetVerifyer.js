var TargetVerifyer = {
	verifyTargetIsValidClass: function( theTarget, arrayOfClasses ){
		var targetClass = theTarget.target.className;
		for( var i=0; i < arrayOfClasses.length; i++ ) {
			if( arrayOfClasses[i] == targetClass )
				return targetClass;
		}
		return false;
	},
};