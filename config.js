//Game.rooms['W58S79'].createFlag(48,29,"Return", COLOR_GREEN);

var config = {

    init: function(){
        Memory.Config = {};

        Memory.Config.ALLOW_HANDOFF = false;

        Memory.Config.ReturnFlagName = 'Return';
        Memory.Config.HealerRallyFlagName = 'Rally2';
        Memory.Config.MeleeRallyFlagName = 'Rally2';
        Memory.Config.RangedRallyFlagName = 'Rally';
        Memory.Config.HidingFlagName = 'Hiding';
        Memory.Config.remoteroom = 'W58S79';
        Memory.Config.baseroom = 'W57S79';
        Memory.Config.primaryspawn = 'EliTown';

        Memory.Config.RENEW_COMPLETE = 1100;
        Memory.Config.MIN_TICKSTOLIVE = 250;
        Memory.Config.MAX_RENEW_COUNT = 2;

        Memory.Config.MIN_ENERGY_HANDOFF = 50;

        Memory.Config.MIN_DAMAGE_TO_REPAIR = 1000;
        Memory.Config.MIN_WALL_HP = 500000;
        Memory.Config.TOWER_RESERVE_ENERGY = 700;
        Memory.Config.MIN_TOWER_FILL = 70;

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
            'tower': require('creep.role.towerfiller')
        }

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
            'renew': require('creep.action.renew'), 
            'dropoff': require('creep.action.dropoff')            
        };

        Memory.Config.TargetSelectors = {
            'constructionsite': require('target.constructionsite'),
            'hostile': require('target.hostile'),
            'damaged': require('target.damaged'),
            'dropoff': require('target.energy.dropoff'),            
            'mining': require('target.energy.mining'),
            'pickup': require('target.energy.pickup'),
            'withdraw': require('target.energy.withdraw'),
            'handoff': require('target.energy.handoff'),
            'injured': require('target.injured'),
            'fighter': require('target.fighter'),
            'spawn': require('target.spawn'),
            'tower': require('target.tower')
        }; 

        Memory.Config.Spawn = {};
        Memory.Config.Spawn.Roles = {
            'renew': require('spawn.role.renew'),
            'autospawn': require('spawn.role.autospawn')
        }

        Memory.Config.Structure = {};
        Memory.Config.Structure.Roles = {
            'tower': require('structure.role.tower')
        }
    },

    calculations: function() {
        Memory.Config.Census = {};
        for (var roleName in Memory.Config.Role) {
            var matches = _.filter(Game.creeps, (creep) => (creep.memory.role == roleName));
            Memory.Config.Census[roleName] = matches;
        }
        Memory.Config.FighterCount = Memory.Config.Census['melee'].length + Memory.Config.Census['ranged'].length;


        Memory.Config.baseController = Game.rooms[Memory.Config.baseroom].controller;

        var exitDir = Game.rooms[Memory.Config.baseroom].findExitTo(Memory.Config.remoteroom);
        Memory.Config.baseExit = Game.rooms[Memory.Config.baseroom].controller.pos.findClosestByRange(exitDir);

        var returnFlag = Game.flags[Memory.Config.ReturnFlagName];
        if (returnFlag) {
            Memory.Config.ReturnFlag = returnFlag;
            if (returnFlag.room) { Memory.Config.baseExit = returnFlag; }
        } else {
            Memory.Config.ReturnFlag = null;
        }

        var hidingFlag = Game.flags[Memory.Config.HidingFlagName];
        if (hidingFlag) {
            Memory.Config.HidingFlag = hidingFlag;
        } else {
            Memory.Config.HidingFlag = Memory.Config.baseController;
        }

        Memory.Config.any_hostile = false;
        Memory.Config.has_injured = false;

        Memory.Config.MyRooms = {};
        for (var roomname in Game.rooms) {
            var room = Game.rooms[roomname];            
            Memory.Config.MyRooms[roomname] = {};

            // Construction Sites
            var selector = Memory.Config.TargetSelectors['constructionsite'];            
            Memory.Config.MyRooms[roomname].constructionsite = selector.select(room);

            // Damaged Buildings
            selector = Memory.Config.TargetSelectors['damaged'];            
            Memory.Config.MyRooms[roomname].damaged = selector.select(room);

            // Hostiles
            selector = Memory.Config.TargetSelectors['hostile'];
            var has_hostile = selector.select_room(room);
            Memory.Config.MyRooms[roomname].has_hostile = has_hostile;
            if (has_hostile) { 
                Memory.Config.any_hostile = true; 
                Game.notify('Hostile Detected in room: ' + roomname, 20);
            }

            // Injured
            selector = Memory.Config.TargetSelectors['injured'];
            var has_injured = selector.select_room(room);
            Memory.Config.MyRooms[roomname].has_injured = has_injured;
            if (has_injured) { 
                Memory.Config.has_injured = true;                 
            }
        }      

    },

    run: function() {
        // TODO: only init once.
         //if( ! Memory.Config )
             this.init(); 
         this.calculations();
     }
 };

 module.exports = config;
