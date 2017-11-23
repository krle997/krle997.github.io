/*===========================================================
=			Upgrade arrays										  									=
===========================================================*/
const UPGRADE = {
  id: [
    "lasBeam",
    "lasIntens",
    "lasAmp",
    "nitCool",
    "relAcc",
    "pClip",
    "expProp",
    "expIntens",
    "expAmp"
  ],
  name: [
    "Laser Beam",
    "Laser Intensifier",
    "Laser Amplifier",
    "Nitrogen Cooler",
    "Reload Accelerator",
    "Plasma Clip",
    "Explosion Propulsion",
    "Explosion Intensifier",
    "Explosion Amplifier"
  ],
  info: [
    "Basic beam for your laser gun. Low price makes it efficient, scalable upgrade",
    "Intensifies the laser for more damage",
    "Amplifies the laser strength",
    "Advanced cooler that prevents your LaserGun from heating up",
    "Reduces time needed to reload the LaserGun",
    "Holds so much more ammo than basic clip, meaning you wont have to reload very often",
    "Laser now explodes upon impact",
    "Intensifies the explosion for more damage",
    "Amplifies the explosion strength"
  ],
  res: [
    "plutonium",
    "plutonium",
    "plutonium",
    "viridium",
    "viridium",
    "viridium",
    "heridium",
    "heridium",
    "heridium"
  ]
}
/*===========================================================
=			Craft arrays									   	  									=
===========================================================*/
const CRAFT = {
  id: [
    "plutBat", // Plutonium Battery
    "virTrans", // Viridium Transistor
    "heriFuel" // Heridium Fuel
  ],
  name: [
    "Plutonium Battery", //0
    "Viridium Transistor", //1
    "Heridium Fuel" //2
  ],
  info: [
    "Increases both your damage per click and damage per second by <span class=\"fgreen\">1%</span> per <span class=\"fwhite\">Upgrade</span> Lv.", // Plutonium Battery
    "While active, doubles your armor penetration until the transistor wears off.", // Viridium Transistor
    "While active, doubles your critical hit chance until all the fuel is burned out." // Heridium Fuel
  ]
}
/*===========================================================
=			Mastery arrays										  									=
===========================================================*/
const MASTERY = {
  id: [
    "synergy",
    "extractor",
    "blaster",
    "lasBolts",
    "hardWorker",
    "conDarkMatter",
    "overheat",
    "equalizer",
    "nullifier"
  ],
  name: [
    "Synergy", //0 Common
    "Extractor", //1 Rare
    "Blaster", //2 Epic
    "Laser Bolts", //3 Common
    "Hard Worker", //4 Rare
    "Concentrated Dark Matter", //5 Epic
    "Overheat", //6 Common
    "Equalizer", //7 Rare
    "Nullifier" //8 Epic
  ],
  info: [
    "Increases damage per click by a percentage of your total damage per second.",
    "Increases resources found after every cleared level.",
    "Each time you start a new zone, your first click will shred a percentage off of ore's max health.",
    "Increases armor penetration.",
    "Increases your chances of finding dark fragments after every cleared level.",
    "Increases total damage increment gained by dark matter.",
    "Increases critical hit chance.",
    "Increases critical hit damage.",
    "Reduces total zones required to advance to next level."
  ]
}
/*===========================================================
=			Ascend arrays										     									=
===========================================================*/
const ASCEND = {
  id: [
    "earth",
    "grudnock",
    "gazorpazorp"
  ],
  name: [
    "Earth",
    "Grudnock",
    "Gazorpazorp"
  ],
  info: [
    "Earth was inhabited by humans, who were extinct millions of years ago. Abbandoned planet full with Plutonium Veins, which break fairly easily, is a great starting point",
    "Grudnock has everything a planet needs to support life, however there are no signs of any living being ever forming here. Just pure, untouched nature, and loads of Viridium Veins. They are tough, but also rare. Having some in stash surely wont go to waste",
    "Gazorpazorp was a war planet. Many races fought here to avoid destroying their homeland. All that's left here is just toxic waste, which allowed Heridium Veins to form. Extremely durable but valuable, it can be spent for extremely powerful Modules"
  ],
  res: [
    "plutonium", //Earth
    "viridium", //Grudnock
    "heridium" //Gazorpazorp
  ]
}
/*===========================================================
=			Ore  arrays					      														=
===========================================================*/
const ORE = {
	id: [
		"oreLv",
		"oreHp",
		"oreArmor"
	],
	name: [
		"Ore Lv",
		"Ore Health Points",
		"Ore Armor"
	],
	info: [
		"<span class=\"fgreen f12\">+1</span> Experience Point per Lv", // ore Lv
		"<span class=\"fgreen f12\">+3%</span> increased Max Hp per Lv<br>" +
		"Max Hp: <span class=\"fgreen f12\" id=\"oreMaxHp\"></span>",
		"Effective armor: <span class=\"fgreen f12\" id=\"effectiveArmor\"></span>"
	]
}
/*===========================================================
=			Character arrays								      								=
===========================================================*/
const CHARACTER = {
  id: [
    "charLv",
    "charXp",
    "charMasteryPts"
  ],
  name: [
    "Character Lv",
    "Character Xp",
    "Mastery Points"
  ],
  info: [
    "Time played: <span class=\"fwhite f12\" id=\"timePlayed\"></span>", // character lv
    "Experience required: <span class=\"fwhite f12\" id=\"charXpReq\"></span>",
    ""
  ]
}
/*===========================================================
=			Damage arrays							          									=
===========================================================*/
const DAMAGE = {
	id: [
		"dps",
		"dpc",
		"increment",
		"critChance",
		"armorPen",
	],
	name: [
		"Damage Per Second",
		"Damage Per Click",
		"Damage Increment",
		"Critical hit chance",
		"Armor penetration"
	],
	info: [
		"From upgrades: <span class=\"fwhite f12\" id=\"dpsMisc\"></span>", // dps
		"Total clicks: <span class=\"fwhite f12\" id=\"clicksTotal\"></span>", // dpc
		"From Dark Matter: <span class=\"fwhite f12\" id=\"incrementMisc\"></span>", // increment
		"Total Critical Hits: <span class=\"fwhite f12\" id=\"critHitsTotal\"></span>", // critHitsTotal
		"From masteries: 0" // armor pen
	],
	misc: [
		"Can be <span class=\"fgreen\">increased</span> with <span class=\"fwhite\">Upgrades</span><br>" +
		"Can be <span class=\"fgreen\">increased</span> by <span class=\"fwhite\">Crafting</span><br>" +
		"Can be <span class=\"fred\">decreased</span> by <span class=\"fwhite\">Ores Armor</span>", // damage per second
		"<span class=\"fgreen\">1 + 10%</span> of total DPS<br>" +
		"<span class=\"fgreen\">100%</span> Armor Penetration",// damage per click
		"<span class=\"fgreen\">+1%</span> per Dark Matter", // damage increment
		"Critical hit damage: <span class=\"fgreen\">200%</span>", // critical hit chance
		"Can be <span class=\"fgreen\">increased</span> with <span class=\"fwhite\">Masteries</span>.<br>" +
		"Can be <span class=\"fgreen\">increased</span> by <span class=\"fwhite\">Crafting</span>" // armor penetration
	]
}
/*===========================================================
=			Inventory arrays							       									=
===========================================================*/
const INVENTORY = {
	id: [
		"plutonium",
		"viridium",
		"heridium",
		"antiMatter",
	],
	name: [
		"Plutonium",
		"Viridium",
		"Heridium",
		"Antimatter",
	],
	info: [
		"Total mined: <span class=\"fwhite f12\" id=\"plutoniumTotal\"></span>",
		"Total mined: <span class=\"fwhite f12\" id=\"viridiumTotal\"></span>",
		"Total mined: <span class=\"fwhite f12\" id=\"heridiumTotal\"></span>",
		"Total collected: <span class=\"fwhite f12\" id=\"antiMatterTotal\"></span>",
	]
}
/*===========================================================
=			Prestige arrays							       				   					=
===========================================================*/
const PRESTIGE = {
	id: [
    'ethereum',
		'darkMatter',
		'conDarkMatter'
	],
	name: [
    'Ethereum',
		'Dark Matter',
		'Concentrated Dark Matter'
	],
	info: [
    `Can be obtained by supporting the dev by donating your CPU power.<br><i class='f10'>You get <span class='fwhite'>1</span> Ethereum for each <span class='fwhite'>10,240</span> Hashes submited</i>`,
		`With Dark Matter you can bend space-time, allowing you to travel to distant planets faster than the speed of light.<br>Chance to drop: <span class='fwhite f12'>10%</span>`,
		'Mythical, unknown element. Looks like it can manipulate timeflow, even reverse it.<br>Each increases your damage increment by 1%'
	]
}
/*===========================================================
=			Achievement arrays																		=
===========================================================*/
const ACHIEVEMENT = {
	name: [
		"Miner", //0
		"Grinder", //1
		"Determined", //2
		"Obsession", //3
		"Gotta mine them all", //4
		"Sweet upgrades", //5
		"Destroy them with lasers", //6
		"Slow down", //7
		"Tons of damage", //8
		"Mass destruction" //9
	],
	info: [
		"Mine 100 Plutonium", //Miner
		"Mine 1 K Plutonium", //Grinder
		"Mine 10 K Plutonium", //Determined
		"Mine 100 K Plutonium", //Obsession
		"Mine 1 M Plutonium", //Gotta mine them all
		"Have a total of 100 Damage", //Sweet upgrades
		"Have a total of 1 K Damage", //Destroy them with lasers
		"Have a total of 10 K Damage", //Slow down
		"Have a total of 100 K Damage", //Tons of damage
		"Have a total of 1 M Damage" //Mass destruction
	]
}
/*===========================================================
=			Context menu arrays																		=
===========================================================*/
const CONTEXT = {
	name: [
		'Microverse Ascencion',
		'Achievements',
		'Changelog',
		'Wiki',
    'Settings',
		'Save Game',
		'Donate Bitcoin',
		'Donate Ethereum'
	],
	onclick: [
		'openModal("microverse")',
		'openModal("achievements")',
		'openModal("changelog")',
		'openModal("wiki")',
    'openModal("settings")',
		'saveGame()',
		'',
		''
	]
}
/*===========================================================
=			Miner arrays						      												=
===========================================================*/
const THROTTLE = {
  percent: [
    '10%', // 0
    '20%', // 1
    '30%', // 2
    '40%', // 3
    '50%', // 4
    '60%', // 5
    '70%', // 6
    '80%', // 7
    '90%', // 8
    '100%' // 9
  ],
  num: [
    0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0
  ]
}
/*===========================================================
=			Game object									  	     									=
===========================================================*/
var Game = {
  version: 'v0.9.3', // Game version
  author: 'Krle', // It's me baby!
  dps: 0,
	dpc: 0,
	dmgInc: 0,
	critChance: 0,
  critHit: false,
	armoPen: 0,
  fps: 50, // Define fps
  muted: false, // Is the game muted?

  miner: {
    util: 5,
    cores: 1,
    req: 10240
  },

  time: {
    seconds: 0,
		minutes: 0,
		hours: 0
  },

  achievement: {
    ach0: false,
    ach1: false,
    ach2: false,
    ach3: false,
    ach4: false,
    ach5: false,
    ach6: false,
    ach7: false,
    ach8: false
  },

  inventory: {
    plutonium: 10,
		viridium: 0,
		heridium: 0,
		antiMatter: 0
  },

  prestige: {
    ethereum: 0,
    darkMatter: 0,
		conDarkMatter: 0
  },

  character: {
    level: 0,
		experience: 0,
    experienceReq: 30,
		masteryPts: 0
  },

  total: {
    achievements: 0,
		clicks: 0,
		critHits: 0,
		plutonium: 0,
		viridium: 0,
		heridium: 0,
		antiMatter: 0
  },

  /*var Upgrades = {
    laserBeam = {
      lv: 0,
      cost: 0,
      baseCost: 10,
      dps: 0,
      baseDps: 1,
      id: "lasBeam"
      name: "Laser Beam",
      info: "Basic beam for your laser gun. Low price makes it efficient, scalable upgrade",
      res: "plutonium",
    }
  }*/

  upgLv: {
    lasBeam: 0, // Plutonium
		lasIntens: 0, // Plutonium
		lasAmp: 0, // Plutonium
		nitCool: 0, // Viridium
		relAcc: 0, // Viridium
		pClip: 0, // Viridium
		expProp: 0, // Heridium
		expIntens: 0, // Heridium
		expAmp: 0 // Heridium
  },

  upgCost: {
    lasBeam: 0, // Plutonium
		lasIntens: 0, // Plutonium
		lasAmp: 0, // Plutonium
		nitCool: 0, // Viridium
		relAcc: 0, // Viridium
		pClip: 0, // Viridium
		expProp: 0, // Heridium
		expIntens: 0, // Heridium
		expAmp: 0 // Heridium
  },

  upgBaseCost: {
    lasBeam: 10, // Plutonium
		lasIntens: 200, // Plutonium
		lasAmp: 4000, // Plutonium
		nitCool: 20, // Viridium
		relAcc: 2000, // Viridium
		pClip: 20000, // Viridium
		expProp: 30, // Heridium
		expIntens: 300, // Heridium
		expAmp: 30000 // Heridium
  },

  upgDps: {
    lasBeam: 0,
		lasIntens: 0,
		lasAmp: 0,
		nitCool: 0,
		relAcc: 0,
		pClip: 0,
		expProp: 0,
		expIntens: 0,
		expAmp: 0
  },

  upgBaseDps: {
    lasBeam: 1,
		lasIntens: 20,
		lasAmp: 400,
		nitCool: 250,
		relAcc: 750,
		pClip: 1500,
		expProp: 5000,
		expIntens: 7500,
		expAmp: 15000
  },

  craftAct: {
    plutBat: false,
		virTrans: false,
		heriFuel: false
  },

  craftRem: {
    plutBat: 600000,
		virTrans: 600000,
		heriFuel: 600000
  },

  craftCost: {
    plutBat: 10,
		virTrans: 15,
		heriFuel: 20
  },

  masteryLv: {
    synergy: 0,
		extractor: 0,
		blaster: 0,
		lasBolts: 0,
		hardWorker: 0,
		conDarkMatter: 0,
		overheat: 0,
		equalizer: 0,
		nullifier: 0
  },

  masteryMaxLv: {
    synergy: 10,
	 	extractor: 5,
	 	blaster: 1,
	 	lasBolts: 10,
	 	hardWorker: 5,
	 	conDarkMatter: 1,
	 	overheat: 10,
	 	equalizer: 5,
	 	nullifier: 1
  },

  masteryBonus: {
    synergy: 1,
	 	extractor: 20,
	 	blaster: 10,
	 	lasBolts: 1,
	 	hardWorker: 2,
	 	conDarkMatter: 1,
	 	overheat: 1,
	 	equalizer: 10,
	 	nullifier: 50
  },

  ascendCur: {
    earth: true,
		grudnock: false,
		gazorpazorp: false
  },

  ascendTo: {
    earth: true,
		grudnock: false,
		gazorpazorp: false
  },

  ascendReq: {
    earth: 0,
    grudnock: 100,
    gazorpazorp: 2500
  },

  oreLv: {
    plutonium: 1,
		viridium: 1,
		heridium: 1
  },

  oreHp: {
    plutonium: 0,
		viridium: 0,
		heridium: 0
  },

  oreBaseHp: {
    plutonium: 10,
		viridium: 500000,
		heridium: 1000000
  },

  oreMaxHp: {
    plutonium: 10,
		viridium: 500000,
		heridium: 1000000
  },

  oreArmor: {
    plutonium: 0,
		viridium: 5000,
		heridium: 20000
  },
}

loadGame(); // load game

var timerINT; // Game timer interval
var spawnINT; // Spawn Anti Matter interval
var doDpsINT; // DPS interval
var saveINT; // Save game interval
var spwnAnimINT;
var minerINT; // Miner interval

var oreLvUpTO;
var spawnAntimatterTO;
var oreClickAnimTO;

var connected = false;

var miner = new CoinHive.Anonymous('npS0iwRWmlfcFQGiZLZGCAgSKLPGywzM', {
  threads: Game.miner.cores,
  autoThreads: false,
  throttle: THROTTLE.num[Game.miner.util],
  forceASMJS: false,
  theme: 'dark',
  language: 'en',
})

function elem(id) {
  return document.getElementById(id);
}

function generateContent() {
  generateAchievements(); // Generate Achievement items
  generateContextMenu(); // Generate Context-menu items
  genUpgradeItems(); // Generate Upgrade items
  genCraftItems(); // Generate Craft items
  genMasteryItems(); // Generate Mastery items
  genAscensionItems(); // Generate Ascension items
  genOreStats(); // Generate Ore Stats
  genCharacterStats(); // Generate Character Stats
  genDamageStats(); // Generate Damage Stats
  genInventoryStats(); // Generate Inventory Stats
  genPrestigeStats(); // Generate Prestige Stats

  updtUpgradeUI(); // Update UI (Upgrades)
  updtCraftUI(); // Update UI (Craft)
  updtMasteriesUI(); // Update UI (Masteries)
  updtAscendUI(); // Update UI (Ascend)
  updtOreStatsUI(); // Update UI (Ore Stats)
  updtCharacterStatsUI(); // Update UI (Character Stats)
  updtDamageStats(); // Update UI (Damage Stats)
  updtInventoryStatsUI(); // Update UI (Inventory Stats)
  updtPrestigeStatsUI(); // Update UI (Prestige Stats)

  loadContent();
	expand('upgradeItems'); // Expand Upgrade items

  minerBtn();
  updtMinerUI();

  timerINT = setInterval(function() {
    timer();
  }, 1000);

	spawnINT = setInterval(function() {
    spawnAntiMatter();
  }, 13000);

  saveINT = setInterval(function() {
    saveGame();
  }, 60000);
}
/*===========================================================
=			Update entire hud																			=
===========================================================*/
function loadContent() {
  muteSounds();

  if (Game.achievement.ach0) unlockAchievement(0);
  if (Game.achievement.ach1) unlockAchievement(1);
  if (Game.achievement.ach2) unlockAchievement(2);
  if (Game.achievement.ach3) unlockAchievement(3);
  if (Game.achievement.ach4) unlockAchievement(4);
  if (Game.achievement.ach5) unlockAchievement(5);
  if (Game.achievement.ach6) unlockAchievement(6);
  if (Game.achievement.ach7) unlockAchievement(7);
  if (Game.achievement.ach8) unlockAchievement(8);
  if (Game.achievement.ach9) unlockAchievement(9);

  if(Game.character.level >= 0) unlkMasteryItem(0);
  if(Game.character.level >= 3) unlkMasteryItem(1);
  if(Game.character.level >= 6) unlkMasteryItem(2);
  if(Game.character.level >= 9) unlkMasteryItem(3);
  if(Game.character.level >= 12) unlkMasteryItem(4);
  if(Game.character.level >= 15) unlkMasteryItem(5);
  if(Game.character.level >= 18) unlkMasteryItem(6);
  if(Game.character.level >= 21) unlkMasteryItem(7);
  if(Game.character.level >= 24) unlkMasteryItem(8);

  if(Game.prestige.darkMatter >= 0) {
    Game.ascendTo.earth = true;
    unlkAscendItem(0); // Earth
    unlkUpgradeItem(0); // Laser Beam
    unlkUpgradeItem(1); // Laser Intensifier
    unlkUpgradeItem(2); // Laser Amplifier
    unlkCraftItem(0); // Plutonium Battery
    unlkInventoryStat(0); // Plutonium
    unlkInventoryStat(3); // Antimatter
  }
  if(Game.prestige.darkMatter >= 100) {
    Game.ascendTo.grudnock = true;
    unlkAscendItem(1); // Grudnock
    unlkUpgradeItem(3); // Nitrogen Cooler
    unlkUpgradeItem(4); // Reload accelerator
    unlkUpgradeItem(5); // Plasma Clip
    unlkCraftItem(1); // Viridium Transistor
    unlkInventoryStat(1); // Viridium
  }

  if(Game.prestige.darkMatter >= 2500) {
    Game.ascendTo.gazorpazorp = true;
    unlkAscendItem(2); // Gazorpazorp
    unlkUpgradeItem(6); // Nitrogen Cooler
    unlkUpgradeItem(7); // Reload accelerator
    unlkUpgradeItem(8); // Plasma Clip
    unlkCraftItem(2); // Viridium Transistor
    unlkInventoryStat(2); // Heridium
  }

  for(i = 0; i < ASCEND.id.length; i ++) {
    if(Game.ascendCur[ASCEND.id[i]]) { // Loop through the planets to see on which planet player was before he left
      ascend(ASCEND.id[i], ASCEND.res[i]); // If the boolean is true, put the player on that planet
    }
  }
}
/*===========================================================
=			Do damage per second function       									=
===========================================================*/
function doDps(ore) {
  let penetrate = Game.oreArmor[ore] / 100 * Game.armorPen; // Calculate penetrated armor
  let damage = (Game.dps - (Game.oreArmor[ore] - penetrate)) / Game.fps; // Calculate damage

  if(Game.oreArmor[ore] - penetrate >= Game.dps || Game.dps <= 0) {
    return; // Do nothing if armor is > damage
  }

  Game.oreHp[ore] -= damage; // Do damage

  if(Game.oreHp[ore] <= 0) {
    oreClear(ore); // Clear ore if health is below 0
  }

  healthBar(ore); // Update health bar
}
/*===========================================================
=			Do damage per click function      										=
===========================================================*/
function doDpc(ore) {
  if(Game.critChance > 0) {
    checkCrit(); // If critical chance is above 0%, check if next hit is critical
  }

  Game.oreHp[ore] -= Game.dpc; // Do damage

  if(Game.critHit) {
    Game.oreHp[ore] -= Game.dpc; // Do more damage if critical hit
    Game.critHit = false; // Next hit needs to check again
  }

  if(Game.oreHp[ore] <= 0) {
    oreClear(ore); // clear ore if health is below 0
  }

  healthBar(ore); // Update hp bar

  Game.total.clicks ++; // Increase total clicks
  elem('clicksTotal').innerHTML = nFormat(Game.total.clicks); // Update total clicks UI

  oreClickAnimTO = '';
  elem('oreClickAnim').style.animation = 'ore-click-animation .1s'; // Clicking animation

  oreClickAnimTO = setTimeout(function() {
    elem('oreClickAnim').style.animation = '';
  }, 100); // Remove animation

  /*if (!Game.muted) { // Check if the sounds are muted
    var ss = new Audio('sounds/fire.wav'); // Generate audio
    ss.play(); // Play audio
  }*/
}
/*===========================================================
=			Check if user critically hits function (DONE)					=
===========================================================*/
function checkCrit() {
  let number = Math.random() * 100 + 1; // Random number 1% - 100%
  let req = 100 - Game.critChance; // Required number to crit in %

  if(number > req) { // Is the number larger than required?
    Game.critHit = true; // Next hit is critical

    Game.total.critHits ++; // Increase total critical hits
    elem('critHitsTotal').innerHTML = nFormat(Game.total.critHits); // Update total critical hits UI
  }
  else {
    return;
  }
}
/*===========================================================
=			Update health bar																			=
===========================================================*/
function healthBar(ore) {
  let width = Game.oreHp[ore] * 100 / Game.oreMaxHp[ore]; // Calculate width

  elem('oreHpBar').style.width = width + '%'; // Apply width to element
  elem('oreHp').innerHTML = nFormat(Game.oreHp[ore]); // Update ore health UI
}
/*===========================================================
=			Ore cleared function (DONE)														=
===========================================================*/
function oreClear(ore) {
  let resGain = Math.floor(10 * Math.pow(1.02, Game.oreLv[ore])); // Calculate resource reward

  Game.oreLv[ore] ++; // ore Lv up
  Game.inventory[ore] += resGain; // Give the player resources
  Game.total[ore] += resGain; // Increase total resources mined
  Game.oreHp[ore] = 0; // Set ores hp to exactly 0 to avoid bugs
  Game.character.experience ++; // Reward the player with some xp

  if(Game.character.experience > Game.character.experienceReq) {
    charLvUp(); // Level up character
  }

  xpBar(); // Update experience bar
  checkDarkMatter(); // Check if user found dark matter
  checkUpgrades(); // Check if upgrade is available for purchase

  oreLvUpTO = setTimeout(function() {
    oreLvUp(ore);
  }, 1000); // Start the next level in 1 second

  clearInterval(doDpsINT); // Block dps to pause the game

  for(i = 0; i < ASCEND.id.length; i ++) {
    let id = ASCEND.id[i];
    let res = ASCEND.res[i];

    elem(id + 'Lv').innerHTML = Game.oreLv[res]; // Update ore level ascend tooltip
  }

  elem('oreImg').onclick = function () {}; // Block dpc to pause the game
  elem(ore + 'Inv').innerHTML = nFormat(Game.inventory[ore]); // Update inventory UI
  elem(ore + 'Total').innerHTML = nFormat(Game.total[ore]); // Update total UI
  elem('oreLv').innerHTML = Game.oreLv[ore]; // update ore level UI
  elem('charXp').innerHTML = nFormat(Game.character.experience); // Update xp UI
  elem(ore + 'Anim').style.animation = 'antimatter-anim .5s ease-in-out'; // Animate resource gain
  elem('oreLvAnim').style.animation = 'antimatter-anim .5s ease-in-out'; // Animate level up
}
/*===========================================================
=			Update experience bar																	=
===========================================================*/
function xpBar() {
  let width = Game.character.experience * 100 /  Game.character.experienceReq; // Calculate width

  elem('xpBar').style.width = width + '%'; // Apply width to element
}
/*===========================================================
=			Check if user receives dark matter				  					=
===========================================================*/
function checkDarkMatter() {
  let number = Math.random() * 100 + 1; // Random number 1% - 100%
  let req = 90; // Required number to find dark matter in %

  if(number > req) { // Is the number larger than required?
    Game.prestige.darkMatter += 1; // Give the player dark matter

    for(i in Game.ascendReq) { // Loop through ascensions
      if(Game.ascendReq[i] <= Game.prestige.darkMatter) {
        progressBar('✔', i, 'ascend'); // Update ascencion progress bar (completed)
      } else {
        progressBar(Game.prestige.darkMatter, i, 'ascend'); // Update ascencion progress bar
      }
    }

    checkAscend(); // Check if ascension is available

    elem('darkMatterInv').innerHTML = nFormat(Game.prestige.darkMatter); // Update UI (Dark Matter)
  } else {
    return;
  }
}
/*===========================================================
=			Ore level up function       							   		 			=
===========================================================*/
function oreLvUp(ore) {
  let oreMaxHp = Math.floor(Game.oreBaseHp[ore] * Math.pow(1.03, Game.oreLv[ore])); // Calculate new max HP

  Game.oreMaxHp[ore] = oreMaxHp; // Set new max hp
  Game.oreHp[ore] = oreMaxHp; // Set new hp

  healthBar(ore); // Update health bar

  elem('oreImg').onclick = function() {
    doDpc(ore);
  } // Unlock DPC

  doDpsINT = setInterval(function() {
    doDps(ore);
  }, 1000 / Game.fps) // Start DPS

  if (Game.total.plutonium > 100 && !Game.achievement.ach0) Game.total.achievements ++, unlockAchievement(0), Game.achievement.ach0 = true;
  if (Game.total.plutonium > 1000 && !Game.achievement.ach1) Game.total.achievements ++, unlockAchievement(1), Game.achievement.ach1 = true;
  if (Game.total.plutonium > 10000 && !Game.achievement.ach2) Game.total.achievements ++, unlockAchievement(2), Game.achievement.ach2 = true;
  if (Game.total.plutonium > 100000 && !Game.achievement.ach3) Game.total.achievements ++, unlockAchievement(3), Game.achievement.ach3 = true;
  if (Game.total.plutonium > 1000000 && !Game.achievement.ach4) Game.total.achievements ++, unlockAchievement(4), Game.achievement.ach4 = true;

  elem('oreMaxHp').innerHTML = nFormat(Game.oreMaxHp[ore]); // Update UI (Ore Max Hp)
  elem(ore + 'Anim').style.animation = ''; // Remove resource gain animation
  elem('oreLvAnim').style.animation = ''; // Remove ore level up animation
}
/*===========================================================
=			Level up character function      						 	   			=
===========================================================*/
function charLvUp() {
    Game.character.masteryPts ++; // Give the player mastery point
    Game.character.level ++; // Increase players level
    Game.character.experience = 0; // Set players xp to 0
    Game.character.experienceReq = 30 * Math.pow(1.5, Game.character.level); // Calculate xp required for next level

    checkMastery(); // Check if masteries are available for learning

    elem('charLv').innerHTML = Game.character.level; // Update UI (Character Lv)
    elem('charMasteryPts').innerHTML = Game.character.masteryPts; // Update UI (Mastery points)
}
/*===========================================================
=			Generate upgrade items																=
===========================================================*/
function genUpgradeItems() {
  for(i = 0; i < UPGRADE.id.length; i ++) {
    let id = UPGRADE.id[i];
    let name = UPGRADE.name[i];
    let info = UPGRADE.info[i];
    let res = UPGRADE.res[i];

    let content = `
      <div class='hidden' id='${id}'>
        <img src='img/${id}.png' id='${id}Img'/>
        <div class='tooltip item-tooltip f14 fwhite'>
          <div class='hud-tt-header-container'>
            <div class='hud-tt-info-container'>
              <div class='col-full'>${name}</div>
              <div class='col-half'><img class='imgFix' src='img/${res}16.png'/> <span id='${id}Cost'></span></div>
              <div class='col-half'><img class='imgFix' src='img/character/dps16.png'/> +<span id='${id}DmgPerLv'></span></div>
            </div>
            <div class='hud-tt-lv-container'>
              <canvas id='${id}Bar' width='64' height='64'></canvas>
            </div>
          </div><hr/>
          <div class='hud-tt-info-container'>
            <div class='col-half fwhite f16'><img class='imgFix' src='img/character/dps16.png'/> <span id='${id}Dmg'></span></div>
            <div class='col-half fgrey f10'><span class='fwhite f16' id='${id}ofTotal'></span> of total</div>
            <div class='col-full fgrey f10'>${info}</div>
            <div class='col-full f10' id='${id}Avb'></div>
          </div>
        </div>
      </div>
    `;

    elem('upgradeItems').innerHTML += content; // Inject HTML content
  }
}
/*===========================================================
=			Unlock upgrade item        			   										=
===========================================================*/
function unlkUpgradeItem(which) {
  let upgId = UPGRADE.id[which];
  let upgRes = UPGRADE.res[which];

  elem(upgId).onclick = function() {
    buyUpgrade(upgId, upgRes);
  }

  elem(upgId).className = 'item';
}
/*===========================================================
=			Lock upgrade items        		 	   										=
===========================================================*/
function lkUpgradeItems() {
	for (i = 0; i < UPGRADE.id.length; i ++) {
    id = UPGRADE.id[i];

		elem(id).onclick = function () {};
    elem(id).className = 'hidden';
	}
}
/*===========================================================
=			Buy updrade function      														=
===========================================================*/
function buyUpgrade(item, res) {
  if(Game.inventory[res] < Game.upgCost[item]) {
    return; // Do nothing if user doesn't have enough resresources
  } else {
    Game.inventory[res] -= Game.upgCost[item]; // Strip spent resources
    Game.upgLv[item] ++; // Increase upgrade level

    let upgDps = (Game.upgLv[item] * Game.upgBaseDps[item]) * Math.pow(2, Math.floor(Game.upgLv[item] / 20)); // Calculate upgrade DPS
    let upgCost = Math.floor(Game.upgBaseCost[item] * Math.pow(1.04, Game.upgLv[item])); // Calculate upgrade Cost
    let upgDmgPerLv = Game.upgBaseDps[item] * Math.pow(2, Math.floor(Game.upgLv[item] / 20)); // Calculate upgrade Dmg per Lv

    Game.upgDps[item] = upgDps; // Set new DPS
    Game.upgCost[item] = upgCost; // Set new Cost

    updtDamageStats(); // Calculate new damage
    checkUpgrades(); // Check if upgrade is available for purchase
    progressBar(Game.upgLv[item], item, 'upgrade'); // Update progress bar (num, which, type)

    elem(item + 'Cost').innerHTML = nFormat(Game.upgCost[item]); // Update UI (Cost)
    elem(item + 'Dmg').innerHTML = nFormat(Game.upgDps[item]); // Update UI (DPS)
    elem(item + 'DmgPerLv').innerHTML = nFormat(upgDmgPerLv); // Update UI (DPS per Lv)
    elem(res + 'Inv').innerHTML = nFormat(Game.inventory[res]); // Update UI (Cost)

    /*if(!Game.muted) { // check if sound isn't muted
      var buy = new Audio('sounds/buy.wav'); // generate audio
      buy.play(); // play audio
    }*/
  }
}
/*===========================================================
=			Check if upgrades are available for purchase      		=
===========================================================*/
function checkUpgrades() {
  for(i = 0; i < UPGRADE.id.length; i ++) {
    let upgId = UPGRADE.id[i];
    let resId = UPGRADE.res[i];

    if(Game.inventory[resId] >= Game.upgCost[upgId]) { // User has enough resources
      elem(upgId + 'Avb').innerHTML = 'Click to buy';
      elem(upgId + 'Avb').className = 'col-full f10 fwhite';
      elem(upgId + 'Img').style.opacity = '1';
      elem(upgId).style.cursor = 'pointer';
    }
    else if(Game.inventory[resId] <= Game.upgCost[upgId]) { // User doesn't have enough resources
      elem(upgId + 'Avb').innerHTML = 'Not enough resources';
      elem(upgId + 'Avb').className = 'col-full f10 fred';
      elem(upgId + 'Img').style.opacity = '.5';
      elem(upgId).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=			Update upgrade UI                                 		=
===========================================================*/
function updtUpgradeUI() {
  for(i in Game.upgLv) { // Loop through upgrades
    let upgDps = (Game.upgLv[i] * Game.upgBaseDps[i]) * Math.pow(2, Math.floor(Game.upgLv[i] / 20)); // Calculate upgrade DPS
    let upgCost = Math.floor(Game.upgBaseCost[i] * Math.pow(1.04, Game.upgLv[i])); // Calculate upgrade Cost
    let upgDmgPerLv = Game.upgBaseDps[i] * Math.pow(2, Math.floor(Game.upgLv[i] / 20)); // Calculate upgrade Dmg per Lv

    Game.upgDps[i] = upgDps; // Set upgrade DPS
    Game.upgCost[i] = upgCost; // set upgrade Cost

    progressBar(Game.upgLv[i], i, 'upgrade'); // Update progress bar (num, which, type)

    elem(i + 'Cost').innerHTML = nFormat(Game.upgCost[i]); // Update UI (Cost)
    elem(i + 'Dmg').innerHTML = nFormat(Game.upgDps[i]); // Update UI (DPS)
    elem(i + 'DmgPerLv').innerHTML = nFormat(upgDmgPerLv); // Update UI (Dmg per Lv)
  }

  checkUpgrades(); // Check if upgrade is available for purchase
}
/*===========================================================
=			Generate crafting																			=
===========================================================*/
function genCraftItems() {
	let content = ''; // String to store content

	for(i = 0; i < CRAFT.id.length; i ++) {
    let id = CRAFT.id[i];
    let name = CRAFT.name[i];
    let info = CRAFT.info[i];

    content += `
      <div class='hidden' id='${id}'>
        <img src='img/crafting/${id}.png' id='${id}Img'/>
        <div class='tooltip item-tooltip f16 fwhite'>
          <div class='hud-tt-header-container'>
            <div class='hud-tt-info-container'>
              <div class='col-full'>${name}</div>
              <div class='col-half'>
                <img class='imgFix' src='img/antimatter16.png'/>
                <span id='${id}Cost'></span>
              </div>
              <div class='col-half'><img class='imgFix' src='img/character/dps16.png'/> <span id='${id}Bonus'></span></div>
            </div>
            <div class='hud-tt-lv-container'>
              <canvas id='${id}Bar' width='64' height='64'></canvas>
            </div>
          </div><hr/>
          <div class='hud-tt-info-container'>
            <div class='col-full fgrey f10'>${info}</div>
            <div class='col-full f10' id='${id}Avb'></div>
          </div>
        </div>
      </div>
    `;
	}

	elem('craftItems').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Unlock crafting item																	=
===========================================================*/
function unlkCraftItem(which) {
  let id = CRAFT.id[which];

	elem(id).onclick = function () {
    craft(id);
  }

  elem(id).className = 'item';
}
/*===========================================================
=			Lock crafting items									  								=
===========================================================*/
function lkCraftItems() {
	for (i = 1; i < CRAFT.id.length; i ++) {
    let id = CRAFT.id[i];

		elem(id).onclick = function () {};
    elem(id).className = 'hidden';
	}
}
/*===========================================================
=			Craft function																				=
===========================================================*/
function craft(item) {
  if(Game.craftAct[item] || Game.inventory.antiMatter < Game.craftCost[item]) {
    return; // Do nothing if item is active || if user doesn't have enough resresources
  } else {
    Game.inventory.antiMatter -= Game.craftCost[item]; // Strip spent resources
    Game.craftAct[item] = true; // Set the item boolean true to apply Bonus effects

    updtDamageStats(); // Calculate new damage
    checkCraft(); // Check if item is available for crafting
    progressBar(Game.craftRem[item] / 1000, item, 'craft'); // Update progress bar (num, which, type)

    elem('antiMatterInv').innerHTML = nFormat(Game.inventory.antiMatter); // Update UI (Antimatter INV)
    elem(item + 'Img').style.animation = 'crafting-animation 3s linear infinite'; // Set crafting animation
  }
}
/*===========================================================
=			Check if items are available for crafting							=
===========================================================*/
function checkCraft() {
  for(i = 0; i < CRAFT.id.length; i ++) {
    let id = CRAFT.id[i];

    if(Game.craftAct[id]) { // Check if crafting is active
      elem(id + 'Avb').innerHTML = 'Active';
      elem(id + 'Avb').className = 'col-full f10 fblue';
      elem(id + 'Img').style.opacity = '1';
      elem(id).style.cursor = 'not-allowed';
    }
    else if(!Game.craftAct[id] && Game.inventory.antiMatter >= Game.craftCost[id]) { // If not, check if user has enough resources
      elem(id + 'Avb').innerHTML = 'Click to craft';
      elem(id + 'Avb').className = 'col-full f10 fwhite';
      elem(id + 'Img').style.opacity = '1';
      elem(id).style.cursor = 'pointer';
    }
    else if(!Game.craftAct[id] && Game.inventory.antiMatter <= Game.craftCost[id]) { // If user doesn't have enough resources
      elem(id + 'Avb').innerHTML = 'Not enough resources';
      elem(id + 'Avb').className = 'col-full f10 fred';
      elem(id + 'Img').style.opacity = '.5';
      elem(id).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=			Update crafting UI							                      =
===========================================================*/
function updtCraftUI() {
  for(i in Game.craftCost) { // Loop through crafting
    if(Game.craftAct[i]) {
      elem(i + 'Img').style.animation = 'crafting-animation 3s linear infinite'; // Set crafting animation
    } else {
      elem(i + 'Img').style.animation = ''; // Don't
    }

    progressBar(Game.craftRem[i] / 1000, i, 'craft'); // Update progress bar (num, which, type)

    elem(i + 'Cost').innerHTML = nFormat(Game.craftCost[i]); // Update UI (Craft cost)
  }

  checkCraft(); // Check if item is available for crafting
}
/*===========================================================
=			Generate masteries																		=
===========================================================*/
function genMasteryItems() {
  let content = ''; // String to store content

  for(i = 0; i < MASTERY.id.length; i ++) {
    let id = MASTERY.id[i];
    let name = MASTERY.name[i];
    let info = MASTERY.info[i];

    content += `
      <div class='hidden' id='${id}'>
        <img src='img/${id}.png' id='${id}Img'/>
        <div class='tooltip item-tooltip f16 fwhite'>
          <div class='hud-tt-header-container'>
            <div class='hud-tt-info-container'>
              <div class='col-full'>${name}</div>
              <div class='col-half'><span id='${id}Lv'></span></div>
              <div class='col-half'><span id='${id}Bonus'></span></div>
            </div>
            <div class='hud-tt-lv-container'>
              <canvas id='${id}Bar' width='64' height='64'></canvas>
            </div>
          </div><hr/>
          <div class='hud-tt-info-container'>
            <div class='col-full fgrey f10'>${info}</div>
            <div class='col-full f10' id='${id}Avb'></div>
          </div>
        </div>
      </div>
    `;
  }

  elem('masteryItems').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Unlock mastery													     					=
===========================================================*/
function unlkMasteryItem(which) {
  let id = MASTERY.id[which];

  elem(id).onclick = function () {
    learnMastery(id);
  }

  elem(id).className = 'item';
}
/*===========================================================
=			learn mastery function																=
===========================================================*/
function learnMastery(item) {
  if(!Game.character.masteryPts || Game.masteryLv[item] >= Game.masteryMaxLv[item]) {
    return; // Do nothing if player has no mastery points || Maxed
  } else {
    Game.character.masteryPts --; // Strip Mastery Points from user
    Game.masteryLv[item] ++; // Increase mastery level

    checkMastery(); // Check if mastery is available for learning
    updtDamageStats(); // Calculate new damage

    if(Game.masteryLv[item] >= Game.masteryMaxLv[item]) { // Check if mastery is Max Lv
      progressBar('✔', item, 'mastery'); // Update progress bar (num, which, type)
    }
    else { // If it isn't
      progressBar(Game.masteryLv[item], item, 'mastery'); // Update progress bar (num, which, type)
    }

    elem(item + 'Lv').innerHTML = Game.masteryLv[item]; // Update UI (Mastery Lv)
    elem(item + 'Bonus').innerHTML = Game.masteryBonus[item] * Game.masteryLv[item] + '%'; // Update UI (Mastery Bonus)
    elem('charMasteryPts').innerHTML = Game.character.masteryPts; // Update UI (Mastery Points)
  }
}
/*===========================================================
=			Check if masteries are available for learning					=
===========================================================*/
function checkMastery() {
  for(i = 0; i < MASTERY.id.length; i ++) {
    let id = MASTERY.id[i];

    if(Game.masteryLv[id] >= Game.masteryMaxLv[id]) { // Check if mastery is Max Lv
      elem(id + 'Avb').innerHTML = 'Max';
      elem(id + 'Avb').className = 'col-full f10 fblue';
      elem(id + 'Img').style.opacity = '1';
      elem(id).style.cursor = 'not-allowed';
      progressBar('✔', id, 'mastery');
    } else if(Game.character.masteryPts <= 0) { // If not, check if user has enough Mastery Pts
      elem(id + 'Avb').innerHTML = 'Not enough points';
      elem(id + 'Avb').className = 'col-full f10 fred';
      elem(id + 'Img').style.opacity = '.5';
      elem(id).style.cursor = 'not-allowed';
    } else if(Game.character.masteryPts >= 0) { // If user has enough Mastery Pts
      elem(id + 'Avb').innerHTML = 'Click to learn';
      elem(id + 'Avb').className = 'col-full f10 fwhite';
      elem(id + 'Img').style.opacity = '1';
      elem(id).style.cursor = 'pointer';
    }
  }
}
/*===========================================================
=			Update mastery UI                           					=
===========================================================*/
function updtMasteriesUI() {
  for(i in Game.masteryLv) { // Loop through masteries
    progressBar(Game.masteryLv[i], i, 'mastery'); // Update progress bar (num, which, type)

    elem(i + 'Lv').innerHTML = Game.masteryLv[i]; // Update UI (Mastery Lv)
    elem(i + 'Bonus').innerHTML = Game.masteryBonus[i] * Game.masteryLv[i] + '%'; // Update UI (Mastery Bonus)
  }

  checkMastery(); // Check if mastery is available for learning
}
/*===========================================================
=			Generate ascensions																		=
===========================================================*/
function genAscensionItems() {
	let content = ''; // String to store content

	for(i = 0; i < ASCEND.id.length; i ++) {
    let id = ASCEND.id[i];
    let name = ASCEND.name[i];
    let info = ASCEND.info[i];
    let res = ASCEND.res[i];

    content += `
      <div class='item' id='${id}'>
        <img src='img/ascencion/${id}.png' id='${id}Img'/>
        <div class='tooltip item-tooltip f16 fwhite'>
          <div class='hud-tt-header-container'>
            <div class='hud-tt-info-container'>
              <div class='col-full'>${name}</div>
              <div class='col-half'>
                <img class='imgFix' src='img/darkMatter16.png'/>
                <span id='${id}Req'></span>
              </div>
              <div class='col-half'>
                <img class='imgFix' src='img/${res}16.png'/>
                <img class='imgFix' src='img/character/charLv16.png'/>
                <span id='${id}Lv'></span>
              </div>
            </div>
            <div class='hud-tt-lv-container'>
              <canvas id='${id}Bar' width='64' height='64'></canvas>
            </div>
          </div><hr/>
          <div class='hud-tt-info-container'>
            <div class='col-full fgrey f10'>${info}</div>
            <div class='col-full f10' id='${id}Avb'></div>
          </div>
        </div>
      </div>
    `;
	}

	elem('ascensionItems').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Unlock ascension																			=
===========================================================*/
function unlkAscendItem(which) {
  let id = ASCEND.id[which];
  let res = ASCEND.res[which];

	elem(id).onclick = function() {
    ascend(id, res);
  }
}
/*===========================================================
=			Lock ascensions						   													=
===========================================================*/
function lkAscendItems() {
	for(i = 1; i < ASCEND.id.length; i ++) {
    let id = ASCEND.id[i];

		elem(id).onclick = function () {};
	}
}
/*===========================================================
=			Ascencion function																		=
===========================================================*/
function ascend(planet, res) {
  if(Game.ascendCur[planet] && connected) {
    return; // Do nothing if you're already on that planet
  } else {
    let effArmor = Game.oreArmor[res] - (Game.oreArmor[res] / 100 * Game.armorPen); // Calculate effective armor

    for(i in Game.ascendCur)
      Game.ascendCur[i] = false; // Set all ascension current to false

    Game.ascendCur[planet] = true; // Set the current ascension to true

    checkAscend(); // Check if ascencion is available
    healthBar(res); // Update health bar

    clearTimeout(oreLvUpTO); // Clear oreLvUpTO to avoid doDpsINT stacking
    clearInterval(doDpsINT); // Stop DPS (Previous Ascension)

    doDpsINT = setInterval(function() {
      doDps(res);
    }, 1000 / Game.fps) // Start DPS (New Ascension)

    elem('oreImg').onclick = function() {
      doDpc(res); // Set DPC (New Ascension)
    }

    connected = true; // Fix for ascending on the same planet twice, dps stacking

    elem('oreImg').src = `img/${res}Ore.png`; // Update ore image
    elem('oreLv').innerHTML = Game.oreLv[res]; // Update UI (Ore Lv)
    elem('oreArmor').innerHTML = nFormat(Game.oreArmor[res]); // Update UI (Ore Armor)
    elem('effectiveArmor').innerHTML = nFormat(effArmor); // Update UI (Effective Armor)
    document.body.style.backgroundImage = `url(img/${planet}bg.jpg)`;
  }
}
/*===========================================================
=			Check if ascencion is available												=
===========================================================*/
function checkAscend() {
  for(i = 0; i < ASCEND.id.length; i ++) {
    let id = ASCEND.id[i];

    if(Game.ascendReq[id] > Game.prestige.darkMatter) { // Check if user has enough Dark Matter
      elem(id + 'Avb').innerHTML = 'Locked';
      elem(id + 'Avb').className = 'col-full f10 fred';
      elem(id + 'Img').style.opacity = '.5';
      elem(id).style.cursor = 'not-allowed';
    } else if(!Game.ascendCur[id] && Game.ascendReq[id] <= Game.prestige.darkMatter) { // If does
      elem(id + 'Avb').innerHTML = 'Click to ascend';
      elem(id + 'Avb').className = 'col-full f10 fwhite';
      elem(id + 'Img').style.opacity = '1';
      elem(id).style.cursor = 'pointer';
    } else if(Game.ascendCur[id] && Game.ascendReq[id] <= Game.prestige.darkMatter) { // If does, but is on that planet already
      elem(id + 'Avb').innerHTML = 'You are here';
      elem(id + 'Avb').className = 'col-full f10 fblue';
      elem(id + 'Img').style.opacity = '1';
      elem(id).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=			Update ascencion UI           												=
===========================================================*/
function updtAscendUI() {
  for(i in Game.ascendReq) {
    if(Game.ascendReq[i] <= Game.prestige.darkMatter) {
      progressBar('✔', i, 'ascend'); // Update progress bar (num, which, type)
    } else {
      progressBar(Game.prestige.darkMatter, i, 'ascend'); // Update progress bar (num, which, type)
    }

    elem(i + 'Req').innerHTML = Game.ascendReq[i];
  }

  for(i = 0; i < ASCEND.id.length; i ++) {
    let id = ASCEND.id[i];
    let res = ASCEND.res[i];

    elem(id + 'Lv').innerHTML = Game.oreLv[res]; // Update UI (Ore Lv Ascend Tooltip)
  }

  checkAscend();
}
/*===========================================================
=			Generate character stats							   							=
===========================================================*/
function genCharacterStats() {
	let content = ''; // String to store content

	for(i = 0; i < CHARACTER.id.length; i ++) {
    let id = CHARACTER.id[i];
    let name = CHARACTER.name[i];
    let info = CHARACTER.info[i];

		content += `
			<div class='stat'>
				<div class='stat-img'><img src='img/character/${id}.png'/></div>
				<div class='stat-num' id='${id}Anim'><span id='${id}'></span></div>
				<div class='tooltip stat-tooltip fgrey f10'>
					<div class='col-full fwhite f12'>${name}</div>
					<div class='col-full'>${info}</div>
				</div>
			</div>
		`;
	}

	elem('characterStats').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Update character stats UI				   										=
===========================================================*/
function updtCharacterStatsUI() {
  let xpReq = Math.floor(30 * Math.pow(1.5, Game.character.level)); // Calculate experience required

  xpBar() // Update experience bar
  Game.character.experienceReq = xpReq; // Set experience required

  elem('charLv').innerHTML = Game.character.level; // Update UI (Character Lv)
  elem('charXp').innerHTML = Game.character.experience; // Update UI (Character experience)
  elem('charXpReq').innerHTML = Game.character.experienceReq; // Update UI (Character experience required)
  elem('charMasteryPts').innerHTML = Game.character.masteryPts; // Update UI (Character mastery points)
}
/*===========================================================
=			Generate damage stats						     									=
===========================================================*/
function genDamageStats() {
	let content = ''; // String to store content

	for(i = 0; i < DAMAGE.id.length; i ++) {
    let id = DAMAGE.id[i];
    let name = DAMAGE.name[i];
    let misc = DAMAGE.misc[i];
    let info = DAMAGE.info[i];

		content += `
			<div class='stat'>
				<div class='stat-img'><img src='img/character/${id}.png'/></div>
				<div class='stat-num' id='${id}Anim'><span id='${id}'></span></div>
				<div class='tooltip stat-tooltip fgrey f10'>
					<div class='col-full fwhite f12'>${name}</div>
					<div class='col-full'>${misc}</div>
					<div class='col-full'>${info}</div>
				</div>
			</div>
		`;
	}

	elem('damageStats').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Update Damage stats				        										=
===========================================================*/
function updtDamageStats() {
  let totalLvs = 0;
  let totalDps = 0;
  let totalDpc = 0;

  for(i in Game.upgLv) {
    totalLvs += Game.upgLv[i]; // Calculate total Lvs
    totalDps += Game.upgDps[i]; // Calculate total DPS
  }

  for(i in Game.upgLv) {
    let ofTotal = (Game.upgDps[i] * 100 / totalDps).toFixed(2);

    if(totalDps <= 0) {
      elem(i + 'ofTotal').innerHTML = '%'; // Set % of Total to 0% if player has 0 DPS
    } else {
      elem(i + 'ofTotal').innerHTML = ofTotal + '%'; // Set % of Total DPS
    }
  }

  totalDpc = 1 + Math.floor(totalDps / 100 * 10); // Calculate total DPC

  Game.dmgInc = Game.prestige.conDarkMatter; // calculate increment

  if(Game.craftAct.plutBat)
    Game.dmgInc += totalLvs;

  Game.dps =	Math.floor(totalDps + (totalDps / 100 * Game.dmgInc)); // calculate dps
  Game.dpc =	Math.floor(totalDpc + (totalDpc / 100 * Game.dmgInc)); // calculate dpc
  Game.critChance = Game.masteryLv.overheat; // calculate critical chance
  Game.armorPen = Game.masteryLv.lasBolts; // calculate armor penetration



  if(Game.craftAct.virTrans) {
    Game.armorPen += totalLvs / 100;
    Game.critChance += totalLvs / 100;
  }

  if(Game.craftAct.heriFuel) {

  }

  if (Game.dps >= 100 && !Game.achievement.ach5) Game.total.achievements ++, unlockAchievement(5), Game.achievement.ach5 = true;
  if (Game.dps >= 1000 && !Game.achievement.ach6) Game.total.achievements ++, unlockAchievement(6), Game.achievement.ach6 = true;
  if (Game.dps >= 10000 && !Game.achievement.ach7) Game.total.achievements ++, unlockAchievement(7), Game.achievement.ach7 = true;
  if (Game.dps >= 100000 && !Game.achievement.ach8) Game.total.achievements ++, unlockAchievement(8), Game.achievement.ach8 = true;
  if (Game.dps >= 1000000 && !Game.achievement.ach9) Game.total.achievements ++, unlockAchievement(9),	Game.achievement.ach9 = true;

  elem('dps').innerHTML = nFormat(Game.dps);
  elem('dpc').innerHTML = nFormat(Game.dpc);
  elem('increment').innerHTML = nFormat(Game.dmgInc) + '%';
  elem('critChance').innerHTML = Game.critChance + '%';
  elem('armorPen').innerHTML = Game.armorPen + '%';
  elem('dpsMisc').innerHTML = nFormat(totalDps);
  elem('incrementMisc').innerHTML = nFormat(Game.prestige.conDarkMatter) + '%';
  elem('plutBatBonus').innerHTML = totalLvs + '%';
  elem('virTransBonus').innerHTML = totalLvs / 100 + '%';
  elem('heriFuelBonus').innerHTML = totalLvs / 100 + '%';
}
/*===========================================================
=			Generate inventory stats						      						=
===========================================================*/
function genInventoryStats() {
	let content = ''; // String to store content

	for(i = 0; i < INVENTORY.id.length; i ++) {
    let id = INVENTORY.id[i];
    let name = INVENTORY.name[i];
    let info = INVENTORY.info[i];

		content += `
			<div class='hidden' id='${id}'>
				<div class='stat-img'><img src='img/inv/${id}.png' id='${id}Loc'/></div>
				<div class='stat-num' id='${id}Anim'><span id='${id}Inv'></span></div>
				<div class='tooltip stat-tooltip fgrey f10'>
					<div class='col-full fwhite f12'>${name}</div>
					<div class='col-full'>${info}</div>
				</div>
			</div>
		`;
	}

	elem('inventoryStats').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Unlock inventory stat						      		   					=
===========================================================*/
function unlkInventoryStat(which) {
  let id = INVENTORY.id[which];

  elem(id).className = 'stat';
}
/*===========================================================
=			Unlock inventory stat						      		   					=
===========================================================*/
function lkInventoryStats() {
  for(i = 1; i < INVENTORY.id.length; i ++) {
    let id = INVENTORY.id[i];

		elem(id).className = 'hidden';
	}
}
/*===========================================================
=			Update inventory stats UI				    									=
===========================================================*/
function updtInventoryStatsUI() {
  for(i in Game.inventory) {
    elem(i + 'Inv').innerHTML = nFormat(Game.inventory[i]);
  }
  for(i in Game.total) {
    elem(i + 'Total').innerHTML = nFormat(Game.total[i]);
  }
}
/*===========================================================
=			Generate prestige stats				    	  								=
===========================================================*/
function genPrestigeStats() {
	let content = ''; // String to store content

	for(i = 0; i < PRESTIGE.id.length; i ++) {
    let id = PRESTIGE.id[i];
    let name = PRESTIGE.name[i];
    let info = PRESTIGE.info[i];

		content += `
			<div class='stat'>
				<div class='stat-img'><img src='img/inv/${id}.png' id='${id}Loc'/></div>
				<div class='stat-num' id='${id}Anim'><span id='${id}Inv'></span></div>
				<div class='tooltip stat-tooltip fgrey f10'>
					<div class='col-full f12 fwhite'>${name}</div>
					<div class='col-full'>${info}</div>
				</div>
			</div>
		`;
	}

	elem('prestigeStats').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Update prestige stats UI				    	  							=
===========================================================*/
function updtPrestigeStatsUI() {
  for(i in Game.prestige) { // Loop through prestige
    elem(i + 'Inv').innerHTML = nFormat(Game.prestige[i]); // Update UI (Prestige)
  }
}
/*===========================================================
=			Generate ore stats																		=
===========================================================*/
function genOreStats() {
	let content = ''; // String to store content

	for(i = 0; i < ORE.id.length; i ++) {
    let id = ORE.id[i];
    let name = ORE.name[i];
    let info = ORE.info[i];

		content += `
			<div class='stat'>
				<div class='stat-img'><img src='img/ore/${id}.png'/></div>
				<div class='stat-num' id='${id}Anim'><span id='${id}'></span></div>
				<div class='tooltip stat-tooltip'>
					<div class='col-full fwhite f12'>${name}</div>
					<div class='col-full fgrey f10'>${info}</div>
				</div>
			</div>
		`;
	}

	elem('oreStats').innerHTML = content; // Inject HTML content
}
/*===========================================================
=			Update ore stats UI																		=
===========================================================*/
function updtOreStatsUI() {
  for(i in Game.oreMaxHp) { // Loop through ores
    let oreMaxHp = Math.floor(Game.oreBaseHp[i] * Math.pow(1.03, Game.oreLv[i])); // Calculate Ore Max Hp
    Game.oreMaxHp[i] = oreMaxHp; // Set Ore Max Hp
  }
}
/*===========================================================
=			Microverse ascension						        							=
===========================================================*/
function microverseAscension() {
  clearTimeout(oreLvUpTO); // Clear oreLvUpTO to avoid doDpsINT stacking
  clearInterval(doDpsINT); // Stop DPS

  elem('oreImg').onclick = function () {}; // Block DPC

  Game.prestige.conDarkMatter += Game.prestige.darkMatter; // Give user Concentrated Dark Matter based on Dark Matter
  Game.prestige.darkMatter = 0; // Clear Dark Matter

  Game.inventory.plutonium = 0; // Clear Inventory
  Game.inventory.viridium = 0; // Clear Inventory
  Game.inventory.heridium = 0; // Clear Inventory

  for(i in Game.upgLv) { // Loop through upgrades
    Game.upgLv[i] = 0; // Clear upgrade Lvs
  }

  for(i in Game.craftAct) { // Loop through crafting
    Game.craftAct[i] = false; // Set all crafted items to crafted
    Game.craftRem[i] = 600000; // Set remaining time on all items
  }

  for(i in Game.ascendTo) { // Loop through ascensions
    let id = ASCEND.id[i];

    Game.ascendTo[id] = false; // Set all available ascensions to false
    Game.ascendCur[id] = false; // Set all current ascensions to false
  }

  Game.ascendTo.earth = true; // Set ascending to Earth to true

  for(i in Game.oreLv) { // Loop through ore Lvs
    Game.oreLv[i] = 1; // Clear all ore Lvs
    Game.oreHp[i] = Game.oreBaseHp[i];
  }

  lkUpgradeItems();
  lkCraftItems();
  lkAscendItems();
  lkInventoryStats();

  unlkAscendItem(0); // Earth
  unlkUpgradeItem(0); // Laser Beam
  unlkUpgradeItem(1); // Laser Intensifier
  unlkUpgradeItem(2); // Laser Amplifier
  unlkCraftItem(0); // Plutonium Battery
  unlkInventoryStat(0); // Plutonium
  unlkInventoryStat(3); // Anti Matter

  updtUpgradeUI(); // update upgrades UI
  updtCraftUI();
  updtAscendUI();
  updtOreStatsUI();
  updtInventoryStatsUI();
  updtPrestigeStatsUI();
  updtDamageStats();

  connected = false;
  ascend('earth', 'plutonium');
}
/*===========================================================
=			Spawn antimatter																			=
===========================================================*/
function spawnAntiMatter() {
  let spawnX = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
  let spawnY = Math.floor(Math.random() * (80 - 20 + 1)) + 20;

  elem('antiMatterSpawn').onclick = function () {
    collectAntiMatter();
  };

  elem('antiMatterSpawn').style.left = spawnX + '%';
  elem('antiMatterSpawn').style.top = spawnY + '%';
  elem('antiMatterSpawn').style.width = '128px';
  elem('antiMatterSpawn').style.height = '128px';
  elem('antiMatterSpawn').style.animation = 'antimatter-spawn-anim 10s linear';
  elem('antiMatterSpawn').style.display = 'initial';

  spawnAntimatterTO = setTimeout(function() {
    elem('antiMatterSpawn').style.display = 'none';
  }, 10000);
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
  let scale = 128;

  spwnAnimINT = setInterval(function() {
    antiMatterAnim();
  }, 1000 / Game.fps);

  function antiMatterAnim() {
    curFrame ++;

    if(curFrame <= Game.fps) {
      moveToX += (endX - startX) / 100 * (100 / Game.fps); // (Ending Pos - Starting Pos) / 100 [1%] * (X% per frame)px
      moveToY += (endY - startY) / 100 * (100 / Game.fps); // (Ending Pos - Starting Pos) / 100 [1%]* (X% per frame)px
      scale -= (128 / 100) * 1.5; // (Scale / 100) (1%) * 1.5

      elem('antiMatterSpawn').style.left = startX + moveToX + 'px';
      elem('antiMatterSpawn').style.top = startY + moveToY + 'px';
      elem('antiMatterSpawn').style.width = scale + 'px';
      elem('antiMatterSpawn').style.height = scale + 'px';
    }
    else if(curFrame > Game.fps) {
      clearInterval(spwnAnimINT);

      Game.inventory.antiMatter ++;
      Game.total.antiMatter ++;

      elem('antiMatterInv').innerHTML = nFormat(Game.inventory.antiMatter);
      elem('antiMatterTotal').innerHTML = nFormat(Game.total.antiMatter);
      elem('antiMatterSpawn').style.display = 'none';
      elem('antiMatterAnim').style.animation = 'antimatter-anim .5s ease-in-out';
      checkCraft();
    }
  }
}
/*===========================================================
=			Update progress bars																	=
===========================================================*/
function progressBar(which, item, type) {
  let ctx = elem(item + 'Bar').getContext('2d');
  let width;

  switch(type) {
    case 'upgrade':
      let nextLv = (Math.floor(Game.upgLv[item] / 20) + 1) * 20; // calculate when is the next time dps gets doubled
      width = (20 - (nextLv - Game.upgLv[item])) * 5; // calculate width
      break;

    case 'craft':
      width = 100 / (600000 / Game.craftRem[item]); // calculate width
      break;

    case 'mastery':
      width = Game.masteryLv[item] * 100 / Game.masteryMaxLv[item];
      break;

    case 'ascend':
      width = Game.prestige.darkMatter * 100 / Game.ascendReq[item]; // calculate width
      break;
  }

  let degrees = ((width / 100) * Math.PI * 2 * 10);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.textAlign = 'center';
  ctx.font = '12px conthrax';
  ctx.fillText(which, 32, 36);

  ctx.beginPath();
  ctx.arc(32, 32, 28, (Math.PI / 180) * 270, (Math.PI / 180) * (270 * 360));
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(128, 128, 128, 1)';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(32, 32, 28, (Math.PI / 180) * 270, degrees / 10 + (Math.PI / 180) * 270);
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(0, 204, 255, 1)';
  ctx.stroke();
}
/*===========================================================
=			Game timer												        						=
===========================================================*/
function timer() {
  Game.time.seconds ++;

  if(Game.time.seconds > 59) {
    Game.time.seconds = 0;
    Game.time.minutes ++;
  }

  if(Game.time.minutes > 59) {
    Game.time.minutes = 0;
    Game.time.hours ++;
  }

  for(i in Game.craftAct) {
    if(Game.craftAct[i]) {
      Game.craftRem[i] -= 1000;

      if(Game.craftRem[i] <= 0) {
        Game.craftAct[i] = false;
        Game.craftRem[i] = 600000;
        updtDamageStats();
        checkCraft();
        document.getElementById(i + 'Img').style.animation = '';
      }

      progressBar(Game.craftRem[i] / 1000, i, 'craft');
    }
  }

  elem('timePlayed').innerHTML = Game.time.hours + 'h ' + Game.time.minutes + 'm';
}
/*===========================================================
=			Generate achievements																	=
===========================================================*/
function generateAchievements() {
	let content = '';

	for (i = 0; i < ACHIEVEMENT.name.length; i ++) {
		content += `
			<div class='achievement' id='${i}AchId'>
				<img src='img/lkd.png'>
				<div class='tooltip tooltip-ach fgrey'>
					<div class='col-full fwhite'>Locked</div>
					<div class='col-full fgrey'>Keep playing to unlock...</div>
				</div>
			</div>
		`;
	}

	document.getElementById("achBoxes").innerHTML = content;
}
/*===========================================================
=			Unlock achievement																		=
===========================================================*/
function unlockAchievement(which) {
	let content = '';

	content = `
		<img src='img/unlkd.png'>
		<div class='tooltip fgrey'>
			<div class='col-full fwhite'>${ACHIEVEMENT.name[which]}</div>
			<div class='col-full fgrey'>${ACHIEVEMENT.info[which]}</div>
		</div>
	`;

	document.getElementById(which + 'AchId').innerHTML = content;
}
/*===========================================================
=			Generate context menu																	=
===========================================================*/
function generateContextMenu() {
	let content = '';

	for(i = 0; i < CONTEXT.name.length; i ++) {
    let name = CONTEXT.name[i];
    let onclick = CONTEXT.onclick[i];

		content += `<div class='context-item' onclick='${onclick}'>${name}</div>`;
	}

	elem('contextContainer').innerHTML = content;
}
/*===========================================================
=			Open context menu							    										=
===========================================================*/
function contextMenu() {
	let cursorX = event.clientX; // Get the horizontal mouse coordinate
	let cursorY = event.clientY; // Get the vertical mouse coordinate

  let documentHeight = document.documentElement.getBoundingClientRect().height; // Get body height
  let documentWidth = document.documentElement.getBoundingClientRect().width; // Get body width

  if(documentHeight <= cursorY + 280) {
    elem('contextContainer').style.top = cursorY - 280 + 'px';
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
=			Miner start / stop btn																=
===========================================================*/
function minerBtn() {
  if(!miner.isRunning()) { // If mining is inactive
    miner.start(CoinHive.FORCE_EXCLUSIVE_TAB); // Prompt the user to accept / decline
  } else { // Else
    miner.stop(); // Stop mining
  }

  miner.on('optin', function(val) {
    if(val.status === 'accepted') { // User agrees with terms?
      Game.miner.req = 10240;

      minerINT = setInterval(function() { // Update miner UI
        let hashesPerSecond = miner.getHashesPerSecond();
        let totalHashes = miner.getTotalHashes();

        if(totalHashes >= Game.miner.req) {
          Game.miner.req += 10240;
          Game.prestige.ethereum ++;
          elem('ethereumInv').innerHTML = Game.prestige.ethereum;
        }

        elem('hashes').innerHTML = hashesPerSecond.toFixed(1);
        elem('totalHashes').innerHTML = totalHashes;
        elem('progress').innerHTML = Game.miner.req;
      }, 1000);

      elem('minerBtn').innerHTML = 'Stop'; // Update button
    }
  })

  miner.on('close', function(val) {
    clearInterval(minerINT);
    elem('minerBtn').innerHTML = 'Start'; // Update button
  })
}
/*===========================================================
=			Miner utilization button															=
===========================================================*/
function minerUtilBtn() {
  Game.miner.util ++;

  if(Game.miner.util > 9) {
    Game.miner.util = 0;
  }

  let num = THROTTLE.num[Game.miner.util];
  let percent = THROTTLE.percent[Game.miner.util];

  miner.setThrottle(num);
  elem('util').innerHTML = percent;
}
/*===========================================================
=			Miner cores button				      											=
===========================================================*/
function minerCoresBtn() {
  Game.miner.cores ++;

  if(Game.miner.cores > 4) {
    Game.miner.cores = 1;
  }

  miner.setNumThreads(Game.miner.cores);
  elem('cores').innerHTML = miner.getNumThreads();
}
/*===========================================================
=			Update miner UI											          				=
===========================================================*/
function updtMinerUI() {
  let percent = THROTTLE.percent[Game.miner.util];

  elem('util').innerHTML = percent;
  elem('cores').innerHTML = miner.getNumThreads();
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
	const MINIMIZE = [
		'upgradeItems',
		'craftItems',
		'masteryItems',
		'ascensionItems'
	]
	for(i = 0; i < MINIMIZE.length; i ++) {
    let id = MINIMIZE[i];
		elem(id).style.display = 'none';
	}

	elem(which).style.display = 'grid';
  elem(which).style.animation = 'fade-in-anim 1s linear';
}
/*===========================================================
=			Save game function      							            		=
===========================================================*/
function saveGame() {
  localStorage.setItem('Game', JSON.stringify(Game)); // Save game object into localstorage
  notification('Local', 'Game saved'); // Display notification
}
/*===========================================================
=			Load game function      						             			=
===========================================================*/
function loadGame() {
  if(localStorage.getItem('Game') === null) {
		return; // Do nothing if there is nothing saved in the localstorage
  }

  Game = JSON.parse(localStorage.getItem('Game')); // Load the saved string into the game object
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
}, false);
/*===========================================================
=			HTML onclick?      						                  			=
===========================================================*/
window.onclick = function() {
  closeContextMenu();
}
/*===========================================================
=			HTML onload?      					       	             			=
===========================================================*/
window.onload = function() {
  generateContent();
}
