// array functions
// map --> used when we have to create an array from an existing array with some specific changes
// let arr = [1,2,3,4];
// let new_arr = [];
// for (let ele of arr) {
//     new_arr.push(ele**2)
// }
// console.log(new_arr)

// when map() runs it calls the function once for each element of the array and passes the current element
// as the argument
// function twice(ele) {
//     return ele * 2;
// }
// arr = [1,2,3,4];
// new_arr = arr.map(twice);  //callback function as the twice function is passed as an argument to the map function
// console.log(new_arr)

// diff way
// let arr = [1,-6,-3,8];
// let new_arr = arr.map(
//     function(ele) {
//         return Math.abs(ele ** 3);
//     }
// )
// console.log(new_arr)

// arrow function --> normal function -  function function_name(arguments){}    arrow function - function_name=(arguments)=>{}
// function add (a,b) {
//     return a+b;
// }
// const sum = (a,b)=> {
//     return a+b;
// }
// console.log(add(1,2));
// console.log(sum(1,2));

// arr = [1,2,3,4];
// new_arr = arr.map((ele) =>{
//         return ele*2;}
// )
// console.log(new_arr)

// filter --> used to create a new array containing only those elements that satisfy a condition
// in filter we return true and false 
// values which return false are filtered out and if true accept the value
 
// function anon(ele) {
//     return ele%2!=0;
// }
// arr = [1,2,3,4];
// new_arr = arr.filter(anon);
// console.log(new_arr)       //1,3

// arr = [1,2,3,4];
// new_arr = arr.filter(function (ele) {
//     return ele%2!=0;
// }
// );
// console.log(new_arr)       //1,3

// arr = [1,9,2,7,4,5,6,2,8];
// new_arr = arr.filter((ele) => {
//     return ele>=5;
// }
// )
// console.log(new_arr)

// reduce --> it is another array method. It is used to reduce an entire array to a single value. 
// in reduce function you need to pass two arguments to the function first the accumulator(acc) (a variable
// that keeps the running result as reduce() processes each element of the array)
// Second the element of the array.

// sum of all of the elements of the array
// let arr = [1,2,3,4];
// let sum = arr.reduce(
//     (acc,ele)=> {
//         return acc+ele;
//     }
// ,0);        //0 is passed to set the initial value of the accumulator to 0
// console.log(sum);

// product of all of the elements of the array
// let arr = [1,2,3,4];
// let product = arr.reduce(
//     (acc,ele)=> {
//         return acc * ele;
//     }
// ,1);
// console.log(product);

// map()	A new array where every element is transformed
// filter()	A new array containing only elements that satisfy a condition
// reduce()	A single value (number, string, object, etc.)

// sorting of an array
// let arr = [4,3,2,1]; 
// console.log(arr.sort());      //ascending order

// let arr=[1,2,3,4];
// arr.sort((a,b) => {
//     return b-a;           //descending order
// }
// )
// console.log(arr);

// sorting if negative number is involved
// let arr = [1,-9,-2,7];
// arr.sort(
//     (a,b) => {
//         return a-b;
//     }
// )
// console.log(arr);

// absolute sorting
// let arr = [1,-9,-2,7];
// arr.sort(
//     (a,b) => {
//         return Math.abs(a) - Math.abs(b);
//     }
// )
// console.log(arr);