/*===========================================================
=					Game																							=
===========================================================*/
var Game = {
  version: 'v0.9.9',
  author: 'Krle',
  fps: 60,
  muted: true,

  time: {
    seconds: 0,
		minutes: 0,
		hours: 0
  }
}

var doDpsINT;
var saveINT;
var spwnAnimINT;

var oreLvUpTO;
var spawnAntimatterTO;

var connected = false;
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
		let ore = item.ore;
		let inv = Game.Inventory[ore.id];

		if(load(ore.id + 'Lv'))
			ore.lv = load(ore.id + 'Lv');
		if(load(ore.id + 'Hp'))
			ore.hp = load(ore.id + 'Hp');
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
    Game.Account.character.lv = load('characterLv');
  }

  if(load('characterXp')) {
    Game.Account.character.xp = load('characterXp');
  }
}
/*===========================================================
=					Generate Game																			=
===========================================================*/
function generateContent() {
  loadGame();

  generateModals();
  generateAccount();
  generateAchievements();
  generateMasteries();
  generateUpgrades();
  generateCrafting();
  generateAscensions();
  generateStore();
  generateOreStats();
  generateDamage();
  generateInventory();
  generateContextMenu();

  updateAccount();
  updateAchievements();
  updateMasteries();
  updateUpgrades();
  updateCrafting();
  updateAscensions();
  updateStore();
  updateOreStats();
  updateInventory();
  updateDamage();

  muteSounds();
	expand('upgradeItems');

  let gameLoopInt = setInterval(function() {
    gameLoop();
  }, 1000);

	let spawnAntiMatterInt = setInterval(function() {
    spawnAntiMatter();
  }, 60000);

  let spawnFrostCrystalInt = setInterval(function() {
    spawnFrostCrystal();
  }, 150000);
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
      save(key + 'Remaining', item.remaining);

      if(item.remaining <= 0) {
        item.status = false;
        item.remaining = 600000;

        save(key + 'Remaining', item.remaining);
				save(key + 'Status', item.status);
        updateDamage();
				updateCrafting();

        elem(key + 'Img').style.animation = '';
      }

      let width = 100 / (600000 / item.remaining);
      progressBar(item.remaining / 1000, key, width);
    }
  }

  elem('timePlayed').innerHTML = Game.time.hours + 'h ' + Game.time.minutes + 'm';
}
/*===========================================================
=         Damage per Second                                 =
===========================================================*/
function doDps(key) {
  let ore = Game.Ascensions[key].ore;
  let acc = Game.Account;
  let penetrate = ore.armor / 100 * acc.character.armorPen;
  let damage = (acc.character.dps - (ore.armor - penetrate)) / Game.fps;

  if(ore.armor - penetrate >= acc.character.dps || acc.character.dps <= 0)
    return;

  ore.hp -= damage;
	save(ore.id + 'Hp', ore.hp);

  if(ore.hp <= 0)
    oreClear(key);

  healthBar(key);
}
/*===========================================================
=         Damage per Click                                  =
===========================================================*/
function doDpc(key) {
  let ore = Game.Ascensions[key].ore;
  let acc = Game.Account;

  if(acc.character.critChance > 0)
    checkCrit();

  ore.hp -= acc.character.dpc;
  acc.character.total.clicks ++;

  save(ore.id + 'Hp', ore.hp);
	save('clicksTotal', acc.character.total.clicks);

  if(acc.character.critHit) {
    ore.hp -= acc.character.dpc;
    acc.character.total.critHits ++;
    acc.character.critHit = false;

		save('critHitsTotal', acc.character.total.critHits);
    elem('critHitsTotal').innerHTML = nFormat(acc.character.total.critHits);
  }

  if(ore.hp <= 0)
    oreClear(key);

  healthBar(key);
  elem('clicksTotal').innerHTML = nFormat(acc.character.total.clicks);
  elem('oreImg').style.animation = 'ore-click-animation .1s';

  let oreClickAnimTO = setTimeout(function() {
    elem('oreImg').style.animation = '';
  }, 10);

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
  let req = 100 - acc.character.critChance;

  if(rand > req)
    acc.character.critHit = true;
}
/*===========================================================
=         Update Health Bar                                 =
===========================================================*/
function healthBar(key) {
  let ore = Game.Ascensions[key].ore;
  let width = ore.hp * 100 / ore.maxHp;

  elem('oreHpBar').style.width = width + '%';
  elem('oreHp').innerHTML = nFormat(ore.hp);
}
/*===========================================================
=         Ore Clear                                         =
===========================================================*/
function oreClear(key) {
  let ore = Game.Ascensions[key].ore;

  ore.hp = 0;

  clearInterval(doDpsINT);

  elem('oreImg').onclick = function () {};
  save(ore.id + 'Hp', ore.hp);

  oreLvUpTO = setTimeout(function() {
    oreLvUp(key);
  }, 500);
}
/*===========================================================
=         Check Dark Matter                                 =
===========================================================*/
function checkDarkMatter() {
  let inv = Game.Inventory;
  let number = Math.random() * 100 + 1;
  let req = 90;

  if(number > req) {
    inv.darkMatter.amount += 1;

    updateAscensions();
    save('darkMatterAmount', inv.darkMatter.amount);
    elem('darkMatterAmount').innerHTML = nFormat(inv.darkMatter.amount);
  }
}
/*===========================================================
=         Ore Level Up                                      =
===========================================================*/
function oreLvUp(key) {
  let item = Game.Ascensions[key];
  let ore = item.ore;
  let inv = Game.Inventory[ore.id];
  let acc = Game.Account;

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

  let resGain = Math.floor(10 * Math.pow(1.02, ore.lv));
  inv.amount += resGain;
  acc.character.total[ore.id] += resGain;
	ore.lv ++;
  acc.character.xp ++;

  if(acc.character.xp > acc.character.xpReq)
    charLvUp();

  let width = acc.character.xp / acc.character.xpReq * 100;
  progressBar(acc.character.lv, 'character', width);

  let oreMaxHp = Math.floor(ore.baseHp * Math.pow(1.03, ore.lv));
  let totalPlut = Game.Account.character.total.plutonium;

  ore.maxHp = oreMaxHp;
  ore.hp = oreMaxHp;

	save(ore.id + 'Amount', inv.amount);
	save(ore.id + 'Total', acc.character.total[ore.id]);
  save(ore.id + 'Lv', ore.lv);
	save('characterXp', acc.character.xp);

  checkDarkMatter();
  canBuyUpgrade();
  healthBar(key);

  elem(key + 'Lv').innerHTML = ore.lv;
  elem('charXp').innerHTML = nFormat(acc.character.xp) + ' / ' + nFormat(acc.character.xpReq);
  elem(ore.id + 'Amount').innerHTML = nFormat(inv.amount);
  elem(ore.id + 'Total').innerHTML = nFormat(acc.character.total[ore.id]);
	elem('oreLv').innerHTML = ore.lv;
  elem('oreMaxHp').innerHTML = nFormat(ore.maxHp);

  for(i in resGoals) {
    if(acc.character.total[ore.id] >= resGoals[i] && !Game.Achievements[ore.id].ach[i])
      unlockAchievement(ore.id, i);
  }

  elem('oreImg').onclick = function() {
    doDpc(key);
  };

  doDpsINT = setInterval(function() {
    doDps(key);
  }, 1000 / Game.fps);
}
/*===========================================================
=					Character Level Up																=
===========================================================*/
function charLvUp() {
  let acc = Game.Account;

  acc.character.lv ++;
  acc.character.xp = 0;
  acc.character.xpReq = 30 * Math.pow(1.5, acc.character.lv);

  let width = acc.character.xp / acc.character.xpReq * 100;
  progressBar(acc.character.lv, 'character', width);

  giveMastery();

	save('characterLv', acc.character.lv);
	save('characterXp', acc.character.xp);
}
/*===========================================================
=					Microverse Ascension															=
===========================================================*/
function microverseAscension() {
	let inv = Game.Inventory;

  clearTimeout(oreLvUpTO);
  clearInterval(doDpsINT);
  elem('oreImg').onclick = function () {};

  inv.concentratedDarkMatter.amount += inv.darkMatter.amount;
  inv.darkMatter.amount = 0;
  inv.titanium.amount = 0;
  inv.plutonium.amount = 0;
  inv.chrysonite.amount = 0;
  inv.armadium.amount = 0;
  inv.solanium.amount = 0;
  inv.hawkingRadiation.amount = 0;

	for(key in inv)
		save(key + 'Amount', inv[key].amount);

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
    let asc = Game.Ascensions[key];
    let ore = asc.ore;

    asc.ascendTo = false;
    asc.isCurrent = false;
    ore.lv = 1;
    ore.hp = ore.baseHp;

		save(ore.id + 'Lv', ore.lv);
		save(ore.id + 'Hp', ore.hp);
  }

  lockUpgrades();
  lockCrafting();
  lockAscensions();
  lockInventory();

  unlockEarth();

  updateUpgrades();
  updateCrafting();
  updateAscensions();
  updateOreStats();
  updateInventory();
  updateDamage();

  connected = false;
  ascend('earth');
}
/*===========================================================
=			Spawn antimatter																			=
===========================================================*/
function spawnAntiMatter() {
  let spawnX = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  let spawnY = Math.floor(Math.random() * (80 - 20 + 1)) + 20;

  elem('antiMatterSpawn').onclick = function () {
    collectAntiMatter();
  }

  elem('antiMatterSpawn').style.left = spawnX + '%';
  elem('antiMatterSpawn').style.top = spawnY + '%';
  elem('antiMatterSpawn').style.animation = 'antimatter-spawn-anim 10s forwards';
  elem('antiMatterSpawn').style.display = 'initial';

  spawnAntimatterTO = setTimeout(function() {
    elem('antiMatterSpawn').style.display = 'none';
  }, 10000);

  if(!Game.muted) {
    let sound = new Audio('sounds/spawn.wav');
    sound.play();
  }
}
/*===========================================================
=			Collect antimatter																		=
===========================================================*/
function collectAntiMatter() {
  clearTimeout(spawnAntimatterTO);

  elem('antiMatterSpawn').onclick = function() {};
  elem('antiMatterSpawn').style.animation = '';
  elem('antiMatterAnim').style.animation = '';

  let startX = elem('antiMatterSpawn').getBoundingClientRect().left;
  let startY = elem('antiMatterSpawn').getBoundingClientRect().top;

  let endX = elem('antiMatterLoc').getBoundingClientRect().left;
  let endY = elem('antiMatterLoc').getBoundingClientRect().top;

  let moveToX = 0;
  let moveToY = 0;

  let curFrame = 0;

  spwnAnimINT = setInterval(function() {
    antiMatterAnim();
  }, 1000 / Game.fps);

  function antiMatterAnim() {
    curFrame ++;

    if(curFrame <= Game.fps) {
      moveToX += (endX - startX) / 100 * (100 / Game.fps);
      moveToY += (endY - startY) / 100 * (100 / Game.fps);

      elem('antiMatterSpawn').style.left = startX + moveToX + 'px';
      elem('antiMatterSpawn').style.top = startY + moveToY + 'px';
    }
    else if(curFrame > Game.fps) {
			let inv = Game.Inventory;
      clearInterval(spwnAnimINT);

      inv.antiMatter.amount ++;
      Game.Account.character.total.antiMatter ++;

			save('antiMatterAmount', inv.antiMatter.amount);
			save('antiMatterTotal', Game.Account.character.total.antiMatter);

      elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
      elem('antiMatterTotal').innerHTML = nFormat(Game.Account.character.total.antiMatter);
      elem('antiMatterSpawn').style.display = 'none';
      elem('antiMatterAnim').style.animation = 'antimatter-anim .5s ease-in-out';
      canCraft();
    }
  }

  if(!Game.muted) {
    let sound = new Audio('sounds/collect.wav');
    sound.play();
  }
}
var spawnFrostCrystalTo;
var frostCrystalAnimInt;

function spawnFrostCrystal() {
  let spawnX = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  let spawnY = Math.floor(Math.random() * (80 - 20 + 1)) + 20;

  elem('frostCrystalSpawn').onclick = function () {
    collectFrostCrystal();
  }

  elem('frostCrystalSpawn').style.left = spawnX + '%';
  elem('frostCrystalSpawn').style.top = spawnY + '%';
  elem('frostCrystalSpawn').style.animation = 'antimatter-spawn-anim 10s forwards';
  elem('frostCrystalSpawn').style.display = 'initial';

  spawnFrostCrystalTo = setTimeout(function() {
    elem('frostCrystalSpawn').style.display = 'none';
  }, 10000);

  if(!Game.muted) {
    let sound = new Audio('sounds/spawn.wav');
    sound.play();
  }
}
function collectFrostCrystal() {
  clearTimeout(spawnFrostCrystalTo);

  elem('frostCrystalSpawn').onclick = function() {};
  elem('frostCrystalSpawn').style.animation = '';

  frostCrystalAnimInt = setInterval(function() {
    frostCrystalAnim();
  }, 1000 / Game.fps);

  let startX = elem('frostCrystalSpawn').getBoundingClientRect().left;
  let startY = elem('frostCrystalSpawn').getBoundingClientRect().top;

  let endX = elem('frostCrystalLoc').getBoundingClientRect().left;
  let endY = elem('frostCrystalLoc').getBoundingClientRect().top;

  let moveToX = 0;
  let moveToY = 0;

  let curFrame = 0;

  function frostCrystalAnim() {


    curFrame ++;

    if(curFrame <= Game.fps) {
      moveToX += (endX - startX) / 100 * (100 / Game.fps);
      moveToY += (endY - startY) / 100 * (100 / Game.fps);

      elem('frostCrystalSpawn').style.left = startX + moveToX + 'px';
      elem('frostCrystalSpawn').style.top = startY + moveToY + 'px';
    }
    else if(curFrame > Game.fps) {
			let inv = Game.Inventory;
      let acc = Game.Account;
      let reward = Math.random() * (5 - 1) + 1
      clearInterval(frostCrystalAnimInt);

      inv.frostCrystal.amount += reward;
      acc.character.total.frostCrystal += reward;

			save('frostCrystalAmount', inv.frostCrystal.amount);
			save('frostCrystalTotal', acc.character.total.frostCrystal);

      elem('frostCrystalAmount').innerHTML = inv.frostCrystal.amount.toFixed(3);
      elem('frostCrystalTotal').innerHTML = acc.character.total.frostCrystal.toFixed(3);
      elem('frostCrystalSpawn').style.display = 'none';
      elem('frostCrystalAnim').style.animation = 'antimatter-anim .5s ease-in-out';
    }
  }

  if(!Game.muted) {
    let sound = new Audio('sounds/collect.wav');
    sound.play();
  }
}
/*===========================================================
=					Update Progress Bar																=
===========================================================*/
function progressBar(num, key, width) {
  let ctx = elem(key + 'Bar').getContext('2d');
  let degrees = ((width / 100) * Math.PI * 2 * 10);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.textAlign = 'center';
  ctx.font = '12px conthrax';
  ctx.fillText(num, 32, 36);

  ctx.beginPath();
  ctx.arc(32, 32, 28, (Math.PI / 180) * 270, (Math.PI / 180) * (270 * 360));
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(128, 128, 128, 1)';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(32, 32, 28, (Math.PI / 180) * 270, degrees / 10 + (Math.PI / 180) * 270);
  ctx.lineWidth = 4;
  ctx.strokeStyle =	'#29B6F6';
  ctx.stroke();
}
/*===========================================================
=			Generate context menu																	=
===========================================================*/
function generateContextMenu() {
	let contextMenu = {
		name: [
			'Changelog',
			'Wiki',
	    'Settings',
			'Donate'
		],
		onclick: [
			'openModal("changelog")',
			'openModal("wiki")',
	    'openModal("settings")',
			'openModal("donate")'
		]
	}

	for(i = 0; i < contextMenu.name.length; i ++) {
    let name = contextMenu.name[i];
    let onclick = contextMenu.onclick[i];

		let content = `<div class='context-item' onclick='${onclick}'>${name}</div>`;

		elem('contextContainer').innerHTML += content;
	}
}
/*===========================================================
=			Open context menu							    										=
===========================================================*/
function contextMenu() {
	let cursorX = event.clientX;
	let cursorY = event.clientY;

  let documentHeight = document.documentElement.getBoundingClientRect().height;
  let documentWidth = document.documentElement.getBoundingClientRect().width;

  if(documentHeight <= cursorY + 128) {
    elem('contextContainer').style.top = cursorY - 128 + 'px';
  } else {
    elem('contextContainer').style.top = cursorY + 'px';
  }

  if(documentWidth <= cursorX + 200) {
    elem('contextContainer').style.left = cursorX - 200 + 'px';
  } else {
    elem('contextContainer').style.left = cursorX + 'px';
  }

	elem('contextContainer').style.display = 'initial';

	return false;
}
/*===========================================================
=			Close context menu							    									=
===========================================================*/
function closeContextMenu() {
  elem('contextContainer').style.display = 'none';
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
			return(num / si[i].value).toFixed(1).replace(rx, '$1') + si[i].symbol;
		}
	}

	return num.toFixed(1).replace(rx, '$1');
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
/*===========================================================
=			Expand Items																					=
===========================================================*/
function expand(which) {
	let MINIMIZE = [
		'accountItems',
		'upgradeItems',
		'craftItems',
		'ascensionItems',
    'storeItems'
	]
	for(i = 0; i < MINIMIZE.length; i ++) {
    let id = MINIMIZE[i];
		elem(id).style.display = 'none';
	}

	elem(which).style.display = 'grid';
}
/*===========================================================
=			Display notification ! FIX !													=
===========================================================*/
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

function setClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
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
=			Context menu event listener      		             			=
===========================================================*/
window.addEventListener('contextmenu', function(i) {
    i.preventDefault();
    contextMenu();
}, false)
/*===========================================================
=			HTML onclick?      						                  			=
===========================================================*/
window.onclick = function() { closeContextMenu(); }
/*===========================================================
=			HTML onload?      					       	             			=
===========================================================*/
window.onload = function() { generateContent(); }
