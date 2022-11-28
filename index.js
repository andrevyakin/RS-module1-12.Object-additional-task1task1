const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const attacker = {
    archer: 30,
    footSoldier: 55,
    cavalry: 10,
    artillery: 3,

    checkChancesToWin(defenderObject) {
        let chancesToWin = 0;
        const combatUnitsAttacker = Object.entries(this).filter(i => typeof (i[1]) !== "function");
        const combatUnitsDefender = Object.entries(defenderObject).filter(i => typeof (i[1]) !== "function");
        combatUnitsAttacker.forEach(att =>
            combatUnitsDefender.forEach(def => {
                if (att[0] === def[0] && att[1] > def[1])
                    chancesToWin++;
            })
        )
        return [chancesToWin, combatUnitsAttacker.length];
    },

    improveArmy(max) {
        Object.entries(this)
            .filter(i => typeof (i[1]) !== "function")
            .forEach(i => this[i[0]] += getRandomIntInclusive(0, max));
    },

    attack(defenderObject) {
        let chancesToWin = this.checkChancesToWin(defenderObject);
        chancesToWin = chancesToWin[0] / chancesToWin[1] * 100;
        if (chancesToWin < 70) {
            alert(`Наши шансы равны ${chancesToWin.toFixed()}%. Необходимо подкрепление!`);
            this.improveArmy(10);
            //Услилим осажденных, чтоб было интереснее
            this.improveArmy.call(defenderObject, 5);
        } else
            alert("Мы усилились! Мы несомненно победим! Наши шансы высоки!")
        return this;
    }
}

const defender = {
    archer: 33,
    footSoldier: 50,
    cavalry: 40,
    artillery: 10,
}

attacker
    .attack(defender)
    .attack(defender)
    .attack(defender)
    .attack(defender)
    .attack(defender)
    .attack(defender)




