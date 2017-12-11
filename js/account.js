/*===========================================================
=					Account																						=
===========================================================*/
Game.Account = {
	character: {
		name: 'Character',
		info: `
			<span class='fgrey f10'>
				Every time you level up you have a chance of receiving multiple Chests:<br/>
				- <span class='fgreen f12'>Common</span><br>
				- <span class='fblue f12'>Rare</span><br>
				- <span class='fpurple f12'>Epic</span><br>
				- <span class='forange f12'>Legendary</span><br>
				Open them to collect corresponding <span class='fwhite'>Masteries</span> and various other rewards
			</span>
		`,
		misc: `XP: <span class='fwhite f16' id='charXp'></span>`,
		onclick: 'openModal("character")',
		lv: 0,
		xp: 0,
		xpReq: 30,
		dps: 0,
		dpc: 0,
		increment: 0,
		critChance: 0,
		critHit: false,
		armorPen: 0,
		achievements: 0,
		total: {
			clicks: 0,
			critHits: 0,
	    titanium: 0,
			plutonium: 0,
			chrysonite: 0,
			armadium: 0,
	    solanium: 0,
	    hawkingradiation: 0,
			antiMatter: 0,
			frostCrystal: 0
	  }
	},
	achievements: {
		name: 'Achievements',
		info: `
			<span class='fgrey f10'>Unlock all achievements to beat the game. Achievements are split into four groups<br>
			Common, Rare, Epic and Legendary. Unlocking certain number if achievements gives permanent boosts</span>
		`,
		misc: `Unlocked: <span class='fwhite' id='achievementsTotal'></span>`,
		onclick: 'openModal("achievements")'
	},
	masteries: {
		name: 'Masteries',
		info: `
			<span class='fgrey f10'>Open chests to unlock random masteries. Masteries give a powerfull boost to your progression</span>
		`,
		misc: `Unlocked: <span class='fwhite' id='masteriesTotal'></span>`,
		unlocked: 0,
		onclick: 'openModal("masteries")'
	}
};
/*===========================================================
=					Generate Account																	=
===========================================================*/
function generateAccount() {
	for(key in Game.Account) {
		let acc = Game.Account[key];
		let name = Game.Account[key].name;
    let info = Game.Account[key].info;
		let misc = Game.Account[key].misc;

		let content = `
	    <div class='item' id='${key}' onclick='${acc.onclick}'>
	      <img src='img/character/${key}.png'/>
	      <div class='tooltip item-tooltip'>
					<div class='tooltip-lv'>
						<img class='hidden' src='img/character/${key}.png'/ id='${key}Canvas'>
						<canvas id='${key}Bar' width='64' height='64'></canvas>
					</div>
	        <div class='tooltip-content fgrey'>
						<span class='fwhite'>${name}</span><hr/>
						${misc}<hr/>
						${info}
					</div>
	      </div>
	    </div>
	  `;

		elem('accountItems').innerHTML += content;
	}
}
/*===========================================================
=					Update Account																		=
===========================================================*/
function updateAccount() {
	let character = Game.Account.character;
	let masteries = Game.Account.masteries;
	let xpReq = Math.floor(30 * Math.pow(1.5, character.lv));
	character.xpReq = xpReq;
	let widthChar = character.xp / character.xpReq * 100;
	let widthAch = character.total.achievements * 100 / 40;
	let widthMas = masteries.unlocked * 100 / 188;

	progressBar(character.lv, 'character', widthChar);
	progressBar('', 'achievements', widthAch);
	progressBar('', 'masteries', widthMas);
  //elem('charXp').innerHTML = nFormat(character.xp) + ' / ' + nFormat(character.xpReq);

	for(key in Game.total) {
    elem(key + 'Total').innerHTML = nFormat(Game.total[key]);
  }
}
