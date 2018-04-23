/*===========================================================
=         Ores                                              =
===========================================================*/
Game.Ores = {
  titanium: {
    name: 'Titanium',
    ascendId: 'earth',
    lv: 1,
    prog: 0,
    hp: 10,
    baseHp: 10,
    maxHp: 0,
    hpPerLv: 1.03,
    armor: 0,
    armorPerLv: 1.0,
    antiMatterRate: 50,
    darkMatterRate: 20,
    rewarded: false
  },
  plutonium: {
    name: 'Plutonium',
    ascendId: 'grudnock',
    lv: 1,
    prog: 0,
    hp: 0,
    baseHp: 50e6,
    maxHp: 0,
    hpPerLv: 1.035,
    armor: 10000,
    armorPerLv: 1.01,
    antiMatterRate: 55,
    darkMatterRate: 25,
    rewarded: false
  },
  chrysonite: {
    name: 'Chrysonite',
    ascendId: 'tetherus',
    lv: 1,
    prog: 0,
    hp: 1e6,
    baseHp: 1e6,
    maxHp: 0,
    hpPerLv: 1.04,
    armor: 10000,
    armorPerLv: 1.02,
    antiMatterRate: 60,
    darkMatterRate: 14,
    rewarded: false
  },
  armadium: {
    name: 'Armadium',
    ascendId: 'gazorpazorp',
    lv: 1,
    prog: 0,
    hp: 1e12,
    baseHp: 1e12,
    maxHp: 0,
    hpPerLv: 1.045,
    armor: 1e6,
    armorPerLv: 1.03,
    antiMatterRate: 65,
    darkMatterRate: 16,
    rewarded: false
  },
  solanium: {
    name: 'Solanium',
    ascendId: 'xeln',
    lv: 1,
    prog: 0,
    hp: 1e12,
    baseHp: 1e12,
    maxHp: 0,
    hpPerLv: 1.05,
    armor: 1e6,
    armorPerLv: 1.04,
    antiMatterRate: 70,
    darkMatterRate: 18,
    rewarded: false
  },
  singularity: {
    name: 'Singularity',
    ascendId: 'blackhole',
    lv: 1,
    prog: 0,
    hp: 1e12,
    baseHp: 1e12,
    maxHp: 0,
    hpPerLv: 1.055,
    armor: 1e6,
    armorPerLv: 1.05,
    antiMatterRate: 75,
    darkMatterRate: 20,
    rewarded: false
  }
}
/*===========================================================
=         Generate Hp Bar                                   =
===========================================================*/
function generateHpBar() {
  let html = `
    <div class='ore-lv ore-num'>
      Lv <span class='fwhite f16' id='oreLv'></span>
    </div>
    <div class='ore-hp ore-num'>
      <span class='fwhite f16' id='oreHp'></span> Hp
    </div>
    <div class='hp-bar'>
      <div class='hp-progress' id='oreHpBar'></div>
    </div>
    <div class='zone-bar'>
      <div class='zone-progress' id='oreProgBar'></div>
    </div>
  `;

  elem('oreContent').insertAdjacentHTML('beforeend', html);
}
/*===========================================================
=         Update Health Bar                                 =
===========================================================*/
function healthBar(key) {
  let item = Game.Ores[key];
  let width = item.hp * 100 / item.maxHp;

  elem('oreHpBar').style.width = `${width}%`;
  elem('oreHp').innerHTML = nFormat(item.hp);
}
/*===========================================================
=         Update Progress Bar                               =
===========================================================*/
function oreProgressBar(key) {
  let item = Game.Ores[key];
  let width = item.prog * 10;

  elem('oreProgBar').style.width = `${width}%`;
  elem('oreProgress').innerHTML = `${item.prog} / 10`;
}
/*===========================================================
=         Update Ore Stats                                  =
===========================================================*/
function updateOreStats(key) {
  let item = Game.Ores[key];
  let char = Game.Character;
  let oreMaxHp = Math.floor(item.baseHp * Math.pow(item.hpPerLv, item.lv));
  let effArmor = item.armor - (item.armor / 100 * char.armorPen);

  item.maxHp = oreMaxHp;

  healthBar(key);
  oreProgressBar(key);

  elem('oreName').innerHTML = item.name;
  elem('oreLv').innerHTML = item.lv;
  elem('oreMaxHp').innerHTML = nFormat(item.maxHp);
  elem('oreHpPerLv').innerHTML = `+ ${(item.hpPerLv * 100) - 100}`;
  elem('oreArmor').innerHTML = nFormat(item.armor);
  elem('oreArmorPerLv').innerHTML = `+ ${(item.armorPerLv * 100) - 100}`;
  elem('effectiveArmor').innerHTML = nFormat(effArmor);
  elem('antiMatterDropRate').innerHTML = `${item.antiMatterRate}%`;
  elem('darkMatterDropRate').innerHTML = `${item.darkMatterRate}%`;
}
