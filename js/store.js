Game.Store = {
  advancedMicroverseAscension: {
    name: 'Adv. Microverse Ascension',
    info: 'Perform Microverse Ascension without losing ANY progress (You wont even lose your Dark Matter!)',
    cost: 20
  },
  antiMatterConverter: {
    name: 'Anti Matter Converter',
    info: 'Convert Frost Crystals to Anti Matter in a 1:1 ratio',
    cost: 1
  }
}

function generateStore() {
  for(key in Game.Store) {
    let item = Game.Store[key];

    let content = `
      <div class='item' id='${key}' onclick='buyStore("${key}")'>
        <img src='img/store/${key}.png' id='${key}Img'/>
        <div class='tooltip item-tooltip'>
          <div class='tooltip-content fgrey'>
            <span class='fwhite'>${item.name}</span><hr/>
            Cost: <span class='fwhite f16' id='${key}Cost'></span> <img class='imgFix' src='img/inv/frostCrystal16.png'/><hr/>
            <span class='f10'>${item.info}</span>
          </div>
        </div>
      </div>
    `;

    elem('storeItems').innerHTML += content;
  }
}

function buyStore(key) {
  if(key === 'advancedMicroverseAscension') {
    let item = Game.Store[key];

    if(Game.Inventory.frostCrystal.amount < item.cost) {
      return;
    } else {
      Game.Inventory.frostCrystal.amount -= 20;
      Game.Inventory.concentratedDarkMatter.amount += Game.Inventory.darkMatter.amount;
      elem('frostCrystalAmount').innerHTML = Game.Inventory.frostCrystal.amount;
      save('frostCrystalAmount', Game.Inventory.frostCrystal.amount);
      elem('concentratedDarkMatterAmount').innerHTML = Game.Inventory.concentratedDarkMatter.amount;
      save('concentratedDarkMatterAmount', Game.Inventory.concentratedDarkMatter.amount);
      updateDamage();
    }
  }

  if(key === 'antiMatterConverter') {
    let item = Game.Store[key];

    if(Game.Inventory.frostCrystal.amount < item.cost) {
      return;
    } else {
      Game.Inventory.frostCrystal.amount -= 1;
      Game.Inventory.antiMatter.amount += 1;
      elem('frostCrystalAmount').innerHTML = Game.Inventory.frostCrystal.amount;
      save('frostCrystalAmount', Game.Inventory.frostCrystal.amount);
      elem('antiMatterAmount').innerHTML = Game.Inventory.antiMatter.amount;
      save('antiMatterAmount', Game.Inventory.antiMatter.amount);
    }
  }
}

function updateStore() {
  for(key in Game.Store) {
    let item = Game.Store[key];

    elem(key + 'Cost').innerHTML = item.cost;
  }
}
