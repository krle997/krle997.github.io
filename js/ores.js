/*===========================================================
=         Ores                                              =
===========================================================*/
Game.Ores = {
  titanium: {
    name: 'Titanium',
    lv: 1,
    prog: 0,
    hp: 10,
    baseHp: 10,
    maxHp: 0,
    hpPerLv: 1.03,
    hpScaling: '3%',
    armor: 0,
    armorPerLv: 1.0,
    armorScaling: '0%',
    antiMatterRate: 50,
    darkMatterRate: 20
  },
  plutonium: {
    name: 'Plutonium',
    lv: 1,
    prog: 0,
    hp: 0,
    baseHp: 50e6,
    maxHp: 0,
    hpPerLv: 1.035,
    hpScaling: '3.5%',
    armor: 10000,
    armorPerLv: 1.01,
    armorScaling: '1%',
    antiMatterRate: 55,
    darkMatterRate: 25
  },
  chrysonite: {
    name: 'Chrysonite',
    lv: 1,
    prog: 0,
    hp: 1e6,
    baseHp: 1e6,
    maxHp: 0,
    hpPerLv: 1.04,
    hpScaling: '4%',
    armor: 10000,
    armorPerLv: 1.02,
    armorScaling: '2%',
    antiMatterRate: 60,
    darkMatterRate: 14
  },
  armadium: {
    name: 'Armadium',
    lv: 1,
    prog: 0,
    hp: 1e12,
    baseHp: 1e12,
    maxHp: 0,
    hpPerLv: 1.045,
    hpScaling: '4.5%',
    armor: 1e6,
    armorPerLv: 1.03,
    armorScaling: '3%',
    antiMatterRate: 65,
    darkMatterRate: 16
  },
  solanium: {
    name: 'Solanium',
    lv: 1,
    prog: 0,
    hp: 1e12,
    baseHp: 1e12,
    maxHp: 0,
    hpPerLv: 1.05,
    hpScaling: '5%',
    armor: 1e6,
    armorPerLv: 1.04,
    armorScaling: '4%',
    antiMatterRate: 70,
    darkMatterRate: 18
  },
  singularity: {
    name: 'Singularity',
    lv: 1,
    prog: 0,
    hp: 1e12,
    baseHp: 1e12,
    maxHp: 0,
    hpPerLv: 1.055,
    hpScaling: '5.5%',
    armor: 1e6,
    armorPerLv: 1.05,
    armorScaling: '5%',
    antiMatterRate: 75,
    darkMatterRate: 20
  }
}

function generateHpBar() {
  let content = `
    <div class='ore-lv ore-num fgrey'>
      Lv <span class='fwhite f16' id='oreLv'></span>
    </div>
    <div class='ore-hp ore-num fgrey'>
      <span class='fwhite f16' id='oreHp'></span> Hp
    </div>
    <div class='hp-bar'>
      <div class='hp-progress' id='oreHpBar'></div>
    </div>
    <div class='zone-bar'>
      <div class='zone-progress' id='oreProgBar'></div>
    </div>
  `;

  elem('oreContent').insertAdjacentHTML('beforeend', content);
}
/*===========================================================
=         Update Health Bar                                 =
===========================================================*/
function healthBar(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];

  let width = ore.hp * 100 / ore.maxHp;

  elem('oreHpBar').style.width = `${width}%`;
  elem('oreHp').innerHTML = nFormat(ore.hp);
}
/*===========================================================
=         Update Progress Bar                               =
===========================================================*/
function oreProgressBar(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];

  let width = ore.prog * 10;

  elem('oreProgBar').style.width = width + '%';
  elem('oreProgress').innerHTML = ore.prog + ' / 10';
}
/*===========================================================
=         Reset Ore                                         =
===========================================================*/
function resetOre(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];

  let oreMaxHp = Math.floor(ore.baseHp * Math.pow(ore.hpPerLv, ore.lv));

  ore.hp = oreMaxHp;
  ore.maxHp = oreMaxHp;
  rewarded = false;

  healthBar(key);

  save('rewarded', rewarded);

  elem('oreMaxHp').innerHTML = nFormat(ore.maxHp);
}
/*===========================================================
=         Update Ore Stats                                  =
===========================================================*/
function updateOreStats(key) {
  let item = Game.Ascensions[key];
  let ore = Game.Ores[item.oreId];
  let acc = Game.Account;

  let oreMaxHp = Math.floor(ore.baseHp * Math.pow(ore.hpPerLv, ore.lv));
  ore.maxHp = oreMaxHp;

  let effArmor = ore.armor - (ore.armor / 100 * acc.character.stats.armorPen);

  elem('oreName').innerHTML = ore.name;
  elem('oreLv').innerHTML = ore.lv;
  elem('oreMaxHp').innerHTML = nFormat(ore.maxHp);
  elem('oreHpPerLv').innerHTML = `+ ${ore.hpScaling}`;
  elem('oreArmor').innerHTML = nFormat(ore.armor);
  elem('oreArmorPerLv').innerHTML = `+ ${ore.armorScaling}`;
  elem('effectiveArmor').innerHTML = nFormat(effArmor);
  elem('antiMatterDropRate').innerHTML = `${ore.antiMatterRate}%`;
  elem('darkMatterDropRate').innerHTML = `${ore.darkMatterRate}%`;
}
