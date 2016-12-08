
// TODO: consider having ranged move away (opposite direction) after attacking - move/shoot in same round is allowed.

var roleRanged = {    
    run: function(creep) {

        // if hostile in myroom, attack it
        // if hostile in any room, move there
        // rally
        if (!Game.rooms[creep.room.name].controller.safeMode) {
            if (Memory.Config.MyRooms[creep.room.name].has_hostilestructure) {        
                if (Memory.Config.Actions['attacktower'].work(creep)) { return true; }
                if (Memory.Config.Actions['attackcreep'].work(creep)) { return true; }            
                if (Memory.Config.Actions['attackspawn'].work(creep)) { return true; }
                if (Memory.Config.Actions['attackstructure'].work(creep)) { return true; }
                return false;
            }


            if (Memory.Config.MyRooms[creep.room.name].has_hostile) {
                if (Memory.Config.Actions['attackcreep'].work(creep)) { return true; }
                return false;  
            }
        }

        if (Memory.Config.any_hostile) {
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
        
        var closestRally = Game.flags[Memory.Config.RangedRallyFlagName];
        if (closestRally) {
            creep.moveTo(closestRally);
            return true;
        }
        return false;
    }
};

module.exports = roleRanged;