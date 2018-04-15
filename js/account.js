/*===========================================================
=					Account																						=
===========================================================*/
Game.Account = {
	character: {
		name: `Character`,
		tooltipContent: `
			Lv: <span class='fwhite f16' id='charLv'></span><br>
			Xp: <span class='fwhite f16' id='charXp'></span><br>
			Time Played: <span class='fwhite f16' id='timePlayed'></span><br>
			Total Clicks: <span class='fwhite f16' id='clicksTotal'></span><br>
			Total Critical Hits: <span class='fwhite f16' id='critHitsTotal'></span>
		`,
		onclick: 'openModal("character")',
		stats: {
			lv: 0,
			xp: 0,
			xpReq: 30,
			dps: 0,
			dpc: 0,
			increment: 0,
			critChance: 0,
			critHit: false,
			armorPen: 0
		},
		total: {
			clicks: 0,
			critHits: 0,
	    titanium: 0,
			plutonium: 0,
			chrysonite: 0,
			armadium: 0,
	    solanium: 0,
	    singularity: 0,
			antiMatter: 0,
			frostCrystal: 0
	  }
	},
	achievements: {
		name: `Achievements`,
		tooltipContent: `
			Unlocked: <span class='fwhite f16' id='charAch'></span><hr>
			Achievements are split in category trees. They indicate a milestone that
			you have reached. Unlocking all achievements in the same tree unlocks
			unique avatars for your character
		`,
		onclick: 'openModal("achievements")',
		unlocked: 0
	},
	masteries: {
		name: `Masteries`,
		tooltipContent: `
			<span class='fgreen'>Common</span>: <span class='fwhite f16'>0 / 105</span><br>
			<span class='fblue'>Rare</span>: <span class='fwhite f16'>0 / 50</span><br>
			<span class='fpurple'>Epic</span>: <span class='fwhite f16'>0 / 15</span><br>
			<span class='forange'>Legendary</span>: <span class='fwhite f16'>0 / 3</span><hr>
			<span class='fred'>Masteries are in developement!</span><br>
			Masteries are divided into four categories. You will receive 1 random
			Mastery Point each time your Character levels up. Masteries are permanent
			and last through Microverses
		`,
		onclick: 'openModal("masteries")',
		total: {
			common: 0,
			rare: 0,
			epic: 0,
			legendary: 0
		}
	}
}
/*===========================================================
=					Generate Account																	=
===========================================================*/
function generateAccount() {
	for(key in Game.Account) {
		let item = Game.Account[key];

		let content = `
	    <div class='sidebar-item' id='${key}'>
	      <img src='img/character/${key}.png' onclick='${item.onclick}'>
	      <div class='tooltip sidebar-left-tooltip fgrey'>
					<div class='tooltip-lv'>
						<canvas id='${key}Bar' width='64' height='64'></canvas>
					</div>
					<div class='tooltip-header'>
            <span class='fwhite f14'>${item.name}</span><br>
						<span class='fwhite'>Click to view more</span><hr>
          </div>
	        <div class='tooltip-content fgrey'>
						${item.tooltipContent}
					</div>
	      </div>
	    </div>
	  `;

		elem('accountBoxes').insertAdjacentHTML('beforeend', content);
	}
}
/*===========================================================
=					Update Account																		=
===========================================================*/
function updateAccount() {
	let item = Game.Account;
	let char = item.character;
	let mast = item.masteries;
	let achi = item.achievements;

	let xpReq = Math.floor(30 * Math.pow(1.5, char.stats.lv));
	char.stats.xpReq = xpReq;

	let widthChar = char.stats.xp / char.stats.xpReq * 100;
	let widthAchi = achi.unlocked * 100 / 80;
	let widthMast = mast.unlocked * 100 / 188;

	progressBar('character', widthChar);
	progressBar('achievements', widthAchi);
	progressBar('masteries', widthMast);

	for(key in char.total) {
    elem(key + 'Total').innerHTML = nFormat(char.total[key]);
  }

  elem('charXp').innerHTML = nFormat(char.stats.xp) + ' / ' + nFormat(char.stats.xpReq);
	elem('charLv').innerHTML = char.stats.lv;
	elem('charAch').innerHTML = achi.unlocked + ' / ' + 80;
}
