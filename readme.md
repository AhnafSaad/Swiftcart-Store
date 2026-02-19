
---

## 1) Null এবং Undefined এর পার্থক্য

* **Null**:  Null হলো একটি **intentional বা মানসিকভাবে দেওয়া শূন্য মান**।
* **Undefined**: Undefined হলো **ভ্যারিয়েবল ডিক্লেয়ার করা হয়েছে কিন্তু কোনো মান assign করা হয়নি**।

---

## 2) map() ফাংশনের ব্যবহার এবং forEach এর থেকে পার্থক্য

* **map()**:  array এর প্রতিটি element এ operation করতে এবং **নতুন array তৈরি করতে** ব্যবহার করা হয়।

```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

* **forEach()**:  array এর প্রতিটি element এ operation করতে দেয়, **কিন্তু কোনো নতুন array return করে না**।

```javascript
const numbers = [1, 2, 3];
numbers.forEach(n => console.log(n * 2));
```

---

## 3) == এবং === এর পার্থক্য

* **== (Equality Operator)**:  Value check করে, **type check করে না**। Type mismatch থাকলে auto conversion হয়।

* **=== (Strict Equality Operator)**:  Value এবং type **দুইটোকেই check করে**।

---

## 4) Async/Await এর গুরুত্ব API data fetch এ

* **async/await** ব্যবহার করা হয় **asynchronous operation সহজভাবে লিখতে**, যাতে promise-based API calls **synchronous এর মতো readable হয়**।

```javascript
async function JahidData() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    console.log(data);
}

JahidData();
```

---

## 5) JavaScript এ Scope এর ধারণা

* **Scope** হলো কোডের সেই এলাকা যেখানে **ভ্যারিয়েবল অ্যাক্সেস করা যায়**।

### 1. Global Scope

স্ক্রিপ্টের যেকোনো জায়গা থেকে অ্যাক্সেস করা যায়।

```javascript
let globalVar = 'আমি global';
function test() {
    console.log(globalVar);
}
test(); // আমি global
```

### 2. Function Scope

শুধুমাত্র function এর ভিতর থেকে অ্যাক্সেস করা যায়।

```javascript
function myFunc() {
    let localVar = 'Hello local';
    console.log(localVar);
}
myFunc();
```

### 3. Block Scope

শুধু block (if, for, while) এর ভিতর থেকে অ্যাক্সেস করা যায়।

```javascript
if(true){
    let blockVariable = 'I am calling you variable'; 
    console.log(blockVariable);
}
```

---


