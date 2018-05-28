var crypto = require('crypto')
var machineId = require('machine-id');

var storgArray = []
var storg = {

}

var getStorgIndex = (array) => {
  var index = array.length
  return index
}

console.log('getStorgIndex =>', getStorgIndex(storgArray), '\n');

var getHashKey = (data, getStorgIndex) => {
  const secret = getStorgIndex.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(data)
                   .digest('hex');
  console.log('Hash Key Generated');
  return hash
}


var testkey = getHashKey('f', getStorgIndex(storgArray))
console.log('Key:', testkey, '\n');

var makeKeyValueHash = (key, data, index) => {
  storg[key] = {
    [index]: data
  }
  var obj = storg[key]
  storgArray[index] = {[key]:obj[index]}
  // console.log('storg', storg);
  return storgArray
}

console.log('makeKeyValueHash \n HASH 1 \n', makeKeyValueHash(testkey, 'f', getStorgIndex(storgArray)), '\n');
console.log('\n HASH 2 \n', makeKeyValueHash(getHashKey('f3', getStorgIndex(storgArray)), 'f3', getStorgIndex(storgArray)));
console.log(machineId());
