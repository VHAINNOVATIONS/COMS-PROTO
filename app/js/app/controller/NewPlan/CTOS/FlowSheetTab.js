Ext.define("COMS.controller.NewPlan.CTOS.FlowSheetTab", {
	extend: "Ext.app.Controller",

	stores: [
	],

	views: [
		"NewPlan.CTOS.FlowSheet",
		"NewPlan.CTOS.Toxicity_SideEffects"
	],

	refs: [
	    {
		    ref: "FlowSheet",
			selector: "FlowSheet"
	    },

	    {
		    ref: "FlowSheetGrid",	// This is a container which will hold the grid once it's created.
			selector: "FlowSheet [name=\"flowsheet grid\"]"
	    },
		{
			ref: "CTOS_Tabs",
			selector: "NewPlanTab CTOS"
		},
	    {
		    ref: "FlowSheetOverview",
			selector: "FlowSheetOverview"
	    },
	    {
		    ref: "FlowSheetBody",
			selector: "FlowSheetBody"
	    }
	],

	TabContentsCleared : true,
	TabIsActive : false,

	init: function () {
		wccConsoleLog("Initialized Flow Sheet Tab Controller!");

		this.application.on( 
			{ 
				PatientSelected : this.PatientSelected, 
				// PopulateNDTabs : this.GenInfoRendered,	// Event is fired off from the NursingDocs Tab Controller when the NursingDocs Tab is activated
				// ClearNDTabs : this.ClearTabData,		// Event is fired off from the NursingDocs Tab Controller when a new patient is selected
				scope : this 
			}
		);

		this.control({
			"FlowSheet" : {
				beforeactivate : this.BeforeTabActivated,
				activate : function() {
					this.TabIsActive = true;
				},
				deactivate : function() {
					this.TabIsActive = false;
				}
			},

			"FlowSheet [name=\"flowsheet grid\"]" : {
				render : this.TabRendered
			}
		});
	},

	/**********************
	 *
	 *	Called when the "PatientSelected" event is triggered from the top of the NewTab Panel Select Patient drop down
	 *	This adjusts the values in the "Select Applied Template" drop down based on the selected user
	 *
	 **********************/
	PatientSelected: function (combo, recs, eOpts) {
		var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");

		var theGrid = Ext.getCmp("FlowsheetGrid");
		if (theGrid && theGrid.rendered) {
			Ext.destroy(theGrid);
		}

		var Flowsheet = thisCtl.getFlowSheet();
		if (Flowsheet) {
			if (Flowsheet.rendered) {
				this.TabContentsCleared = true;
				this.createFlowsheet(this.createFSGrid);		// TRUE, because we want to build & Display the FS Grid after generating the store
			}
		}
	},

	TabRendered : function ( component, eOpts ) {
		this.createFlowsheet(this.createFSGrid);		// TRUE, because we want to build & Display the FS Grid after generating the store
	},

	BeforeTabActivated : function (component, eOpts ) {
		var PatientInfo = this.application.Patient;
		if ("" === PatientInfo.TemplateID) {
			alert("No Template has been applied to this patient\nTab will not display");
			this.getCTOS_Tabs().setActiveTab( 0 );
			var theGrid = Ext.getCmp("FlowsheetGrid");
			if (theGrid && theGrid.rendered) {
				Ext.destroy(theGrid);
			}
			return false;
		}


		if ( this.TabContentsCleared ) {
			this.TabContentsCleared = false;
		}
		var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
		var Flowsheet = thisCtl.getFlowSheet();
		if (Flowsheet) {
			if (Flowsheet.rendered) {
				this.createFlowsheet(this.createFSGrid);		// TRUE, because we want to build & Display the FS Grid after generating the store
			}
		}
		return true;
	},

	CellEditCommit : function (editor, eObj) {
		var Patient = this.application.Patient;
		var fieldName = eObj.grid.getStore().getAt(eObj.rowIdx).get("label");
		switch (fieldName) {
		case "Weight (lbs)":
			fieldName = "Weight";
			break;
		case "Disease Response":
			fieldName = "DiseaseResponse";
			break;
		case "Toxicity Side Effects":
			fieldName = "Toxicity";
			break;
		case "Other":
			fieldName = "Other";
			break;
		}

		var Header = eObj.grid.headerCt.items.items[eObj.colIdx].text;
		var cd = Header.split(", ");		// Header is formated like "Cycle XX, Day YY", so a split on ", " gives cd = [ "Cycle XX", "Day YY"];

		var newRecord = {};
		newRecord.PAT_ID = Patient.PAT_ID;		// Treatment ID;
		newRecord.FlowsheetAdminDay = {};
		newRecord.FlowsheetAdminDay[fieldName] = eObj.value;
		newRecord.FlowsheetAdminDay.PatientID = Patient.id;
		newRecord.FlowsheetAdminDay.Cycle = cd[0].split(" ")[1];
		newRecord.FlowsheetAdminDay.Day = cd[1].split(" ")[1];
		newRecord.FlowsheetAdminDay.AdminDate = eObj.grid.getStore().getAt(0).get(eObj.column.dataIndex);

        var fsTemplate = Ext.create(Ext.COMSModels.Flowsheet, newRecord );

		fsTemplate.save({
            scope: this,
            success: function (data) {
                wccConsoleLog("Saved Template " );
			},
			failure : function ( data ) {
				alert("Flowsheet Save unsuccessful");
			}
		});
	},

	CellEdit : function (plugin, eObj, beforeEdit) {
		var theRecord = eObj.record;
		var theStore = eObj.grid.getStore();
		var DateRecord = theStore.getAt(0);	// Date row is first row in the store.
		var data = DateRecord.data;
		var AdminDate = data[eObj.column.dataIndex];
		var Today = Ext.Date.format(new Date(), "m/d/Y");

		var label = theRecord.data.label;
//		if ("Weight (lbs)" === label || "Disease Response" === label || "Toxicity Side Effects" === label || "Other" === label ) {
	// In response to e-mail from Lou (dated 26 Jun 2012 20:36:20 ) weight should not be an editable field here.
		if ("Disease Response" === label || "Toxicity Side Effects" === label || "Other" === label ) {
			if (AdminDate === Today) {
				return true;
			}
			alert("You can only edit cells where today is the current Admin Date");
			return false;
		}
		alert("You can only edit the \"Disease Response\", \"Toxicity Side Effects\" or \"Other\" cells");
		return false;
	},




	HandleFlowsheetBtnClicks : function (event, element) {
		var btnName = element.getAttribute("name");
		var btnType = element.getAttribute("cellType");
		var btnDate = element.getAttribute("date");
		var btnRecHdr = element.getAttribute("recHdr");

		var btnData = unescape(element.getAttribute("data"));
		btnData = btnData.replace(/\n/g, '<br />');

		var Patient = this.application.Patient;
		// alert("Name - " + btnName + "\nType - " + btnType + "\nDate - " + btnDate + "\nData - " + btnData );
		if ("ViewFSData" === btnName) {
			Ext.MessageBox.show({
				title : btnType,
				msg : btnData,
				buttons : Ext.MessageBox.OK
			});
		}
		else {
			Ext.create("Ext.window.Window", {
				title: btnType,
				height : 220,
				width : 600,
				layout: "form",
				Hdr : btnRecHdr,
				AdmDate : btnDate,
				BtnType : btnType,
				items : [{
					xtype : "textareafield", grow : true, name : "Data", fieldLabel : "Enter text", margin: "10"
				}],
				buttons : [
					{ 
						text : "Save", 
						scope : this,
						handler : function(btn, evt) {
					        var win = btn.up('window');
							var initialConfig = win.getInitialConfig();
							var theField = win.down('textareafield');
					        var value = theField.getValue();
							var fieldName;
							var theGrid = Ext.getCmp("FlowsheetGrid");
							var Patient = this.application.Patient;
							var cType = win.initialConfig.BtnType;
							var Header = win.initialConfig.Hdr;
							var AdmDate = win.initialConfig.AdmDate;
							switch (cType) {
								case "Disease Response":
									fieldName = "DiseaseResponse";
									break;
								case "Toxicity Side Effects":
									fieldName = "Toxicity";
									break;
								case "Other":
									fieldName = "Other";
									break;
							}


							var cd = Header.split(", ");		// Header is formated like "Cycle XX, Day YY", so a split on ", " gives cd = [ "Cycle XX", "Day YY"];

							var newRecord = {};
							newRecord.PAT_ID = Patient.PAT_ID;		// Treatment ID;
							newRecord.FlowsheetAdminDay = {};
							newRecord.FlowsheetAdminDay[fieldName] = value;
							newRecord.FlowsheetAdminDay.PatientID = Patient.id;
							newRecord.FlowsheetAdminDay.Cycle = cd[0].split(" ")[1];
							newRecord.FlowsheetAdminDay.Day = cd[1].split(" ")[1];
							newRecord.FlowsheetAdminDay.AdminDate = AdmDate;

					        var fsTemplate = Ext.create(Ext.COMSModels.Flowsheet, newRecord );

							fsTemplate.save({
					            scope: this,
					            success: function (data) {
					                wccConsoleLog("Saved Template " );
									this.createFlowsheet(this.createFSGrid);		// Refresh so we can display the new cell. TRUE, because we want to build & Display the FS Grid after generating the store
									win.close();
								},
								failure : function ( data ) {
									alert("Flowsheet Save unsuccessful");
									win.close();
								}
							});
						}
					},
					{
						text : "Cancel",
						handler : function(btn, evt) {
							var win = btn.up('window');
							win.close();
						}
					}
				]
			}).show();
		}
	},


		/**************************************
		 *
		 *		NEW Code to replace above
		 *
		 **************************************/
	// Loads the data which was entered in the Treatment Panel as well as the edited cells (e.g. "Disease Response", "Toxicity" and "Other")
	createFSGrid : function () {
		var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
		var Flowsheet = thisCtl.getFlowSheetGrid();
		var FlowsheetEl = Flowsheet.getEl();
		var FSColumns = this.application.Patient.FSColumns;

		// Since we have a dynamic store and data set we need to destroy and re-create the grid everytime we open the panel up
		// to make sure that the latest data is displayed in the grid.
		var theGrid = Ext.getCmp("FlowsheetGrid");
		if (theGrid && theGrid.rendered) {
			Ext.destroy(theGrid);
		}

		theGrid = Ext.create('Ext.grid.Panel', {
			id : "FlowsheetGrid",
		    renderTo: FlowsheetEl,
			autoScroll: 'y',
			columnLines: true,
			viewConfig: { stripeRows: true, forceFit: true },

			store: Ext.data.StoreManager.lookup('ChemoResults'),
		    columns: FSColumns,					// <-- Columns Data
		    features: [{ftype:'grouping'}]
		});

		theGrid.on("afterlayout", function() {
			var thisCtl = this.getController("NewPlan.CTOS.FlowSheetTab");
			var FlowsheetPanel = thisCtl.getFlowSheet();
			FlowsheetPanel.forceComponentLayout();	// Since the grid is added after the panel has been rendered, this function causes the panel to resize to fit the grid.

			var btns1 = FlowsheetEl.select("button");
			btns1.removeAllListeners();
			btns1.on("click", this.HandleFlowsheetBtnClicks, this);
		}, this);

	},

// FSModel (first parameter) was apparently never used.
// buildGrid - function to build the grid upon completion of creating the store
//	For some calls to this function (as in when we're doing the EoTS) a grid is not needed.
LoadFlowsheetData : function (FSFields, FSColumns, FSData, buildGrid) {
		var Patient = this.application.Patient;
		var PAT_ID = Patient.PAT_ID;
		this.FSData = FSData;
		this.FSFields = FSFields;
		this.FSColumns = FSColumns;

		Ext.Ajax.request({
			scope : this,
			url : Ext.URLs.FlowSheetRecords + "/" + PAT_ID,
			success : function( response /*, opts */) {
				var obj = Ext.decode(response.responseText);
				var theData, tdLen = 0;
				if (obj.records) {
					theData = obj.records;
					tdLen = theData.length;
				}
				var FSData = this.FSData;
				var FSFields = this.FSFields;
				var FSColumns = this.FSColumns;

				var aRec, bRec, i, j, x, y, cellFlag, recLabel, recLen, fsdLen = FSData.length;

				var CycleDay;
				var today = new Date();
				today = Ext.Date.format(today, 'm/d/Y');

				for (i = 0; i < fsdLen; i++) {
					bRec = FSData[i];
					if ("Date" === bRec.label) {
						for (x in bRec) {
							if (bRec.hasOwnProperty(x) && "Type" !== x && "label" !== x) {
								var theDate = bRec[x];
								if (today == theDate) {
									CycleDay = x;
									break;
								}
							}
						}
						break;
					}
				}
				// if CycleDay is null then today is not an Admin Day
				
				
				
				// on back end we need to use "Type" for the element label. But the grid would display the word "Type" for each category
				// So we need to change the label from "Type" to something that doesn't display (e.g. "&nbsp;")
				// it's easier to create a new element and delete the old than to change the attribute name
				for (i = 0; i < tdLen; i++) {
					theData[i]["&nbsp;"] = theData[i].Type;
					delete theData[i].Type;
				}


				
				// Walk through all the data recieved and merge it into the appropriate elements in the FSData array based on matching column labels (e.g. "Cycle 1, Day 1")
				// which are not the same all the time. But are the same for any specific treatment.
				for (i = 0; i < tdLen; i++) {
					aRec = theData[i];
					if ("Disease" === aRec.label) {
						aRec.label = "Disease Response";
					}
					if ("Toxicity" === aRec.label) {
						aRec.label = "Toxicity Side Effects";
					}
					if ("Date" !== aRec.label) {
						for (j = 0; j < fsdLen; j++) {
							recLabel = aRec.label;
							switch (aRec.label) {
							case "Disease Response":
								cellFlag = "DiseaseResponse";
								break;
							case "Other":
								cellFlag = "Other";
								break;
							case "Toxicity Side Effects":
								cellFlag = "Toxicity";
								break;
							default:
								cellFlag = "";
								break;
							}

							bRec = FSData[j];
							var a = aRec["&nbsp;"], 
								b = bRec["&nbsp;"], 
								c = aRec.label, 
								d = bRec.label;
							if ((a === b) && (c === d)) {
								recLen = aRec.length;
								for (x in aRec) {
									if (aRec.hasOwnProperty(x) && "&nbsp;" !== x && "label" !== x) {
										y = aRec[x];
										if ("" !== cellFlag) {
											y = "<button class=\"anchor " + cellFlag + "\" name=\"ViewFSData\" cellType=\"" + recLabel + "\" date=\"" + today + "\" recHdr=\"" + x + "\" data=\"" + escape(y) + "\" >View</button>";
										}
										bRec[x] = y;
										// break;	<-- MWB - 7/20/2012 Don't break out of the loop! Need to get the rest of the elements of the aRec for the remaining days of the therapy!
									}
								}
							}
							FSData[j] = bRec;		// Moved outside of the loop as we need to get all elements into the bRec, and might as well only do this once.
						}
					}
				}


				this.application.Patient.FlowsheetData = FSData;	// MWB - 7/24/2012 - For use in EoTS
				this.application.Patient.FSColumns = FSColumns;


				var store = Ext.data.StoreManager.lookup('ChemoResults');
				if (store) {
					Ext.destroy(store);
				}
				store = Ext.create('Ext.data.Store', {
				    storeId:'ChemoResults',
				    fields: FSFields,

				    groupField: "&nbsp;",
				    data: { "ChemoResults" : FSData },
				    proxy: {
				        type: 'memory',
				        reader: {
				            type: 'json',
				            root: 'ChemoResults'
				        }
				    }
				});

					/**********
					 *
					 *	Create the flowsheet grid
					 *
					 *********/
				if (buildGrid) {
					var fn = Ext.bind(buildGrid, this);
					fn();
				}

				this.application.unMask();
			},

			failure : function( /* response, opts */ ) {
				this.application.unMask();
				alert("Attempt to load latest treatment data failed.");
			}
		});
},

/****
 *
 *	Builds the store for the flowsheet from the current Template assigned to the current patient (to get the list of drugs to be administered), 
 *	and the OEM Record Data for the current patient.
 *
 *	MWB - 6/7/2012
 *	Ideally this needs to be built from the Order Sheet of drugs dispensed for administration on any given administration day.
 *
 ****/
createFlowsheet : function (BuildGrid) {
		var OEM_Data;
		var OEM_DataLen;
		var OEM_Record;
		var i, j, hdr, di;
		var FSFields = [], FSColumns = [];

		if (this.application.Patient.OEMRecords && this.application.Patient.OEMRecords.OEMRecords) {
			OEM_Data = this.application.Patient.OEMRecords.OEMRecords;
			OEM_DataLen = OEM_Data.length;
		}
		else {
			var theGrid = Ext.getCmp("FlowsheetGrid");
			if (theGrid && theGrid.rendered) {
				Ext.destroy(theGrid);
			}
			return;		// No OEM Data for this patient, probably does not currently have an active template.
		}


        this.application.loadMask("Building Flowsheet... One moment please");		


		var Patient = this.application.Patient;
		var curTemplate = Patient.AppliedTemplate;
		var TherapyMeds, PreTherapyMeds, PostTherapyMeds;
		try {
			TherapyMeds = curTemplate.Meds;
			PreTherapyMeds = curTemplate.PreMHMeds;
			PostTherapyMeds = curTemplate.PostMHMeds;
		}
		catch (e) {
			alert("Can't access Medications in Template");
		}

		var today = new Date();
		today = Ext.Date.format(today, 'm/d/Y');

		//
		// Build Associative Array of Vitals for PS and Weight
		//
		var Vitals = this.application.Patient.Vitals;
		var vLen = Vitals.length, aVital, V;
		var assVitals = [];
		for (i = 0; i < vLen; i++) {
			aVital = Vitals[i];
			V = {};
			V.PS = aVital.PS;
			V.PSID = aVital.PSID;
			V.Weight = aVital.Weight;
			assVitals[aVital.DateTaken] = V;
		}

		var tmp, V_PS, V_Weight;

		var FSPSRow = {"label" : "Performance Status", "&nbsp;" : "01 General"};
		var FSWeightRow = {"label" : "Weight (lbs)", "&nbsp;" : "01 General"};
		var FSDateRow = {"label" : "Date", "&nbsp;" : "01 General"};
		var FSDiseaseResponse = {"label" : "Disease Response", "&nbsp;" : "01 General"};
		var FSToxicity = {"label" : "Toxicity Side Effects", "&nbsp;" : "01 General"};
		var FSOther = {"label" : "Other", "&nbsp;" : "01 General"};
		var FSLabs =  {"label" : "Unknown...", "&nbsp;" : "02 Laboratory Results"};

		FSFields.push("label");
		FSFields.push("&nbsp;");
		FSColumns.push({ "header" : "", "dataIndex" : "label", "width" : 140 });

		
		// Walk all the Data Records from the OEM data (this determines the # of and dates of Administration Days)
		// building the basic data store.
		// Some of the data here should be pulled from the previously saved Flowsheet Store data.
		// Since the data can have different # of columns and rows depending on the specific Template/OEM data a single store is not possible
		// So each column in the Store would represent a specific data Model (Flowsheet model).
		for (i = 0; i < OEM_DataLen; i++) {
			OEM_Record = OEM_Data[i];
			di = "day" + (i+1);
			hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
			FSFields.push(hdr);
			FSColumns.push({ "header" : hdr, "dataIndex" : hdr, "width" : 90, field: { xtype : "textfield" }});

				// Get Vitals for this Admin Date if any exist and get PS and Weight from that Vital object
			tmp = assVitals[OEM_Record.AdminDate];
			V_PS = "";
			V_Weight = "";
			if (tmp){
				V_PS = "<abbr title=\"" + tmp.PS + "\">" + tmp.PSID + "</abbr>";
				V_Weight = V.Weight;
			}

            FSPSRow[hdr] = V_PS;
			FSWeightRow[hdr] = V_Weight;
			FSDateRow[hdr] = OEM_Record.AdminDate;
			FSDiseaseResponse[hdr] = "";
			FSToxicity[hdr] = "";
			FSOther[hdr] = "";
			FSLabs[hdr] = "";

			if (today === OEM_Record.AdminDate) {
				FSDiseaseResponse[hdr] = "<button class=\"anchor DiseaseResponse\" name=\"WriteFSData\" cellType=\"Disease Response\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
				FSToxicity[hdr] = "<button class=\"anchor Toxicity\" name=\"WriteFSData\" cellType=\"Toxicity Side Effects\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
				FSOther[hdr] = "<button class=\"anchor Other\" name=\"WriteFSData\" cellType=\"Other\" recHdr=\"" + hdr + "\" date=\"" + today + "\">Write</button>";
			}
		}


		// build the "empty" arrays of data for each of the treatments (Pre, Therapy, Post)
		// This is done so we have all the columns preset based on the cycle/day
		PreTherapyMeds = curTemplate.PreMHMeds;
		var FSPreMedsList = [], PreMedsListLen = PreTherapyMeds.length;
		for (i = 0; i < PreMedsListLen; i++) {
			FSPreMedsList[i] = {};
			FSPreMedsList[i].label = PreTherapyMeds[i].Drug;
			FSPreMedsList[i]["&nbsp;"] = "02 Pre Therapy";

			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSPreMedsList[i][hdr] = "";
			}
		}

		TherapyMeds = curTemplate.Meds;
		var FSMedsList = [];
		var MedsListLen = TherapyMeds.length;
		for (i = 0; i < MedsListLen; i++) {
			FSMedsList[i] = {};
			FSMedsList[i].label = TherapyMeds[i].Drug;
			FSMedsList[i]["&nbsp;"] = "03 Therapy";

			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSMedsList[i][hdr] = "";
			}
		}


		PostTherapyMeds = curTemplate.PostMHMeds;
		var FSPostMedsList = [];
		var PostMedsListLen = PostTherapyMeds.length;
		for (i = 0; i < PostMedsListLen; i++) {
			FSPostMedsList[i] = {};
			FSPostMedsList[i].label = PostTherapyMeds[i].Drug;
			FSPostMedsList[i]["&nbsp;"] = "04 Post Therapy";
			for (j = 0; j < OEM_DataLen; j++) {
				OEM_Record = OEM_Data[j];
				hdr = "Cycle " + OEM_Record.Cycle + ", Day " + OEM_Record.Day;
				FSPostMedsList[i][hdr] = "";
			}
		}


		var FSData = [];
		FSData.push(FSDateRow);
		FSData.push(FSPSRow);
		FSData.push(FSWeightRow);
		FSData.push(FSDiseaseResponse);
		FSData.push(FSToxicity);
		FSData.push(FSOther);
		// FSData.push(FSLabs);

		for (i = 0; i < PreMedsListLen; i++) {
			FSData.push(FSPreMedsList[i]);
		}
		for (i = 0; i < MedsListLen; i++) {
			FSData.push(FSMedsList[i]);
		}
		for (i = 0; i < PostMedsListLen; i++) {
			FSData.push(FSPostMedsList[i]);
		}

		this.LoadFlowsheetData(FSFields, FSColumns, FSData, BuildGrid);
	}

});