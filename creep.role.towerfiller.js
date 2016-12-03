var roleTowerFiller = {
    
    run: function(creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('fill-tower');
        }
        
        if (creep.memory.building) {
            if (Memory.Config.Actions['filltower'].work(creep)) { return true; }
            if (Memory.Config.Actions['dropoff'].work(creep)) { return true; }            
            if (Memory.Config.Actions['upgrade'].work(creep)) { return true; }             
        } else {
            if (Memory.Config.Actions['pickup'].work(creep)) { return true; }            
            if (Memory.Config.Actions['withdraw'].work(creep)) { return true; }            
            if (Memory.Config.Actions['mining'].work(creep)) { return true; }     
        }
    }
};

module.exports = roleTowerFiller;