{	// For a given Patient ID there may/will be multiple Assessment Info Records based on the day the information was entered and saved.
    "success": true,
	"total" : 3,
    "records": [
        {
			"id" : "C5A51AAB-BF58-E111-8C06-000C2935B86F",
			"date" : "02/24/2012",
			"author" : "Mike.Barlow",	// Get this from the global "CurUser" variable
            "assessmentDetails" : [	// There should be anywhere from 1 to n Assessment Detail records for any given Assessment record 
		        {
					"sequence" : 1,
					"fieldLabel" : "Fatigue",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 2
				},
		        {
					"sequence" : 2,
					"fieldLabel" : "Anorexia",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 2
				},
		        {
					"sequence" : 3,
					"fieldLabel" : "Nausea",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 3
				}
			]
		},
        {
			"id" : "C5A51AAB-BF58-E111-8C06-000C2935B86F",
			"date" : "02/23/2012",
			"author" : "Mike.Barlow",	// Get this from the global "CurUser" variable
            "assessmentDetails" : [	// There should be anywhere from 1 to n Assessment Detail records for any given Assessment record 
		        {
					"sequence" : 1,
					"fieldLabel" : "Fatigue",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 2
				},
		        {
					"sequence" : 2,
					"fieldLabel" : "Anorexia",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 2
				},
		        {
					"sequence" : 3,
					"fieldLabel" : "Nausea",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 2
				}
			]
		},
        {
			"id" : "C5A51AAB-BF58-E111-8C06-000C2935B86F",
			"date" : "02/22/2012",
			"author" : "Mike.Barlow",	// Get this from the global "CurUser" variable
            "assessmentDetails" : [	// There should be anywhere from 1 to n Assessment Detail records for any given Assessment record 
		        {
					"sequence" : 1,
					"fieldLabel" : "Fatigue",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 2
				},
		        {
					"sequence" : 2,
					"fieldLabel" : "Anorexia",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 1
				},
		        {
					"sequence" : 3,
					"fieldLabel" : "Nausea",
					"choice" : true,
					"comments" : "",
					"levelChosen" : 1
				}
			]
		}
	]
}
