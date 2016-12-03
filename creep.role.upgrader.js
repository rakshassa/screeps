var roleUpgrader = {
    
    run: function(creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            if (Memory.Config.Actions['upgrade'].work(creep)) { return true; } 
        } else {
            if (Memory.Config.Actions['pickup'].work(creep)) { return true; }            
            if (Memory.Config.Actions['withdraw'].work(creep)) { return true; }            
            if (Memory.Config.Actions['mining'].work(creep)) { return true; }
        }
    }
};

module.exports = roleUpgrader;