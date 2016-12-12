var config = {

    init: function(){
    	Memory.Config.Spawn = {};
        Memory.Config.Spawn.Roles = {
            'renew': require('spawn.role.renew'),
            'autospawn': require('spawn.role.autospawn')
        }

        Memory.Config.ControllerSize = {};
        Memory.Config.ControllerSize[0] = {};
        Memory.Config.ControllerSize[1] = {
        	MAX_HARVESTERS : 3,
        	MAX_UPGRADER : 3,
        	MAX_REMOTEHARVESTER : 0, // this is per remote room.
        	MAX_TOWER_FILLER : 0,
        	MAX_BUILDERS : 2,
        	MAX_REPAIR : 2,
        	MAX_MELEE : 0,
        	MAX_RANGED : 0,
        	MAX_HEAL : 0,
        	MAX_EXTRACTOR: 0,
        	// There will always be exactly one reserver per room: MAX_RESERVER :0,
        	       
        	BUILD_EXTRACTOR : [WORK, CARRY, MOVE],
			COST_EXTRACTOR : 200,
        
			BUILD_RESERVER : [CLAIM, MOVE],
			COST_RESERVER : 660,

			BUILD_UPGRADER : [CARRY, MOVE, WORK, MOVE],
			COST_UPGRADER : 250,

			BUILD_HARVESTER : [WORK, MOVE, CARRY, MOVE],
			COST_HARVESTER : 250,

			BUILD_REMOTEHARVESTER : [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
			COST_REMOTEHARVESTER : 600,

			BUILD_MELEE : [TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE],
			COST_MELEE : 420,

			BUILD_RANGED : [RANGED_ATTACK, MOVE],
			COST_RANGED : 210,

			BUILD_HEAL : [HEAL, MOVE],
			COST_HEAL : 300,

			SPAWN_BUFFER: 0
		};

		Memory.Config.ControllerSize[2] = Memory.Config.ControllerSize[1];

		Memory.Config.ControllerSize[3] = {
        	MAX_HARVESTERS : 2,
        	MAX_UPGRADER : 2,
        	MAX_REMOTEHARVESTER : 3, // this is per remote room
        	MAX_TOWER_FILLER : 1,
        	MAX_BUILDERS : 3,
        	MAX_REPAIR : 1,
        	MAX_MELEE : 0,
        	MAX_RANGED : 0,
        	MAX_HEAL : 0,
        	MAX_EXTRACTOR: 0,
        	// There will always be exactly one reserver per room: MAX_RESERVER :0,

        
			BUILD_RESERVER : [CLAIM, MOVE],
			COST_RESERVER : 660,

			BUILD_UPGRADER : [CARRY, CARRY, CARRY, WORK, MOVE, MOVE],
			COST_UPGRADER : 350,

			BUILD_HARVESTER : [WORK, WORK, WORK, CARRY, MOVE, MOVE],
			COST_HARVESTER : 450,

			BUILD_REMOTEHARVESTER : [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
			COST_REMOTEHARVESTER : 600,

			BUILD_EXTRACTOR : [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
			COST_EXTRACTOR : 700,

			BUILD_MELEE : [ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE],
			COST_MELEE : 390,

			BUILD_RANGED : [RANGED_ATTACK, MOVE],
			COST_RANGED : 210,

			BUILD_HEAL : [HEAL, MOVE],
			COST_HEAL : 300,

			SPAWN_BUFFER: 200
		};

		Memory.Config.ControllerSize[4] = Memory.Config.ControllerSize[3];
		Memory.Config.ControllerSize[5] = Memory.Config.ControllerSize[3];
		Memory.Config.ControllerSize[6] = Memory.Config.ControllerSize[3];
		Memory.Config.ControllerSize[6].SPAWN_BUFFER = 500;
		Memory.Config.ControllerSize[6].MAX_EXTRACTOR = 1;

		Memory.Config.ControllerSize[7] = Memory.Config.ControllerSize[3];
		Memory.Config.ControllerSize[8] = Memory.Config.ControllerSize[3];
	}
};

module.exports = config;    	