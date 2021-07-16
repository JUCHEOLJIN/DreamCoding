"use strict";

// JSON
// JavaScript Object Notation

// 1. Object to JSON
// stringify(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(["apple", "banana"]);
console.log(json);

const rabbit = {
  name: "tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${this.name} can jump!`);
  },
};

json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ["name"]);
console.log(json);

json = JSON.stringify(rabbit, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === `name` ? `ellie` : value;
});
console.log(json);

// 2. JSON to Object
// parse(json)

console.clear();
json = JSON.stringify(rabbit);
const obj = JSON.parse(json, (key, value) => {
  console.log(`key: ${key}, value: ${value}`);
  return key === "birthDate" ? new Date(value) : value;
});
console.log(obj);
rabbit.jump();
// obj.jump() -> TypeError: obj.jump is not a function

console.log(rabbit.birthDate.getDate());
console.log(obj.birthDate.getDate());
