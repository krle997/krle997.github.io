/*===========================================================
=         Achievemens                                       =
===========================================================*/
Game.Achievements = {
  plut1: {
    name: 'The Origins',
    info: `Mine a total of 1 M Plutonium<br>
    <i class='f10'>You have no idea what you're getting yourself into...</i>`,
    status: false
  },
  plut2: {
    name: 'Obtain Plutonium #2',
    info: 'Mine a total of 1 B Plutonium',
    status: false
  },
  plut3: {
    name: 'Obtain Plutonium #3',
    info: 'Mine a total of 1 T Plutonium',
    status: false
  },
  plut4: {
    name: 'Obtain Plutonium #4',
    info: 'Mine a total of 1 Qa Plutonium',
    status: false
  },
  plut5: {
    name: 'Obtain Plutonium #5',
    info: 'Mine a total of 1 Qi Plutonium',
    status: false
  },
  plut6: {
    name: 'Obtain Plutonium #6',
    info: 'Mine a total of 1 Sx Plutonium',
    status: false
  },
  plut7: {
    name: 'Obtain Plutonium #7',
    info: 'Mine a total of 1 Spt Plutonium',
    status: false
  },
  plut8: {
    name: 'Obtain Plutonium #8',
    info: 'Mine a total of 1 Oct Plutonium',
    status: false
  },
  plut9: {
    name: 'Obtain Plutonium #9',
    info: 'Mine a total of 1 Non Plutonium',
    status: false
  },
  plut10: {
    name: 'Plutonium Overload',
    info: 'Mine a total of 1 Dec Plutonium',
    status: false
  },
  vir1: {
    name: 'Obtain Viridium #1',
    info: 'Mine a total of 1 M Viridium',
    status: false
  },
  vir2: {
    name: 'Obtain Viridium #2',
    info: 'Mine a total of 1 B Plutonium',
    status: false
  },
  vir3: {
    name: 'Obtain Viridium #3',
    info: 'Mine a total of 1 T Viridium',
    status: false
  },
  vir4: {
    name: 'Obtain Viridium #4',
    info: 'Mine a total of 1 Qa Viridium',
    status: false
  },
  vir5: {
    name: 'Obtain Viridium #5',
    info: 'Mine a total of 1 Qi Viridium',
    status: false
  },
  vir6: {
    name: 'Obtain Viridium #6',
    info: 'Mine a total of 1 Sx Viridium',
    status: false
  },
  vir7: {
    name: 'Obtain Viridium #7',
    info: 'Mine a total of 1 Spt Viridium',
    status: false
  },
  vir8: {
    name: 'Obtain Viridium #8',
    info: 'Mine a total of 1 Oct Viridium',
    status: false
  },
  vir9: {
    name: 'Obtain Viridium #9',
    info: 'Mine a total of 1 Non Viridium',
    status: false
  },
  vir10: {
    name: 'Viridium Overload',
    info: 'Mine a total of 1 Dec Viridium',
    status: false
  },
  her1: {
    name: 'Obtain Viridium #1',
    info: 'Mine a total of 1 M Viridium',
    status: false
  },
  her2: {
    name: 'Obtain Viridium #2',
    info: 'Mine a total of 1 B Plutonium',
    status: false
  },
  her3: {
    name: 'Obtain Viridium #3',
    info: 'Mine a total of 1 T Viridium',
    status: false
  },
  her4: {
    name: 'Obtain Viridium #4',
    info: 'Mine a total of 1 Qa Viridium',
    status: false
  },
  her5: {
    name: 'Obtain Viridium #5',
    info: 'Mine a total of 1 Qi Viridium',
    status: false
  },
  her6: {
    name: 'Obtain Viridium #6',
    info: 'Mine a total of 1 Sx Viridium',
    status: false
  },
  her7: {
    name: 'Obtain Viridium #7',
    info: 'Mine a total of 1 Spt Viridium',
    status: false
  },
  her8: { // 27
    name: 'Obtain Viridium #8',
    info: 'Mine a total of 1 Oct Viridium',
    status: false
  },
  her9: { // 28
    name: 'Obtain Viridium #9',
    info: 'Mine a total of 1 Non Viridium',
    status: false
  },
  her10: { // 29
    name: 'Viridium Overload',
    info: 'Mine a total of 1 Dec Viridium',
    status: false
  },
  dps1: { // 30
    name: 'Tons of Damage #1',
    info: 'Have a total of 1 M DPS',
    status: false
  },
  dps2: { // 31
    name: 'Tons of Damage #2',
    info: 'Have a total of 1 B DPS',
    status: false
  },
  dps3: { // 32
    name: 'Tons of Damage #3',
    info: 'Have a total of 1 T DPS',
    status: false
  },
  dps4: { // 33
    name: 'Tons of Damage #4',
    info: 'Have a total of 1 Qa DPS',
    status: false
  },
  dps5: { // 34
    name: 'Tons of Damage #5',
    info: 'Have a total of 1 Qi DPS',
    status: false
  },
  dps6: { // 35
    name: 'Tons of Damage #6',
    info: 'Have a total of 1 Sx DPS',
    status: false
  },
  dps7: { // 36
    name: 'Tons of Damage #7',
    info: 'Have a total of 1 Spt DPS',
    status: false
  },
  dps8: { // 37
    name: 'Tons of Damage #8',
    info: 'Have a total of 1 Oct DPS',
    status: false
  },
  dps9: { // 38
    name: 'Tons of Damage #9',
    info: 'Have a total of 1 Non DPS',
    status: false
  },
  dps10: { // 39
    name: 'Mass Destruction',
    info: 'Have a total of 1 Dec DPS',
    status: false
  },
}
/*===========================================================
=         Generate Achievements                             =
===========================================================*/
function generateAchievements() {
	for(key in Game.Achievements) {
		let content = `
			<div class='achievement' id='${key}'>
				<img src='img/achievements/locked.png' id='${key}Img'>
				<div class='tooltip ach-tooltip'>
					<div class='col-full fwhite' id='${key}Name'>Locked</div>
					<div class='col-full fgrey' id='${key}Info'>Keep playing to unlock...</div>
				</div>
			</div>
		`;

    elem('achBoxes').innerHTML += content;
	}
}
/*===========================================================
=			Unlock achievement																		=
===========================================================*/
function unlockAchievement(key) {
  let src = 'img/unlkd.png';
  let name = Game.Achievements[key].name;
  let info = Game.Achievements[key].info;

  elem(key + 'Img').src = src;
  elem(key + 'Name').innerHTML = name;
  elem(key + 'Info').innerHTML = info;
}
