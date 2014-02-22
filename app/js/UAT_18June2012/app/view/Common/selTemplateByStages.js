Ext.define('COMS.view.Common.selTemplateByStages' ,{
    extend: 'Ext.container.Container',
    alias : 'widget.selTemplateByStages',
    config : { outerContainer : null },     /* to be used later on to identify this specific instance of this control. */

    items: [
        { xtype : "container" , layout : "hbox", items : [
            { xtype : 'selTemplateType' },
            { xtype : 'button',  text : 'Show All Templates',  margin: '5 0 0 5', hidden: false }
        ] },
        { xtype : 'selDiseaseAndStage', name : "stbsSelDiseaseAndStage" },
        { xtype : 'selTemplate',  name:'FilteredTemplates' }
    ]
});
