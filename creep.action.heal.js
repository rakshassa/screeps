var action = {
    work: function(creep) {
    	if (!Memory.Config.has_injured) { return false; }
        
    	var injured = Memory.Config.TargetSelectors['injured'].select(creep);
        if(!injured) { return false; }

        if(creep.heal(injured) == ERR_NOT_IN_RANGE) {
            creep.moveTo(injured);
        }
        return true;
    }
};
module.exports = action;