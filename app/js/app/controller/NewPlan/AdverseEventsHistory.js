Ext.define("COMS.controller.NewPlan.AdverseEventsHistory", {
	"extend" : "Ext.app.Controller",
	"views" : [
		"NewPlan.AdverseEventsHistory"
	],
	"refs" : [
		{ "ref" : "AdverseEventsHistory", "selector" : "AdverseEventsHistory"}
	],
	"init" : function() {
		wccConsoleLog("Initialized AdverseEventsHistory Controller!");
		this.application.on({ PatientSelected : this.loadAdverseEventsHistory, scope : this });
		this.application.on({ loadAdverseEventsHistory : this.loadAdverseEventsHistory, scope : this });
		this.control({
		});
	},



MergeAssessmentAndReactionLists : function(assessments, reactions) {
	var i, j, dlLen, len;
	var list = [];
	var x, y, data = [], obj;
	var PushData, link, DetailsList;

	len = assessments.length
	for (i = 0; i < len; i++) {
		link = assessments[i].assessmentLink;
		DetailsList = link.Details;
		dlLen = DetailsList.length;
		PushData = true;
		if (0 == dlLen) {
			PushData = false;
		}
		for (j = 0; j < dlLen; j++) {
			if ("No Adverse Reaction" == DetailsList[j].fieldLabel) {
				PushData = false;
			}
		}
		if (PushData) {
			obj = { "type" : "Assessment", "date" : link.date, "Link" : link };
			list.push(obj);
		}
	}

	len = reactions.length;
	for (i = 0; i < len; i++) {
		link = reactions[i].InfuseReactLink;
		DetailsList = link.Details;
		dlLen = DetailsList.length;
		PushData = true;
		for (j = 0; j < dlLen; j++) {
			if ("No Adverse Reaction" == DetailsList[j].fieldLabel) {
				PushData = false;
			}
		}
		if (PushData) {
			obj = { "type" : "Reaction", "date" : link.date, "Link" : link };
			list.push(obj);
		}
	}

	list.sort(function(a, b) {
		a = new Date(a.date);
		b = new Date(b.date);
		return a>b ? -1 : a<b ? 1 : 0;
	});

	len = list.length;
	y = { "date" : "" };
	for (i = 0; i < len; i++) {
		x = list[i];
		if (y.date == "") {
			y.date = x.date;
			if (x.type == "Assessment") {
				y.Assessment = x.Link;
			}
			else {
				y.Reaction = x.Link;
			}
			data.push(y);
		}
		else if (y.date == x.date) {
			if (x.type == "Assessment") {
				y.Assessment = x.Link;
			}
			else {
				y.Reaction = x.Link;
			}
			data.push(y);
			y = { "date" : "" };
		}
		else {
			data.push(y);
			y = { "date" : x.date };
			if (x.type == "Assessment") {
				y.Assessment = x.Link;
			}
			else {
				y.Reaction = x.Link;
			}
		}
	}
	return data;
},

	loadAdverseEventsHistory : function(recs, eOpts) {
		var theModule = this.getAdverseEventsHistory();

		theModule.setTitle("Adverse Events History (No Adverse Events Recorded)");
		theModule.update({});
		
		if ("" !== this.application.Patient.PAT_ID) {
		var URL = Ext.URLs.AdverseEventsHistory + "/" + this.application.Patient.PAT_ID;
		this.application.loadMask("Loading Adverse Events History Information...");

		Ext.Ajax.request({
			scope : this,
			url: URL,
			success: function( response, opts ){
				this.application.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );

				if (resp.success) {
					if (resp.records) {
						var today = Ext.util.Format.date(new Date());
						var i, len, rec;
						this.application.Patient.Assessments = resp.records.Assessments;
						this.application.Patient.Reactions = resp.records.ReactAssessments;
						this.application.Patient.TotalAdverseEvents = resp.totalEvents;
						var data = this.MergeAssessmentAndReactionLists(resp.records.Assessments, resp.records.ReactAssessments);
						var j, dLen, Details, numAlert = 0, alertText = "";
						var totalEvents2Record = 0;
						len = resp.records.Assessments.length;
						for (i = 0; i < len; i++) {
							rec = resp.records.Assessments[i].assessmentLink.date;
							if (rec == today) {
								this.application.Patient.AssessmentRecordID = resp.records.Assessments[i].assessmentLink.id;
							}

							Details = resp.records.Assessments[i].assessmentLink.Details;
							dLen = Details.length;
							for (j = 0; j < dLen; j++) {
								if ("No Adverse Reaction" !== Details[j].fieldLabel) {
									totalEvents2Record++;
								}
								numAlert += Details[j].alertEvent;
							}
						}


						len = resp.records.ReactAssessments.length;
						for (i = 0; i < len; i++) {
							rec = resp.records.ReactAssessments[i].InfuseReactLink.date;
							if (rec == today) {
								this.application.Patient.InfuseReactionRecordID = resp.records.ReactAssessments[i].InfuseReactLink.id;
							}

							Details = resp.records.ReactAssessments[i].InfuseReactLink.Details;
							dLen = Details.length;
							for (j = 0; j < dLen; j++) {
								if ("No Adverse Reaction" !== Details[j].fieldLabel) {
									totalEvents2Record++;
								}
								numAlert += Details[j].alertEvent;
							}

						}
						theModule.update(data);

						if (numAlert > 0) {
							alertText = " - <span style=\"color:red;\">" + numAlert + " flagged to trigger an Alert</span>";
						}
						theModule.setTitle("Adverse Events History - (" + totalEvents2Record + " Adverse Events Recorded" + alertText + ")");
					}
				}
				else {
					alert("load AdverseEventsHistory - Error");
				}
			},
			failure : function( response, opts ) {
				this.application.unMask();
				alert("AdverseEventsHistory Data Load Failed...");
			}
		});
		}
	}
});
