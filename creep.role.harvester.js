var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.unloading && creep.carry.energy == 0) {
            creep.memory.unloading = false;
            creep.say('harvesting');
        }
        if(!creep.memory.unloading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.unloading = true;
            creep.say('unloading');
        }

        if (Memory.Config.Actions['handoff'].work(creep)) { return true; }
        
        if(creep.memory.unloading) {
            if (Memory.Config.Actions['dropoff'].work(creep)) { return true; }  
            if (Memory.Config.Actions['upgrade'].work(creep)) { return true; } 
        } else {
            if (Memory.Config.Actions['mining'].work(creep)) { return true; }            
        }

        return false;
    }
};

module.exports = roleHarvester;