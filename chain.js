var moment = require('moment')
var express =  require('express')
var app = new express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var math = require('math')
var fs = require('fs')
var events = require('events')
var emitter = new events.EventEmitter()
var contract = require('./contract.js')
var blockchain = [{
    index: 0,
    deliveryAddress: 'wm',
    Warehouse: 'l',
    driver: { name: 'L', distance: 2 },
    driverLocation: '1.23,123.2',
    timestamp: '1526528661',
    transactions: [],
    prevPreviousNoonce: 0,
    prevNoonce: 1,
    noonce: 1,
    arrival: true }]
emitter.on('arrival', (driver) => {console.log('DRIVER', driver);})

module.exports = class Block {
  constructor(index, previousHash, noonce, prevNoonce, prevPreviousNoonce, deliveryAddress, Warehouse, driver, driverLocation, customer, timestamp, transactions) {

      this.index = index
      // this.id= makeTxId(from, [`value`], address)
      this.deliveryAddress = deliveryAddress
      this.Warehouse = Warehouse
      this.driver = driver
      this.driverLocation = driverLocation
      this.timestamp = timestamp
      this.transactions = []
      this.prevPreviousNoonce = prevPreviousNoonce
      this.prevNoonce =prevNoonce
      this.noonce = prevNoonce + prevPreviousNoonce
      this.customer = customer
      // this.arrival = emitter.emit('arrival', driver)
  }
}

var newBlock = new Block(blockchain.length,'','', blockchain[blockchain.length - 1].noonce, blockchain[blockchain.length - 1].prevNoonce,'wm', 'l', contract.findClosestDriver(),'1.23,123.2','alice', moment().format('X'))
blockchain.push(newBlock)
console.log(blockchain);
console.log(contract.findClosestDriver());

var verifyOpenBlck = (block) => {
  if (blockchain[block].transactions.length < 10) {
    console.log('block open');
    return true
  } else {
    console.log('block full');
    return false
  }
}

var findBlock = (index) => {
  return blockchain[index]
}
