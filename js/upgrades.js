/*===========================================================
=         Upgrades                                          =
===========================================================*/
Game.Upgrades = {
  laserGun: {
    name: 'Laser Gun',
    info: 'Basic beam for your laser gun. Low price makes it efficient, scalable upgrade',
    res: 'titanium',
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
    quantity: 1,
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
        <div class='tooltip item-tooltip-right fgrey'>
          <div class='tooltip-header fcenter'>
            <span class='fwhite f14'>${item.name}</span><br>
            <span id='${key}Avb'></span>
          </div>
          <div class='tooltip-content'>
            Lv : <span class='fwhite f16' id='${key}Lv'></span><br>
            Buy : <span class='fwhite f16' id='${key}Quantity'></span><br>
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
  elem(key).addEventListener('click', buyUpg);
}
/*===========================================================
=         Lock Upgrades                                     =
===========================================================*/
function lockUpgrades() {
	for(key in Game.Upgrades) {
    elem(key).className = 'hidden';
    elem(key).removeEventListener('click', buyUpg);
	}
}
/*===========================================================
=         Buy Upgrade                                       =
===========================================================*/
window.addEventListener('keypress', function(event) {
  switch(event.key) {
    case 'z':
      for(key in Game.Upgrades) {
        let item = Game.Upgrades[key];

        item.cost = Math.floor(item.baseCost * Math.pow(item.costPerLv, item.lv));
        item.quantity = 1;

        elem(`${key}Cost`).innerHTML = nFormat(item.cost);
        elem(`${key}Quantity`).innerHTML = `x${item.quantity} Lvs`;
        canBuyUpgrade();
      }
      break;
    case 'x':
      for(key in Game.Upgrades) {
        let item = Game.Upgrades[key];
        let cost = item.baseCost * (Math.pow(item.costPerLv, item.lv + 20) - Math.pow(item.costPerLv, item.lv)) / (item.costPerLv - 1);

        item.cost = Math.floor(cost);
        item.quantity = 20;

        elem(`${key}Cost`).innerHTML = nFormat(item.cost);
        elem(`${key}Quantity`).innerHTML = `x${item.quantity} Lvs`;
        canBuyUpgrade();
      }
      break;
    case 'c':
      for(key in Game.Upgrades) {

        let item = Game.Upgrades[key];

        item.cost = Math.floor(item.baseCost * (Math.pow(item.costPerLv, item.lv + 100) - Math.pow(item.costPerLv, item.lv)) / 0.04);
        item.quantity = 100;

        elem(`${key}Cost`).innerHTML = nFormat(item.cost);
        elem(`${key}Quantity`).innerHTML = `x${item.quantity} Lvs`;
        canBuyUpgrade();
      }
  }
});

function buyUpg() {
  let item = Game.Upgrades[this.id];
  let inv = Game.Inventory[item.res];

  if(inv.amount < item.cost) {
    return;
  } else {
    item.lv += item.quantity;
    inv.amount -= item.cost;

    let dpsPerLv = item.baseDps * Math.pow(2, Math.floor(item.lv / 20));
    let nextLv = (Math.floor(item.lv / 20) + 1) * 20;

    item.dps = (item.lv * item.baseDps) * Math.pow(2, Math.floor(item.lv / 20));
    item.cost = Math.floor(item.baseCost * (Math.pow(item.costPerLv, item.lv + item.quantity) - Math.pow(item.costPerLv, item.lv)) / 0.04);

    save(`${item.res}Amount`, inv.amount);
    save(`${this.id}Lv`, item.lv);

    let width = (20 - (nextLv - item.lv)) * 5;
    progressBar(this.id, width);

    updateDamage();
    canBuyUpgrade();

    playAudio('click');

    elem(`${this.id}Lv`).innerHTML = item.lv;
    elem(`${this.id}Cost`).innerHTML = nFormat(item.cost);
    elem(`${this.id}Dps`).innerHTML = nFormat(item.dps);
    elem(`${this.id}DpsPerLv`).innerHTML = `+ ${nFormat(dpsPerLv)}`;
    elem(`${item.res}Amount`).innerHTML = nFormat(Game.Inventory[item.res].amount);
  }
}
/*===========================================================
=         Check Upgrades                                    =
===========================================================*/
function canBuyUpgrade() {
  for(key in Game.Upgrades) {
    let item = Game.Upgrades[key];
    let inv = Game.Inventory[item.res];

    if(inv.amount >= item.cost) {
      elem(`${key}Avb`).innerHTML = 'Click to buy';
      elem(`${key}Avb`).className = 'fwhite';
      elem(`${key}Cost`).className = 'fwhite f16';
      elem(key).style.cursor = 'pointer';
    }
    else if(inv.amount <= item.cost) {
      elem(`${key}Avb`).innerHTML = 'Unavailable';
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
    let dpsPerLv = item.baseDps * Math.pow(2, Math.floor(item.lv / 20));
    let nextLv = (Math.floor(item.lv / 20) + 1) * 20;
    let width = (20 - (nextLv - item.lv)) * 5;

    item.dps = (item.lv * item.baseDps) * Math.pow(2, Math.floor(item.lv / 20));
    item.cost = Math.floor(item.baseCost * Math.pow(item.costPerLv, item.lv));

    progressBar(key, width);

    elem(`${key}Lv`).innerHTML = item.lv;
    elem(`${key}Quantity`).innerHTML = `x${item.quantity} Lvs`;
    elem(`${key}Cost`).innerHTML = nFormat(item.cost);
    elem(`${key}Dps`).innerHTML = nFormat(item.dps);
    elem(`${key}DpsPerLv`).innerHTML = `+ ${nFormat(dpsPerLv)}`;
  }

  canBuyUpgrade();
}
