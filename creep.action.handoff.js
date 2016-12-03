var action = {
    work: function(creep) {
        if (!Memory.Config.ALLOW_HANDOFF) { return false; }
        
    	if (creep.carry.energy < Memory.Config.MIN_ENERGY_HANDOFF) { return false; }

    	var friend = Memory.Config.TargetSelectors['handoff'].select(creep);
        if(!friend) { return false; }

        var amount = friend.carryCapacity - friend.carry.energy;            
        if (creep.carry.energy < amount) { amount = creep.carry.energy; }
        if (creep.transfer(friend, RESOURCE_ENERGY, amount) == OK) { 
            creep.say('Transfer');
            return true;            
        }
        return false;
    }
};
module.exports = action;