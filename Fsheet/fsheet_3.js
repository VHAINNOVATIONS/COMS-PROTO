Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*'
]);

Ext.onReady(function() {
    // sample static data for the store
    var myData = [
        ['3m Co',                               71.72, 0.02,  0.03,  '9/1 12:00am'],
        ['Alcoa Inc',                           29.01, 0.42,  1.47,  '9/1 12:00am'],
        ['Altria Group Inc',                    83.81, 0.28,  0.34,  '9/1 12:00am'],
        ['American Express Company',            52.55, 0.01,  0.02,  '9/1 12:00am'],
        ['American International Group, Inc.',  64.13, 0.31,  0.49,  '9/1 12:00am'],
        ['AT&T Inc.',                           31.61, -0.48, -1.54, '9/1 12:00am'],
        ['Boeing Co.',                          75.43, 0.53,  0.71,  '9/1 12:00am'],
        ['Caterpillar Inc.',                    67.27, 0.92,  1.39,  '9/1 12:00am'],
        ['Citigroup, Inc.',                     49.37, 0.02,  0.04,  '9/1 12:00am'],
        ['E.I. du Pont de Nemours and Company', 40.48, 0.51,  1.28,  '9/1 12:00am'],
        ['Exxon Mobil Corp',                    68.1,  -0.43, -0.64, '9/1 12:00am'],
        ['General Electric Company',            34.14, -0.08, -0.23, '9/1 12:00am'],
        ['General Motors Corporation',          30.27, 1.09,  3.74,  '9/1 12:00am'],
        ['Hewlett-Packard Co.',                 36.53, -0.03, -0.08, '9/1 12:00am'],
        ['Honeywell Intl Inc',                  38.77, 0.05,  0.13,  '9/1 12:00am'],
        ['Intel Corporation',                   19.88, 0.31,  1.58,  '9/1 12:00am'],
        ['International Business Machines',     81.41, 0.44,  0.54,  '9/1 12:00am'],
        ['Johnson & Johnson',                   64.72, 0.06,  0.09,  '9/1 12:00am'],
        ['JP Morgan & Chase & Co',              45.73, 0.07,  0.15,  '9/1 12:00am'],
        ['McDonald\'s Corporation',             36.76, 0.86,  2.40,  '9/1 12:00am'],
        ['Merck & Co., Inc.',                   40.96, 0.41,  1.01,  '9/1 12:00am'],
        ['Microsoft Corporation',               25.84, 0.14,  0.54,  '9/1 12:00am'],
        ['Pfizer Inc',                          27.96, 0.4,   1.45,  '9/1 12:00am'],
        ['The Coca-Cola Company',               45.07, 0.26,  0.58,  '9/1 12:00am'],
        ['The Home Depot, Inc.',                34.64, 0.35,  1.02,  '9/1 12:00am'],
        ['The Procter & Gamble Company',        61.91, 0.01,  0.02,  '9/1 12:00am'],
        ['United Technologies Corporation',     63.26, 0.55,  0.88,  '9/1 12:00am'],
        ['Verizon Communications',              35.57, 0.39,  1.11,  '9/1 12:00am'],
        ['Wal-Mart Stores, Inc.',               45.45, 0.73,  1.63,  '9/1 12:00am']
    ];
	var myCols = [
            {
                text     : 'Company',
                sortable : false,
                dataIndex: 'company',
                width    : 200
				, locked : true
            },
            {
                text     : 'Price',
				id : "Col1",
                width    : 140,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Change',
				id : "Col2",
                width    : 140,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : '% Change',
				id : "Col3",
                width    : 140,
                sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'Col 4',
				id : "Col4",
                width    : 140,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                text     : 'Col 5',
				id : "Col5",
                width    : 140,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Col 6',
				id : "Col6",
                width    : 140,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : 'Col 7',
				id : "Col7",
                width    : 140,
                sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'Col 8',
				id : "Col8",
                width    : 140,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                text     : 'Col 9',
				id : "Col9",
                width    : 140,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Col 10',
				id : "Col10",
                width    : 140,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : 'Col 11',
				id : "Col11",
                width    : 140,
                sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'Col 12',
				id : "Col12",
                width    : 140,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                text     : 'Col 13',
				id : "Col13",
                width    : 140,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Col 14',
				id : "Col14",
                width    : 140,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : 'Col 15',
				id : "Col15",
                width    : 140,
                sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'Col 16',
				id : "Col16",
                width    : 140,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                text     : 'Col 17',
				id : "Col17",
                width    : 140,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                text     : 'Col 18',
				id : "Col18",
                width    : 140,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Col 19',
				id : "Col19",
                width    : 140,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : 'Col 20',
				id : "Col20",
                width    : 140,
                sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'Col 21',
				id : "Col21",
				width    : 140,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                text     : 'Col 22',
				id : "Col22",
				width    : 140,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Col 23',
				id : "Col23",
				width    : 140,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : 'Col 24',
                width    : 140,
				id : "Col24",
				sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'Col 25',
                width    : 140,
				id : "Col25",
				sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            },
            {
                text     : 'Col 26',
				id : "Col26",
				width    : 140,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Col 27',
				id : "Col27",
				width    : 140,
                sortable : true,
                dataIndex: 'change'
            },
            {
                text     : 'Col 28',
				id : "Col28",
                width    : 140,
				sortable : true,
                dataIndex: 'pctChange'
            },
            {
                text     : 'Col 29',
    			id : "Col29",
	            width    : 140,
				sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastChange'
            }

        ];


    // create the data store
    var store = Ext.create('Ext.data.ArrayStore', {
        fields: [
           {name: 'company'},
           {name: 'price',      type: 'float'},
           {name: 'change',     type: 'float'},
           {name: 'pctChange',  type: 'float'},
           {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
        ],
        data: myData
    });

    // create the Grid
    var grid = Ext.create('Ext.grid.Panel', {
			id: "FlowsheetGrid",
			height: 450,
			width: 600,
			frame: true,
			margin: "10 auto 10 auto",
			title: 'Flowsheet for Patient ' + "Some Name",
			renderTo: "GridPanel",
				buttonAlign: "left",
        store: store,
        columns: myCols,


    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [
			{ xtype : "combobox", 
			"fieldLabel" : "Select Cycle to hide",
			"labelWidth" : 120,
			"labelAlign" : "right",
			"width" : 500,
			"emptyText" : "List of Cycles",

				store : Ext.create('Ext.data.Store', {
    fields: ['hide', 'cols'],
    data : [
        {"hide":"Show All", "cols" : "0"},
        {"hide":"Cycle 2 (cols \"Price\" - \"Col 6\" inclusive)", "cols" : "1-7"},
        {"hide":"Cycle 3 (cols \"Col 7\" - \"Col 13\" inclusive)", "cols" : "7-14"},
        {"hide":"Cycle 4 (cols \"Col 14\" - \"Col 20\" inclusive)", "cols" : "14-21"},
        {"hide":"Cycle 5 (cols \"Col 21\" - \"Col 28\" inclusive)", "cols" : "21-29"}
    ]
}),
		queryMode: 'local',
		valueField: 'cols',
		displayField : 'hide',
listeners : 
			{ 
				change : function(theCombo, selectedText, s2, s3) {
				var grid = theCombo.up("grid");
				var i, col, cols, colID;
				cols = grid.columns;
				var numCols = grid.columns.length;
				if ("Show All" === selectedText) {
					for (i = 1; i < numCols; i++) {
						colID = "#Col" + i;
						col = grid.down(colID);
						col.show();
					}
				}
				else {
					var range = theCombo.value.split("-");
					for (i = 1; i < numCols; i++) {
						colID = "#Col" + i;
						col = grid.down(colID);
						col.show();
					}
					for (i = (1 * range[0]); i < (1*range[1]); i++) {
						colID = "#Col" + i;
						col = grid.down(colID);
						col.hide();
					}
				}


				}
			}



        }
		]
    }],

			features: [{
				id: 'group',
				ftype: 'groupingsummary',
				groupHeaderTpl: '{name}',
				hideGroupedHeader: true,
				enableGroupingMenu: false
			}]





/*************/
				,
		listeners: {
			viewready: function(){
                // var c = this.columns[10];
                // var p = c.getPosition();
                // this.scrollByDeltaX(p[0]-30);
				var i, col, cols, colID;
				cols = grid.columns;
				for (i = 1; i < 7; i++) {
					colID = "#Col" + i;
					col = grid.down(colID);
					col.hide();
				}
			}
		}
/*****************/
    });
	var tmpWidth = Ext.getBody().getViewSize().width - 50;
	var tmpHeight = Ext.getBody().getViewSize().height - 160;
	grid.setSize(tmpWidth, tmpHeight);

    /***
    var i, col, cols;
    cols = grid.columns;
    for (i = 1; i < 7; i++) {
        col = cols[i];
        if (col.hide) {
            alert("Can Hide");
            col.hide();
        }
        else {
            alert("No Hide");
        }
    }
    ***/

});