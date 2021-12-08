fs = require('fs');
let {sharedSignalCount} = require('./Day8Const.js');
fs.readFile('Day8.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');
	let length = lines.length;
    const digits = {
        2: [1],
        4: [4],
        3: [7],
        7: [8]
    };


    let count = 0;
    let keys = {};
    lines.forEach(line => {
        let pattern = /(.+)\s\|\s(\w+)\s(\w+)\s(\w+)\s(\w+)/;
        const note = line.match(pattern);
        for (let i = 2; i < 6; i++) {
            if (digits[note[i].length])
                count++;

        }
    });

    console.log("P1:", count)

});