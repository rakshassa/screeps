
var roleReserver = {

    run: function(creep) {

        // if any hostile in my room, flee and return true;

        // if not in reserveroom {
        //      if any hostile in any room, flee and return true;            
        // }
        // move to room and start reserving
        if (Memory.Config.MyRooms[creep.room.name].has_hostile) {
            if (!Memory.Config.takeoverRoom) {
                if (Memory.Config.Actions['flee'].work(creep)) { return true; }            
            }
        }

        if (creep.room.name != creep.memory.reserveroom) {
            // if any hostiles in current room, run home.
            if (!Memory.Config.takeoverRoom) {                
                //if (Memory.Config.Actions['flee'].work(creep)) { return true; }   
            }
        }

        
        if (creep.room.name != creep.memory.reserveroom) { 
            if (Memory.Config.Actions['changeroom'].work(creep, creep.memory.reserveroom)) { return true; }       
        } else {
            if (Memory.Config.Actions['claim'].work(creep)) { return true; }
        }
    
        
        return false;        
    }
};

module.exports = roleReserver;