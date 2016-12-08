var mod = {
    extend: function(){ 
		
        Spawn.loop = function() {	        	        
	        for(var i in Game.spawns) {
                var spawn = Game.spawns[i];

                // recycle anyone who needs it.
                var targets = spawn.pos.findInRange(FIND_MY_CREEPS, 1, {
                    filter: (creep) => {
                        return (creep.memory.role == 'recycle');
                    }
                });
                if(targets.length > 0) {
                    spawn.recycleCreep(targets[0]);
                }

                var isRenewing = false;
                var isSpawning = spawn.spawning;

                if (isSpawning == null) {
                    
                    
                    isRenewing = Memory.Config.Spawn.Roles['renew'].run(spawn);
                }
                if (!isRenewing) {
                    Memory.Config.Spawn.Roles['autospawn'].run(spawn);
                }
            }
        };
    }
}

module.exports = mod;