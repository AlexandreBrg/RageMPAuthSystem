var Logs = require('../modules/logs');
var DB = require('../modules/db');
var Players = require('../modules/players');

function hashPassword(str) {
    const cipher = crypto.createCipher('aes192', 'a pass');
	let encrypted = cipher.update(str, 'utf8', 'hex'); 
    encrypted += cipher.final('hex');
    return encrypted;
}

function showSuccess(player) {
    const str = "showSuccess();";
    player.call("cInjectCef", [str]);
}

function showError(player) {
    let str = "showError();";
    if (player.name === "WeirdNewbie") str += "showDefNameError();"
    player.call("cInjectCef", [str]);
}

module.exports = {
    'sTryLogin' : (player, pass, email) => {
        const hash = hashPassword(pass);
		if (hash !== player.password) {
            Logs.Insert(`${player.name} entered wrong password!`);
            return showError(player);
        }
        if (email !== player.email) {
            Logs.Insert(player.name + "entered wrong email!");
            return showError(player);
        }
        showSuccess(player);           
        Players.CreatePlayerClass(player.sqlid, player.name);        
        setTimeout(function() {
            Logs.Insert("Player " + player.name + " logged in.");
            player.call("cCloseCefAndDestroyCam");
        }, 2000);
    }
}