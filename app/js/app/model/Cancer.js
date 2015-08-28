Ext.define("COMS.model.Cancer", {
  "extend" : "Ext.data.Model",
  "fields" : ["ien", "name", "description"],
  "proxy"  : {
    "type" : "rest",
    "pageParam": false, //to remove param "page"
    "startParam": false, //to remove param "start"
    "limitParam": false, //to remove param "limit"
    "noCache": false, //to remove param "_dc"
	"url" : "data/CancerList",
    "reader" : {
      "type" : "json",
      "root" : "records"
    }
  }
});