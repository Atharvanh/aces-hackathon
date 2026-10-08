// js is interpreted language, it is not compiled just like python and unlike c/c++
// mostly use let and const to declare variables in js, var is used in older versions of js
// let is block scoped and var is function scoped
// let only exists in the block it is defined in, but var exists in the whole function it is defined in
// due to this reason, let is preferred over var in modern js and const is used for variables that are not going to be reassigned
// redifinition of variables is allowed in js, but it is not a good practice (in other languages, it is not allowed)
// var
// Can be reassigned.
// Can be redeclared.
// Function-scoped.
// let
// Can be reassigned.
// Cannot be redeclared in the same scope.
// Block-scoped ({ }).
// const
// Cannot be reassigned.
// Cannot be redeclared in the same scope.
// Block-scoped.
// Must be initialized when declared.
// var a = 10;
// again var a = 20;
// Strings are immutable whenever the changes are made a new string is returned
// In js attempting to modify a character is simply ignored. It is not considered an error
// console.log("Hello, World!");
// console.log("3.14"); 
// console.log("raj".length);  //3
// console.log("raj".toUpperCase());   //RAJ
// console.log("raj".endsWith("j"));  //true
// let s = "raj"
// console.log(s.concat("singh"))  //rajsingh
// let s = "   rajr     ";
// console.log(s.trim())     //aage aur piche ke space ko trim kar deta hai (only aagee and piche not bich wale)
// console.log(s.indexOf('r'))   //returns the first occuring index of the character
// console.log(s.lastIndexOf('r'))  //returns the last occuring index of the character
// console.log(s.charAt(4))   //returns the character present at index n
// let str = "rajsingh";   //string slicing (including,excluding)
// console.log(str.slice(0)) //rajsingh
// console.log(str.slice(0,3))  //raj
// split function --> string.split(separator)
// separator is the point where the string should be split 
// let str = "raj is a good boy";
// console.log(str.split(' '));  //[ 'raj', 'is', 'a', 'good', 'boy' ]
// let fruits = "apple, banana, kiwi, litchi";
// console.log(fruits.split(','));  //[ 'apple', ' banana', ' kiwi', ' litchi' ]
// let name = "rajsingh";
// console.log(name.split('')); //['r', 'a', 'j', 's', 'i', 'n',  'g', 'h']
// number (int, float, double), string, boolean 
// console.log(typeof("raj")); //typeof operator is used to check the data type of a variable
// operations occur from left to right
// a = 5;
// b = a++;  //b=5 a=6
// c = ++a;  //a=7 c=7
// as no data type of variables is defined in js, we can assign any data type to a variable
// a = 10;
// a = "raj";
// console.log(a);
// template iterals --> console.log(`my name is ${b} and my age is ${a} years`);
// arithmetic operators --> +  - * / % **
// relational operators --> < > <= >= == != === !==
// in js 2=='2'  //true     2==='2' //false
// === checks for both value and type equality, while == checks for value equality only
// !== checks for both value and type inequality, while != checks for value inequality only
// logical operators --> && || !
// if (condition) {
//     //operations to be performed if condition is true
// }
// else if (condition) {
//     //operations to be performed if condition is true
// }
// else {
//     //operations to be performed if all conditions are false
// }
// ternary operator (shorthand for if else)
// condition? operation if condition is true: operation if condition is false;
// while (condition) {
//     //operation
// }
// for (variable declaration; condition; increment/decrement) {
//     //operation
// }
// let arr=[1,2,3,4];
// arr.push(5);   //pushes the element at the end of the array   //1,2,3,4,5
// arr.pop()    //pop the last element of the array   //1,2,3,4
// arr.unshift(0);  //add the element at the start of the array  //0,1,2,3,4
// arr.shift();    //remove the first element of the array //1,2,3,4
// you can make changes in an const array but you cant change entire value of an array
// i.e you can make changes to the elements of the array also perform actions like pushing and popping 
// but you cant assign value to an entire const array 
// as assignment to an const variable throws an error
// you can have values of different datatypes in a single array in python and js unlike other languages
// arr = ["raj", true, [1,2,3,4]];
// console.log(arr[2][2]);   //3 
// console.log(typeof(arr))   // object
// truthy values --> true condition, true, any real number except 0, string
// falsy values --> false condition, false, 0, null, NaN(not a number), undefined 
// NaN? console.log("hello") : console.log("world"); //world 
// objects are just like dictionaries use it when you are storing named properties like student,user,age
// any key that is not a string or a symbol is automatically converted to a string
// to use keys of any datatype we use maps
// object stores data in the form of key-value pairs just like dictionaries/map
// use map when you need dictionary-like behaviour with keys of any data type
// let x = {
//     name : "raj singh",
//     age : 19
// }
// x["name"] = "raju";
// console.log(x["name"])
// console.log(x)
//iterating over a array
// let arr = [1,2,3,4];
// for (let x in arr) {            //in ---> indices
//     console.log(arr[x]);
// }
// for (let x of arr) {           //of ---> actual elements of the array
//     console.log(x);
// }
// iterating over a object
// let obj = {
//     name : "raj singh",
//     age : 19
// }
// for (let ele in obj) {              //ele --> keys    object[ele] ---> values
//     console.log(ele , obj[ele]);
// }
// functions --> functions in python and js are almost the same
// function function_name(params) {
//     //code
// }
// Mathematical built-in functions
// console.log(Math.abs(-3))  //3
// console.log(Math.max(2,3,4,6,1)); //6     //the max function does not accepts an array as an argument
// spread operator(...) --> It expands an iterable (like an array/string) into individual elements
// use the spread operator whenever you want to expand it into individual elements 
// console.log(Math.max(...arr))   
// console.log(Math.min(3,2,1));  //1
// console.log(Math.pow(2,4));  //16
// console.log(Math.sqrt(4));  //2
// console.log(Math.cbrt(8));   //2
// console.log(Math.log10(20));   //1.3010
// console.log(Math.floor(0.1)) //0 // returns the greatest integer less than or equal to its numeric value
// console.log(Math.floor(-0.1)) //-1
// console.log(Math.floor(-3.4)) //-4
// console.log(Math.floor(2.3)) // 2
// console.log(Math.ceil(0.1)) //1 //returns the smallest integer greater than or equal to its numeric value
// console.log(Math.ceil(-0.1)) //0
// console.log(Math.ceil(-3.4)) //-3
// console.log(Math.ceil(2.3)) // 3
// console.log(Math.random()) //generates a random number between 0 and 1 (0 included & 1 excluded) (0<=x<1)
// THE GENERAL FORMULA TO GENERATE RANDOM NUMBERS BETWEEN X AND Y IS :
// Math.floor((Math.random()*(max-min+1))) + min (max and min are included)
// Q. WAP TO GENERATE RANDOM NUMBERS BETWEEN 1 AND 10 --> console.log(Math.floor(Math.random()*8)+2);
// Q. WAP TO GENERATE RANDOM NUMBERS BETWEEN -1 AND -10 --> console.log(Math.floor(Math.random()*(-2+9+1))-9);
// Q. WAP TO GENERATE RANDOM NUMBERS BETWEEN -10 AND 10(including) -->console.log(Math.floor(Math.random()*(10-(-10)+1))+(-10));