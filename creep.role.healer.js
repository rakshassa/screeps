
var roleHealer = {

    
    run: function(creep) {
        // heal if any injured in myroom
        // hug fighters if any hostiles in myroom

        // if any injured/hostiles in other rooms, move there

        // move to healer-rally-flag

        if (Memory.Config.MyRooms[creep.room.name].has_injured) {
            if (Memory.Config.Actions['heal'].work(creep)) { return true; }
            return false;
        } 

        if (!creep.room.controller.safeMode) {
            if (Memory.Config.MyRooms[creep.room.name].has_hostile && Memory.Config.FighterCount > 0) {
                if (Memory.Config.Actions['hugfighter'].work(creep)) { return true; }                
                return false;  
            }
        }

        if (Memory.Config.has_injured) {
            for (var roomname in Game.rooms) {
                if (Memory.Config.MyRooms[roomname].has_injured) {
                    if (Memory.Config.Actions['changeroom'].work(creep, roomname)) { return true; }
                }
            }
            return false;
        }

        if (Memory.Config.has_hostile && Memory.Config.FighterCount > 0) {
            for (var roomname in Game.rooms) {
                if (!Game.rooms[roomname].controller.safeMode) {
                    if (Memory.Config.MyRooms[roomname].has_hostile) {
                        if (Memory.Config.Actions['changeroom'].work(creep, roomname)) { return true; }
                    }
                }
            }
            return false;
        }

        if (Memory.Config.takeoverRoom) {
            if (creep.room.name != Memory.Config.takeoverRoom) {
                if (Memory.Config.Actions['changeroom'].work(creep, Memory.Config.takeoverRoom)) { return true; }
            }
        }

        var closestRally = Game.flags[Memory.Config.HealerRallyFlagName];
        if (closestRally) {
            creep.moveTo(closestRally);
            return true;
        }	            
        return false;        
    }
};

module.exports = roleHealer;