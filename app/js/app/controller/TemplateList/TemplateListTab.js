Ext.define('COMS.controller.TemplateList.TemplateListTab', {
    extend: 'Ext.app.Controller',
    stores: [
        "TemplateListStore"
        ,"TemplateListByLocationStore"
    ],
    views: [
        'TemplateList.TemplateListTab',
		"Common.selCTOSTemplate"
    ],

    refs: [
        { ref: "theGrid", selector: "TemplateListTab grid"},
        {
            ref: "TemplateType",
            selector: "TemplateListTab selCTOSTemplate selTemplateType"
        }
    ],

	init: function () {
		this.control({
			"scope" : this,

			"TemplateListTab" : {
				"beforerender" : this.renderPanel
			},
			"TemplateListTab selCTOSTemplate selTemplateType": {
				"select" : this.TemplateTypeChange
			},
			"TemplateListTab selCTOSTemplate button": {
				"click" : this.ShowAllTemplates
			},
			"TemplateListTab grid" : {
				"cellclick" : this.clickCell
			}
		});
	},

	showPatientListWidget : function(thePatients, theTemplateDesc) {
		this.application.TemplateListPatients = thePatients;
		var theWidget = Ext.widget("puWinListPatients");
		var theTitle = "Patients Currently Undergoing Treatment - " + theTemplateDesc;
		theWidget.setTitle( theTitle );
	},

	clickCell : function(grid,td,cellIndex,record,tr,rowIndex,e,eOpts) {
		var columnIndex;
		columnIndex = this.getColumnIndex(grid, "PatientCount");     
		if (cellIndex == columnIndex) {       //you have a match...do your popup code here    
			var theData = record.getData();
			this.showPatientListWidget( theData.Patients, theData.description );
		}
		columnIndex = this.getColumnIndex(grid, "id");     
		if (cellIndex == columnIndex) {       //you have a match...do your popup code here    
			// Print/View
		}
	}, 

	getColumnIndex: function (grid, dataIndex) {   
		var gridColumns = grid.headerCt.getGridColumns();   
		for (var i = 0; i < gridColumns.length; i++) {
			if (gridColumns[i].dataIndex == dataIndex) {
				return i;
			}
		}
	},

	renderPanel: function (panel) {
		var theGrid = this.getTheGrid();
		theGrid.getStore().load();
		return true;
	},
    TemplateTypeChange: function (combo, recs, eOpts) {
        var guid = combo.getValue();
        var text = combo.getRawValue();
        var theGrid = this.getTheGrid();
        theGrid.reconfigure("TemplateListByLocationStore");
        var newURL = Ext.URLs.TemplateListByLocation + "/" + guid;
        theGrid.getStore().load({url : newURL});
    },

    ShowAllTemplates: function() {
        var theGrid = this.getTheGrid();
        theGrid.reconfigure("TemplateListStore");
        theGrid.getStore().load();
    }
});
