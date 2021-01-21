var text = 'Domo arigato!'
report('Before defining functions')

function useless(ninjaCallback) {
  report('In useless function')
  return ninjaCallback()
}

function getText() {
  report('In getText function');
  return text;
}

report('Before makinga all the calls');
assert(useless(getText) === text, 'The useless function workd! ' + text);
report('After the calls have been made!');

var values = [0, 3, 2, 5, 7, 4, 8, 1];
values.sort(function(a, b) {
  return b - a;
})

// a = 0, b = 3; b - a > 0

console.log(values);

var store = {
  nextId: 1,
  cache: {},
  add: function(fn) {
    if (!fn.id) {
      fn.id = this.nextId++;
      this.cache[fn.id] = fn;
      return true;
    }

    return false;
  }
}

function ninja(){};
assert(store.add(ninja), 'Function was safely added.');
assert(!store.add(ninja), 'But it was only added once.');

// self-memoizing functions
function isPrime(value) {
  if (!isPrime.answer) {
    isPrime.answer = {};
  }

  if (isPrime.answer[value] !== undefined) {
    return isPrime.answer[value];
  }

  var prime = value !== 0 && value !== 1;
  for (let i = 2; i < value; i++) {
    if (value % i === 0) {
      prime = false;
      break;
    }
  }

  return isPrime.answer[value] = prime;
} 

assert(isPrime(5), '5 is prime!');
assert(isPrime.answer[5], 'The answer was cached!');

function ninja() {
  return this;
}

assert(ninja() === window, "In a 'nostrict' ninja function" + "the context is the global window object");

// 构造函数
// 1. 创建一个新对象
// 2. 将新创建的对象作为 this 参数传递给构造函数
// 3. 返回新创建的对象
function Ninja() {
  this.skulk = function() {
    return this;
  }
}

var ninja1 = new Ninja();
var ninja2 = new Ninja();
// 1. ninja -> {}
// 2. ninja -> this
// 3. return ninja
assert(ninja1.skulk() === ninja1, 'The 1st ninja is skulking');
assert(ninja2.skulk() === ninja2, 'The 2nd ninja is skulking');

// 构造函数有返回值结果会如何

function Ninja1() {
  this.skulk = function() {
    return this;
  }

  return 123;
}

assert(Ninja1() === 123, 'Return value honored when not called as a constructor');

var ninja3 = new Ninja1();

assert(typeof ninja3 === 'object', 'Object returned when called as a constructor');
assert(typeof ninja3.skulk === 'function', 'ninja object has a skulk method');


var puppet = {
  rules: false
};

function Ninja2() {
  this.skulk = function() {
    return this;
  }

  return puppet;
}
var ninja4 = new Ninja2();

assert(ninja4 === puppet, 'The ninja4 is merely a puppet!');
assert(ninja4.rules === false, 'The puppet does not how to rules!');


function juggle() {
  var result = 0;
  for(var n = 0; n < arguments.length; n++) {
    result += arguments[n];
  }

  this.result = result;
}

var ninja5 = {};
var ninja6 = {};

juggle.apply(ninja5, [1,2,3,4,5]);
juggle.call(ninja6, 1,2,3,4,5);

assert(ninja5.result === 15, 'juggled via apply');
assert(ninja6.result === 15, 'juggled via call');

function isArray(obj) {
  if(!Array.isArray(obj)) {
    console.error('The first argument is not a array');
    return;
  }
}

function isFunction(fn) {
  if(typeof fn !== 'function') {
    console.log('The second argument is note a function');
    return;
  }
}

function forEach(list, callback) {
  isArray(list);
  isFunction(callback);
  
  for (var n = 0; n < list.length; n++) {
    console.log(list[n]);
    callback.call(list[n], n);
  }
}

var weapons = [
  { type: 'shuriken'},
  { type: 'katana'},
  { type: 'nunchucks'}
]

forEach(weapons, function(index) {
  assert(this === weapons[index], "Got the expected value of " + weapons[index].type);
})