/*===========================================================
=         Ascensions                                        =
===========================================================*/
Game.Ascensions = {
  earth: {
    name: 'Earth',
    info: `
      Our species used to observe Earth back in the ancient times, and obduct
      humans for valuable research and experiments. Their brains had enormous
      capabilities, too bad they let greed and selfishness terminate them, along
      with every other living being on the planet. Over the course of millions
      of years, everything slowly degraded to dust, and since Titanium is
      very common here, it's formed ores are now widespread across the entire
      planet.
    `,
    req: 0,
    current: false,
    oreId: 'titanium',
    upgrades: [ 'laserGun', 'advancedLasers', 'laserAmplifier' ],
    crafting: 'titaniumBattery',
    inventory: [ 'titanium', 'antiMatter', 'darkMatter' ]
  },
  grudnock: {
    name: 'Grudnock',
    info: `
      Grudnock has everything a planet needs to support life, however there
      are no signs of any living being ever forming here. Just pure, untouched
      nature, and loads of Plutonium ores. They are tough, but also rare. Having
      some in stash surely wont go to waste
    `,
    req: 50,
    current: false,
    oreId: 'plutonium',
    upgrades: [ 'lasergunCooler', 'reloadAccelerator', 'ricochetLaser' ],
    crafting: 'plutoniumBattery',
    inventory: [ 'plutonium' ]
  },
  tetherus: {
    name: 'Tetherus',
    info: `
      Tetherus is a Gas Giant. Nothing can ever form here except the chaotic
      environment. But Tetherus ring asteroids contain some Chrysonite, and that's
      what you're after
    `,
    req: 250,
    current: false,
    oreId: 'chrysonite',
    upgrades: [ 'plasmaLauncher', 'plasmaCooler', 'plasmaClip' ],
    crafting: 'chrysoniteBattery',
    inventory: [ 'chrysonite' ]
  },
  gazorpazorp: {
    name: 'Gazorpazorp',
    info: `
      1 year of coding, Morty! Only 11 more years to go Moooor*buuuurp*ty!!
    `,
    req: 500,
    current: false,
    oreId: 'armadium',
    upgrades: [ 'plasmaCharger', 'laserBurster', 'laserIntensifier' ],
    crafting: 'armadiumBattery',
    inventory: [ 'armadium' ]
  },
  xeln: {
    name: 'Xeln',
    info: `
      Xeln is completely covered in water. Nobody ever visited here before you.
      Who'd want to visit a planet covered with water anyway? Well, lucky for
      you, there are Solanium ores burried deep in the bottom of the ocean.
      Solanium is very extremely rare, and we're in luck nobody bothered to visit
      this planet before us
    `,
    req: 1000,
    current: false,
    oreId: 'solanium',
    upgrades: [ 'phaseBeam', 'beamIntensifier', 'multiBeam' ],
    crafting: 'solaniumBattery',
    inventory: [ 'solanium' ]
  },
  blackhole: {
    name: 'Black Hole',
    info: `
      Black Holes still remain a mystery to this day. Destroying one
      is almost impossible. If you manage to break it, you will find
      Singularity in it's core. Nobody can yet decode it, and there are
      very few who can obtain it
    `,
    req: 2000,
    current: false,
    oreId: 'singularity',
    upgrades: [ 'beamCooler', 'beamCharger', 'phaseGun' ],
    crafting: 'darkRadiation',
    inventory: [ 'singularity' ]
  }
}
/*===========================================================
=         Generate Ascensions                               =
===========================================================*/
function generateAscensions() {
	for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let ore = Game.Ores[item.oreId];

    let html = `
      <div class='item' id='${key}'>
        <div class='item-img'>
          <img src='img/ascencion/${key}.png'>
        </div>
        <div class='item-bar'>
          <div class='item-progress' id='${key}Progress'></div>
        </div>
        <div class='tooltip item-tooltip-right fgrey'>
          <div class='tooltip-header fcenter'>
            <span class='fwhite f14'>${item.name}</span><br>
            <span id='${key}Avb'></span>
          </div>
          <div class='tooltip-content'>
            Requirement: <span class='fwhite f16' id='${key}Req'></span> <img class='imgFix' src='img/inv/darkMatter16.png'><br>
            <div class='hidden' id='${key}Content'>
              Ore: <span class='fgreen'>${ore.name}</span> <img class='imgFix' src='img/inv/${item.oreId}16.png'><br>
              Lv: <span class='fwhite f16' id='${item.oreId}Lv'></span><hr>
              ${item.info}
            </div>
          </div>
        </div>
      </div>
    `;

    elem('ascensionItems').insertAdjacentHTML('beforeend', html);
	}
}
/*===========================================================
=         Unlock Ascension                                  =
===========================================================*/
function unlockAscension(key) {
  let item = Game.Ascensions[key];

  elem(key).onclick = function() { ascend(key); }
  elem(`${key}Content`).className = 'visible';

  for(i = 0; i < item.upgrades.length; i ++)
    unlockUpgrade(item.upgrades[i]);

  unlockCrafting(item.crafting);

  for(i = 0; i < item.inventory.length; i ++)
    unlockInventory(item.inventory[i]);
}
/*===========================================================
=         Lock Ascensions                                   =
===========================================================*/
function lockAscensions() {
	for(key in Game.Ascensions) {
		elem(key).onclick = function () {}
    elem(`${key}Content`).className = 'hidden';
  }
}
/*===========================================================
=         Ascend                                            =
===========================================================*/
function ascend(key) {
  let item = Game.Ascensions[key];

  if(item.current && Game.connected)
    return;
  else if(item.current && !Game.connected || !item.current) {
    stopDamage();
    clearTimeout(Game.resetOreTo);

    for(i in Game.Ascensions) {
      Game.Ascensions[i].current = false;
      save(`${i}Current`, Game.Ascensions[i].current);
    }

    item.current = true;
    Game.connected = true;

    updateOreStats(item.oreId);
    canAscend();
    startDamage(item.oreId);

    save(`${key}Current`, item.current);
    elem('oreImg').src = `img/${item.oreId}Ore.png`;
    elem('backgroundImg').src = `img/${key}bg.jpg`;
  }
}
/*===========================================================
=         Check Ascencions                                  =
===========================================================*/
function canAscend() {
  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let inv = Game.Inventory;

    if(item.req > inv.darkMatter.amount) {
      elem(`${key}Avb`).innerHTML = 'Locked';
      elem(`${key}Avb`).className = 'fred';
      elem(`${key}Req`).className = 'fred f16';
      elem(key).style.cursor = 'not-allowed';
    }
    else if(!item.current && item.req <= inv.darkMatter.amount) {
      elem(`${key}Avb`).innerHTML = 'Click to ascend';
      elem(`${key}Avb`).className = 'fwhite';
      elem(`${key}Req`).className = 'fwhite f16';
      elem(key).style.cursor = 'pointer';
    }
    else if(item.current && item.req <= inv.darkMatter.amount) {
      elem(`${key}Avb`).innerHTML = 'You are here';
      elem(`${key}Avb`).className = 'fblue';
      elem(`${key}Req`).className = 'fwhite f16';
      elem(key).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=         Update Ascencions                                 =
===========================================================*/
function updateAscensions() {
  let inv = Game.Inventory;
  let counter = 0;

  for(key in Game.Ascensions)
    if(!Game.Ascensions[key].current)
      counter ++;

  if(counter >= 6)
    Game.Ascensions['earth'].current = true;

  for(key in Game.Ascensions) {
    let item = Game.Ascensions[key];
    let ore = Game.Ores[item.oreId];
    let width = inv.darkMatter.amount * 100 / item.req;

    if(inv.darkMatter.amount >= item.req)
      unlockAscension(key);

    if(item.req <= inv.darkMatter.amount)
      progressBar(key, 100);
    else
      progressBar(key, width);

    if(item.current)
      ascend(key);

    elem(`${key}Req`).innerHTML = nFormat(item.req);
    elem(`${item.oreId}Lv`).innerHTML = ore.lv;
  }
}
