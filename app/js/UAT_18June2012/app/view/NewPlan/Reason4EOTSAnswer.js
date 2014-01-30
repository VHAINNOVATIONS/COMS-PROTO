Ext.define('COMS.view.NewPlan.Reason4EOTSAnswer', {
    extend: 'Ext.form.RadioGroup',
    alias : 'widget.Reason4EOTSAnswer',
    width: 200, 
    hideLabel : true, 
    columns : 1, 
    vertical : true, 
    items : [
    // hidden: !(this.ChangeTemplate), 
        { boxLabel : "Completed Prescribed Course", name : "EOTS_Reason", inputValue : "Completed Prescribed Course"},
        { boxLabel : "Treatment Change", name : "EOTS_Reason", inputValue : "Treatment Change"},
        { xtype : "radiogroup", name : "Reason4EOTS_TCReason", width: 200, hidden : true, hideLabel : true, margin: "0 10 0 20", columns : 1, vertical : true, 
            items : [
                { boxLabel : "Toxicity", name : "EOTS_TChange", inputValue : "Toxicity"},
                { boxLabel : "Progression of the Disease", name : "EOTS_TChange", inputValue : "Progression of the Disease"},
                { boxLabel : "Patient Refusal", name : "EOTS_TChange", inputValue : "Patient Refusal"},
                { boxLabel : "Other", name : "EOTS_TChange", inputValue : "Other"},
                { xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_TChangeOther", hideLabel : true }
            ]
        },
        { boxLabel : "Patient Discontinuation", name : "EOTS_Reason", inputValue : "Patient Discontinuation"},
        { xtype : "radiogroup", name : "Reason4EOTS_PDReason", width: 200, hideLabel : true, hidden : true, margin: "0 10 0 20", columns : 1, vertical : true, 
            items : [
                { boxLabel : "Patient Terminated Regimen", name : "EOTS_PDChange", inputValue : "Patient Terminated Regimen"},
                { boxLabel : "Patient Left VA System", name : "EOTS_PDChange", inputValue : "Patient Left VA System"},
                { boxLabel : "Other", name : "EOTS_PDChange", inputValue : "Other"},
                { xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_PDChangeOther", hideLabel : true }
            ]
        },

        { boxLabel : "Other ", name : "EOTS_Reason", inputValue : "Other"},
        { xtype : "textfield", margin: "0 10 0 20", hidden : true, name : "EOTS_ReasonOther", hideLabel : true }
    ]
});