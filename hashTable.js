var crypto = require('crypto')
var nodeMachine = require('node-machine-id')
var storgArray = []
var storg = {


}

var getStorgIndex = (array) => {
  var index = array.length
  return index
}

console.log('getStorgIndex =>', getStorgIndex(storgArray), '\n');

var getHashKey = (data, getStorgIndex) => {
  const secret =nodeMachine.machineIdSync().toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(data + getStorgIndex)
                   .digest('hex');
  console.log('Hash Key Generated');
  return hash
}


var testkey = getHashKey('f', getStorgIndex(storgArray))
console.log('Key:', testkey, '\n');
var mID = nodeMachine.machineIdSync()
var makeKeyValueHash = (key, data, index) => {

  storg[key] = {
      value: data,
      location:mID,
      index: index
    }
  storgArray[index] = {
    [key]:{
    value: data,
    location:mID
  }
  }
  console.log('storg', storg);
  return storgArray
}

console.log('\n HASH 2 \n', makeKeyValueHash(getHashKey('f3', getStorgIndex(storgArray)), 'f3', getStorgIndex(storgArray)));
console.log(nodeMachine.machineIdSync());
console.log('\n HASH 2 \n', makeKeyValueHash(getHashKey('f3', getStorgIndex(storgArray)), 'f3', getStorgIndex(storgArray)));
