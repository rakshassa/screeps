var target = {
    select: function(creep) {
        var closestTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_TOWER) && 
                            structure.energy < (structure.energyCapacity-Memory.Config.MIN_TOWER_FILL))
                }
        });
        
        return closestTarget;
    }
};
module.exports = target;