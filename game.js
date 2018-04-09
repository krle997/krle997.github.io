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
		let ore = item.ore;

    if(load(ore.id + 'Prog'))
      ore.prog = load(ore.id + 'Prog');
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
      progBar(item.remaining / 1000, key, width);
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
  let penetrate = ore.armor / 100 * acc.character.stats.armorPen;
  let damage = (acc.character.stats.dps - (ore.armor - penetrate)) / Game.fps;

  if(ore.armor - penetrate >= acc.character.stats.dps || acc.character.stats.dps <= 0)
    return;

  ore.hp -= damage;
	save(ore.id + 'Hp', ore.hp);

  if(ore.hp <= 0)
    zeroHp(key);

  healthBar(key);
}
/*===========================================================
=         Damage per Click                                  =
===========================================================*/
function doDpc(key) {
  let ore = Game.Ascensions[key].ore;
  let acc = Game.Account;

  if(acc.character.stats.critChance > 0)
    checkCrit();

  if(acc.character.stats.critHit) {
    ore.hp -= acc.character.stats.dpc * 2;
    acc.character.total.critHits ++;
    acc.character.stats.critHit = false;

    generateFloatingText(`- ${nFormat(acc.character.stats.dpc * 2)} <img class='imgFix' src='img/character/dps16.png'/>`, event.clientX, event.clientY - 20);

    save(ore.id + 'Hp', ore.hp);
		save('critHitsTotal', acc.character.total.critHits);
    elem('critHitsTotal').innerHTML = nFormat(acc.character.total.critHits);
  } else {
    ore.hp -= acc.character.stats.dpc;
    acc.character.total.clicks ++;

    generateFloatingText(`- ${nFormat(acc.character.stats.dpc)} <img class='imgFix' src='img/character/dps16.png'/>`, event.clientX, event.clientY - 20);

    save(ore.id + 'Hp', ore.hp);
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
  let content = `<img class='ress' id='res${id}' src='img/inv/${ore}.png'/>`;

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
  clearInterval(doDpsINT);
  elem('oreImg').onclick = function () {};
}
function startDamage(key) {
  elem('oreImg').onclick = function() {
    doDpc(key);
  };

  doDpsINT = setInterval(function() {
    doDps(key);
  }, 1000 / Game.fps);
}
/*===========================================================
=         Zero Hp                                           =
===========================================================*/
function zeroHp(key) {
  let ore = Game.Ascensions[key].ore;

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

  if(ore.prog >= 10) {
    ore.prog = 0;
  	ore.lv ++;

    giveSpecialLoot(key);

    save(ore.id + 'Lv', ore.lv);
    elem(key + 'Lv').innerHTML = ore.lv;
  	elem('oreLv').innerHTML = ore.lv;
  }

  oreProgressBar(key);

  rewarded = true;

  save(ore.id + 'Hp', ore.hp);
  save(ore.id + 'Prog', ore.prog);
  save('rewarded', rewarded);

  //elem(ore.id + 'Num').style.animation = '';

  oreClearTO = setTimeout(function() {
    resetOre(key);
    startDamage(key);
  }, 500);
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
=         Update Progress Bar                               =
===========================================================*/
function oreProgressBar(key) {
  let ore = Game.Ascensions[key].ore;
  let width = ore.prog * 10;

  elem('lvProgress').style.width = width + '%';
}
/*===========================================================
=         Reset Ore                                         =
===========================================================*/
function resetOre(key) {
  let ore = Game.Ascensions[key].ore;

  let oreMaxHp = Math.floor(ore.baseHp * Math.pow(1.03, ore.lv));
  ore.hp = oreMaxHp;
  ore.maxHp = oreMaxHp;

  rewarded = false;
  save('rewarded', rewarded);
  elem('oreMaxHp').innerHTML = nFormat(ore.maxHp);
}
/*===========================================================
=         Give Loot                                         =
===========================================================*/
function giveLoot(key) {
  let item = Game.Ascensions[key];
  let ore = item.ore;
  let inv = Game.Inventory[ore.id];
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
  acc.character.total[ore.id] += resGain;

  for(i in resGoals) {
    if(acc.character.total[ore.id] >= resGoals[i] && !Game.Achievements[ore.id].ach[i])
      unlockAchievement(ore.id, i);
  }

  generateResource(ore.id, resGain);
  canBuyUpgrade();

  elem(ore.id + 'Amount').innerHTML = nFormat(inv.amount);
  elem(ore.id + 'Total').innerHTML = nFormat(acc.character.total[ore.id]);
  //elem(ore.id + 'Num').style.animation = 'breathe .5s linear';

  save(ore.id + 'Amount', inv.amount);
	save(ore.id + 'Total', acc.character.total[ore.id]);
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
  let inv = Game.Inventory;
  let item = Game.Ascensions[key];
  let ore = item.ore;
  let acc = Game.Account;

  let rand = Math.floor(Math.random() * 100 + 1);

  if(rand < ore.darkMatterRate) {
    inv.darkMatter.amount += 1;

    generateResource('darkMatter', 1);
    updateAscensions();

    save('darkMatterAmount', inv.darkMatter.amount);
    elem('darkMatterAmount').innerHTML = nFormat(inv.darkMatter.amount);
  }

  if(rand < ore.antiMatterRate) {
    inv.antiMatter.amount += 1;
    acc.character.total.antiMatter ++;

    generateResource('antiMatter', 1);
    canCraft();

    save('antiMatterAmount', inv.antiMatter.amount);
    save('antiMatterTotal', acc.character.total.antiMatter);
    elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
    elem('antiMatterTotal').innerHTML = nFormat(acc.character.total.antiMatter);
    //elem('antiMatterNum').style.animation = 'breathe .5s ease-in-out';
  }
}
/*===========================================================
=					Microverse Ascension															=
===========================================================*/
function microverseAscension() {
	let inv = Game.Inventory;

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
function progressBar(key, width) {
  let ctx = elem(key + 'Bar').getContext('2d');
  let degrees = ((width / 100) * Math.PI * 2 * 10);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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

function progBar(num, key, width) {
  elem(key + 'ItemProg').style.width = width + '%';
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
