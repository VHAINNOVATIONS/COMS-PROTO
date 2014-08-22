Ext.define('COMS.store.InfusionReaction', {
	extend : 'Ext.data.Store',
	fields: [ "IReact_Detail_ID", "IReact_ID", "Sequence", "Field_Label", "Choice", "Comments", "sectionTitle", "alertEvent" ],
	proxy: {
		type: 'rest',
		url : Ext.URLs.Infusion,
		reader: {
			type: 'json',
			root : 'records[0].InfuseReactLink.Details'
		}
	}
});
