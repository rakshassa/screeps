var mod = {
    extend: function(){ 

		Creep.prototype.honk = function(){
            this.say('\u{26D4}\u{FE0E}', true);            
        };

        Creep.prototype.resetRenew = function() {
        	// reset renew if he's done
            if(this.memory.renewing) {            
                if (this.ticksToLive >= Memory.Config.RENEW_COMPLETE) {                
                    this.memory.renewing = false;
                }
            }
        };

        Creep.prototype.needsRenew = function() {
            if (!Memory.Config.ALLOW_RENEW) { return false; }
        	renewing = _.filter(Game.creeps, (creep) => (creep.memory.renewing == true));

            // if we plan to fight, let's beef up the fighters and let them expire at the battle (no return home)
            if (Memory.Config.prepareTakeover) {
                if (this.memory.role == 'melee' || this.memory.role == 'ranged' || this.memory.role == 'healer') {
                    if (this.room.name == this.memory.homeRoom) {
                        if (this.ticksToLive < Memory.Config.MIN_FIGHTER_TICKSTOLIVE) {
                            return true;
                        }
                    }
                    return false;
                }
            }
            
            // During war, do NOT renew fighters
            if (Memory.Config.takeoverRoom) { 
                if (this.memory.role == 'melee' || this.memory.role == 'ranged' || this.memory.role == 'healer') {
                    return false;
                }
            }
            if (this.memory.role == 'reserver' || this.memory.role == 'remoteharvester') { return false; }
            if (this.memory.renewing) { return true; }

        	if ((renewing.length < Memory.Config.MAX_RENEW_COUNT) && (this.ticksToLive < Memory.Config.MIN_TICKSTOLIVE) ) {
        		return true;
        	}

        	return false;
        };

        Creep.stopFleeing = function() {
            for (var creepName in Game.creeps) {
                creep = Game.creeps[creepName];

                if (creep.memory.fleeing) {
                    creep.memory.fleeing = false;
                }
            }             
        };

        
        Creep.stats = function() {  
            var totalCreeps = 0;   
            for (var roomName in Game.rooms) {                 
                for (var roleName in Memory.Config.Role) {            
                    var creeps = Memory.Config.Census[roomName][roleName];
                    console.log(roomName + ": " + roleName + ": " + creeps.length);
                    totalCreeps += creeps.length;
                }  
                console.log('---------------------')
            }
            return "Total Creeps: " + totalCreeps;
        };

        Creep.remotestats = function() {  
            var totalCreeps = 0; 

            console.log('--- Reservers ---')  
            for (var roomName in Memory.Config.reserverooms) {
                var arrayLength = Memory.Config.reserverooms[roomName].length;
                for (var i = 0; i < arrayLength; i++) {
                    var targetRoom = Memory.Config.reserverooms[roomName][i];
                    var found = _.filter(Game.creeps, 
                        (creep) => ((creep.memory.role == 'reserver') && (creep.memory.reserveroom == targetRoom)));
                    console.log('From Room: ' + roomName + " - to room: " + targetRoom + " - " + found.length);
                    totalCreeps += found.length;
                }
            }

            console.log('---Remote Harvesters---')  
            for (var roomName in Memory.Config.remoteharvestrooms) {
                var arrayLength = Memory.Config.remoteharvestrooms[roomName].length;
                for (var i = 0; i < arrayLength; i++) {
                    var targetRoom = Memory.Config.remoteharvestrooms[roomName][i];
                    var found = _.filter(Game.creeps, 
                        (creep) => ((creep.memory.role == 'remoteharvester') && (creep.memory.remoteharvestroom == targetRoom)));
                    console.log('From Room: ' + roomName + " - to room: " + targetRoom + " - " + found.length);
                    totalCreeps += found.length;
                }
            }
            return "Total Creeps: " + totalCreeps;
        };

        Creep.loop = function() {	        	        
	        for (var creepName in Game.creeps) {
	            var creep = Game.creeps[creepName];
                if (creep.spawning) { continue; }
	            creep.resetRenew();

	            // if he needs to be renewed, head home
	            if (creep.needsRenew()) {	                
	                Memory.Config.Actions['renew'].work(creep);
	            } else {
	                var isBusy = Memory.Config.Role[creep.memory.role].run(creep);                
	                if (!isBusy) {
	                    Game.notify(creep.name + " is idle.", 60);
                        console.log(creep.name + " is idle.");
	                }
	            }   
	        }
        };
    }
}

module.exports = mod;