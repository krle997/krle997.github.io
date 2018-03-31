/*===========================================================
=					Game																							=
===========================================================*/
var Game = {
  version: 'v1.0.2',
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

		if(load(ore.id + 'Lv'))
			ore.lv = load(ore.id + 'Lv');
		if(load(ore.id + 'Hp'))
			ore.hp = load(ore.id + 'Hp');
    if(load(key + 'isCurrent'))
      item.isCurrent = load(key + 'isCurrent');
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
  generateDonate();
  generateAchievements();
  generateMasteries();
  generateUpgrades();
  generateCrafting();
  generateAscensions();
  generateOreStats();
  generateDamage();
  generateInventory();

  updateAccount();
  updateAchievements();
  updateMasteries();
  updateUpgrades();
  updateCrafting();
  updateAscensions();
  updateOreStats();
  updateInventory();
  updateDamage();

  muteSounds();

  let gameLoopInt = setInterval(function() {
    gameLoop();
  }, 1000);

  let spawnAntiMatterTo = setTimeout(function() {
    generateCollectable('antiMatter');
  }, 60000);

  let spawnFrostCrystalTo = setTimeout(function() {
    generateCollectable('frostCrystal');
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

  if(acc.character.critHit) {
    ore.hp -= acc.character.dpc * 2;
    acc.character.total.critHits ++;
    acc.character.critHit = false;

    generateFloatingText(`- ${nFormat(acc.character.dpc * 2)} <img class='imgFix' src='img/character/dps16.png'/>`, event.clientX, event.clientY - 20);

    save(ore.id + 'Hp', ore.hp);
		save('critHitsTotal', acc.character.total.critHits);
    elem('critHitsTotal').innerHTML = nFormat(acc.character.total.critHits);
  } else {
    ore.hp -= acc.character.dpc;
    acc.character.total.clicks ++;

    generateFloatingText(`- ${nFormat(acc.character.dpc)} <img class='imgFix' src='img/character/dps16.png'/>`, event.clientX, event.clientY - 20);

    save(ore.id + 'Hp', ore.hp);
  	save('clicksTotal', acc.character.total.clicks);
    elem('clicksTotal').innerHTML = nFormat(acc.character.total.clicks);
  }

  if(ore.hp <= 0)
    oreClear(key);

  healthBar(key);
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
    opacity -= 1 / Game.fps;
    distance ++;

    elem('floatingText' + id).style.top = y - distance + 'px';
    elem('floatingText' + id).style.opacity = opacity;

    if(frame >= Game.fps) {
      clearInterval(interval);
      elem('floatingText' + id).parentNode.removeChild(elem('floatingText' + id));
    }
  }, 1000 / Game.fps);
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
=         Generate Collectable                              =
===========================================================*/
function generateCollectable(key) {
  let id = Math.random();
  let x = Math.floor(Math.random() * (448 - 0) + 0);
  let y = Math.floor(Math.random() * (384 - 256) + 256);
  let content = `<img class='ress' id='res${id}' src='img/inv/${key}.png'/>`;

  elem('resourceContainer').insertAdjacentHTML('beforeend', content);
  elem('res' + id).style.left = x + 'px';
  elem('res' + id).style.top = y + 'px';
  elem('res' + id).style.opacity = 0;
  resourceFadeIn(id);

  let pos = elem('res' + id).getBoundingClientRect();

  elem('res' + id).onclick = function() {
    elem('res' + id).onclick = function() {};
    collect(key);
    animateResource(id, x, y);
    generateFloatingText(`+ 1 <img class='imgFix' src='img/inv/${key}16.png'/>`, pos.left, pos.top);

    let timeout = setTimeout(function() {
      generateCollectable(key);
    }, 60000);
  }

  if(!Game.muted) {
    let sound = new Audio('sounds/spawn.wav');
    sound.play();
  }
}
/*===========================================================
=         Collect                                           =
===========================================================*/
function collect(key) {
  let inv = Game.Inventory[key];
  let acc = Game.Account;

  inv.amount ++;
  acc.character.total[key] ++;

  save(key + 'Amount', inv.amount);
  save(key + 'Total', acc.character.total[key]);
  elem(key + 'Amount').innerHTML = nFormat(inv.amount);
  elem(key + 'Total').innerHTML = nFormat(acc.character.total[key]);
  elem(key + 'Num').style.animation = 'breathe .5s ease-in-out';
  canCraft();

  if(!Game.muted) {
    let sound = new Audio('sounds/collect.wav');
    sound.play();
  }
}
/*===========================================================
=         Generate Resources                                =
===========================================================*/
function generateResource(ore, amount) {
  let id = Math.random();
  let x = 224;
  let y = Math.floor(Math.random() * (384 - 256) + 256);
  let content = `<img class='ress' id='res${id}' src='img/inv/${ore}.png'/>`;

  elem('resourceContainer').insertAdjacentHTML('beforeend', content);
  elem('res' + id).style.left = x + 'px';
  elem('res' + id).style.top = y + 'px';

  let pos = elem('res' + id).getBoundingClientRect();

  animateResource(id, x, y);
  generateFloatingText(`+ ${nFormat(amount)} <img class='imgFix' src='img/inv/${ore}16.png'/>`, pos.left, pos.top);
}
/*===========================================================
=         Resource Fade In                                  =
===========================================================*/
function resourceFadeIn(id) {
  let frame = 0;
  let opacity = 0;

  let interval = setInterval(function() {
    frame ++;
    opacity += 1 / Game.fps;
    elem('res' + id).style.opacity = opacity;

    if(frame >= Game.fps) {
      clearInterval(interval);
      elem('res' + id).style.opacity = 1;
    }
  }, 1000 / Game.fps);
}
/*===========================================================
=         Animate Resources                                 =
===========================================================*/
function animateResource(id, x, y) {
  let pos = elem('resourceContainer').getBoundingClientRect();
  let gravityPull = 0;
  let bounce = 0.7;
  let bounced = false;
  let opacity = 1;
  let side = Math.random();

  let interval = setInterval(function() {
    gravityPull += 0.1;

    if(side > 0.5)
      x -= 0.5;
    else
      x += 0.5;

    y += gravityPull;

    elem('res' + id).style.left = x + 'px';
    elem('res' + id).style.top = y + 'px';

    if(y >= pos.bottom - 64) {
      y = pos.bottom - 64;
      gravityPull = -(gravityPull * bounce);
      bounced = true;
    }

    if(bounced) {
      opacity -= (1 / Game.fps) / 2;
      elem('res' + id).style.opacity = opacity;
    }

    if(opacity <= 0) {
      clearInterval(interval);
      elem('res' + id).style.opacity = 0;
      elem('res' + id).parentNode.removeChild(elem('res' + id));
    }
  }, 1000 / Game.fps);
}
/*===========================================================
=         Ore Clear                                         =
===========================================================*/
function oreClear(key) {
  let ore = Game.Ascensions[key].ore;

  ore.hp = 0;
  ore.prog ++;

  clearInterval(doDpsINT);

  elem('oreImg').onclick = function () {};
  elem(ore.id + 'Num').style.animation = '';
  elem('lvProgress').style.width = ore.prog * 10 + '%';
  save(ore.id + 'Hp', ore.hp);
  save(ore.id + 'Prog', ore.prog);

  if(ore.prog >= 10) {
    ore.prog = 0;
    elem('lvProgress').style.width = ore.prog * 10 + '%';
    save(ore.id + 'Prog', ore.prog);
  }

  oreLvUpTO = setTimeout(function() {
    oreLvUp(key);
  }, 500);
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

  generateResource(ore.id, resGain);

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
  elem(ore.id + 'Num').style.animation = 'breathe .5s linear';
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
=         Check Dark Matter                                 =
===========================================================*/
function checkDarkMatter() {
  let inv = Game.Inventory;
  let rand = Math.floor(Math.random() * 100 + 1);
  let req = 90;

  if(rand > req) {
    inv.darkMatter.amount += 1;

    generateResource('darkMatter', 1);

    updateAscensions();
    save('darkMatterAmount', inv.darkMatter.amount);
    elem('darkMatterAmount').innerHTML = nFormat(inv.darkMatter.amount);
  }
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
=			HTML onload?      					       	             			=
===========================================================*/
window.onload = function() { generateContent(); }
