var moment = require('moment')
var express =  require('express')
var app = new express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var math = require('math')
var fs = require('fs')
var _ = require('underscore')
var TX = require('./tx.js')
var Chain = require('./chain.js')

var drivers = [{name:'j', distance:15},{name:'n', distance:26}, {name:'L', distance:2}]
class Account {
    constructor(type, email, paypal, usdWallet, vncWallet) {
      this.type = type
      this.email = email
      this.paypal = paypal
      this.usdWallet = {
        address:'',
        balance: 0
      },
      this.vncWallet = {
        address:'',
        balance: 0
      }
    }
 }

var newAccount = new Account('c', 'kalebjordanwilson@gmail.com',)
console.log('new account \n');
exports.findClosestDriver=() => {
  var sorted = _.sortBy(drivers, 'distance')
  var closest = sorted[0]
  return closest
};
var findClosestWarehouse=() => {}


var initOrderTransaction=(amount, driver) => {

}

var fulfillInitTransaction=(customer, usd, vindi) => {};

var calculateHash = (block) => {
  const secret = block.timestamp;
  const hash = crypto.createHmac('sha256', secret)
                   .update(block.index + block.data + block.previousHash)
                   .digest('hex');
  return hash
}

var driverCryptoLoad=(closestDriver, customer) => {}

var driverCryptoExchange = (vnc, driver) => {}

var fulfillDriverCryptoExchange = (receivedTransaction) => {}

var verifyDriverPurchase = (driverLocation, storeLocation, orderAmount, loadAmount, purchaseAmount, timestamp, receiptSvan) => {

}

var getDriverLocation = () => {}

var createAccountObject = (email, card, city, type) => {
  var acc  = {
    email:email,
    usdWalletId:''
    vncWalletId:'',
    city: city,
    type:type
  }
}

var closestBid = (locations) => { return locations }

class VindiOrderContract{
  constructor(vncWalletId, usdWalletId, email, city, drivers, order, calculateHash,createAccountObject) {
    vncWalletId: 0,
    usd:
    this.calculateHash: calculateHash()
    this.email = email
    this.createAccountObject: createAccountObject(this.email,card, this.city, type)

  }
}

var OrderContract = {
  order:'',
  usdValue:'',
  vncValue:'',
  createTransaction: TX.createTransaction(),
  newBlock: Chain.Block(),
  blockchain:Chain.blockchain,
  getPaypalBalance: '',
  sendFromPaypal:'',
  orderSpecs: function (email, city, deliveryAddress, drivers, vncWalletId, usdWalletId){
    return {}
  }


}
