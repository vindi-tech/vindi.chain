function toBinary(n) {
  return zeroFill(convertToBinary(n))
}

function convertToBinary(n) {
	if(n <= 1) {
		return String(n)
	} else {
		return convertToBinary(Math.floor(n/2)) + String(n%2)
	}
}

function zeroFill(value) {
  var length = value.length
  while(length < 8) {
    value = '0' + value
    length++
  }
  return value
}

module.exports = toBinary