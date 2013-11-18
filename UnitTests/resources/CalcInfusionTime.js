/**
 * Example Page: http://www.manuelsweb.com/IVrate.htm
 * @param vol   int  Fluid Volume in mL (milliliters)
 * @param rate  int  Flow Rate in mL (milliliters) / hour
 * @param label bool True to display labels in return string (e.g. x Hr / y Min)
 **/
function CalcInfusionTime (vol, rate, label) {		// Calculate Infusion time in Hrs/Min given Volume and Rate.
	if (vol==50 && rate==50) {
//		debugger;
	}
	var infTime = vol / rate;
	var Hrs = infTime.toFixed(3);
	var tmp = Hrs.split(".");
	var Frac;
	if (tmp.length > 1) {
		Hrs = tmp[0];
		Frac = tmp[1];
	}
	var Min = 0;
	if (infTime > 1) {
		Min = ((infTime - Hrs)*60).toFixed(0);
	}
	else if (infTime < 1) {
		Min = (infTime*60).toFixed(0);
	}
	if (Min > 50) {		// Handle rounding of weird flow rates, should never happen in Real World but does in testing.
		Hrs = 1 + parseInt(Hrs, 10);
		Min = 0;
	}

	var retbuf = Hrs + " / " + Min;
	if (label) {
		retbuf = (Hrs + " hrs / " + Min + " min");
	}
	return (retbuf);
}
