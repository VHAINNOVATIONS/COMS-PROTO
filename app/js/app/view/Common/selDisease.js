/**
 * Front End Support for Remote Autocomplete
 * See: https://www.sencha.com/forum/showthread.php?29236-Combobox-typeAhead-autocomplete-for-mode-remote
 */
<<<<<<< HEAD
Ext.define("COMS.view.Common.selDisease" ,{
	"extend" : "Ext.form.field.ComboBox",
	"alias" : "widget.selDisease",
	"name" : "selDisease",
	"store" : "DiseaseType",
=======
Ext.define('COMS.view.Common.selDisease' ,{
	extend: 'Ext.form.field.ComboBox',
	alias : 'widget.selDisease',
	name : 'selDisease',
	store : 'DiseaseType',
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
	"minChars" : 1,
	"forceSelection" : true,
	"triggerAction" : "all",
	"emptyText" : "Select a Cancer Type",

<<<<<<< HEAD
	"allowBlank" : false,
	"width" : 500,
	"size" : 50,
	"labelWidth" : 160,
	"fieldLabel" : "Select a type of cancer <em>*</em>",
	"labelAlign" : "right",
	"displayField" : "name",
	"valueField" : "id",
	"typeAhead" : true
=======
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
>>>>>>> c9b7783a07de42db6a9bffa8044fb045a06334ca
});
