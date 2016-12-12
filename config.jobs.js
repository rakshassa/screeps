var config = {

    init: function(){
        Memory.Config.Role = {
            'builder': require('creep.role.builder'),
            'reserver': require('creep.role.reserver'),
            'harvester': require('creep.role.harvester'),
            'remoteharvester': require('creep.role.remoteharvester'),
            'repair': require('creep.role.repair'),
            'upgrader': require('creep.role.upgrader'),
            'healer': require('creep.role.healer'),
            'melee': require('creep.role.melee'),
            'ranged': require('creep.role.ranged'),            
            'tower': require('creep.role.towerfiller'),
            'recycle': require('creep.role.recycle'),
            'claimer': require('creep.role.claimer'),
            'extractor': require('creep.role.extractor')
        };

        Memory.Config.Actions = {
            // 'healing': require('creep.action.healing'),            
            // 'meleefighting': require('creep.action.meleefighting'),
            // 'rangedfighting': require('creep.action.rangedfighting')
            // 'remoteharvesting': require('creep.action.remoteharvesting'),  

            'filltower': require('creep.action.filltower'),
            'changeroom': require('creep.action.changeroom'),
            'reserve': require('creep.action.reserve'),
            'flee': require('creep.action.flee'),
            'upgrade': require('creep.action.upgrade'), 
            'handoff': require('creep.action.handoff'), 
            'building': require('creep.action.building'),             
            'repair': require('creep.action.repair'),
            'mining': require('creep.action.mining'),
            'pickup': require('creep.action.pickup'),
            'withdraw': require('creep.action.withdraw'),            
            'heal': require('creep.action.heal'),  
            'hugfighter': require('creep.action.hugfighter'),  
            'attackcreep': require('creep.action.attackcreep'),
            'attacktower': require('creep.action.attacktower'),
            'attackspawn': require('creep.action.attackspawn'),
            'attackstructure': require('creep.action.attackstructure'),
            'renew': require('creep.action.renew'),   
            'dumpminerals': require('creep.action.dumpminerals'),
            'dropoff': require('creep.action.dropoff'),
            'claim': require('creep.action.claim'),
            'extract': require('creep.action.extract')
        };

        Memory.Config.TargetSelectors = {
            
            'hostile': require('target.hostile'),
            'hostiletower': require('target.hostiletower'),
            'hostilespawn': require('target.hostilespawn'),
            'hostilestructure': require('target.hostilestructure'),

            'constructionsite': require('target.constructionsite'),
            'damaged': require('target.damaged'),
            'dropoff': require('target.energy.dropoff'),            
            'mining': require('target.energy.mining'),
            'pickup': require('target.energy.pickup'),
            'withdraw': require('target.energy.withdraw'),
            'handoff': require('target.energy.handoff'),
            'injured': require('target.injured'),
            'fighter': require('target.fighter'),
            'spawn': require('target.spawn'), 
            'mineralstorage': require('target.mineralstorage'),
            'tower': require('target.tower'),
            'extractor': require('target.extractor')
        };        

        Memory.Config.Structure = {};
        Memory.Config.Structure.Roles = {
            'tower': require('structure.role.tower')
        };
    }
};

module.exports = config;
