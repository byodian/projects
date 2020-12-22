function drag() {
  const food = 'waffle'
  const breath = 'fire'
  let damage = 10 

  function levelUp() {
    damage += 20
  }
  function preference() {
      return 'I like ' + food
  }

  function attack() {
    return `I attack you with ${breath} for ${damage}`
  }

  return { levelUp, preference, attack }
}


const fullykins = drag()
console.log(fullykins.attack()) 
console.log(fullykins.levelUp())
console.log(fullykins.attack()) 

function Animal() {}

Animal.prototype.getNumLegs = function () {
  return `I have ${this.numLegs} legs.`
}

function Bird(name, numLegs) {
  this.name = name
  this.numLegs = numLegs
}

const flyBirds = new Bird("bob", 2)
console.log(flyBirds)
console.log(flyBirds instanceof Bird)

Bird.prototype = Object.create(Animal.prototype)
Bird.prototype.speak = function () {
  return 'I can speak a lot of English!'
}

Object.defineProperty(Bird.prototype, constructor, {
  enumerable: false,
  value: Bird,
  writable: true
})

for (let property in Bird.prototype) {
  console.log(property)
}

const cuteBird = new Bird('byodian', 2)
console.log(flyBirds instanceof Bird)
console.log(cuteBird)