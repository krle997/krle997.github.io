Game.Modals = {
  characterModal: {
    name: 'Character',
    modalType: '',
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
          <div class='modal-btn' onclick='muteSounds()'>Sounds: <span class='fblue' id='sounds'></span></div>
          <div class='modal-btn' onclick='changeFps()'>FPS: <span class='fblue' id='fps'></span></div>
          <div class='modal-btn' onclick='microverseAscension()'>Let's do it!</div>
        </div>
        Total Titanium: <span class='fwhite f16' id='titaniumTotal'></span><br/>
				Total Plutonium: <span class='fwhite f16' id='plutoniumTotal'></span><br/>
				Total Chrysonite: <span class='fwhite f16' id='chrysoniteTotal'></span><br/>
				Total Armadium: <span class='fwhite f16' id='armadiumTotal'></span><br/>
				Total Solanium: <span class='fwhite f16' id='solaniumTotal'></span><br/>
				Total Singularity: <span class='fwhite f16' id='singularityTotal'></span><br/>
				Total Anti Matter: <span class='fwhite f16' id='antiMatterTotal'></span><br/>
				Total Frost Crystal: <span class='fwhite f16' id='frostCrystalTotal'></span>
      </div>
      <div class='modal-btn fgrey' onclick='closeModal("character")'>Close</div>
    `
  },
  achievementsModal: {
    name: 'Achievements',
    modalType: '',
    content: `
      <div class='modal-content achievement-modal' id='achBoxes'></div>
      <div class='modal-btn fgrey' onclick='closeModal("achievements")'>Close</div>
    `
  },
  masteriesModal: {
    name: 'Masteries',
    modalType: '',
    content: `
      <div class='modal-content achievement-modal' id='masteryItems'></div>
      <div class='modal-btn fgrey' onclick='closeModal("masteries")'>Close</div>
    `
  }
}

function generateModals() {
  for(key in Game.Modals) {
    let item = Game.Modals[key];

    let content = `
      <div class='modal' id='${key}'>
        <div class='modal-panel'>
          <div class='modal-header fgrey'>${item.name}</div>
          ${item.content}
        </div>
      </div>
    `;

    elem('modalContainer').insertAdjacentHTML('beforeend', content);
  }
}
