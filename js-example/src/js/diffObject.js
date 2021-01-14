function diffObject(arr, ) {
  var newArr = []
  
  for (let item of arr) {
    console.log(item)
    if (item < 0) {
      newArr.push(item)
    }
  }

  return newArr
}

var a = diffObject([1, 3, 4, -1, 3])
console.log(a)


var arr = [1, 3,3,4,5]

console.log(
  arr.map(item => Boolean(item))
)

var numbers1 = [22, [22]]
var numbers2 = [3,[33]]
var numbers3 = numbers1.concat(numbers2)
console.log(
  numbers3
)

numbers1[1].push(2)
numbers2[1].push(1)
console.log(numbers3)
