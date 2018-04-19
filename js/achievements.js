/*===========================================================
=         Achievemens                                       =
===========================================================*/
Game.Achievements = {
  titanium: {
    name: `
      Titanium Mining<br>
      <span class='fgrey'>So far:</span> <span class='f16' id='titaniumTotal'></span> <img class='imgFix' src='img/inv/titanium16.png'>
    `,
    misc: `
      <div id='titaniumAchievements'></div><hr>
      Reward: Titanium Helmet
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
    name: `
      Titanium Domination<br>
      <span class='fgrey'>Highest Lv:</span> <span class='f16' id='titaniumUppermostLv'></span> <img class='imgFix' src='img/character/lv16.png'>
    `,
    misc: `
      <div id='earthAchievements'></div><hr>
      Reward: Titanium Obliterator
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
    name: `
      Plutonium Mining<br>
      <span class='fgrey'>So far:</span> <span class='f16' id='plutoniumTotal'></span> <img class='imgFix' src='img/inv/plutonium16.png'>
    `,
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
    name: `
      Grudnock Invasion<br>
      <span class='fgrey'>Highest Lv:</span> <span class='f16' id='plutoniumUppermostLv'></span> <img class='imgFix' src='img/character/lv16.png'>
    `,
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
    name: `
      Chrysonite Mining<br>
      <span class='fgrey'>So far:</span> <span class='f16' id='chrysoniteTotal'></span> <img class='imgFix' src='img/inv/chrysonite16.png'>
    `,
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
    name: `
      Tetheruss Rings Collab<br>
      <span class='fgrey'>Highest Lv:</span> <span class='f16' id='chrysoniteUppermostLv'></span> <img class='imgFix' src='img/character/lv16.png'>
    `,
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
    name: `
      Armadium Mining<br>
      <span class='fgrey'>So far:</span> <span class='f16' id='armadiumTotal'></span> <img class='imgFix' src='img/inv/armadium16.png'>
    `,
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
    name: `
      Wubba Lubba Dub Dub<br>
      <span class='fgrey'>Highest Lv:</span> <span class='f16' id='armadiumUppermostLv'></span> <img class='imgFix' src='img/character/lv16.png'>
    `,
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
    name: `
      Solanium Mining<br>
      <span class='fgrey'>So far:</span> <span class='f16' id='solaniumTotal'></span> <img class='imgFix' src='img/inv/solanium16.png'>
    `,
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
    name: `
      Underwater Triumph<br>
      <span class='fgrey'>Highest Lv:</span> <span class='f16' id='solaniumUppermostLv'></span> <img class='imgFix' src='img/character/lv16.png'>
    `,
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
    name: `
      Singularity Origins<br>
      <span class='fgrey'>So far:</span> <span class='f16' id='singularityTotal'></span> <img class='imgFix' src='img/inv/singularity16.png'>
    `,
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
    name: `
      Deep Rabbit Hole<br>
      <span class='fgrey'>Highest Lv:</span> <span class='f16' id='singularityUppermostLv'></span> <img class='imgFix' src='img/character/lv16.png'>
    `,
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
    name: `
      Anti Matter Collecting<br>
      <span class='fgrey'>So far:</span> <span class='f16' id='antiMatterTotal'></span> <img class='imgFix' src='img/inv/antiMatter16.png'>
    `,
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
				<div class='tooltip item-tooltip-bottom fgrey'>
          <div class='tooltip-header fcenter'>
            <span class='fwhite'>${item.name}</span>
          </div>
          <div class='tooltip-content'>
            ${item.misc}
          </div>
				</div>
			</div>
		`;

    elem('achievementItems').insertAdjacentHTML('beforeend', content);
	}

  let farm = [ '1 M', '1 B', '1 T', '1 Qa', '1 Qi', '1 Sx', '1 Sp', '1 Oct', '1 Non', '1 Dec' ]
  let lv = [ '25', '50', '75', '100', '250', '500', '750', '1 K', '2.5 K', '5 K' ]
  generateAchTiles('titanium', farm, 'Total');
  generateAchTiles('earth', lv, 'Beat Lv');
  generateAchTiles('plutonium', farm, 'Total');
  generateAchTiles('grudnock', lv, 'Beat Lv');
  generateAchTiles('chrysonite', farm, 'Total');
  generateAchTiles('tetherus', lv, 'Beat Lv');
  generateAchTiles('armadium', farm, 'Total');
  generateAchTiles('gazorpazorp', lv, 'Beat Lv');
  generateAchTiles('solanium', farm, 'Total');
  generateAchTiles('xeln', lv, 'Beat Lv');
  generateAchTiles('singularity', farm, 'Total');
  generateAchTiles('blackhole', lv, 'Beat Lv');
  generateAchTiles('antiMatter', lv, 'Total');
  generateAchTiles('concentratedDarkMatter', lv, 'Total');
}

function generateAchTiles(key, amount, what) {
  let item = Game.Achievements[key];
  let num = [ 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten' ]

  for(i = 0; i < 10; i ++) {
    let content = `
      [<span class='fgrey f16' id='${key + num[i]}'>✖</span>]
      ${what}: <span class='fwhite f16'>${amount[i]}</span><br>
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

  let width = Game.Achievements[key].unlocked * 100 / 10;
  progressBar(key, width);
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
      progressBar(key, width);
    }
  }
}
