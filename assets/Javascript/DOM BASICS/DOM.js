// DOM stands for Document Object Model.
// The DOM is a JavaScript representation of that HTML as a tree of objects.
// JavaScript uses the DOM to read, change, add, or remove HTML elements.
// Without the DOM, JavaScript cannot interact with the webpage.
// The DOM lets JavaScript:
// Read HTML content.
// Change text and styles.
// Respond to user actions (button clicks, typing, etc.).
// Create new elements.
// Delete existing elements.
// Select an element
// Change HTML and CSS

// Linking js to html
// body tag mai atlast
//{ <script src="file_name"></script>}
// src is used to connect js and is also used in the img tag

// whatever will be consoled in the js will be visible on inspect->console

// Element selection  --> opening tag + data inside + closing tag together form a element
// As in the js all of the elements are stored in a Nodelist, it has a length property
// we use innerText when we specifically want the text content, not the whole DOM element.
// querySelector()
// Returns the first matching element.
// The return type is a single Element (or null if nothing matches).
// querySelectorAll()
// Returns all matching elements.
// The return type is a NodeList.
// console.log(x); → The whole <h1> element.
// console.log(x.innerText); → Only the text (Hello).
// console.log(x.innerHTML); → The HTML inside the element (Hello).
// console.log(x.outerHTML); → The complete HTML (<h1>Hello</h1>).
// Standard way to change an element's inline CSS using JavaScript.
// The syntax is:
// element.style.property = "value";
// Standard way to change an HTML using JavaScript.
// The syntax is:
// element.innerText → When you want to change only the visible text.
// element.innerTEXT =  "<h1>CO<sub>2</sub></h1>" --> <h1>CO<sub>2</sub></h1>(output)
// element.innerHTML → When you want to add or replace HTML elements (tags like <b>, <i>, <img>, <button>, etc.).
// jo tag pass kiya hai uske bich wali chizen replace hoti hai
// element.innerHTML =  "<h1>CO<sub>2</sub></h1>" --> CO₂ (output)

// An event listener is a way to tell JavaScript:
// "When a particular event happens on this element, run this function."
// to add a event listener we use element.addEventListener 
// it takes two values as arguments just like setTImeout()
// first argument is ("event",function)
// z.addEventListener("click",
//     function() {
//         setTimeout(
//             function() {
//                 z.innerHTML = "text is changed..."
//             }
//         ,3*1000)
//     } 
// )     //on click after 3 seconds change the text

// Event	    When it fires
// mouseenter	Once when the mouse enters the element.
// mouseleave	Once when the mouse leaves the element.
// mousemove	Every time the mouse moves inside the element.
// mouseover	When the mouse enters the element (and also when moving into child elements).
// mouseout	    When the mouse leaves the element (or enters a child element).

// modifying different elements while performing events on another element
// for ex. there are two elements (let h1 & h2) changing the color of h1 while clicking on h2
// z.addEventListener("click",
//     () => {
//         y.style.color = "white";
//     }
// )         //whenever the zth element is clicked perform the following operation on y

// Generating random colors among all of the colors available
// rgb is not a js function
// JS expects the color as a string.
// c.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

// multiple elements in JavaScript, we mean selecting more than one HTML element at the same time.
// There are three main ways to do this:
// Method	                Returns	        Example
// getElementsByClassName()	HTMLCollection	document.getElementsByClassName("box")
// getElementsByTagName()	HTMLCollection	document.getElementsByTagName("div")
// querySelectorAll()	    NodeList	    document.querySelectorAll(".box")

// event --> "dblclick"  (double-click)

// customcursor
// a custom cursor is an element (usually a <div>) that follows the real mouse pointer.You move it using the
// mousemove event

// For mouse events like click, mousemove, mouseenter, etc. the eveent object contains the mouse coordinates
// main.addEventListener("click",
//     function(dets) {
//         console.log(dets.clientX, dets.clientY);
//     }
// )
