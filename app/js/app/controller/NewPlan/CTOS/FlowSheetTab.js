Ext.define("COMS.controller.NewPlan.CTOS.FlowSheetTab", {
	extend: "Ext.app.Controller",

	stores: [
		"Toxicity",
		"FlowSheetCombo"
	],

	views: [
		"NewPlan.CTOS.FlowSheet",
		"NewPlan.CTOS.ToxicitySideEffectsPanel",
		"NewPlan.CTOS.ToxicitySideEffectsPUWin",
		"NewPlan.CTOS.DiseaseResponsePUWin",
		"NewPlan.CTOS.OtherPUWin",
		"NewPlan.CTOS.FlowSheetGrid"
	],

	TabContentsCleared : true,
	TabIsActive : false,
	data : [
		{"hide" : "Data1", "cycle" : "1-7" }, 
		{"hide" : "Data2", "cycle" : "7-14" }, 
		{"hide" : "Data3", "cycle" : "14-21" }, 
		{"hide" : "Data4", "cycle" : "21-28" }, 
		{"hide" : "Data5", "cycle" : "28-35" }
	],


	init: function () {
		wccConsoleLog("Initialized Flow Sheet Tab Controller!");

		this.application.on( 
			{ 
				PatientSelected : this.PatientSelected, 
				scope : this 
			}
		);

		this.control({
			"FlowSheet FlowSheetGrid" : {
				render : this.TabRendered
			},
			"FlowSheet" : {
				beforeactivate : this.BeforeTabActivated,
				activate : function(component) {
					debugger;
					this.TabIsActive = true;
					this.getFlowSheetData("PAT_ID", component);
				},
				deactivate : function() {
					this.TabIsActive = false;
				}
			}
		});
	},


	BeforeTabActivated : function (component, eOpts ) {
	},


	getFlowSheetData : function(PAT_ID, theGrid) {
		Ext.Ajax.request({
			scope : this,
			url : Ext.URLs.FlowSheetRecords + "/" + PAT_ID,
			success : function( response) {
				debugger;
				var obj = Ext.decode(response.responseText);
				var theStore = this.createStore(obj.records);
				var theCols = this.createColumns(obj.records);
				var comboStore = Ext.getStore("FlowSheetCombo");
				comboStore.loadData(this.data);

				theGrid.reconfigure(theStore, theCols);
				// this.application.unMask();
			},

			failure : function( ) {
				// this.application.unMask();
				alert("Attempt to load Flow Sheet data failed.");
			}
		});

	},

    getKeysFromJson : function (obj) {
        var keys = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    },

    getColsFromJson : function (obj) {
        var keys = [], i = 0, jObj = {};

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
				jObj.key = key;
				jObj.idx = i++;
                keys.push(jObj);
            }
        }
        return keys;
    },

    createStore : function (json) {
        var keys = this.getKeysFromJson(json[0]);
        return Ext.create('Ext.data.Store', {
            fields: keys,
            data: json
        });
    },

	createColumns : function (json) {
		var keys = this.getColsFromJson(json[0]);
		return keys.map(function (field) {
			var jObj = {};
			debugger;
			jObj.text = Ext.String.capitalize(field.key);
			jObj.width = 140;
			jObj.dataIndex = field.key;
			jObj.id = "Col" + field.idx;
			if ("name" === field) {
				jObj.locked = true;
				jObj.width = 200;
			}
			return jObj;
		});
	},


	TabRendered : function ( component, eOpts ) {
		this.getFlowSheetData("PAT_ID", component);
	},

	PatientSelected: function (combo, recs, eOpts) {
	}

});