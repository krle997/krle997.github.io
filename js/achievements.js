/*===========================================================
=         Achievemens                                       =
===========================================================*/
Game.Achievements = {
  titanium: {
    name: 'Titanium Accumulation',
    misc: `
      <div id='titaniumAchievements'></div><hr>
      Reward: Titanium Helmet Avatar
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  earth: {
    name: 'Titanium Domination',
    misc: `
      <div id='earthAchievements'></div><hr>
      Reward: Titanium Obliterator Avatar
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  plutonium: {
    name: 'Plutonium Mining',
    misc: `
      <div id='plutoniumAchievements'></div><hr>
      Reward: Plutonium Lover Avatar
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  grudnock: {
    name: 'Grudnock Invasion',
    misc: `
      <div id='grudnockAchievements'></div><hr>
      Reward: Grudnock God Avatar
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  chrysonite: {
    name: 'Chrysonite Mining',
    misc: `
      <div id='chrysoniteAchievements'></div><hr>
      Reward: Chrysonite Toxin Avatar
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  tetherus: {
    name: 'Tetheruss Rings Collab',
    misc: `
      <div id='tetherusAchievements'></div><hr>
      Reward: Tethered Avatar
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  armadium: {
    name: 'Armadium Mining',
    misc: `
      <div id='armadiumAchievements'></div><hr>
      Reward: Armadium Nobel
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  gazorpazorp: {
    name: 'Rick and Morty Bitch',
    misc: `
      <div id='gazorpazorpAchievements'></div><hr>
      Reward: Ricked Avatar
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  solanium: {
    name: 'Solanium Mining',
    misc: `
      <div id='solaniumAchievements'></div><hr>
      Reward: Solanium Addict
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  xeln: {
    name: 'Underwater Triumph',
    misc: `
      <div id='xelnAchievements'></div><hr>
      Reward: Water Element Helmet
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  singularity: {
    name: 'Singularity Origins',
    misc: `
      <div id='singularityAchievements'></div><hr>
      Reward: Singular Mass
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  blackhole: {
    name: 'Black Hole Infinity',
    misc: `
      <div id='blackholeAchievements'></div><hr>
      Reward: Pocket Hole
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  antiMatter: {
    name: 'Anti Matter Collecting',
    misc: `
      <div id='antiMatterAchievements'></div><hr>
      Reward: Anti Matterialistic
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  },
  concentratedDarkMatter: {
    name: 'Concentrated Power',
    misc: `
      <div id='concentratedDarkMatterAchievements'></div><hr>
      Reward: Undying
    `,
    unlocked: 0,
    ach: {
      One: false,
      Two: false,
      Three: false,
      Four: false,
      Five: false,
      Six: false,
      Seven: false,
      Eight: false,
      Nine: false,
      Ten: false
    }
  }
}
/*===========================================================
=         Generate Achievements                             =
===========================================================*/
function generateAchievements() {
	for(key in Game.Achievements) {
    let item = Game.Achievements[key];

		let content = `
			<div class='item' id='${key}Ach'>
        <div class='item-img' id='${key}Img'>
          <img src='img/achievements/${key}.png'>
        </div>
        <div class='item-bar'>
          <div class='item-progress' id='${key}Progress'></div>
        </div>
				<div class='tooltip ach-tooltip fgrey'>
          <div class='tooltip-content'>
            <span class='fwhite f14'>${item.name}</span><hr/>
            ${item.misc}
          </div>
				</div>
			</div>
		`;

    elem('achBoxes').insertAdjacentHTML('beforeend', content);
	}

  let farm = [ '1 M', '1 B', '1 T', '1 Qa', '1 Qi', '1 Sx', '1 Sp', '1 Oct', '1 Non', '1 Dec' ]
  let lv = [ '10', '25', '50', '100', '250', '500', '1 K', '2.5 K', '5 K', '10 K']
  generateAchTiles('titanium', farm, 'inv/titanium16.png', 'Total');
  generateAchTiles('earth', lv, 'character/lv16.png', 'Reach Lv');
  generateAchTiles('plutonium', farm, 'inv/plutonium16.png', 'Total');
  generateAchTiles('grudnock', lv, 'character/lv16.png', 'Reach Lv');
  generateAchTiles('chrysonite', farm, 'inv/chrysonite16.png', 'Total');
  generateAchTiles('tetherus', lv, 'character/lv16.png', 'Reach Lv');
  generateAchTiles('armadium', farm, 'inv/armadium16.png', 'Total');
  generateAchTiles('gazorpazorp', lv, 'character/lv16.png', 'Reach Lv');
  generateAchTiles('solanium', farm, 'inv/solanium16.png', 'Total');
  generateAchTiles('xeln', lv, 'character/lv16.png', 'Reach Lv');
  generateAchTiles('singularity', farm, 'inv/singularity16.png', 'Total');
  generateAchTiles('blackhole', lv, 'character/lv16.png', 'Reach Lv');
  generateAchTiles('antiMatter', lv, 'inv/antiMatter16.png', 'Total');
  generateAchTiles('concentratedDarkMatter', lv, 'inv/concentratedDarkMatter16.png', 'Total');
}

function generateAchTiles(key, amount, img, what) {
  let item = Game.Achievements[key];
  let num = [ 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten' ]

  for(i = 0; i < 10; i ++) {
    let content = `
      [<span class='fred f16' id='${key + num[i]}'>✖</span>]
      ${what}: <span class='fwhite f16'>${amount[i]}</span>
      <img class='imgFix' src='img/${img}'><br>
    `;

    elem(`${key}Achievements`).insertAdjacentHTML('beforeend', content)
  }
}
/*===========================================================
=         Unlock achievement                                =
===========================================================*/
function unlockAchievement(key, i) {
  Game.Achievements[key].ach[i] = true;
  Game.Achievements[key].unlocked ++;
  Game.Account.achievements.unlocked ++;

  save(`${key + i}`, Game.Achievements[key].ach[i]);
  elem(`${key + i}`).innerHTML = '✓';
  elem(`${key + i}`).className = 'fgreen f16';
}
/*===========================================================
=         Update Achievement                                =
===========================================================*/
function updateAchievements() {
  let item = Game.Ascensions;
  let acc = Game.Account;
  let inv = Game.Inventory;

  for(key in Game.Achievements) {
    for(i in Game.Achievements[key].ach) {

      if(Game.Achievements[key].ach[i]) {
        elem(key + i).innerHTML = '✓';
        elem(key + i).className = 'fgreen f16';
        Game.Achievements[key].unlocked ++;
        Game.Account.achievements.unlocked ++;
      }

      let width = Game.Achievements[key].unlocked * 100 / 10;
      progBar(key, width);
    }
  }
}
