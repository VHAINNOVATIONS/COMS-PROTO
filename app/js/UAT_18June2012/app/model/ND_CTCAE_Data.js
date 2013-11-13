// Loading Nested Data - See the Ext.data.reader.Reader intro docs for a full explanation.
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.reader.Reader
Ext.define("COMS.model.ND_CTCAE_Data", {
	extend: "Ext.data.Model",
	fields: [
            "code",				// Data from the CTCAE Spreadsheet VVVVV
            "cat",				// This is a cross reference field to the CTCAE_SOC data table
            "soc",
            "term",
            "grade1",
            "grade2",
            "grade3",
            "grade4",
            "grade5",
            "termdef"
    ],
    proxy: {
        type: "rest",
        api: {
                read: Ext.URLs.CTCAE_Data
        },
        
        reader: {
            type: "json",
            root : "records",
            successProperty : "success"
        }
    }
});
