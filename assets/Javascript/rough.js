// let a = 10;
// let b = 3.14;
// console.log(typeof(b));
// console.log(typeof(a));

// const arr = [1, 2, 3, 4, 5, [6, 7, 8, 9, 10]];
// console.log(arr[5][3]);  //9

// const a = "raj";
// const b = "singh";
// console.log(a + b);
// const c = a.concat(b);
// console.log(c);
// console.log(typeof(c));

// const a  =true;
// console.log(typeof(a));

// array functions
// shift()  //removes the first element of the array
// unshift()  //adds an element at the start of the array
// const arr = [1, 2, 3, 4, 5];
// arr.shift();  // 2,3,4,5
// arr.unshift(0);  // 0,2,3,4,5
// for (let x of arr) { //of loop is used to iterate over the elements of an array
//     //in loop is used to iterate over the indexes of an array
//     console.log(x);
// }

// console.log(2 == '2');  //true
// console.log(2 === '2');  //false

// true ? console.log("true") : console.log("false");  //true
// NaN ? console.log("true") : console.log("false");  //false

// const age = 19;
// const name = "raj";
// console.log(`hello everyone my name is ${name} and my age is ${age} years`);  //template literals

// const info = {
//     1 : "raj",
//     age : 19,
//     city : "delhi"
// }
// console.log(info["1"]);  //raj
// info["1"] = "raju";
// console.log(info["1"]);  //raju

// info["1"] = "singh";
// console.log(info["1"]);  //singh

// info["college"] = "DPU";
// console.log(info);  //DPU

// delete info["college"];
// console.log(info);  //college is deleted
// const prevents reassignment of the object variable, but it does not prevent modification of the object's properties.


// const info = {
//     college : "DPU",
//     raj : {
//         name : "raj",
//         age : 19,
//         city : "delhi"
//     }
// };
// console.log(info["raj"]["name"]);  //raj
// console.log(info["raj"].hasOwnProperty("age"));  //true

// function add (a,b) {
//     return a+b;
// }

// const add = (a,b) => {
//     return a+b;
// }

// console.log(add(2,3));  //5

// const info  = {
//     greet : function() {
//         console.log("hello everyone");
//     }
// }
// info.greet();  //hello everyone

// const info = {
//     greet : function (name) {
//         console.log(`hello ${name}`);
//     }
// }
// info.greet("raj");  //hello raj

// Remember: A function inside an object is called a method, and you call it using objectName.methodName().

// console.log(Math.random());  //random number between 0 and 1

// while (true) {
//     console.log(Math.floor(Math.random() * (10-1+1) ) + 1);  //random number between 1 and 10
// }

// let i = 0;
// while (i<10) {
//     console.log(Math.floor(Math.random() * (10- (-10) + 1) + (-10)))
//     i++;
// }

// const greet = (name) => {
//     console.log(`hello ${name}`);
// }
// const passUser = (callback) => {
//     callback("raj");
// }
// passUser(greet);  //hello raj

// const add = (a,b) => {
//     return a+b;
// }
// const sub = (callback, c) => {
//     return callback - c;
// }
// const ans = sub(add(1,2), 1);
// console.log(ans);  //2

// function hello() {
//     console.log("hello");
// }
// function raj() {
//     console.log("raj singh");
// }
// setTimeout(hello, 2*1000);  //hello
// setTimeout(raj, 1*1000);  //raj singh

// for (let i=10; i>0; i--) {
//     setTimeout(
//         () => {
//             console.log(i);
//         }
//         ,(11-i)*1000);
// }

// const arr = [1,2,3,4,5];
// const new_arr = arr.map((ele) => {
//     return ele*2;
// }); 
// console.log(new_arr);  //2,4,6,8,10

// const arr = [1,2,3,4,5];
// const new_arr = arr.filter((ele) => {
//     return ele%2!=0;
// });
// console.log(new_arr);  //1,3,5

// const arr = [1,2,3,4,5];
// const ans = arr.reduce((sum, ele) => {
//         return sum+ele;
// }, 0);
// console.log(ans);  //15