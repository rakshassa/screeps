//Game.rooms['W58S79'].createFlag(48,29,"Return", COLOR_GREEN);

// Use this config to setup optimized exits between rooms.
// The first room name is the source room, and the second room name is the destination room.
// The value is the name of a flag you manually created within 1 square of an exit.

var config = {

	
    init: function(){
    	Memory.Config.Pathing = {
            'W58S78': {
            	'W59S78': 'Exit'
            },
            'W59S78': {
            	'W58S78': 'Exit2'
            },
            'W57S79': {
            	'W58S79': 'Leave'
            },
            'W58S79': {
            	'W57S79': 'Return'
            }
        };
	}
};

module.exports = config;

