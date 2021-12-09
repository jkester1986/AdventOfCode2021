fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data.split('\n');

    const digits = {
        2: 1,
        4: 4,
        3: 7,
        7: 8
    };

    const sharedCharCountKey = {
        14: 0,
        10: 2,
        13: 3,
        11: 5,
        12: 6,
        15: 9
    }


    let count = 0;
    let totOutput = 0;
    lines.forEach(line => {
        let keys = new Map();
        let initialKeys = new Map();
        let unknownKey = new Set();
        let text = line.split(" ").filter(word => word !== "|").map(note => note.split('').sort((a, b) => a > b).join(''));
        let length = text.length;
        for (let i = 0; i < length; i++) {
            const note = text[i];
            const noteLength = text[i].length;
            const digit = digits[noteLength];
            if (digit) {
                // this is just for p1
                if (i > 9)
                    count++;

                if (!keys.has(note)) {
                    keys.set(note, digit);
                    initialKeys.set(note, digit);
                }
            }
            else {
                unknownKey.add(note);
            }
        }

        // iterate over what we don't know yet
        unknownKey.forEach(word => {
            let totShared = 0;
            initialKeys.forEach((_, key) => {
                let tempCount = getSharedCharCount(key, word);
                totShared += tempCount;
            })
            keys.set(word, sharedCharCountKey[totShared]);
        });

        // determine the last 4 digits
        let output = '';
        for (let i = 10; i < 14; i++) {
            output = output + keys.get(text[i]);
        }
        totOutput += parseInt(output);
    });

    console.log("P1:", count)
    console.log("P2:", totOutput)

});

// bc I'm lazy https://stackoverflow.com/a/55350977
function getSharedCharCount(str1, str2) {
    let count = 0;
    const obj = str2.split("");
    for(str of str1){
        let idx = obj.findIndex(s => s === str);
        if(idx >= 0){
        count++;
        obj.splice(idx, 1);
        }
    }
    return count;
}