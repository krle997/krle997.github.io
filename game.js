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

  resources: {}
}

var gameLoopInt;
var doDpsINT;
var oreClearTO;

var connected = false;
var rewarded = false;
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

		if(load(key + 'Status')) {
			item.status = load(key + 'Status');
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
		let ore = Game.Ores[item.oreId];

    if(load(`${item.oreId}Prog`))
      ore.prog = load(`${item.oreId}Prog`);

		if(load(`${item.oreId}Lv`))
			ore.lv = load(`${item.oreId}Lv`);

		if(load(`${item.oreId}Hp`))
			ore.hp = load(`${item.oreId}Hp`);

    if(load(`${key}Current`)) {
      item.current = load(`${key}Current`);
    }
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

  for(key in Game.Account.character.total) {
    if(load(key + 'Total')) {
      Game.Account.character.total[key] = load(key + 'Total');
    }
  }

  for(key in Game.Achievements) {
    for(i in Game.Achievements[key].ach) {
      if(load(key + i)) {
        Game.Achievements[key].ach[i] = load(key + i);
      }
    }
  }

  if(load('characterLv')) {
    Game.Account.character.stats.lv = load('characterLv');
  }

  if(load('characterXp')) {
    Game.Account.character.stats.xp = load('characterXp');
  }

  if(load('rewarded')) {
    rewarded = load('rewarded');
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

  gameLoopInt = setInterval(function() {
    gameLoop();
  }, 1000);
}
/*===========================================================
=					Game Loop																					=
===========================================================*/
function gameLoop() {
  Game.time.seconds ++;

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

  for(key in Game.Crafting) {
    let item = Game.Crafting[key];

    if(item.status) {
      item.remaining -= 1000;

      save(`${key}Remaining`, item.remaining);

      elem(`${key}Remaining`).innerHTML = `${item.remaining / 1000} s`;

      if(item.remaining <= 0) {
        item.status = false;
        item.remaining = 600000;

        save(`${key}Remaining`, item.remaining);
				save(`${key}Status`, item.status);

        updateDamage();
				updateCrafting();

        elem(`${key}Remaining`).innerHTML = 'Inactive';
        elem(`${key}Img`).style.animation = '';
      }

      let width = 100 / (600000 / item.remaining);
      progressBar(key, width);
    }
  }

  elem('timePlayed').innerHTML = `${Game.time.hours} h ${Game.time.minutes} m`;
}
/*===========================================================
=         Damage per Second                                 =
===========================================================*/
function doDps(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];
  let acc = Game.Account;

  let penetrate = ore.armor / 100 * acc.character.stats.armorPen;
  let damage = (acc.character.stats.dps - (ore.armor - penetrate)) / Game.fps;

  if(ore.armor - penetrate >= acc.character.stats.dps || acc.character.stats.dps <= 0)
    return;

  ore.hp -= damage;
	save(`${item.oreId}Hp`, ore.hp);

  if(ore.hp <= 0)
    zeroHp(key);

  healthBar(key);
}
/*===========================================================
=         Damage per Click                                  =
===========================================================*/
function doDpc(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];
  let acc = Game.Account;

  if(acc.character.stats.critChance > 0)
    checkCrit();

  if(acc.character.stats.critHit) {
    ore.hp -= acc.character.stats.dpc * 2;
    acc.character.total.critHits ++;
    acc.character.stats.critHit = false;

    generateFloatingText(`- ${nFormat(acc.character.stats.dpc * 2)} <img class='imgFix' src='img/character/dps16.png'/>`, event.clientX, event.clientY - 20);

    save(`${item.oreId}Hp`, ore.hp);
		save('critHitsTotal', acc.character.total.critHits);

    elem('critHitsTotal').innerHTML = nFormat(acc.character.total.critHits);
  } else {
    ore.hp -= acc.character.stats.dpc;
    acc.character.total.clicks ++;

    generateFloatingText(`- ${nFormat(acc.character.stats.dpc)} <img class='imgFix' src='img/character/dps16.png'/>`, event.clientX, event.clientY - 20);

    save(`${item.oreId}Hp`, ore.hp);
  	save('clicksTotal', acc.character.total.clicks);
    elem('clicksTotal').innerHTML = nFormat(acc.character.total.clicks);
  }

  if(ore.hp <= 0)
    zeroHp(key);

  healthBar(key);

  if(!Game.muted) {
    let sound = new Audio('sounds/dpc.wav');
    sound.play();
  }
}
/*===========================================================
=         Check Critical Hit                                =
===========================================================*/
function checkCrit() {
  let acc = Game.Account;
  let rand = Math.floor(Math.random() * (100 - 1) + 1);
  let req = 100 - acc.character.stats.critChance;

  if(rand > req)
    acc.character.stats.critHit = true;
}
/*===========================================================
=         Generate Floating Text                            =
===========================================================*/
function generateFloatingText(text, x, y) {
  let id = Math.random();
  let content = `<div class='floating-text fwhite' id='floatingText${id}'>${text}</div>`;

  elem('resourceContainer').insertAdjacentHTML('beforeend', content);
  elem('floatingText' + id).style.left = x + 'px';
  elem('floatingText' + id).style.top = y + 'px';
  animateFloatingText(id, y);
}
/*===========================================================
=         Animate Floating Text                             =
===========================================================*/
function animateFloatingText(id, y) {
  let frame = 0;
  let opacity = 1;
  let distance = 0;

  let interval = setInterval(function() {
    frame ++;
    distance ++;

    elem('floatingText' + id).style.top = y - distance + 'px';

    if(frame >= Game.fps) {
      opacity -= 1 / Game.fps;
      elem('floatingText' + id).style.opacity = opacity;
    }

    if(frame >= Game.fps * 2) {
      clearInterval(interval);
      elem('floatingText' + id).parentNode.removeChild(elem('floatingText' + id));
    }
  }, 1000 / Game.fps);
}
/*===========================================================
=         Generate Resources                                =
===========================================================*/
function generateResource(ore, amount) {
  let id = Math.random();
  let x = 224;
  let y = Math.floor(Math.random() * (384 - 320) + 320);
  let content = `<img class='animated-resource' id='res${id}' src='img/inv/${ore}.png'/>`;

  elem('resourceContainer').insertAdjacentHTML('beforeend', content);
  elem('res' + id).style.left = x + 'px';
  elem('res' + id).style.top = y + 'px';

  animateResource(id, x, y, ore, amount);
}
/*===========================================================
=         Animate Resources                                 =
===========================================================*/
function animateResource(id, x, y, ore, amount) {
  let pos = elem('resourceContainer').getBoundingClientRect();
  let gravityPull = 0;
  let bounce = 0.5;
  let bounced = 0;
  let opacity = 1;
  let side = Math.random();

  let interval = setInterval(function() {
    gravityPull += 0.1;
    y += gravityPull;

    elem('res' + id).style.left = x + 'px';
    elem('res' + id).style.top = y + 'px';

    if(bounced <= 4) {
      if(side > 0.5)
        x -= 0.5;
      else
        x += 0.5;
    }
    if(y >= pos.bottom - 64) {
      y = pos.bottom - 64;
      gravityPull = -(gravityPull * bounce);
      bounced ++;
    }

    if(bounced >= 4) {
      clearInterval(interval);
      let fos = elem('res' + id).getBoundingClientRect();
      generateFloatingText(`+ ${nFormat(amount)} <img class='imgFix' src='img/inv/${ore}16.png'/>`, fos.left, fos.top);

      let fadeOut = setInterval(function() {
        opacity -= 1 / Game.fps;
        elem('res' + id).style.opacity = opacity;

        if(opacity <= 0) {
          elem('res' + id).style.opacity = 0;
          elem('res' + id).parentNode.removeChild(elem('res' + id));
          clearInterval(fadeOut);
        }
      }, 1000 / Game.fps);
    }
  }, 1000 / Game.fps);
}

function stopDamage() {
  elem('oreImg').onclick = function () {}

  clearInterval(doDpsINT);
}
function startDamage(key) {
  elem('oreImg').onclick = function() { doDpc(key); }

  doDpsINT = setInterval(function() { doDps(key); }, 1000 / Game.fps);
}
/*===========================================================
=         Zero Hp                                           =
===========================================================*/
function zeroHp(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];
  let acc = Game.Account;

  if(rewarded) {
    resetOre(key);
    return;
  }

  stopDamage();

  ore.hp = 0;
  ore.prog ++;

  healthBar(key);
  giveLoot(key);
  giveXp();

  if(ore.prog >= 10)
    oreLvUp(key);

  oreProgressBar(key);

  rewarded = true;

  save(`${item.oreId}Hp`, ore.hp);
  save(`${item.oreId}Prog`, ore.prog);
  save('rewarded', rewarded);

  oreClearTO = setTimeout(function() {
    resetOre(key);
    startDamage(key);
  }, 500);
}
/*===========================================================
=         Ore Lv Up                                         =
===========================================================*/
function oreLvUp(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];
  let acc = Game.Account;

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

  ore.prog = 0;
  ore.lv ++;

  if(ore.lv >= acc.character.highestLv[item.oreId]) {
    acc.character.highestLv[item.oreId] = ore.lv;

    elem(`${item.oreId}UppermostLv`).innerHTML = acc.character.highestLv[item.oreId];
  }

  for(i in lvGoals) {
    if(acc.character.highestLv[item.oreId] >= lvGoals[i] && !Game.Achievements[key].ach[i])
      unlockAchievement(key, i);
  }

  giveSpecialLoot(key);

  save(`${item.oreId}Lv`, ore.lv);

  elem(`${key}Lv`).innerHTML = ore.lv;
  elem('oreLv').innerHTML = ore.lv;
}
/*===========================================================
=         Give Loot                                         =
===========================================================*/
function giveLoot(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];
  let inv = Game.Inventory[item.oreId];
  let acc = Game.Account;

  let resGain = Math.floor(10 * Math.pow(1.02, ore.lv));

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
  acc.character.total[item.oreId] += resGain;

  for(i in resGoals) {
    if(acc.character.total[item.oreId] >= resGoals[i] && !Game.Achievements[item.oreId].ach[i])
      unlockAchievement(item.oreId, i);
  }

  generateResource(item.oreId, resGain);
  numPopUp(item.oreId);
  canBuyUpgrade();

  save(`${item.oreId}Amount`, inv.amount);
	save(`${item.oreId}Total`, acc.character.total[item.oreId]);

  elem(`${item.oreId}Amount`).innerHTML = nFormat(inv.amount);
  elem(`${item.oreId}Total`).innerHTML = nFormat(acc.character.total[item.oreId]);
}
/*===========================================================
=         Animate Stat Num                                  =
===========================================================*/
function numPopUp(key) {
  let frame = 0;
  let scale = 1;

  let animateScale = setInterval(function() {
    frame ++;

    if(frame <= Game.fps / 4)
      scale += 0.015;
    if(frame >= Game.fps / 4)
      scale -= 0.015;

    elem(`${key}Amount`).style.transform = `scale(${scale})`;

    if(frame >= Game.fps / 2) {
      elem(`${key}Amount`).style.transform = `scale(1)`;
      clearInterval(animateScale);
    }

  }, 1000 / Game.fps)
}
/*===========================================================
=         Give XP                                           =
===========================================================*/
function giveXp() {
  let acc = Game.Account;
  let width = acc.character.stats.xp / acc.character.stats.xpReq * 100;

  acc.character.stats.xp ++;

  if(acc.character.stats.xp > acc.character.stats.xpReq) {
    acc.character.stats.lv ++;
    acc.character.stats.xp = 0;
    acc.character.stats.xpReq = 30 * Math.pow(1.5, acc.character.stats.lv);

    giveMastery();
    save('characterLv', acc.character.stats.lv);
  }

  elem('charXp').innerHTML = nFormat(acc.character.stats.xp) + ' / ' + nFormat(acc.character.stats.xpReq);
  save('characterXp', acc.character.stats.xp);
  progressBar('character', width);
}
/*===========================================================
=         Give Special Loot                                 =
===========================================================*/
function giveSpecialLoot(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];
  let inv = Game.Inventory;
  let acc = Game.Account;

  let rand = Math.floor(Math.random() * 100 + 1);

  if(rand < ore.darkMatterRate) {
    inv.darkMatter.amount += 1;

    generateResource('darkMatter', 1);
    numPopUp('darkMatter');
    updateAscensions();

    save('darkMatterAmount', inv.darkMatter.amount);

    elem('darkMatterAmount').innerHTML = nFormat(inv.darkMatter.amount);
  }

  if(rand < ore.antiMatterRate) {
    inv.antiMatter.amount += 1;
    acc.character.total.antiMatter ++;

    generateResource('antiMatter', 1);
    numPopUp('antiMatter');
    canCraft();

    save('antiMatterAmount', inv.antiMatter.amount);
    save('antiMatterTotal', acc.character.total.antiMatter);
    elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
    elem('antiMatterTotal').innerHTML = nFormat(acc.character.total.antiMatter);
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

    craft.status = false;
    craft.remaining = 600000;

		save(key + 'Remaining', craft.remaining);
		save(key + 'Status', craft.status);
  }

  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let ore = Game.Ores[item.oreId];

    item.current = false;
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

  connected = false;
  ascend('earth');
}
/*===========================================================
=					Update Progress Bar																=
===========================================================*/
function progressBar(key, width) {
  elem(`${key}Progress`).style.width = width + '%';
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
