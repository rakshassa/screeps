var action = {
    work: function(creep) {
    	var hostile = Memory.Config.TargetSelectors['hostilespawn'].select(creep);
    	if (!hostile) { return false; }

    	var retVal = OK;

    	if (creep.memory.role == 'ranged') {
    		retVal = creep.rangedAttack(hostile);
    	} else {
    		retVal = creep.attack(hostile);
    	}
    	if(retVal == ERR_NOT_IN_RANGE) {
    		
            creep.moveTo(hostile);
        } else {
        	if (retVal != OK) {
        		console.log('Failed to attack: ' + retVal);
        	}
        }
        return true;
    }
};
module.exports = action;