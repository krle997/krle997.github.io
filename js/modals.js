Game.Modals = {
  characterModal: {
    name: 'Character',
    content: `
      <div class='character-modal'>
        <div class='microverse fgrey'>
          <p class='fwhite'>The Microverse Ascension</p>
          This technology allows us to create new universes like ours, and explore them.
          Transitioning inside a new universe destroys all upgrades, crafted items,
          progression, and inventory (excluding Anti Matter and Frost Crystals).
          Aditionaly, your Dark Matter gets converted into Concentrated Dark Matter.
          Each increases your Damage Increment by 1%.<br>
          <span class='fred'>Are you sure you want to proceed?</span>
          <div class='modal-btn' onclick='microverseAscension()'>Let's do it!</div>
        </div>
        <div class='totals fgrey'>
          Time Played: <span id='timePlayed'></span><hr/>
          Total Clicks: <span class='fwhite f16' id='clicksTotal'></span><br/>
          Total Critical Hits: <span class='fwhite f16' id='critHitsTotal'></span><br/>
          Total Titanium mined: <span class='fwhite f16' id='titaniumTotal'></span><br/>
          Total Plutonium mined: <span class='fwhite f16' id='plutoniumTotal'></span><br/>
          Total Chrysonite mined: <span class='fwhite f16' id='chrysoniteTotal'></span><br/>
          Total Armadium mined: <span class='fwhite f16' id='armadiumTotal'></span><br/>
          Total Solanium mined: <span class='fwhite f16' id='solaniumTotal'></span><br/>
          Total Hawking Radiation mined: <span class='fwhite f16' id='hawkingradiationTotal'></span><br/>
          Total Anti Matter collected: <span class='fwhite f16' id='antiMatterTotal'></span><br/>
          Total Frost Crystal collected: <span class='fwhite f16' id='frostCrystalTotal'></span>
        </div>
      </div>
      <div class='modal-btn' onclick='closeModal("character")'>Close</div>
    `
  },
  achievementsModal: {
    name: 'Achievements',
    content: `
      <div class='masteries-wrapper' id='achBoxes'></div>
      <div class='modal-btn' onclick='closeModal("achievements")'>Close</div>
    `
  },
  masteriesModal: {
    name: 'Masteries',
    content: `
      <div class='masteries-wrapper' id='masteryItems'></div>
      <div class='modal-btn' onclick='closeModal("masteries")'>Close</div>
    `
  },
  settingsModal: {
    name: `Settings`,
    content: `
      <div class='miner-container'>
        <p class='fwhite'>Game</p>
        <div class='modal-btn' onclick='muteSounds()'>Sounds: <span class='fblue' id='sounds'></span></div>
        <div class='modal-btn' onclick='changeFps()'>FPS: <span class='fblue' id='fps'></span></div>
      </div>
      <div class='modal-btn' onclick='closeModal("settings")'>Close</div>
    `
  },
  changelogModal: {
    name: 'Changelog',
    content: `
      <ul class="fgrey">
        <p class="fblue">No Mans Click v1.0.0 EXPERIMENTAL</p>
        <li><span class="fwhite">First Release</span></li>
        <p class="fred">Known issues</p>
        <li>Masteries are currently not working as they are still in developement.</li>
        <p class="forange">This is a first experimental release. The game is not yet finished,
        but it's in a playable state. I will micropatch the game almost every day and
        constantly work on improving the design and the gameplay. You might lose some
        progress until the BETA, but the way the game is coded you will never lose all progress</p>
        <p class='fblue'>v1.0.1 EXPERIMENTAL</p>
        <li><span class="fwhite">Added</span> Store for Frost Crystals. More items are to come</li>
        <li><span class="fwhite">Added</span> some Achievements. More are to come</li><br>
        <li><span class="fgreen">Fixed</span> a bug where Microverse Ascension would freeze the game</li>
        <li><span class="fgreen">Fixed</span> a bug where Ascensions wouldn't automatically be unlocked if criteria was met</li>
        <li><span class="fgreen">Fixed</span> a bug that always allowed users to craft, resulting in negative Anti Matter</li><br>
        <li><span class='forange'>Updated</span> Tooltip UI for many items</li>
        <li><span class='forange'>Updated</span> Miner UI, it will never prompt the optin, unless you chose to mine</li>
        <p class='fblue'>v1.0.2 EXPERIMENTAL</p>
        <li><span class="fwhite">Added</span> some sound effects. More are to come</li>
        <li><span class="fwhite">Added</span> Frost Crystal spawns, just like Anti Matter</li><br>
        <li><span class="fgreen">Fixed</span> a bug where ascending back and forth would earn you free resources and XP</li>
        <li><span class="fgreen">Fixed</span> character total stats not being displayed properly</li>
        <li><span class="fgreen">Fixed</span> a bug which displayed endless decimals on Frost Crystals</li><br>
        <li><span class='forange'>Updated</span> Modal UI. Modals should now appear more clear</li>
        <li><span class='forange'>Updated</span> the time it takes for ore to spawn to .5s (from 1s)</li>
        <li><i class='fgrey'>+ Performance Optimizations</i></li>
      </ul>
      <div class='modal-btn' onclick='closeModal("changelog")'>Close</div>
    `
  },
  wikiModal: {
    name: 'Wiki',
    content: `
      <span class='fgrey'>
        <span class='fblue f16'>Gameplay Core</span><hr/>
        Click on the ore to mine it. When the ore breaks, you will receive some experience points,
        resources, and theres also a small chance of receiving some Dark Matter.<br/>
        <span class='fblue f16'>Upgrades</span><hr/>
        Buy upgrades with resources that you mine to increase DPS. Upgrades will be your main source
        of damage so make sure to frequently buy them. Upgrades also have their damage per
        second increased by 100% every 20 levels.<br/>
        <span class='fblue f16'>Crafting</span><hr/>
        Craft powerful perks with Anti Matter that you collect to temporarily increase your damage.
        Crafted items last for a limited time, and always scale off your total Upgrade Lvs.<br/>
        <span class='fblue f16'>Masteries</span><hr/>
        Every time you level up you will receive one random Mastery Lv. Masteries are permanent,
        and each grants a unique bonus to help you progress further. They are split into four
        categories: Common, Rare, Epic and Legendary. Epic may give greater bonuses than Commons,
        but Commons stack up to 8 Lvs, whereas Epic only go to 3.<br>
        <span class='fblue f16'>Ascensions</span><hr/>
        Acquiring a certaing amount of Dark Matter allows you to visit other planets, and mine
        other resources. Each planet unlocks 3 new upgrades, and 1 new craft item.<br>
        <span class='forange f16'>Wikipedia will be updated constantly</span><br>
        <div class='modal-btn' onclick='closeModal("wiki")'>Close</div>
      </span>
    `
  },
  donateModal: {
    name: 'Donate',
    content: `
      <div class='character-modal'>
        <div class='microverse fgrey'>
          <p>You can directly support me by donating your processor power.
          You will be mining <a href='https://getmonero.org/'>Monero</a> on the blockchain
          for me while you play, and be rewarded some <span class='fblue'>Frost Crystals</span>
          in return. You can spend them in the store. You can choose how much cores and power you
          want to use when mining. Generaly everything below 2 Cores 30% is OK, but going above might
          cause your game, and even PC to lag</p>
          Total Hashes: <span class='fwhite f16' id='totalHashes'></span><br>
          Total speed: <span class='fwhite f16' id='hashes'></span> Hs/s<br></span>
          <div class='modal-btn' onclick='minerUtilBtn()'>Utilization: <span class='fblue' id='util'>50%</span></div>
          <div class='modal-btn' onclick='minerCoresBtn()'>Cores: <span class='fblue' id='cores'>1</span></div>
          <div class='modal-btn' onclick='minerBtn()'><span id='minerBtn'>Start</span></div>
        </div>
        <div class='totals fgrey'>
          <p>You can also donate any crypto-currency listed below. Just click on the image
          to get the crypto address copied to your clipboard!</p>

          <div class='donate-wrapper'>
            <div class='donate-img'>
              <img src='img/donate/bitcoin.png' onclick='setClipboard("1PMTd3ZXwZNBVynUErSxNgYReeLePKMumz")'/>
            </div>
            <div class='donate-img'>
              <img src='img/donate/ethereum.png' onclick='setClipboard("0xF83888B5E136BA8a85356bD4B2F302B1570F78EB")'/>
            </div>
            <div class='donate-img'>
              <img src='img/donate/litecoin.png' onclick='setClipboard("LdHiktKyw8JmQZaw1Kn7Cvm9hsQmjbrz3o")'/>
            </div>
            <div class='donate-img'>
              <img src='img/donate/dash.png' onclick='setClipboard("XiTFStfgr1mLyrshAP6GGjSqaDdnK2Ynwk")'/>
            </div>
            <div class='donate-img'>
              <img src='img/donate/ethereumClassic.png' onclick='setClipboard("0xfaD02f6A4d6188B9BC877C7D344743CF5C5f160E")'/>
            </div>
            <div class='donate-img'>
              <img src='img/donate/decred.png' onclick='setClipboard("DsbRFuGeqnjZLmB7LN74VoVnc53Xbb8s5Yj")'/>
            </div>
          </div>
        </div>
      </div>
      <div class='modal-btn' onclick='closeModal("donate")'>Close</div>
    `
  }
}

function generateModals() {
  for(key in Game.Modals) {
    let item = Game.Modals[key];

    let modal = `
      <div class="modal" id="${key}">
        <div class="modal-panel">
          <div class='modal-header'>${item.name}</div>
          <div class="modal-content">${item.content}</div>
        </div>
      </div>
    `;

    elem('modalContainer').innerHTML += modal;
  }
}
