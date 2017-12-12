/*===========================================================
=         Ascension                                         =
===========================================================*/
Game.Ascensions = {
  earth: {
    name: 'Earth',
    info: `Earth was inhabited by humans, who went extinct
    millions of years ago. The planet has been abbandoned
    ever since, and there are very little leftovers of the
    unfortunate civilization. But there are lots of Titanium
    Ores, and looks like they are all yours to keep`,
    isCurrent: true,
    ascendTo: true,
    req: 0,
    ore: {
      id: 'titanium',
      lv: 1,
      hp: 10,
      baseHp: 10,
      maxHp: 0,
      armor: 0
    }
  },
  grudnock: {
    name: 'Grudnock',
    info: `Grudnock has everything a planet needs to support
    life, however there are no signs of any living being
    ever forming here. Just pure, untouched nature, and
    loads of Plutonium Veins. They are tough, but also rare.
    Having some in stash surely wont go to waste`,
    isCurrent: false,
    ascendTo: false,
    req: 100,
    ore: {
      id: 'plutonium',
      lv: 1,
      hp: 1e6,
      baseHp: 1e6,
      maxHp: 0,
      armor: 10000
    }
  },
  tetherus: {
    name: 'Tetherus',
    info: `Tetherus is a Gas Giant. Nothing can ever form here except the chaotic
    environment. But Tetherus rings asteroids contain some Chrysonite, and that's
    what we're after.`,
    isCurrent: false,
    ascendTo: false,
    req: 500,
    ore: {
      id: 'chrysonite',
      lv: 1,
      hp: 1e6,
      baseHp: 1e6,
      maxHp: 0,
      armor: 10000
    }
  },
  gazorpazorp: {
    name: 'Gazorpazorp',
    info: `Gazorpazorp Info`,
    isCurrent: false,
    ascendTo: false,
    req: 2500,
    ore: {
      id: 'armadium',
      lv: 1,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      armor: 1e6
    }
  },
  xeln: {
    name: 'Xeln',
    info: `Xeln is completely covered with water. Nobody was probably ever here
    before you. Who'd want to visit a planet covered with water anyway? Well, lucky for
    us, hiding in the endless planets ocean are Solanium ores. Solanium is very extremely
    rare, and we're in luck nobody bothered to visit this planet before us.`,
    isCurrent: false,
    ascendTo: false,
    req: 10000,
    ore: {
      id: 'solanium',
      lv: 1,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      armor: 1e6
    }
  },
  blackhole: {
    name: 'Black Hole',
    info: `Black Holes still remain a mystery to this day. Destroying one
    is almost impossible, but stress it enough, and it radiates away
    Hawkings Radiation. Nobody can yet decode it, and there are very few who
    can even obtain it.`,
    isCurrent: false,
    ascendTo: false,
    req: 25000,
    ore: {
      id: 'hawkingradiation',
      lv: 1,
      hp: 1e12,
      baseHp: 1e12,
      maxHp: 0,
      armor: 1e6
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
      <div class='item' id='${key}'>
        <img src='img/ascencion/${key}.png' id='${key}Img'/>
        <div class='tooltip item-tooltip'>
          <div class='tooltip-lv'>
            <canvas id='${key}Bar' width='64' height='64'></canvas>
          </div>
          <div class='tooltip-misc'>
            <div class='col-full f10' id='${key}Avb'></div>
          </div>
          <div class='tooltip-content fgrey'>
            <span class='fwhite'>${item.name}</span><hr/>
            Req: <span class='fwhite f16' id='${key}Req'></span> <img class='imgFix' src='img/inv/darkMatter16.png'/><br/>
            Lv: <span class='fwhite f16' id='${key}Lv'></span> <img class='imgFix' src='img/inv/${ore.id}16.png'/><hr/>
            <span class='f10'>${item.info}</span>
          </div>
        </div>
      </div>
    `;

    elem('ascensionItems').innerHTML += content;
	}
}
/*===========================================================
=         Generate Ore Stats                                =
===========================================================*/
function generateOreStats() {
	let content = `
    Ore Max Hp: <span class='fwhite f16' id='oreMaxHp'></span><br/>
    Ore Lv: <span class='fwhite f16' id='oreLv'></span><br/>
    Ore Armor: <span class='fwhite f16' id='oreArmor'></span><br/>
    Effective Armor: <span class='fwhite f16' id='effectiveArmor'></span><br/>
    Chance to drop <span class='fpurple'>Dark Matter</span>: <span class='fwhite f16'>10%</span><br/>
    XP per Lv: <span class='fwhite f16'>+1</span><hr/>
    <span class='fwhite f16' id='currentPlanet'></span> |
    <span class='fwhite f16' id='oreName'></span>
	`;

	elem('oreStats').innerHTML = content;
}
/*===========================================================
=         Update Ore Stats                                  =
===========================================================*/
function updateOreStats() {
  for(key in Game.Ascensions) {
    let ore = Game.Ascensions[key].ore;
    let oreMaxHp = Math.floor(ore.baseHp * Math.pow(1.03, ore.lv));

    ore.maxHp = oreMaxHp;
    elem('oreMaxHp').innerHTML = nFormat(ore.maxHp);
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
}
function unlockGrudnock() {
  Game.Ascensions.grudnock.ascendTo = true;
  elem('grudnock').onclick = function() { ascend('grudnock'); }
  unlockUpgrade('lasergunCooler');
  unlockUpgrade('reloadAccelerator');
  unlockUpgrade('ricochetLaser');
  unlockCrafting('plutoniumBattery');
  unlockInventory('plutonium');
}
function unlockTetherus() {
  Game.Ascensions.tetherus.ascendTo = true;
  elem('tetherus').onclick = function() { ascend('tetherus'); }
  unlockUpgrade('plasmaLauncher');
  unlockUpgrade('plasmaCooler');
  unlockUpgrade('plasmaClip');
  unlockCrafting('chrysoniteBattery');
  unlockInventory('chrysonite');
}
function unlockGazorpazorp() {
  Game.Ascensions.gazorpazorp.ascendTo = true;
  elem('gazorpazorp').onclick = function() { ascend('gazorpazorp'); }
  unlockUpgrade('plasmaCharger');
  unlockUpgrade('laserBurster');
  unlockUpgrade('laserIntensifier');
  unlockCrafting('armadiumBattery');
  unlockInventory('armadium');
}
function unlockXeln() {
  Game.Ascensions.xeln.ascendTo = true;
  elem('xeln').onclick = function() { ascend('xeln'); }
  unlockUpgrade('phaseBeam');
  unlockUpgrade('beamIntensifier');
  unlockUpgrade('multiBeam');
  unlockCrafting('solaniumBattery');
  unlockInventory('solanium');
}
function unlockBlackHole() {
  Game.Ascensions.blackhole.ascendTo = true;
  elem('blackhole').onclick = function() { ascend('blackhole'); }
  unlockUpgrade('beamCooler');
  unlockUpgrade('beamCharger');
  unlockUpgrade('phaseGun');
  unlockCrafting('darkRadiation');
  unlockInventory('hawkingradiation');
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
    let effArmor = ore.armor - (ore.armor / 100 * Game.Account.character.armorPen);

    for(i in Game.Ascensions)
      Game.Ascensions[i].isCurrent = false;

    item.isCurrent = true;

    canAscend();
    healthBar(key);

    clearTimeout(oreLvUpTO);
    clearInterval(doDpsINT);

    doDpsINT = setInterval(function() {
      doDps(key);
    }, 1000 / Game.fps)

    elem('oreImg').onclick = function() { doDpc(key); }

    connected = true;

    elem('oreImg').src = `img/${ore.id}Ore.png`;
    elem('currentPlanet').innerHTML = item.name
    elem('oreName').innerHTML = ore.id;
    elem('oreLv').innerHTML = ore.lv;
    elem('oreArmor').innerHTML = nFormat(ore.armor);
    elem('effectiveArmor').innerHTML = nFormat(effArmor);
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
      elem(key + 'Avb').className = 'col-full f10 fred';
      elem(key + 'Img').style.opacity = '.5';
      elem(key).style.cursor = 'not-allowed';
    } else if(!item.isCurrent && item.req <= inv.amount) {
      elem(key + 'Avb').innerHTML = 'Click to ascend';
      elem(key + 'Avb').className = 'col-full f10 fwhite';
      elem(key + 'Img').style.opacity = '1';
      elem(key).style.cursor = 'pointer';
    } else if(item.isCurrent && item.req <= inv.amount) {
      elem(key + 'Avb').innerHTML = 'You are here';
      elem(key + 'Avb').className = 'col-full f10 fblue';
      elem(key + 'Img').style.opacity = '1';
      elem(key).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=         Update Ascencions                                 =
===========================================================*/
function updateAscensions() {
  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let ore = item.ore;
    let inv = Game.Inventory.darkMatter;

    let width = inv.amount * 100 / item.req;
    if(item.req <= inv.amount)
      progressBar('✔', key, width);
    else
      progressBar(inv.amount, key, width);

    elem(key + 'Req').innerHTML = item.req;
    elem(key + 'Lv').innerHTML = ore.lv;
  }

  canAscend();
}
