/**
 *
 * REQUIRES FILE
 *
 **/

// Don't include a controller here until it's included in the "controllers" array in the Ext.application() below.
// Controllers must be included here if a store is used in the view managed by the controller
Ext.require([
	"Ext.ux.CheckColumn",
	// common view components
	"COMS.view.RequiredInstr",
	"COMS.view.ProgrammerBtns",
	// Require loading of all models to prevent the occasional "me.model is null" error
	Ext.COMSModels.ToxGridModel,
	Ext.COMSModels.MedRisks,
	Ext.COMSModels.ClinicInfo,
	Ext.COMSModels.DischargeInstruction,
	Ext.COMSModels.IVFluidType,
	Ext.COMSModels.Allergies,
	Ext.COMSModels.GenericLookup,
	Ext.COMSModels.CycleLengthMax,
	Ext.COMSModels.Template,
	Ext.COMSModels.Templates,
	Ext.COMSModels.TemplateSources,
	Ext.COMSModels.CycleLengthStore,
	Ext.COMSModels.DiseaseType,
	Ext.COMSModels.DiseaseStage,
	Ext.COMSModels.TimeFrameUnit,
	Ext.COMSModels.TotalCoursesMax,
	Ext.COMSModels.Toxicity,
	Ext.COMSModels.CumulativeDosingMeds,
	Ext.COMSModels.PatientCumulativeDosing,
	Ext.COMSModels.EmetogenicLevel,
	Ext.COMSModels.FebrileNeutropeniaRisk,
	Ext.COMSModels.References,
	Ext.COMSModels.LUReferences,
	Ext.COMSModels.LookupTable,
	Ext.COMSModels.Hydration,
	Ext.COMSModels.Drugs,
	Ext.COMSModels.DrugUnits,
	Ext.COMSModels.DrugRegimen,
	Ext.COMSModels.Infusion,
	Ext.COMSModels.CTOS_References,
	Ext.COMSModels.CumulativeDoseMedsInRegimen,
	Ext.COMSModels.Med,
	Ext.COMSModels.MHMedInfusion,
	Ext.COMSModels.MHMed,
	Ext.COMSModels.PatientTemplates,
	Ext.COMSModels.CTOS,
	Ext.COMSModels.OEMRecords, // MWB - 21 Feb 2012 - OEM Records Model
	Ext.COMSModels.Edit_OEMRecord, // MWB - 05 Mar 2012
	Ext.COMSModels.ChemoHistory,
	Ext.COMSModels.LabInfo,
	Ext.COMSModels.PatientHistory,
	Ext.COMSModels.PatientInfo,
	Ext.COMSModels.PatientInfoMDWS,
	Ext.COMSModels.RadiationHistory,
	Ext.COMSModels.ND_Assessment, // MWB - 22 Feb 2012
	Ext.COMSModels.ND_GenInfo, // MWB - 22 Feb 2012
	Ext.COMSModels.ND_CTCAE_SOC, // MWB - 27 Feb 2012
	Ext.COMSModels.ND_CTCAE_Data, // MWB - 27 Feb 2012
	Ext.COMSModels.MDWs,
	Ext.COMSModels.Vitals,
	Ext.COMSModels.GlobalsTable,
	Ext.COMSModels.GlobalLookupModel,
	Ext.COMSModels.UsersTable,
	Ext.COMSModels.ActiveWorkflowsTable,
	Ext.COMSModels.MedsNonRoundedTable,
	Ext.COMSModels.OrdersTable,
	Ext.COMSModels.Flowsheet,
	Ext.COMSModels.FluidType,
	Ext.COMSModels.IDEntry,
	Ext.COMSModels.MedReminder,

	// INLINE FOR TESTING: Ext.COMSModels.Messages,

/*********** LIST OF CONTROLLERS *********************/
	"COMS.controller.Common.DEMOpuWin",
	"COMS.controller.Common.EmeticInfo",
	"COMS.controller.NewPlan.CTOS.FS_Toxicity",
	"COMS.controller.Navigation",
	"COMS.controller.ProgrammerBtns",
	"COMS.controller.CkBoxTArea",
	"COMS.controller.Common.puWinSelCancer",
	"COMS.controller.Common.puWinAddCumDose",
	"COMS.controller.Common.puWinSelBSA",
	"COMS.controller.Common.puWinSelAmputation",
	"COMS.controller.Common.SelectAdverseReactionAlerts",
	"COMS.controller.Common.puWinChangeAdminDate",
	"COMS.controller.Common.selCTOSTemplate",
	"COMS.controller.Common.MedRemindersForm",
	"COMS.controller.Common.puWinTreatmentAmmend",

	"COMS.controller.Orders.OrdersTab",
	"COMS.controller.TemplateList.TemplateListTab",
	"COMS.controller.TemplateList.puWinListPatients",
	"COMS.controller.TemplatePromotion.TemplatePromotionTab",

	"COMS.controller.Authoring.AuthoringTab",
	"COMS.controller.Authoring.DrugRegimen",
	"COMS.controller.Authoring.Hydration",

	"COMS.controller.Management.AdminTab",
	"COMS.controller.Management.DiseaseStaging",
	"COMS.controller.Management.IntelligentDataElements",
	"COMS.controller.Management.Toxicity",
	"COMS.controller.Management.AddLookups",
	"COMS.controller.Management.CumulativeDosing",
	"COMS.controller.Management.EmeticMeds",
	"COMS.controller.Management.Lockout",
	"COMS.controller.Management.Inventory",

	"COMS.controller.Messages.MessagesTab",

	"COMS.controller.NewPlan.AskQues2ApplyTemplate",
	"COMS.controller.NewPlan.AdverseEventsHistory",
	"COMS.controller.NewPlan.EndTreatmentSummary",
	"COMS.controller.NewPlan.NewPlanTab",
	"COMS.controller.NewPlan.OEM",
	"COMS.controller.NewPlan.OEM_Edit",
	"COMS.controller.NewPlan.PatientInfoTable",
	"COMS.controller.NewPlan.ViewEndTreatmentSummary",
	"COMS.controller.NewPlan.TreatmentDetails",
	"COMS.controller.NewPlan.AmputationSelection",
//	"COMS.controller.NewPlan.PatientHistory",

	"COMS.controller.NewPlan.CTOS.ChronologyTab",
	"COMS.controller.NewPlan.CTOS.FlowSheetTab",
	"COMS.controller.NewPlan.CTOS.FlowSheetOptionalQues",

	"COMS.controller.NewPlan.CTOS.PatientSummaryTab",

	"COMS.controller.NewPlan.CTOS.ToxicitySideEffectsPanel",
	"COMS.controller.NewPlan.CTOS.DiseaseResponsePanel",
	"COMS.controller.NewPlan.CTOS.OtherInfoPanel",


	"COMS.controller.NewPlan.CTOS.NursingDocs.DischargeInstructions",
	"COMS.controller.NewPlan.CTOS.NursingDocs.NursingDocs",
	"COMS.controller.NewPlan.CTOS.NursingDocs.GenInfoTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.AssessmentTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.PreTreatmentTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.TreatmentTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.React_AssessTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.EducationTab",
	"COMS.controller.NewPlan.CTOS.NursingDocs.Chemotherapy",
	"COMS.controller.NewPlan.CTOS.NursingDocs.puWinViewInfusionReactions"
//	, "COMS.controller.NewPlan.CTOS.NursingDocs.VitalSignsEntryForm"
]);
