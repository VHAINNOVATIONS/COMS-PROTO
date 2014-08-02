Ext.define('COMS.view.NewPlan.AmputationSelection', {
	"extend" : "Ext.container.Container",
	alias : 'widget.AmputationSelection',
    items : [
        { xtype: "checkboxgroup",
            vertical: true,
            width: 350,
            columns: 2,
            shadow: true,
            name: "amputations",
            items: [
                { boxLabel : "Upper Left Arm", name : "Upper Left Arm" },
                { boxLabel : "Lower Left Arm", name : "Lower Left Arm" },
                { boxLabel : "Left Hand and Fingers", name : "Left Hand and Fingers" },
                { boxLabel : "Left Thigh", name : "Left Thigh" },
                { boxLabel : "Lower Left Leg", name : "Lower Left Leg" },
                { boxLabel : "Left Foot", name : "Left Foot" },
                { boxLabel : "Upper Right Arm", name : "Upper Right Arm" },
                { boxLabel : "Lower Right Arm", name : "Lower Right Arm" },
                { boxLabel : "Right Hand and Fingers", name : "Right Hand and Fingers" },
                { boxLabel : "Right Thigh", name : "Right Thigh" },
                { boxLabel : "Lower Right Leg", name : "Lower Right Leg" },
                { boxLabel : "Right Foot", name : "Right Foot" }
            ]
        }
    ]
});