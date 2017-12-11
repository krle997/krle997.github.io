/*===========================================================
=					Damage																						=
===========================================================*/
Game.Damage = {
	dps: {
		name: 'Damage per Second',
		info: 'Damage dealt by the game every second',
		misc: `
			Armor Pen: <span class='fwhite f16' id='armorPen'></span><br/>
		`
	},
	dpc: {
		name: 'Damage per Click',
		info: 'Damage dealt every click',
		misc: `
			Crit Chance: <span class='fwhite f16' id='critChance'></span><br/>
		`
	},
	increment: {
		name: 'Damage Increment',
		info: 'Increases both DPS and DPC',
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
			<div class='stat'>
				<div class='stat-img'><img src='img/character/${key}.png'/></div>
				<div class='stat-num' id='${key}Anim'><span id='${key}'></span></div>
				<div class='tooltip stat-tooltip'>
					<div class='tooltip-content fgrey'>
					<span class='fwhite'>${item.name}</span><hr/>
					<span>${item.misc}</span><br/>
					<span>${item.info}</span>
					</div>
				</div>
			</div>
		`;

		elem('damageStats').innerHTML += content;
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

  Game.Account.character.increment = Game.Inventory.concentratedDarkMatter.amount;

  if(Game.Crafting.titaniumBattery.status)
    Game.Account.character.increment += totalLvs;

  Game.Account.character.dps =	Math.floor(totalDps + (totalDps / 100 * Game.Account.character.increment));
  Game.Account.character.dpc =	Math.floor(totalDpc + (totalDpc / 100 * Game.Account.character.increment));
  Game.Account.character.critChance = 0;
  Game.Account.character.armorPen = 0;

  if(Game.Crafting.plutoniumBattery.status) {
    Game.Account.character.armorPen += totalLvs / 100;
    Game.Account.character.critChance += totalLvs / 100;
  }

  if(Game.Crafting.chrysoniteBattery.status) {
		Game.Account.character.dpc += (Game.Account.character.dpc / 100) * totalLvs / 100;
  }

/*  if (Game.dps >= 100 && !Game.achievement.ach5) Game.total.achievements ++, unlockAchievement(5), Game.achievement.ach5 = true;
  if (Game.dps >= 1000 && !Game.achievement.ach6) Game.total.achievements ++, unlockAchievement(6), Game.achievement.ach6 = true;
  if (Game.dps >= 10000 && !Game.achievement.ach7) Game.total.achievements ++, unlockAchievement(7), Game.achievement.ach7 = true;
  if (Game.dps >= 100000 && !Game.achievement.ach8) Game.total.achievements ++, unlockAchievement(8), Game.achievement.ach8 = true;
  if (Game.dps >= 1000000 && !Game.achievement.ach9) Game.total.achievements ++, unlockAchievement(9),	Game.achievement.ach9 = true;
*/
  elem('dps').innerHTML = nFormat(Game.Account.character.dps);
  elem('dpc').innerHTML = nFormat(Game.Account.character.dpc);
  elem('increment').innerHTML = nFormat(Game.Account.character.increment) + '%';
  elem('critChance').innerHTML = Game.Account.character.critChance + '%';
  elem('armorPen').innerHTML = Game.Account.character.armorPen + '%';
  elem('titaniumBatteryBonus').innerHTML = totalLvs + '%';
  elem('plutoniumBatteryBonus').innerHTML = totalLvs / 100 + '%';
  elem('chrysoniteBatteryBonus').innerHTML = totalLvs / 100 + '%';
}