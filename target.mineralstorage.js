var target = {
    select: function(creep) {

        if (creep.room.terminal && 
            _.sum(creep.room.terminal.store) < (structure.storeCapacity-Memory.Config.TERMINAL_RESERVE_ENERGY)) {
            return creep.room.terminal;
        }

        var closestTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_STORAGE) && 
                        _.sum(structure.store) < structure.storeCapacity);
            }
        });

        if (!closestTarget) {
            closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) && 
                            _.sum(structure.store) < structure.storeCapacity);
                }
            });
        }
        
        return closestTarget;
    }
};
module.exports = target;