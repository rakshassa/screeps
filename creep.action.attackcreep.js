var action = {
    work: function(creep) {
    	var hostilecreep = Memory.Config.TargetSelectors['hostile'].select(creep);
    	if (!hostilecreep) { return false; }

    	if(creep.attack(hostilecreep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hostilecreep);
        }
        return true;
    }
};
module.exports = action;