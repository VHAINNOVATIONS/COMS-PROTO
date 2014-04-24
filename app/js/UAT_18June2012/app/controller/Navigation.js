Ext.define('COMS.controller.Navigation', {
	extend: 'Ext.app.Controller',
	// Views can be referenced here before they are declared in 
	// app.js, but they DO need to be referenced here 
	// before they are listed in the NavigationTabs Controller
	// else a "namespace is undefined" error occurs
	views: [
		'NavigationTabs'
		, 'NewPlan.NewPlanTab'
		, 'Authoring.AuthoringTab'
		, 'TemplateList.TemplateListTab'
		, 'ExistingPlan.ExistingPlanTab'
		, 'KnowledgeBase.KnowledgeBaseTab'
		, 'Messages.MessagesTab'
		, 'Management.AdminTab'
		, 'Testing.TestTab'
		],

	// For this controller the following is mostly for debugging
	// It should be removed prior to releasing to production
	init: function () {
		wccConsoleLog('Initialized Navigation Controller!');
		this.control({
			'NavigationTabs': {
				render: this.onPanelRendered,
				beforetabchange: this.tabChanged
			}
		});
        // this.application.loadMask("Loading Site Configuration Parameters...");
		Ext.Ajax.request({
			scope : this,
			url: Ext.URLs.SiteConfig,
			success: function( response, opts ){
				// this.application.unMask();
				var text = response.responseText;
				var resp = Ext.JSON.decode( text );
				if (resp.success) {
                    this.application.SiteConfig = {};
                    this.application.SiteConfig.MedHold = resp.MedHold;
                    this.application.SiteConfig.RoundingRule  = resp.RoundingRule;
				}
				else {
					alert("load Site Configuration - Error");
				}
			},
			failure : function( response, opts ) {
				// this.application.unMask();
				alert("load Site Configuration - FAILED");
			}
		});

	},

	tabChanged: function (tabPanel, newCard, oldCard, eOpts) {
		var editTemplate = this.application.btnEditTemplatClicked;
		var newPlanCtl = this.getController("NewPlan.NewPlanTab");
		var authoringCtl = this.getController("Authoring.AuthoringTab");
		var adminCtl = this.getController("Management.AdminTab");

		var existingTemplate;
		var template = null;

		if ("Orders" === newCard.title) {
			try {
				var theStore = Ext.getStore("OrdersStore");
				if (theStore) {
					theStore.removeAll(true);
					theStore.load();
				}
			}
			catch (e) {
				alert("Store Load Error in Navigation.js");
			}
		}

		if (!editTemplate && "Template Authoring" == newCard.title && "Start New Plan" == oldCard.title) {
			if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].getValue()) {
				template = newPlanCtl.getMyTemplates();
			} else if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].getValue()) {
				template = newPlanCtl.getTemplate();
			}

			if (null != template) {
				template.clearValue();
				newPlanCtl.getDiseaseStage().clearValue();

				newPlanCtl.collapseCombo(template, null);
				newPlanCtl.collapseCombo(newPlanCtl.getDiseaseStage(), null);
			}

			existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
			if (existingTemplate.getValue()) {
				authoringCtl.getTemplate().clearValue();
				authoringCtl.getExistingDiseaseStage().clearValue();

				authoringCtl.collapseCombo(authoringCtl.getTemplate(), null);
				authoringCtl.collapseCombo(authoringCtl.getExistingDiseaseStage(), null);
			}
		}

		if (editTemplate && "Start New Plan" == newCard.title && "Template Authoring" == oldCard.title) {
			this.application.btnEditTemplatClicked = false;
		}

		if (!editTemplate && "Admin" == newCard.title) {
			template = null;

			if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[0].getValue()) {
				template = newPlanCtl.getMyTemplates();
			} else if (Ext.ComponentQuery.query('NewPlanTab fieldcontainer radiofield[name=\"NewPlan_What2Do\"]')[1].getValue()) {
				template = newPlanCtl.getTemplate();
			}

			if (null != template) {
				template.clearValue();
				newPlanCtl.getDiseaseStage().clearValue();

				newPlanCtl.collapseCombo(template, null);
				newPlanCtl.collapseCombo(newPlanCtl.getDiseaseStage(), null);
			}

			existingTemplate = Ext.ComponentQuery.query('AuthoringTab fieldcontainer radiofield[name=\"Authoring_SelectTemplateType\"]')[0];
			if (existingTemplate.getValue()) {
				authoringCtl.getTemplate().clearValue();
				authoringCtl.getExistingDiseaseStage().clearValue();

				authoringCtl.collapseCombo(authoringCtl.getTemplate(), null);
				authoringCtl.collapseCombo(authoringCtl.getExistingDiseaseStage(), null);
			}
			adminCtl.getTemplateGrid().getStore().removeAll();
		}
	},

	onPanelRendered: function () {
		wccConsoleLog('Main Navigation Tab Panel has been rendered');
	}
});