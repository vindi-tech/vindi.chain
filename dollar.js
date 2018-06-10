var moment = require('moment')
var express =  require('express')
var app = new express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var math = require('math')
var fs = require('fs')
var Binary = require('tobinary')
var crypto = require('crypto')
var brain = require('brain.js')

var txChain = [
  {
    from:'genisis',
    address : "fbf8cfc869a1fe24ff876af3d2d4d530b4dbfbead27cd9332ae74abab0176165",
    signature:'genisis',
    amount: 100000,
  },
] // a chain of transactions not the blockchain


class MockPayPalAccount{
  constructor(email, password, credential) {
    this.email = email
    this.password = password
    this.credential = credential
    this.transactions = [];
    this.balance = 0.51
  }
}

class Account{
  constructor(type,email, paypalPassword, credential, paypal, balance) {
    this.type = type
    this.paypal = new MockPayPalAccount(email, paypalPassword, credential)
    this.email = email
    this.credential = credential
    this.balance = 0
  }
}

/*
makePrivateKey {function} - meant to create a private key based off of account info using SHA256
@param - yourAccount {object} - your account created from the {class} Account
*/
var makePrivateKey = (yourAccount) => {
  const secret = yourAccount.paypal.password.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(yourAccount.email)
                   .digest('hex');
  return hash
}

/*
makePubicKey {function} - meant to create a public key based off of private key and account info info using SHA256 and is used to sign transactions
@param - privateKey {string} - your private key generated from the {function} makePrivateKey
*/
var makePublicKey = (privateKey) => {
  const secret = privateKey.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(moment().format('x') + privateKey)
                   .digest('hex');
  return hash
}


var makePublicAddress = (privateKey, publicKey) => {
  const secret = privateKey.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(publicKey)
                   .digest('hex');
  return hash
}


var makeWallet = (yourAccount) => {
  var privateKey = makePrivateKey(yourAccount)
  var publicKey = makePublicKey(privateKey)
  var publicAddress = makePublicAddress(privateKey, publicKey)
  fs.writeFile(`C:/Users/jmhayes95/Documents/vindi.chain/wallets/ `+`${publicAddress}`, 'Hello', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
  return publicAddress
}


var calculateHashForTX = (signature, address, amount) => {
  const secret = signature.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update([address, amount].toString())
                   .digest('hex');
  return hash
}

var testAccount = new Account('maker', 'kalebjordanwilson@gmail.com', 'fakekey', 'api020393');
var testPrivateKey = makePrivateKey(testAccount)
var testPublicKey = makePublicKey(testPrivateKey)
var testPublicAddress = makePublicAddress(testPrivateKey, testPublicKey)
console.log('testPrivateKey \n',testPrivateKey);

console.log('\ntestPublicKey \n',testPublicKey);

console.log('\ntestPublicAddress \n',testPublicAddress);

console.log('makeWallet', makeWallet(testAccount));


class TxIn {
  constructor(spent, address, amount, publicKey) {
    this.spent = spent
    this.address = address
    this.amount = amount

    this.hash = calculateHashForTX(publicKey, address, amount)
  }
}

class USTXO {
  constructor(spent, privateKey, timestamp) {
    this.spent = spent
    this.address = spent.address
    this.amount = spent.amount
    this.timestamp= moment().format('X')
    this.hash = calculateHashForTX(privateKey, `address`, `amount`)
  }
}

var testTxIn = new TxIn('', testPublicAddress, 20, testPublicKey)
console.log('\ntestTxIn\n', testTxIn);

var testUSTXO = new USTXO(txChain[0], testPrivateKey)
console.log('\ntestUSTXO\n', testUSTXO);



/* SEPERATE BELOW INTO OTHER FILE FOR AI*/

var binaryToDecimal = (binary) => {
  var string = binary
  var decimalString = '.' + binary
  return parseFloat(decimalString)
}
//
// var dec = binaryToDecimal(Binary('dayton'));
// console.log(binaryToDecimal(Binary(testPublicAddress.toString())));
//
//
// var testBinary = Binary(testPublicKey.toString())
// var binaryArray = []
// for (var i = 0; i < 12; i++) {
//   binaryArray.push(parseInt(testBinary[i]))
//   console.log(testBinary[i]);
// }
//
// var config = {
//     inputSize: 700,
//     inputRange: 100,
//     hiddenSizes:[20],
//     outputSize: 75,
//     learningRate: 0.01,
//     decayRate: 0.999,
//     activation: 'sigmoid', // activation function
//     hiddenLayers: [3],
// }
//
// var opts =  {
//                             // Defaults values --> expected validation
//       iterations: 1000,    // the maximum times to iterate the training data --> number greater than 0
//       log: true,
//       // errorThresh: 0.005,
//               // true to use console.log, when a function is supplied it is used --> Either true or a function
//       logPeriod: 4,        // iterations between logging out --> number greater than 0
//       learningRate: .0007,    // scales with delta to effect training rate --> number between 0 and 1
//       momentum: 0.6,        // scales with next layer's change value --> number between 0 and 1
//       callback: function() {
//         var output = net.run([.011001000110000100,.011001000110000100]); // falls apart when changing by small increments
//
//         console.log('output : ',output);
//
//       },       // a periodic call back that can be triggered while training --> null or function
//       callbackPeriod: 1,
//       timeout:0.0001
//         // the number of iterations through the training data between callback calls --> number greater than 0
//          // the max number of milliseconds to train for --> number greater than 0
// }
//
//
// var net = new brain.recurrent.RNN(config);
//
// var tData = [
//
//    { input:[ [0.011001000110000101, 0.011001000110000101, ],[0.011001000110000101, 0.011001000110000100]],output: [0.011001000110000101]},
//
//    { input: [[0.011001000110000100, 0.011001000110000100, ],[0.011001000110000100, 0.011001000110000101]],output: [0.011001000110000100]},
//
//    { input:[ [0.011001000110000101, 0.011001000110000101, ],[0.011001000110000101, 0.011001000110000100]],output: [0.011001000110000101]},
//
//    { input: [[0.011001000110000100, 0.011001000110000100, ],[0.011001000110000100, 0.011001000110000100]],output: [0.011001000110000100]},
//
// ];
//
//
// net.train(tData, opts);
//
//
//
// /*
// Test output
// */
//
// var output = net.run([[.011001000110000100,.011001000110000100],[.011001000110000100,.011001000110000100]]); // falls apart when changing by small increments
// console.log('output : ',output, );
// var json = net.toJSON();
// // console.log(json);
// console.log(txChain);
