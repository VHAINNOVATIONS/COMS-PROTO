<?php
    
    class BSACalcs {
        /**
         *
         * BSA Calculation Formulas
         * @param float $num
         * @param object $Patient
         * @var int $AUC
         *
         **/
        function FormatNumber( $num ) {
            $num = round( $num, 2, PHP_ROUND_HALF_UP );
            $num = number_format( $num, 2 );
            $num = rtrim( $num, "0" );
            
            return $num;
        }
        
        function CalcAUCDose( $Patient, $AUC = null ) {
            $age    = $Patient->Age;
            $gender = $Patient->Gender;
            $wt     = $Patient->Weight; // in pounds
            $kg     = $this->Pounds2Kilos( $wt );
            $sc     = $Patient->SerumCreatinine || 1; // fail safe if no SC is available from Lab Results
            $AUC    = $AUC || 1; // fail safe if no AUC is passed;
            
            
            
            
            $GFR = ( 140 - $age ) * $kg;
            if ( "F" === $gender ) {
                $GFR = $GFR * 0.85;
            }
            
            // echo "Age = $age\nKG = $kg\nAUC = $AUC\nSC = $sc\nGFR=$GFR\n";
            
            $GFR  = $GFR / ( 72 * $sc );
            // echo "GFR = $GFR\n";
            $Dose = ( $GFR + 25 ) * $AUC;
            // echo "Dose = $Dose\n";
            $Dose = $this->FormatNumber( $Dose );
            return $Dose . " mg";
        }
        
        
        function In2Meters( $h ) {
            $num = ( 0.0254 * $h );
            return round( $num, 2, PHP_ROUND_HALF_UP );
        }
        
        function In2CM( $h ) {
            $num = ( 2.54 * $h );
            return round( $num, 2, PHP_ROUND_HALF_UP );
        }
        
        function Pounds2Kilos( $w ) {
            $num = ( 0.45359237 * $w );
            return round( $num, 2, PHP_ROUND_HALF_UP );
        }
        
        function TempF2C( $f ) {
            $num = ( ( 5 * ( $f - 32 ) ) / 9 );
            return round( $num, 2, PHP_ROUND_HALF_UP );
        }
        
        function HeightSquared( $h ) {
            return pow( $h, 2 );
        }
        
        function WeightSquared( $w ) {
            return pow( $w, 2 );
        }
        
        function IdealWeight( $h, $g ) { // Height in Inches
            if ( $h < 60 ) {
                $h = 60;
            }
            $IdealWeight = ( ( $h - 60 ) * 2.3 ) + 45.5; // in KG
            if ( "M" === $g ) {
                $IdealWeight = ( ( $h - 60 ) * 2.3 ) + 50;
            }
            return $this->FormatNumber( $IdealWeight );
        }
        
        function AdjustedWeight( $w, $h, $g ) { // Height in Inches, weight in pounds
            $WeightInKilos = $this->Pounds2Kilos( $w );
            $IdealWeight   = $this->IdealWeight( $h, $g );
            $ret           = ( ( $WeightInKilos - $IdealWeight ) * 0.4 ) + $IdealWeight;
            return $this->FormatNumber( $ret );
        }
        
        /* Formula from http://www.medcalc.com/body.html */
        function LeanWeight( $w, $h, $g ) { // Height in Inches, weight in pounds
            $WeightInKilos = $this->Pounds2Kilos( $w );
            
            $WeightSquared = pow( $WeightInKilos, 2 );
            
            $HeightInM     = $this->In2Meters( $h );
            $HeightInM100  = ( 100 * $HeightInM );
            $HeightSquared = pow( $HeightInM100, 2 );
            if ( "F" === $g ) {
                $WeightSquared = 7273;
            }
            
            
            // echo "$g - WeightInKilos = $WeightInKilos; WeightSquared = $WeightSquared; HeightInM = $HeightInM; HeightInM100 = $HeightInM100; HeightSquared = $HeightSquared\n";
            
            if ( "M" === $g ) {
                $LeanWeight = ( 1.1 * $WeightInKilos ) - 128 * ( $WeightSquared / $HeightSquared );
            } else {
                $LeanWeight = ( 1.07 * $WeightInKilos ) - 148 * ( $WeightSquared / $HeightSquared );
            }
            return $this->FormatNumber( $LeanWeight );
        }
        
        
        // http://www.halls.md/bsa/bsaVuReport.htm
        // http://www.halls.md/body-surface-area/refs.htm
        //  1 inches = 0.0254 meters = 2.54 cm
        //	1 pound = 0.45359237 kilograms
        //
        // Generica formula:
        // hMultiplier x (height ^ hPower) x wMultiplier x (weight ^ wPower)
        // Note: Mosteller MAY be slightly different (I don't remember my "basic algebra" enough to know if Mosteller could still follow the same pattern)
        
        // The Mosteller formula - http://www.halls.md/body-surface-area/refs.htm
        // BSA = Math.sqrt( (cm*kg)/3600 )
        //     = Math.sqrt( ((HeightInInches * 2.54) * (WeightInPounds * 0.45359237 ))/3600);
        //
        // The DuBois and DuBois formula - http://www.halls.md/body-surface-area/refs.htm
        // BSA (m^2) = 0.20247 x Height(m)^0.725 x Weight(kg)^0.425
        //          = 0.20247 * (Math.pow((0.0254 * HeightInInches), 0.725)) * (Math.pow((0.45359237 * WeightInPounds), 0.425));
        //
        // Haycock formula - http://www.halls.md/body-surface-area/refs.htm
        // BSA (m^2) = 0.024265 x Height(cm)^0.3964 x Weight(kg)^0.5378
        //
        // Gehan and George formula - http://www.halls.md/body-surface-area/refs.htm
        // BSA (m^2) = 0.0235 x Height(cm)^0.42246 x Weight(kg)^0.51456
        //
        // Boyd BSA Formula -  - http://www.ispub.com/journal/the-internet-journal-of-anesthesiology/volume-2-number-2/a-linear-equation-for-estimating-the-body-surface-area-in-infants-and-children.html
        // BSA (cm^2) = 0.0003207 * (Height(cm)^0.3) * Weight(g) ^(0.7285-0.0188 log Weight(g))
        //
        // Boyd Approximation - http://www.ispub.com/journal/the-internet-journal-of-anesthesiology/volume-2-number-2/a-linear-equation-for-estimating-the-body-surface-area-in-infants-and-children.html
        // BSA (cm^2) = 1321 + 0.3433* Wt(g)
        // BSA (m^2) = (1321 + 0.3433* Wt(g))/10000
        
        function generic_BSA_Calc( $h, $w, $hMultiplier, $hPower, $wMultiplier, $wPower ) { // 	$HeightInMeters, $WeightInKilograms
            
            // var HeightInInches = h.split(" ")[0];
            // var HeightInMeters = (0.0254 * HeightInInches);
            // var HeightInCM = (2.54 * HeightInInches);
            // var WeightInPounds = w.split(" ")[0];
            // var WeightInKilograms = (0.45359237 * WeightInPounds);
            $HeightInMeters    = $h;
            $WeightInKilograms = $w;
            
            $H1 = pow( $HeightInMeters, $hPower );
            $W1 = pow( $WeightInKilograms, $wPower );
            
            $BSA = $hMultiplier * $H1 * $wMultiplier * $W1;
            return $this->FormatNumber( $BSA );
        }
        
        function BSA_Mosteller( $h, $w ) { // Height in Meters, Weight in Kg
            if ( $w <= 0 ) {
                $w = 0;
            }
            if ( $h <= 0 ) {
                $h = 0;
            }
            $tmp  = ( $h * 100 * $w ) / 3600;
            $BSA  = sqrt( $tmp );
            $rBSA = $this->FormatNumber( $BSA );
            return $rBSA;
        }
        
        
        
        function BSA_DuBois( $h, $w ) { // Height in Meters, Weight in Kg
            if ( $w <= 0 ) {
                $w = 0;
            }
            if ( $h <= 0 ) {
                $h = 0;
            }
            return $this->generic_BSA_Calc( $h, $w, 0.20247, 0.725, 1, 0.425 );
        }
        
        
        
        function BSA_Haycock( $h, $w ) { // Height in Meters, Weight in Kg
            if ( $w <= 0 ) {
                $w = 0;
            }
            if ( $h <= 0 ) {
                $h = 0;
            }
            return $this->generic_BSA_Calc( $h * 100, $w, 0.024265, 0.3964, 1, 0.5378 );
        }
        
        function BSA_Gehan_George( $h, $w ) { // Height in Meters, Weight in Kg
            if ( $w <= 0 ) {
                $w = 0;
            }
            if ( $h <= 0 ) {
                $h = 0;
            }
            return $this->generic_BSA_Calc( $h * 100, $w, 0.0235, 0.42246, 1, 0.51456 );
        }
        
        function BSA_Boyd( $h, $w ) { // Height in Meters, Weight in Kg
            //  (0.0003207 x (182.88^0.3) x (85280^(0.7285 - (0.0188 x log(85280)))))
            if ( $w <= 0 ) {
                $w = 0;
            }
            if ( $h <= 0 ) {
                $h = 0;
            }
            $wInGrams = $w * 1000;
            $hInCM    = $h * 100;
            $exp1     = ( 0.7285 - ( 0.0188 * log( $wInGrams, 10 ) ) );
            
            //	echo "wInGrams = $wInGrams; hInCM = $hInCM\n";
            //	echo "Log = " . log($wInGrams, 10) . "\n";
            //	echo "Log = " . log($wInGrams) . "\n";
            //	echo "Exp = $exp1\n";
            //	echo "Pow1 = " . pow($hInCM, 0.3) . "\n";
            //	echo "Pow2 = " . pow($wInGrams, $exp1) . "\n";
            
            $BSA = 0.0003207 * pow( $hInCM, 0.3 ) * pow( $wInGrams, $exp1 );
            
            return $this->FormatNumber( $BSA );
        }
        /*************************************************************
         *
         *	END BSA Calculations Modules
         *
         *************************************************************/
    }
    
    function TestBSA_Calcs( ) {
        $BSACalcs = new BSACalcs;
        class Patient {
        }
        $AUC                          = null;
        $Patient                      = new Patient;
        $Patient->SerumCreatinine     = "";
        $Patient->Temp                = "98";
        $Patient->Age                 = "79";
        $Patient->AppliedTemplateID   = "EEFB3BB2-3134-41B9-BFFE-E05554783DDD";
        $Patient->BSA                 = "1.79";
        $Patient->BSAFormula          = "DuBois";
        $Patient->BSA_Method          = "DuBois";
        $Patient->BSA_Weight          = 80.67;
        $Patient->DFN                 = "100499";
        $Patient->DOB                 = "04/07/1935";
        $Patient->Gender              = "M";
        $Patient->Height              = "72";
        $Patient->OEMDataRendered     = false;
        $Patient->PAT_ID              = "170F1838-7A9B-E411-9CB3-000C2935B86F";
        $Patient->TemplateDescription = "COMS Testing";
        $Patient->TemplateID          = "EEFB3BB2-3134-41B9-BFFE-E05554783DDD";
        $Patient->TemplateName        = "2014-1-0001-ABCD-CARBOPLATIN INJ   250CISPLATIN INJ,SOLN   300DIPHENHYDRAMINE CAP,ORAL   75-20140605";
        $Patient->TotalAdverseEvents  = 7;
        $Patient->TreatmentEnd        = "05/05/2015";
        $Patient->TreatmentStart      = "01/13/2015";
        $Patient->TreatmentStatus     = "On-Going - Admin Day";
        $Patient->Weight              = "188";
        $Patient->WeightFormula       = "Adjusted Weight";
        $Patient->id                  = "310E712D-E304-48E9-9835-94F31DA5595C";
        $Patient->name                = "PATIENT  FIVEHUNDRED";
        
        echo json_encode( $Patient ) . "\n\n\n\n";
        
        $rslt = $BSACalcs->FormatNumber( "123.4567" );
        echo "Format Number - 123.4567 = $rslt\n";
        $rslt = $BSACalcs->FormatNumber( "123.400" );
        echo "Format Number - 123.400 = $rslt\n";
        $rslt = $BSACalcs->FormatNumber( "00123.400" );
        echo "Format Number - 00123.400 = $rslt\n";
        
        $rslt = $BSACalcs->CalcAUCDose( $Patient, $AUC );
        echo "CalcAUCDose M = $rslt (Should Be - 97.25)\n";
        
        $Patient->Gender = "F";
        $rslt            = $BSACalcs->CalcAUCDose( $Patient, $AUC );
        echo "CalcAUCDose F = $rslt (Should Be - 86.41)\n";
        
        $h = $Patient->Height; // In Inches
        $w = $Patient->Weight; // in Pounds
        $f = $Patient->Temp; // in Fahrenheit
        $g = $Patient->Gender;
        
        $rslt = $BSACalcs->In2Meters( $h );
        echo "In2Meters = $h = $rslt (Should Be - 1.83)\n";
        
        $rslt = $BSACalcs->In2CM( $h );
        echo "In2CM  = $h = $rslt (Should Be - 182.88)\n";
        
        $rslt = $BSACalcs->Pounds2Kilos( $w );
        echo "Pounds2Kilos  = $w = $rslt (Should Be - 85.28)\n";
        
        $rslt = $BSACalcs->TempF2C( $f );
        echo "TempF2C  = $f = $rslt (Should Be - 36.67)\n";
        
        $rslt = $BSACalcs->HeightSquared( $h );
        echo "HeightSquared  = $h = $rslt (Should Be - 5184)\n";
        
        $rslt = $BSACalcs->WeightSquared( $w );
        echo "WeightSquared  = $w = $rslt (Should Be - 35344)\n\n";
        
        
        $g    = "M";
        $rslt = $BSACalcs->IdealWeight( $h, $g ); // Height in Inches
        echo "IdealWeight  = $h - $g = $rslt (Should Be - 77.6)\n";
        $rslt = $BSACalcs->AdjustedWeight( $w, $h, $g ); // Height in Inches, weight in pounds
        echo "AdjustedWeight  = $w - $h - $g = $rslt (Should Be - 121.8)\n";
        $rslt = $BSACalcs->LeanWeight( $w, $h, $g ); // Height in Inches, weight in pounds
        echo "LeanWeight = $w - $h - $g = $rslt (Should Be - 66kg)\n\n";
        
        
        $g    = "F";
        $rslt = $BSACalcs->IdealWeight( $h, $g ); // Height in Inches
        echo "IdealWeight  = $h - $g = $rslt (Should Be - 73.1)\n";
        $rslt = $BSACalcs->AdjustedWeight( $w, $h, $g ); // Height in Inches, weight in pounds
        echo "AdjustedWeight  = $w - $h - $g = $rslt (Should Be - 119.1)\n";
        $rslt = $BSACalcs->LeanWeight( $w, $h, $g ); // Height in Inches, weight in pounds
        echo "LeanWeight = $w - $h - $g = $rslt (Should Be - 59.11)\n\n";
        
        $hInMeters = $BSACalcs->In2Meters( $h );
        $wInKG     = $BSACalcs->Pounds2Kilos( $w );
        
        $rslt = $BSACalcs->BSA_Mosteller( $hInMeters, $wInKG ); // Height in Meters, Weight in Kg
        echo "Mosteller = $h/$hInMeters - $w/$wInKG = $rslt (Should Be - 2.08)\n";
        $rslt = $BSACalcs->BSA_DuBois( $hInMeters, $wInKG ); // Height in Meters, Weight in Kg
        echo "DuBois = $h/$hInMeters - $w/$wInKG = $rslt (Should Be - 2.08)\n";
        $rslt = $BSACalcs->BSA_Haycock( $hInMeters, $wInKG ); // Height in Meters, Weight in Kg
        echo "BSA_Haycock = $h/$hInMeters - $w/$wInKG = $rslt (Should Be - 2.09)\n";
        $rslt = $BSACalcs->BSA_Gehan_George( $hInMeters, $wInKG ); // Height in Meters, Weight in Kg
        echo "BSA_Gehan_George = $h/$hInMeters - $w/$wInKG = $rslt (Should Be - 2.09)\n";
        $rslt = $BSACalcs->BSA_Boyd( $hInMeters, $wInKG ); // Height in Meters, Weight in Kg
        echo "BSA_Boyd = $h/$hInMeters - $w/$wInKG = $rslt (Should Be - 2.09)\n";
    }
?>
