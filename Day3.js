fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let bitLength = lines[0].length;
    let gamma = {}


    for (let i = 0; i < bitLength; i++) {
        gamma[`bit${i}`] = [0, 0];
    }

    lines.forEach(number => {
        for (let i = 0; i < bitLength; i++) {
            if(number.charAt(i) === "0")
                gamma[`bit${i}`][0]++;
            else
                gamma[`bit${i}`][1]++;
        }
    });

    let gammaCondensed = "";
    let epsilon = "";

    for (let i = 0; i < bitLength; i++) {
        const biggerBit = gamma[`bit${i}`][1] > gamma[`bit${i}`][0] ? 1 : 0;
        const smallerBit = biggerBit ? 0 : 1;
        gammaCondensed = gammaCondensed + biggerBit;
        epsilon = epsilon + smallerBit;
    }

    console.log("P1:", parseInt(gammaCondensed, 2) * parseInt(epsilon, 2))

    let oxygenKeeps = lines;
    let co2Keeps = lines;

    for (let i = 0; i < bitLength; i++) {
        let tempOxygenKeeps = [];
        let tempCo2Keeps = [];
        if (oxygenKeeps.length > 1) {
            let highestBit = findHighestBit(oxygenKeeps, i);
            oxygenKeeps.forEach(number => {
                if(number.charAt(i) === highestBit)
                tempOxygenKeeps.push(number);
            });
            oxygenKeeps = tempOxygenKeeps;
        }
        if (co2Keeps.length > 1) {
            let lowestBit = findLowestBit(co2Keeps, i);
            co2Keeps.forEach(number => {
                if(number.charAt(i) === lowestBit)
                tempCo2Keeps.push(number);
            });
            co2Keeps = tempCo2Keeps;
        }
    }
    const o2ScrubRating = parseInt(oxygenKeeps[0], 2);
    const co2ScrubRating = parseInt(co2Keeps[0], 2);

    console.log("P2:", o2ScrubRating * co2ScrubRating);
});

function findHighestBit(numbers, i) {
    let zeros = 0;
    let ones = 0;

    numbers.forEach(number => {
        if(number.charAt(i) === "0")
            zeros++;
        else
            ones++;
    });
    return zeros > ones ? "0" : "1";
}

function findLowestBit(numbers, i) {
    let zeros = 0;
    let ones = 0;

    numbers.forEach(number => {
        if(number.charAt(i) === "0")
            zeros++;
        else
            ones++;
    });
    return ones < zeros ? "1" : "0";
}