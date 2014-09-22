Ext.define("COMS.model.LookupTable_Templates", {
    "extend" : "Ext.data.Model",
    "fields" : [ "id", "description", "force" ],
    "proxy" : {
        "type" : "rest",
        "api" : {
                "read" : Ext.URLs.Templates,
                "destroy" : Ext.URLs.DeleteTemplate
        },
        "reader" : {
            "type" : "json",
            "root" : "records"
        }
    }
});
