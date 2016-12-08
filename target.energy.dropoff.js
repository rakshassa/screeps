var target = {
    select: function(creep, useLink=false) {
        var closestTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            (structure.structureType == STRUCTURE_LINK && useLink && creep.memory.role == 'remoteharvester')) && 
                            structure.energy < structure.energyCapacity);
                }
        });
        if (!closestTarget) {
            closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (((structure.my && structure.structureType == STRUCTURE_STORAGE) ||
                              (structure.structureType == STRUCTURE_CONTAINER && !Memory.Config.CONSUME_CONTAINERS))   && 
                            _.sum(structure.store) < structure.storeCapacity);
                }
            });
        }
        if (!closestTarget) {
            closestTarget = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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