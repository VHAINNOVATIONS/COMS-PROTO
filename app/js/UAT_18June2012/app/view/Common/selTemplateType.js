Ext.define('COMS.view.Common.selTemplateType' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.selTemplateType',
	name : 'Select Template Type',

        /*
         * KD - 5/9/12 - Pulling the Template Sources from the DB. The primary benefit is the 
         * backend query used to retrieve the Cancer types for the selecte Template Source. The 
         * join can be done on ID's rather than case statements.
         * 
         */
	store : 'TemplateSources',
/*	store : { 
		fields : ["id", "name"], 
		data : [ 
                        {id : 0, name : "--Select Source--"},
			{id : 1, name : "My Templates"}, 
			{id : 2, name : "Local Templates"}, 
			{id : 3, name : "National Templates"}
		]
	},*/
	//queryMode : "local",

        emptyText: "",
	width: 300,
	size : 60,
	labelWidth: 150,
	fieldLabel: 'Select a Template Source',
	labelAlign: 'right',
	displayField: 'name',
	valueField: 'id',
	margin: '5 0 5 0',

	initComponent: function() {
		wccConsoleLog(this.name + " - Initialization start...");
		this.callParent(arguments);
		wccConsoleLog(this.name + " - Initialization complete...");
    }
});
