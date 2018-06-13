var DB = require('./db');

var PlayersOnline = [];

var Player = function(sqlID, name, email) {
    this.sqlID = sqlID;
    this.name = name;
    this.email = email;
    this.ID = FindEmptySlot();
}

function FindEmptySlot () {
    for ( var i = 0; i < global.MAX_PLAYERS; i++ ) {
        if ( !IsPlayerLogged(i) ) return i;   
    }
}

module.exports.CreatePlayerClass = function(sqlid, name) {
    var playa = new Player(sqlid, name);
    PlayersOnline [ playa.ID ] = playa;
    
    return playa.ID;
}

module.exports.DeletePlayerClass = function(id) {
    delete PlayersOnline[id];
}

module.exports.GetPlayerIDBySQLID = function(sqlid) {
    for ( var i = 0; i < global.MAX_PLAYERS; i++ ) {
        if (  IsPlayerLogged(i) ) {
            if ( PlayersOnline [ i ].sqlID == sqlid ) return i;
        }
    }    
}

function IsPlayerLogged(id) {
    return ( typeof PlayersOnline[id] !== 'undefined' );
}
        
module.exports.IsPlayerLogged = IsPlayerLogged;

module.exports.Init = function() {
    DB.Handle.query(`CREATE TABLE IF NOT EXISTS 'server_players' (
        'id' int(11) NOT NULL,
        'name' varchar(24) NOT NULL UNIQUE,
        'email' varchar(156) NOT NULL UNIQUE,
        'password' varchar(128) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`, function() { } );
    DB.Handle.query("ALTER TABLE `server_players` ADD PRIMARY KEY (`id`);", function() { } );
    DB.Handle.query("ALTER TABLE `server_players` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;", function() { } );
}
