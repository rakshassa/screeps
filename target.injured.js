var target = {
    select: function(creep) {
        var closestInjured = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        return closestInjured;
    },

    select_room: function(room) {
        var injured = room.find(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.hits < object.hitsMax;
            }
        });
        
        if (injured.length > 0) { return true; }
        return false;
    }
};
module.exports = target;