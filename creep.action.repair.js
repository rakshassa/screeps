var action = {
    work: function(creep) {
    	var damaged = Memory.Config.MyRooms[creep.room.name].damaged;            
            
        if(!damaged) { return false; }
        
		if(creep.repair(damaged) == ERR_NOT_IN_RANGE) {
            creep.moveTo(damaged);
        }
        return true;
    }
};
module.exports = action;