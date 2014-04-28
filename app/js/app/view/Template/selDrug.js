Ext.define('COMS.view.Template.selDrug' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.selDrug',
	name : 'Select Drug',

	width: 500,
	size : 50,
	labelWidth: 150,
	displayField: 'Drug',
	valueField: 'Drug',
    initComponent: function() {
        this.store = {
            fields: ['Drug', 'Unit', 'Comments'],
            data  : [
                {Drug: 'Cisplatin', Unit : 'mg', Comments : '' },
                {Drug: 'Vinorelbine', Unit : 'mg', Comments : '' },
                {Drug: 'Pemetrexed', Unit : 'micrograms', Comments : '' },
                {Drug: 'Gemcitabine', Unit : 'mg', Comments : '' },
                {Drug: 'Dexamethasone', Unit : 'mg', Comments : '' },
                {Drug: 'Ondansetron', Unit : 'mg', Comments : '' },
                {Drug: 'Aprepitant', Unit : 'mg', Comments : '' },
                {Drug: 'NS', Unit : 'mg', Comments : '' },
                {Drug: 'Prochlorperazine', Unit : 'mg', Comments : '' }
            ]
        };
	}
});
