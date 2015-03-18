// plugins: [ Ext.ND_cellEditing ],
// plugins: [ Ext.create("Ext.grid.plugin.CellEditing", { clicksToEdit: 1 }) ],
Ext.ND_cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
    pluginId: 'cellplugin',
    clicksToEdit: 1,
    listeners : {
        scope: this,
        beforeedit: function(e, options) {
			if ("Administered" === options.record.getData().orderstatus || "Dispensed" === options.record.getData().orderstatus) {
				return true;
			}
			else {
				return false;
			}
			/** - https://ahlearns.wordpress.com/2012/06/22/ext-js-4-simple-grid-with-cell-editing/
            // Allow edits in the first column to new rows only
            if (options.colIdx === 0) {
                if (options.record.phantom === true) {
                    return true;
                }
                return false;
            }
			 **/
        }
    }
});

