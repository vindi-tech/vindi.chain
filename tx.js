var moment = require('moment')
var express =  require('express')
var app = new express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var math = require('math')
var fs = require('fs')

var txOuts = [{id:'0x000001100',from:'gen', address:'jordan', value:100000}] // all tax outs

class txOut {
  constructor(spend, from, address, value, currency, deliveryAddress, Warehouse, driver, driverLocation, orderDetails) {

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


  }
}

console.log(new txOut(txOuts[0],'j', '00', 20, 'vnc', '950 Deleware Ave. Dayton, TN, 37321', 'Dollar General', 'jordan', '305 Some Ave. Dayton, TN', 'laundry detergent, tide, liquid, 52oz, botanical forest' ));
