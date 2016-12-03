

var target = {
    select: function(room) {
        var closestConstructionSite = room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION);
                }
        });
        if (!closestConstructionSite) {
            closestConstructionSite = room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER);
                }
            });
        }
        
        if (!closestConstructionSite) {
            closestConstructionSite = room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD);
                }
            });
        }

        if (!closestConstructionSite) {
            closestConstructionSite = room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART);
                }
            });
        }
        if (!closestConstructionSite) {
            closestConstructionSite = room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        }
        return closestConstructionSite;
    }
};
module.exports = target;