// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_CTCAE_SOC", {
	extend: "Ext.data.Model",
	fields: [
            "cat",					// Category for this record
			"soc"					// SOC Data (used to select a category in the Nursing Docs
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.CTCAE_SOC
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});
