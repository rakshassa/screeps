var target = {
    select: function(creep) {
        var closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && 
                            structure.energy < structure.energyCapacity);
                }
        });
        if (!closestTarget) {
            closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER || 
                            structure.structureType == STRUCTURE_STORAGE) && 
                            _.sum(structure.store) < structure.storeCapacity);
                }
            });
        }
        if (!closestTarget) {
            closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_TOWER) && 
                            structure.energy < structure.energyCapacity);
                }
            });
        }
        return closestTarget;
    }
};
module.exports = target;