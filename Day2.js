fs = require('fs');
fs.readFile('Day2.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');

    let pos = {
        depth: 0,
        horizontal: 0,
        aim: 0
    };

    lines.forEach(line => {
        const text = line.split(" ");
        const direction = text[0];
        const distance = parseInt(text[1]);

        switch(direction) {
            case "up":
                pos.aim -= distance;
                break;
            case "down":
                pos.aim += distance;
                break;
            case "forward":
                pos.horizontal += distance;
                pos.depth += pos.aim * distance;
                break;
        }
    });

    console.log("P2:", pos.depth*pos.horizontal);
});