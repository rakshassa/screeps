var target = {
    select: function(creep) {

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