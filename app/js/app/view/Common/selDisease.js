/**
 * Front End Support for Remote Autocomplete
 * See: https://www.sencha.com/forum/showthread.php?29236-Combobox-typeAhead-autocomplete-for-mode-remote
 */
Ext.define('COMS.view.Common.selDisease' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selDisease',
	name : 'selDisease',
	store : 'DiseaseType',
	"minChars" : 1,
	"forceSelection" : true,
	"triggerAction" : "all",
	"emptyText" : "Select a Cancer Type",

	allowBlank: false,
	width: 500,
	size : 50,
	labelWidth: 160,
	fieldLabel: 'Select a type of cancer <em>*</em>',
	labelAlign: 'right',
	displayField: 'name',
	valueField: 'id',
//	"typeAhead" : true
//		,
//	"submitValue" : true 
});
