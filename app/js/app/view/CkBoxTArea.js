Ext.define("COMS.view.CkBoxTArea" ,{
	"extend" : "Ext.container.Container",
	"alias" : "widget.CkBoxTArea",
	"layout" : { "type" : "hbox" },
	"cls" : "Test", 
	"margin" : "5 0 5 0",
	"items" : [
		{ "xtype" : "checkbox", flex: 0 }, 
		{ "xtype" : "textarea", "rows" : 5, flex : 1, "grow" : true, "name" : "", "hidden" : true, "fieldLabel" : "Please Explain <em>*</em>", "labelAlign" : "top", "margin" : "2 0 5 5"}
	]
});
