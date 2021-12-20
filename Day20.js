const { cloneDeep, size } = require('lodash');

fs = require('fs');
// cloneDeep = require('lodash/clonedeep');
fs.readFile('Day20.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n\n');
	let enhancementAlg = lines[0];

    let inputImage = lines[1].split('\n').map(line => line.split(''));

    let count = 0;
    let rounds = 50;
    let lightsOn = 0;
    addBorder(inputImage, '.');
    while (count < rounds) {
        const outputImage = cloneDeep(inputImage);
        const maxY = outputImage.length;
        const maxX = outputImage[0].length;
        for (let y = 0; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                // find surrounding points
                let embiggenPoint = getBinary(inputImage, x, y);
                outputImage[y][x] = enhancementAlg[embiggenPoint];
            }
            const row = outputImage[y].join('');
            if(count === rounds - 1) {
                lightsOn += (row.match(/#/g) || []).length
            }
        }

        inputImage = cloneDeep(outputImage);
        addBorder(inputImage, inputImage[0][0]);
        count++;
    }

    console.log("lights on:", lightsOn);
});

function addBorder(pic, border) {
    const size = 2;
    pic.forEach(line => {
        line.unshift(...Array(size).fill(border));
        line.push(...Array(size).fill(border))
    })
    const newRow = (Array(pic[0].length).fill(border));

    for (let i = 0; i < size; i++) {

        pic.unshift([...newRow]);
        pic.push([...newRow]);
    }

}

function getBinary(orig, x, y) {
    const defaultVal = orig[0][0];
    let bin1 = `${orig[y-1]?.[x-1] || defaultVal}${orig[y-1]?.[x] || defaultVal}${orig[y-1]?.[x+1] || defaultVal}`.replace(/\./g, '0').replace(/#/g, '1');
    let bin2 = `${orig[y]?.[x-1] || defaultVal}${orig[y]?.[x] || defaultVal}${orig[y]?.[x+1] || defaultVal}`.replace(/\./g, '0').replace(/#/g, '1');
    let bin3 = `${orig[y+1]?.[x-1] || defaultVal}${orig[y+1]?.[x] || defaultVal}${orig[y+1]?.[x+1] || defaultVal}`.replace(/\./g, '0').replace(/#/g, '1');

    return parseInt((bin1 + bin2 + bin3), 2)
}
