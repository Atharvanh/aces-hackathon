// Callback function ek esa function hota hai jo ek function ke andar pass hota hai
// A callback is any function that is passed as an argument to another function, regardless of how it is created.
// There are two ways to pass a callback:
// 1. Pass a named function
// 2 .Create the function right inside the argument (anonymous function)
// if there are two functions (let x & y) if in the y function the x function is passed as an argument
// then the x function is said to be the callback function of the y function 
// function greet(name) {
//     console.log(`my name is ${name} singh!`)
// }
// function processUser(callback) {
//     callback("raj");
// }
// processUser(greet)

// function product(a,b,c) {
//     return a*b*c;
// }
// function numbers(callback,x) {
//     return (callback(1,2,3)-x);
// }
// console.log(numbers((product),1));

// timeout --> used when we have to give certain delay to a function
// the time is counted after the execcution of the code is started
// syntax --> setTimeout(function_name,seconds*1000);
// the function which is passed is an call-back function as that function is given as an argument inside the
// setTimeout function
// function hello() {
//     console.log("hello");
// }
// function raj(){
//     console.log("raj singh");
// }
// setTimeout(hello,2*1000);     //even if the hello function is called first it we'll be executed after
// // raj function as it has a delay of 2s after the code is executed
// setTimeout(raj,1*1000);

// Q. print 1 to 10 but with delay of 1s after each number gets printed
// for (let i=1; i<11; i++) {
//     setTimeout(
//         function print_num() {        //here print_num is a callback function
//             console.log(i);
//         }
//     ,i*1000);
// }

// create a timer from 10 to 0
// for (let i=1; i<11; i++) {
//     setTimeout(
//         function() {
//             console.log(11-i);
//         }
//     ,i*1000);
// }
