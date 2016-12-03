var mod = {
    extend: function(){ 
		Structure.loop = function() {
            for (var structId in Game.structures) {
                var structure = Game.structures[structId];
                if(structure.structureType == STRUCTURE_TOWER) {
                    Memory.Config.Structure.Roles['tower'].run(structure);
                }
            }
        };
    }
}

module.exports = mod;