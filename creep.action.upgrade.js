var action = {
    work: function(creep) {
    	var controller = creep.room.controller;   	
        if(!controller) { return false; }
        
        if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        }
         
        return true;
    }
};
module.exports = action;