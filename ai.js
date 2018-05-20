var brain = require('brain.js')

var config = {
    inputSize: 20,
    inputRange: 100,
    hiddenSizes:[20],
    outputSize: 75,
    learningRate: 0.01,
    decayRate: 0.999,
    activation: 'sigmoid', // activation function
    hiddenLayers: [3],
}

var opts =  {
                            // Defaults values --> expected validation
      iterations: 1000,    // the maximum times to iterate the training data --> number greater than 0
      log: true,
      // errorThresh: 0.005,
              // true to use console.log, when a function is supplied it is used --> Either true or a function
      logPeriod: 4,        // iterations between logging out --> number greater than 0
      learningRate: .0007,    // scales with delta to effect training rate --> number between 0 and 1
      momentum: 0.6,        // scales with next layer's change value --> number between 0 and 1
      callback: function() {
        var output = net.run(); // falls apart when changing by small increments

        console.log('output : ',output);

      },       // a periodic call back that can be triggered while training --> null or function
      callbackPeriod: 1,
      timeout:0.0001
        // the number of iterations through the training data between callback calls --> number greater than 0
         // the max number of milliseconds to train for --> number greater than 0
}


var net = new brain.recurrent.LSTM(config);

/*
tData
{array} example 1raining data
*/

// { input: 'develop ai', output: 'software' },
// { input: 'schedule an interview with chase', output: 'ceo' },
// { input: 'which city has the most warehouses', output: 'coo' },
// { input: 'develop ai', output: 'software' },
// { input: 'schedule an interview with chase', output: 'ceo' },
// { input: 'which city has the most warehouses', output: 'coo' },
// { input: 'plan blockchain project', output: 'Project Management' },
// { input: 'plan driver hiring project', output: 'Project Management' },
// { input: 'develop ai', output: 'software' },
// { input: 'schedule an interview with chase', output: 'ceo' },
// { input: 'which city has the most warehouses', output: 'coo' },
// { input: 'develop ai', output: 'software' },
// { input: 'schedule an interview with chase', output: 'ceo' },
// { input: 'which city has the most warehouses', output: 'coo' },
// { input: 'plan blockchain project', output: 'Project Management' },
// { input: 'plan driver hiring project', output: 'Project Management' },
// { input: 'develop ai', output: 'software' },
// { input: 'schedule an interview with chase', output: 'ceo' },
// { input: 'which city has the most warehouses', output: 'coo' },
// { input: 'develop ai', output: 'software' },
// { input: 'schedule an interview with chase', output: 'ceo' },
// { input: 'which city has the most warehouses', output: 'coo' },
// { input: 'plan blockchain project', output: 'Project Management' },
// { input: 'plan driver hiring project', output: 'Project Management' },
// { input: 'schedule an interview with neetesh', output: 'ceo' },
var tData = [

   { input: '{name : jordan}', output: 'basic info' },
   { input: 'balance : 201', output: 'Account Info' },
   { input: 'sender : k, value: 10, to:b', output: 'TX Info' },


];


net.train(tData, opts);



/*
Test output
*/

var output = net.run('{name:lue}'); // falls apart when changing by small increments
console.log('output : ',output);
var json = net.toJSON();
// console.log(json);
