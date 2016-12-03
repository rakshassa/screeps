
var action = {
    work: function(creep) {
    	var spawn = Memory.Config.TargetSelectors['spawn'].select(creep);
    	if (spawn) { 
    		creep.moveTo(spawn); 
    		return true;
    	}

    	if (creep.moveTo(Game.spawns[Memory.Config.primaryspawn]) != OK) {
    		return false;
    	}
    	return true;
    }
};
module.exports = action;