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
    costPerLv: 1.04,
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
    costPerLv: 1.04,
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
    costPerLv: 1.04,
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
    costPerLv: 1.045,
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
    costPerLv: 1.045,
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
    costPerLv: 1.045,
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
    costPerLv: 1.05,
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
    costPerLv: 1.05,
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
    costPerLv: 1.05,
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
    costPerLv: 1.055,
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
    costPerLv: 1.055,
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
    costPerLv: 1.055,
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
    costPerLv: 1.06,
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
    costPerLv: 1.06,
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
    costPerLv: 1.06,
    dps: 0,
    baseDps: 4e11
  },
  beamCooler: {
    name: 'Beam Cooler',
    info: 'Hi-tech cooler for your Phase Beam',
    res: 'singularity',
    lv: 0,
    cost: 0,
    baseCost: 10,
    costPerLv: 1.065,
    dps: 0,
    baseDps: 4e11
  },
  beamCharger: {
    name: 'Beam Charger',
    info: 'Charges the beam for more damage',
    res: 'singularity',
    lv: 0,
    cost: 0,
    baseCost: 200,
    costPerLv: 1.065,
    dps: 0,
    baseDps: 4e11
  },
  phaseGun: {
    name: 'Phase Gun',
    info: 'A combination of your plasma and laser beam guns.',
    res: 'singularity',
    lv: 0,
    cost: 0,
    baseCost: 4000,
    costPerLv: 1.065,
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

    let html = `
      <div class='hidden' id='${key}'>
        <div class='item-img'>
          <img src='img/upgrades/${key}.png'>
        </div>
        <div class='item-bar'>
          <div class='item-progress' id='${key}Progress'></div>
        </div>
        <div class='tooltip item-tooltip-right'>
          <div class='tooltip-header fcenter'>
            <span class='fwhite'>${item.name}</span><br>
            <span id='${key}Avb'></span>
          </div>
          <div class='tooltip-content'>
            Lv : <span class='fwhite f16' id='${key}Lv'></span><br>
            Cost : <span class='fwhite f16' id='${key}Cost'></span> <img class='imgFix' src='img/inv/${item.res}16.png'><br>
            DPS : <span class='fwhite f16' id='${key}Dps'></span> <img class='imgFix' src='img/character/dps16.png'> (<span class='fwhite f16' id='${key}ofTotal'></span>)<hr>
            DPS / Lv : <span class='fwhite f16' id='${key}DpsPerLv'></span> <img class='imgFix' src='img/character/dps16.png'><br>
            Cost / Lv : <span class='fwhite f16'>+ ${item.costPerLv * 100 - 100}%</span><hr>
            ${item.info}
          </div>
        </div>
      </div>
    `;

    elem('upgradeItems').insertAdjacentHTML('beforeend', html);
  }
}
/*===========================================================
=         Unlock Upgrade                                    =
===========================================================*/
function unlockUpgrade(key) {
  elem(key).className = 'item';
  elem(key).onclick = function() { buyUpgrade(key, Game.buyQuantity); }
}
/*===========================================================
=         Lock Upgrades                                     =
===========================================================*/
function lockUpgrades() {
	for(key in Game.Upgrades) {
    elem(key).className = 'hidden';
    elem(key).onclick = function() {}
	}
}
/*===========================================================
=         Upgrade Event Listener                            =
===========================================================*/
var kbdBtns = [ 'kbdZ', 'kbdX', 'kbdC' ]
document.addEventListener('keypress', function(event) {
  for(key in kbdBtns)
    elem(kbdBtns[key]).style.opacity = .4;
    
  switch(event.key) {
    case 'z':
      updateQuantity(1, 'Z');
    break;
    case 'x':
      updateQuantity(20, 'X');
    break;
    case 'c':
      updateQuantity(100, 'C');
    break;
    default:
      return;
  }

  cl(`addEventListener(keypress) - ${event.key}`);
});

function updateQuantity(quantity, kbd) {
  Game.buyQuantity = quantity;
  save('buyQuantity', Game.buyQuantity);
  elem(`kbd${kbd}`).style.opacity = 1;

  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];
    let cost = Math.floor(item.baseCost * (Math.pow(item.costPerLv, item.lv + Game.buyQuantity) - Math.pow(item.costPerLv, item.lv)) / (item.costPerLv - 1))
    item.cost = cost;
    elem(`${key}Cost`).innerHTML = nFormat(item.cost);
    checkUpgrades();
  }
}
/*===========================================================
=         Buy Upgrade                                       =
===========================================================*/
function buyUpgrade(key, quantity) {
  let item = Game.Upgrades[key];
  let inv = Game.Inventory[item.res];

  if(inv.amount < item.cost)
    return;
  else {
    inv.amount -= item.cost;
    item.lv += quantity;

    let cost = Math.floor(item.baseCost * (Math.pow(item.costPerLv, item.lv + quantity) - Math.pow(item.costPerLv, item.lv)) / (item.costPerLv - 1))
    let dps = (item.lv * item.baseDps) * Math.pow(2, Math.floor(item.lv / 20));
    let dpsPerLv = item.baseDps * Math.pow(2, Math.floor(item.lv / 20));
    let nextLv = (Math.floor(item.lv / 20) + 1) * 20;
    let width = (20 - (nextLv - item.lv)) * 5;

    item.cost = cost;
    item.dps = dps;

    updateDamage();
    checkUpgrades();
    progressBar(key, width);
    playAudio('click');

    save(`${item.res}Amount`, inv.amount);
    save(`${key}Lv`, item.lv);

    elem(`${item.res}Amount`).innerHTML = nFormat(inv.amount);
    elem(`${key}Lv`).innerHTML = item.lv;
    elem(`${key}Cost`).innerHTML = nFormat(item.cost);
    elem(`${key}Dps`).innerHTML = nFormat(item.dps);
    elem(`${key}DpsPerLv`).innerHTML = `+ ${nFormat(dpsPerLv)}`;
  }
}
/*===========================================================
=         Check Upgrades                                    =
===========================================================*/
function checkUpgrades() {
  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];
    let inv = Game.Inventory[item.res];

    if(inv.amount >= item.cost) {
      elem(`${key}Avb`).innerHTML = `Click to buy x ${Game.buyQuantity}`;
      elem(`${key}Avb`).className = 'fwhite';
      elem(`${key}Cost`).className = 'fwhite f16';
      elem(key).style.cursor = 'pointer';
    }
    else if(inv.amount < item.cost) {
      elem(`${key}Avb`).innerHTML = `Not enough ${item.res} for x ${Game.buyQuantity}`;
      elem(`${key}Avb`).className = 'fred';
      elem(`${key}Cost`).className = 'fred f16';
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
    let cost = Math.floor(item.baseCost * (Math.pow(item.costPerLv, item.lv + Game.buyQuantity) - Math.pow(item.costPerLv, item.lv)) / (item.costPerLv - 1))
    let dps = (item.lv * item.baseDps) * Math.pow(2, Math.floor(item.lv / 20));
    let dpsPerLv = item.baseDps * Math.pow(2, Math.floor(item.lv / 20));
    let nextLv = (Math.floor(item.lv / 20) + 1) * 20;
    let width = (20 - (nextLv - item.lv)) * 5;

    item.dps = dps;
    item.cost = cost;

    progressBar(key, width);

    elem(`${key}Lv`).innerHTML = item.lv;
    elem(`${key}Cost`).innerHTML = nFormat(item.cost);
    elem(`${key}Dps`).innerHTML = nFormat(item.dps);
    elem(`${key}DpsPerLv`).innerHTML = `+ ${nFormat(dpsPerLv)}`;
  }

  checkUpgrades();
}
