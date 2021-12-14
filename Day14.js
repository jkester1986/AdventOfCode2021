fs = require('fs');
fs.readFile('Day14.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	const lines = data.split('\n');
	const template = lines.shift().split('');

    lines.shift();

    const inserts = {};
    const letters = new Set();

    lines.forEach(line => {
        const mapping = line.split(" -> ");
        inserts[mapping[0]] = mapping[1];
        letters.add(mapping[1]);
    });

    let iterations = 0;
    while (iterations < 10) {
        let start = 0;
        while(start < template.length-1) {
            let val = template[start] + template[start + 1];
            template.splice(start + 1, 0, inserts[val]);
            start += 2;
        }
        iterations++;
        // console.log(template.join(''));
    }

    const final = template.join('');
    let highest = { amt: 0 };
    let lowest = { amt: 0 };
    letters.forEach(letter => {
        let pattern = new RegExp(letter, 'g');
        let total = final.match(pattern).length;
        if (total > highest.amt) {
            highest = {
                letter,
                amt: total
            }
        }
        if (total < lowest.amt || lowest.amt === 0) {
            lowest = {
                letter,
                amt: total
            }
        }
    });

    console.log(highest.amt - lowest.amt)

});
