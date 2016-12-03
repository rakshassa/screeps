var action = {
    work: function(creep) {
    	var constructionSite = Memory.Config.MyRooms[creep.room.name].constructionsite;            
            
        if(!constructionSite) { return false; }
        
		if(creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
        	creep.moveTo(constructionSite);
        }
        return true;
    }
};
module.exports = action;