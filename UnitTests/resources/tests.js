test( "Calculate Infusion Time", function() {
	// CalcInfusionTime (vol in mL, rate in hrs, label) - return time (in hrs/min) to infuse the entire dose
	var flowRate = CalcInfusionTime(1000, 125, true);
	deepEqual( flowRate, "8 hrs / 0 min", "Testing 1000 ml at a rate of 125 mL per Hour = 8 hour infusion time");

	flowRate = CalcInfusionTime(3500, 100, true);
	deepEqual( flowRate, "35 hrs / 0 min", "Testing 3.5 Litres at a rate of 100 mL per Hour = 35 hour infusion time");

	flowRate = CalcInfusionTime(5000, 450, true);
	deepEqual( flowRate, "11 hrs / 7 min", "Testing 5.0 Litres at a rate of 45 mL per hour = 11 hours 7 mins infusion time");

	flowRate = CalcInfusionTime(500, 50, true);
	deepEqual( flowRate, "10 hrs / 0 min", "Testing 500 mL at a rate of 50 mL per hour = 10 hour flow rate");


	flowRate = CalcInfusionTime(50, 50, true);
	deepEqual( flowRate, "1 hrs / 0 min", "Testing 50 mL at a rate of 50 mL per hour = 1 hour flow rate");

	flowRate = CalcInfusionTime(50, 100, true);
	deepEqual( flowRate, "0 hrs / 30 min", "Testing 50 mL at a rate of 100 mL per hour = 0.5 hour flow rate");
	
	flowRate = CalcInfusionTime(100, 100, true);
	deepEqual( flowRate, "1 hrs / 0 min", "Testing 100 mL at a rate of 100 mL per hour = 1 hour flow rate");
	
	flowRate = CalcInfusionTime(100, 50, true);
	deepEqual( flowRate, "2 hrs / 0 min", "Testing 100 mL at a rate of 50 mL per hour = 2 hour flow rate");
	
	flowRate = CalcInfusionTime(100, 200, true);
	deepEqual( flowRate, "0 hrs / 30 min", "Testing 100 mL at a rate of 200 mL per hour = 0.5 hour flow rate");
	
	flowRate = CalcInfusionTime(250, 125, true);
	deepEqual( flowRate, "2 hrs / 0 min", "Testing 250 mL at a rate of 125 mL per hour = 2 hour flow rate");
	
	flowRate = CalcInfusionTime(500, 167, true);
	deepEqual( flowRate, "3 hrs / 0 min", "Testing 500 mL at a rate of 167 mL per hour = 3 hour flow rate");
	
	flowRate = CalcInfusionTime(500, 125, true);
	deepEqual( flowRate, "4 hrs / 0 min", "Testing 500 mL at a rate of 125 mL per hour = 4 hour flow rate");
	
	flowRate = CalcInfusionTime(1000, 125, true);
	deepEqual( flowRate, "8 hrs / 0 min", "Testing 1000 mL at a rate of 125 mL per hour = 8 hour flow rate");

	flowRate = CalcInfusionTime(1000, 631.6, true);
	deepEqual( flowRate, "1 hrs / 35 min", "Testing 1000 mL at a rate of 631.6 mL per hour = 1 hour 35 min flow rate");



});
