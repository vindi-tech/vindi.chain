var moment = require('moment')
var express =  require('express')
var app = new express()
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var math = require('math')
var fs = require('fs')
const crypto = require('crypto')
var txOuts = [{id:'0x000001100',from:'gen', address:'jordan', value:100000}] // all tax outs

class txOut {
  constructor(spend, from, address, value, currency, deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp, dataType) {

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
    constructor(spend, address, value, currency, driver, driverLocation, orderDetails, timestamp) {
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




exports.createTransaction = (spend, from, address, value, currency, deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp) => {

  var TXOUT = new txOut(spend, from, address, value, currency, deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp)
  var TXIN = new txIn(spend, address, value, currency,  deliveryAddress, Warehouse, driver, driverLocation, orderDetails, timestamp)
  return [TXOUT, TXIN]
}

var calculateHashForData = (data, market, value, key) => {
  const secret = key.toString()
  const hash = crypto.createHmac('sha256', secret)
                   .update(data.toString())
                   .digest('hex');
  return hash
}
var calculateHashForDataTX = (data, address, value, timestamp) => {
  const secret = address.toString();
  const hash = crypto.createHmac('sha256', secret)
                   .update(data.toString() + value.toString() + timestamp.toString())
                   .digest('hex');
  return hash
}

/*
addData - function that creates a data bject from new user data
*/
var addData = (data, market, value, description,key) => {
  var genisis = {
    data: data,
    market:market,
    value: value,
    description:description
  }
  genisis.hash = calculateHashForData(genisis.data.toString(), market, value, key)
  return genisis
}
3

/*
BitGenisis - a constructor for creating a transaction containing user data to be used too exchange with peers for free or for price on the market
*/
class BitTX {
    constructor(data, address, currency, key, peers, security, timestamp, hash, value) {

        this.from= address
        this.address= address
        this.data = data
        this.timestamp = timestamp
        this.value= this.data.value
        this.hash = calculateHashForDataTX(data, address, this.value, timestamp)
    }
  }

console.log(new BitTX(addData({name:'jordan'}, 'sell', 0, 'usd','ocx'), 'joordan', 'usd','k', 'p','s', moment().format('x'),) );
