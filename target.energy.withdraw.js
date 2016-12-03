var target = {
    select: function(creep) {

        var closestSource = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (source) => {
                return ((source.structureType == STRUCTURE_CONTAINER  ||
                        source.structureType == STRUCTURE_STORAGE) && 
                        source.store[RESOURCE_ENERGY] > 0);
            }
        });
    
        return closestSource;
    }
};
module.exports = target;