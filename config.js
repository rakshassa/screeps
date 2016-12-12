//Game.rooms['W58S79'].createFlag(48,29,"Return", COLOR_GREEN);

var config = {

    init: function(){
        Memory.Config = {};
        
        //Memory.Config.takeoverRoom = 'W58S78'; // uncomment to attack the specified room
        Memory.Config.prepareTakeover = false; // true - renew all fighters. false - don't renew them.

        Memory.Config.CONSUME_CONTAINERS = false; // true - use energy, false - dropoff energy
        Memory.Config.ALLOW_HANDOFF = false; // true - harvesters handoff, false - harvesters keep
        Memory.Config.ALLOW_RENEW = true; // true - creeps will go to a spawn for renew when they get low on ticks. (false ignores renew)
        
        // The name of the flags where you want your fighters to rally.
        Memory.Config.HealerRallyFlagName = 'Rally2';
        Memory.Config.MeleeRallyFlagName = 'Rally2';
        Memory.Config.RangedRallyFlagName = 'Rally';

        // The name of the flag where you want your creeps to hide when we get attacked.
        Memory.Config.HidingFlagName = 'Hiding';
        
        // The name of your most fortified spawn - used as a default hiding area when everything else is dying.        
        Memory.Config.primaryspawn = 'EliTown';

        // The list of rooms to be reserved - and which room to create the reserver from. (source: destination)
        Memory.Config.reserverooms = {
            'W57S79': [ 'W58S79']
        }
        // the list of rooms to farm that you do not own (source: destination)
        Memory.Config.remoteharvestrooms = {
            'W57S79': ['W58S79'],
            'W58S78': ['W59S78']
        }
        // the list of rooms to extract minerals from (source: destination)
        // You must list your own rooms, too.
        // NOTE: you need an extractor to harvest minerals - so you can't just harvest every nearby room.
        Memory.Config.extractrooms = {
            'W57S79': ['W57S79']
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
        // Only perform a handoff if you have at least this much energy and the receiver has at least this much room.
        Memory.Config.MIN_ENERGY_HANDOFF = 50;
        // Don't repair a structure unless it needs at least this many HP.
        Memory.Config.MIN_DAMAGE_TO_REPAIR = 1000;
        // Keep Walls (and ramparts) at this many HP
        Memory.Config.MIN_WALL_HP = 150000;
        // Use tower to repair things only when it has at least this much energy
        Memory.Config.TOWER_RESERVE_ENERGY = 700;
        // Only put energy into a tower if it needs at least 70 energy to get full.
        Memory.Config.MIN_TOWER_FILL = 70;
        // leave this much space for energy in the terminal - the rest can be minerals.
        Memory.Config.TERMINAL_RESERVE_ENERGY = 100000;

        require('config.jobs').init();
        require('config.spawn').init();
        require('config.market').init();
        require('config.pathing').init();

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

        var hidingFlag = Game.flags[Memory.Config.HidingFlagName];
        if (hidingFlag) {
            Memory.Config.HidingFlag = hidingFlag;
        } else {
            Memory.Config.HidingFlag = Game.spawns[Memory.Config.primaryspawn].room.controller;
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