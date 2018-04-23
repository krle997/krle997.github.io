/*===========================================================
=					Inventory																					=
===========================================================*/
Game.Inventory = {
	titanium: {
		name: 'Titanium',
		info: `
			<span class='fgreen'>Titanium</span> is a powerful oxide. It can be
			obtained on planet Earth
		`,
		amount: 0
	},
	plutonium: {
		name: 'Plutonium',
		info: `
			<span class='fgreen'>Plutonium</span> is a powerful isotope. It can be
			mined on planet Grudnock
		`,
		amount: 0
	},
	chrysonite: {
		name: 'Chrysonite',
		info: `
			<span class='fgreen'>Chrysonite</span> is a powerful silicate. It can
			be mined on planet Tetherus
		`,
		amount: 0
	},
	armadium: {
		name: 'Armadium',
		info: `
			<span class='fgreen'>Armadium</span> is an exotic element. It can be mined
			on planet Gazorpazorp
		`,
		amount: 0
	},
	solanium: {
		name: 'Solanium',
		info: `
			<span class='fgreen'>Solanium</span> is an exotic element. It can be
			mined on planet Xeln
		`,
		amount: 0
	},
	singularity: {
		name: 'Hawking Radiation',
		info: `
			<span class='fgreen'>Hawking Radiation</span> holds secrets burried
			throughout billions of Black Holes existence. It can be mined in a Black
			Hole
		`,
		amount: 0
	},
	antiMatter: {
		name: `Anti Matter`,
		info: `
			Collect <span class='fblue'>Anti Matter</span> to craft various items and
			boost your progress
		`,
		amount: 0
	},
	frostCrystal: {
		name: `Frost Crystal`,
		info: `
			Collect <span class='fblue'>Frost Crystals</span> to craft special items
			during <span class='fwhite'>multiplayer</span> events (Multiplayer is yet
			to be scripted)
		`,
		amount: 0
	},
	darkMatter: {
		name: `Dark Matter`,
		info: `
			<span class='fpurple'>Dark Matter</span> is a very powerful element. It can
			bend space-time, alowing you to travel to distant planets faster than the
			speed of light
		`,
		amount: 0
	},
	concentratedDarkMatter: {
		name: 'Concentrated Dark Matter',
		info: `
			<span class='forange'>Concentrated Dark Matter</span> is a mythical
			element. It can manipulate timeflow itself
		`,
		amount: 0
	}
}
/*===========================================================
=					Generate Inventory																=
===========================================================*/
function generateInventory() {
	for(key in Game.Inventory) {
    let item = Game.Inventory[key];

		let html = `
			<div class='hidden' id='${key}'>
				<div class='stat-img'>
					<img src='img/inv/${key}.png'>
				</div>
				<div class='stat-num fcenter fgrey'>
					<div id='${key}Amount'></div>
				</div>
				<div class='tooltip stat-tooltip'>
					<div class='tooltip-header fcenter fwhite'>
						${item.name}
					</div>
					<div class='tooltip-content fgrey'>
						${item.info}
					</div>
				</div>
			</div>
		`;

		elem('inventoryStats').insertAdjacentHTML('beforeend', html);
	}
}
/*===========================================================
=					Unlock Inventory																	=
===========================================================*/
function unlockInventory(key) {
  elem(key).className = 'stat';
}
/*===========================================================
=					Lock Inventory																		=
===========================================================*/
function lockInventory() {
  for(key in Game.Inventory) {
		elem(key).className = 'hidden';
	}
}
/*===========================================================
=					Update Inventory																	=
===========================================================*/
function updateInventory() {
	let inv = Game.Inventory;

	if(inv.concentratedDarkMatter.amount >= 0)
		unlockInventory('concentratedDarkMatter');

  for(key in Game.Inventory) {
		let item = Game.Inventory[key];

    elem(`${key}Amount`).innerHTML = nFormat(item.amount);
  }
}
