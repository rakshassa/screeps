
global.getCreepWithRole = function(roleName, room) {
    return Memory.Config.Census[room.name][roleName];
}

global.calculateParts = function(room, build, cost, max_multiples) {
    
    var body = [];    
    var spawnBuffer = Memory.Config.ControllerSize[room.controller.level].SPAWN_BUFFER;
    
    count = Math.floor((room.energyCapacityAvailable-spawnBuffer) / cost);
    if (count > max_multiples) { count = max_multiples; }

    if (count == 0) { return ['FAIL']; }
    if (room.energyAvailable < (count * cost)) { 
        return []; 
    }
    
    for (let i=0; i < count; i++) {
        body.push.apply(body, build);
    }
    return body;
}

global.calcReserveRoom = function(targetRoomName) {
    
    if (!Memory.Config.reserverooms || !Memory.Config.reserverooms[targetRoomName]) { return null; }
    var arrayLength = Memory.Config.reserverooms[targetRoomName].length;
    for (var i = 0; i < arrayLength; i++) {
        var roomName = Memory.Config.reserverooms[targetRoomName][i];
        if (Memory.Config.MyRooms[roomName]) {
            if (!(Memory.Config.MyRooms[roomName].has_reserver)) {
                if (!Game.rooms[roomName].controller.reservation ||
                    (Game.rooms[roomName].controller.reservation.ticksToEnd < Memory.Config.MIN_RESERVE_TICKS)) {                    
                    return roomName;
                }
            }
        } else {
            var reservers = _.filter(Game.creeps, 
                (creep) => ((creep.memory.role == 'reserver') && (creep.memory.reserveroom == roomName)));
            if (reservers.length == 0) {
                return roomName;
            }
        }
    }
    return null;   
}

global.calcRemoteHarvestRoom = function(targetRoomName, max) {

    if (!Memory.Config.remoteharvestrooms || 
        !Memory.Config.remoteharvestrooms[targetRoomName]) { return null; }

    var arrayLength = Memory.Config.remoteharvestrooms[targetRoomName].length;
    for (var i = 0; i < arrayLength; i++) {
        var roomName = Memory.Config.remoteharvestrooms[targetRoomName][i];        
        var remoteharvesters = _.filter(Game.creeps, 
            (creep) => ((creep.memory.role == 'remoteharvester') && (creep.memory.remoteharvestroom == roomName)));
        if (remoteharvesters.length < max) {
            return roomName;
        }        
    }
    return null;
}

global.calcExtractRoom = function(targetRoomName, max) {

    if (!Memory.Config.extractrooms || 
        !Memory.Config.extractrooms[targetRoomName]) { return null; }

    var arrayLength = Memory.Config.extractrooms[targetRoomName].length;
    for (var i = 0; i < arrayLength; i++) {
        var roomName = Memory.Config.extractrooms[targetRoomName][i];        
        var remoteharvesters = _.filter(Game.creeps, 
            (creep) => ((creep.memory.role == 'extractor') && (creep.memory.remoteharvestroom == roomName)));
        if (remoteharvesters.length < max) {
            return roomName;
        }        
    }
    return null;
}

global.autospawn = function(roleName, spawn, max, build, cost) {
	if (max == 0) { return false; }

    var reserveRoom = null;
           
    if (roleName == 'reserver') {
        reserveRoom = calcReserveRoom(spawn.room.name);
        if (reserveRoom == null) { return false; }
    }

    var remoteharvestroom = null;
    if (roleName == 'remoteharvester') {
        remoteharvestroom = calcRemoteHarvestRoom(spawn.room.name, max);        
        if (remoteharvestroom == null) { return false; }
    }

    if (roleName == 'extractor') {
        remoteharvestroom = calcExtractRoom(spawn.room.name, max);        
        if (remoteharvestroom == null) { return false; }
    }
	
    var found = getCreepWithRole(roleName, spawn.room);
    if (roleName != 'reserver' && roleName != 'remoteharvester' && found.length >= max) { return false; }

    var hurry = false;
    
    if ((roleName == 'harvester' || roleName == 'upgrader') && (found.length == 0)) {
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

    
    var max_multiples = 100;
    if (roleName == 'reserver') { max_multiples = 2; }
    if (roleName == 'extractor') { max_multiples = 2; }
    var parts = calculateParts(spawn.room, build, cost, max_multiples);    
    if (parts.length > 1) { console.log('role: ' + roleName + '-Parts: ' + parts.length + ":" + parts.toString());} 
    
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

    
    var startingMemory = {role: roleName, homeRoom: spawn.room.name};
    if (roleName == 'reserver') {
        startingMemory.reserveroom = reserveRoom;
    }
    if (roleName == 'remoteharvester' || roleName == 'extractor') {
        startingMemory.remoteharvestroom = remoteharvestroom;
    }      

    var newName = spawn.createCreep(parts, undefined, startingMemory);

    if (typeof newName == "string") {
        console.log('Spawning new ' + roleName + ': ' + newName + " in room: " + spawn.room.name);
        return true;
    } else {
        console.log("Attempted to spawn " + roleName + " but error code: " + newName);
    }
    
    return false;
}

var roleAutoSpawn = {
    

    run: function(spawn) {
        
        if (spawn.spawning != null) { return true; }

        var size = spawn.room.controller.level;
        var c = Memory.Config.ControllerSize[size];
        
        if (autospawn('harvester', spawn, 1, c.BUILD_HARVESTER, c.COST_HARVESTER)) { return true; }
        if (autospawn('upgrader', spawn, 1, c.BUILD_UPGRADER, c.COST_UPGRADER)) { return true; }
        if (autospawn('repair', spawn, 1, c.BUILD_HARVESTER, c.COST_HARVESTER)) { return true; }	    
        if (autospawn('harvester', spawn, c.MAX_HARVESTERS, c.BUILD_HARVESTER, c.COST_HARVESTER)) { return true; }
        if (autospawn('upgrader', spawn, c.MAX_UPGRADER, c.BUILD_UPGRADER, c.COST_UPGRADER)) { return true; }        
        if (autospawn('builder', spawn, c.MAX_BUILDERS, c.BUILD_UPGRADER, c.COST_UPGRADER)) { return true; }
        if (autospawn('repair', spawn, c.MAX_REPAIR, c.BUILD_UPGRADER, c.COST_UPGRADER)) { return true; }
        if (autospawn('extractor', spawn, c.MAX_EXTRACTOR, c.BUILD_EXTRACTOR, c.COST_EXTRACTOR)) { return true; }
        if (autospawn('remoteharvester', spawn, c.MAX_REMOTEHARVESTER, c.BUILD_REMOTEHARVESTER, c.COST_REMOTEHARVESTER)) { return true; }        
        if (autospawn('tower', spawn, c.MAX_TOWER_FILLER, c.BUILD_UPGRADER, c.COST_UPGRADER)) { return true; }
        if (autospawn('reserver', spawn, 1,c.BUILD_RESERVER, c.COST_RESERVER)) { return true; } 
        if (autospawn('melee', spawn, c.MAX_MELEE, c.BUILD_MELEE, c.COST_MELEE)) { return true; }       
        if (autospawn('ranged', spawn, c.MAX_RANGED, c.BUILD_RANGED, c.COST_RANGED)) { return true; }
        if (autospawn('healer', spawn, c.MAX_HEAL, c.BUILD_HEAL, c.COST_HEAL)) { return true; }
        
    }

};

module.exports = roleAutoSpawn;