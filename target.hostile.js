
var target = {
    select_room: function(room) {   
		var hostiles = room.find(FIND_HOSTILE_CREEPS);
		if (hostiles.length > 0) { return (true); }
	    return false;
    },
    select: function(creep) {   
		var hostile = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
		return hostile;	    
    }
};
module.exports = target;