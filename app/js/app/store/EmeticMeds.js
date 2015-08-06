Ext.define("COMS.store.EmeticMeds", {
	"extend" : "Ext.data.Store",
	"model" : Ext.COMSModels.EmeticMeds,
	"groupField" : "EmoLevelName"
});