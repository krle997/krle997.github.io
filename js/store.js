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
  let item = Game.Store[key];
  let inv = Game.Inventory;

  if(key === 'advancedMicroverseAscension') {
    if(inv.frostCrystal.amount < item.cost) {
      return;
    } else {
      inv.frostCrystal.amount -= 20;
      inv.concentratedDarkMatter.amount += inv.darkMatter.amount;
      elem('frostCrystalAmount').innerHTML = inv.frostCrystal.amount.toFixed(3);
      save('frostCrystalAmount', inv.frostCrystal.amount);
      elem('concentratedDarkMatterAmount').innerHTML = nFormat(inv.concentratedDarkMatter.amount);
      save('concentratedDarkMatterAmount', inv.concentratedDarkMatter.amount);
      updateDamage();
    }
  }

  if(key === 'antiMatterConverter') {
    if(inv.frostCrystal.amount < item.cost) {
      return;
    } else {
      inv.frostCrystal.amount -= 1;
      inv.antiMatter.amount += 1;
      Game.Account.character.total.antiMatter += 1;
      elem('frostCrystalAmount').innerHTML = inv.frostCrystal.amount.toFixed(3);
      elem('antiMatterAmount').innerHTML = nFormat(inv.antiMatter.amount);
      elem('antiMatterTotal').innerHTML = nFormat(inv.antiMatter.amount);

      save('frostCrystalAmount', inv.frostCrystal.amount);
      save('antiMatterAmount', inv.antiMatter.amount);
      save('antiMatterTotal', Game.Account.character.total.antiMatter);
    }
  }
}

function updateStore() {
  for(key in Game.Store) {
    let item = Game.Store[key];

    elem(key + 'Cost').innerHTML = item.cost;
  }
}
