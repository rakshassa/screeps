var target = {
    select: function(creep) {

        var closestSource = creep.pos.findClosestByRange(FIND_DROPPED_ENERGY);        
        return closestSource;
    }
};
module.exports = target;