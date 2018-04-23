Game.Modals = {
  character: {
    name: 'Character',
    content: `
      <div class='character-modal'>
        <div class='microverse'>
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
				Total Frost Crystal: <span class='fwhite f16' id='frostCrystalTotal'></span>
      </div>
      <div class='modal-btn fcenter' onclick='closeModal("character")'>Close</div>
    `
  },
  achievements: {
    name: 'Achievements',
    content: `
      <div class='modal-content nine-per-row' id='achievementItems'></div>
      <div class='modal-btn fcenter' onclick='closeModal("achievements")'>Close</div>
    `
  },
  masteries: {
    name: 'Masteries',
    content: `
      <div class='modal-content nine-per-row' id='masteryItems'></div>
      <div class='modal-btn fcenter' onclick='closeModal("masteries")'>Close</div>
    `
  }
}

function generateModals() {
  for(key in Game.Modals) {
    let item = Game.Modals[key];

    let content = `
      <div class='modal-area' id='${key}Modal'>
        <div class='modal-panel'>
          <div class='modal-header fwhite fcenter'>
            ${item.name}
          </div>
          ${item.content}
        </div>
      </div>
    `;

    elem('modalContainer').insertAdjacentHTML('beforeend', content);
  }
}
