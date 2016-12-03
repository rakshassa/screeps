var MAX_HARVESTERS = 1;
var MAX_UPGRADER = 4;
var MAX_REMOTEHARVESTER =  5;
var MAX_TOWER_FILLER = 1;
var MAX_BUILDERS = 2;
var MAX_REPAIR = 1;

var MAX_MELEE = 1;
var MAX_RANGED = 1;
var MAX_HEAL = 0;

var MAX_RESERVER = 1;

var BUILD_RESERVER = [CLAIM, MOVE];
var COST_RESERVER = 660;

var BUILD_UPGRADER = [CARRY, CARRY, CARRY, WORK, MOVE, MOVE];
var COST_UPGRADER = 350;

var BUILD_HARVESTER = [WORK, WORK, WORK, CARRY, MOVE, MOVE];
var COST_HARVESTER = 450;

var BUILD_REMOTEHARVESTER = [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
var COST_REMOTEHARVESTER = 700;

var BUILD_MELEE = [TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE];
var COST_MELEE = 420;

var BUILD_RANGED = [RANGED_ATTACK, MOVE];
var COST_RANGED = 210;

var BUILD_HEAL = [HEAL, MOVE];
var COST_HEAL = 300;


global.getCreepWithRole = function(roleName, room) {
    if (roleName == 'remoteharvester' || roleName == 'healer' || roleName == 'melee' || roleName == 'ranged' || roleName == 'reserver') {
        var matches = _.filter(Game.creeps, (creep) => (creep.memory.role == roleName));
        return matches;
    } else {
        var matches = _.filter(Game.creeps, (creep) => (creep.memory.role == roleName && creep.room == room));
        return matches;
    }
}

global.calculateParts = function(room, build, cost) {
    
    var body = [];
    
    count = Math.floor(room.energyCapacityAvailable / cost);
    
    if (count == 0) { return ['FAIL']; }
    if (room.energyAvailable < (count * cost)) { 
        return []; 
    }
    
    for (let i=0; i < count; i++) {
        body.push.apply(body, build);
    }
    return body;
}

global.autospawn = function(roleName, spawn, max, build, cost) {
	if (max == 0) { return false; }
	
    var found = getCreepWithRole(roleName, spawn.room);
    var hurry = false;
    
    if ((roleName == 'harvester' || roleName == 'upgrader' || roleName == 'builder') && (found.length == 0)) {
        if (spawn.room.energyAvailable < cost) {
            if (roleName == 'harvester') {
                console.log("No Harvesters and insufficient energy");
                
                found = getCreepWithRole('upgrader', spawn.room);
                if (found.length > 0) {
                    for(var i in found) {
                        target = found[i];
                        target.memory.role = 'harvester'
                    }
                }
                
                found = getCreepWithRole('builder', spawn.room);
                if (found.length > 0) {
                    for(var i in found) {
                        target = found[i];
                        target.memory.role = 'harvester'
                    }
                }
                found = getCreepWithRole('repair', spawn.room);
                if (found.length > 0) {
                    for(var i in found) {
                        target = found[i];
                        target.memory.role = 'harvester'
                    }
                }
                
                return true;
            }
        } else {
            hurry = true;
        }
    }

    if(found.length < max) {
        var parts = calculateParts(spawn.room, build, cost);
        if (parts.length > 1) { console.log('Parts: ' + parts.length + ":" + parts.toString());} 
        
        if (hurry) {
            console.log('Hurrying');
            parts = [WORK, CARRY, MOVE];
        }
        if (parts.length == 1) { 
            return false; 
        }
        if (parts.length == 0) {
            return true;
        }

        var newName = spawn.createCreep(parts, undefined, {role: roleName});
        
        if (typeof newName == "string") {
            console.log('Spawning new ' + roleName + ': ' + newName + " in room: " + spawn.room.name);
            return true;
        } else {
            console.log("Attempted to spawn " + roleName + " but error code: " + newName);
        }
    }
    return false;
}

var roleAutoSpawn = {
    

    run: function(spawn) {
        
        if (spawn.spawning != null) { return true; }
        
        if (autospawn('harvester', spawn, 1, BUILD_HARVESTER, COST_HARVESTER)) { return true; }
        if (autospawn('upgrader', spawn, 1, BUILD_UPGRADER, COST_UPGRADER)) { return true; }
        if (autospawn('repair', spawn, 1, BUILD_HARVESTER, COST_HARVESTER)) { return true; }

        if (autospawn('harvester', spawn, MAX_HARVESTERS, BUILD_HARVESTER, COST_HARVESTER)) { return true; }
        if (autospawn('remoteharvester', spawn, MAX_REMOTEHARVESTER, BUILD_REMOTEHARVESTER, COST_REMOTEHARVESTER)) { return true; }
        if (autospawn('upgrader', spawn, MAX_UPGRADER, BUILD_UPGRADER, COST_UPGRADER)) { return true; }
        if (autospawn('tower', spawn, MAX_TOWER_FILLER, BUILD_UPGRADER, COST_UPGRADER)) { return true; }
	    if (autospawn('builder', spawn, MAX_BUILDERS, BUILD_UPGRADER, COST_UPGRADER)) { return true; }
	    if (autospawn('melee', spawn, MAX_MELEE, BUILD_MELEE, COST_MELEE)) { return true; }
	    if (autospawn('repair', spawn, MAX_REPAIR, BUILD_UPGRADER, COST_UPGRADER)) { return true; }
	    if (autospawn('ranged', spawn, MAX_RANGED, BUILD_RANGED, COST_RANGED)) { return true; }
	    if (autospawn('healer', spawn, MAX_HEAL, BUILD_HEAL, COST_HEAL)) { return true; }
        if (autospawn('reserver', spawn, MAX_RESERVER, BUILD_RESERVER, COST_RESERVER)) { return true; }	    
    }

};

module.exports = roleAutoSpawn;