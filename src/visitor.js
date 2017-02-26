class Visitor {
    constructor() {
        this.totalDrinkVolume = 0;
    }

    drink(volume) {
        this.totalDrinkVolume += volume;
        return volume;
    }

    sober() {
        this.totalDrinkVolume = 0;
    }

    isTotallyDrunk() {
        return this.totalDrinkVolume > 150;
    }

    getTotallyDrunk() {
        return this.totalDrinkVolume;
    }

    pay(sum) {
        return true;
    }
}

module.exports = Visitor;