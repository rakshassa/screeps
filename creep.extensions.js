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
        	renewing = _.filter(Game.creeps, (creep) => (creep.memory.renewing == true));

        	if (this.memory.renewing || 
	            ((renewing.length < Memory.Config.MAX_RENEW_COUNT) && 
	          	 (this.ticksToLive < Memory.Config.MIN_TICKSTOLIVE) && 
	          	 (this.memory.role != 'reserver'))
	           ) {
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
            for (var roleName in Memory.Config.Role) {            
                var creeps = Memory.Config.Census[roleName];
                console.log(roleName + ": " + creeps.length);
            }  
        };

        Creep.loop = function() {	        	        
	        for (var creepName in Game.creeps) {
	            var creep = Game.creeps[creepName];

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