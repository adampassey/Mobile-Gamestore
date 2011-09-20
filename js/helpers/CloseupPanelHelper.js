var CloseupPanelHelper = {
	//	activate additional navigational items
	activateTabBySelectors : function( navClass, containerClass ) {
		
		//	updates nav
		$('.detailsNav li a').each(function() {
			$(this).removeClass( 'active' );
		});
		$(navClass).addClass('active');
		
		//	now the information divs
		$('.detailsContainer .sectionContainer').each(function() {
		  $(this).slideUp('fast');
		});
		$(containerClass).slideDown('fast');
	},
};