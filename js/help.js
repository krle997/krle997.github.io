Game.Help = {
  account: {
    name: 'Account',
    info: `
      On the account tab you can track your every progress, conduct microverse
      ascensions, view masteries and achievements, and change game settings
    `,
    tooltipType: 'panel-tooltip-left'
  },
  donate: {
    name: 'Donate',
    info: `
      I will never display ads or make the game pay to win to generate revenue...
      Every donation is greatly appreciated. Thank you!
    `,
    tooltipType: 'panel-tooltip-left'
  },
  damage: {
    name: 'Damage',
    info: `Do you really need an explanation for this...`,
    tooltipType: 'panel-tooltip-left'
  },
  inventory: {
    name: 'Inventory',
    info: `
      All the loot that you have collected is displayed here - some can be spent
      on upgrades or crafting, others can't be spent but provide core
      fundamentals for game progression
    `,
    tooltipType: 'panel-tooltip-left'
  },
  healthBar: {
    name: 'Ore Stats',
    info: `
      Track your progress, see how far you've come and how each Ore scales
    `,
    tooltipType: 'panel-tooltip-left'
  },
  upgrades: {
    name: 'Upgrades',
    info: `
      Acumulate <span class='fgreen'>resources</span> to buy upgrades and
      increase your DPS. Each upgrade has its individual DPS doubled every 20 Lvs
    `,
    tooltipType: 'panel-tooltip-right'
  },
  crafting: {
    name: 'Crafting',
    info: `
      Acumulate <span class='fblue'>Anti Matter</span> to craft various perks,
      and temporarily boost your stats. Crafted items only last for a limited
      amount of time, but offer strong, scaling power-ups
    `,
    tooltipType: 'panel-tooltip-right'
  },
  ascend: {
    name: 'Ascend',
    info: `
      Acumulate <span class='fpurple'>Dark Matter</span> to unlock new ascensions
      Unlocking new ascension also unlocks 3 new upgrades and 1 new crafting
      item. Each ascension has a unique mineable ore
    `,
    tooltipType: 'panel-tooltip-right'
  }
}

function generateHelp() {
  for(key in Game.Help) {
    let item = Game.Help[key];
    let content = `
      <div class='header-name fcenter fgrey'>${item.name}</div>
      <div class='tooltip ${item.tooltipType} fgrey'>
        <div class='tooltip-content'>
          ${item.info}
        </div>
      </div>
    `
    elem(key + 'Header').insertAdjacentHTML('beforeend', content);
  }
}
