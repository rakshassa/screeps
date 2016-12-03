
var roleRenew = {   

    run: function(spawn) {
        renewing = _.filter(Game.creeps, (creep) => (creep.memory.renewing == true));

        targets = spawn.pos.findInRange(FIND_MY_CREEPS, 1, {
            filter: (creep) => {
                return (creep.ticksToLive < Memory.Config.RENEW_COMPLETE) &&
                        (creep.memory.role != 'reserver');
            }
        });
        if (targets.length == 0) { return false; }


        var ran_unrounded=Math.random()*targets.length;
        var ran_number=Math.floor(ran_unrounded);

        creep = targets[ran_number];
                
        if (renewing.length < Memory.Config.MAX_RENEW_COUNT) {
            creep.memory.renewing = true;
        }
        
        result = spawn.renewCreep(creep);        
        return true;
    }
};

module.exports = roleRenew;