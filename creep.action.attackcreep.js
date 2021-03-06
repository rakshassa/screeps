var action = {
    work: function(creep) {
    	var hostilecreep = Memory.Config.TargetSelectors['hostile'].select(creep);
    	if (!hostilecreep) { return false; }

    	var retVal = OK;

    	if (creep.memory.role == 'ranged') {
    		retVal = creep.rangedAttack(hostilecreep);
    	} else {
    		retVal = creep.attack(hostilecreep);
    	}
    	if(retVal == ERR_NOT_IN_RANGE) {
    		
            creep.moveTo(hostilecreep);
        } else {
        	if (retVal != OK) {
        		console.log('Failed to attack: ' + retVal);
        	}
        }
        return true;
    }
};
module.exports = action;