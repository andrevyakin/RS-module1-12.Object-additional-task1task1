const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//Для форматирования вывода
const addSpase = number => ("     " + number).slice(-5);

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
            .forEach(i => (this[i[0]] += getRandomIntInclusive(-5, max)) < 0 ? this[i[0]] = 0 : this[i[0]]);
    },

    attack(defenderObject) {
        let chancesToWin = this.checkChancesToWin(defenderObject);
        chancesToWin = chancesToWin[0] / chancesToWin[1] * 100;

        //Случайное событие. Дракарис.
        if (!getRandomIntInclusive(-10, 10)) {
            alert("Обороняющиеся призвали дракона.")
            chancesToWin = 0;
        }
        if (chancesToWin < 70 && chancesToWin !== 0) {
            alert(`Наши шансы равны ${chancesToWin.toFixed()}%. Необходимо подкрепление!\n
            Нападающий            Осажденный
            Лучники:   ${addSpase(this.archer)}          Лучники:    ${addSpase(defenderObject.archer)}
            Пехотницы:${addSpase(this.footSoldier)}         Пехотницы:${addSpase(defenderObject.footSoldier)}
            Кавалерия: ${addSpase(this.cavalry)}         Кавалерия:  ${addSpase(defenderObject.cavalry)}
            Артиллерия:${addSpase(this.artillery)}         Артиллерия:${addSpase(defenderObject.artillery)}`);
            this.improveArmy(10);
            //Услилим осажденных, чтоб было интереснее
            this.improveArmy.call(defenderObject, 5);
        } else if (chancesToWin === 0)
            alert("Наши шансы равны нулю. Нам не победить. Спасайся кто может!")
        else
            alert("Мы усилились! Мы несомненно победим! Наши шансы высоки!")
        return chancesToWin;
    }
}

const defender = {
    archer: 33,
    footSoldier: 50,
    cavalry: 40,
    artillery: 10,
}

while (true) {
    const result = attacker.attack(defender);
    if (result > 70 || !result)
        break;
}