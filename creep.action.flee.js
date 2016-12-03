var action = {
    work: function(creep) {
    	if (Memory.Config.any_hostile) {            
            creep.say('fleeing');

            creep.moveTo(Memory.Config.HidingFlag);
            return true;
        }
        return false;
    }
};
module.exports = action;