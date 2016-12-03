var action = {
    work: function(creep) {
    	

        if (creep.room.controller) {
            var retVal = creep.reserveController(creep.room.controller);
            if (retVal == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);    
            } else {
                if (retVal != OK) {
                    creep.memory.invalidController = true;
                    Game.notify('Cannot reserve controller in room: ' + Memory.Config.remoteroom, 20);
                    return false;
                }
            }
        } else {
        	Game.notify('No controller in room: ' + Memory.Config.remoteroom, 20);
        	return false;
        }
        
        return true;
    }
};
module.exports = action;