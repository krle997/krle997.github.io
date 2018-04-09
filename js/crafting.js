/*===========================================================
=         Crafting                                          =
===========================================================*/
Game.Crafting = {
  titaniumBattery: {
    name: 'Titanium Battery',
    info: 'Increases Damage Increment by 1% per Upgrade Lv',
    status: false,
    remaining: 600000,
    cost: 10
  },
  plutoniumBattery: {
    name: 'Plutonium Battery',
    info: 'Increases Critical Hit and Armor Penetration by 0.01% per Upgrade Lv',
    status: false,
    remaining: 600000,
    cost: 15
  },
  chrysoniteBattery: {
    name: 'Chrysonite Battery',
    info: `Increases DPC by 0.01% per Upgrade Lv`,
    status: false,
    remaining: 600000,
    cost: 20
  },
  armadiumBattery: {
    name: 'Armadium Battery',
    info: `Increases DPC by 0.01% per Upgrade Lv`,
    status: false,
    remaining: 600000,
    cost: 25
  },
  solaniumBattery: {
    name: 'Solanium Battery',
    info: `Increases DPC by 0.01% per Upgrade Lv`,
    status: false,
    remaining: 600000,
    cost: 30
  },
  darkRadiation: {
    name: 'Dark Radiation',
    info: `Doubles the efficiency of Concentrated Dark Matter`,
    status: false,
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
        <div class='item-img'>
          <img src='img/crafting/${key}.png' class='item-img' id='${key}Img'>
        </div>
        <div class='item-progressbar'>
          <div class='item-bar'>
            <div class='item-prog' id='${key}ItemProg'></div>
          </div>
        </div>
        <div class='tooltip item-tooltip fgrey f10'>
          <div class='tooltip-content'>
            <span class='fwhite f12'>${item.name}</span><hr>
            <div class='fcenter'>
              Cost: <span class='fwhite f16' id='${key}Cost'></span> <img class='imgFix' src='img/inv/antimatter16.png'><br>
              Current bonus: <span class='fwhite f16' id='${key}Bonus'></span><br>
            </div><br>
            <div>${item.info}</div><br>
            <div class='fcenter'>
              <span id='${key}Avb'></span>
            </div>
          </div>
        </div>
      </div>
    `;

    elem('craftItems').insertAdjacentHTML('beforeend', content);
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
    save(key + 'Status', item.status);

    elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
    elem(key + 'Img').style.animation = 'crafting-anim 3s linear infinite';

    let width = 100 / (600000 / item.remaining);
    progBar(item.remaining / 1000, key, width);

    updateDamage();
    canCraft();
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
      elem(key + 'Avb').innerHTML = 'Currently active';
      elem(key + 'Avb').className = 'fblue f10';
      elem(key + 'Cost').className = 'fwhite f16';
      elem(key + 'Img').style.opacity = '1';
      elem(key).style.cursor = 'not-allowed';
    } else if(!item.status && inv.antiMatter.amount >= item.cost) {
      elem(key + 'Avb').innerHTML = 'Click to craft';
      elem(key + 'Avb').className = 'fwhite f10';
      elem(key + 'Cost').className = 'fwhite f16';
      elem(key + 'Img').style.opacity = '1';
      elem(key).style.cursor = 'pointer';
    } else if(!item.status && inv.antiMatter.amount <= item.cost) {
      elem(key + 'Avb').innerHTML = 'Not enough resources';
      elem(key + 'Avb').className = 'fred f10';
      elem(key + 'Cost').className = 'fred f16';
      elem(key + 'Img').style.opacity = '.2';
      elem(key).style.cursor = 'not-allowed';
    }
  }
}
/*===========================================================
=         Update Crafting                                   =
===========================================================*/
function updateCrafting() {
  for(key in Game.Crafting) {
    let item = Game.Crafting[key];

    if(item.status)
      elem(key + 'Img').style.animation = 'crafting-anim 3s linear infinite';
    else
      elem(key + 'Img').style.animation = '';

    let width = 100 / (600000 / item.remaining);
    progBar(item.remaining / 1000, key, width);
    elem(key + 'Cost').innerHTML = nFormat(item.cost);
  }

  canCraft();
}
