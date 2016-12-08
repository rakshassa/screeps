var target = {
    select: function(creep) {       
        var myRoomName = creep.room.name;
        
        var matches = _.filter(Game.creeps, 
                    (creep) => ((creep.memory.role == 'ranged') && (creep.room.name == roomName)));
        
        for (var fighter in matches) {
            return fighter;            
        }

        matches = _.filter(Game.creeps, 
                    (creep) => ((creep.memory.role == 'melee') && (creep.room.name == roomName)));
        for (var fighter in matches) {            
            return fighter;            
        }
        
        return null;
    }
};
module.exports = target;