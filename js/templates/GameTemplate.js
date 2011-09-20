//	the Game store template
IGNGamestore.views.gameTemplate = new Ext.XTemplate([
 		'<ul class="gameList">',
 			'<tpl for=".">',
 				'<li class="game">',
 						'<div class="thumbnail"><a href="#{GameId}" class="aImg"><img src="{Game.LargeIconUrl}" class="thumbnailImg" /></a></div>',
 						'<div class="gameDetails">',
 							'<h2 class="title"><a href="#{GameId}" class="aTitle">{Game.Name}</a></h2>',
 							'<span class="release">{Game.ReleaseDate}</span>',
 							'<span class="rating rating_{AverageRating}">{rating}</span>',
 							'<span><a href="#{GameId}" class="buy">${Game.Price}</a></span>',
 						'</div>',
 				'</li>',
 			'</tpl>',
 		'</ul>',
]);

//	the Game collection template
IGNGamestore.views.gameCollectionTemplate = new Ext.XTemplate([
 		'<ul class="gameList">',
 			'<tpl for=".">',
 				'<li class="game">',
 						'<div class="thumbnail"><a href="#{Id}" class="aImg"><img src="{LargeIconUrl}" class="thumbnailImg" /></a></div>',
 						'<div class="gameDetails">',
 							'<h2 class="title"><a href="#{Id}" class="aTitle">{Name}</a></h2>',
 							'<span class="rating rating_4">4</span>',
 						'</div>',
 				'</li>',
 			'</tpl>',
 		'</ul>',
]);