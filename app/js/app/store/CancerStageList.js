Ext.define("COMS.store.CancerStageList", {
  "extend" : "Ext.data.Store",
  "model"  : "COMS.model.CancerStage",
  "proxy"  : {
    "type" : "ajax",
    "url"  : "data/CancerStageList.json",
    "reader" : {
      "type" : "json"
    }
  }
});