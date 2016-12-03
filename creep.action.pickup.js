var action = {
    work: function(creep) {
    	var energy = Memory.Config.TargetSelectors['pickup'].select(creep);
        if(!energy) { return false; }

        if(creep.pickup(energy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energy);
        }
        return true;
    }
};
module.exports = action;