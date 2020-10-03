function createPerson (name, age) {
  return {
      name: name,
      age: age
  };
}

let lora = createPerson('Lora', 18);
console.log(lora.age);

let myMaths = {
  add: function add (a, b) {
      return a + b;
  },
  multiply: function multiply (a, b) {
      return a * b;
  }
};

myMaths.add(1, 2);

let myArray = [1, 2, 3, 4, 5];

myArray.forEach(function (number) {
  console.log(number);
});

//goes through array like foreach, but makes a new array from value
let squared = myArray.map(function (number) {
  return number * number;
});
console.log (squared);

let sum = myArray.reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);

console.log (sum);

let button = document.getElementById('flipCoin');
button.addEventListener('click', function () {
  if (Math.random() < 0.5) {
    alert('HEADS');
  } else {
    alert('TAILS');
  }
});