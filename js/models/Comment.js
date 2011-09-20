// 	the Comment model
Ext.regModel( 'Comment', {
  fields			: [
  	{ name: 'id', 							},
  	{ name: 'name', 						},
		{ name: 'time',							},
		{ name: 'comment',					},
		{ name: 'dev',							},
		{ name: 'time_text',				},
  ],
  belongsTo: 'Game'
});