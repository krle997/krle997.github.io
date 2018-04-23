/*===========================================================
=					Damage																						=
===========================================================*/
Game.Damage = {
	dps: {
		name: 'Damage per Second',
		info: `
			This is how much damage you do each second. DPS cannot critically hit, and
			can be reduced by Ores Armor.
		`,
		misc: `
			Critical Chance: <span class='fwhite f16'>0%</span><br>
			Armor Pen: <span class='fwhite f16' id='armorPen'></span>
		`
	},
	dpc: {
		name: 'Damage per Click',
		info: `
			This is how much damage you do each click. DPC can critically hit, dealing
			significantly more damage. DPC also completely ignores Ores Armor. DPC
			can't be increased and it is always fixed at 5% of total DPS.
		`,
		misc: `
			Critical Chance: <span class='fwhite f16' id='critChance'></span><br>
			Armor Pen: <span class='fwhite f16'>100%</span>
		`
	},
	increment: {
		name: 'Damage Increment',
		info: `
			Increases both DPS and DPC by a percentage. Damage Increment can be
			increased in various ways.
		`,
		misc: `
			From <img src='img/inv/concentratedDarkMatter16.png'>: <span class='fwhite f16' id='fromCDarkMatter'></span>
		`
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
				<div class='stat-img'>
					<img src='img/character/${key}.png'>
				</div>
				<div class='stat-num fcenter'>
					<span id='${key}'></span>
				</div>
				<div class='tooltip stat-tooltip'>
					<div class='tooltip-header fcenter'>
						<span class='fwhite f14'>${item.name}</span>
					</div>
					<div class='tooltip-content'>
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
	let char = Game.Character;
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
    let ofTotal = (item.dps * 100 / totalDps);

    if(totalDps <= 0) {
      elem(key + 'ofTotal').innerHTML = '0%';
    } else {
      elem(key + 'ofTotal').innerHTML = nFormat(ofTotal) + '%';
    }
  }

  totalDpc = 1 + Math.floor(totalDps / 100 * 10);

  char.increment = Game.Inventory.concentratedDarkMatter.amount;

  if(Game.Crafting.titaniumBattery.active)
    char.increment += totalLvs;

  char.dps =	Math.floor(totalDps + (totalDps / 100 * char.increment));
  char.dpc =	Math.floor(totalDpc + (totalDpc / 100 * char.increment));
  char.critChance = 0;
  char.armorPen = 0;

  if(Game.Crafting.plutoniumBattery.active) {
    char.armorPen += totalLvs / 100;
    char.critChance += totalLvs / 100;
  }

  if(Game.Crafting.chrysoniteBattery.active) {
		char.dpc += (char.dpc / 100) * totalLvs / 100;
  }

/*  if (Game.dps >= 100 && !Game.achievement.ach5) Game.total.achievements ++, unlockAchievement(5), Game.achievement.ach5 = true;
  if (Game.dps >= 1000 && !Game.achievement.ach6) Game.total.achievements ++, unlockAchievement(6), Game.achievement.ach6 = true;
  if (Game.dps >= 10000 && !Game.achievement.ach7) Game.total.achievements ++, unlockAchievement(7), Game.achievement.ach7 = true;
  if (Game.dps >= 100000 && !Game.achievement.ach8) Game.total.achievements ++, unlockAchievement(8), Game.achievement.ach8 = true;
  if (Game.dps >= 1000000 && !Game.achievement.ach9) Game.total.achievements ++, unlockAchievement(9),	Game.achievement.ach9 = true;
*/
  elem('dps').innerHTML = nFormat(char.dps);
  elem('dpc').innerHTML = nFormat(char.dpc);
  elem('increment').innerHTML = nFormat(char.increment) + '%';
  elem('critChance').innerHTML = char.critChance + '%';
  elem('armorPen').innerHTML = char.armorPen + '%';
	elem('fromCDarkMatter').innerHTML = nFormat(Game.Inventory.concentratedDarkMatter.amount);
  elem('titaniumBatteryBonus').innerHTML = totalLvs + '%';
  elem('plutoniumBatteryBonus').innerHTML = totalLvs / 100 + '%';
  elem('chrysoniteBatteryBonus').innerHTML = totalLvs / 100 + '%';
}
