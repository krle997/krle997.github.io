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
      <div class='zone-progress' id='oreProgressBar'></div>
    </div>
    <div class='tooltip ore-tooltip fgrey'>
      <div class='tooltip-content'>
        Progress: <span class='fwhite f16' id='oreProgress'></span><br>
        Ore Max Hp: <span class='fwhite f16' id='oreMaxHp'></span><br>
        Ore Armor: <span class='fwhite f16' id='oreArmor'></span><br>
        Effective Armor: <span class='fwhite f16' id='effectiveArmor'></span><hr>
        Drop rates per Lv:<br>
        <span class='fblue'>Anti Matter</span> <img src='img/inv/antiMatter16.png' class='imgFix'> <span class='fwhite f16' id='antiMatterDropRate'></span><br>
        <span class='fpurple'>Dark Matter</span> <img src='img/inv/darkMatter16.png' class='imgFix'> <span class='fwhite f16' id='darkMatterDropRate'></span>
      </div>
    </div>
  `;

  elem('oreContent').insertAdjacentHTML('beforeend', content);
}
/*===========================================================
=         Update Ore Stats                                  =
===========================================================*/
function updateOreStats(key) {
  let item = Game.Ascensions[key];
  let ore = item.ore;
  let acc = Game.Account;

  let oreMaxHp = Math.floor(ore.baseHp * Math.pow(1.03, ore.lv));
  ore.maxHp = oreMaxHp;

  let effArmor = ore.armor - (ore.armor / 100 * acc.character.stats.armorPen);

  elem('oreLv').innerHTML = ore.lv;
  elem('oreArmor').innerHTML = nFormat(ore.armor);
  elem('effectiveArmor').innerHTML = nFormat(effArmor);
  elem('oreMaxHp').innerHTML = nFormat(ore.maxHp);
  elem('antiMatterDropRate').innerHTML = ore.antiMatterRate + '%';
  elem('darkMatterDropRate').innerHTML = ore.darkMatterRate + '%';
}
