var vistaconfig = require("../../lib/rpcvista/vistaconfig");
var vista = require("../../lib/rpcvista/VistaJS");



var vital_codes = {};

vital_codes['T'] = {pce:'TMP', code:'T', desc:'Temperature'};
vital_codes['P'] = {pce:'PU', code:'P', desc:'Pulse'},
vital_codes['R'] = {pce:'RS', code:'R', desc:'Respiration'},
vital_codes['BP'] = {pce:'BP', code:'BP', desc:'Blood Pressure'},
vital_codes['HT'] = {pce:'HT', code:'HT', desc:'Height'},
vital_codes['WT'] = {pce:'WT', code:'WT', desc:'Weight'},
vital_codes['PN'] = {pce:'PN', code:'PN', desc:'Pain Score'},
vital_codes['PO2'] = {pce:'PO2', code:'PO2', desc:'Pulse Oximetry'},
vital_codes['CVP'] = {pce:'CVP', code:'CVP', desc:'Central Venous Pressure'},
vital_codes['CG'] = {pce:'CG', code:'CG', desc:'Circumference/Girth'};

exports.vital_codes = vital_codes;
