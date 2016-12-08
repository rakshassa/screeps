
var target = {
    select_room: function(room) {  
    	if (room.controller.safeMode) {
    		return false;
    	} 
		var hostiles = room.find(FIND_HOSTILE_STRUCTURES, {
                filter: (source) => {
                    return source.structureType != STRUCTURE_CONTROLLER;
                }
            });
        if (hostiles.length > 0) {
            //console.log('found hostile structure: ' + hostiles[0]);
        }
		if (hostiles.length > 0) { return (true); }
	    return false;
    },
    select: function(creep) {   
    	if (creep.room.controller.safeMode) {
    		return null;
    	} 
		var hostile = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (source) => {
                    return source.structureType != STRUCTURE_CONTROLLER;
                }
            });
		
        if (hostile) {
            //console.log('creep found hostile structure: ' + hostile);
        }
		return hostile;	    
    }
};
module.exports = target;