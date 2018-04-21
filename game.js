/*===========================================================
=					Game																							=
===========================================================*/
var Game = {
  version: 'v1.0',
  author: 'Krle',
  fps: 60,
  muted: true,

  time: {
    seconds: 0,
		minutes: 0,
		hours: 0
  },

  connected: false,

  resetOreTo: null,

  dpsAnimFrame: null,
  dpsAnimStart: null,

  gameLoopInt: null,
  gameLoopStarted: null,

  res: {},
  resAnimFrame: null,
  resFadeOutAnim: null,

  fText: {},
  fTextAnimFrame: null
}
/*===========================================================
=					Get Element ID																		=
===========================================================*/
function elem(id) {
  return document.getElementById(id);
}
/*===========================================================
=					Save To LocalStorage															=
===========================================================*/
function save(key, num) {
	return localStorage.setItem(key, JSON.stringify(num));
}
/*===========================================================
=					Load From LocalStorage														=
===========================================================*/
function load(key) {
	return JSON.parse(localStorage.getItem(key));
}
/*===========================================================
=					Load Game																					=
===========================================================*/
function loadGame() {
	for(key in Game.Upgrades) {
		let item = Game.Upgrades[key];

		if(load(key + 'Lv')) {
			item.lv = load(key + 'Lv');
		}
	}

	for(key in Game.Crafting) {
		let item = Game.Crafting[key];

		if(load(key + 'Active')) {
			item.active = load(key + 'Active');
		};
		if(load(key + 'Remaining')) {
			item.remaining = load(key + 'Remaining');
		}
	}

  for(key in Game.Masteries) {
    let item = Game.Masteries[key];

    if(load(key + 'Lv')) {
      item.lv = load(key + 'Lv');
    }
  }

	for(key in Game.Ascensions) {
		let item = Game.Ascensions[key];

    if(load(`${key}Current`)) {
      item.current = load(`${key}Current`);
    }
	}

  for(key in Game.Ores) {
    let item = Game.Ores[key];

    if(load(`${key}Prog`))
      item.prog = load(`${key}Prog`);

		if(load(`${key}Lv`))
			item.lv = load(`${key}Lv`);

		if(load(`${key}Hp`))
			item.hp = load(`${key}Hp`);

    if(load(`${key}Rewarded`))
      item.lootRewarded = load(`${key}Rewarded`);
  }

	for(key in Game.Inventory) {
		let inv = Game.Inventory[key];

		if(load(key + 'Amount'))
			inv.amount = load(key + 'Amount');
	}

	for(key in Game.time) {
		if(load(key))
			Game.time[key] = load(key);
	}

  for(key in Game.Character.total) {
    if(load(key + 'Total')) {
      Game.Character.total[key] = load(key + 'Total');
    }
  }

  if(load('characterLv'))
    Game.Character.lv = load('characterLv');

  if(load('characterXp'))
    Game.Character.xp = load('characterXp');

  for(key in Game.Achievements) {
    for(i in Game.Achievements[key].ach) {
      if(load(key + i)) {
        Game.Achievements[key].ach[i] = load(key + i);
      }
    }
  }
}
/*===========================================================
=					Generate Game																			=
===========================================================*/
function generateContent() {
  loadGame();

  generateModals();
  generateAccount();
  generateDonate();
  generateAchievements();
  generateMasteries();
  generateUpgrades();
  generateCrafting();
  generateAscensions();
  generateHpBar();
  generateDamage();
  generateInventory();
  generateHelp();

  updateAccount();
  updateAchievements();
  updateMasteries();
  updateUpgrades();
  updateCrafting();
  updateAscensions();
  updateInventory();
  updateDamage();

  muteSounds();

  Game.gameLoopStarted = Date.now();
  Game.gameLoopInt = setInterval(function() {
    gameLoop();
  }, 1000);
}
/*===========================================================
=					Game Loop																					=
===========================================================*/
function gameLoop() {
  let timestamp = Date.now();
  let runtime = timestamp - Game.gameLoopStarted;

  Game.gameLoopStarted = timestamp;
  Game.time.seconds += runtime / 1000;

  if(Game.time.seconds > 59) {
    Game.time.seconds = 0;
    Game.time.minutes ++;
  }

  if(Game.time.minutes > 59) {
    Game.time.minutes = 0;
    Game.time.hours ++;
  }

	save('seconds', Game.time.seconds);
	save('minutes', Game.time.minutes);
	save('hours', Game.time.hours);
  elem('timePlayed').innerHTML = `${Game.time.hours}h ${Game.time.minutes}m ${Math.round(Game.time.seconds)}s`;

  for(key in Game.Crafting) {
    let item = Game.Crafting[key];

    if(item.active) {
      item.remaining -= runtime;

      save(`${key}Remaining`, item.remaining);
      elem(`${key}Remaining`).innerHTML = `${Math.round(item.remaining / 1000)} s`;

      if(item.remaining <= 0) {
        item.active = false;
        item.remaining = item.duration;

        updateDamage();
				updateCrafting();

        save(`${key}Active`, item.active);
        save(`${key}Remaining`, item.remaining);
        elem(`${key}Remaining`).innerHTML = 'Inactive';
        elem(`${key}Img`).style.animation = '';
      }

      let width = 100 / (item.duration / item.remaining);
      progressBar(key, width);
    }
  }
}
/*===========================================================
=         Start Damage                                      =
===========================================================*/
function startDamage(key) {
  elem('oreImg').onclick = function() { doDpc(key); }

  Game.dpsAnimStart = performance.now();
  Game.dpsAnimFrame = requestAnimationFrame(function(time) {
    dpsAnim(time, key);
  });
}
/*===========================================================
=         Stop Damage                                       =
===========================================================*/
function stopDamage() {
  elem('oreImg').onclick = function () {}
}
/*===========================================================
=         Damage per Second                                 =
===========================================================*/
function dpsAnim(time, key) {
  let frame = time - Game.dpsAnimStart;
  Game.dpsAnimStart = time;

  let item = Game.Ores[key];
  let char = Game.Character;

  let penetrate = item.armor / 100 * char.armorPen;
  let damage = char.dps - (item.armor - penetrate);
  let damagePerFrame = (damage * frame) / 1000;

  if(item.armor - penetrate >= char.dps || char.dps <= 0)
    return;
  else if(item.hp > 0)
    item.hp -= damagePerFrame;
  else if(item.hp <= 0 && !item.lootRewarded) {
    item.lootRewarded = true;
    item.hp = 0;
    item.prog ++;

    console.log('hp <= 1, loot true ? =', item.lootRewarded);

    giveXp();
    giveLoot(key);

    if(item.prog >= 10) {
      let lvGoals = {
        One: 25,
        Two: 50,
        Three: 75,
        Four: 100,
        Five: 250,
        Six: 500,
        Seven: 750,
        Eight: 1000,
        Nine: 2500,
        Ten: 5000
      }

      item.lv ++;
      item.prog = 0;

      if(item.lv >= char.highestLv[key]) {
        char.highestLv[key] = item.lv;

        elem(`${key}UppermostLv`).innerHTML = char.highestLv[key];
      }

      // FIX -- add planet ID to ores
      for(i in lvGoals) {
        if(char.highestLv[key] >= lvGoals[i] && !Game.Achievements[key].ach[i])
          unlockAchievement(key, i);
      }

      giveSpecialLoot(key);
    }

    Game.resetOreTo = setTimeout(function() {
      let oreMaxHp = Math.floor(item.baseHp * Math.pow(item.hpPerLv, item.lv));

      item.hp = oreMaxHp;
      item.maxHp = oreMaxHp;
      item.lootRewarded = false;

      save(`${key}Rewarded`, item.lootRewarded);

      console.log('hp <= 1, loot false ? =', item.lootRewarded);

      elem('oreMaxHp').innerHTML = nFormat(item.maxHp);

      requestAnimationFrame(function(time) {
        dpsAnim(time, key);
      });
    }, 500);

    oreProgressBar(key);

    save(`${key}Rewarded`, item.lootRewarded);
    save(`${key}Lv`, item.lv);
    save(`${key}Prog`, item.prog);
    elem(`${key}Lv`).innerHTML = item.lv;
    elem('oreLv').innerHTML = item.lv;
  }
  /*else if(item.hp <= 0 && item.lootRewarded) { // If lv is cleared but user already received loot

  }*/

  healthBar(key);
  save(`${key}Hp`, item.hp);

  if(item.hp > 0 || !item.lootRewarded) {
    requestAnimationFrame(function(time) {
      dpsAnim(time, key);
    });
  }
}




/*
function doDps(timestamp, key) {
  let runtime = timestamp - Game.dpsAnimStarted; // Runtime roughly equals 1 frame (16ms);
  Game.dpsAnimStarted = timestamp; // Function frames lag

  let item = Game.Ores[key];
  let char = Game.Character;
  let penetrate = item.armor / 100 * char.armorPen;
  let damage = char.dps - (item.armor - penetrate);
  let damagePerFrame = (damage * runtime) / 1000; // Move 1.66% hp per frame

  if(item.armor - penetrate >= char.dps || char.dps <= 0)
    return;

  item.hp -= damagePerFrame;

  if(item.hp <= 0) {
    item.hp = 0;

    if(!item.lootRewarded) {
      item.lootRewarded = true;
      item.prog ++;

      giveXp();
      giveLoot(key);

      if(item.prog >= 10) {
        let lvGoals = {
          One: 25,
          Two: 50,
          Three: 75,
          Four: 100,
          Five: 250,
          Six: 500,
          Seven: 750,
          Eight: 1000,
          Nine: 2500,
          Ten: 5000
        }

        item.prog = 0;
        item.lv ++;

        if(item.lv >= char.highestLv[key]) {
          char.highestLv[key] = item.lv;

          elem(`${key}UppermostLv`).innerHTML = char.highestLv[key];
        }

        // FIX -- add planet ID to ores
        for(i in lvGoals) {
          if(char.highestLv[key] >= lvGoals[i] && !Game.Achievements[key].ach[i])
            unlockAchievement(key, i);
        }

        giveSpecialLoot(key);

      }


      oreProgressBar(key);

      save(`${key}Lv`, item.lv);
      elem(`${key}Lv`).innerHTML = item.lv;
      elem('oreLv').innerHTML = item.lv;
      save(`${key}Prog`, item.prog);
      save(`${key}Rewarded`, item.lootRewarded);

      Game.resetOreTo = setTimeout(function() {
        resetOre(key);
        startDamage(key);
      }, 500);
    }
    resetOre(key);

    else {
      Game.resetOreTo = setTimeout(function() {
        resetOre(key);
        startDamage(key);
      }, 500);
    }
  }

  if(item.hp <= 0) {
    stopDamage();
    oreClear(key);
    //return;
  }

  healthBar(key);
  save(`${key}Hp`, item.hp);

  if(Game.doDpsActive) {
  requestAnimationFrame(function(timestamp) {
    doDps(timestamp, key);
  });
  }
  else {
    cancelAnimationFrame(Game.doDpsAnimFrame);
  }
}*/
/*===========================================================
=         Damage per Click                                  =
===========================================================*/
function doDpc(key) {
  let item = Game.Ores[key];
  let char = Game.Character;

  if(char.critChance > 0)
    checkCrit();

  if(char.critHit) {
    item.hp -= char.dpc * 2;
    char.total.critHits ++;
    char.critHit = false;

    generateFloatingText(nFormat(char.dpc * 2), 'character/dps16.png', event.clientX, event.clientY - 20);

		save('critHitsTotal', char.total.critHits);
    elem('critHitsTotal').innerHTML = nFormat(char.total.critHits);
  }
  else {
    item.hp -= char.dpc;
    char.total.clicks ++;

    generateFloatingText(nFormat(char.dpc), 'character/dps16.png', event.clientX, event.clientY - 20);

  	save('clicksTotal', char.total.clicks);
    elem('clicksTotal').innerHTML = nFormat(char.total.clicks);
  }

  if(item.hp <= 0) {
    stopDamage();
    //oreClear(key);
  }

  healthBar(key);
  save(`${key}Hp`, item.hp);
  playAudio('dpc');
}
/*===========================================================
=         Check Critical Hit                                =
===========================================================*/
function checkCrit() {
  let char = Game.Character;
  let rand = Math.floor(Math.random() * (100 - 1) + 1);
  let req = 100 - char.critChance;

  if(rand > req)
    char.critHit = true;
}
/*===========================================================
=         Ore Cleared                                       =
===========================================================*/
function oreClear(key) {
  let item = Game.Ores[key];

  item.hp = 0;

  if(!item.lootRewarded) {
    item.lootRewarded = true;
    item.prog ++;

    giveXp();
    giveLoot(key);

    if(item.prog >= 10)
      oreLvUp(key);

    oreProgressBar(key);
    save(`${key}Prog`, item.prog);
    save(`${key}Rewarded`, item.lootRewarded);

    Game.resetOreTo = setTimeout(function() {
      resetOre(key);
      startDamage(key);
    }, 500);
  }
  else {
    Game.resetOreTo = setTimeout(function() {
      resetOre(key);
      startDamage(key);
    }, 500);
  }
}
/*===========================================================
=         Ore Lv Up                                         =
===========================================================*/
function oreLvUp(key) {
  let item = Game.Ores[key];
  let char = Game.Character;
  let lvGoals = {
    One: 25,
    Two: 50,
    Three: 75,
    Four: 100,
    Five: 250,
    Six: 500,
    Seven: 750,
    Eight: 1000,
    Nine: 2500,
    Ten: 5000
  }

  item.prog = 0;
  item.lv ++;

  if(item.lv >= char.highestLv[key]) {
    char.highestLv[key] = item.lv;

    elem(`${key}UppermostLv`).innerHTML = char.highestLv[key];
  }

  // FIX -- add planet ID to ores
  for(i in lvGoals) {
    if(char.highestLv[key] >= lvGoals[i] && !Game.Achievements[key].ach[i])
      unlockAchievement(key, i);
  }

  giveSpecialLoot(key);
  save(`${key}Lv`, item.lv);
  elem(`${key}Lv`).innerHTML = item.lv;
  elem('oreLv').innerHTML = item.lv;
}
/*===========================================================
=         Give Loot                                         =
===========================================================*/
function giveLoot(key) {
  let item = Game.Ores[key];
  let inv = Game.Inventory[key];
  let char = Game.Character;
  let resGain = Math.floor(10 * Math.pow(1.02, item.lv));
  let resGoals = {
    One: 1e6,
    Two: 1e9,
    Three: 1e12,
    Four: 1e15,
    Five: 1e18,
    Six: 1e21,
    Seven: 1e24,
    Eight: 1e27,
    Nine: 1e30,
    Ten: 1e33
  }

  inv.amount += resGain;
  char.total[key] += resGain;

  for(i in resGoals) {
    if(char.total[key] >= resGoals[i] && !Game.Achievements[key].ach[i])
      unlockAchievement(key, i);
  }

  generateResource(key, resGain);
  numPopUp(key);
  canBuyUpgrade();
  save(`${key}Amount`, inv.amount);
	save(`${key}Total`, char.total[key]);
  elem(`${key}Amount`).innerHTML = nFormat(inv.amount);
  elem(`${key}Total`).innerHTML = nFormat(char.total[key]);
}
/*===========================================================
=         Give XP                                           =
===========================================================*/
function giveXp() {
  let char = Game.Character;
  let width = char.xp / char.xpReq * 100;

  char.xp ++;

  if(char.xp > char.xpReq) {
    char.lv ++;
    char.xp = 0;
    char.xpReq = 30 * Math.pow(1.5, char.lv);

    giveMastery();
    save('characterLv', char.lv);
  }

  progressBar('character', width);
  save('characterXp', char.xp);
  elem('charXp').innerHTML = `${nFormat(char.xp)} / ${nFormat(char.xpReq)}`;
}
/*===========================================================
=         Give Special Loot                                 =
===========================================================*/
function giveSpecialLoot(key) {
  let item = Game.Ores[key];
  let inv = Game.Inventory;
  let char = Game.Character;
  let rand = Math.floor(Math.random() * 100 + 1);

  if(rand < item.darkMatterRate) {
    inv.darkMatter.amount += 1;

    generateResource('darkMatter', 1);
    numPopUp('darkMatter');
    updateAscensions();
    save('darkMatterAmount', inv.darkMatter.amount);
    elem('darkMatterAmount').innerHTML = nFormat(inv.darkMatter.amount);
  }

  if(rand < item.antiMatterRate) {
    inv.antiMatter.amount += 1;
    char.total.antiMatter ++;

    generateResource('antiMatter', 1);
    numPopUp('antiMatter');
    canCraft();
    save('antiMatterAmount', inv.antiMatter.amount);
    save('antiMatterTotal', char.total.antiMatter);
    elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
    elem('antiMatterTotal').innerHTML = nFormat(char.total.antiMatter);
  }
}
/*===========================================================
=					Microverse Ascension															=
===========================================================*/
function microverseAscension() {
	let inv = Game.Inventory;

  stopDamage();

  let reward = inv.darkMatter.amount;

  for(key in inv)
    inv[key].amount = 0;

  inv.concentratedDarkMatter.amount += reward;

	for(key in inv)
		save(`${key}Amount`, inv[key].amount);

  for(key in Game.Upgrades) {
		let upg = Game.Upgrades[key];

    upg.lv = 0;

		save(key + 'Lv', upg.lv);
  }

  for(key in Game.Crafting) {
    let craft = Game.Crafting[key];

    craft.active = false;
    craft.remaining = 600000;

		save(key + 'Remaining', craft.remaining);
		save(key + 'Active', craft.active);
  }

  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];


    item.current = false;

  }

  for(key in Game.Ores) {
    let ore = Game.Ores[key];

    ore.lv = 1;
    ore.prog = 1;
    ore.hp = ore.baseHp;

		save(`${item.oreId}Lv`, ore.lv);
		save(`${item.oreId}Hp`, ore.hp);
    save(`${item.oreId}Prog`, ore.prog);
  }

  lockUpgrades();
  lockCrafting();
  lockAscensions();
  lockInventory();

  unlockAscension('earth');

  updateUpgrades();
  updateCrafting();
  updateAscensions();
  updateOreStats('earth');
  updateInventory();
  updateDamage();

  Game.connected = false;
  ascend('earth');
}
/*===========================================================
=					Update Progress Bar																=
===========================================================*/
function progressBar(key, width) {
  elem(`${key}Progress`).style.width = `${width}%`;
}
/*===========================================================
=			Mute / unmute settings																=
===========================================================*/
function muteSounds() {
	if(Game.muted) {
		Game.muted = false;
		elem('sounds').innerHTML = 'On';
	} else {
		Game.muted = true;
		elem('sounds').innerHTML = 'Off';
	}
}
/*===========================================================
=         Play Audio                                        =
===========================================================*/
function playAudio(key) {
  if(!Game.muted) {
    let audioFile = new Audio(`sounds/${key}.wav`);
    audioFile.play();
  }
}
/*===========================================================
=			Number formatter																			=
===========================================================*/
function nFormat(num) {
	var si = [
		{ value: 1E33, symbol: ' Dec' },
		{ value: 1E30, symbol: ' Non' },
		{ value: 1E27, symbol: ' Oct' },
		{ value: 1E24, symbol: ' Sep' },
		{ value: 1E21, symbol: ' Sx' },
		{ value: 1E18, symbol: ' Qi' },
		{ value: 1E15, symbol: ' Qa' },
		{ value: 1E12, symbol: ' T' },
		{ value: 1E9, symbol: ' B' },
		{ value: 1E6, symbol: ' M' },
		{ value: 1E3, symbol: ' K' },
	], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;

	for(i = 0; i < si.length; i ++) {
		if(num >= si[i].value) {
			return(num / si[i].value).toFixed(2).replace(rx, '$1') + si[i].symbol;
		}
	}

	return num.toFixed(2).replace(rx, '$1');
}
/*===========================================================
=			Open Modal																						=
===========================================================*/
function openModal(which) {
  elem(which + 'Modal').style.display = 'initial';
}
/*===========================================================
=			Close Modal																						=
===========================================================*/
function closeModal(which) {
  elem(which + 'Modal').style.display = 'none';
}

var notifCount = 0;
var letMe;

function notification(header, content) {
  clearTimeout(letMe);

  let notif = `
    <div class='notification' id='notif${notifCount}'>
      <div class='col-full forange'>${header}</div>
      <div class='notification-header fwhite'>${content}</div>
    </div>
  `;

  elem('notifContainer').insertAdjacentHTML('beforeend', notif);
  elem('notif' + notifCount).style.animation = 'notification-anim 5s ease-in forwards';

  for(i = 0; i < notifCount; i ++)
    elem('notif' + i).style.bottom = (notifCount - i) * 80 + 'px';

  notifCount ++;

	letMe = setTimeout(function() {
    clearNotification();
  }, 5000);
}
/*===========================================================
=			Clear notification																		=
===========================================================*/
function clearNotification() {
  elem('notifContainer').innerHTML = '';
  clearTimeout(letMe);
  notifCount = 0;
}
/*===========================================================
=			Set username												      						=
===========================================================*/
function setUsername() {
	game.userName = document.getElementById("username").value;

	if (game.userName.length < 3) {
		return false;
	}

	document.getElementById("displayuser").innerHTML = "Welcome back, <span class=\"fblue\">" + game.userName + "</span>";
}
/*===========================================================
=			HTML onload?      					       	             			=
===========================================================*/
window.onload = function() { generateContent(); }
