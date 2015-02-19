Ext.define('COMS.controller.TemplatePromotion.TemplatePromotionTab', {
    extend: 'Ext.app.Controller',
    stores: [
        "TemplateListStore"
        ,"TemplateListByLocationStore"
    ],
    views: [
        'TemplatePromotion.TemplatePromotionTab',
		"Common.selCTOSTemplate"
    ],

    refs: [
        { ref: "theGrid", selector: "TemplatePromotionTab"},
        {
            ref: "TemplateType",
            selector: "TemplatePromotionTab selCTOSTemplate selTemplateType"
        }
    ],

	init: function () {
		this.control({
			"scope" : this,

			"TemplatePromotionTab" : {
				"beforerender" : this.renderPanel
			},
			"TemplatePromotionTab selCTOSTemplate selTemplateType": {
				"select" : this.TemplateTypeChange
			},
			"TemplatePromotionTab selCTOSTemplate button": {
				"click" : this.ShowAllTemplates
			},
			"TemplatePromotionTab grid" : {
				"cellclick" : this.clickCell
			},
			"TemplatePromotionTab button[text=\"Refresh\"]": {
				click: this.HandleRefresh
			},
			"TemplatePromotionTab button[text=\"Update Records\"]": {
				click: function () {
					debugger;
					var theGrid = this.getTheGrid();
					theGrid.setLoading( "Updating Template Records", false );

					this.PostedRecsFailed = [];
					this.PostedRecs = [];

					var HandleResponse = function(record, status, theScope) {
						if (theScope.PostedRecs.length <= 0) {
							var theGrid = theScope.getTheGrid();
							theGrid.setLoading( false, false );
							if (theScope.PostedRecsFailed.length <= 0) {
								Ext.MessageBox.alert("Success", "The Template list has been updated.");
								theScope.HandleRefresh();
							}
							else {
								Ext.MessageBox.alert("Invalid", "The Template list has not updated");
							}
						}
						else {
							var aRec = theScope.PostedRecs.pop();
							if (aRec) {
								Ext.Ajax.request({
									url: Ext.URLs.TemplateLocation + aRec.ID,
									method : "PUT",
									jsonData : aRec,
									scope: theScope,
									success: ResponseAlertGood,
									failure: ResponseAlertFail
								});
							}
						}
					};
					var ResponseAlertFail = function(record) {
						this.PostedRecsFailed.push(record);
						HandleResponse(record, false, this);
					};
					var ResponseAlertGood = function(record) {
						HandleResponse(record, true, this);
					};


					var theStore = theGrid.getStore();
					var DirtyRecords = theStore.getUpdatedRecords();
					var drLen = DirtyRecords.length;
					this.NumRecords = drLen;
					if (drLen > 0) {
						// Run Update Process for each record.
						var i, rec;
						for (i = 0; i < drLen; i++) {
							this.CurRecIdx = i;
							rec = DirtyRecords[i];
							var Location = rec.get("Location");
							var recID = rec.get("id");
							if (null == Location || "" == Location) {
								Ext.MessageBox.alert("Information", "Please select a Location");
								return;
							}
							debugger;
							var JSON_Data = {"LocationID" : Location, "ID" : recID };
							this.PostedRecs.push(JSON_Data);
						}
						HandleResponse(null, null, this);	// Save the first record.
					}
					else {
						theGrid.setLoading( false, false );
					}
				}
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
    },






	"HandleRefresh" : function (button, evt, eOpts) {
        var theGrid = this.getTheGrid();
        theGrid.getStore().load();
	}

});
