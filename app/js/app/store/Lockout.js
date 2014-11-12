Ext.define('COMS.store.Lockout', {
				extend : 'Ext.data.Store',
				fields:["id", "Patient_ID", "Section", "UserName", "dtLocked", "dtUnLocked", "Last_Name", "First_Name", "Middle_Name", "Prefix", "Suffix", "Match"],
				proxy: {
					type: 'rest',
					url : "/Patient/Lock",
					reader: {
						type: 'json',
						root : 'records'
					}
				}
			});