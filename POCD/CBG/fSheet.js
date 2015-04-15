var FSheet = function() {
	// Private
	var Prv = {
		qs : window.location.search.substring(1),
		PID : "",
		PAT_ID : "",
		PName : "",
		ServiceURL : "/Patient/PCD_CancerByGender",
		puWin : null,
		nCols : 0,
		nRows : 0,

		makeGrid : function() {
			var theBody = Ext.get("GridPanel");
			var grid = Ext.create('Ext.grid.Panel', {
				frame: true,
				margin: "10 20",
				iconCls: 'icon-grid',
				renderTo: theBody,
				store: new Ext.data.JsonStore({
					autoLoad: {
						callback: function(el, succ, resp, opts) { 
							if (!resp && succ && succ.error) {
								Ext.MessageBox.alert("Report - Patterns of Care Determination/Cancer by Gender failure" , "The system reports a " + succ.error.statusText + "<br>Please refresh the page to try again");
							}
						}
					},
					sortOnLoad: true,
					sorters: { property : "Cancer", direction : "ASC" },
					proxy: {
						type: 'ajax',
						url: this.ServiceURL,
						reader: {
							type: 'json',
							root: 'records'
						}
					},
					fields: ['Cancer', 'Gender', 'count']
				}),
				columns: [
					{ text: 'Disease Type / Stage',  dataIndex: 'Cancer', flex : 1 },
					{ text: 'Gender', dataIndex: 'Gender'},
					{ text: 'Count', dataIndex: 'count' }
				]
			});
		}
	};

	// Public
	// Ext.getBody().mask("Loading Flowsheet Data", "x-mask-loading").setHeight(1000 + Ext.getBody().getHeight());
	Ext.onReady(function(){
		Ext.Ajax.timeout = 60000;
		Ext.override(Ext.data.Connection, {timeout: 60000});
		Ext.override(Ext.data.proxy.Ajax, { timeout: 60000 });
		Ext.override(Ext.form.action.Action, { timeout: 60 });
		Prv.makeGrid();
	});

	return null;
}();
