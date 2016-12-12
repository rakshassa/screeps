var action = {
    work: function(creep) {

    	// If we only carry energy, then we have zero minerals.
    	if (creep.carry.energy == _.sum(creep.carry)) { return false; }

    	var storage = Memory.Config.TargetSelectors['mineralstorage'].select(creep);           
            
        if(!storage) { return false; }
        
        for (var mineraltype in creep.carry) {
        	//if (mineraltype != RESOURCE_ENERGY) {
				if (creep.transfer(storage, mineraltype) == ERR_NOT_IN_RANGE) {
		            creep.moveTo(storage);
		        }
		    //}
	    }
        return true;
    }
};
module.exports = action;