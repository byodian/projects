assert(this === window, 'this === window');

var button = {
  clicked: false,
  click: function() {
    console.log(this);
    this.clicked = true;
    console.log(button.clicked);
    assert(button.clicked, "The button has been clicked");
    assert(this === window, 'In arrow function this === window');
    assert(window.clicked, "clicked is stored in window");
  }
}

var elem = document.getElementById('test');
// elem.addEventListener('click', button.click);
elem.addEventListener('click', button.click.bind(button));

function Ninja3() {
  this.whoAmI = () => this;
}

var ninja7 = new Ninja3();
var ninja8 = {
  whoAmI: ninja7.whoAmI
}

var ninja9 = {
  whoAmI: () => this
}

assert(ninja7.whoAmI() === ninja7, 'Assert pass ?');
assert(ninja8.whoAmI() === ninja8, 'Assert pass ?')

// Closure

var outerValue = 'samurai';
var later;

function outerFunction() {
  var innerValue = 'ninja';

  function innerFunction() {
    assert(outerValue === 'samurai', 'I can see the samurai.');
    assert(innerValue === 'ninja', 'I can see the ninja');
  }

  later = innerFunction;
}

outerFunction();
later();

function Constructor() {
  var feints = 0;
  this.getFeints = function() {
    return feints;
  }

  this.feint = function() {
    feints++;
  }
}


var ins = new Constructor();
ins.feint();

var imposter = {};
imposter.getFeints = ins.getFeints;
console.log(imposter.getFeints() + ' the imposter has access to the feints variable!');

assert(ins.feints === undefined, 'And the private data is inaccessible to us.');
assert(ins.getFeints() === 1, "We're able to access the internal feint count.");

function animate(elementId) {
  var elem = document.getElementById(elementId);
  var tick = 0;
  var timer = setInterval(function() {
    if (tick < 100) {
      elem.style.left = elem.style.top = tick + 'px';
      tick += 20;
    } else {
      clearInterval(timer);
      assert(tick === 100, 'Tick accessed via a clousure.');
      assert(elem, 'Element also accessed via a clousure.');
      assert(timer, 'Timer reference also obtained via a clousure.');
    }
  }, 10);
}

animate('box1');

function skulk(ninja) {
  report(ninja + 'skulking');
}

function report(message) {
  console.log(message);
}

skulk('Kuma');
skulk('Yoshi');

var ninja10 = 'Muneyoshi';
function skulk2() {
  var action = "skulking";
  function report() {
    var reportNum = 3;
    for (var i = 0; i < reportNum; i++) {
      console.log(ninja10 + ' ' + action + ' ' + i);
    }
  }

  report();
}

skulk2();

const firstConst = 'samurai';
assert(firstConst === 'samurai', 'firstConst is a samurai');

try {
  firstConst = 'ninja';
} catch(e) {
  console.log('An exception has occurred');
}

