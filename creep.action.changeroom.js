var action = {
    work: function(creep, targetRoomName) {
        if (creep.room.name == targetRoomName) {
            return false;
        }

        // optimize pathing - remove if we need multiple exits from baseroom
    	if (creep.pos.roomName == Memory.Config.baseroom) {                
            creep.moveTo(Memory.Config.baseExit);
            return true;
        }
        
    	var exitDir = creep.room.findExitTo(targetRoomName);
    	var exit = creep.pos.findClosestByRange(exitDir);
    	creep.moveTo(exit);
    	return true;
    }
};
module.exports = action;