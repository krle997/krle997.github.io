Game.Help = {
  account: {
    name: 'Account',
    info: `
      Here you can keep track of everything that you've accomplished so far.
      There is no particular goal in <span class='fblue'>No Man's Click</span>;
      it's up to you to decide how you want to play this game, and how far you
      are willing to go
    `,
    tooltip: 'panel-tooltip-left'
  },
  donate: {
    name: 'Donate',
    info: `
      I will never display ads or make the game pay to win to generate revenue.
      I'm going to be relying on the good will of other people to do so. Every
      donation will be greatly appreciated. Thank you!
    `,
    tooltip: 'panel-tooltip-left'
  },
  damage: {
    name: 'Damage',
    info: 'Do you really need an explanation for this? Really?',
    tooltip: 'panel-tooltip-left'
  },
  inventory: {
    name: 'Inventory',
    info: `
      All that you have collected and saved up so far is being displayed here -
      some of these can be spent for various Upgrades, or for Crafting. Others
      can't be spent but provide strong passive benefits, and are fundamentals
      for further advancement
    `,
    tooltip: 'panel-tooltip-left'
  },
  ore: {
    name: `<span id='oreName'></span>`,
    info: `
      Zone : <span class='fwhite f16' id='oreProgress'></span><br>
      Total Hp : <span class='fwhite f16' id='oreMaxHp'></span><br>
      Armor : <span class='fwhite f16' id='oreArmor'></span>
      (Eff : <span class='fwhite f16' id='effectiveArmor'></span>)<hr>
      Total Hp / Lv : <span class='fwhite f16' id='oreHpPerLv'></span><br>
      Armor / Lv : <span class='fwhite f16' id='oreArmorPerLv'></span><br>
      Xp / Zone : <span class='fwhite f16'>+ 1</span><br>
      <img class='imgFix' src='img/inv/antiMatter16.png'> Drop Rate / Lv : <span class='fwhite f16' id='antiMatterDropRate'></span><br>
      <img class='imgFix' src='img/inv/darkMatter16.png'> Drop Rate / Lv : <span class='fwhite f16' id='darkMatterDropRate'></span>
    `,
    tooltip: 'ore-tooltip'
  },
  upgrades: {
    name: 'Upgrades',
    info: `
      Collect <span class='fgreen'>resources</span> so you can buy various
      <span class='fwhite'>Upgrades</span> and increase your
      <span class='fwhite'>DPS</span>. Each <span class='fwhite'>Upgrade</span>
      has their individual <span class='fwhite'>DPS</span> doubled every
      <span class='fwhite'>20</span> Lvs<hr>
      <img class='img-mid' id='kbdZ' src='img/kbd/z.png'> Buy <span class='fwhite f16'>x 1</span> Lv<br>
      <img class='img-mid' id='kbdX' src='img/kbd/x.png'> Buy <span class='fwhite f16'>x 20</span> Lvs<br>
      <img class='img-mid' id='kbdC' src='img/kbd/c.png'> Buy <span class='fwhite f16'>x 100</span> Lvs
    `,
    tooltip: 'panel-tooltip-right'
  },
  crafting: {
    name: 'Crafting',
    info: `
      Find <span class='fblue'>Anti Matter</span> to Craft items,
      and speed up your progression. Crafted items only last for a limited
      amount of time, but offer strong, scaling bonuses
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

    let html = `
      <div class='fcenter'>${item.name}</div>
      <div class='tooltip ${item.tooltip}'>
        <div class='tooltip-content fgrey'>
          ${item.info}
        </div>
      </div>
    `;

    elem(`${key}Header`).insertAdjacentHTML('beforeend', html);
  }

  console.log(elem(`${key}Header`));
}
