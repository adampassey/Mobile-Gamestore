// 	the Game model
Ext.regModel( 'Game', {
  fields			: [
  	{ name: 'id', 							mapping: 'GameId' },
  	{ name: 'name', 						mapping: 'Game.Name' },
  	{ name: 'url',							mapping: 'Game.VendorGameUrl' },
  	{ name: 'boxart',						mapping: 'Game.SmallIconUrl'}, 
  	{ name: 'buyAtProducts',				},
  	{ name: 'communityRating', 				mapping: 'AverageRating' },
  	{ name: 'description',					mapping: 'Game.Description' },
  	{ name: 'developers',					mapping: 'Game.Developers' },
  	{ name: 'platform',						mapping: 'Game.Platform' },
  	{ name: 'publishers',					mapping: 'Game.Seller' },
  	{ name: 'teaserThumbnailUrl', 			},
  	{ name: 'videoGalleryUrl',				},
  	{ name: 'editorialRating',  			},
  	{ name: 'gamestopUrl' 					},
  	{ name: 'msrp'							},
  	{ name: 'noComments',				defaultValue: false },
  	{ name: 'inCollection',			defaultValue: false },
  	{ name: 'price', 					  convert: function( value, record ) {
  		return GameHelper.formatCurrency( record.get('msrp').price );
  	} },
  	{ name: 'image',						convert: function( value, record ) {
  		return record.get('boxart') ? record.get('boxart').imageFile[0]['@url'] : ImageHelper.notAvailableImage;
  	} },
  	{ name: 'rating',						convert: function( value, record ) {
  		return GameHelper.calculateRating( record.get('editorialRating') );
  	} },
  	{ name: 'community_rating',	convert:function( value, record ) {
  		return GameHelper.calculateRating( record.get('communityRating') );
  	} },
  ],
  hasMany	: [
  	{ model: 'Comment', name: 'comments' }
  ]
});