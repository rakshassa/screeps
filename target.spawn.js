var target = {
    select: function(creep) {
        var closestTarget = creep.pos.findClosestByPath(FIND_MY_SPAWNS);        
        return closestTarget;
    }
};
module.exports = target;