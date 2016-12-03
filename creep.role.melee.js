
var roleMelee = {    
    run: function(creep) {
        // if hostile in myroom, attack it
        // if hostile in any room, move there
        // rally

        if (Memory.Config.MyRooms[creep.room.name].has_hostile) {
            if (Memory.Config.Actions['attackcreep'].work(creep)) { return true; }
            return false;  
        }

        if (Memory.Config.any_hostile) {
            for (var roomname in Game.rooms) {
                if (Memory.Config.MyRooms[roomname].has_hostile) {
                    if (Memory.Config.Actions['changeroom'].work(creep, roomname)) { return true; }
                }
            }
            return false;
        }
        
        var closestRally = Game.flags[Memory.Config.MeleeRallyFlagName];
        if (closestRally) {
            creep.moveTo(closestRally);
            return true;
        }
        return false;
    }
};

module.exports = roleMelee;