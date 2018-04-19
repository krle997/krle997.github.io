/*===========================================================
=         Crafting                                          =
===========================================================*/
Game.Crafting = {
  titaniumBattery: {
    name: 'Titanium Battery',
    info: 'Increases Damage Increment by 1% per Upgrade Lv',
    status: false,
    duration: 600000,
    remaining: 600000,
    cost: 10
  },
  plutoniumBattery: {
    name: 'Plutonium Battery',
    info: 'Increases Critical Hit and Armor Penetration by 0.01% per Upgrade Lv',
    status: false,
    duration: 600000,
    remaining: 600000,
    cost: 15
  },
  chrysoniteBattery: {
    name: 'Chrysonite Battery',
    info: `Increases DPC by 0.01% per Upgrade Lv`,
    status: false,
    duration: 600000,
    remaining: 600000,
    cost: 20
  },
  armadiumBattery: {
    name: 'Armadium Battery',
    info: `Increases DPC by 0.01% per Upgrade Lv`,
    status: false,
    duration: 600000,
    remaining: 600000,
    cost: 25
  },
  solaniumBattery: {
    name: 'Solanium Battery',
    info: `Increases DPC by 0.01% per Upgrade Lv`,
    status: false,
    duration: 600000,
    remaining: 600000,
    cost: 30
  },
  darkRadiation: {
    name: 'Dark Radiation',
    info: `Doubles the efficiency of Concentrated Dark Matter`,
    status: false,
    duration: 600000,
    remaining: 600000,
    cost: 35
  }
}
/*===========================================================
=         Generate Crafting                                 =
===========================================================*/
function generateCrafting() {
	for(key in Game.Crafting) {
    let item = Game.Crafting[key];

    let content = `
      <div class='hidden' id='${key}' onclick='craft("${key}")'>
        <div class='item-img' id='${key}Img'>
          <img src='img/crafting/${key}.png'>
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
            Cost: <span class='fwhite f16' id='${key}Cost'></span> <img class='imgFix' src='img/inv/antimatter16.png'><br>
            Boost: <span class='fwhite f16' id='${key}Bonus'></span><br>
            Duration: <span class='fwhite f16'>${item.duration / 1000} s</span><br>
            Remaining: <span class='fwhite f16' id='${key}Remaining'></span><hr>
            ${item.info}
          </div>
        </div>
      </div>
    `;

    elem('craftingItems').insertAdjacentHTML('beforeend', content);
	}
}
/*===========================================================
=         Unlock Crafting                                   =
===========================================================*/
function unlockCrafting(key) {
  elem(key).className = 'item';
}
/*===========================================================
=         Lock Crafting                                     =
===========================================================*/
function lockCrafting() {
  for(key in Game.Crafting) {
    elem(key).className = 'hidden';
  }
}
/*===========================================================
=         Craft                                             =
===========================================================*/
function craft(key) {
  let item = Game.Crafting[key];
  let inv = Game.Inventory;

  if(inv.antiMatter.amount < item.cost) {
    return;
  } else if(item.status) {
    return;
  } else {
    inv.antiMatter.amount -= item.cost;
    item.status = true;

    save('antiMatterAmount', inv.antiMatter.amount);
    save(`${key}Status`, item.status);

    let width = 100 / (600000 / item.remaining);
    progressBar(key, width);

    updateDamage();
    canCraft();

    playAudio('click');

    elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
    elem(`${key}Img`).style.animation = 'crafting-anim 3s linear infinite';
  }
}
/*===========================================================
=         Check Crafting                                    =
===========================================================*/
function canCraft() {
  for(key in Game.Crafting) {
    let item = Game.Crafting[key];
    let inv = Game.Inventory;

    if(item.status) {
      elem(`${key}Avb`).innerHTML = 'Currently active';
      elem(`${key}Avb`).className = 'fblue';
      elem(`${key}Cost`).className = 'fwhite f16';
      elem(`${key}`).style.cursor = 'not-allowed';
    } else if(!item.status && inv.antiMatter.amount >= item.cost) {
      elem(`${key}Avb`).innerHTML = 'Click to craft';
      elem(`${key}Avb`).className = 'fwhite';
      elem(`${key}Cost`).className = 'fwhite f16';
      elem(`${key}`).style.cursor = 'pointer';
    } else if(!item.status && inv.antiMatter.amount <= item.cost) {
      elem(`${key}Avb`).innerHTML = 'Not enough resources';
      elem(`${key}Avb`).className = 'fred';
      elem(`${key}Cost`).className = 'fred f16';
      elem(`${key}`).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=         Update Crafting                                   =
===========================================================*/
function updateCrafting() {
  for(key in Game.Crafting) {
    let item = Game.Crafting[key];

    if(item.status) {
      elem(`${key}Img`).style.animation = 'crafting-anim 3s linear infinite';
      elem(`${key}Remaining`).innerHTML = `${item.remaining / 1000} s`;
    } else {
      elem(`${key}Img`).style.animation = '';
      elem(`${key}Remaining`).innerHTML = 'Inactive';
    }

    let width = 100 / (600000 / item.remaining);
    progressBar(key, width);

    elem(`${key}Cost`).innerHTML = nFormat(item.cost);

  }

  canCraft();
}
