
var action = {
    work: function(creep) {
    	var dropoff = Memory.Config.TargetSelectors['dropoff'].select(creep);    	
        if(!dropoff) { return false; }

        if(creep.transfer(dropoff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropoff);
        }
        return true;
    }
};
module.exports = action;