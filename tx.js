var moment = require('moment')
var express =  require('express')
var app = new express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var math = require('math')
var fs = require('fs')

var txOuts = [{id:'0x000001100',from:'gen', address:'jordan', value:100000}] // all tax outs

class txOut {
  constructor(spend, from, address, value, currency, deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp) {

      this.spend = spend
      this.currency = currency
      this.address= from,
      this.from= from,
      this.value = spend.value - value,
      // this.id= makeTxId(from, [`value`], address)
      this.deliveryAddress = deliveryAddress
      this.Warehouse = Warehouse
      this.driver = driver
      this.driverLocation = driverLocation
      this.orderDetails = orderDetails
      this.timestamp = timestamp


  }
}

class txIn {
    constructor(spend, address, value, currency,  deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp) {
        this.spend = spend,
        this.fromId= spend.id,
        this.from= spend.address,
        this.address= address,
        this.value = value,
        // this.id= makeTxId(address, [`value`], `from`)
        this.deliveryAddress = deliveryAddress
        this.Warehouse = Warehouse
        this.driver = driver
        this.driverLocation = driverLocation
        this.orderDetails = orderDetails,
        this.timestamp = timestamp

    }
  }


var createTransaction = (spend, from, address, value, currency, deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp) => {

  var TXOUT = new txOut(spend, from, address, value, currency, deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp)
  var TXIN = new txIn(spend, address, value, currency,  deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp)
  return [TXOUT, TXIN]
}
console.log(createTransaction(txOuts[0], 'jordan', 'driver', 20, 'vnc', '950 delware ave dayton, tn', 'Dollar General', 'smedriver', 'somehwere ave. dayton tn', 'tide,liquid ,32oz.', moment().format('X')));
