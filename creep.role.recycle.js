
var roleRecycle = {
    
    run: function(creep) {

        
        var spawn = Memory.Config.TargetSelectors['spawn'].select(creep);
        if (!spawn) {
            creep.moveTo(Game.spawns[Memory.Config.primaryspawn]);
        } else {
            creep.moveTo(spawn);
        }
        return true;
    }
};

module.exports = roleRecycle;