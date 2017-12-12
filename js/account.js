/*===========================================================
=					Account																						=
===========================================================*/
Game.Account = {
	character: {
		name: 'Character',
		info: `
			<span class='fgrey f10'>
				Every time your character levels up, you will receive one random Mastery Lv<br>
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
			<span class='fgrey f10'>
				Achievements indicate a milestone that you have reached. Unlocking
				all of the achievements in the same category also gives you a permanentl
				boost to your stats.
			</span>
		`,
		misc: `Unlocked: <span class='fwhite f16' id='charAch'></span>`,
		unlocked: 0,
		onclick: 'openModal("achievements")'
	},
	masteries: {
		name: 'Masteries',
		info: `
			<span class='fgrey f10'>
				Masteries are split into four categories:<br>
				- <span class='fgreen f12'>Common</span><br>
				- <span class='fblue f12'>Rare</span><br>
				- <span class='fpurple f12'>Epic</span><br>
				- <span class='forange f12'>Legendary</span><br>
				Unlock them to permanently increase your stats.
			</span>
		`,
		misc: `Unlocked: <span class='fwhite' id='charMast'></span>`,
		unlocked: 0,
		onclick: 'openModal("masteries")'
	}
}
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
	let achievements = Game.Account.achievements;
	let xpReq = Math.floor(30 * Math.pow(1.5, character.lv));
	character.xpReq = xpReq;
	let widthChar = character.xp / character.xpReq * 100;
	let widthAch = achievements.unlocked * 100 / 80;
	let widthMas = masteries.unlocked * 100 / 188;

	progressBar(character.lv, 'character', widthChar);
	progressBar(achievements.unlocked, 'achievements', widthAch);
	progressBar('', 'masteries', widthMas);

  elem('charXp').innerHTML = nFormat(character.xp) + ' / ' + nFormat(character.xpReq);
	elem('charAch').innerHTML = achievements.unlocked + ' / ' + 80;

	for(key in Game.total) {
    elem(key + 'Total').innerHTML = nFormat(Game.total[key]);
  }
}
