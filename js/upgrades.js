/*===========================================================
=         Upgrades                                          =
===========================================================*/
Game.Upgrades = {
  laserGun: {
    name: 'Laser Gun',
    info: 'Basic beam for your laser gun. Low price makes it efficient, scalable upgrade',
    res: 'titanium',
    lv: 0,
    cost: 0,
    baseCost: 10,
    dps: 0,
    baseDps: 1
  },
  advancedLasers: {
    name: 'Advanced Lasers',
    info: 'Intensifies the laser for more damage',
    res: 'titanium',
    lv: 0,
    cost: 0,
    baseCost: 200,
    dps: 0,
    baseDps: 20
  },
  laserAmplifier: {
    name: 'Laser Amplifier',
    info: 'Amplifies the laser strength',
    res: 'titanium',
    lv: 0,
    cost: 0,
    baseCost: 4000,
    dps: 0,
    baseDps: 400
  },
  lasergunCooler: {
    name: 'Lasergun Cooler',
    info: 'An excellent cooler that prevents your laser gun from ever heating up',
    res: 'plutonium',
    lv: 0,
    cost: 0,
    baseCost: 10,
    dps: 0,
    baseDps: 10000
  },
  reloadAccelerator: {
    name: 'Reload Accelerator',
    info: 'Reduces time needed to reload the LaserGun',
    res: 'plutonium',
    lv: 0,
    cost: 0,
    baseCost: 200,
    dps: 0,
    baseDps: 200000
  },
  ricochetLaser: {
    name: 'Ricochet Laser',
    info: 'Your lasergun can now shoot multiple laser beams simultaneously',
    res: 'plutonium',
    lv: 0,
    cost: 0,
    baseCost: 4000,
    dps: 0,
    baseDps: 4e6
  },
  plasmaLauncher: {
    name: 'Plasma Launcher',
    info: 'Bursts a lot of hot plasma, melting the Ores core',
    res: 'chrysonite',
    lv: 0,
    cost: 0,
    baseCost: 10,
    dps: 0,
    baseDps: 4e9
  },
  plasmaCooler: {
    name: 'Plasma Cooler',
    info: 'Hi-tech cooler for your Plasma Launcher',
    res: 'chrysonite',
    lv: 0,
    cost: 0,
    baseCost: 200,
    dps: 0,
    baseDps: 4e10
  },
  plasmaClip: {
    name: 'Plasma Clip',
    info: 'Holds so much more ammo than basic clip, meaning you wont have to reload very often',
    res: 'chrysonite',
    lv: 0,
    cost: 0,
    baseCost: 4000,
    dps: 0,
    baseDps: 4e11
  },
  plasmaCharger: {
    name: 'Plasma Charger',
    info: 'Charges your plasma gun, much like Laser Amplifier amplifies your laser',
    res: 'armadium',
    lv: 0,
    cost: 0,
    baseCost: 10,
    dps: 0,
    baseDps: 4e11
  },
  laserBurster: {
    name: 'Laser Burster',
    info: 'Your lasers burst upon impact, exploding and weakening ores core',
    res: 'armadium',
    lv: 0,
    cost: 0,
    baseCost: 200,
    dps: 0,
    baseDps: 4e11
  },
  laserIntensifier: {
    name: 'Laser Intensifier',
    info: 'Intensifies the lasers strength',
    res: 'armadium',
    lv: 0,
    cost: 0,
    baseCost: 4000,
    dps: 0,
    baseDps: 4e11
  },
  phaseBeam: {
    name: 'Phase Beam',
    info: 'Takes a while to charge, but hits like a rock',
    res: 'solanium',
    lv: 0,
    cost: 0,
    baseCost: 10,
    dps: 0,
    baseDps: 4e11
  },
  beamIntensifier: {
    name: 'Beam Intensifier',
    info: 'Makes the beam hit even stronger',
    res: 'solanium',
    lv: 0,
    cost: 0,
    baseCost: 200,
    dps: 0,
    baseDps: 4e11
  },
  multiBeam: {
    name: 'Multi Beam',
    info: 'Phase Beam can now shoot multiple beams at once',
    res: 'solanium',
    lv: 0,
    cost: 0,
    baseCost: 4000,
    dps: 0,
    baseDps: 4e11
  },
  beamCooler: {
    name: 'Beam Cooler',
    info: 'Hi-tech cooler for your Phase Beam',
    res: 'hawkingRadiation',
    lv: 0,
    cost: 0,
    baseCost: 10,
    dps: 0,
    baseDps: 4e11
  },
  beamCharger: {
    name: 'Beam Charger',
    info: 'Charges the beam for more damage',
    res: 'hawkingRadiation',
    lv: 0,
    cost: 0,
    baseCost: 200,
    dps: 0,
    baseDps: 4e11
  },
  phaseGun: {
    name: 'Phase Gun',
    info: 'A combination of your plasma and laser beam guns.',
    res: 'hawkingRadiation',
    lv: 0,
    cost: 0,
    baseCost: 4000,
    dps: 0,
    baseDps: 4e11
  }
}
/*===========================================================
=         Generate Upgrades                                 =
===========================================================*/
function generateUpgrades() {
  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];

    let content = `
      <div class='hidden' id='${key}' onclick='buyUpgrade("${key}")'>
        <div class='item-img'>
          <img src='img/upgrades/${key}.png' id='${key}Img'>
        </div>
        <div class='item-bar'>
          <div class='item-progress' id='${key}Progress'></div>
        </div>
        <div class='tooltip item-tooltip fgrey'>
          <div class='tooltip-content'>
            <span class='fwhite f14'>${item.name}</span><br>
            <span id='${key}Avb'></span><hr>
            Lv: <span class='fwhite f16' id='${key}Lv'></span><br>
            Cost: <span class='fwhite f16' id='${key}Cost'></span> <img class='imgFix' src='img/inv/${item.res}16.png'><br>
            DPS: <span class='fwhite f16' id='${key}Dps'></span> <img class='imgFix' src='img/character/dps16.png'><br>
            DPS per Lv: <span class='fwhite f16' id='${key}DpsPerLv'></span> <img class='imgFix' src='img/character/dps16.png'><br>
            % of total DPS: <span class='fwhite f16' id='${key}ofTotal'></span><hr>
            ${item.info}
  				</div>
        </div>
      </div>
    `;

    elem('upgradeItems').insertAdjacentHTML('beforeend', content);
  }
}
/*===========================================================
=         Unlock Upgrade                                    =
===========================================================*/
function unlockUpgrade(key) {
  elem(key).className = 'item';
}
/*===========================================================
=         Lock Upgrades                                     =
===========================================================*/
function lockUpgrades() {
	for(key in Game.Upgrades) {
    elem(key).className = 'hidden';
	}
}
/*===========================================================
=         Buy Upgrade                                       =
===========================================================*/
function buyUpgrade(key) {
  let item = Game.Upgrades[key];
  let res = item.res;
  let inv = Game.Inventory[res];

  if(inv.amount < item.cost) {
    return;
  } else {
    item.lv ++;
    inv.amount -= item.cost;

    let dps = (item.lv * item.baseDps) * Math.pow(2, Math.floor(item.lv / 20));
    let cost = Math.floor(item.baseCost * Math.pow(1.04, item.lv));
    let dpsPerLv = item.baseDps * Math.pow(2, Math.floor(item.lv / 20));
    let nextLv = (Math.floor(item.lv / 20) + 1) * 20;

    item.dps = dps;
    item.cost = cost;

    save(res + 'Amount', inv.amount);
    save(key + 'Lv', item.lv);

    elem(key + 'Lv').innerHTML = item.lv;
    elem(res + 'Amount').innerHTML = nFormat(Game.Inventory[res].amount);
    elem(key + 'Dps').innerHTML = nFormat(item.dps);
    elem(key + 'DpsPerLv').innerHTML = '+' + nFormat(dpsPerLv);
    elem(key + 'Cost').innerHTML = nFormat(item.cost);

    let width = (20 - (nextLv - item.lv)) * 5;
    progBar(item.lv, key, width);

    updateDamage();
    canBuyUpgrade();

    /*if(!Game.muted) {
      let sound = new Audio('sounds/buy.wav');
      sound.play();
    }*/
  }
}
/*===========================================================
=         Check Upgrades                                    =
===========================================================*/
function canBuyUpgrade() {
  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];
    let res = item.res;
    let inv = Game.Inventory[res];

    if(inv.amount >= item.cost) {
      elem(key + 'Avb').innerHTML = 'Click to buy';
      elem(key + 'Avb').className = 'fwhite';
      elem(key + 'Cost').className = 'fwhite f16';
      elem(key + 'Img').style.opacity = '1';
      elem(key).style.cursor = 'pointer';
    }
    else if(inv.amount <= item.cost) {
      elem(key + 'Avb').innerHTML = 'Not enough resources';
      elem(key + 'Avb').className = 'fred';
      elem(key + 'Cost').className = 'fred f16';
      elem(key + 'Img').style.opacity = '.2';
      elem(key).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=         Update Upgrades                                   =
===========================================================*/
function updateUpgrades() {
  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];
    let dps = (item.lv * item.baseDps) * Math.pow(2, Math.floor(item.lv / 20));
    let cost = Math.floor(item.baseCost * Math.pow(1.04, item.lv));
    let dpsPerLv = item.baseDps * Math.pow(2, Math.floor(item.lv / 20));
    let nextLv = (Math.floor(item.lv / 20) + 1) * 20;
  	let width = (20 - (nextLv - item.lv)) * 5;

    item.dps = dps;
    item.cost = cost;

    progBar(item.lv, key, width);
    elem(key + 'Lv').innerHTML = item.lv;
    elem(key + 'Cost').innerHTML = nFormat(item.cost);
    elem(key + 'Dps').innerHTML = nFormat(item.dps);
    elem(key + 'DpsPerLv').innerHTML = '+' + nFormat(dpsPerLv);
  }

  canBuyUpgrade();
}
