var target = {
    select: function(creep) {       
        var myRoomName = creep.room.name;

        for (var fighter in Memory.Config.Census['ranged']) {
            if (fighter.room.name == myRoomName) {
                return fighter;
            }
        }
        for (var fighter in Memory.Config.Census['melee']) {
            if (fighter.room.name == myRoomName) {
                return fighter;
            }
        }
        
        return null;
    }
};
module.exports = target;