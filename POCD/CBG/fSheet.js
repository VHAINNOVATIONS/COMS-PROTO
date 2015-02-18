var FSheet = function() {
	// Private
	var Prv = {
		qs : window.location.search.substring(1),
		PID : "",
		PAT_ID : "",
		PName : "",
		FlowsheetServiceURL : "/Patient/PCD_CancerByGender",
		puWin : null,
		nCols : 0,
		nRows : 0,

		makeGrid : function() {
			var theBody = Ext.get("GridPanel");
			var grid = Ext.create('Ext.grid.Panel', {
				// width: gWidth,
				// height: gHeight,
				frame: true,
				margin: "10 20",
				iconCls: 'icon-grid',
				renderTo: theBody,
				store: new Ext.data.JsonStore({
					autoLoad: true,
					proxy: {
						type: 'ajax',
						url: this.FlowsheetServiceURL,
						reader: {
							type: 'json',
							root: 'records'
						}
					},
					fields: ['Cancer', 'Gender', 'count']
				}),
				columns: [
					{ text: 'Disease Type',  dataIndex: 'Cancer', flex : 1 },
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
