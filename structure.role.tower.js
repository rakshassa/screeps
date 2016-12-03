
var roleTower = {
    
    run: function(tower) {
        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if(closestHostile) {
            tower.attack(closestHostile);
        } else {
            if (tower.energy > Memory.Config.TOWER_RESERVE_ENERGY) {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    	            filter: (structure) => (structure.hits < (structure.hitsMax-Memory.Config.MIN_DAMAGE_TO_REPAIR)) && (structure.hits < Memory.Config.MIN_WALL_HP)
    	        });
                
    	        if(closestDamagedStructure) {
    	            tower.repair(closestDamagedStructure);
    	        }
            }
        }
    }
};

module.exports = roleTower;