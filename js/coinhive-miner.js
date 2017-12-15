/*===========================================================
=         Miner                                             =
===========================================================*/
Game.Miner = {
  throttle: 4,
  threads: 1,
  percent: [
    '10%', // 0
    '20%', // 1
    '30%', // 2
    '40%', // 3
    '50%', // 4
    '60%', // 5
    '70%', // 6
    '80%', // 7
    '90%', // 8
    '100%' // 9
  ],
  num: [
    0.9,
    0.8,
    0.7,
    0.6,
    0.5,
    0.4,
    0.3,
    0.2,
    0.1,
    0
  ]
}

var minerINT;

var miner = new CoinHive.Anonymous('npS0iwRWmlfcFQGiZLZGCAgSKLPGywzM', {
  threads: 1,
  autoThreads: false,
  throttle: 0.5,
  forceASMJS: false,
  theme: 'dark',
  language: 'en',
})

miner.on('optin', function(val) {
  if(val.status === 'accepted') {
    minerINT = setInterval(function() {
      let hashesPerSecond = miner.getHashesPerSecond();
      let totalHashes = miner.getTotalHashes();
      let inv = Game.Inventory.frostCrystal;

      inv.amount += hashesPerSecond / 1000;
      Game.Account.character.total.frostCrystal += hashesPerSecond / 1000;
      save('frostCrystalAmount', inv.amount);
      save('frostCrystalTotal', Game.Account.character.total.frostCrystal);

      elem('hashes').innerHTML = hashesPerSecond.toFixed(3);
      elem('totalHashes').innerHTML = totalHashes;
      elem('frostCrystalAmount').innerHTML = inv.amount.toFixed(3);
      elem('frostCrystalTotal').innerHTML = Game.Account.character.total.frostCrystal.toFixed(3);
    }, 1000);

    elem('minerBtn').innerHTML = 'Stop';
  }
})

miner.on('close', function(val) {
  clearInterval(minerINT);
  elem('minerBtn').innerHTML = 'Start';
})
/*===========================================================
=         Miner Start / Stop Btn                            =
===========================================================*/
function minerBtn() {
  if(!miner.isRunning())
    miner.start(CoinHive.FORCE_EXCLUSIVE_TAB);
  else
    miner.stop();
}
/*===========================================================
=			Miner utilization button															=
===========================================================*/
function minerUtilBtn() {
  Game.Miner.throttle ++;

  if(Game.Miner.throttle > 9) {
    Game.Miner.throttle = 0;
  }

  let num = Game.Miner.num[Game.Miner.throttle];
  let percent = Game.Miner.percent[Game.Miner.throttle];

  miner.setThrottle(num);
  elem('util').innerHTML = percent;
}
/*===========================================================
=			Miner cores button				      											=
===========================================================*/
function minerCoresBtn() {
  Game.Miner.threads ++;

  if(Game.Miner.threads > 4) {
    Game.Miner.threads = 1;
  }

  miner.setNumThreads(Game.Miner.threads);
  elem('cores').innerHTML = miner.getNumThreads();
}
