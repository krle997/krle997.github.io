/*global requestAnimationFrame cancelAnimationFrame performance Audio*/
(function () {

"use strict";
const Game = {
  name: "No Man's Click",
  version: "v0.9 Alpha",
  author: "Krle",
  Upgrades: {
    laserGun: {
      name: "Laser Gun",
      info: "Basic beam for your laser gun. Low price makes it efficient, scalable upgrade",
      res: "titanium",
      lv: 0,
      cost: 0,
      baseCost: 10,
      costPerLv: 1.04,
      dps: 0,
      baseDps: 1
    },
    advancedLasers: {
      name: "Advanced Lasers",
      info: "Intensifies the laser for more damage",
      res: "titanium",
      lv: 0,
      cost: 0,
      baseCost: 200,
      costPerLv: 1.04,
      dps: 0,
      baseDps: 20
    },
    laserAmplifier: {
      name: "Laser Amplifier",
      info: "Amplifies the laser strength",
      res: "titanium",
      lv: 0,
      cost: 0,
      baseCost: 4000,
      costPerLv: 1.04,
      dps: 0,
      baseDps: 400
    },
    lasergunCooler: {
      name: "Lasergun Cooler",
      info: "An excellent cooler that prevents your laser gun from ever heating up",
      res: "plutonium",
      lv: 0,
      cost: 0,
      baseCost: 10,
      costPerLv: 1.045,
      dps: 0,
      baseDps: 10000
    },
    reloadAccelerator: {
      name: "Reload Accelerator",
      info: "Reduces time needed to reload the LaserGun",
      res: "plutonium",
      lv: 0,
      cost: 0,
      baseCost: 200,
      costPerLv: 1.045,
      dps: 0,
      baseDps: 200000
    },
    ricochetLaser: {
      name: "Ricochet Laser",
      info: "Your lasergun can now shoot multiple laser beams simultaneously",
      res: "plutonium",
      lv: 0,
      cost: 0,
      baseCost: 4000,
      costPerLv: 1.045,
      dps: 0,
      baseDps: 4e6
    },
    plasmaLauncher: {
      name: "Plasma Launcher",
      info: "Bursts a lot of hot plasma, melting the Ores core",
      res: "chrysonite",
      lv: 0,
      cost: 0,
      baseCost: 10,
      costPerLv: 1.05,
      dps: 0,
      baseDps: 4e9
    },
    plasmaCooler: {
      name: "Plasma Cooler",
      info: "Hi-tech cooler for your Plasma Launcher",
      res: "chrysonite",
      lv: 0,
      cost: 0,
      baseCost: 200,
      costPerLv: 1.05,
      dps: 0,
      baseDps: 4e10
    },
    plasmaClip: {
      name: "Plasma Clip",
      info: "Holds so much more ammo than basic clip, meaning you wont have to reload very often",
      res: "chrysonite",
      lv: 0,
      cost: 0,
      baseCost: 4000,
      costPerLv: 1.05,
      dps: 0,
      baseDps: 4e11
    },
    plasmaCharger: {
      name: "Plasma Charger",
      info: "Charges your plasma gun, much like Laser Amplifier amplifies your laser",
      res: "armadium",
      lv: 0,
      cost: 0,
      baseCost: 10,
      costPerLv: 1.055,
      dps: 0,
      baseDps: 4e11
    },
    laserBurster: {
      name: "Laser Burster",
      info: "Your lasers burst upon impact, exploding and weakening ores core",
      res: "armadium",
      lv: 0,
      cost: 0,
      baseCost: 200,
      costPerLv: 1.055,
      dps: 0,
      baseDps: 4e11
    },
    laserIntensifier: {
      name: "Laser Intensifier",
      info: "Intensifies the lasers strength",
      res: "armadium",
      lv: 0,
      cost: 0,
      baseCost: 4000,
      costPerLv: 1.055,
      dps: 0,
      baseDps: 4e11
    },
    phaseBeam: {
      name: "Phase Beam",
      info: "Takes a while to charge, but hits like a rock",
      res: "solanium",
      lv: 0,
      cost: 0,
      baseCost: 10,
      costPerLv: 1.06,
      dps: 0,
      baseDps: 4e11
    },
    beamIntensifier: {
      name: "Beam Intensifier",
      info: "Makes the beam hit even stronger",
      res: "solanium",
      lv: 0,
      cost: 0,
      baseCost: 200,
      costPerLv: 1.06,
      dps: 0,
      baseDps: 4e11
    },
    multiBeam: {
      name: "Multi Beam",
      info: "Phase Beam can now shoot multiple beams at once",
      res: "solanium",
      lv: 0,
      cost: 0,
      baseCost: 4000,
      costPerLv: 1.06,
      dps: 0,
      baseDps: 4e11
    },
    beamCooler: {
      name: "Beam Cooler",
      info: "Hi-tech cooler for your Phase Beam",
      res: "singularity",
      lv: 0,
      cost: 0,
      baseCost: 10,
      costPerLv: 1.065,
      dps: 0,
      baseDps: 4e11
    },
    beamCharger: {
      name: "Beam Charger",
      info: "Charges the beam for more damage",
      res: "singularity",
      lv: 0,
      cost: 0,
      baseCost: 200,
      costPerLv: 1.065,
      dps: 0,
      baseDps: 4e11
    },
    phaseGun: {
      name: "Phase Gun",
      info: "A combination of your plasma and laser beam guns.",
      res: "singularity",
      lv: 0,
      cost: 0,
      baseCost: 4000,
      costPerLv: 1.065,
      dps: 0,
      baseDps: 4e11
    }
  },
  Crafting: {
    titaniumBattery: {
      name: "Titanium Battery",
      info: `
        <span class="fgreen">Titanium</span> is very common, so it's
        practically worthless. However, interesting things start to happen when
        you combine it with a little bit of
        <span class="fblue">Anti Matter</span>. This short-lived battery
        increases your <span class="fwhite">Damage Increment</span> by
        <span class="fwhite">0.1%</span> per each Upgrade Lv
      `,
      active: false,
      duration: 600,
      remaining: 600,
      cost: 10
    },
    plutoniumBattery: {
      name: "Plutonium Battery",
      info: "Increases Critical Hit and Armor Penetration by 0.01% per Upgrade Lv",
      active: false,
      duration: 600,
      remaining: 600,
      cost: 15
    },
    chrysoniteBattery: {
      name: "Chrysonite Battery",
      info: "Increases DPC by 0.01% per Upgrade Lv",
      active: false,
      duration: 600,
      remaining: 600,
      cost: 20
    },
    armadiumBattery: {
      name: "Armadium Battery",
      info: "Increases DPC by 0.01% per Upgrade Lv",
      active: false,
      duration: 600,
      remaining: 600,
      cost: 25
    },
    solaniumBattery: {
      name: "Solanium Battery",
      info: "Increases DPC by 0.01% per Upgrade Lv",
      active: false,
      duration: 600,
      remaining: 600,
      cost: 30
    },
    darkRadiation: {
      name: "Dark Radiation",
      info: "Doubles the efficiency of Concentrated Dark Matter",
      active: false,
      duration: 600,
      remaining: 600,
      cost: 35
    }
  },
  Ascensions: {
    earth: {
      name: "Earth",
      info: `
        Our species used to observe Earth back in the ancient times, and obduct
        humans for valuable research and experiments. Their brains had enormous
        capabilities, too bad they let greed and selfishness terminate them,
        along with every other living being on the planet. Over the course of
        millions of years, everything slowly degraded to dust, and since
        Titanium is very common here, it's formed ores are now widespread
        across the entire planet
      `,
      req: 0,
      current: false,
      oreId: "titanium",
      upgrades: [ "laserGun", "advancedLasers", "laserAmplifier" ],
      crafting: "titaniumBattery",
      inventory: [ "titanium", "antiMatter", "darkMatter" ]
    },
    grudnock: {
      name: "Grudnock",
      info: `
      Grudnock has everything a planet needs to support life, however there
      are no signs of any living being ever forming here. Just pure, untouched
      nature, and loads of Plutonium ores. They are tough, but also rare. Having
      some in stash surely wont go to waste
      `,
      req: 50,
      current: false,
      oreId: "plutonium",
      upgrades: [ "lasergunCooler", "reloadAccelerator", "ricochetLaser" ],
      crafting: "plutoniumBattery",
      inventory: [ "plutonium" ]
    },
    tetherus: {
      name: "Tetherus",
      info: `
      Tetherus is a Gas Giant. Nothing can ever form here except the chaotic
      environment. But Tetherus ring asteroids contain some Chrysonite, and that"s
      what you"re after
      `,
      req: 250,
      current: false,
      oreId: "chrysonite",
      upgrades: [ "plasmaLauncher", "plasmaCooler", "plasmaClip" ],
      crafting: "chrysoniteBattery",
      inventory: [ "chrysonite" ]
    },
    gazorpazorp: {
      name: "Gazorpazorp",
      info: `
      1 year of coding, Morty! Only 11 more years to go Moooor*buuuurp*ty!!
      `,
      req: 500,
      current: false,
      oreId: "armadium",
      upgrades: [ "plasmaCharger", "laserBurster", "laserIntensifier" ],
      crafting: "armadiumBattery",
      inventory: [ "armadium" ]
    },
    xeln: {
      name: "Xeln",
      info: `
      Xeln is completely covered in water. Nobody ever visited here before you.
      Who"d want to visit a planet covered with water anyway? Well, lucky for
      you, there are Solanium ores burried deep in the bottom of the ocean.
      Solanium is very extremely rare, and we"re in luck nobody bothered to visit
      this planet before us
      `,
      req: 1000,
      current: false,
      oreId: "solanium",
      upgrades: [ "phaseBeam", "beamIntensifier", "multiBeam" ],
      crafting: "solaniumBattery",
      inventory: [ "solanium" ]
    },
    blackhole: {
      name: "Black Hole",
      info: `
      Black Holes still remain a mystery to this day. Destroying one
      is almost impossible. If you manage to break it, you will find
      Singularity in it"s core. Nobody can yet decode it, and there are
      very few who can obtain it
      `,
      req: 2000,
      current: false,
      oreId: "singularity",
      upgrades: [ "beamCooler", "beamCharger", "phaseGun" ],
      crafting: "darkRadiation",
      inventory: [ "singularity" ]
    }
  },
  Ores: {
    titanium: {
      name: "Titanium",
      ascendId: "earth",
      lv: 1,
      zone: 0,
      hp: 10,
      baseHp: 10,
      maxHp: 0,
      hpPerLv: 1.03,
      armor: 0,
      armorPerLv: 1.0,
      antiMatterRate: 50,
      darkMatterRate: 20,
      rewarded: false
    },
    plutonium: {
      name: "Plutonium",
      ascendId: "grudnock",
      lv: 1,
      zone: 0,
      hp: 0,
      baseHp: 50e6,
      maxHp: 0,
      hpPerLv: 1.035,
      armor: 10000,
      armorPerLv: 1.01,
      antiMatterRate: 55,
      darkMatterRate: 25,
      rewarded: false
    },
    chrysonite: {
      name: "Chrysonite",
      ascendId: "tetherus",
      lv: 1,
      zone: 0,
      hp: 1e6,
      baseHp: 1e6,
      maxHp: 0,
      hpPerLv: 1.04,
      armor: 10000,
      armorPerLv: 1.02,
      antiMatterRate: 60,
      darkMatterRate: 14,
      rewarded: false
    },
    armadium: {
      name: "Armadium",
      ascendId: "gazorpazorp",
      lv: 1,
      zone: 0,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      hpPerLv: 1.045,
      armor: 1e6,
      armorPerLv: 1.03,
      antiMatterRate: 65,
      darkMatterRate: 16,
      rewarded: false
    },
    solanium: {
      name: "Solanium",
      ascendId: "xeln",
      lv: 1,
      zone: 0,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      hpPerLv: 1.05,
      armor: 1e6,
      armorPerLv: 1.04,
      antiMatterRate: 70,
      darkMatterRate: 18,
      rewarded: false
    },
    singularity: {
      name: "Singularity",
      ascendId: "blackhole",
      lv: 1,
      zone: 0,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      hpPerLv: 1.055,
      armor: 1e6,
      armorPerLv: 1.05,
      antiMatterRate: 75,
      darkMatterRate: 20,
      rewarded: false
    }
  },
  Inventory: {
    titanium: {
      name: "Titanium",
      info: `
      <span class="fgreen">Titanium</span> is an oxide. It's very common, but
      also very easily obtainable. You can mine it on planet
      <span class="fwhite">Earth</span>
      `,
      amount: 0
    },
    plutonium: {
      name: "Plutonium",
      info: `
      <span class="fgreen">Plutonium</span> is an isotope. It's rarity is
      moderate, but still it"s not that hard to find. You can mine it on planet
      <span class="fwhite">Grudnock</span>
      `,
      amount: 0
    },
    chrysonite: {
      name: "Chrysonite",
      info: `
      <span class="fgreen">Chrysonite</span> is a silicate. It is hard to find,
      but it"s worth a lot. You can mine it on planet <span class="fwhite">
      Tetherus</span>
      `,
      amount: 0
    },
    armadium: {
      name: "Armadium",
      info: `
      <span class="fgreen">Armadium</span> is very important to me Morty. I need
      it for... research Morty, and to make some... Ugh, space dust, Morty... For
      even more research, Morty! Go get me some on planet <span class="fwhite">
      Gazorpazorp</span>
      `,
      amount: 0
    },
    solanium: {
      name: "Solanium",
      info: `
      <span class="fgreen">Solanium</span> can't be re-created, unlike everything
      else in the universe. It doesn't belong here. UFO's we have been spotting
      might have been a product of another reality - explains how
      <span class="fgreen">Solanium</span> wandered up here. You can mine it on
      planet <span class="fwhite">Xeln</span>
      `,
      amount: 0
    },
    singularity: {
      name: "Singularity",
      info: `
      <span class="fgreen">Singularity</span> is burried deep within the
      <span class="fwhite">Black Hole</span>. Many have tried to obtain it, but
      unfortunately none of them came back
      `,
      amount: 0
    },
    antiMatter: {
      name: "Anti Matter",
      info: `
      <span class="fblue">Anti Matter</span> is a powerful element, and the
      strongest, but shortest-lasting source of energy in the whole universe
      `,
      amount: 0
    },
    darkMatter: {
      name: "Dark Matter",
      info: `
      <span class="fpurple">Dark Matter</span> is a very powerful element. It can
      bend space-time, alowing you to travel to distant planets faster than the
      speed of light
      `,
      amount: 0
    },
    cDarkMatter: {
      name: "Concentrated Dark Matter",
      info: `
      <span class="forange">Concentrated Dark Matter</span> is a mythical
      element. It can manipulate timeflow itself
      `,
      amount: 0
    }
  },
  Account: {
    character: {
      name: "Character",
      tooltipContent: `
      Lv: <span class="fwhite f16" id="charLv"></span><br>
      Xp: <span class="fwhite f16" id="charXp"></span><br>
      Time Played: <span class="fwhite f16" id="timePlayed"></span><br>
      Total Clicks: <span class="fwhite f16" id="clicksTotal"></span><br>
      Total Critical Hits: <span class="fwhite f16" id="critHitsTotal"></span>
      `
    },
    achievements: {
      name: "Achievements",
      tooltipContent: `
      Unlocked: <span class="fwhite f16" id="charAch"></span><hr>
      Achievements are split in category trees. They indicate a milestone that
      you have reached. Unlocking all achievements in the same tree unlocks
      unique avatars for your character
      `,
      unlocked: 0
    },
    masteries: {
      name: "Masteries",
      tooltipContent: `
      <span class="fgreen">Common</span>: <span class="fwhite f16">0 / 105</span><br>
      <span class="fblue">Rare</span>: <span class="fwhite f16">0 / 50</span><br>
      <span class="fpurple">Epic</span>: <span class="fwhite f16">0 / 15</span><br>
      <span class="forange">Legendary</span>: <span class="fwhite f16">0 / 3</span><hr>
      <span class="fred">Masteries are in developement!</span><br>
      Masteries are divided into four categories. You will receive 1 random
      Mastery Point each time your Character levels up. Masteries are permanent
      and last through Microverses
      `,
      total: {
        common: 0,
        rare: 0,
        epic: 0,
        legendary: 0
      }
    }
  },
  Modals: {
    character: {
      name: "Character",
      content: `
      <div class="character-modal">
      <div class="microverse">
      <p class="fwhite">The Microverse Ascension</p>
      This technology allows us to create new universes like ours, and explore them.
      Transitioning inside a new universe destroys all upgrades, crafted items,
      progression, and inventory (excluding Anti Matter and Frost Crystals).
      Aditionaly, your Dark Matter gets converted into Concentrated Dark Matter.
      Each increases your Damage Increment by 1%.<br>
      <span class="fred">Are you sure you want to proceed?</span>
      <div class="modal-btn" onclick="muteSounds()">Sounds: <span class="fblue" id="sounds"></span></div>
      <div class="modal-btn" onclick="changeFps()">FPS: <span class="fblue" id="fps"></span></div>
      <div class="modal-btn" onclick="microverseAscension()">Let"s do it!</div>
      </div>
      Total Frost Crystal: <span class="fwhite f16" id="frostCrystalTotal"></span>
      </div>
      <div class="modal-btn fcenter" id="characterBtn">Close</div>
      `
    },
    achievements: {
      name: "Achievements",
      content: `
      <div class="modal-content nine-per-row" id="achievementItems"></div>
      <div class="modal-btn fcenter" id="achievementsBtn">Close</div>
      `
    },
    masteries: {
      name: "Masteries",
      content: `
      <div class="modal-content nine-per-row" id="masteryItems"></div>
      <div class="modal-btn fcenter" id="masteriesBtn">Close</div>
      `
    }
  },
  Character: {
    userName: "Player",
    lv: 0,
    xp: 0,
    xpReq: 30,
    dps: 0,
    dpc: 0,
    increment: 0,
    critChance: 0,
    armorPen: 0,

    time: {
      seconds: 0,
      minutes: 0,
      hours: 0
    },

    total: {
      clicks: 0,
      critHits: 0,
      titanium: 0,
      plutonium: 0,
      chrysonite: 0,
      armadium: 0,
      solanium: 0,
      singularity: 0,
      antiMatter: 0,
      frostCrystal: 0
    },

    highestLv: {
      titanium: 0,
      plutonium: 0,
      chrysonite: 0,
      armadium: 0,
      solanium: 0,
      singularity: 0
    }
  },
  Achievements: {
    titanium: {
      name: `
      Titanium Mining<br>
      <span class="fgrey">So far:</span> <span class="f16" id="titaniumTotal"></span> <img class="imgFix" src="img/inv/titanium16.png">
      `,
      misc: `
      <div id="titaniumAchievements"></div><hr>
      Reward: Titanium Helmet
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    earth: {
      name: `
      Titanium Domination<br>
      <span class="fgrey">Highest Lv:</span> <span class="f16" id="titaniumHighestLv"></span> <img class="imgFix" src="img/character/lv16.png">
      `,
      misc: `
      <div id="earthAchievements"></div><hr>
      Reward: Titanium Obliterator
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    plutonium: {
      name: `
      Plutonium Mining<br>
      <span class="fgrey">So far:</span> <span class="f16" id="plutoniumTotal"></span> <img class="imgFix" src="img/inv/plutonium16.png">
      `,
      misc: `
      <div id="plutoniumAchievements"></div><hr>
      Reward: Plutonium Lover Avatar
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    grudnock: {
      name: `
      Grudnock Invasion<br>
      <span class="fgrey">Highest Lv:</span> <span class="f16" id="plutoniumHighestLv"></span> <img class="imgFix" src="img/character/lv16.png">
      `,
      misc: `
      <div id="grudnockAchievements"></div><hr>
      Reward: Grudnock God Avatar
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    chrysonite: {
      name: `
      Chrysonite Mining<br>
      <span class="fgrey">So far:</span> <span class="f16" id="chrysoniteTotal"></span> <img class="imgFix" src="img/inv/chrysonite16.png">
      `,
      misc: `
      <div id="chrysoniteAchievements"></div><hr>
      Reward: Chrysonite Toxin Avatar
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    tetherus: {
      name: `
      Tetheruss Rings Collab<br>
      <span class="fgrey">Highest Lv:</span> <span class="f16" id="chrysoniteHighestLv"></span> <img class="imgFix" src="img/character/lv16.png">
      `,
      misc: `
      <div id="tetherusAchievements"></div><hr>
      Reward: Tethered Avatar
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    armadium: {
      name: `
      Armadium Mining<br>
      <span class="fgrey">So far:</span> <span class="f16" id="armadiumTotal"></span> <img class="imgFix" src="img/inv/armadium16.png">
      `,
      misc: `
      <div id="armadiumAchievements"></div><hr>
      Reward: Armadium Nobel
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    gazorpazorp: {
      name: `
      Wubba Lubba Dub Dub<br>
      <span class="fgrey">Highest Lv:</span> <span class="f16" id="armadiumHighestLv"></span> <img class="imgFix" src="img/character/lv16.png">
      `,
      misc: `
      <div id="gazorpazorpAchievements"></div><hr>
      Reward: Ricked Avatar
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    solanium: {
      name: `
      Solanium Mining<br>
      <span class="fgrey">So far:</span> <span class="f16" id="solaniumTotal"></span> <img class="imgFix" src="img/inv/solanium16.png">
      `,
      misc: `
      <div id="solaniumAchievements"></div><hr>
      Reward: Solanium Addict
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    xeln: {
      name: `
      Underwater Triumph<br>
      <span class="fgrey">Highest Lv:</span> <span class="f16" id="solaniumHighestLv"></span> <img class="imgFix" src="img/character/lv16.png">
      `,
      misc: `
      <div id="xelnAchievements"></div><hr>
      Reward: Water Element Helmet
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    singularity: {
      name: `
      Singularity Origins<br>
      <span class="fgrey">So far:</span> <span class="f16" id="singularityTotal"></span> <img class="imgFix" src="img/inv/singularity16.png">
      `,
      misc: `
      <div id="singularityAchievements"></div><hr>
      Reward: Singular Mass
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    blackhole: {
      name: `
      Deep Rabbit Hole<br>
      <span class="fgrey">Highest Lv:</span> <span class="f16" id="singularityHighestLv"></span> <img class="imgFix" src="img/character/lv16.png">
      `,
      misc: `
      <div id="blackholeAchievements"></div><hr>
      Reward: Pocket Hole
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    antiMatter: {
      name: `
      Anti Matter Collecting<br>
      <span class="fgrey">So far:</span> <span class="f16" id="antiMatterTotal"></span> <img class="imgFix" src="img/inv/antiMatter16.png">
      `,
      misc: `
      <div id="antiMatterAchievements"></div><hr>
      Reward: Anti Matterialistic
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    },
    cDarkMatter: {
      name: "Concentrated Power",
      misc: `
      <div id="cDarkMatterAchievements"></div><hr>
      Reward: Undying
      `,
      unlocked: 0,
      ach: {
        One: false,
        Two: false,
        Three: false,
        Four: false,
        Five: false,
        Six: false,
        Seven: false,
        Eight: false,
        Nine: false,
        Ten: false
      }
    }
  },
  Masteries: {
    overheat: {
      name: "Overheat",
      info: "Increases Critical Chance by 1% per mastery Lv",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fgreen\">Common</span>"
    },
    extractor: {
      name: "Extractor",
      info: "Increases mined resources found by 10% per mastery Lv",
      lv: 0,
      maxLv: 8,
      bonus: 10,
      type: "<span class=\"fgreen\">Common</span>"
    },
    piercer: {
      name: "Piercer",
      info: "Increases Armor Penetration by 1% per mastery Lv",
      lv: 0,
      maxLv: 8,
      bonus: 10,
      type: "<span class=\"fgreen\">Common</span>"
    },
    mastery4: {
      name: "Mastery 4",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery5: {
      name: "Mastery 5",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery6: {
      name: "Mastery 6",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery7: {
      name: "Mastery 7",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery8: {
      name: "Mastery 8",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery9: {
      name: "Mastery 9",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery10: {
      name: "Mastery 10",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery11: {
      name: "Mastery 11",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery12: {
      name: "Mastery 12",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery13: {
      name: "Mastery 13",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery14: {
      name: "Mastery 14",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery15: {
      name: "Mastery 15",
      info: "Info",
      lv: 0,
      maxLv: 8,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    synergy: {
      name: "Synergy",
      info: "Aditionaly increases your DPC by 1% of total DPS per mastery Lv",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fblue\">Rare</span>"
    },
    blaster: {
      name: "Blaster",
      info: "Increases your Critical Hit Damage by 10% per mastery Lv",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fblue\">Rare</span>"
    },
    mastery18: {
      name: "Mastery 18",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery19: {
      name: "Mastery 19",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery20: {
      name: "Mastery 20",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery21: {
      name: "Mastery 21",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery22: {
      name: "Mastery 22",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery23: {
      name: "Mastery 23",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery24: {
      name: "Mastery 24",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery25: {
      name: "Mastery 25",
      info: "Info",
      lv: 0,
      maxLv: 5,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery26: {
      name: "Mastery 26",
      info: "Info",
      lv: 0,
      maxLv: 3,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery27: {
      name: "Mastery 27",
      info: "Info",
      lv: 0,
      maxLv: 3,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery28: {
      name: "Mastery 28",
      info: "Info",
      lv: 0,
      maxLv: 3,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery29: {
      name: "Mastery 29",
      info: "Info",
      lv: 0,
      maxLv: 3,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery30: {
      name: "Mastery 30",
      info: "Info",
      lv: 0,
      maxLv: 3,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery31: {
      name: "Mastery 31",
      info: "Info",
      lv: 0,
      maxLv: 1,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery32: {
      name: "Mastery 32",
      info: "Info",
      lv: 0,
      maxLv: 1,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    },
    mastery33: {
      name: "Mastery 33",
      info: "Info",
      lv: 0,
      maxLv: 1,
      bonus: 1,
      type: "<span class=\"fred\">In Developement</span>"
    }
  },
  Damage: {
    dps: {
      name: "Damage per Second",
      info: `
      This is how much damage you do each second. DPS cannot critically hit, and
      can be reduced by Ores Armor.
      `,
      misc: `
      Critical Chance : <span class="fwhite f16">0%</span><br>
      Armor Pen : <span class="fwhite f16" id="armorPen"></span>
      `
    },
    dpc: {
      name: "Damage per Click",
      info: `
      This is how much damage you do each click. DPC can critically hit, dealing
      significantly more damage. DPC also completely ignores Ores Armor. DPC
      can't be increased and it's always fixed at 5% of your total DPS.
      `,
      misc: `
      Critical Chance : <span class="fwhite f16" id="critChance"></span><br>
      Armor Pen : <span class="fwhite f16">100%</span>
      `
    },
    increment: {
      name: "Damage Increment",
      info: `
      Increases both DPS and DPC by a percentage. Damage Increment can be
      increased in various ways.
      `,
      misc: `
      From <img src="img/inv/cDarkMatter16.png"> : <span class="fwhite f16" id="fromCDarkMatter"></span>
      `
    }
  },
  Donate: {
    bitcoin: {
      name: "Bitcoin",
      info: `
      Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing
      transactions and the issuing of bitcoins is carried out collectively by the network.
      Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone
      can take part<br>
      More - <span class="fblue">https://bitcoin.org</span>
      `,
      addr: "13yxBLa2cCici4VrsTTvjAP1vUzA5NwLx3"
    },
    ethereum: {
      name: "Ethereum",
      info: `
      Ethereum is a decentralized platform that runs smart contracts: applications that run exactly
      as programmed without any possibility of downtime, censorship, fraud or third-party interference<br>
      More - <span class="fblue">https://ethereum.org</span>
      `,
      addr: "0xAFE7502c7aC013306bF5c7399FDd7f73c1f69E54"
    }
  },
  Tutorials: {
    account: {
      name: "Account",
      info: `
      Here you can keep track of everything that you"ve accomplished so far.
      There is no particular goal in <span class="fblue">No Man"s Click</span>;
      it"s up to you to decide how you want to play this game, and how far you
      are willing to go
      `,
      tooltip: "panel-tooltip-left"
    },
    donate: {
      name: "Donate",
      info: `
      I will never display ads or make the game pay to win to generate revenue.
      I"m going to be relying on the good will of other people to do so. Every
      donation will be greatly appreciated. Thank you!
      `,
      tooltip: "panel-tooltip-left"
    },
    damage: {
      name: "Damage",
      info: "Do you really need an explanation for this? Really?",
      tooltip: "panel-tooltip-left"
    },
    inventory: {
      name: "Inventory",
      info: `
      All that you have collected and saved up so far is being displayed here -
      some of these can be spent for various Upgrades, or for Crafting. Others
      can"t be spent but provide strong passive benefits, and are fundamentals
      for further advancement
      `,
      tooltip: "panel-tooltip-left"
    },
    ore: {
      name: "<span id=\"oreName\"></span>",
      info: `
      Zone : <span class="fwhite f16" id="oreProgress"></span><br>
      Total Hp : <span class="fwhite f16" id="oreMaxHp"></span><br>
      Armor : <span class="fwhite f16" id="oreArmor"></span>
      (Eff : <span class="fwhite f16" id="effectiveArmor"></span>)<hr>
      Total Hp / Lv : <span class="fwhite f16" id="oreHpPerLv"></span><br>
      Armor / Lv : <span class="fwhite f16" id="oreArmorPerLv"></span><br>
      Xp / Zone : <span class="fwhite f16">+ 1</span><br>
      <img class="imgFix" src="img/inv/antiMatter16.png"> Drop Rate / Lv : <span class="fwhite f16" id="antiMatterDropRate"></span><br>
      <img class="imgFix" src="img/inv/darkMatter16.png"> Drop Rate / Lv : <span class="fwhite f16" id="darkMatterDropRate"></span>
      `,
      tooltip: "ore-tooltip"
    },
    upgrades: {
      name: "Upgrades",
      info: `
      Collect <span class="fgreen">resources</span> so you can buy various
      <span class="fwhite">Upgrades</span> and increase your
      <span class="fwhite">DPS</span>. Each <span class="fwhite">Upgrade</span>
      has their individual <span class="fwhite">DPS</span> doubled every
      <span class="fwhite">20</span> Lvs<hr>
      <img class="img-mid" id="zBtn" src="img/kbd/z.png"> Buy <span class="fwhite f16">x 1</span> Lv<br>
      <img class="img-mid" id="xBtn" src="img/kbd/x.png"> Buy <span class="fwhite f16">x 20</span> Lvs<br>
      <img class="img-mid" id="cBtn" src="img/kbd/c.png"> Buy <span class="fwhite f16">x 100</span> Lvs
      `,
      tooltip: "panel-tooltip-right"
    },
    crafting: {
      name: "Crafting",
      info: `
      Find <span class="fblue">Anti Matter</span> to Craft items,
      and speed up your progression. Crafted items only last for a limited
      amount of time, but offer strong, scaling bonuses
      `,
      tooltip: "panel-tooltip-right"
    },
    ascend: {
      name: "Ascend",
      info: `
      Acumulate <span class="fpurple">Dark Matter</span> to unlock new ascensions
      Unlocking new ascension also unlocks 3 new upgrades and 1 new crafting
      item. Each ascension has a unique mineable ore
      `,
      tooltip: "panel-tooltip-right"
    }
  },
  Animations: {
    resource: {},
    damageText: {},
    notification: {}
  },

  muted: true,
  buyQuantity: 1,

  connected: false,

  oreStartTo: null,

  dpsAnimFrame: null,
  dpsAnimStart: null,

  loopInt: undefined,
  loopStarted: undefined
};
/*========== Personal Diary ==========
  - Declarations
  lowerCase : let, function, function parameters, object keys
  UPPER_CASE : const

  - Default function parameters
  (k)ey : Default
  (p)roperty : If (k)ey is already defined
  (v)alue : Default
  (i)nteger : If (v)alue is already defined

  - Quotation marks
  (")string(") : Default
  (`)string(`) : Multiline string
  (')string(') : AVOID!
====================================*/
const UPG = Game.Upgrades; // >global<
const CRF = Game.Crafting; // >global<
const ASC = Game.Ascensions; // >global<
const ORE = Game.Ores; // >global<
const INV = Game.Inventory; // >global<
const ACC = Game.Account; // >global<
const MDL = Game.Modals; // >global<
const CHR = Game.Character; // >global<
const ACH = Game.Achievements; // >global<
const MST = Game.Masteries; // >global<
const DMG = Game.Damage; // >global<
const DMT = Game.Donate; // >global<
const TUT = Game.Tutorials; // >global<
const ANIM = Game.Animations; // >global<

const elem = function(k) { // >generateUpgrade<, >global<
  return document.getElementById(k);
};
const save = function(k, v) { // >gameLoop<
  localStorage.setItem(k, JSON.stringify(v));
};
const load = function(k) { // >startGame<
  return JSON.parse(localStorage.getItem(k));
};
const nFormat = function(number) { // >updateUpgrade<, >global<
  if(number === 0) {
    return `${number}`;
  }

  const SI_PREFIXES = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];

  const tier = SI_PREFIXES.filter((n) => number >= n.value).pop();
  const numberFixed = (number / tier.value);

  return `${numberFixed.toFixed(2)}${tier.symbol}`;
};
const progressBar = function(k, width) { // >updateUpgrade<, >global<
  elem(`${k}Progress`).style.width = `${width}%`;
};
const healthBar = function(k) { // >updateOreStats<
  const WIDTH = ORE[k].hp * 100 / ORE[k].maxHp;

  elem("oreHp").innerHTML = nFormat(ORE[k].hp);
  elem("oreHpBar").style.width = `${WIDTH}%`;
};
const oreProgressBar = function(k) { //>updateOreStats<
  const WIDTH = ORE[k].zone * 10;

  elem("oreProgress").innerHTML = `${ORE[k].zone} / 10`;
  elem("oreProgBar").style.width = `${WIDTH}%`;
};
const playAudio = function(k) { // >global<
  if(!Game.muted) {
    const AUDIO = new Audio(`sounds/${k}.wav`);
    AUDIO.play();
  }
};
const stopDamage = function() { // >clickClear<, >ascend<
  cancelAnimationFrame(Game.dpsAnimFrame);

  elem("oreImg").onclick = function() {
    return false;
  };
};

const updateOreStats = function(k) { // >startGame<
  const MAX_HP = Math.floor(ORE[k].baseHp * Math.pow(ORE[k].hpPerLv, ORE[k].lv));
  const EFF_ARMOR = ORE[k].armor - (ORE[k].armor / 100 * CHR.armorPen);

  ORE[k].maxHp = MAX_HP;

  healthBar(k);
  oreProgressBar(k);

  elem("oreName").innerHTML = ORE[k].name;
  elem("oreLv").innerHTML = ORE[k].lv;
  elem("oreMaxHp").innerHTML = nFormat(ORE[k].maxHp);
  elem("oreHpPerLv").innerHTML = `+ ${(ORE[k].hpPerLv * 100) - 100}`;
  elem("oreArmor").innerHTML = nFormat(ORE[k].armor);
  elem("oreArmorPerLv").innerHTML = `+ ${(ORE[k].armorPerLv * 100) - 100}`;
  elem("effectiveArmor").innerHTML = nFormat(EFF_ARMOR);
  elem("antiMatterDropRate").innerHTML = `${ORE[k].antiMatterRate}%`;
  elem("darkMatterDropRate").innerHTML = `${ORE[k].darkMatterRate}%`;
};

const notificationRaf = function(time, k) {
  ANIM.notification[k].opacity -= 0.01;

  elem(`notification${k}`).style.opacity = ANIM.notification[k].opacity;

  if(ANIM.notification[k].opacity <= 0) {
    elem(`notification${k}`).parentNode.removeChild(elem(`notification${k}`));

    delete ANIM.notification[k];

    save("notifications", ANIM.notification[k]);
  }
  else {
    ANIM.notification[k].raf = requestAnimationFrame(function(time) {
      notificationRaf(time, k);
    });
  }
};
const closeNotification = function(k) { // >displayNotification<
  elem(`notification${k}Close`).onclick = function() {
    return false;
  };

  ANIM.notification[k].raf = requestAnimationFrame(function(time) {
    notificationRaf(time, k);
  });
};
const displayNotification = function(k) { // >gNotification<
  const HTML = `
    <div class="notification" id="notification${k}">
      <div class="notification-header fcenter fwhite">
        ${ANIM.notification[k].header}
        <div class="notification-btn f16" id="notification${k}Close">X</div>
      </div>
      <div class="notification-content">
        ${ANIM.notification[k].content}
      </div>
    </div>
  `;

  elem("notificationContainer").insertAdjacentHTML("afterbegin", HTML);
  elem(`notification${k}Close`).onclick = function() {
    closeNotification(k);
  };
};
const gNotification = function(name, text) { // >global<
  const k = Math.random();

  const makeNotification = function() {
    return {
      header: name,
      content: text,
      opacity: 1,
      raf: undefined
    };
  };

  ANIM.notification[k] = makeNotification();

  displayNotification(k);

  save("notifications", ANIM.notification);
};

const unlockAchievement = function(k, i) {// >checkLootAch<
  ACH[k].ach[i] = true;
  ACH[k].unlocked += 1;
  ACC.achievements.unlocked += 1;

  save(`${k + i}`, ACH[k].ach[i]);

  elem(`${k + i}`).innerHTML = "✓";
  elem(`${k + i}`).className = "fgreen f16";

  const WIDTH = ACH[k].unlocked * 100 / 10;
  progressBar(k, WIDTH);
};
const checkLootAch = function(k) { // >giveLoot<
  const RES_GOALS = {
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
  };

  Object.keys(RES_GOALS).forEach(function(p) {
    if(CHR.total[k] >= RES_GOALS[p] && !ACH[k].ach[p]) {
      unlockAchievement(k, p);
    }
  });
};

const resourceRafFade = function(time, k) { // >resourceRafFall<
  ANIM.resource[k].opacity -= 0.02;
  elem(`resource${k}`).style.opacity = ANIM.resource[k].opacity;

  if(ANIM.resource[k].opacity > 0) {
    ANIM.resource[k].rafFade = requestAnimationFrame(function(time) {
      resourceRafFade(time, k);
    });
  }
  else if(ANIM.resource[k].opacity <= 0) {
    elem(`resource${k}`).parentNode.removeChild(elem(`resource${k}`));
    delete ANIM.resource[k];
  }
};
const resourceRafFall = function(time, id) { // >gResource<
  let resourcePos = elem("resourceContainer").getBoundingClientRect();

  ANIM.resource[id].gravityPull += 0.1;
  ANIM.resource[id].y += ANIM.resource[id].gravityPull;
  ANIM.resource[id].x += ANIM.resource[id].side;

  if(ANIM.resource[id].y >= resourcePos.height - 64) {
    ANIM.resource[id].y = resourcePos.height - 64;
    ANIM.resource[id].gravityPull = -(ANIM.resource[id].gravityPull * ANIM.resource[id].bounce);
    ANIM.resource[id].bounces += 1;
  }

  elem(`resource${id}`).style.left = ANIM.resource[id].x + "px";
  elem(`resource${id}`).style.top = ANIM.resource[id].y + "px";

  if(ANIM.resource[id].bounces < 4) {
    ANIM.resource[id].rafFall = requestAnimationFrame(function(time) {
      resourceRafFall(time, id);
    });
  }
  else if(ANIM.resource[id].bounces >= 4) {
    //let resourceLoc = elem(`resource${id}`).getBoundingClientRect();
    //generateFloatingText(ANIM.resource[id].fText, ANIM.resource[id].fTextImg, resourceLoc.left, resourceLoc.top);

    ANIM.resource[id].rafFade = requestAnimationFrame(function(time) {
      resourceRafFade(time, id);
    });
  }
};
const gResource = function(ore, amount) { // >giveLoot< >giveEpicLoot<
  const k = Math.random();

  const resourcePush = function() { // >gResource<
    return {
      x: Math.random() * (192 - 256) + 256,
      y: Math.random() * (224 - 256) + 256,
      side: Math.random() < 0.5 ? -0.5 : 0.5,
      fText: nFormat(amount),
      fTextImg: `inv/${ore}16.png`,
      gravityPull: 0,
      bounce: 0.6,
      bounces: 0,
      opacity: 1,
      rafFall: undefined,
      rafFade: undefined
    };
  };

  ANIM.resource[k] = resourcePush();

  const HTML = `
    <img class="animated-resource" id="resource${k}" src="img/inv/${ore}.png">
  `;

  elem("resourceContainer").insertAdjacentHTML("beforeend", HTML);
  elem(`resource${k}`).style.left = ANIM.resource[k].x + "px";
  elem(`resource${k}`).style.top = ANIM.resource[k].y + "px";

  ANIM.resource[k].rafFall = requestAnimationFrame(function(time) {
    resourceRafFall(time, k);
  });
};

const popUpAnim = function(k) { // >giveLoot<
  let frame = 0;
  let scale = 1;

  let animateScale = setInterval(function() {
    frame += 1;

    if(frame <= 20 / 4) {
      scale += 0.015;
    }
    else {
      scale -= 0.015;
    }

    elem(`${k}Amount`).style.transform = `scale(${scale})`;

    if(frame >= 20 / 2) {
      elem(`${k}Amount`).style.transform = "scale(1)";
      clearInterval(animateScale);
    }
  }, 1000 / 16.7);
};

const checkUpgrade = function(k) { // >startGame<
  if(INV[UPG[k].res].amount >= UPG[k].cost) {
    elem(`${k}Avb`).innerHTML = `Click to buy x ${Game.buyQuantity}`;
    elem(`${k}Avb`).className = "fwhite";
    elem(`${k}Cost`).className = "fwhite f16";
    elem(k).style.cursor = "pointer";
  }
  else if(INV[UPG[k].res].amount < UPG[k].cost) {
    elem(`${k}Avb`).innerHTML = `Not enough for x ${Game.buyQuantity}`;
    elem(`${k}Avb`).className = "fred";
    elem(`${k}Cost`).className = "fred f16";
    elem(k).style.cursor = "not-allowed";
  }
};
const checkCrafting = function(k) { // >startGame<
  if(CRF[k].active) {
    elem(`${k}Avb`).innerHTML = "Currently active";
    elem(`${k}Avb`).className = "fblue";
    elem(`${k}Cost`).className = "fwhite f16";
    elem(`${k}`).style.cursor = "not-allowed";
  }
  else if(!CRF[k].active && INV.antiMatter.amount >= CRF[k].cost) {
    elem(`${k}Avb`).innerHTML = "Click to craft";
    elem(`${k}Avb`).className = "fwhite";
    elem(`${k}Cost`).className = "fwhite f16";
    elem(`${k}`).style.cursor = "pointer";
  }
  else if(!CRF[k].active && INV.antiMatter.amount < CRF[k].cost) {
    elem(`${k}Avb`).innerHTML = "Unavailable";
    elem(`${k}Avb`).className = "fred";
    elem(`${k}Cost`).className = "fred f16";
    elem(`${k}`).style.cursor = "not-allowed";
  }
};
const canAscend = function(k) { // >startGame<
  if(ASC[k].req > INV.darkMatter.amount) {
    elem(`${k}Avb`).innerHTML = "Locked";
    elem(`${k}Avb`).className = "fred";
    elem(`${k}Req`).className = "fred f16";
    elem(k).style.cursor = "not-allowed";
  }
  else if(!ASC[k].current && ASC[k].req <= INV.darkMatter.amount) {
    elem(`${k}Avb`).innerHTML = "Click to ascend";
    elem(`${k}Avb`).className = "fwhite";
    elem(`${k}Req`).className = "fwhite f16";
    elem(k).style.cursor = "pointer";
  }
  else if(ASC[k].current && ASC[k].req <= INV.darkMatter.amount) {
    elem(`${k}Avb`).innerHTML = "You are here";
    elem(`${k}Avb`).className = "fblue";
    elem(`${k}Req`).className = "fwhite f16";
    elem(k).style.cursor = "not-allowed";
  }
};

const giveLoot = function(k, v) { // >increaseZone<
  INV[k].amount += v;
  CHR.total[k] += v;

  Object.keys(UPG).forEach(function(p) {
    checkUpgrade(p);
  });

  checkLootAch(k);
  gResource(k, v);
  popUpAnim(k);

  save(`${k}Amount`, INV[k].amount);
  save(`${k}Total`, CHR.total[k]);

  elem(`${k}Amount`).innerHTML = nFormat(INV[k].amount);
  elem(`${k}Total`).innerHTML = nFormat(CHR.total[k]);
};

const calculateDamage = function() { // >startGame<, >global<
  let totalLvs = 0;
  let totalDps = 0;
  let totalDpc = 0;

  Object.keys(UPG).forEach(function(k) {
    totalLvs += UPG[k].lv;
    totalDps += UPG[k].dps;
  });

  Object.keys(UPG).forEach(function(k) {
    if(totalDps <= 0) {
      elem(`${k}ofTotal`).innerHTML = "0%";
    }
    else {
      const OF_TOTAL = (CHR.dps * 100 / totalDps);
      elem(`${k}ofTotal`).innerHTML = `${nFormat(OF_TOTAL)}%`;
    }
  });

  totalDpc = 1 + Math.floor(totalDps / 100 * 10);

  CHR.increment = INV.cDarkMatter.amount;

  if(CRF.titaniumBattery.active) {
    CHR.increment += totalLvs;
  }

  CHR.dps = Math.floor(totalDps + (totalDps / 100 * CHR.increment));
  CHR.dpc = Math.floor(totalDpc + (totalDpc / 100 * CHR.increment));
  CHR.critChance = 0;
  CHR.armorPen = 0;

  if(CRF.plutoniumBattery.active) {
    CHR.armorPen += totalLvs / 100;
    CHR.critChance += totalLvs / 100;
  }

  if(CRF.chrysoniteBattery.active) {
    CHR.dpc += (CHR.dpc / 100) * totalLvs / 100;
  }

  elem("dps").innerHTML = nFormat(CHR.dps);
  elem("dpc").innerHTML = nFormat(CHR.dpc);
  elem("increment").innerHTML = `${nFormat(CHR.increment)}%`;
  elem("critChance").innerHTML = `${CHR.critChance}%`;
  elem("armorPen").innerHTML = `${CHR.armorPen}%`;
  elem("fromCDarkMatter").innerHTML = nFormat(INV.cDarkMatter.amount);
  elem("titaniumBatteryBonus").innerHTML = `${totalLvs}%`;
  elem("plutoniumBatteryBonus").innerHTML = `${totalLvs / 100}%`;
  elem("chrysoniteBatteryBonus").innerHTML = `${totalLvs / 100}%`;
};

const giveMastery = function() { // >chrGiveXp<
  const ARRAY = [];

  Object.keys(MST).forEach(function(k) {
    ARRAY.push(k);
  });

  const RNG = Math.floor(Math.random() * ARRAY.length);
  const k = ARRAY[RNG];

  if(MST[k].lv >= MST[k].maxLv) {
    giveMastery();
    return false;
  }
  //else {
  MST[k].lv += 1;
  save(`${k}Lv`, MST[k].lv);

  calculateDamage();

  const WIDTH = MST[k].lv * 100 / MST[k].maxLv;
  progressBar(k, WIDTH);

  gNotification("Level up", `
    Congratulations, ${CHR.userName}, you have reached Lv ${CHR.lv}<br>
    New Mastery unlocked : ${MST[k].name}.
  `);

  elem(`${k}Bonus`).innerHTML = `${MST[k].bonus * MST[k].lv}%`;
  elem(`${k}Lv`).innerHTML = MST[k].lv;
  //}
};
const chrGiveXp = function(v) { // >increaseZone<
  CHR.xp += v;

  if(CHR.xp >= CHR.xpReq) {
    CHR.lv += 1;
    CHR.xp = CHR.xp - CHR.xpReq;
    CHR.xpReq = Math.floor(30 * Math.pow(1.5, CHR.lv));

    giveMastery();

    save("characterLv", CHR.lv);

    elem("charLv").innerHTML = CHR.lv;
  }

  const WIDTH = CHR.xp / CHR.xpReq * 100;
  progressBar("character", WIDTH);

  save("characterXp", CHR.xp);

  elem("charXp").innerHTML = `${nFormat(CHR.xp)} / ${nFormat(CHR.xpReq)}`;
};

const giveEpicLoot = function(k, v) { // >increaseOreZone<
  INV[k].amount += v;

  if(k === "antiMatter") {
    CHR.total[k] += v;

    save(`${k}Total`, CHR.total[k]);

    elem(`${k}Total`).innerHTML = nFormat(CHR.total[k]);
  }

  gResource(k, v);
  popUpAnim(k);

  save(`${k}Amount`, INV[k].amount);
  elem(`${k}Amount`).innerHTML = nFormat(INV[k].amount);
};

const restartOre = function(k, newHp) { // >clickClear<, >idleClear<
  ORE[k].hp = newHp;
  ORE[k].maxHp = Math.floor(10 * Math.pow(ORE[k].hpPerLv, ORE[k].lv));
  ORE[k].rewarded = false;

  healthBar(k);
  startDamage(k);

  save(`${k}Rewarded`, ORE[k].rewarded);

  elem("oreMaxHp").innerHTML = nFormat(ORE[k].maxHp);
};

const updateUpgrade = function(k) { // >startGame<
  const COST = Math.floor(UPG[k].baseCost * (Math.pow(UPG[k].costPerLv, UPG[k].lv + Game.buyQuantity) - Math.pow(UPG[k].costPerLv, UPG[k].lv)) / (UPG[k].costPerLv - 1));
  const DPS = (UPG[k].lv * UPG[k].baseDps) * Math.pow(2, Math.floor(UPG[k].lv / 20));
  const DPS_PER_LV = UPG[k].baseDps * Math.pow(2, Math.floor(UPG[k].lv / 20));
  const NEXT_DPS_DOUBLE = (Math.floor(UPG[k].lv / 20) + 1) * 20;

  UPG[k].dps = DPS;
  UPG[k].cost = COST;

  const WIDTH = (20 - (NEXT_DPS_DOUBLE - UPG[k].lv)) * 5;
  progressBar(k, WIDTH);

  elem(`${k}Lv`).innerHTML = UPG[k].lv;
  elem(`${k}Cost`).innerHTML = nFormat(UPG[k].cost);
  elem(`${k}Dps`).innerHTML = nFormat(UPG[k].dps);
  elem(`${k}DpsPerLv`).innerHTML = `+ ${nFormat(DPS_PER_LV)}`;
};
const updateQuantity = function(v) { // >event listener<
  Game.buyQuantity = v;

  Object.keys(UPG).forEach(function(k) {
    const COST = Math.floor(UPG[k].baseCost * (Math.pow(UPG[k].costPerLv, UPG[k].lv + Game.buyQuantity) - Math.pow(UPG[k].costPerLv, UPG[k].lv)) / (UPG[k].costPerLv - 1));

    UPG[k].cost = COST;

    checkUpgrade(k);

    elem(`${k}Cost`).innerHTML = nFormat(UPG[k].cost);
  });
};
const buyUpgrade = function(k) { // >unlockUpgrade<
  if(INV[UPG[k].res].amount < UPG[k].cost) {
    return false;
  }

  INV[UPG[k].res].amount -= UPG[k].cost;
  UPG[k].lv += Game.buyQuantity;

  playAudio("click");
  calculateDamage();
  updateUpgrade(k);

  Object.keys(UPG).forEach(function(p) {
    checkUpgrade(p);
  });

  save(`${UPG[k].res}Amount`, INV[UPG[k].res].amount);
  save(`${k}Lv`, UPG[k].lv);

  elem(`${UPG[k].res}Amount`).innerHTML = nFormat(INV[UPG[k].res].amount);
};
const unlockUpgrade = function(k) { // >unlockAscension<
  elem(k).className = "item";
  elem(k).onclick = function() {
    buyUpgrade(k);
  };
};
const lockUpgrade = function(k) { // >lockAscension<
    elem(k).className = "hidden";
    elem(k).onclick = function() {
      return false;
    };
};

const updateCrafting = function(k) { // >startGame<
  if(CRF[k].active) {
    elem(`${k}Img`).style.animation = "crafting-anim 3s linear infinite";
    elem(`${k}Remaining`).innerHTML = `${Math.round(CRF[k].remaining / 1000)} s`;
  }
  else {
    elem(`${k}Img`).style.animation = "";
    elem(`${k}Remaining`).innerHTML = "Inactive";
  }

  const WIDTH = 100 / (CRF[k].duration / CRF[k].remaining);
  progressBar(k, WIDTH);

  elem(`${k}Cost`).innerHTML = nFormat(CRF[k].cost);
};
const craft = function(k) {
  if(INV.antiMatter.amount < CRF[k].cost || CRF[k].active) {
    return false;
  }

  INV.antiMatter.amount -= CRF[k].cost;
  CRF[k].active = true;

  save("antiMatterAmount", INV.antiMatter.amount);
  save(`${k}Active`, CRF[k].active);

  playAudio("click");
  calculateDamage();

  Object.keys(CRF).forEach(function(k) {
    checkCrafting(k);
  });

  elem("antiMatterAmount").innerHTML = nFormat(INV.antiMatter.amount);
  elem(`${k}Img`).style.animation = "crafting-anim 3s linear infinite";
};
const unlockCrafting = function(k) { // >unlockAscension<
  elem(k).className = "item";
  elem(k).onclick = function() {
    craft(k);
  };
};
const lockCrafting = function(k) { // >lockAscension<
  elem(k).className = "hidden";
  elem(k).onclick = function() {
    return false;
  };
};

const ascend = function(k) { // >updateAscensions<
  if(ASC[k].current && Game.connected) {
    return false;
  }
  //else if(ASC[k].current && !Game.connected || !ASC[k].current) {
  stopDamage();
  clearTimeout(Game.oreStartTo);

  Object.keys(ASC).forEach(function(p) {
    ASC[p].current = false;

    canAscend(p);

    save(`${p}Current`, ASC[p].current);
  });

  ASC[k].current = true;
  Game.connected = true;

  updateOreStats(ASC[k].oreId);
  startDamage(ASC[k].oreId);

  save(`${k}Current`, ASC[k].current);

  elem("oreImg").src = `img/${ASC[k].oreId}Ore.png`;
  elem("backgroundImg").src = `img/${k}bg.jpg`;
  //}
};

const unlockInventory = function(k) { // >unlockAscension<
  elem(k).className = "stat";
};
const lockInventory = function(k) { // >lockAscension<
  elem(k).className = "hidden";
};

const unlockAscension = function(k) { // >updateAscensions<
  let i = 0;

  while(i < ASC[k].upgrades.length) {
    unlockUpgrade(ASC[k].upgrades[i]);

    i += 1;
  }

  unlockCrafting(ASC[k].crafting);

  i = 0;

  while(i < ASC[k].inventory.length) {
    unlockInventory(ASC[k].inventory[i]);

    i += 1;
  }

  elem(`${k}Content`).className = "visible";
  elem(k).onclick = function() {
    ascend(k);
  };
};
const lockAscension = function(k) { // >microverseAscension<
  let i = 0;

  while(i < ASC[k].upgrades.length) {
    lockUpgrade(ASC[k].upgrades[i]);

    i += 1;
  }

  lockCrafting(ASC[k].crafting);

  i = 0;

  while(i < ASC[k].inventory.length) {
    lockInventory(ASC[k].inventory[i]);

    i += 1;
  }

  elem(`${k}Content`).className = "hidden";
  elem(k).onclick = function() {
    return false;
  };
};
const updateAscensions = function() { // >startGame<
  let counter = 0;

  Object.keys(ASC).forEach(function(k) {
    if(!ASC[k].current) {
      counter += 1;
    }
  });

  if(counter >= 6) {
    ASC.earth.current = true;
  }

  Object.keys(ASC).forEach(function(k) {
    if(INV.darkMatter.amount >= ASC[k].req) {
      unlockAscension(k);
    }

    if(ASC[k].req <= INV.darkMatter.amount) {
      progressBar(k, 100);
    }
    else {
      const WIDTH = ASC[k].req / 100 * INV.darkMatter.amount;
      progressBar(k, WIDTH);
    }

    if(ASC[k].current) {
      ascend(k);
    }

    elem(`${k}Req`).innerHTML = nFormat(ASC[k].req);
    elem(`${ASC[k].oreId}Lv`).innerHTML = ORE[ASC[k].oreId].lv;
  });
};
const microverseAscension = function() { // >user<
  stopDamage();

  const ASC_REWARD = INV.darkMatter.amount;

  Object.keys(INV).forEach(function(k) {
    INV[k].amount = 0;

    save(`${k}Amount`, INV[k].amount);
  });

  INV.cDarkMatter.amount += ASC_REWARD;

  save("cDarkMatterAmount", INV.cDarkMatter.amount);

  Object.keys(UPG).forEach(function(k) {
    UPG[k].lv = 0;

    updateUpgrade(k);

    save(`${k}Lv`, UPG[k].lv);
  });

  Object.keys(CRF).forEach(function(k) {
    CRF[k].active = false;
    CRF[k].remaining = 600;

    save(`${k}Active`, CRF[k].active);
    save(`${k}Remaining`, CRF[k].remaining);

    updateCrafting(k);
  });

  Object.keys(ASC).forEach(function(k) {
    ASC[k].current = false;

    lockAscension(k);

    save(`${k}Current`, ASC[k].current);
  });

  Object.keys(ORE).forEach(function(k) {
    ORE[k].lv = 1;
    ORE[k].zone = 0;
    ORE[k].hp = ORE[k].baseHp;

    healthBar(k);
    oreProgressBar(k);

    save(`${k}Hp`, ORE[k].hp);
    save(`${k}Lv`, ORE[k].lv);
    save(`${k}Prog`, ORE[k].zone);
  });

  unlockAscension("earth");

  updateAscensions();
  updateOreStats("titanium");
  calculateDamage();

  Game.connected = false;

  ascend("earth");

  gNotification("Microverse Ascension", `
    You have received + ${ASC_REWARD}
    <span class="forange">Concentrated Dark Matter</span>
  `);
};

const checkHiLvAch = function(k) {
  const LV_GOALS = {
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
  };

  if(ORE[k].lv >= CHR.highestLv[k]) {
    CHR.highestLv[k] = ORE[k].lv;

    /* FIX -- add planet ID to ores
    for(i in LV_GOALS) {
      if(CHR.highestLv[key] >= LV_GOALS[i] && !Game.Achievements[key].ach[i])
      unlockAchievement(key, i);
    }*/

    save(`${k}HighestLv`, CHR.highestLv[k]);
    elem(`${k}HighestLv`).innerHTML = CHR.highestLv[k];
  }
};
const increaseOreZone = function(k, v) { // >clickClear<, >idleClear<
  ORE[k].zone += v;

  if(ORE[k].zone >= 10) {
    const CLEARED_LVS = Math.floor(ORE[k].zone / 10);
    let aMReward;
    let dMReward;
    let i = 0;

    ORE[k].lv += CLEARED_LVS;
    ORE[k].zone = ORE[k].zone % 10;

    while(i < CLEARED_LVS) {
      const AM_RNG = Math.floor(Math.random() * 100 + 1);
      const DM_RNG = Math.floor(Math.random() * 100 + 1);

      if(ORE[k].antiMatterRate > AM_RNG) {
        aMReward += 1;
      }

      if(ORE[k].darkMatterRate > DM_RNG) {
        dMReward += 1;
      }

      i += 1;
    }

    if(aMReward >= 1) {
      giveEpicLoot("antiMatter", aMReward);

      Object.keys(CRF).forEach(function(k) {
        checkCrafting(k);
      });
    }

    if(dMReward >= 1) {
      giveEpicLoot("darkMatter", dMReward);
      updateAscensions();
    }

    checkHiLvAch(k);

    save(`${k}Lv`, ORE[k].lv);

    elem(`${k}Lv`).innerHTML = ORE[k].lv;
    elem("oreLv").innerHTML = ORE[k].lv;
  }
};

const clickClear = function(k) { // >damagePerClick<
  stopDamage();

  if(ORE[k].rewarded) {
    Game.oreStartTo = setTimeout(function() {
      restartOre(k, ORE[k].maxHp);
    }, 500);

    return;
  }

  const LOOT_REWARD = Math.floor(10 * Math.pow(1.02, ORE[k].lv));

  giveLoot(k, LOOT_REWARD);
  chrGiveXp(1);
  increaseOreZone(k, 1);
  oreProgressBar(k);

  ORE[k].rewarded = true;

  save(`${k}Prog`, ORE[k].zone);
  save(`${k}Rewarded`, ORE[k].rewarded);

  Game.oreStartTo = setTimeout(function() {
    restartOre(k, ORE[k].maxHp);
  }, 500);
};

const damageTextRaf = function(time, id) { // >gDamageText<
  ANIM.damageText[id].y -= 1;
  ANIM.damageText[id].distance += 1;

  elem(`damageText${id}`).style.top = `${ANIM.damageText[id].y}px`;

  if(ANIM.damageText[id].distance >= 64) {
    ANIM.damageText[id].opacity -= 0.01;

    elem(`damageText${id}`).style.opacity = ANIM.damageText[id].opacity;
  }

  if(ANIM.damageText[id].opacity > 0) {
    ANIM.damageText[id].raf = requestAnimationFrame(function(time) {
      damageTextRaf(time, id);
    });
  }
  else if(ANIM.damageText[id].opacity <= 0) {
    elem(`damageText${id}`).parentNode.removeChild(elem(`damageText${id}`));
    delete ANIM.damageText[id];
  }
};
const gDamageText = function(damage) { // >damagePerClick<
  const k = Math.random();

  const damageTextPush = function() {
    return {
      x: event.clientX,
      y: event.clientY - 20,
      distance: 0,
      opacity: 1,
      raf: null
    };
  };

  ANIM.damageText[k] = damageTextPush();

  const HTML = `
    <div class="floating-text fwhite f16" id="damageText${k}">
      ${damage} <img class="imgFix" src="img/character/dps16.png">
    </div>
  `;

  elem("resourceContainer").insertAdjacentHTML("beforeend", HTML);
  elem(`damageText${k}`).style.left = `${ANIM.damageText[k].x}px`;
  elem(`damageText${k}`).style.top = `${ANIM.damageText[k].y}px`;

  ANIM.damageText[k].raf = requestAnimationFrame(function(time) {
    damageTextRaf(time, k);
  });
};

const damagePerClick = function(k) { // >startDamage<, >stopDamage<
  const CRIT_RNG = Math.floor(Math.random() * (100 - 1) + 1);
  const DAMAGE = (CHR.critChance >= CRIT_RNG) ? CHR.dpc * 2 : CHR.dpc;

  ORE[k].hp -= DAMAGE;
  CHR.total.clicks += 1;

  if(CHR.critChance >= CRIT_RNG) {
    CHR.total.critHits += 1;

    save("critHitsTotal", CHR.total.critHits);

    elem("critHitsTotal").innerHTML = nFormat(CHR.total.critHits);
  }

  if(ORE[k].hp <= 0) {
    clickClear(k);
  }

  gDamageText(nFormat(DAMAGE));
  healthBar(k);
  playAudio("dpc");

  save("clicksTotal", CHR.total.clicks);
  save(`${k}Hp`, ORE[k].hp);

  elem("clicksTotal").innerHTML = nFormat(CHR.total.clicks);
};
const damagePerSecond = function(time, k) { // >startDamage<, >stopDamage<
  const FRAME = time - Game.dpsAnimStart;
  Game.dpsAnimStart = FRAME;

  //console.log(time, frame);

  const PENETRATE = ORE[k].armor / 100 * CHR.armorPen;
  const DAMAGE = CHR.dps - (ORE[k].armor - PENETRATE);
  const DAMAGE_PER_FRAME = (DAMAGE / 1000) * FRAME;

  if(ORE[k].hp > 0 && DAMAGE > 0) {
    ORE[k].hp -= 0;//DAMAGE_PER_FRAME;

    if(ORE[k].hp <= 0) {
      clickClear(k);
      //idleClear(k, DAMAGE, FRAME);
    }

    healthBar(k);

    save(`${k}Hp`, ORE[k].hp);

    Game.dpsAnimFrame = requestAnimationFrame(function(time) {
      damagePerSecond(time, k);
    });
  }
};
const startDamage = function(k) { // >ascend<
  Game.dpsAnimStart = performance.now();
  Game.dpsAnimFrame = requestAnimationFrame(function(time) {
    damagePerSecond(time, k);
  });

  elem("oreImg").onclick = function() {
    damagePerClick(k);
  };
};

const updateAccount = function(k) { // >startGame<
  let width = null;

  if(k === "character") {
    const XP_REQ = Math.floor(30 * Math.pow(1.5, CHR.lv));
    CHR.xpReq = XP_REQ;

    width = CHR.xp / CHR.xpReq * 100;

    Object.keys(CHR.total).forEach(function(k) {
      elem(`${k}Total`).innerHTML = nFormat(CHR.total[k]);
    });

    Object.keys(CHR.highestLv).forEach(function(k) {
      elem(`${k}HighestLv`).innerHTML = nFormat(CHR.highestLv[k]);
    });

    elem("charXp").innerHTML = `${nFormat(CHR.xp)} / ${nFormat(CHR.xpReq)}`;
    elem("charLv").innerHTML = CHR.lv;
  }
  else if(k === "achievements") {
    width = ACH.unlocked * 100 / 80;

    elem("charAch").innerHTML = `${ACH.unlocked} / ${80}`;
  }
  else if(k === "masteries") {
    width = MST.unlocked * 100 / 188;
  }

  progressBar(k, width);
};
const updateAchievement = function(k, p) { // >startGame<
  if(ACH[k].ach[p]) {
    elem(k + p).innerHTML = "✓";
    elem(k + p).className = "fgreen f16";
    ACH[k].unlocked += 1;
    ACC.achievements.unlocked += 1;
  }

  const WIDTH = ACH[k].unlocked * 100 / 10;
  progressBar(k, WIDTH);
};
const updateMastery = function(k) { // >startGame<
  const WIDTH = MST[k].lv * 100 / MST[k].maxLv;
  progressBar(k, WIDTH);

  elem(`${k}Bonus`).innerHTML = `${MST[k].bonus * MST[k].lv}%`;
  elem(`${k}Lv`).innerHTML = MST[k].lv;
};

const generateUpgrade = function(k) { // >startGame<
  const HTML = `
    <div class="hidden" id="${k}">
      <div class="item-img">
        <img src="img/UPG/${k}.png">
      </div>
      <div class="item-bar">
        <div class="item-progress" id="${k}Progress"></div>
      </div>
      <div class="tooltip item-tooltip-right">
        <div class="tooltip-header fcenter">
          <span class="fwhite">${UPG[k].name}</span><br>
          <span id="${k}Avb"</span>
        </div>
        <div class="tooltip-content">
          Lv : <span class="fwhite f16" id="${k}Lv"></span><br>
          Cost : <span class="fwhite f16" id="${k}Cost"></span>
          <img class="imgFix" src="img/inv/${UPG[k].res}16.png"><br>
          DPS : <span class="fwhite f16" id="${k}Dps"></span>
          <img class="imgFix" src="img/character/dps16.png">
          (<span class="fwhite f16" id="${k}ofTotal"></span>)<hr>
          DPS / Lv : <span class="fwhite f16" id="${k}DpsPerLv"></span>
          <img class="imgFix" src="img/character/dps16.png"><br>
          Cost / Lv : <span class="fwhite f16">+ ${UPG[k].costPerLv * 100 - 100}%</span><hr>
          ${UPG[k].info}
        </div>
      </div>
    </div>
  `;

  elem("UPGItems").insertAdjacentHTML("beforeend", HTML);
};
const generateCrafting = function(k) { // >startGame<
  const HTML = `
    <div class="hidden" id="${k}">
      <div class="item-img" id="${k}Img">
        <img src="img/CRF/${k}.png">
      </div>
      <div class="item-bar">
        <div class="item-progress" id="${k}Progress"></div>
      </div>
      <div class="tooltip item-tooltip-right">
        <div class="tooltip-header fcenter">
          <span class="fwhite">${CRF[k].name}</span><br>
          <span id="${k}Avb"</span>
        </div>
        <div class="tooltip-content">
          Cost : <span class="fwhite f16" id="${k}Cost"></span>
          <img class="imgFix" src="img/inv/antiMatter16.png"><br>
          Boost : <span class="fwhite f16" id="${k}Bonus"></span><br>
          Duration : <span class="fwhite f16">${CRF[k].duration} s</span><br>
          Remaining : <span class="fwhite f16" id="${k}Remaining"></span><hr>
          ${CRF[k].info}
        </div>
      </div>
    </div>
  `;

  elem("CRFItems").insertAdjacentHTML("beforeend", HTML);
};
const generateAscension = function(k) { // >startGame<
  const HTML = `
    <div class="item" id="${k}">
      <div class="item-img">
        <img src="img/ASC/${k}.png">
      </div>
      <div class="item-bar">
        <div class="item-progress" id="${k}Progress"></div>
      </div>
      <div class="tooltip item-tooltip-right">
        <div class="tooltip-header fcenter">
          <span class="fwhite">${ASC[k].name}</span><br>
          <span id="${k}Avb"</span>
        </div>
        <div class="tooltip-content">
          Requirement : <span class="fwhite f16" id="${k}Req"></span>
          <img class="imgFix" src="img/inv/darkMatter16.png">
          <br>
          <div class="hidden" id="${k}Content">
            Ore : <span class="fgreen">${ORE[ASC[k].oreId].name}</span>
            <img class="imgFix" src="img/inv/${ASC[k].oreId}16.png"><br>
            Lv : <span class="fwhite f16" id="${ASC[k].oreId}Lv"></span><hr>
            ${ASC[k].info}
          </div>
        </div>
      </div>
    </div>
  `;

  elem("ASCItems").insertAdjacentHTML("beforeend", HTML);
};
const generateInventory = function(k) { // >startGame<
  const HTML = `
    <div class="hidden" id="${k}">
      <div class="stat-img">
        <img src="img/inv/${k}.png">
      </div>
      <div class="stat-num fcenter">
        <div id="${k}Amount"></div>
      </div>
      <div class="tooltip stat-tooltip">
        <div class="tooltip-header fcenter fwhite">
          ${INV[k].name}
        </div>
        <div class="tooltip-content">
          ${INV[k].info}
        </div>
      </div>
    </div>
  `;

  elem("INVStats").insertAdjacentHTML("beforeend", HTML);
};
const openModal = function(k) { // >generateAccountItem<
  elem(`${k}Modal`).style.display = "initial";
};
const closeModal = function(k) { // >generateAccountItem<
  elem(`${k}Modal`).style.display = "none";
};
const generateAccountItem = function(k) { // >startGame<
    const HTML = `
      <div class="item" id="${k}">
        <div class="item-img" id="${k}Img">
          <img src="img/character/${k}.png">
        </div>
        <div class="item-bar">
          <div class="item-progress" id="${k}Progress"></div>
        </div>
        <div class="tooltip item-tooltip-left">
          <div class="tooltip-header fcenter">
            <span class="fwhite f14">${ACC[k].name}</span>
            <br>
            <span class="fwhite">Click to view more</span>
          </div>
          <div class="tooltip-content">
            ${ACC[k].tooltipContent}
          </div>
        </div>
      </div>
    `;

    elem("ACCItems").insertAdjacentHTML("beforeend", HTML);
    elem(k).onclick = function() {
      openModal(k);
    };
    elem(`${k}Btn`).onclick = function() {
      closeModal(k);
    };
};
const generateModal = function(k) { // >startGame<
  const HTML = `
    <div class="modal-area" id="${k}Modal">
      <div class="modal-panel">
        <div class="modal-header fwhite fcenter">
          ${MDL[k].name}
        </div>
        ${MDL[k].content}
      </div>
    </div>
  `;

  elem("modalContainer").insertAdjacentHTML("beforeend", HTML);
};
/*
function generateAchTiles(key, amount, what) { // >generateAchievement<
  const NUM = [ "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten" ];

  NUM.forEach(function(p) {
    const HTML = `
    [<span class="f16" id="${key + NUM[p]}">✖</span>]
    ${what}: <span class="fwhite f16">${amount[p]}</span><br>
    `;

    elem(`${key}Achievements`).insertAdjacentHTML("beforeend", HTML);
  });
}
*/
const generateAchievement = function(k) { // >startGame<
  const HTML = `
    <div class="item" id="${k}Ach">
      <div class="item-img" id="${k}Img">
        <img src="img/achievements/${k}.png">
      </div>
      <div class="item-bar">
        <div class="item-progress" id="${k}Progress"></div>
      </div>
      <div class="tooltip item-tooltip-bottom">
        <div class="tooltip-header fcenter">
          <span class="fwhite">${ACH[k].name}</span>
        </div>
        <div class="tooltip-content">
          ${ACH[k].misc}
        </div>
      </div>
    </div>
  `;

  elem("achievementItems").insertAdjacentHTML("beforeend", HTML);

  /*const farm = [ "1 M", "1 B", "1 T", "1 Qa", "1 Qi", "1 Sx", "1 Sp", "1 Oct", "1 Non", "1 Dec" ];
  const lv = [ "25", "50", "75", "100", "250", "500", "750", "1 K", "2.5 K", "5 K" ];
  generateAchTiles("titanium", farm, "Total");
  generateAchTiles("earth", lv, "Beat Lv");
  generateAchTiles("plutonium", farm, "Total");
  generateAchTiles("grudnock", lv, "Beat Lv");
  generateAchTiles("chrysonite", farm, "Total");
  generateAchTiles("tetherus", lv, "Beat Lv");
  generateAchTiles("armadium", farm, "Total");
  generateAchTiles("gazorpazorp", lv, "Beat Lv");
  generateAchTiles("solanium", farm, "Total");
  generateAchTiles("xeln", lv, "Beat Lv");
  generateAchTiles("singularity", farm, "Total");
  generateAchTiles("blackhole", lv, "Beat Lv");
  generateAchTiles("antiMatter", lv, "Total");
  generateAchTiles("cDarkMatter", lv, "Total");*/
};
const generateMastery = function(k) { // >startGame<
  const HTML = `
    <div class="item" id="${k}">
      <div class="item-img" id="${k}Img">
        <img src="img/achievements/${k}.png">
      </div>
      <div class="item-bar">
        <div class="item-progress" id="${k}Progress"></div>
      </div>
      <div class="tooltip item-tooltip-bottom">
        <div class="tooltip-header fcenter">
          <span class="fwhite">${MST[k].name}</span><br>
          ${MST[k].type}
        </div>
          <div class="tooltip-content">
          Lv: <span class="fwhite f16" id="${k}Lv"></span><br>
          Bonus: <span class="fwhite f16" id="${k}Bonus"></span><hr>
          ${MST[k].info}
        </div>
      </div>
    </div>
  `;

  elem("masteryItems").insertAdjacentHTML("beforeend", HTML);
};
const generateDamage = function(k) { // >startGame<
  const HTML = `
    <div class="stat">
      <div class="stat-img">
        <img src="img/character/${k}.png">
      </div>
      <div class="stat-num fcenter">
        <span id="${k}"></span>
      </div>
      <div class="tooltip stat-tooltip">
        <div class="tooltip-header fcenter fwhite">
          ${DMG[k].name}
        </div>
        <div class="tooltip-content">
          ${DMG[k].misc}
          <hr>
          ${DMG[k].info}
        </div>
      </div>
    </div>
  `;

  elem("DMGStats").insertAdjacentHTML("beforeend", HTML);
};
const generateTutorial = function(k) { // >startGame<
  const HTML = `
    <div class="fcenter">
      ${TUT[k].name}
    </div>
    <div class="tooltip ${TUT[k].tooltip}">
      <div class="tooltip-content fgrey">
      ${TUT[k].info}
      </div>
    </div>
  `;

  elem(`${k}Header`).insertAdjacentHTML("beforeend", HTML);
};
const generateDonate = function(k) { // >startGame<
  const HTML = `
    <div class="item">
      <div class="item-img">
        <img src="img/donate/${k}.png" onclick="prompt
        ("Press CTRL + C to copy my address to your clipboard",
        "${DMT[k].addr}")">
      </div>
      <div class="tooltip item-tooltip-left">
        <div class="tooltip-header fcenter">
          <span class="fwhite f14">${DMT[k].name}</span>
          <br>
          <span class="fwhite">Click to donate</span>
        </div>
        <div class="tooltip-content">
          ${DMT[k].info}
        </div>
      </div>
    </div>
  `;

  elem("DMTItems").insertAdjacentHTML("beforeend", HTML);
};

const gameLoop = function() { // >startGame<
  const TIME_NOW = performance.now();
  const FRAME = TIME_NOW - Game.loopStarted;
  Game.loopStarted = TIME_NOW;

  /*if(CHR.dps > 0 && !Game.dpsAnimFrame) {
    Game.dpsAnimStart = performance.now();
    Game.dpsAnimFrame = requestAnimationFrame(function(time) {
      dpsAnim(time, key);
    });
  }*/

  Object.keys(CRF).forEach(function(k) {
    if(CRF[k].active) {
      CRF[k].remaining -= FRAME / 1000;

      save(`${k}Remaining`, CRF[k].remaining);
      elem(`${k}Remaining`).innerHTML = `${Math.round(CRF[k].remaining)} s`;

      if(CRF[k].remaining <= 0) {
        CRF[k].active = false;
        CRF[k].remaining = CRF[k].duration;

        calculateDamage();
        updateCrafting(k);

        save(`${k}Active`, CRF[k].active);
        save(`${k}Remaining`, CRF[k].remaining);

        elem(`${k}Remaining`).innerHTML = "Inactive";
        elem(`${k}Img`).style.animation = "";
      }

      const WIDTH = 100 / (CRF[k].duration / CRF[k].remaining);
      progressBar(k, WIDTH);
    }
  });

  CHR.time.seconds += FRAME / 1000;

  if(CHR.time.seconds > 59) {
    CHR.time.seconds = 0;
    CHR.time.minutes += 1;
  }

  if(CHR.time.minutes > 59) {
    CHR.time.minutes = 0;
    CHR.time.hours += 1;
  }

  save("seconds", CHR.time.seconds);
  save("minutes", CHR.time.minutes);
  save("hours", CHR.time.hours);

  elem("timePlayed").innerHTML = `
    ${CHR.time.hours}h
    ${CHR.time.minutes}m
    ${Math.round(CHR.time.seconds)}s
  `;
};

const muteSounds = function() {
  if(Game.muted) {
    Game.muted = false;
    elem("sounds").innerHTML = "On";
  }
  else {
    Game.muted = true;
    elem("sounds").innerHTML = "Off";
  }
};
const setUsername = function() {
  CHR.userName = elem("username").value;

  if(CHR.userName.length < 3) {
    return false;
  }

  elem("displayuser").insertAdjacementHTML("beforeend", `
    Welcome back, <span class="fblue">${CHR.userName}</span>
  `);
};

const startGame = function() { // >event listener<
  Object.keys(UPG).forEach(function(k) {
    if(load(`${k}Lv`)) {
      UPG[k].lv = load(`${k}Lv`);
    }

    generateUpgrade(k);
    updateUpgrade(k);
    checkUpgrade(k);
  });

  Object.keys(CRF).forEach(function(k) {
    if(load(`${k}Active`)) {
      CRF[k].active = load(`${k}Active`);
    }

    if(load(`${k}Remaining`)) {
      CRF[k].remaining = load(`${k}Remaining`);
    }

    generateCrafting(k);
    updateCrafting(k);
    checkCrafting(k);
  });

  Object.keys(INV).forEach(function(k) {
    if(load(`${k}Amount`)) {
      INV[k].amount = load(`${k}Amount`);
    }

    generateInventory(k);

    elem(`${k}Amount`).innerHTML = nFormat(INV[k].amount);
  });

  Object.keys(ORE).forEach(function(p) {
    if(load(`${p}Prog`)) {
      ORE[p].zone = load(`${p}Prog`);
    }

    if(load(`${p}Lv`)) {
      ORE[p].lv = load(`${p}Lv`);
    }

    if(load(`${p}Hp`)) {
      ORE[p].hp = load(`${p}Hp`);
    }

    if(load(`${p}Rewarded`)) {
      ORE[p].rewarded = load(`${p}Rewarded`);
    }
  });

  Object.keys(TUT).forEach(function(k) {
    generateTutorial(k);
  });

  Object.keys(ASC).forEach(function(k) {
    if(load(`${k}Current`)) {
      ASC[k].current = load(`${k}Current`);
    }

    generateAscension(k);
  });

  updateAscensions();

  Object.keys(MDL).forEach(function(k){
    generateModal(k);
  });

  Object.keys(ACH).forEach(function(k) {
    /*ACH[p].ach.forEach(function(k) {
      if(load(p + k)) {
        ACH[p].ach[k] = load(p + k);
      }
    });*/

    generateAchievement(k);
    //updateAchievement(k);
  });

  Object.keys(MST).forEach(function(k) {
    if(load(`${k}Lv`)) {
      MST[k].lv = load(`${k}Lv`);
    }

    generateMastery(k);
    updateMastery(k);
  });

  Object.keys(ACC).forEach(function(k) {
    generateAccountItem(k);
    updateAccount(k);
  });

  Object.keys(DMG).forEach(function(k) {
    generateDamage(k);
  });

  calculateDamage();

  Object.keys(DMT).forEach(function(k) {
    generateDonate(k);
  });

  Object.keys(CHR.time).forEach(function(p) {
    if(load(p)) {
      CHR.time[p] = load(p);
    }
  });

  Object.keys(CHR.total).forEach(function(p) {
    if(load(`${p}Total`)) {
      CHR.total[p] = load(`${p}Total`);
    }
  });

  Object.keys(CHR.highestLv).forEach(function(p) {
    if(load(`${p}HighestLv`)) {
      CHR.highestLv[p] = load(`${p}HighestLv`);
    }
  });

  if(load("characterLv")) {
    CHR.lv = load("characterLv");
  }

  if(load("characterXp")) {
    CHR.xp = load("characterXp");
  }

  if(load("notifications")) {
    ANIM.notification = load("notifications");

    Object.keys(ANIM.notification).forEach(function(k) {
      displayNotification(k);
    });
  }

  if(INV.cDarkMatter.amount > 0) {
    unlockInventory("cDarkMatter");
  }

  muteSounds();

  Game.loopStarted = performance.now();
  Game.loopInt = setInterval(function() {
    gameLoop();
  }, 1000);
};

window.addEventListener("load", startGame);
document.addEventListener("keypress", function(event) {
  switch(event.key) {
    case "z": updateQuantity(1);
      break;
    case "x": updateQuantity(20);
      break;
    case "c": updateQuantity(100);
      break;
    default: return false;
  }
});

}());
