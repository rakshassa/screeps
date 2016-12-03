var target = {
    select: function(creep) {              
        
        var closestSource = creep.pos.findClosestByPath(FIND_SOURCES, {
            filter: (source) => {
                return source.energy > 0;
            }
        });
        
        if (!closestSource) {
            closestSource = creep.pos.findClosestByRange(FIND_SOURCES, {
                filter: (source) => {
                    return source.energy > 0;
                }
            });
        }        
        return closestSource;
    }
};
module.exports = target;