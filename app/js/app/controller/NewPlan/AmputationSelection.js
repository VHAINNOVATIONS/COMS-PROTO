Ext.define("COMS.controller.NewPlan.AmputationSelection", {
	"extend" : "Ext.app.Controller",
	"views" : [
		"NewPlan.AmputationSelection"
	],
	"refs" : [
		{ ref : "UpperLeftArm", selector: "[name=\"Upper Left Arm\"]"},
		{ ref : "LowerLeftArm", selector: "[name=\"Lower Left Arm\"]"},
		{ ref : "LeftHand", selector: "[name=\"Left Hand and Fingers\"]"},

		{ ref : "LeftThigh", selector: "[name=\"Left Thigh\"]"},
		{ ref : "LowerLeftLeg", selector: "[name=\"Lower Left Leg\"]"},
		{ ref : "LeftFoot", selector: "[name=\"Left Foot\"]"},

		{ ref : "UpperRightArm", selector: "[name=\"Upper Right Arm\"]"},
		{ ref : "LowerRightArm", selector: "[name=\"Lower Right Arm\"]"},
		{ ref : "RightHand", selector: "[name=\"Right Hand and Fingers\"]"},

		{ ref : "RightThigh", selector: "[name=\"Right Thigh\"]"},
		{ ref : "LowerRightLeg", selector: "[name=\"Lower Right Leg\"]"},
		{ ref : "RightFoot", selector: "[name=\"Right Foot\"]"}
	],
	"init" : function() {
		this.control({
			"checkbox" : {
				"change" : this.itemChecked
			}
		});
	},

	"resetField" : function(fldObj, state) {
		if (state) {
			fldObj.disable();
		}
		else {
			fldObj.enable();
		}
		fldObj.setValue(state);
	},

	"renderAS" : function() {
		var Amputations = this.application.Patient.Amputations;
		var i, a, len = Amputations.length, theCkBox;
		for (i = 0; i < len; i++) {
			a = Amputations[i].description;
			switch(a) {
				case "Upper Left Arm":
					theCkBox = this.getUpperLeftArm();
					break;
				case "Lower Left Arm":
					theCkBox = this.getLowerLeftArm();
					break;
				case "Left Hand and Fingers":
					theCkBox = this.getLeftHand();
					break;
				case "Upper Right Arm":
					theCkBox = this.getUpperRightArm();
					break;
				case "Lower Right Arm":
					theCkBox = this.getLowerRightArm();
					break;
				case "Right Hand and Fingers":
					theCkBox = this.getRightHand();
					break;
				case "Left Thigh":
					theCkBox = this.getLeftThigh();
					break;
				case "Lower Left Leg":
					theCkBox = this.getLowerLeftLeg();
					break;
				case "Left Foot":
					theCkBox = this.getLeftFoot();
					break;
				case "Right Thigh":
					theCkBox = this.getRightThigh();
					break;
				case "Lower Right Leg":
					theCkBox = this.getLowerRightLeg();
					break;
				case "Right Foot":
					theCkBox = this.getRightFoot();
					break;
			}
			if ( theCkBox ) {
				theCkBox.setValue(true);
			}
		}
	},

	"itemChecked" : function(ckBox, nValue, oValue, opts) {
		var newState;
		if (nValue) {
			newState = true;
		}
		var theLabel = ckBox.name;
		var bodyPart1, bodyPart2;
		switch (theLabel) {
			case "Upper Left Arm":
				this.resetField(this.getLowerLeftArm(), nValue);
				this.resetField(this.getLeftHand(), nValue);
				break;

			case "Upper Right Arm":
				this.resetField(this.getLowerRightArm(), nValue);
				this.resetField(this.getRightHand(), nValue);
				break;

			case "Lower Left Arm":
				this.resetField(this.getLeftHand(), nValue);
				break;
			case "Lower Right Arm":
				this.resetField(this.getRightHand(), nValue);
				break;

			case "Left Thigh":
				this.resetField(this.getLowerLeftLeg(), nValue);
				this.resetField(this.getLeftFoot(), nValue);
				break;
			case "Right Thigh":
				this.resetField(this.getLowerRightLeg(), nValue);
				this.resetField(this.getRightFoot(), nValue);
				break;

			case "Lower Left Leg":
				this.resetField(this.getLeftFoot(), nValue);
				break;
			case "Lower Right Leg":
				this.resetField(this.getRightFoot(), nValue);
				break;
		}
	}
});