fs = require('fs');
fs.readFile('Day6.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let fishes = data.split(',').map(num => {
        return new LanternFish(Number(num))
    });


    let newFishes = [];
    for(let i = 0; i < 42; i++) {
        fishes.forEach(fish => {
            fish.decreaseTimer();
            if(fish.internalTimer === 6 && !fish.isNewFish) {
                let newFish = new LanternFish(8);
                newFishes.push(newFish);
            }
        });
        fishes = [...fishes, ...newFishes];
        newFishes = [];
        console.log(fishes.map(({internalTimer}) => internalTimer).join(','));
    }
    console.log("P1:", fishes.length);
});

class LanternFish {
    constructor(internalTimer, startDay) {
        this.internalTimer = internalTimer;
        this.isNewFish = internalTimer === 8;
        // this.newFishOnDay = internalTimer === 8 ?  startDay+
        // this.childCount = 0;
    }

    decreaseTimer() {
        this.internalTimer--;
        if (this.internalTimer < 0)
            this.internalTimer = 6;
        if (this.internalTimer < 6)
            this.isNewFish = false;
        return this.internalTimer;
    }
}