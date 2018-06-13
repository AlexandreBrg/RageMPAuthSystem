var Logs = require('../modules/logs');
var DB = require('../modules/db');


function showLoginCef(player) {
    player.call("cLoginUI");
}

function showRegisterCef(player) {
    player.call("cRegisterUI");
}

module.exports =
{
	"playerJoin" : player =>
	{
        player.admin = 0;

        Logs.Insert("Player " + player.name + " (" + player.ip + ") connected on server");

        player.dimension = 1001;
        player.spawn(new mp.Vector3(3222, 5376, 20));

        console.log("Player: " + player.name + " is now connected");

        DB.Handle.query("SELECT id,name, password, email FROM server_players WHERE name = ? LIMIT 1", player.name, function(e, result) {
            if ( result[0]) {                
                player.password = result[0]['password'];
                player.email = result[0]['email'];
                player.sqlid = result[0]['id'];             
                showLoginCef(player); 
            } else { showRegisterCef(player);  }
            
        });
	}
}