//Game.rooms['W58S79'].createFlag(48,29,"Return", COLOR_GREEN);

var config = {

    init: function(){
        Memory.Config = {};
        
        //Memory.Config.takeoverRoom = 'W58S78'; // uncomment to attack the specified room
        Memory.Config.prepareTakeover = false;

        Memory.Config.CONSUME_CONTAINERS = false; // true - use energy, false - dropoff energy
        Memory.Config.ALLOW_HANDOFF = true; // true - harvesters handoff, false - harvesters keep

        //Memory.Config.ReturnFlagName = 'Return';
        Memory.Config.HealerRallyFlagName = 'Rally2';
        Memory.Config.MeleeRallyFlagName = 'Rally2';
        Memory.Config.RangedRallyFlagName = 'Rally';
        Memory.Config.HidingFlagName = 'Hiding';
        
        Memory.Config.baseroom = 'W8N3';
        Memory.Config.primaryspawn = 'EliTown';
        Memory.Config.reserverooms = {
            'W8N3': [ ]
        }
        Memory.Config.remoteharvestrooms = {
            'W8N3': [ 'W8N2']
        }

        // If my reservation is already past this value, then don't make a new reserver yet.
        Memory.Config.MIN_RESERVE_TICKS = 1000;

        // When should creeps leave spawn after renew.
        Memory.Config.RENEW_COMPLETE = 1200;
        // When should creeps run back to spawn for renew
        Memory.Config.MIN_TICKSTOLIVE = 250;
        Memory.Config.MIN_FIGHTER_TICKSTOLIVE = 800;
        // Max number of creeps to renew simultaeously.
        Memory.Config.MAX_RENEW_COUNT = 2;
        // Amount below max energy to use when calculating creep sizes for autospawn.
        Memory.Config.SPAWN_BUFFER = 50; 

        Memory.Config.MIN_ENERGY_HANDOFF = 50;

        Memory.Config.MIN_DAMAGE_TO_REPAIR = 1000;
        Memory.Config.MIN_WALL_HP = 500000;
        Memory.Config.TOWER_RESERVE_ENERGY = 700;
        Memory.Config.MIN_TOWER_FILL = 70;

        require('config.jobs').init();
        require('config.spawn').init();
    },

    calculations: function() {
        Memory.Config.Census = {};
        Memory.Config.FighterCount = 0;
        for (var roomName in Game.rooms) {
            Memory.Config.Census[roomName] = {}
            for (var roleName in Memory.Config.Role) {
                var matches = _.filter(Game.creeps, 
                    (creep) => ((creep.memory.role == roleName) && (creep.memory.homeRoom == roomName)));
                Memory.Config.Census[roomName][roleName] = matches;
            }
            Memory.Config.FighterCount += Memory.Config.Census[roomName]['melee'].length + Memory.Config.Census[roomName]['ranged'].length;
        }
        

        Memory.Config.baseController = Game.rooms[Memory.Config.baseroom].controller;

        
        // var returnFlag = Game.flags[Memory.Config.ReturnFlagName];
        // if (returnFlag) {
        //     Memory.Config.ReturnFlag = returnFlag;
        //     //if (returnFlag.room) { Memory.Config.baseExit = returnFlag; }
        // } else {
        //     Memory.Config.ReturnFlag = null;
        // }

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
                //console.log('Hostile Detected in room: ' + roomname);
                Memory.Config.any_hostile = true; 
                //Game.notify('Hostile Detected in room: ' + roomname, 20);
            }

            selector = Memory.Config.TargetSelectors['hostilestructure'];
            var has_hostilestructure = selector.select_room(room);
            Memory.Config.MyRooms[roomname].has_hostilestructure = has_hostilestructure;
            
            // Injured
            selector = Memory.Config.TargetSelectors['injured'];
            var has_injured = selector.select_room(room);
            Memory.Config.MyRooms[roomname].has_injured = has_injured;
            if (has_injured) { 
                Memory.Config.has_injured = true;                 
            }

            var reservers = _.filter(Game.creeps, 
                    (creep) => ((creep.memory.role == 'reserver') && (creep.memory.reserveroom == roomname)));
            if (reservers.length > 0) {
                Memory.Config.MyRooms[roomname].has_reserver = true;
            } else { Memory.Config.MyRooms[roomname].has_reserver = false; }
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


//for (var creepName in Game.creeps) { creep = Game.creeps[creepName]; if (creep.memory.roleName == 'remoteharvester') {creep.memory.remoteharvestroom = 'W57S79'; }}