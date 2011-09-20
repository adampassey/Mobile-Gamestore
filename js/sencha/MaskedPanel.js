/**
 *	The MaskedPanel is an extension of the 
 *	the Panel class that will add an event
 *	listener for taps as well as adding a
 *	'Loading...' mask automatically from
 *	when it instantiates to when it renders.
 *
 *	This should handle the two most common
 *	interactions that will take place in this
 *	applications panels. 
 */
var MaskedPanel = Ext.extend( Ext.Panel, {
	
	//	initialize the component
	//	creating an interactive listener
	initComponent: function() {
		MaskedPanel.superclass.initComponent.call(this);
		
		//	add a mask
		this.MaskedPanelMask = new Ext.LoadMask( Ext.getBody(), { msg:' Loading...' } );
		this.MaskedPanelMask.show();
		
		this.addEvents('interact');
		this.addListener({
			el:	{
				tap: function(e) {
					this.fireEvent('interact', e.type, e );
				},
				scope: this
			}
		});
	
	},
	
	//	when the panel is updated, hide the mask
	//	after calling the superclasses update
	update: function() {
		MaskedPanel.superclass.update.apply(this, arguments);
		
		this.MaskedPanelMask.hide();
		
	},
	
	showLoader: function() {
		this.MaskedPanelMask.show();
	},
	
	hideLoader: function() {
		this.MaskedPanelMask.hide();
	},
	
});