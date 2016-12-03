
var roleReserver = {

    run: function(creep) {

        // if any hostile in my room, flee and return true;

        // if not in remoteroom {
        //      if any hostile in any room, flee and return true;            
        // }
        // if we can see into the remote room: reserve
        if (Memory.Config.MyRooms[creep.room.name].has_hostile) {
            if (Memory.Config.Actions['flee'].work(creep)) { return true; }            
        }

        if (creep.room.name != Memory.Config.remoteroom) {
            if (Memory.Config.Actions['flee'].work(creep)) { return true; }   
        }

        if (Memory.Config.MyRooms[Memory.Config.remoteroom]) {
            if (creep.room.name != Memory.Config.remoteroom) { 
                if (Memory.Config.Actions['changeroom'].work(creep)) { return true; }       
            } else {
                if (Memory.Config.Actions['reserve'].work(creep)) { return true; }
            }
        }
        
        return false;        
    }
};

module.exports = roleReserver;