
var roleRemoteHarvester = {

    run: function(creep) {

        // if any hostile in my room, flee and return true;

        // if not in remoteroom {
        //      if any hostile in any room, flee and return true;            
        // }
        // if we can see into the remote room: work

        if (Memory.Config.MyRooms[creep.room.name].has_hostile) {
            if (!Memory.Config.takeoverRoom) {
                if (Memory.Config.Actions['flee'].work(creep)) { return true; }            
            }
        }

        if (creep.room.name != creep.memory.remoteharvestroom) {
            if (!Memory.Config.takeoverRoom) {
                if (Memory.Config.Actions['flee'].work(creep)) { return true; }   
            }
        }

        if (!creep.memory.fleeing && creep.memory.unloading && _.sum(creep.carry) == 0) {
            creep.memory.unloading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.unloading && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.unloading = true;
            creep.say('unloading');
        }

        if (creep.memory.unloading) {
            if (creep.pos.roomName != Memory.Config.baseroom) {                    
                creep.moveTo(Memory.Config.baseController);  
                return true;              
            } else {                
                if (Memory.Config.Actions['dumpminerals'].work(creep)) { return true; }
                if (Memory.Config.Actions['dropoff'].work(creep, true)) { return true; }  
                if (Memory.Config.Actions['upgrade'].work(creep)) { return true; }
            }
        }
        
                   
        if (!creep.memory.unloading) {
            if (creep.room.name != creep.memory.remoteharvestroom) { 
                if (Memory.Config.Actions['changeroom'].work(creep, creep.memory.remoteharvestroom)) { return true; }                
            } else {                                    
                if (Memory.Config.Actions['pickup'].work(creep)) { return true; }                    
                if (Memory.Config.Actions['mining'].work(creep)) { return true; }

                closestSource = creep.pos.findClosestByRange(FIND_SOURCES);
                creep.moveTo(closestSource);
                return true;
            }
        }
    
        
        return false;   
    }
};

module.exports = roleRemoteHarvester;