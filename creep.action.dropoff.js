
var action = {
    work: function(creep, useLink=false) {
    	var dropoff = Memory.Config.TargetSelectors['dropoff'].select(creep, useLink);    	
        if (!dropoff) { return false; }

        if (creep.transfer(dropoff, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(dropoff);
        }
        return true;
    }
};
module.exports = action;