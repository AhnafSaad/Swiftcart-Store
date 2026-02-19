Markdown
## 1) Null এবং Undefined এর পার্থক্য কী?

* **`undefined`**: এর মানে হলো একটি ভ্যারিয়েবল তৈরি (declare) করা হয়েছে, কিন্তু এখনো তাতে কোনো ভ্যালু অ্যাসাইন করা হয়নি। জাভাস্ক্রিপ্ট নিজে থেকেই একে `undefined` হিসেবে ধরে নেয়।
* **`null`**: এটি একটি **ইচ্ছাকৃতভাবে (intentionally)** সেট করা খালি ভ্যালু। অর্থাৎ, ডেভেলপার নিজে থেকে বুঝিয়ে দিচ্ছেন যে এই ভ্যারিয়েবলটিতে বর্তমানে কোনো ভ্যালু নেই বা এটি ফাঁকা।

**উদাহরণ:**
```javascript
let myName;
console.log(myName); // Output: undefined

let myAge = null;
console.log(myAge); // Output: null (ইচ্ছাকৃতভাবে ফাঁকা রাখা হয়েছে)
2) JavaScript-এ map() ফাংশনের কাজ কী? এটি forEach() থেকে কীভাবে আলাদা?
উভয় ফাংশনই অ্যারের (array) প্রতিটি উপাদানের (item) ওপর কাজ করতে ব্যবহৃত হয়, তবে এদের মধ্যে একটি বড় পার্থক্য রয়েছে:

map(): এটি অ্যারের প্রতিটি উপাদানের ওপর কাজ করে এবং সেই ফলাফলের ওপর ভিত্তি করে সম্পূর্ণ নতুন একটি অ্যারে রিটার্ন করে।

forEach(): এটি অ্যারের প্রতিটি উপাদানের ওপর কাজ করে ঠিকই, কিন্তু কোনো নতুন অ্যারে রিটার্ন করে না (এটি undefined রিটার্ন করে)।

উদাহরণ:

JavaScript
const numbers = [1, 2, 3];

// map() নতুন একটি অ্যারে তৈরি করে
const doubled = numbers.map(num => num * 2);
console.log(doubled); // Output: [2, 4, 6]

// forEach() শুধু কাজ করে, নতুন কোনো অ্যারে তৈরি করে না
numbers.forEach(num => console.log(num * 2)); 
// Output: 2, 4, 6 প্রিন্ট করবে
3) == এবং === এর পার্থক্য কী?
== (Loose Equality): এটি শুধুমাত্র দুটি ডেটার Value (মান) চেক করে। যদি দুটির Data Type আলাদা হয় (যেমন একটি নাম্বার এবং অন্যটি স্ট্রিং), তবে এটি নিজে থেকেই টাইপ পরিবর্তন করে ভ্যালু মেলানোর চেষ্টা করে।

=== (Strict Equality): এটি ডেটার Value এবং Data Type—দুটোই কঠোরভাবে চেক করে। এটি নিজে থেকে কোনো টাইপ পরিবর্তন করে না।

উদাহরণ:

JavaScript
console.log(5 == "5");  // Output: true (কারণ দুটির ভ্যালু দেখতে একই)
console.log(5 === "5"); // Output: false (কারণ একটি Number এবং অন্যটি String)
4) API ডেটা ফেচ করার ক্ষেত্রে async/await এর গুরুত্ব কী?
API থেকে ডেটা আসতে কিছুটা সময় লাগে (Asynchronous কাজ)।

গুরুত্ব: async/await ব্যবহার করলে কোড ডেটা আসা পর্যন্ত অপেক্ষা করে। এটি Asynchronous কোডগুলোকে সাধারণ ধাপে-ধাপে চলা (Synchronous) কোডের মতো সহজ ও পরিষ্কার করে তোলে, ফলে কঠিন .then() চেইন ব্যবহার করতে হয় না।

উদাহরণ:

JavaScript
async function getUserData() {
    // ইন্টারনেট থেকে ডেটা আসা পর্যন্ত অপেক্ষা করবে
    const response = await fetch('[https://api.example.com/user](https://api.example.com/user)'); 
    
    // ডেটা JSON ফরম্যাটে কনভার্ট হওয়া পর্যন্ত অপেক্ষা করবে
    const data = await response.json(); 
    
    console.log(data);
}
5) JavaScript-এ Scope এর ধারণা (Global, Function, Block) ব্যাখ্যা করুন।
Scope বলতে বোঝায় আপনার কোডের কোন কোন জায়গা থেকে একটি নির্দিষ্ট ভ্যারিয়েবলকে অ্যাক্সেস বা ব্যবহার করা যাবে তার সীমানা।

1. Global Scope
যে ভ্যারিয়েবল কোনো ফাংশন বা ব্লকের বাইরে ডিক্লেয়ার করা হয়। একে পুরো ফাইলের যেকোনো জায়গা থেকে ব্যবহার করা যায়।

JavaScript
let globalVar = "আমি যেকোনো জায়গায় কাজ করি!";

function showGlobal() {
    console.log(globalVar); // ঠিকভাবে কাজ করবে
}
2. Function Scope
যে ভ্যারিয়েবল একটি ফাংশনের ভেতরে ডিক্লেয়ার করা হয়। এটি শুধুমাত্র ওই ফাংশনের ভেতর থেকেই ব্যবহার করা যায়।

JavaScript
function mySecret() {
    let secretCode = 1234;
    console.log(secretCode); // এখানে কাজ করবে
}
// console.log(secretCode); // Error! বাইরে থেকে অ্যাক্সেস করা যাবে না।
3. Block Scope
যে ভ্যারিয়েবল কোনো সেকেন্ড ব্র্যাকেট বা ব্লকের { } (যেমন: if বা for লুপ) ভেতরে let বা const দিয়ে ডিক্লেয়ার করা হয়। এর সীমানা শুধুমাত্র ওই ব্লকের ভেতরেই থাকে।

JavaScript
if (true) {
    let weather = "Rainy";
    console.log(weather); // ব্লকের ভেতরে কাজ করবে
}
// console.log(weather); // Error! ব্লকের বাইরে কাজ করবে না।