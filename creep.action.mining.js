var action = {
    work: function(creep) {
    	var source = Memory.Config.TargetSelectors['mining'].select(creep);    	
        if(!source) { return false; }

        var retVal = creep.harvest(source, RESOURCE_ENERGY);
        if(retVal == ERR_NOT_IN_RANGE) {            
            creep.moveTo(source);
        } else {
        	if (retVal != OK) {
        		console.log(creep.name + " Failed to Harvest: " + retVal)
        	}
        }
        return true;
    }
};
module.exports = action;