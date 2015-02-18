Ext.define("COMS.view.Management.PatternsOfCareTab" ,{
	"extend" : "Ext.form.Panel",
	"alias" : "widget.PatternsOfCareTab",
	"name" : "PatternsOfCareTab",
	"autoEl" : { tag : "nav" },
	// "defaults": { "labelAlign": "right", "labelClsExtra": "NursingDocs-label" },
	"items" : [ { "xtype" : "box", "html" :  
		"<ul class=\"PatternsOfCare\">" +
			"<li><a href=\"/POCD/CBG\" target=\"_POCD\" class=\"GenderCancerTypes\">Gender & Cancer Types</a></li>" +
			"<!-- <li><a href=\"#\" target=\"_blank\" class=\"TemplatesCancerTypes\">Cancer Types & Applied Templates</a></li>" +
			"<li><a href=\"#\" target=\"_blank\" class=\"ProviderTemplates\">Provider & Applied Templates</a></li>" +
			"<li><a href=\"#\" target=\"_blank\" class=\"TemplatesAndToxicities\">Applied Templates & Toxicities</a></li> -->" +
		"</ul>"




	} ]
});
