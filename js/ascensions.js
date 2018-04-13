/*===========================================================
=         Ascension                                         =
===========================================================*/
Game.Ascensions = {
  earth: {
    name: 'Earth',
    info: `Earth was inhabited by humans, who were extinct
    millions of years ago. The planet has been abbandoned
    ever since, and there are very little leftovers of the
    unfortunate civilization. But there are lots of Titanium
    Ores, and looks like they are all yours to keep`,
    isCurrent: true,
    ascendTo: true,
    req: 0,
    ore: {
      name: 'Titanium',
      id: 'titanium',
      lv: 1,
      prog: 0,
      hp: 10,
      baseHp: 10,
      maxHp: 0,
      hpPerLv: 1.03,
      hpScaling: '3%',
      armor: 0,
      baseArmor: 0,
      armorPerLv: 1.0,
      armorScaling: '0%',
      antiMatterRate: 50,
      darkMatterRate: 10
    }
  },
  grudnock: {
    name: 'Grudnock',
    info: `Grudnock has everything a planet needs to support
    life, however there are no signs of any living being
    ever forming here. Just pure, untouched nature, and
    loads of Plutonium ores. They are tough, but also rare.
    Having some in stash surely wont go to waste`,
    isCurrent: false,
    ascendTo: false,
    req: 50,
    ore: {
      name: 'Plutonium',
      id: 'plutonium',
      lv: 1,
      prog: 0,
      hp: 0,
      baseHp: 50e6,
      maxHp: 0,
      hpPerLv: 1.035,
      hpScaling: '3.5%',
      armor: 10000,
      armorPerLv: 1.01,
      armorScaling: '1%',
      antiMatterRate: 55,
      darkMatterRate: 12
    }
  },
  tetherus: {
    name: 'Tetherus',
    info: `Tetherus is a Gas Giant. Nothing can ever form here except the chaotic
    environment. But Tetherus ring asteroids contain some Chrysonite, and that's
    what you're after`,
    isCurrent: false,
    ascendTo: false,
    req: 500,
    ore: {
      name: 'Chrysonite',
      id: 'chrysonite',
      lv: 1,
      prog: 0,
      hp: 1e6,
      baseHp: 1e6,
      maxHp: 0,
      hpPerLv: 1.04,
      hpScaling: '4%',
      armor: 10000,
      armorPerLv: 1.02,
      armorScaling: '2%',
      antiMatterRate: 60,
      darkMatterRate: 14
    }
  },
  gazorpazorp: {
    name: 'Gazorpazorp',
    info: `1 year of coding, Morty! Only 11 more years to go Moooor*buuuurp*ty!!`,
    isCurrent: false,
    ascendTo: false,
    req: 2500,
    ore: {
      name: 'Armadium',
      id: 'armadium',
      lv: 1,
      prog: 0,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      hpPerLv: 1.045,
      hpScaling: '4.5%',
      armor: 1e6,
      armorPerLv: 1.03,
      armorScaling: '3%',
      antiMatterRate: 65,
      darkMatterRate: 16
    }
  },
  xeln: {
    name: 'Xeln',
    info: `Xeln is completely covered in water. Nobody ever visited here
    before you. Who'd want to visit a planet covered with water anyway? Well, lucky for
    you, there are Solanium ores burried deep in the bottom of the ocean. Solanium is very extremely
    rare, and we're in luck nobody bothered to visit this planet before us`,
    isCurrent: false,
    ascendTo: false,
    req: 10000,
    ore: {
      name: 'Solanium',
      id: 'solanium',
      lv: 1,
      prog: 0,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      hpPerLv: 1.05,
      hpScaling: '5%',
      armor: 1e6,
      armorPerLv: 1.04,
      armorScaling: '4%',
      antiMatterRate: 70,
      darkMatterRate: 18
    }
  },
  blackhole: {
    name: 'Black Hole',
    info: `Black Holes still remain a mystery to this day. Destroying one
    is almost impossible. If you manage to break it, you will find
    Singularity in it's core. Nobody can yet decode it, and there are
    very few who can obtain it`,
    isCurrent: false,
    ascendTo: false,
    req: 25000,
    ore: {
      name: 'Singularity',
      id: 'hawkingRadiation',
      lv: 1,
      prog: 0,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      hpPerLv: 1.055,
      hpScaling: '5.5%',
      armor: 1e6,
      armorPerLv: 1.05,
      armorScaling: '5%',
      antiMatterRate: 75,
      darkMatterRate: 20
    }
  }
}
/*===========================================================
=         Generate Ascensions                               =
===========================================================*/
function generateAscensions() {
	for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let ore = item.ore;

    let content = `
      <div class='sidebar-item' id='${key}'>
        <img src='img/ascencion/${key}.png' id='${key}Img'>
        <div class='tooltip item-tooltip fgrey'>
          <div class='tooltip-lv'>
            <canvas id='${key}Bar' width='64' height='64'></canvas>
          </div>
          <div class='tooltip-header'>
            <span class='fwhite f14'>${item.name}</span><br>
            <span id='${key}Avb'></span><hr>
          </div>
          <div class='tooltip-content'>
            Requirement: <span class='fwhite f16' id='${key}Req'></span> <img class='imgFix' src='img/inv/darkMatter16.png'><br>
            <div class='hidden' id='${key}Content'>
              Ore: <span class='fgreen'>${ore.name}</span> <img class='imgFix' src='img/inv/${ore.id}16.png'><br>
              Lv: <span class='fwhite f16' id='${key}Lv'></span><hr>
              ${item.info}
            </div>
          </div>
        </div>
      </div>
    `;

    elem('ascensionItems').innerHTML += content;
	}
}
/*===========================================================
=         Unlock Ascension                                  =
===========================================================*/
function unlockEarth() {
  Game.Ascensions.earth.ascendTo = true;
  elem('earth').onclick = function() { ascend('earth'); }
  unlockUpgrade('laserGun');
  unlockUpgrade('advancedLasers');
  unlockUpgrade('laserAmplifier');
  unlockCrafting('titaniumBattery');
  unlockInventory('titanium');
  unlockInventory('antiMatter');
  unlockInventory('frostCrystal');
	unlockInventory('darkMatter');
  unlockInventory('concentratedDarkMatter');
  elem('earthContent').className = 'visible';
}
function unlockGrudnock() {
  Game.Ascensions.grudnock.ascendTo = true;
  elem('grudnock').onclick = function() { ascend('grudnock'); }
  unlockUpgrade('lasergunCooler');
  unlockUpgrade('reloadAccelerator');
  unlockUpgrade('ricochetLaser');
  unlockCrafting('plutoniumBattery');
  unlockInventory('plutonium');
  elem('grudnockContent').className = 'visible';
}
function unlockTetherus() {
  Game.Ascensions.tetherus.ascendTo = true;
  elem('tetherus').onclick = function() { ascend('tetherus'); }
  unlockUpgrade('plasmaLauncher');
  unlockUpgrade('plasmaCooler');
  unlockUpgrade('plasmaClip');
  unlockCrafting('chrysoniteBattery');
  unlockInventory('chrysonite');
  elem('tetherusContent').className = 'visible';
}
function unlockGazorpazorp() {
  Game.Ascensions.gazorpazorp.ascendTo = true;
  elem('gazorpazorp').onclick = function() { ascend('gazorpazorp'); }
  unlockUpgrade('plasmaCharger');
  unlockUpgrade('laserBurster');
  unlockUpgrade('laserIntensifier');
  unlockCrafting('armadiumBattery');
  unlockInventory('armadium');
  elem('gazorpazorpContent').className = 'visible';
}
function unlockXeln() {
  Game.Ascensions.xeln.ascendTo = true;
  elem('xeln').onclick = function() { ascend('xeln'); }
  unlockUpgrade('phaseBeam');
  unlockUpgrade('beamIntensifier');
  unlockUpgrade('multiBeam');
  unlockCrafting('solaniumBattery');
  unlockInventory('solanium');
  elem('xelnContent').className = 'visible';
}
function unlockBlackHole() {
  Game.Ascensions.blackhole.ascendTo = true;
  elem('blackhole').onclick = function() { ascend('blackhole'); }
  unlockUpgrade('beamCooler');
  unlockUpgrade('beamCharger');
  unlockUpgrade('phaseGun');
  unlockCrafting('darkRadiation');
  unlockInventory('hawkingRadiation');
  elem('blackholeContent').className = 'visible';
}
/*===========================================================
=         Lock Ascensions                                   =
===========================================================*/
function lockAscensions() {
	for(key in Game.Ascensions)
		elem(key).onclick = function () {}
}
/*===========================================================
=         Ascend                                            =
===========================================================*/
function ascend(key) {
  let item = Game.Ascensions[key];
  let ore = item.ore;

  if(item.isCurrent && connected) {
    return;
  } else {
    for(i in Game.Ascensions) {
      Game.Ascensions[i].isCurrent = false;
      save(i + 'isCurrent', Game.Ascensions[i].isCurrent);
    }

    item.isCurrent = true;
    save(key + 'isCurrent', item.isCurrent);

    canAscend();
    healthBar(key);
    oreProgressBar(key);

    clearTimeout(oreClearTO);

    stopDamage();
    startDamage(key);
    updateOreStats(key);

    connected = true;

    elem('oreImg').src = `img/${ore.id}Ore.png`;
    document.body.style.backgroundImage = `url(img/${key}bg.jpg)`;
  }
}
/*===========================================================
=         Check Ascencions                                  =
===========================================================*/
function canAscend() {
  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let inv = Game.Inventory.darkMatter;

    if(item.req > inv.amount) {
      elem(key + 'Avb').innerHTML = 'Locked';
      elem(key + 'Avb').className = 'fred';
      elem(key + 'Req').className = 'fred f16';
      elem(key).style.cursor = 'not-allowed';
    } else if(!item.isCurrent && item.req <= inv.amount) {
      elem(key + 'Avb').innerHTML = 'Click to ascend';
      elem(key + 'Avb').className = 'fwhite';
      elem(key + 'Req').className = 'fwhite f16';
      elem(key).style.cursor = 'pointer';
    } else if(item.isCurrent && item.req <= inv.amount) {
      elem(key + 'Avb').innerHTML = 'You are here';
      elem(key + 'Avb').className = 'fblue';
      elem(key + 'Req').className = 'fwhite f16';
      elem(key).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=         Update Ascencions                                 =
===========================================================*/
function updateAscensions() {
  unlockEarth();

  if(Game.Inventory.darkMatter.amount >= 50)
    unlockGrudnock();

  if(Game.Inventory.darkMatter.amount >= 500)
    unlockTetherus();

  if(Game.Inventory.darkMatter.amount >= 2500)
    unlockGazorpazorp();

  if(Game.Inventory.darkMatter.amount >= 10000)
    unlockXeln();

  if(Game.Inventory.darkMatter.amount >= 25000)
    unlockBlackHole();

  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let ore = item.ore;
    let inv = Game.Inventory;

    let width = inv.darkMatter.amount * 100 / item.req;
    if(item.req <= inv.darkMatter.amount)
      progressBar(key, width);
    else
      progressBar(key, width);

    if(item.isCurrent) {
      ascend(key);
    }

    elem(key + 'Req').innerHTML = item.req;
    elem(key + 'Lv').innerHTML = ore.lv;
  }

  progressBar('earth', 100);
  canAscend();
}
