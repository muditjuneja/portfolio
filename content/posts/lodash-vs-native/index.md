---
title: "Do you actually need lodash or underscore in your next JS project?"
date: 2021-01-29
slug: "/do-you-actually-need-lodash-or-underscore-in-your-next-js-project"
canonicalUrl: "https://muditjuneja.medium.com/do-you-actually-need-lodash-or-underscore-in-your-next-js-project-50403a564875"
---



> Lodash is a modern JavaScript utility library delivering modularity, performance & extras.

The same goes for **Underscore.js** as well. They are related in some way. Check an answer here:

> [https://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore/13898916#13898916](https://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore/13898916#13898916)

Here are some methods from Lodash which we often use. Most of the methods are now part of native Javascript implementation. Many times there is an advantage of using the **native implementation** as they are comparatively faster than functions imported as helper functions from libraries like Lodash or underscore. Also, there is always an **overhead** of using such libraries as they add significantly to the final **build size** of your application and there are times when even a few more KBs have a significant impact.

I will try to explain what native functions can be used in place of similar functions from Lodash/Underscore. I have integrated a “**repl”** that you can view/execute alongside your reading for better understanding.

I have also tried to include few working examples here along with the functions that we are discussing.

Working examples here

*   **fill(array, value, \[start=0\], \[end=array.length\])**: Fills elements of array with value from start-up to, but not including, end.

```
\_.fill(array, {a:1,b:2});  
console.log(array);  
//\[Object {a: 1, b: 2}, Object {a: 1, b: 2}, Object {a: 1, b: 2}\]
```

*   **findIndex(array, \[predicate=\_.identity\], \[fromIndex=0\])**: This method is like \_.find except that it returns the index of the first element predicate returns truthy for instead of the element itself.

*   **find(array, \[predicate=\_.identity\], \[fromIndex=0\])**: Iterates over elements of collection, returning the first element predicate returns truthy for. The predicate is invoked with three arguments: (value, index|key, collection).

```
let numbers = \[0,1,2,3,5,6,3\];  
console.log("index is : " + \_.findIndex(numbers,(item)=> item==3));  
// index is 3  
console.log("index is : " + \_.findIndex(numbers,function(item){  
    return item === 8;   // QUIZ : Ask why we are using tripple =  
}));  
// index is -1console.log("index is : " + numbers.findIndex((item)=> item==3));  
// index is 3console.log("element : " + \_.find(numbers,(item)=> item==3));  
// element  : 3  
// Examples of complex objects that is generally the case when fetching data via remote serverlet complexArray = \[{name:'mudit','age':26},{name:'jatin',age:24}\];  
let foundItem = \_.find(complexObjectArray,(item)=> item.name=='jatin');  
console.log("foundItemAgain : " + foundItem);  
//{name:'jatin',age:24}  
let foundItemAgain = complexObjectArray.find((item)=> item.name=='mudit');  
console.log("foundItemAgain : " + foundItemAgain);  
// {name:'mudit','age':26}Read more at : \[MDN\](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Array/find)
```

*   **nth(array, \[n=0\])**: Gets the element at index n of array. If n is negative, the nth element from the end is returned.

```
let numbers = \[0,1,2,3,5,6,3\];  
console.log(\_.nth(numbers, 1));  
// => '1'  
   
console.log(\_.nth(numbers, -2));  
// => 6';
```

> _\[TIP\] There is an advantage of using this helper function as it allows negative indexing which helps in finding the values in reverse order._

*   **remove(array, \[predicate=_.identity\]) or filter(collection, \[predicate=_.identity\])**: These funtions can be used to remove the items from the array based on a predicate/callback function. Remove function can get a bit risky as it is mutating the passed array value which is not the case with filter. Following examples can help :

```
let numbers = \[0,1,2,3,5,6,3\];  
console.log(\_.filter(numbers, item=>item!=3));  
// \[ 0, 1, 2, 5, 6 \]console.log(numbers.filter(item=>item!=3));  
// \[ 0, 1, 2, 5, 6 \]console.log(numbers);  
//\[ 0, 1, 2, 3,5, 6, 3\]console.log(\_.remove(numbers, item=>item!=3));  
//\[ 0, 1, 2, 5, 6 \]   
// This is the array of items that have been removedconsole.log(numbers);  
//\[ 3, 3 \]
```

*   **reverse(array)**: Reverses array so that the first element becomes the last, the second element becomes the second to last, and so on.

```
let numbers = \[0,1,2,3,5,6,3\];  
console.log(\_.reverse(numbers));  
// \[ 3,6,5,3,2,1,0 \]//Core Js methode available  
console.log(numbers.reverse();  
// \[ 3,6,5,3,2,1,0 \]
```

*   **every(collection, \[predicate=\_.identity\])**: Checks if predicate returns truthy for all elements of collection.

```
console.log("All bool : "\_.every(\[true, 1, null, 'yes'\], item=>typeof(item) == == 'boolean'));  
// falseconsole.log("All bool : " + \_.every(\[true, true, true, false\], item=>typeof(item) == 'boolean'));  
// truelet complexArray = \[{name:'mudit','age':26},{name:'jatin',age:24}\];  
let valid = \_.every(complexObjectArray,item=> item.name && item.age && item.colour);  
console.log("valid : ",valid);  
// valid : false
```

> _\[NOTE\] This method can be used to validate the entire array of objects when received from the front end._

*   **groupBy(collection, \[iteratee=\_.identity\])**: Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The corresponding value of each key is an array of elements.

```
let complexArray = \[{name:'mudit','age':26,city:'rampur'},{name:'jatin',age:24,city:'rampur'},{name:'raman',age:24,city:'gzb'}\];  
let grouped = \_.groupBy(complexObjectArray,'city');  
console.log("grouped : ",grouped);/\*  
grouped :  {  
  rampur: \[  
    { name: 'mudit', age: 26, city: 'rampur' },  
    { name: 'jatin', age: 24, city: 'rampur' }  
  \],  
  gzb: \[ { name: 'raman', age: 24, city: 'gzb' } \]  
}  
\*/  
grouped = \_.groupBy(numbers,item=>item%2==0);  
console.log("grouped : ",grouped);  
// grouped :  { true: \[ 0, 2, 6 \], false: \[ 1, 3, 5, 3 \] }
```

> _\[TIP\] This method can be used to with both arrays and objects to group them according to a propery or the iteratee or callback._

*   **map(collection, \[iteratee=\_.identity\])**: Creates an array of values by running each element in collection thru iteratee.

```
//Iteratee   
console.log(\_.map(\[4, 8\], item=>item\*item));  
// \[16, 64\]  
let complexArray = \[{name:'mudit','age':26},{name:'jatin',age:24}\];  
let newArrayAfterMap = \_.map(complexArray,item=>{  
  //Adding a new property to array  
  item.available = false;  
  return item;  
});  
console.log("newArrayAfterMap : ",newArrayAfterMap);/\*  
newArrayAfterMap :  \[  
  { name: 'mudit', age: 26, available: false },  
  { name: 'jatin', age: 24, available: false }  
\]  
\*///Core Js method available  
newArrayAfterMap = complexArray.map(item=>{  
  //Adding a new property to array  
  item.available = true;  
  return item;  
});/\*  
newArrayAfterMap :  \[  
  { name: 'mudit', age: 26, available: true },  
  { name: 'jatin', age: 24, available: true }  
\]  
\*/
```

*   **orderBy(collection, \[iteratees=\[\_.identity\]\], \[orders\])**: This method allows specifying the sort orders of the iteratees to sort by. If orders is unspecified, all values are sorted in ascending order. Otherwise, specify an order of “desc” for descending or “asc” for ascending sort order of corresponding values.

```
let users = \[  
  { 'user': 'fred',   'age': 48 },  
  { 'user': 'barney', 'age': 34 },  
  { 'user': 'fred',   'age': 40 },  
  { 'user': 'barney', 'age': 36 }  
\];  
   
// Sort by \`user\` in ascending order and by \`age\` in descending order.  
\_.orderBy(users, \['user', 'age'\], \['asc', 'desc'\]);  
// => objects for \[\['barney', 36\], \['barney', 34\], \['fred', 48\], \['fred', 40\]\]
```

> _\[TIP\] There are times that data being pulled from the server is not sorted accordingly. So you can use this method to sort your data in the browser according to the order required. Javascript code methods for sorting are not great._

*   **reduce(collection, \[iteratee=\_.identity\], \[accumulator\])**: Reduces a collection to a value which is the accumulated result of running each element in collection thru iteratee, where each successive invocation is supplied the return value of the previous. If the accumulator is not given, the first element of the collection is used as the initial value.

```
// Official  
console.log("sum :" + \_.reduce(\[1, 2\], function(sum, n) {  
  return sum + n;  
}, 0));  
// 3  
let sumValue = \[1,2\].reduce((sum,item)=>sum+item,0);  
console.log("sumValue : " + sumValue);  
//
```

*   **clone(value)**: Creates a shallow clone of value.

> \[QUIZ\] What is shallow cloning and deep cloning?

```
// Official  
let objects = \[{ 'a': 1 }, { 'b': 2 }\];  
   
let shallow = \_.clone(objects);  
console.log(shallow\[0\] === objects\[0\]);  
// true
```

*   **isArray(value)**: Checks if value is classified as an Array object.

```
// Official  
let arr = \[1,2,3\];  
console.log(\_.isArray(arr));  
// true// What is typeof(arr)?
```

*   **isDate(value) or isInteger(value) or isString(value)**: Checks if value is classified as an date,integer, or string.

```
// Official  
let d = 'Mon April 23 2012';  
console.log(\_.isDate(d));  
// trueconsole.log(new Date('Mon April 23 2012') != 'Invalid Date')
```

*   **isEqual(value)**: Performs a deep comparison between two values to determine if they are equivalent.

```
let object = { 'a': 1 };  
let other = { 'a': 1 };  
   
console.log\_.isEqual(object, other);  
// true  
   
console.log(object === other);  
//  false
```

> Lodash Documentation : [https://lodash.com/](https://lodash.com/)
> 
> Underscore Documentation : [https://underscorejs.org/](https://underscorejs.org/)

This is one of the great articles that is actually comparing these functions based on performance. Try to read this as well.

> [https://blog.bitsrc.io/you-dont-need-lodash-or-how-i-started-loving-javascript-functions-3f45791fa6cd](https://blog.bitsrc.io/you-dont-need-lodash-or-how-i-started-loving-javascript-functions-3f45791fa6cd)

That’s all folks!! Thanks for reading. Don’t forget to follow and clap if you get to know something new.
