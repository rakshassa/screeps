var action = {
    work: function(creep) {
    	var fighter = Memory.Config.TargetSelectors['fighter'].select(creep);
    	if (!fighter) { return false; }

    	creep.moveTo(fighter);
    	return true;
    }
};
module.exports = action;