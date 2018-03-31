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

    let upgrade = `
      <div class='hidden' id='${key}' onclick='buyUpgrade("${key}")'>
        <img src='img/upgrades/${key}.png' id='${key}Img'/>
        <div class='tooltip item-tooltip'>
  				<div class='tooltip-lv'>
  					<canvas id='${key}Bar' width='64' height='64'></canvas>
  				</div>
          <div class='tooltip-header fgrey'>
            <span class='fwhite'>${item.name}</span><br/>
            Cost: <span class='fwhite f16' id='${key}Cost'></span> <img class='imgFix' src='img/inv/${item.res}16.png'/><hr/>
          </div>
          <div class='tooltip-content fgrey fcenter f12'>
            <div class='fcenter'>
              DPS: <span class='fwhite f16' id='${key}Dps'></span> <img class='imgFix' src='img/character/dps16.png'/><br/>
              Per Lv: <span class='fwhite f16' id='${key}DpsPerLv'></span> <img class='imgFix' src='img/character/dps16.png'/><br/>
              % of total: <span class='fwhite f16' id='${key}ofTotal'></span>
              <span id='${key}Avb'></span>
            </div><br>
            <span class='f10'>${item.info}</span>
  				</div>
        </div>
      </div>
    `;

    elem('upgradeItems').innerHTML += upgrade;
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

    elem(res + 'Amount').innerHTML = nFormat(Game.Inventory[res].amount);
    elem(key + 'Dps').innerHTML = nFormat(item.dps);
    elem(key + 'DpsPerLv').innerHTML = '+' + nFormat(dpsPerLv);
    elem(key + 'Cost').innerHTML = nFormat(item.cost);

    let width = (20 - (nextLv - item.lv)) * 5;
    progressBar(item.lv, key, width);

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
      elem(key + 'Cost').className = 'f16 fwhite';
      elem(key + 'Img').style.opacity = '1';
      elem(key).style.cursor = 'pointer';
    }
    else if(inv.amount <= item.cost) {
      elem(key + 'Cost').className = 'f16 fred';
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

    progressBar(item.lv, key, width);
    elem(key + 'Cost').innerHTML = nFormat(item.cost);
    elem(key + 'Dps').innerHTML = nFormat(item.dps);
    elem(key + 'DpsPerLv').innerHTML = '+' + nFormat(dpsPerLv);
  }

  canBuyUpgrade();
}
