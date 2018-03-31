/*===========================================================
=					Account																						=
===========================================================*/
Game.Account = {
	character: {
		name: 'Character',
		info: `
			<div class='fgrey f10'>
				Time Played: <span class='fwhite f12' id='timePlayed'></span><br/>
				Total Clicks: <span class='fwhite f12' id='clicksTotal'></span><br/>
				Total Critical Hits: <span class='fwhite f12' id='critHitsTotal'></span><br/>
				Total Titanium: <span class='fwhite f12' id='titaniumTotal'></span><br/>
				Total Plutonium: <span class='fwhite f12' id='plutoniumTotal'></span><br/>
				Total Chrysonite: <span class='fwhite f12' id='chrysoniteTotal'></span><br/>
				Total Armadium: <span class='fwhite f12' id='armadiumTotal'></span><br/>
				Total Solanium: <span class='fwhite f12' id='solaniumTotal'></span><br/>
				Total Singularity: <span class='fwhite f12' id='hawkingradiationTotal'></span><br/>
				Total Anti Matter: <span class='fwhite f12' id='antiMatterTotal'></span><br/>
				Total Frost Crystal: <span class='fwhite f12' id='frostCrystalTotal'></span>
			</div>
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
	    <div class='sidebar-item' id='${key}'>
	      <img src='img/character/${key}.png' onclick='${acc.onclick}'/>
	      <div class='tooltip stat-tooltip'>
					<div class='tooltip-lv'>
						<canvas id='${key}Bar' width='64' height='64'></canvas>
					</div>
	        <div class='tooltip-content fgrey'>
						<span class='fwhite'>${name}</span><br>
						${misc}<hr/>
						${info}
					</div>
	      </div>
	    </div>
	  `;

		elem('accountBoxes').innerHTML += content;
	}
}

Game.Donate = {
	bitcoin: {
		name: 'Donate Bitcoin',
		addr: '1CqcXyy56y69HMuCrxKm9mi2Nr8PA7CCjN'
	},
	ethereum: {
		name: 'Donate Ethereum',
		addr: '0x819BAD37E98c5Ba3bFDc53391C35384D27Cf1aFE'
	},
	litecoin: {
		name: 'Donate Litecoin',
		addr: 'LTd9CvqSpzb84oXBAEq1VdCchCoA772YKp'
	}
}

function generateDonate() {
	for(key in Game.Donate) {
		let name = Game.Donate[key].name;
		let addr = Game.Donate[key].addr;

		let content = `
			<div class='sidebar-item'>
				<img src='img/donate/${key}.png' onclick='setClipboard("${addr}")'/>
				<div class='tooltip stat-tooltip'>
					<div class='tooltip-content'>
						<span class='fwhite f12'>${name}</span><hr>
						<span class='fgrey f10'>Click on the image to get my address copied to your clipboard</span><br>
						<span class='fwhite f16'>Thank You!</span>
					</div>
				</div>
			</div>
		`;

		elem('donateBoxes').innerHTML += content;
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

	for(key in Game.Account.character.total) {
    elem(key + 'Total').innerHTML = nFormat(Game.Account.character.total[key]);
  }
	elem('frostCrystalTotal').innerHTML = Game.Account.character.total.frostCrystal.toFixed(3);
}
