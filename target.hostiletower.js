
var target = {
    
    select: function(creep) {
    	if (creep.room.controller.safeMode) {
    		return null;
    	}    
		var hostile = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (source) => {
                    return source.structureType == STRUCTURE_TOWER;
                }
            });
		return hostile;	    
    }
};
module.exports = target;