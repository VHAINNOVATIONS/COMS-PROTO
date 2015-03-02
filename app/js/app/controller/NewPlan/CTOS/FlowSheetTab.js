Ext.define("COMS.controller.NewPlan.CTOS.FlowSheetTab", {
	"extend" : "Ext.app.Controller",

	"stores" : [
		"Toxicity",
		"FlowSheetCombo",
		"ToxGridStore"
	],

	"views" : [
		"NewPlan.CTOS.FlowSheet",
		"NewPlan.CTOS.DiseaseResponsePUWin",
		"NewPlan.CTOS.OtherPUWin",
		"NewPlan.CTOS.FlowSheetGrid",
		"NewPlan.CTOS.FlowSheetOptionalQues",
		"NewPlan.CTOS.DiseaseResponsePanel",
		// "NewPlan.CTOS.ToxicitySideEffectsPanel",
		"NewPlan.CTOS.FS_Toxicity",
		"NewPlan.CTOS.OtherInfoPanel",
		"NewPlan.CTOS.FS_ToxicityHistory"
	],

	"refs" : [
		{ "ref" : "FlowSheetGrid",					"selector" : "FlowSheet FlowSheetGrid"},
		{ "ref" : "FlowSheetGridEdit",				"selector" : "FlowSheet button[name=\"EditOptionalQues\"]"},
		{ "ref" : "DiseaseResponsePanel",			"selector" : "FlowSheet DiseaseResponsePanel"},
		{ "ref" : "FS_ToxicityHistory",				"selector" : "FlowSheet FS_ToxicityHistory"},

		// { "ref" : "ToxicitySideEffectsPanel",		"selector" : "FlowSheet ToxicitySideEffectsPanel"},

		{ "ref" : "FS_ToxicityHistory",				"selector" : "FlowSheet FS_ToxicityHistory"},
		{ "ref" : "OtherInfoPanel",					"selector" : "FlowSheet OtherInfoPanel"}

	],

	"init" : function () {
		wccConsoleLog("Initialized Flow Sheet Tab Controller!");

		this.application.on( 
			{ 
				"PatientSelected" : this.PatientSelected, 
				"scope" : this 
			},
			{
				"loadAdverseEventsHistory" : this.LoadToxicityHistory, 
				"scope" : this
			}
		);

		this.control({
			"scope" : this,
//			"FlowSheet FlowSheetGrid" : {
				// render : this.TabRendered
//			},
			"FlowSheet" : {
				activate : this.updateFlowsheetPanel
			},
			"FlowSheetGrid" : {
				select : this.clickNamedAnchor,		// ( this, record, row, column, eOpts )
				afterrender : function() { 
					Ext.resumeLayouts(true); 
				},
				afterlayout : function() { 
					Ext.resumeLayouts(true); 
				}

			},
			"FlowSheetGrid button[name=\"EditOptionalQues\"]" : {
				click: this.EditOptionalQuestions
			},
			"FlowSheetGrid [name=\"ShowCycles\"]" : {
				change: this.ComboSelect
			},

			"FlowSheet DiseaseResponsePanel" : {
				afterrender : Ext.togglePanelOnTitleBarClick
			},
			"FlowSheet FS_ToxicityHistory" : {
				afterrender : Ext.togglePanelOnTitleBarClick
			},
			"FlowSheet OtherInfoPanel" : {
				afterrender : Ext.togglePanelOnTitleBarClick
			}
		});
	},

	"ComboSelect" : function(theCombo) {
		this.application.loadMask("Showing Cycles");
		var grid = theCombo.up("grid");
		var comboStore = theCombo.getStore();
		var theRecord = comboStore.findRecord("label", theCombo.rawValue);
		var data, start, end;
		
		data = theRecord.getData();
		start = data.StartIdx;
		end = data.EndIdx;
		this.ShowSelectedCycles(grid, start, end);
		this.application.unMask();
	},

	EditOptionalQuestions : function() {
		Ext.widget("FlowSheetOptionalQues");
	},

	clickNamedAnchor : function (grid, record, rowIdx, colIdx) {

		var theGrid = grid;
		var theData = record.getData();
		var theLabel = theData.label;
		var theColumnValue = theData[Object.keys(theData)[colIdx+1]];

		if (theLabel !== "Disease Response" && theLabel !== "Toxicity" && theLabel !== "Other") {
			return;
		}
		var thePanel = null;
		if ("Disease Response" == theLabel) {
			thePanel = this.getDiseaseResponsePanel();
		}
		else if ("Toxicity" == theLabel) {
			thePanel = this.getFS_ToxicityHistory();
		}
		else if ("Other" == theLabel) {
			thePanel = this.getOtherInfoPanel();
		}

		//var theElID = theColumnValue.substring(theColumnValue.indexOf("\"")+1, theColumnValue.indexOf(">")-1);
		var theEl;	//  = Ext.get(theElID);
		if (thePanel) {
			thePanel.expand();
			theEl = thePanel.getEl();
			var top = theEl.getTop();
			window.scroll(0, top);
			theEl.focus(100);
		}


		// var theCell = grid.view.getCellByPosition({row:row, column:column});
//		var theKey = this.getFlowSheetGrid().normalGrid.columns[column].key;
//		var theDate = grid.store.getAt(0).data[theKey];
//		var tableID = "ToxPanel-" + theDate;

	},



	buildCycleList : function (data) {
		var hold, key, curCycle, cyc_day, cycleNum, cycleDay, aDate;
		var comboRec = {}, dayIdx = 0, CycleRecords = [], aRec = data;
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
		this.application.Patient.CurFlowSheetCycle = CurCycle;

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

















	buildComboStoreNEW : function (data) {
		var CycleRecords = this.buildCycleList(data);
		var i, crLen = CycleRecords.length;
		var LastCycle, AllCycles = {}, PastCycle = {}, FutureCycle = {}, CurCycle = {};

		AllCycles.label = "Show All Cycles";
		AllCycles.StartDate = CycleRecords[0].StartDate;
		AllCycles.StartIdx = CycleRecords[0].StartIdx;
		AllCycles.EndDate = CycleRecords[crLen-1].EndDate;
		AllCycles.EndIdx = CycleRecords[crLen-1].EndIdx;
		AllCycles.label = "Show All Cycles - " + AllCycles.StartIdx + " - " + AllCycles.EndIdx;

		LastCycle = CycleRecords[0];
		PastCycle.StartDate = CycleRecords[0].StartDate;
		PastCycle.StartIdx = CycleRecords[0].StartIdx;
		for (i = 0; i < crLen; i++) {
			if (this.isCyclePastOrCurrent(CycleRecords[i])) {
				LastCycle = CycleRecords[i];
			}
		}
		PastCycle.EndDate = LastCycle.EndDate;
		PastCycle.EndIdx = LastCycle.EndIdx;
		PastCycle.label = "Show Current plus All Past Cycles - " + PastCycle.StartIdx + " - " + PastCycle.EndIdx;



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
		FutureCycle.label = "Show Current plus All Future Cycles - " + " - " + FutureCycle.StartIdx + " - " + FutureCycle.EndIdx;



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
		CurCycle.label = "Show Current Cycle Only - " + CurCycle.StartIdx + " - " + CurCycle.EndIdx;

		this.application.Patient.CurFlowSheetCycle = CurCycle;

		var comboStore = [];
		comboStore.push(AllCycles);
		comboStore.push(PastCycle);
		comboStore.push(FutureCycle);
		comboStore.push(CurCycle);
		for (i = 0; i < crLen; i++) {
			CycleRecords[i].label += " - " + CycleRecords[i].StartIdx + " - " + CycleRecords[i].EndIdx;
			comboStore.push(CycleRecords[i]);
		}
		return comboStore;
	},


	"LoadToxicityHistory" : function() {
		this.getToxicityHistoryData(this.application.Patient.PAT_ID);
	},



	"updateFlowsheetPanel" : function() {
		// this.application.loadMask("Saving Information");
		Ext.suspendLayouts(); 
		var theGrid = this.getFlowSheetGrid();
		this.getFlowSheetData(this.application.Patient.id, this.application.Patient.PAT_ID, theGrid);
		this.getOptionalInfoData(this.application.Patient.PAT_ID);
		this.getToxicityHistoryData(this.application.Patient.PAT_ID);
/**
 **/
		var CurCycle = this.application.Patient.CurFlowSheetCycle;
		if (CurCycle) {
			this.ShowSelectedCycles(theGrid, CurCycle.StartIdx, CurCycle.EndIdx);
		}
/**
 **/
		Ext.resumeLayouts(true);
	},


	ShowSelectedCycles : function(grid, start, end) {
		Ext.suspendLayouts(); 
		end = end + 1;
		var theCols = this.createColumns(this.application.Patient.FlowsheetData);
		var theStore = this.createStore(this.application.Patient.FlowsheetData);
//		var numCols2Show = end - start;
//		var theCols1 = theCols;
//		var num2remove;
		var aLen = theCols.length;
		var Num2Trim;
		var startIndex;

		if (start <= 2) {
			// First Cycle
			Num2Trim = aLen - end;
			theCols.splice(end, Num2Trim);
		}
		else if (end >= aLen) {
			// Last Cycle
			theCols.splice(2, start-2);
		}
		else {
			theCols.splice(2, start-2);
			startIndex = end - start + 2;
			Num2Trim = theCols.length - startIndex+1;
			theCols.splice(startIndex, Num2Trim);
		}




		grid.reconfigure(theStore, theCols);
		Ext.resumeLayouts(true);
		return;




	},



	maskFlowSheetPanels : function(panel, title) {
		panel.setTitle(title + "- Loading Data");
		// Ext.suspendLayouts();
		panel.setLoading( "Loading " + title + " Information", false );
	},
	unMaskFlowSheetPanels : function(panel, title) {
		// Ext.resumeLayouts();
		panel.setLoading( false, false );
		panel.setTitle(title);
	},

	getFlowSheetData : function(PatientID, PAT_ID, theGrid) {
		this.maskFlowSheetPanels(theGrid, "Flowsheet");

		Ext.Ajax.request({
			scope : this,
			url : Ext.URLs.FlowSheetRecords + "/" + PatientID + "/" + PAT_ID,
			success : function( response) {
				var obj = Ext.decode(response.responseText);
				this.application.Patient.FlowsheetData = obj.records;
				if (obj.records) {
					var theStore = this.createStore(obj.records);
					var theCols = this.createColumns(obj.records);
					var colsRecords = this.buildComboStore(obj.records[0]);
					var comboStore = Ext.getStore("FlowSheetCombo");
					comboStore.loadData(colsRecords);
					theGrid.reconfigure(theStore, theCols);
					theGrid.setTitle("Flowsheet");
				}
				else {
					theGrid.setTitle("Flowsheet - No Data Available");
				}
				this.unMaskFlowSheetPanels(this.getFlowSheetGrid(), "Flowsheet");
			},

			failure : function( ) {
				this.unMaskFlowSheetPanels(this.getFlowSheetGrid(), "Flowsheet");
				alert("Attempt to load Flow Sheet data failed.");
			}
		});
	},

	getToxicityHistoryData : function(PAT_ID) {
		var URL = Ext.URLs.AdverseEventsHistory + "/" + this.application.Patient.PAT_ID;
		var theModule = this.getFS_ToxicityHistory();
		this.maskFlowSheetPanels(theModule, "Toxicity History");

		Ext.Ajax.request({
			scope : this,
			url: URL,
			success: function( response, opts ){
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );

				if (resp.success) {
					if (resp.records) {
						var i, len, rec;
						this.application.Patient.Assessments = resp.records.Assessments;
						this.application.Patient.Reactions = resp.records.ReactAssessments;
						this.application.Patient.TotalAdverseEvents = resp.totalEvents;
						var theController = this.getController("NewPlan.AdverseEventsHistory");
						var data = theController.MergeAssessmentAndReactionLists(resp.records.Assessments, resp.records.ReactAssessments);
						theModule.update(data.list);
					}
				}
				else {
					alert("load Flow Sheet Toxicity History - Error");
				}
				this.unMaskFlowSheetPanels(theModule, "Toxicity History");
			},
			failure : function( response, opts ) {
				this.unMaskFlowSheetPanels(theModule, "Toxicity History");
				alert("Flow Sheet Toxicity History Data Load Failed...");
			}
		});
	},

	getOptionalInfoData : function(PAT_ID) {
		this.maskFlowSheetPanels(this.getDiseaseResponsePanel(), "Disease Response");
		this.maskFlowSheetPanels(this.getOtherInfoPanel(), "Additional General Information");

		Ext.Ajax.request({
			scope : this,
			url : Ext.URLs.FlowSheetOptionalInfo + "/" + PAT_ID,
			success : function( response) {
				var obj = Ext.decode(response.responseText);

				var Panel = this.getDiseaseResponsePanel();
				Panel.update(obj);
				this.unMaskFlowSheetPanels(Panel, "Disease Response");

				Panel = this.getOtherInfoPanel();
				Panel.update(obj);
				this.unMaskFlowSheetPanels(Panel, "Additional General Information");
			},

			failure : function( ) {
				this.unMaskFlowSheetPanels(Panel, "Disease Response - Failed to load Disease Response Information");
				alert("Attempt to load Flow Sheet data failed.");
				// console.log("Restoring Disease Response ERROR");
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
				jObj.renderer = Ext.util.Format.htmlDecode;

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
	PatientSelected: function (combo, recs, eOpts) {
	}

});
