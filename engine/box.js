var Box = {};

Box = {
		isPushable : function(iSrc, jSrc, iDest, jDest) {
			if(Map.map[iSrc][jSrc] == "$" || Map.map[iSrc][jSrc] == "*") {
				if(Map.map[iDest][jDest] == " " || Map.map[iDest][jDest] == ".")
					return true;
			}
			return false;
		}
};