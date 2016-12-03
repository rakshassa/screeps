var action = {
    work: function(creep) {
    	var energy = Memory.Config.TargetSelectors['withdraw'].select(creep);
        if(!energy) { return false; }

        if(creep.withdraw(energy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energy);
        }
        return true;
    }
};
module.exports = action;