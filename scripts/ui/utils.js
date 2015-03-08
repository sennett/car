define(function() {
    return {
		roundScore: function(score){
			return score >= 0 ? Math.round(score * 100) / 100 : 0;
		}
	}
});