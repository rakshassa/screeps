var roleUpgrader = {
    
    run: function(creep) {

        if (creep.memory.upgrading && _.sum(creep.carry) == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        
        if (!creep.memory.upgrading && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.room.name != creep.memory.homeRoom) {            
            if (Memory.Config.Actions['changeroom'].work(creep, creep.memory.homeRoom)) { return true; }            
        }

        if (creep.memory.upgrading) {
            if (Memory.Config.Actions['dumpminerals'].work(creep)) { return true; }
            if (Memory.Config.Actions['upgrade'].work(creep)) { return true; } 
        } else {
            if (Memory.Config.Actions['pickup'].work(creep)) { return true; }            
            if (Memory.Config.Actions['withdraw'].work(creep)) { return true; }            
            if (Memory.Config.Actions['mining'].work(creep)) { return true; }
        }
    }
};

module.exports = roleUpgrader;