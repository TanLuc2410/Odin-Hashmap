import { HashMap } from "./hashMap.js";

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("moon", "silver");
// test.set("lion", "golden");
// test.set("notAFruit", "#fe");

// console.log(test.remove("notAFruit"));
console.log(test.clear());
console.log(test.capacity);
console.log(test.entries());
console.log(test.keys());
