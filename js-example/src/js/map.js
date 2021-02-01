if (!Array.prototype.mapped) {
  Array.prototype.mapped = function(callback, /* thisArg*/) {
    var T, A, k;

    if (this == null) {
      throw new TypeError('this is null or not undefined');
    }

    var O = Object(this);

    var len = O.length >>> 0;

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      T = arguments[1];
    }

    A = new Array(len);

    k = 0;

    while(k < len) {
      var KValue, mappedValue;

      if (k in O) {
        KValue = O[k];
        mappedValue = callback.call(T, KValue, k, O);
        A[k] = mappedValue;
      }

      k++;
    }

    return A;
  }
}

var numbers = [1,2,3,4];
var newNumbers = numbers.mapped(num => num * 2);
console.log(newNumbers);