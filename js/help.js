
Game.Help = {
  account: {
    name: 'Account',
    info: `
      On the account tab you can track your every progress, conduct microverse
      ascensions, view masteries and achievements, and change game settings
    `,
    tooltip: 'panel-tooltip-left'
  },
  donate: {
    name: 'Donate',
    info: `
      I will never display ads or make the game pay to win to generate revenue...
      Every donation is greatly appreciated. Thank you!
    `,
    tooltip: 'panel-tooltip-left'
  },
  damage: {
    name: 'Damage',
    info: `Do you really need an explanation for this...`,
    tooltip: 'panel-tooltip-left'
  },
  inventory: {
    name: 'Inventory',
    info: `
      All the loot that you have collected is displayed here - some can be spent
      on upgrades or crafting, others can't be spent but provide core
      fundamentals for game progression
    `,
    tooltip: 'panel-tooltip-left'
  },
  ore: {
    name: `<span id='oreName'></span>`,
    info: `
      Zone: <span class='fwhite f16' id='oreProgress'></span><br>
      Total Hp: <span class='fwhite f16' id='oreMaxHp'></span><br>
      Armor: <span class='fwhite f16' id='oreArmor'></span>
      (Eff: <span class='fwhite f16' id='effectiveArmor'></span>)<hr>
      Total Hp / Lv: <span class='fwhite f16' id='oreHpPerLv'></span><br>
      Armor / Lv: <span class='fwhite f16' id='oreArmorPerLv'></span><br>
      Xp / Zone: <span class='fwhite f16'>+ 1</span><br>
      <img class='imgFix' src='img/inv/antiMatter16.png'> Drop Rate / Lv: <span class='fwhite f16' id='antiMatterDropRate'></span><br>
      <img class='imgFix' src='img/inv/darkMatter16.png'> Drop Rate / Lv: <span class='fwhite f16' id='darkMatterDropRate'></span>
    `,
    tooltip: 'ore-tooltip'
  },
  upgrades: {
    name: 'Upgrades',
    info: `
      Mine <span class='fgreen'>resources</span> to buy upgrades and increase
      your DPS. Each upgrade has its individual DPS doubled every 20 Lvs. Use
      commands below to change buying parameters<hr>
      <img class='imgFix' src='img/kbd/z.png'> - Buy <span class='fwhite f16'>x1 Lvs</span><br>
      <img class='imgFix' src='img/kbd/x.png'> - Buy <span class='fwhite f16'>x10 Lvs</span><br>
      <img class='imgFix' src='img/kbd/c.png'> - Buy <span class='fwhite f16'>x100 Lvs</span><br>
    `,
    tooltip: 'panel-tooltip-right'
  },
  crafting: {
    name: 'Crafting',
    info: `
      Acumulate <span class='fblue'>Anti Matter</span> to craft various perks,
      and temporarily boost your stats. Crafted items only last for a limited
      amount of time, but offer strong, scaling power-ups
    `,
    tooltip: 'panel-tooltip-right'
  },
  ascend: {
    name: 'Ascend',
    info: `
      Acumulate <span class='fpurple'>Dark Matter</span> to unlock new ascensions
      Unlocking new ascension also unlocks 3 new upgrades and 1 new crafting
      item. Each ascension has a unique mineable ore
    `,
    tooltip: 'panel-tooltip-right'
  }
}

function generateHelp() {
  for(key in Game.Help) {
    let item = Game.Help[key];

    let content = `
      <div class='fcenter'>${item.name}</div>
      <div class='tooltip ${item.tooltip} fgrey'>
        <div class='tooltip-content'>
          ${item.info}
        </div>
      </div>
    `;

    elem(`${key}Header`).insertAdjacentHTML('beforeend', content);
  }
}
