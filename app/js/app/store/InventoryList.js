Ext.define('COMS.store.InventoryList', {
				extend : 'Ext.data.Store',
				fields:["ID", "Date", "StartDate"],
				proxy: {
					type: 'rest',
					url : "/Reports/Inventory",
					reader: {
						type: 'json',
						root : 'records'
					}
				}
			});