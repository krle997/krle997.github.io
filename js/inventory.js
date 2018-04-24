/*===========================================================
=					Inventory																					=
===========================================================*/
Game.Inventory = {
	titanium: {
		name: 'Titanium',
		info: `
			<span class='fgreen'>Titanium</span> is an oxide. It is very common, but
			also very easily obtainable. You can mine it on planet
			<span class='fwhite'>Earth</span>
		`,
		amount: 0
	},
	plutonium: {
		name: 'Plutonium',
		info: `
			<span class='fgreen'>Plutonium</span> is an isotope. It's rarity is
			moderate, but still it's not that hard to find. You can mine it on planet
			<span class='fwhite'>Grudnock</span>
		`,
		amount: 0
	},
	chrysonite: {
		name: 'Chrysonite',
		info: `
			<span class='fgreen'>Chrysonite</span> is a silicate. It is hard to find,
			but it's worth a lot. You can mine it on planet <span class='fwhite'>
			Tetherus</span>
		`,
		amount: 0
	},
	armadium: {
		name: 'Armadium',
		info: `
			<span class='fgreen'>Armadium</span> is very important to me Morty. I need
			it for... research Morty, and to make some... Ugh, space dust, Morty... For
			even more research, Morty! Go get me some on planet <span class='fwhite'>
			Gazorpazorp</span>
		`,
		amount: 0
	},
	solanium: {
		name: 'Solanium',
		info: `
			<span class='fgreen'>Solanium</span> can't be re-created, unlike everything
			else in the universe. It doesn't belong here. UFO's we have been spotting
			might have been a product of another reality - explains how
			<span class='fgreen'>Solanium</span> wandered up here. You can mine it on
			planet <span class='fwhite'>Xeln</span>
		`,
		amount: 0
	},
	singularity: {
		name: 'Singularity',
		info: `
			<span class='fgreen'>Singularity</span> is burried deep within the
			<span class='fwhite'>Black Hole</span>. Many have tried to obtain it, but
			unfortunately none of them came back
		`,
		amount: 0
	},
	antiMatter: {
		name: 'Anti Matter',
		info: `
			<span class='fblue'>Anti Matter</span> is a powerful element, and the
			strongest, but shortest-lasting source of energy in the whole universe
		`,
		amount: 0
	},
	darkMatter: {
		name: 'Dark Matter',
		info: `
			<span class='fpurple'>Dark Matter</span> is a very powerful element. It can
			bend space-time, alowing you to travel to distant planets faster than the
			speed of light
		`,
		amount: 0
	},
	cDarkMatter: {
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
				<div class='stat-num fcenter'>
					<div id='${key}Amount'></div>
				</div>
				<div class='tooltip stat-tooltip'>
					<div class='tooltip-header fcenter fwhite'>
						${item.name}
					</div>
					<div class='tooltip-content'>
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

	if(inv.cDarkMatter.amount >= 0)
		unlockInventory('cDarkMatter');

  for(key in Game.Inventory) {
		let item = Game.Inventory[key];

    elem(`${key}Amount`).innerHTML = nFormat(item.amount);
  }
}
