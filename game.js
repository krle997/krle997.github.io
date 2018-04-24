/*===========================================================
=					Game																							=
===========================================================*/
var Game = {
  name: 'No Mans Click',
  version: 'v0.9 Alpha',
  author: 'Krle',
  fps: 60,
  muted: true,
  buyQuantity: 1,

  time: {
    seconds: 0,
		minutes: 0,
		hours: 0
  },

  connected: false,
  debugging: false,

  resetOreTo: null,
  tutorialTo: null,

  dpsAnimFrame: null,
  dpsAnimStart: null,

  gameLoopInt: null,
  gameLoopStarted: null,

  res: {},
  resAnimFrame: null,
  resFadeOutAnim: null,

  fText: {},
  fTextAnimFrame: null,

  ntf: {},
  ntfAnimFrame: null,
  ntfFadeOutStart: null,
  ntfFadeOutFrame: null
}
/*===========================================================
=					Miscellaneous																			=
===========================================================*/
function elem(key) {
  return document.getElementById(key);
}

function save(key, num) {
	return localStorage.setItem(key, JSON.stringify(num));
}

function load(key) {
	return JSON.parse(localStorage.getItem(key));
}

function openModal(key) {
  elem(`${key}Modal`).style.display = 'initial';
}

function closeModal(key) {
  elem(`${key}Modal`).style.display = 'none';
}

function cl(key) {
  if(Game.debugging)
    return console.log(key);
}
/*===========================================================
=         Game Tab Activity                             		=
===========================================================*/
var hidden, visibilityChange;
if(typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
}
else if(typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = "msvisibilitychange";
}
else if(typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}



if(typeof document.addEventListener === 'undefined' || typeof document.hidden === 'undefined') {
  cl('This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.');
}
else {

}
/*===========================================================
=         Window Loaded                                     =
===========================================================*/
window.addEventListener('load', generateGame);
/*===========================================================
=					Load Game																					=
===========================================================*/
function loadGame() {
	for(key in Game.Upgrades) {
		let item = Game.Upgrades[key];

		if(load(`${key}Lv`))
			item.lv = load(`${key}Lv`);
	}

	for(key in Game.Crafting) {
		let item = Game.Crafting[key];

		if(load(`${key}Active`))
			item.active = load(`${key}Active`);
		if(load(`${key}Remaining`))
			item.remaining = load(`${key}Remaining`);
	}

  for(key in Game.Masteries) {
    let item = Game.Masteries[key];

    if(load(`${key}Lv`))
      item.lv = load(`${key}Lv`);
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
      item.rewarded = load(`${key}Rewarded`);
  }

	for(key in Game.Inventory) {
		let inv = Game.Inventory[key];

		if(load(`${key}Amount`))
			inv.amount = load(`${key}Amount`);
	}

	for(key in Game.time) {
		if(load(key))
			Game.time[key] = load(key);
	}

  for(key in Game.Character.total) {
    if(load(`${key}Total`))
      Game.Character.total[key] = load(`${key}Total`);
  }

  for(key in Game.Character.highestLv) {
    if(load(`${key}HighestLv`))
      Game.Character.highestLv[key] = load(`${key}HighestLv`);
  }

  if(load('characterLv'))
    Game.Character.lv = load('characterLv');

  if(load('characterXp'))
    Game.Character.xp = load('characterXp');

  if(load('buyQuantity'))
    Game.buyQuantity = load('buyQuantity');

  for(key in Game.Achievements) {
    for(i in Game.Achievements[key].ach) {
      if(load(key + i))
        Game.Achievements[key].ach[i] = load(key + i);
    }
  }

  if(load('notifications')) {
    Game.ntf = load('notifications');

    for(key in Game.ntf) {
      let item = Game.ntf[key];

      loadNtf(key, item.header, item.content);
    }
  }

  cl('loadGame()');
}
/*===========================================================
=					Generate Game																			=
===========================================================*/
function generateGame() {
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

  Game.gameLoopStarted = performance.now();
  Game.gameLoopInt = setInterval(function() {
    gameLoop();
  }, 1000);

  cl('generateGame()');
}
/*===========================================================
=					Game Loop																					=
===========================================================*/
function gameLoop() {
  let time = performance.now();
  let frame = time - Game.gameLoopStarted;
  Game.gameLoopStarted = time;

  if(Game.Character.dps > 0 && !Game.dpsAnimFrame) {
    // finish
  }

  Game.time.seconds += frame / 1000;

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
      item.remaining -= frame;

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

  cl('gameLoop()');
}
/*===========================================================
=         Start Damage                                      =
===========================================================*/
function startDamage(key) {
  Game.dpsAnimStart = performance.now();
  Game.dpsAnimFrame = requestAnimationFrame(function(time) {
    dpsAnim(time, key);
  });

  elem('oreImg').onclick = function() { doDpc(key); }

  cl(`startDamage(${key})`);
}
/*===========================================================
=         Stop Damage                                       =
===========================================================*/
function stopDamage() {
  cancelAnimationFrame(Game.dpsAnimFrame);

  elem('oreImg').onclick = function() {}

  cl(`stopDamage()`);
}

/*===========================================================
=         Animate Damage per Second                         =
===========================================================*/
function dpsAnim(time, key) {
  let frame = time - Game.dpsAnimStart;
  Game.dpsAnimStart = time;
 
  let item = Game.Ores[key];
  let char = Game.Character;
  let penetrate = item.armor / 100 * char.armorPen;
  let damage = char.dps - (item.armor - penetrate);
  let damagePerFrame = (damage / 1000) * frame;
 
  if(item.hp > 0 && damage > 0) {
    item.hp -= damagePerFrame;
 
    let delta = item.hp - damagePerFrame;
	 
    checkDifference();
 
    function checkDifference() {
		cancelAnimationFrame(Game.dpsAnimFrame);
		
        if(delta <= 0) {
			item.hp = 0;
			item.prog ++;
			healthBar(key);
			giveXp();
			giveLoot(key);
			oreProgressBar(key);

			save(`${key}Prog`, item.prog);
			save(`${key}Rewarded`, item.rewarded);
 
            if(item.prog >= 10) {
                item.prog = 0;
				item.lv ++;
				
				giveSpecialLoot(key);

				save(`${key}Lv`, item.lv);
				elem(`${key}Lv`).innerHTML = item.lv;
				elem('oreLv').innerHTML = item.lv;
			}
 
			let oreMaxHp = Math.floor(item.baseHp * Math.pow(item.hpPerLv, item.lv));

			item.hp = oreMaxHp + delta;
			delta = item.hp;
			item.maxHp = oreMaxHp;
  
			save(`${key}Rewarded`, item.rewarded);
			elem('oreMaxHp').innerHTML = nFormat(item.maxHp);
			
			checkDifference();
        }
		else {
			Game.dpsAnimFrame = requestAnimationFrame(function(time) {
				dpsAnim(time, key);
			});
		}
    }
   
    //generateResource(key, delta);
    //popUpAnim(key);
  }
  else if(item.armor - penetrate >= char.dps || char.dps <= 0)
    cancelAnimationFrame(Game.dpsAnimFrame);
 
  Game.dpsAnimFrame = requestAnimationFrame(function(time) {
	dpsAnim(time, key);
  });
	
  healthBar(key);
 
  save(`${key}Hp`, item.hp);
 
  cl(`dpsAnim(${key})`);
}
/*===========================================================
=         Damage per Click                                  =
===========================================================*/
function doDpc(key) {
  let item = Game.Ores[key];
  let char = Game.Character;

  if(char.critChance > 0)
    checkCrit();

  if(char.critHit) {
    let damage = char.dpc * 2;

    item.hp -= damage;
    char.total.critHits ++;
    char.critHit = false;

    generateFloatingText(nFormat(damage), 'character/dps16.png', event.clientX, event.clientY - 20);

		save('critHitsTotal', char.total.critHits);
    elem('critHitsTotal').innerHTML = nFormat(char.total.critHits);
  }
  else {
    let damage = char.dpc;

    item.hp -= damage;
    char.total.clicks ++;

    generateFloatingText(nFormat(damage), 'character/dps16.png', event.clientX, event.clientY - 20);

  	save('clicksTotal', char.total.clicks);
    elem('clicksTotal').innerHTML = nFormat(char.total.clicks);
  }

  if(item.hp <= 0 && !item.rewarded) {
    oreClear(key);

    Game.resetOreTo = setTimeout(function() {
      resetOre(key);
    }, 500);
  }
  else if(item.hp <= 0 && item.rewarded) {
    stopDamage();

    Game.resetOreTo = setTimeout(function() {
      resetOre(key);
    }, 500);
  }

  healthBar(key);
  playAudio('dpc');

  save(`${key}Hp`, item.hp);

  cl(`doDpc(${key})`);
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

  cl('checkCrit()');
}
/*===========================================================
=         Ore Cleared                                       =
===========================================================*/
function oreClear(key) {
  let item = Game.Ores[key];

  //stopDamage();

  item.hp = 0;
  item.prog ++;
  //item.rewarded = true;

  healthBar(key);
  giveXp();
  giveLoot(key);

//  if(item.prog >= 10)
  //  oreLvUp(key);

  oreProgressBar(key);

  save(`${key}Prog`, item.prog);
  save(`${key}Rewarded`, item.rewarded);

  cl(`oreClear(${key})`);
}
/*===========================================================
=         Reset Ore                                         =
===========================================================*/
function resetOre(key, delta) {
  let item = Game.Ores[key];
  let oreMaxHp = Math.floor(item.baseHp * Math.pow(item.hpPerLv, item.lv));

  item.hp = oreMaxHp + delta;
  item.maxHp = oreMaxHp;
  //item.rewarded = false;

  //startDamage(key);

  save(`${key}Rewarded`, item.rewarded);
  elem('oreMaxHp').innerHTML = nFormat(item.maxHp);

  cl(`resetOre(${key})`);
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

    // FIX -- add planet ID to ores
    for(i in lvGoals) {
      if(char.highestLv[key] >= lvGoals[i] && !Game.Achievements[key].ach[i])
        unlockAchievement(key, i);
    }

    save(`${key}HighestLv`, char.highestLv[key]);
    elem(`${key}HighestLv`).innerHTML = char.highestLv[key];
  }

  giveSpecialLoot(key);

  save(`${key}Lv`, item.lv);
  elem(`${key}Lv`).innerHTML = item.lv;
  elem('oreLv').innerHTML = item.lv;

  cl(`oreLvUp(${key})`);
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

  for(prop in resGoals) {
    if(char.total[key] >= resGoals[prop] && !Game.Achievements[key].ach[prop])
      unlockAchievement(key, prop);
  }

  checkUpgrades();
  //generateResource(key, resGain);
  //popUpAnim(key);

  save(`${key}Amount`, inv.amount);
	save(`${key}Total`, char.total[key]);
  elem(`${key}Amount`).innerHTML = nFormat(inv.amount);
  elem(`${key}Total`).innerHTML = nFormat(char.total[key]);

  cl(`giveLoot(${key})`);
}
/*===========================================================
=         Give XP                                           =
===========================================================*/
function giveXp() {
  let char = Game.Character;

  char.xp ++;

  if(char.xp > char.xpReq) {
    char.lv ++;
    char.xp = 0;
    char.xpReq = 30 * Math.pow(1.5, char.lv);

    giveMastery();
    generateNtf('Level up', `Congratulations, ${char.userName}, you have reached Lv ${char.lv}`);

    save('characterLv', char.lv);
  }

  let width = char.xp / char.xpReq * 100;
  progressBar('character', width);

  save('characterXp', char.xp);
  elem('charXp').innerHTML = `${nFormat(char.xp)} / ${nFormat(char.xpReq)}`;

  cl('giveXp()');
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

    updateAscensions();
   // generateResource('darkMatter', 1);
    //popUpAnim('darkMatter');

    save('darkMatterAmount', inv.darkMatter.amount);
    elem('darkMatterAmount').innerHTML = nFormat(inv.darkMatter.amount);
  }

  if(rand < item.antiMatterRate) {
    inv.antiMatter.amount += 1;
    char.total.antiMatter ++;

    checkCrafting();
   // generateResource('antiMatter', 1);
    //popUpAnim('antiMatter');

    save('antiMatterAmount', inv.antiMatter.amount);
    save('antiMatterTotal', char.total.antiMatter);
    elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
    elem('antiMatterTotal').innerHTML = nFormat(char.total.antiMatter);
  }

  cl(`giveSpecialLoot(${key})`);
}
/*===========================================================
=					Microverse Ascension															=
===========================================================*/
function microverseAscension() {
  let cDarkMatter = Game.Inventory.cDarkMatter.amount;
  let darkMatter = Game.Inventory.darkMatter.amount;
  let prestige = darkMatter;

  stopDamage();

  for(key in Game.Inventory) {
    let inv = Game.Inventory[key];

    inv.amount = 0;

    save(`${key}Amount`, inv.amount);
  }

  cDarkMatter += prestige;

  save('cDarkMatterAmount', cDarkMatter);

  for(key in Game.Upgrades) {
		let upg = Game.Upgrades[key];

    upg.lv = 0;

		save(`${key}Lv`, upg.lv);
  }

  for(key in Game.Crafting) {
    let craft = Game.Crafting[key];

    craft.active = false;
    craft.remaining = 600000;

		save(`${key}Remaining`, craft.remaining);
		save(`${key}Active`, craft.active);
  }

  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];

    item.current = false;

    save(`${key}Current`, item.current);
  }

  for(key in Game.Ores) {
    let item = Game.Ores[key];

    item.lv = 1;
    item.prog = 1;
    item.hp = item.baseHp;

		save(`${key}Lv`, item.lv);
		save(`${key}Hp`, item.hp);
    save(`${key}Prog`, item.prog);
  }

  lockUpgrades();
  lockCrafting();
  lockAscensions();
  lockInventory();

  unlockAscension('earth');

  updateUpgrades();
  updateCrafting();
  updateAscensions();
  updateOreStats('titanium');
  updateInventory();
  updateDamage();

  Game.connected = false;

  ascend('earth');

  generateNtf('Microverse Ascension', `You have received + ${prestige} <span class='forange'>Concentrated Dark Matter</span>`);

  cl('microverseAscension()');
}
/*===========================================================
=					Update Progress Bar																=
===========================================================*/
function progressBar(key, width) {
  elem(`${key}Progress`).style.width = `${width}%`;
}
/*===========================================================
=         Mute / Unmute Sounds							   				   		=
===========================================================*/
function muteSounds() {
	if(Game.muted) {
		Game.muted = false;
		elem('sounds').innerHTML = 'On';
	}
  else {
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
=         Number formatter                                  =
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
=         Generate Notification                             =
===========================================================*/
function generateNtf(name, text) {
  let key = Math.random();

  function makeNtf() {
  	return {
      header: name,
      content: text,
      opacity: 1,
  	}
  }

  Game.ntf[key] = makeNtf();

  loadNtf(key, name, text);

  save(`notifications`, Game.ntf);
}
/*===========================================================
=         Load Notification                                 =
===========================================================*/
function loadNtf(key, name, text) {
  let item = Game.ntf[key];
  let html = `
    <div class='notification' id='ntf${key}'>
      <div class='notification-header fcenter fwhite'>
        ${item.header}
        <div class='notification-btn f16' id='ntf${key}Close'>X</div>
      </div>
      <div class='notification-content'>
        ${item.content}
      </div>
    </div>
  `;

  elem('ntfContainer').insertAdjacentHTML('afterbegin', html);
  elem(`ntf${key}Close`).onclick = function() {
    dismissNtf(key);
  }
}
/*===========================================================
=         Dismiss Notification                              =
===========================================================*/
function dismissNtf(key) {
  elem(`ntf${key}Close`).onclick = function() {}

  Game.ntfFadeOutFrame = requestAnimationFrame(function(time) {
    dismissNtfAnim(time, key);
  });
}
/*===========================================================
=         Notification Fade Out                             =
===========================================================*/
function dismissNtfAnim(time, key) {
  let item = Game.ntf[key];

  item.opacity -= .01;
  elem(`ntf${key}`).style.opacity = item.opacity.toFixed(2);

  if(item.opacity <= 0) {
    elem(`ntf${key}`).parentNode.removeChild(elem(`ntf${key}`));
    delete Game.ntf[key];
    save(`notifications`, Game.ntf);
    cancelAnimationFrame(Game.ntfFadeOutFrame);
  }
  else {
    requestAnimationFrame(function(time) {
      dismissNtfAnim(time, key);
    });
  }
}
/*===========================================================
=         Set Username                                      =
===========================================================*/
function setUsername() {
  let char = Game.Character;

	char.userName = elem('username').value;

	if(char.userName.length < 3)
		return false;

	elem('displayuser').innerHTML = `Welcome back, <span class='fblue'>${char.userName}</span>`;
}
