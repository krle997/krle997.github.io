/*===========================================================
=					Inventory																					=
===========================================================*/
Game.Inventory = {
	titanium: {
		name: 'Titanium',
		info: `<span class='fgreen'>Titanium</span> is a powerful oxide. It can be obtained on planet Earth`,
		amount: 0
	},
	plutonium: {
		name: 'Plutonium',
		info: `<span class='fgreen'>Plutonium</span> is a powerful isotope. It can be mined on planet Grudnock`,
		amount: 0
	},
	chrysonite: {
		name: 'Chrysonite',
		info: `<span class='fgreen'>Chrysonite</span> is a powerful silicate. It can be mined on planet Tetherus`,
		amount: 0
	},
	armadium: {
		name: 'Armadium',
		info: `<span class='fgreen'>Armadium</span> is an exotic element. It can be mined on planet Gazorpazorp`,
		amount: 0
	},
	solanium: {
		name: 'Solanium',
		info: `<span class='fgreen'>Solanium</span> is an exotic element. It can be mined on planet Xeln`,
		amount: 0
	},
	hawkingradiation: {
		name: 'Hawkings Radiation',
		info: `<span class='fgreen'>Hawking Radiation</span> holds secrets burried throughout billions of Black Holes existence. It can be mined in a Black Hole`,
		amount: 0
	},
	antiMatter: {
		name: 'Anti Matter',
		info: `Collect <span class='fblue'>Anti Matter</span> to craft various items and speed up your progress`,
		amount: 0
	},
	frostCrystal: {
		name: 'Frost Crystal',
		info: `Support the dev and earn some <span class='fblue'>Frost Crystals</span>. You can later spend them in the Premium store for some powerful upgrades. <span class='fwhite'>Right Click > Donate</span> for more info`,
		amount: 0
	},
	darkMatter: {
		name: 'Dark Matter',
		info: `<span class='fpurple'>Dark Matter</span> is a very powerful element.
					It can bend space-time, alowing you to travel to distant planets faster than the speed of light`,
		amount: 0
	},
	concentratedDarkMatter: {
		name: 'Concentrated Dark Matter',
		info: `<span class='forange'>Concentrated Dark Matter</span> is a mythical element. It can manipulate timeflow itself!`,
		amount: 0
	}
}
/*===========================================================
=					Generate Inventory																=
===========================================================*/
function generateInventory() {
	for(key in Game.Inventory) {
    let item = Game.Inventory[key];

		let inventory = `
			<div class='hidden' id='${key}'>
				<div class='stat-img'><img src='img/inv/${key}.png' id='${key}Loc'/></div>
				<div class='stat-num' id='${key}Anim'><span id='${key}Amount'></span></div>
				<div class='tooltip stat-tooltip'>
					<div class='tooltip-content'>
						<span class='fwhite'>${item.name}</span><hr/>
						<span class='fgrey f10'>${item.info}</span>
					</div>
				</div>
			</div>
		`;

		elem('inventoryStats').innerHTML += inventory;
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
  for(key in Game.Inventory) {
		let item = Game.Inventory[key];

    elem(key + 'Amount').innerHTML = nFormat(item.amount);
  }
}