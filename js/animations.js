/*===========================================================
=         Generate Resource for Animation                   =
===========================================================*/
function generateResource(ore, amount) {
  let id = Math.random();

  function makeResource() {
  	return {
      x: Math.random() * (192 - 256) + 256,
      y: Math.random() * (224 - 256) + 256,
      side: Math.random() < 0.5 ? -0.5 : 0.5,
      fText: nFormat(amount),
      fTextImg: `inv/${ore}16.png`,
      gravityPull: 0,
      bounce: 0.6,
      bounces: 0,
      opacity: 1
  	}
  }

  Game.res[id] = makeResource();

  let item = Game.res[id];
  let html = `
    <img class='animated-resource' id='resource${id}' src='img/inv/${ore}.png'>
  `;

  elem('resourceContainer').insertAdjacentHTML('beforeend', html);
  elem(`resource${id}`).style.left = item.x + 'px';
  elem(`resource${id}`).style.top = item.y + 'px';

  Game.resAnimFrame = requestAnimationFrame(function(timestamp) {
    resourceAnim(timestamp, id);
  });
}
/*===========================================================
=         Animate Resource                                  =
===========================================================*/
function resourceAnim(timestamp, id) {
  let item = Game.res[id];
  let resourcePos = elem('resourceContainer').getBoundingClientRect();

  item.gravityPull += .1;
  item.y += item.gravityPull;
  item.x += item.side;

  if(item.y >= resourcePos.height - 64) {
    item.y = resourcePos.height - 64;
    item.gravityPull = -(item.gravityPull * item.bounce);
    item.bounces ++;
  }

  elem(`resource${id}`).style.left = item.x + 'px';
  elem(`resource${id}`).style.top = item.y + 'px';

  if(item.bounces < 4) {
    requestAnimationFrame(function(timestamp) {
      resourceAnim(timestamp, id);
    });
  }
  else if(item.bounces >= 4) {
    let resourceLoc = elem(`resource${id}`).getBoundingClientRect();
    generateFloatingText(item.fText, item.fTextImg, resourceLoc.left, resourceLoc.top);

    Game.resFadeOutAnim = requestAnimationFrame(function(timestamp) {
      fadeOutAnimation(timestamp, id);
    });
  }
}
/*===========================================================
=         Resource Fade Out                                 =
===========================================================*/
function fadeOutAnimation(timestamp, id) {
  let item = Game.res[id];

  item.opacity -= 0.02;
  elem(`resource${id}`).style.opacity = item.opacity;

  if(item.opacity > 0) {
    requestAnimationFrame(function(timestamp) {
      fadeOutAnimation(timestamp, id);
    });
  }
  else if(item.opacity <= 0) {
    elem(`resource${id}`).parentNode.removeChild(elem(`resource${id}`));
    delete item;
  }
}
/*===========================================================
=         Generate Floating Text                            =
===========================================================*/
function generateFloatingText(text, img, xLoc, yLoc) {
  let id = Math.random();

  function makeFloatingText() {
    return {
      x: xLoc,
      y: yLoc,
      distance: 0,
      opacity: 1
    }
  }

  Game.fText[id] = makeFloatingText();

  let item = Game.fText[id];
  let html = `
    <div class='floating-text fwhite f16' id='fText${id}'>
      ${text} <img class='imgFix' src='img/${img}'>
    </div>
  `;

  elem('resourceContainer').insertAdjacentHTML('beforeend', html);
  elem(`fText${id}`).style.left = `${item.x}px`;
  elem(`fText${id}`).style.top = `${item.y}px`;

  Game.fTextAnimFrame = requestAnimationFrame(function(timestamp) {
    floatingTextAnim(timestamp, id);
  });
}
/*===========================================================
=         Animate Floating Text                             =
===========================================================*/
function floatingTextAnim(timestamp, id) {
  let item = Game.fText[id];

  item.y --;
  item.distance ++;

  elem(`fText${id}`).style.top = `${item.y}px`;

  if(item.distance >= 64) {
    item.opacity -= 0.01;

    elem(`fText${id}`).style.opacity = item.opacity;
  }

  if(item.opacity > 0) {
    requestAnimationFrame(function(timestamp) {
      floatingTextAnim(timestamp, id);
    });
  }
  else if(item.opacity <= 0) {
    elem(`fText${id}`).parentNode.removeChild(elem(`fText${id}`));
    delete item;
  }
}
/*===========================================================
=         Animate Stat Num                                  =
===========================================================*/
function popUpAnim(key) {
  let frame = 0;
  let scale = 1;

  let animateScale = setInterval(function() {
    frame ++;

    if(frame <= Game.fps / 4)
      scale += 0.015;
    if(frame >= Game.fps / 4)
      scale -= 0.015;

    elem(`${key}Amount`).style.transform = `scale(${scale})`;

    if(frame >= Game.fps / 2) {
      elem(`${key}Amount`).style.transform = `scale(1)`;
      clearInterval(animateScale);
    }

  }, 1000 / Game.fps)
}
