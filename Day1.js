fs = require('fs');
fs.readFile('Day1.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n').map(Number);
	let length = lines.length;

    let increases = 0;
    lines.forEach((depth, i) => {
        if (i > 0 && depth > lines[i-1]) {
            increases++;
        }
    });

    let prev = 0;
    let increases2 = 0;
    const maxIndex = length - 2;
    lines.forEach((depth, i) => {
        if (i < maxIndex) {
            let newVal;
            newVal = depth + lines[i +1] + lines[i+2];
            if (i > 0 && newVal > prev) {
                increases2 ++;
            }
            prev = newVal;
        }
    });

    console.log("P1:", increases);
    console.log("P2:", increases2)
});
