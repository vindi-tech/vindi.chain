var moment = require('moment')
var express =  require('express')
var app = new express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var math = require('math')
var fs = require('fs')

var crypto = require('crypto')


class MockPayPalAccount{
  constructor(email, password, credential) {
    this.email = email
    this.password = password
    this.credential = credential,
    this.transactions = [];
    this.balance = 0.51
  }
}

class Account{
  constructor(type,email, paypalPassword, credential, paypal,) {
    this.type = type
    this.paypal = new MockPayPalAccount(email, paypalPassword, credential)
    this.email = email
    this.credential = credential
  }
}

var makePrivateKey = (yourAccount) => {
  const secret = yourAccount.paypal.password.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(yourAccount.email)
                   .digest('hex');
  return hash
}

var makePublicKey = (privateKey) => {
  const secret = privateKey.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(privateKey)
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
var testAccount = new Account('maker', 'kalebjordanwilson@gmail.com', 'fakekey', 'api020393');
var testPrivateKey = makePrivateKey(testAccount)
var testPublicKey = makePublicKey(testPrivateKey)
var testPublicAddress = makePublicAddress(testPrivateKey, testPublicKey)
console.log('testPrivateKey \n',testPrivateKey);

console.log('\ntestPublicKey \n',testPublicKey);

console.log('\ntestPublicAddress \n',testPublicAddress);

var convertToTXO = (TxIn) => {

}

class TxIn {
  constructor(spent, address, amount, publicKey) {

  }
}
