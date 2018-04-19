Game.Donate = {
	bitcoin: {
		name: 'Bitcoin',
    info: `
      Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing
      transactions and the issuing of bitcoins is carried out collectively by the network.
      Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone
      can take part<br>
      More - <span class='fblue'>https://bitcoin.org</span>
    `,
		addr: '13yxBLa2cCici4VrsTTvjAP1vUzA5NwLx3'
	},
	ethereum: {
		name: 'Ethereum',
    info: `
      Ethereum is a decentralized platform that runs smart contracts: applications that run exactly
      as programmed without any possibility of downtime, censorship, fraud or third-party interference<br>
      More - <span class='fblue'>https://ethereum.org</span>
    `,
		addr: '0xAFE7502c7aC013306bF5c7399FDd7f73c1f69E54'
	},
}

function generateDonate() {
	for(key in Game.Donate) {
		let item = Game.Donate[key];

		let content = `
			<div class='item'>
        <div class='item-img'>
          <img src='img/donate/${key}.png' onclick='prompt("Press CTRL + C to copy my address to your clipboard", "${item.addr}")'>
        </div>
				<div class='tooltip item-tooltip-left fgrey'>
          <div class='tooltip-header fcenter'>
            <span class='fwhite f14'>${item.name}</span><br>
            <span class='fwhite'>Click to donate</span>
          </div>
					<div class='tooltip-content'>
						${item.info}
					</div>
				</div>
			</div>
		`;

		elem('donateItems').insertAdjacentHTML('beforeend', content);
	}
}
