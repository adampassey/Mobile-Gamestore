//	the main holding tab panel
IGNGamestore.views.storeTabPanel = new Ext.TabPanel({
  cardSwitchAnimation	: 'slide',
  title				: 'Store',
  iconCls			: 'tabbarstore',
  ui					: 'ign',
  centered		: true,
  items				: [
  								IGNGamestore.views.topGamesListContainer, 
  								IGNGamestore.views.recommendedGamesListContainer
  							],
});