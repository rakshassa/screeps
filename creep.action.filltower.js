var action = {
    work: function(creep) {
    	var tower = Memory.Config.TargetSelectors['tower'].select(creep);
        if(!tower) { return false; }
        
		if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(tower);
        }
        return true;
    }
};
module.exports = action;