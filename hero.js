// Hero, Warrior, Mage
// attack, buyPotion, heal, move, cast spell

// Hero
class Hero {
  static count = 0;

  #hp = 0;
  position = {
    x: 0,
    y: 0,
  };

  constructor(name, xp, hp, baseLvl) {
    Hero.count++;

    this.name = name;
    this.xp = xp;
    this.#hp = hp;
    this.lvl = baseLvl;
  }

  get hp() {
    return this.#hp;
  }

  set hp(value) {
    if (value > 20 || value <= 0) {
      console.log('HP не може бути більше 20');
    } else {
      this.#hp = value;
    }
  }

  takeDamage(amount, from, type) {
    this.#hp -= amount;

    if (type === 'weapon') {
      console.log(
        `${from.name} атакував ${this.name} за допомогою ${from.weapon.name}(типу ${from.weapon.type}) і наніс ${amount} шкоди`
      );
      console.log(`У ${this.name} залишилось ${this.#hp} HP`);
    }

    if (type === 'spell') {
      console.log(
        `${from.name} атакував ${this.name} за допомогою ${from.spell.name}(елементу ${from.spell.element}) і наніс ${amount} шкоди`
      );
      console.log(`У ${this.name} залишилось ${this.#hp} HP`);
    }
  }

  gainXP(amount) {
    this.xp += amount;
    console.log(`${this.name} отримав ${amount} досвіду`);

    if (this.xp >= 1000) {
      this.increaseLvl();
    }
  }

  increaseLvl() {
    this.xp = 0;
    this.lvl++;
    console.log(`${this.name} отримав ${this.lvl} рівень`);
  }

  move(moveX, moveY) {
    this.position.x += moveX;
    this.position.y += moveY;
    console.log(
      `${this.name} пішов до X:${this.position.x} Y:${this.position.y}`
    );
  }
}

// Warrior
class Warrior extends Hero {
  constructor(name, xp, hp, baseLvl, weapon) {
    super(name, xp, hp, baseLvl);
    this.weapon = weapon;
  }

  attack(hero) {
    hero.takeDamage(this.weapon.damage, this, 'weapon');
  }
}

// Mage
class Mage extends Hero {
  constructor(name, xp, hp, baseLvl, spell) {
    super(name, xp, hp, baseLvl);
    this.spell = spell;
  }

  castSpell(hero) {
    hero.takeDamage(this.spell.damage, this, 'spell');
  }
}

// Damage Dealer
class DamageDealer {
  constructor(name, damage) {
    this.name = name;
    this.damage = damage;
  }
}

// Weapon
class Weapon extends DamageDealer {
  constructor(name, damage, type) {
    super(name, damage);
    this.type = type;
  }
}

// Spell
class Spell extends DamageDealer {
  constructor(name, damage, element) {
    super(name, damage);
    this.element = element;
  }
}

// Weapon and spells
const azoth = new Weapon('Azoth', 14, 'Sword');

const silurianTree = new Weapon('Silurian Tree', 17, 'Spear');

const iceArrow = new Spell('Ice Arrow', 12, 'Ice');

const fireBall = new Spell('Fire Ball', 30, 'Fire');

// Heroes
const alex = new Warrior('Alex', 500, 1000, 1, silurianTree);

const rose = new Mage('Rose', 200, 300, 4, iceArrow);

const bob = new Mage('Bob', 900, 600, 7, fireBall);

const albert = new Warrior('Albert', 200, 900, 3, azoth);

/* ------------------------------ */

alex.attack(bob);
rose.castSpell(bob);

albert.attack(rose);
bob.castSpell(alex);

albert.gainXP(1200);

console.log(bob.hp);

console.log(Hero.count);
