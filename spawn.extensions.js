var mod = {
    extend: function(){ 
		
        Spawn.loop = function() {	        	        
	        for(var i in Game.spawns) {
                var spawn = Game.spawns[i];
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