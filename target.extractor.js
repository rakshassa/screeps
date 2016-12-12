var target = {
    select: function(creep) {
        // var closestTarget = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return ((structure.structureType == STRUCTURE_EXTRACTOR))
        //         }
        // });
        var closestTarget = creep.pos.findClosestByPath(FIND_MINERALS);

        return closestTarget;
    }
};
module.exports = target;