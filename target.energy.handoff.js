

var target = {
    select: function(creep) {       

		var nearbyFriends = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: (friend) => {
                return (friend.carry.energy < (friend.carryCapacity-Memory.Config.MIN_ENERGY_HANDOFF) &&
                        friend.memory.role != 'harvester' &&
                        friend.memory.role != 'remoteharvester');
            }
        });
        if (nearbyFriends.length > 0) { return nearbyFriends[0]; }
        return false;
    }
};
module.exports = target;