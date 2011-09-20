//	the main holding tab panel
IGNGamestore.views.viewport = new Ext.TabPanel({
  fullscreen	: true,
  cardSwitchAnimation	: 'slide',
  tabBarDock	: 'bottom',
  ui					: 'ign',
  centered		: true,
  items				: [
  								IGNGamestore.views.storeTabPanel,
  								IGNGamestore.views.collectionPanel
  							],
  tabBar			: {
									layout:{ pack: 'center' }
								}
});