Ext.define("COMS.store.TemplateList", {
  "extend" : "Ext.data.Store",
  "model"  : "COMS.model.Template",
  "proxy"  : {
    "type" : "ajax",
    "url"  : "data/TemplateList.json",
    "reader" : {
      "type" : "json"
    }
  }
});