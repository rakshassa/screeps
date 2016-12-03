
var config = require('config');
var cleanup = require('cleanup');

var creepExtensions = require('creep.extensions');
var spawnExtensions = require('spawn.extensions');
var structExtensions = require('structure.extensions');

module.exports.loop = function () {
    config.run(); 

    creepExtensions.extend();
    spawnExtensions.extend();
    structExtensions.extend();

       
    cleanup.run();

    Spawn.loop();
    Structure.loop();
    Creep.loop();

}