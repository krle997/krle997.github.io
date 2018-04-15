/*===========================================================
=					Damage																						=
===========================================================*/
Game.Damage = {
	dps: {
		name: 'Damage per Second',
		info: 'Damage dealt by the game every second. DPS be reduced by Ores Armor',
		misc: `Armor Pen: <span class='fwhite f16' id='armorPen'></span>`
	},
	dpc: {
		name: 'Damage per Click',
		info: 'Damage dealt every click. Clicks can Critically Hit, dealing more damage. Clicks completely ignore Ores Armor',
		misc: `Crit Chance: <span class='fwhite f16' id='critChance'></span>`
	},
	increment: {
		name: 'Damage Increment',
		info: 'Increases both DPS and DPC by a percentage',
		misc: ``
	}
}
/*===========================================================
=					Generate Damage																		=
===========================================================*/
function generateDamage() {
	for(key in Game.Damage) {
    let item = Game.Damage[key];

		let content = `
			<div class='stat-item'>
				<div class='stat-img'>
					<img src='img/character/${key}.png'>
				</div>
				<div class='stat-num fcenter fgrey'>
					<span id='${key}'></span>
				</div>
				<div class='tooltip stat-tooltip fgrey'>
					<div class='tooltip-content'>
						<span class='fwhite f14'>${item.name}</span><hr>
						${item.misc}<hr>
						${item.info}
					</div>
				</div>
			</div>
		`;

		elem('damageStats').insertAdjacentHTML('beforeend', content);
	}
}
/*===========================================================
=					Update Damage																			=
===========================================================*/
function updateDamage() {
  let totalLvs = 0;
  let totalDps = 0;
  let totalDpc = 0;

  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];

    totalLvs += item.lv;
    totalDps += item.dps;
  }

  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];

    let ofTotal = (item.dps * 100 / totalDps).toFixed(2);

    if(totalDps <= 0) {
      elem(key + 'ofTotal').innerHTML = '%';
    } else {
      elem(key + 'ofTotal').innerHTML = ofTotal + '%';
    }
  }

  totalDpc = 1 + Math.floor(totalDps / 100 * 10);

  Game.Account.character.stats.increment = Game.Inventory.concentratedDarkMatter.amount;

  if(Game.Crafting.titaniumBattery.status)
    Game.Account.character.stats.increment += totalLvs;

  Game.Account.character.stats.dps =	Math.floor(totalDps + (totalDps / 100 * Game.Account.character.stats.increment));
  Game.Account.character.stats.dpc =	Math.floor(totalDpc + (totalDpc / 100 * Game.Account.character.stats.increment));
  Game.Account.character.stats.critChance = 0;
  Game.Account.character.stats.armorPen = 0;

  if(Game.Crafting.plutoniumBattery.status) {
    Game.Account.character.stats.armorPen += totalLvs / 100;
    Game.Account.character.stats.critChance += totalLvs / 100;
  }

  if(Game.Crafting.chrysoniteBattery.status) {
		Game.Account.character.stats.dpc += (Game.Account.character.stats.dpc / 100) * totalLvs / 100;
  }

/*  if (Game.dps >= 100 && !Game.achievement.ach5) Game.total.achievements ++, unlockAchievement(5), Game.achievement.ach5 = true;
  if (Game.dps >= 1000 && !Game.achievement.ach6) Game.total.achievements ++, unlockAchievement(6), Game.achievement.ach6 = true;
  if (Game.dps >= 10000 && !Game.achievement.ach7) Game.total.achievements ++, unlockAchievement(7), Game.achievement.ach7 = true;
  if (Game.dps >= 100000 && !Game.achievement.ach8) Game.total.achievements ++, unlockAchievement(8), Game.achievement.ach8 = true;
  if (Game.dps >= 1000000 && !Game.achievement.ach9) Game.total.achievements ++, unlockAchievement(9),	Game.achievement.ach9 = true;
*/
  elem('dps').innerHTML = nFormat(Game.Account.character.stats.dps);
  elem('dpc').innerHTML = nFormat(Game.Account.character.stats.dpc);
  elem('increment').innerHTML = nFormat(Game.Account.character.stats.increment) + '%';
  elem('critChance').innerHTML = Game.Account.character.stats.critChance + '%';
  elem('armorPen').innerHTML = Game.Account.character.stats.armorPen + '%';
  elem('titaniumBatteryBonus').innerHTML = totalLvs + '%';
  elem('plutoniumBatteryBonus').innerHTML = totalLvs / 100 + '%';
  elem('chrysoniteBatteryBonus').innerHTML = totalLvs / 100 + '%';
}
