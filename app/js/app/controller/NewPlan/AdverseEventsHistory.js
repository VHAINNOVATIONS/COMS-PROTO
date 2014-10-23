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


aSorter : function(a, b) {
		a = new Date(a.date);
		b = new Date(b.date);
		return a>b ? -1 : a<b ? 1 : 0;

},

MergeAssessmentAndReactionLists : function(assessments, reactions) {
	var today = Ext.util.Format.date(new Date());
	var i, j, dlLen, len, rec;
	var list = [];
	var x, y, data = [], obj;
	var link, DetailsList;
	var totalEvents2Record = 0;
	var numAlert = 0;
	len = assessments.length;
	for (i = 0; i < len; i++) {
		rec = assessments[i];
		if (rec.tdate == today) {
			this.application.Patient.AssessmentRecordID = rec.id;
		}

		if ("No Adverse Reaction" !== rec.Label) {
			totalEvents2Record++;
			numAlert += rec.Alert;
			obj = { "type" : "Assessment", "date" : rec.tDate, "Link" : rec };
			list.push(obj);
		}
	}

	len = reactions.length;
	for (i = 0; i < len; i++) {
		link = reactions[i].InfuseReactLink;
		DetailsList = link.Details;
		dlLen = DetailsList.length;
		PushData = true;
		if (link.date == today) {
			this.application.Patient.InfuseReactionRecordID = link.id;
		}

		for (j = 0; j < dlLen; j++) {
			numAlert += DetailsList[j].alertEvent;
			if ("No Adverse Reaction" == DetailsList[j].fieldLabel) {
				PushData = false;
			}
			else {
				totalEvents2Record++;
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
	var data = {numAlerts : numAlert, totEvents : totalEvents2Record, list: list };
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
							var i, len, rec;
							this.application.Patient.Assessments = resp.records.Assessments;
							this.application.Patient.Reactions = resp.records.ReactAssessments;
							this.application.Patient.TotalAdverseEvents = resp.totalEvents;
							var data = this.MergeAssessmentAndReactionLists(resp.records.Assessments, resp.records.ReactAssessments);
							theModule.update(data.list);
							if (data.numAlerts > 0) {
								alertText = " - <span style=\"color:red;\">" + data.numAlerts + " flagged to trigger an Alert</span>";
							}
							theModule.setTitle("Adverse Events History - (" + data.totEvents + " Adverse Events Recorded" + alertText + ")");
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
