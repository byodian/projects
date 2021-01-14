var text = 'Domo arigato!'
testApp.report('Before defining functions')

function useless(ninjaCallback) {
  testApp.report('In useless function')
  return ninjaCallback()
}

function getText() {
  testApp.report('In getText function');
  return text;
}

testApp.report('Before makinga all the calls');
testApp.assert(useless(getText) === text, 'The useless function workd! ' + text);
testApp.report('After the calls have been made!');

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
testApp.assert(store.add(ninja), 'Function was safely added.');
testApp.assert(!store.add(ninja), 'But it was only added once.');

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

testApp.assert(isPrime(5), '5 is prime!');
testApp.assert(isPrime.answer[5], 'The answer was cached!');

function ninja() {
  return this;
}

testApp.assert(ninja() === window, "In a 'nostrict' ninja function" + "the context is the global window object");

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
testApp.assert(ninja1.skulk() === ninja1, 'The 1st ninja is skulking');
testApp.assert(ninja2.skulk() === ninja2, 'The 2nd ninja is skulking');

// 构造函数有返回值结果会如何

function Ninja1() {
  this.skulk = function() {
    return this;
  }

  return 123;
}

testApp.assert(Ninja1() === 123, 'Return value honored when not called as a constructor');

var ninja3 = new Ninja1();

testApp.assert(typeof ninja3 === 'object', 'Object returned when called as a constructor');
testApp.assert(typeof ninja3.skulk === 'function', 'ninja object has a skulk method');


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

testApp.assert(ninja4 === puppet, 'The ninja4 is merely a puppet!');
testApp.assert(ninja4.rules === false, 'The puppet does not how to rules!');

