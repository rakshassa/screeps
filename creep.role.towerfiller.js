var roleTowerFiller = {
    
    run: function(creep) {
        if (creep.memory.building && _.sum(creep.carry) == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && _.sum(creep.carry) == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('fill-tower');
        }


        if (creep.room.name != creep.memory.homeRoom) {            
            if (Memory.Config.Actions['changeroom'].work(creep, creep.memory.homeRoom)) { return true; }            
        }
        
        if (creep.memory.building) {
            if (Memory.Config.Actions['dumpminerals'].work(creep)) { return true; }
            if (Memory.Config.Actions['filltower'].work(creep)) { return true; }
            if (Memory.Config.Actions['dropoff'].work(creep, false)) { return true; }            
            if (Memory.Config.Actions['upgrade'].work(creep)) { return true; }             
        } else {
            if (Memory.Config.Actions['pickup'].work(creep)) { return true; }            
            if (Memory.Config.Actions['withdraw'].work(creep)) { return true; }            
            if (Memory.Config.Actions['mining'].work(creep)) { return true; }     
        }
    }
};

module.exports = roleTowerFiller;