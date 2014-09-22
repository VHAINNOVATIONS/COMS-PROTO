Ext.define("COMS.controller.Common.puWinChangeAdminDate", {
	"extend" : "Ext.app.Controller",

	"views" : [
		"Common.puWinChangeAdminDate"
	],


	"refs" : [
		{ "ref" : "NewAdminDate",		"selector" : "puWinChangeAdminDate [name=\"NewAdminDate\"]"},
		{ "ref" : "CurAdminDate",		"selector" : "puWinChangeAdminDate [name=\"CurAdminDate\"]"},
		{ "ref" : "ChangeAdminDateOffsetMsg",		"selector" : "puWinChangeAdminDate [name=\"ChangeAdminDateOffsetMsg\"]"}
	],


	"init" : function() {
		this.control({
			"scope" : this,
			"puWinChangeAdminDate" : {
				"beforerender" : this.setMinDate
			},
			"puWinChangeAdminDate [name=\"NewAdminDate\"]" : {
				"change" : this.updateNewDate
			},
			
			"puWinChangeAdminDate button[text=\"Cancel\"]" : {
				"click" : this.Cancel
			},
			"puWinChangeAdminDate button[text=\"Save\"]" : {
				"click" : this.Cancel
			}
		});
	},

	"initializeCurAdminDate" : function(AdminDate) {
		var cur = this.getCurAdminDate();
		cur.setValue(AdminDate);
	},

	"getMinDate" : function() {
		var newDate = Ext.Date.add(new Date(), Ext.Date.DAY, -5);
		return newDate;
	},

	"updateNewDate" : function(fld, nDate, oDate) {
		var CurDate = new Date(this.getCurAdminDate().getValue());
		var MinDate = this.getMinDate();
		if (nDate) {
			/* Formula now takes into account Daylight Savings Time */
			var EndDateConverted = Date.UTC(nDate.getYear(), nDate.getMonth(), nDate.getDate());
			var StartDateConverted = Date.UTC(CurDate.getYear(), CurDate.getMonth(), CurDate.getDate());
			var nDays = ( EndDateConverted - StartDateConverted) / 86400000;

			var dt = Ext.Date.add(MinDate, Ext.Date.MILLI, nDays);
			var dt1 = Ext.Date.format(dt, "m/d/Y");
			var m1 = "days";
			if (1 === nDays) {
				m1 = "days";
			}
			this.getChangeAdminDateOffsetMsg().update("New Administration Date(s) will be offset by <span style=\"font-weight:bold\";>" + nDays + "</span> " + m1);
		}
	},

	"setMinDate" : function() {
		var dateFld = this.getNewAdminDate();
		dateFld.setMinValue( this.getMinDate() );
	},

	"Cancel" : function(btn) {
		btn.up('window').close();
	}
});