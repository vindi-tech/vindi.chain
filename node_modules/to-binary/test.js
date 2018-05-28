var toBinary = require('./toBinary')
var test = require('tape')

test('toBinary tests', function(t) {
	t.plan(2)
	t.deepEqual(toBinary(98), '01100010')
	var ch = 'k'
	var ascii = ch.charCodeAt(0) 
	t.deepEqual(toBinary(ascii), '01101011')
})