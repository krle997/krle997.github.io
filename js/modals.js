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
        Total Titanium: <span class='fwhite f16' id='titaniumTotal'></span><br/>
				Total Plutonium: <span class='fwhite f16' id='plutoniumTotal'></span><br/>
				Total Chrysonite: <span class='fwhite f16' id='chrysoniteTotal'></span><br/>
				Total Armadium: <span class='fwhite f16' id='armadiumTotal'></span><br/>
				Total Solanium: <span class='fwhite f16' id='solaniumTotal'></span><br/>
				Total Singularity: <span class='fwhite f16' id='hawkingradiationTotal'></span><br/>
				Total Anti Matter: <span class='fwhite f16' id='antiMatterTotal'></span><br/>
				Total Frost Crystal: <span class='fwhite f16' id='frostCrystalTotal'></span>
      </div>
      <div class='modal-btn fgrey' onclick='closeModal("character")'>Close</div>
    `
  },
  achievementsModal: {
    name: 'Achievements',
    content: `
      <div class='masteries-wrapper' id='achBoxes'></div>
      <div class='modal-btn fgrey' onclick='closeModal("achievements")'>Close</div>
    `
  },
  masteriesModal: {
    name: 'Masteries',
    content: `
      <div class='masteries-wrapper' id='masteryItems'></div>
      <div class='modal-btn fgrey' onclick='closeModal("masteries")'>Close</div>
    `
  },
  settingsModal: {
    name: `Settings`,
    content: `
        <p class='fwhite'>Game</p>
        <div class='modal-btn' onclick='muteSounds()'>Sounds: <span class='fblue' id='sounds'></span></div>
        <div class='modal-btn' onclick='changeFps()'>FPS: <span class='fblue' id='fps'></span></div>
      <div class='modal-btn fgrey' onclick='closeModal("settings")'>Close</div>
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
