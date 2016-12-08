var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.unloading && _.sum(creep.carry) == 0) {
            creep.memory.unloading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.unloading && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.unloading = true;
            creep.say('unloading');
        }

        if (creep.room.name != creep.memory.homeRoom) {
            if (Memory.Config.Actions['changeroom'].work(creep, creep.memory.homeRoom)) { return true; }
        }

        if (Memory.Config.Actions['handoff'].work(creep)) { return true; }
        
        if(creep.memory.unloading) {
            if (Memory.Config.Actions['dumpminerals'].work(creep)) { return true; }
            if (Memory.Config.Actions['dropoff'].work(creep, false)) { return true; }  
            if (Memory.Config.Actions['upgrade'].work(creep)) { return true; } 
        } else {
            if (Memory.Config.Actions['mining'].work(creep)) { return true; }            
        }

        return false;
    }
};

module.exports = roleHarvester;