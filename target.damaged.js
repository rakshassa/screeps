
var target = {
    select: function(room) {   
		var closestDamagedStructure = room.controller.pos.findClosestByPath(FIND_STRUCTURES, {			
	        filter: (structure) => {
	        	return (structure.hits < (structure.hitsMax-Memory.Config.MIN_DAMAGE_TO_REPAIR)) && 
	        			(structure.hits < Memory.Config.MIN_WALL_HP &&
	        			(structure.my || structure.structureType == STRUCTURE_CONTAINER));
	        }
	    });
	    return closestDamagedStructure;
    }
};
module.exports = target;