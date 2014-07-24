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
		"NewPlan.CTOS.FlowSheetGrid",
		"NewPlan.CTOS.FlowSheetOptionalQues"
	],

    refs: [
		{ ref: "FlowSheetGrid",					selector: "FlowSheet FlowSheetGrid"},
		{ ref: "FlowSheetGridEdit",					selector: "Flowsheet button[name=\"EditOptionalQues\"]"}
	],

	TabContentsCleared : true,
	TabIsActive : false,


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
					this.TabIsActive = true;
					var theGrid = this.getFlowSheetGrid();
					this.getFlowSheetData("PAT_ID", theGrid);
				},
				deactivate : function() {
					this.TabIsActive = false;
				}
			},
			"FlowSheetGrid button[name=\"EditOptionalQues\"]" : {
				click: this.EditOptionalQuestions
			},
			"FlowSheetGrid [name=\"ShowCycles\"]" : {
				change: this.ComboSelect
			}

		});
	},


	ComboSelect : function(theCombo, newValue, oldValue, eOpts) {
		var grid = theCombo.up("grid");
		var comboStore = theCombo.getStore();
		var theRecord = comboStore.findRecord("label", theCombo.rawValue);
		var data, start, end;
		var i, col, cols, colID;
		data = theRecord.getData();
		start = data.StartIdx;
		end = data.EndIdx;
		// Note: A Locked Grid consists of TWO grids, one normal one and one locked
		// Hence the weird check for columns, because "grid" contains NO columns, the columns are in locked and normal grids.
		if (grid.normalGrid) {
			cols = grid.normalGrid.columns
		}
		else {
			cols = grid.columns;
		}
		
		var numCols = cols.length;

		// Note: Col 2 starts the Cycle Days, the first 2 columns hold the Category and Row Labels
		// Hide all cycles before selected one
		for (i = 2; i < start; i++) {
			colID = "#Col-" + i;
			col = grid.down(colID);
			if (col) {
				col.hide();
			}
		}
		// Show selected cycles
		for (i = start; i <= end; i++) {
			colID = "#Col-" + i;
			col = grid.down(colID);
			if (col) {
				col.show();
			}
		}
		// Hide all cycles after selected one
		for (i = end+1; i < numCols; i++) {
			colID = "#Col-" + i;
			col = grid.down(colID);
			if (col) {
				col.hide();
			}
		}

	},


	EditOptionalQuestions : function(btn) {
		var OptQues = Ext.widget("FlowSheetOptionalQues");
	},

	BeforeTabActivated : function (component, eOpts ) {
	},


	buildCycleList : function (data) {
		var startDay, endDay, days, hold, key, curCycle, cyc_day, attrName, cycleNum, cycleDay, part, aDate, startDate, endDate;
		var comboRec = {}, dayIdx = 0, CycleRecords = [], aRec = data;

// Data Model
// Label : Date in string format (dd/mm/yyyy)
// Column Model
// { "label", "Cycle", "StartDate", "StartDay", "StartIdx", "EndDate", "EndDay", "EndIdx"};

		for(key in aRec){
			if (aRec.hasOwnProperty(key)) {
				if (key !== "label" && key !== "-") {
					aDate = aRec[key];
					cyc_day = key.match(/\d*\d/g);
					cycleNum = cyc_day[0];
					cycleDay = cyc_day[1];
					if (!hold) {
						hold = { "hDate" : aRec[key], "Day" : cycleDay, "Cycle" : cycleNum, "Idx" : dayIdx };
						comboRec = { "label" : ("Show Cycle " + cycleNum + " " + aRec[key]), "StartDate" : aRec[key], "StartDay" : cycleDay, "Cycle" : cycleNum, "StartIdx" : dayIdx };
						curCycle = cycleNum;
					}
					if (curCycle && curCycle != cycleNum) {
						comboRec.EndDate = hold.hDate;
						comboRec.EndDay = hold.Day;
						comboRec.EndIdx = hold.Idx;
						comboRec.cols = comboRec.StartIdx + "-" + comboRec.EndIdx;
						comboRec.label += " - " + comboRec.EndDate;
						CycleRecords.push(comboRec);
						comboRec = { "label" : ("Show Cycle " + cycleNum + " " + aRec[key]), "StartDate" : aRec[key], "StartDay" : cycleDay, "Cycle" : cycleNum, "StartIdx" : dayIdx };
						curCycle = cycleNum;
					}
					hold = { "hDate" : aRec[key], "Day" : cycleDay, "Cycle" : cycleNum, "Idx" : dayIdx };
				}
				dayIdx++;
			}
		}
		comboRec.EndDate = hold.hDate;
		comboRec.EndDay = hold.Day;
		comboRec.EndIdx = hold.Idx;
		comboRec.cols = comboRec.StartIdx + "-" + comboRec.EndIdx;
		comboRec.label += " - " + comboRec.EndDate;
		CycleRecords.push(comboRec);
		return CycleRecords;

	},

	buildCycleDateObj : function (Cycle) {
		var strFormat = "d/m/Y";
		var tDate = new Date();
		var today = new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate());

		var sDate = Cycle.StartDate.replace(/\\/g, "/"); 
		var eDate = Cycle.EndDate.replace(/\\/g, "/"); 

		sDate = new Date(sDate);
		eDate = new Date(eDate);

		sDate = new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());
		eDate = new Date(eDate.getFullYear(), eDate.getMonth(), eDate.getDate());

		return {"sDate" : sDate, "eDate" : eDate, "today" : today };

	},

	isCycleFutureOrCurrent : function (Cycle) {
		var df = this.buildCycleDateObj(Cycle);
		return (df.eDate >= df.today);
	},

	isCyclePastOrCurrent : function (Cycle) {
		var df = this.buildCycleDateObj(Cycle);
		return (df.sDate <= df.today);
	},

	isCycleCurrent : function (Cycle) {
		var df = this.buildCycleDateObj(Cycle);
		return (df.sDate <= df.today && df.eDate >= df.today);
	},

	buildComboStore : function (data) {
		var CycleRecords = this.buildCycleList(data);
		var i, crLen = CycleRecords.length;
		var LastCycle, AllCycles = {}, PastCycle = {}, FutureCycle = {}, CurCycle = {};

		AllCycles.label = "Show All Cycles";
		AllCycles.StartDate = CycleRecords[0].StartDate;
		AllCycles.StartIdx = CycleRecords[0].StartIdx;
		AllCycles.EndDate = CycleRecords[crLen-1].EndDate;
		AllCycles.EndIdx = CycleRecords[crLen-1].EndIdx;

		LastCycle = CycleRecords[0];
		PastCycle.label = "Show Current plus All Past Cycles";
		PastCycle.StartDate = CycleRecords[0].StartDate;
		PastCycle.StartIdx = CycleRecords[0].StartIdx;

		for (i = 0; i < crLen; i++) {
			if (this.isCyclePastOrCurrent(CycleRecords[i])) {
				LastCycle = CycleRecords[i];
			}
		}
		PastCycle.EndDate = LastCycle.EndDate;
		PastCycle.EndIdx = LastCycle.EndIdx;

		LastCycle = CycleRecords[0];
		FutureCycle.label = "Show Current plus All Future Cycles";

		for (i = crLen-1; i > 0; i--) {
			if (this.isCycleFutureOrCurrent(CycleRecords[i])) {
				LastCycle = CycleRecords[i];
			}
		}
		FutureCycle.StartDate = LastCycle.StartDate;
		FutureCycle.StartIdx = LastCycle.StartIdx;
		FutureCycle.EndDate = AllCycles.EndDate;
		FutureCycle.EndIdx = AllCycles.EndIdx;

		CurCycle.label = "Show Current Cycle Only";
		LastCycle = CycleRecords[0];
		for (i = 0; i < crLen; i++) {
			if (this.isCycleCurrent(CycleRecords[i])) {
				LastCycle = CycleRecords[i];
			}
		}
		CurCycle.StartDate = LastCycle.StartDate;
		CurCycle.StartIdx = LastCycle.StartIdx;
		CurCycle.EndDate = LastCycle.EndDate;
		CurCycle.EndIdx = LastCycle.EndIdx;

		var comboStore = [];
		comboStore.push(AllCycles);
		comboStore.push(PastCycle);
		comboStore.push(FutureCycle);
		comboStore.push(CurCycle);
		for (i = 0; i < crLen; i++) {
			comboStore.push(CycleRecords[i]);
		}
		return comboStore;
	},


	getFlowSheetData : function(PAT_ID, theGrid) {
		Ext.Ajax.request({
			scope : this,
			url : Ext.URLs.FlowSheetRecords + "/" + PAT_ID,
			success : function( response) {
				var obj = Ext.decode(response.responseText);
				var theStore = this.createStore(obj.records);
				var theCols = this.createColumns(obj.records);
				var colsRecords = this.buildComboStore(obj.records[0]);
				var comboStore = Ext.getStore("FlowSheetCombo");
				comboStore.loadData(colsRecords);
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

	createStore : function (json) {
		var keys = this.getKeysFromJson(json[0]);
		return Ext.create('Ext.data.Store', {
			fields: keys,
			groupField: '-',
			data: json
		});
	},

	createColumns : function (json) {
		var idx = 0, key, jObj, firstRec = json[0], theCols = [];
		for (key in firstRec) {
			if (firstRec.hasOwnProperty(key)) {
				jObj = {};
				jObj.text = Ext.String.capitalize(key);
				jObj.key = key;
				jObj.idx = idx;
				jObj.width = 140;
				jObj.dataIndex = key;
				jObj.id = "Col-" + idx;
				if ("-" === key || "&nbsp;" === key) {
					jObj.hidden = true;
					jObj.text = "Category";
				}
				if ("LABEL" === key.toUpperCase()) {
					jObj.text = "";
					jObj.locked = true;
					jObj.width = 200;
				}
				theCols.push(jObj);
				idx += 1;
			}
		}
		return theCols;
	},


	TabRendered : function ( component, eOpts ) {
		this.getFlowSheetData("PAT_ID", component);
	},

	PatientSelected: function (combo, recs, eOpts) {
	}

});