var action = {
    work: function(creep, targetRoomName) {
        if (creep.room.name == targetRoomName) {
            return false;
        }

        if (Memory.Config.Pathing && 
            Memory.Config.Pathing[creep.room.name] &&
            Memory.Config.Pathing[creep.room.name][targetRoomName]) {
            
            var flagName = Memory.Config.Pathing[creep.room.name][targetRoomName];
            if (Game.flags[flagName]) {
                if (!creep.pos.inRangeTo(Game.flags[flagName], 2)) {
                    creep.moveTo(Game.flags[flagName])                    
                    return true;
                }
            }
        }
        // if (creep.room.name == 'W58S78' && targetRoomName == 'W59S78') {
        //     if (Game.flags['Exit']) {
        //         if (!creep.pos.inRangeTo(Game.flags['Exit'], 2)) {
        //             creep.moveTo(Game.flags['Exit'])
        //             return true;
        //         }
        //     }
        // }

        // if (creep.room.name == 'W59S78' && targetRoomName == 'W58S78') {
        //     if (Game.flags['Exit2']) {
        //         if (!creep.pos.inRangeTo(Game.flags['Exit2'], 2)) {
        //             creep.moveTo(Game.flags['Exit2'])
        //             return true;
        //         }
        //     }
        // }
        
    	var exitDir = creep.room.findExitTo(targetRoomName);
        if (exitDir == ERR_NO_PATH) {
            console.log(creep.name + " is unable to change rooms to: " + targetRoomName + " from " + creep.room.name + ". No Path.")
        }
    	var exit = creep.pos.findClosestByRange(exitDir);
    	creep.moveTo(exit);
        
    	return true;
    }
};
module.exports = action;