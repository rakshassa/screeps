
var target = {
    
    select: function(creep) {   
    	if (creep.room.controller.safeMode) {
    		return null;
    	} 
		var hostile = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS);
		return hostile;	    
    }
};
module.exports = target;