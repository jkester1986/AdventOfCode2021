fs = require('fs');
fs.readFile('Day7.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let crabs = data.split(',').map(Number).sort((a, b) => a > b);
    let length = crabs.length;
    let highInd = crabs[length-1];
    let lowInd = 0;

    console.log(crabs[0], crabs[length-1])

    let counter = crabs[0];
    let fuelCost = 0;
    let p2fuelCost = 0;

    while(counter <= crabs[length-1]) {
        let currFuel = 0;
        let currP2Fuel = 0;
        for(let i = 0; i < length; i++) {
            let steps = Math.abs(crabs[i] - counter);
            currFuel += steps;
            currP2Fuel += (steps*steps+steps)/2;
        }
        counter++;
        if(currFuel < fuelCost || fuelCost === 0) {
            fuelCost = currFuel;
        }
        if(currP2Fuel < p2fuelCost || p2fuelCost === 0) {
            p2fuelCost = currP2Fuel;
        }
    }
    console.log("P1:", fuelCost);
    console.log("P2:", p2fuelCost);
});