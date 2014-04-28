Ext.define('COMS.view.Template.References' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.TemplateReferences',

	margin: '0 20 20 20',
    title : 'References',

    initComponent: function() {
        this.store = {
            fields: ['Reference', 'ReferenceLink'],
            data  : [
                {Reference: 'NCCN Clinical Practice Guidelines in Oncology Breast Cancer v.1.2010',    ReferenceLink: 'http://www.google.com'},
                {Reference: 'Robert Nm et al. J Clin Oncol.2007;25(18S):19647',    ReferenceLink: 'http://www.google.com'}
            ]
        };

        this.columns = [
            {header: 'Reference',  dataIndex: 'Reference',  flex: 1},
            {header: 'Reference Link', dataIndex: 'ReferenceLink', flex: 1}
        ];

        this.callParent(arguments);
    }
});