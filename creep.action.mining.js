var action = {
    work: function(creep) {
    	var source = Memory.Config.TargetSelectors['mining'].select(creep);    	
        if(!source) { return false; }

        if(creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        return true;
    }
};
module.exports = action;