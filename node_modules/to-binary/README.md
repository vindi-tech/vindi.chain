#toBinary

converts decimal to binary recursively

##installation
    npm install to-binary

##usage
```javascript
var toBinary = require('to-binary')
console.log(toBinary(98)) // => 01100010

var ch = 'k'
var ascii = ch.charCodeAt(0) 
console.log(toBinary(ascii)) // => 01101011
```