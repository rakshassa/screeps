var action = {
    work: function(creep) {
    	var source = Memory.Config.TargetSelectors['extractor'].select(creep);    	
        if(!source) { return false; }

        if (!creep.pos.isNearTo(source)) {
            creep.moveTo(source);
            return true;
        }

        var retVal = creep.harvest(source);               
        if (retVal == -11) {
            // Extractor is on cooldown (5 ticks) - just wait.
            //creep.moveTo(source);
            creep.say('waiting')                ;
        } else if (retVal != OK) {
    		console.log(creep.name + " Failed to Extract: " + retVal)
    	}

        return true;
    }
};
module.exports = action;