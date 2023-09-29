let xp = 0;//player xp
let health = 100; //player health
let gold = 100; //player coin
let currentweapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document. querySelector("#button1");
const button2 = document. querySelector("#button2");
const button3 = document. querySelector("#button3");
const text = document. querySelector("#text");
const xpText= document. querySelector("#xpText");
const healthText = document. querySelector("#healthText");
const goldText  = document. querySelector("#goldText");
const monsterStats = document. querySelector("#monsterStats");
const monsterHealthText = document. querySelector("#monsterHealthText");
const monsterNameText = document. querySelector("#monsterNameText");
const weapons = [
    {name: "stick",
    power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }

];
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "beast",
        level: 8,
        health: 60

    },
    {name: "dragon",
    level: 20,
    health: 300    
    }
];
const locations =[{
    name:"town square",
"button text":["Going to Store", "Going to Cave", "Going to Fight Dragons" ],
"button functions":[goStore, goCave,fightDragon],
text:"You enter the store"
},
{
    name:"store",
    "button text":["Buy health, 10 gold", "Buy weapon, 30 gold", "Go to town square" ],
"button functions":[buyHealth,buyWeapon,goTown],
text:"You are in the town square. You see a sign that says \"Store.\""
},
{
    name:"cave",
    "button text":["Fight Slime","Fight Beasts", "Go to town square"],
    "button functions":[fightSlime, fightBeast, goTown],
    text:"You enter the cave and see some monsters"
},
{
    name:"fight",
    "button text":["attack","dodge","run"],
    "button functions":[attack,dodge,goTown],
    text:"You are fighting a monster"

},
{
    name:"kill monster",
    "button text":["Go to town square","Go to town square","Go to town square"],
    "button functions":[goTown,goTown,easterEgg],
    text: "The monster screams and dies, you gain xp and find gold"
 
},
{
    name: "lose",
    "button text": ["REPLAY", "REPLAY", "REPLAY"],
    "button functions": [restart, restart,restart],
    text: "you died"

},
{
    name: "win",
    "button text": ["REPLAY", "REPLAY", "REPLAY"],
    "button functions": [restart, restart,restart],
    text: "you win the game"
},{
    name: "easter egg",
    "button text": ["2", "8", "Go to town Square?"],
    "button functions": [pickTwo, pickEight,goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random number , you win!!"
}

]; 
//stores location through out the program



//initialize buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//code to run when the function is invoked
function update(location)
{
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];//function and array elements from const
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown(){
    /*button1.innerText = "Going to Store";
    button2.innerText = "Going to Cave";
    button3.innerText = "Going to Fight Dragons";
    button1.onclick = goStore;
    button2.onclick = goCave;
    button3.onclick = fightDragon;
    text.innerText = "You are in the town square. You see a sign that says \"Store.\""*/


    update(locations[0]);
   }
function goStore(){
   // console.log("Going to Store")  //prints message to be seen by the user.
   /*button1.innerText = "Buy health, 10 gold";
   button2.innerText = "Buy weapon, 30 gold";
   button3.innerText = "Go to town square";
   button1.onclick = buyHealth;
   button2.onclick = buyWeapon;
   button3.onclick = goTown;
   text.innerText = "You enter the store";*/

   update(locations[1]); //use const locations as func parameter



}
function goCave(){
    console.log("Going to Cave")  //prints message to be seen by the user.
   update(locations[2])

}

   function buyHealth(){
    if (gold >=10) { //check if player has minimum gold
        gold = gold-10;
        health = health+10
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = " Not enough gold soooorrry!!!"
    }


    
 
   }
   function buyWeapon(){
    if(currentweapon < weapons.length - 1){//array index starts at 0
    if(gold >= 30) {
        gold-=30;
        currentweapon ++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentweapon].name //holder for the new waepon
        text. innerText = "You now have a "+newWeapon + "."
        inventory.push(newWeapon) //saves new weapon to player inventory
        text.innerText += " In your inventory you have: " + inventory; //checks inventory array
    
   } else {
    text.innerText = "You dont have enough gold to buy a weapon"
   }
}else{
    text.innerText = "You already have the most powerful weapon" //negates the outer if
    button2.innerText = "Sell weapon for 15 gold"
    button2. onclick = sellWeapon;
}
}
function sellWeapon(){
    if(currentweapon < weapons.length - 1){
        gold +=15
        goldText.innerText = gold
        let currentweapon = inventory.shift;//remove first element to this var //scoped to this if statement only
        text.innerText = "You sold a " +currentweapon+ ".";
        text.innerText += "In your inventory you have:" +inventory;

    } else{
        text.innerText = "Dont sell your weapon";
    }
}
   

function fightDragon(){
   // console.log("Going to Fight Dragons")  //prints message to be seen by the user.
    fighting = 2;
    goFight();

}
function fightSlime(){
    fighting = 0;
    goFight();


}

function fightBeast(){
    fighting = 1;
    goFight();


}
function goFight(){
   
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}



function attack(){
    text.innerText = "The" +monsters[fighting].name + "attacks";
    text.innerText = "You attack it with your " + weapons[currentweapon].name + ".";
    if(isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }else{
        text.innerText += "You miss"
    }
 
    monsterHealth -= weapons[currentweapon].power + Math.floor(Math.random()* xp) + 1;// generate random no btn 0-1, floor rounds down to nearest whole number
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if( health <= 0) {
        lose();
    
    }
    else if(monsterHealth <= 0) {
       fighting === 2 ? winGame() : defeatMonster();//double to compare using tenary operator
    } 
    if(Math.random()<= .1 && inventory.length !== 1){//both have to be true
      text.innerText = "Your"  + inventory.pop() + "breaks."// .pop remove final item in the array
      currentweapon --
    }



}
function getMonsterAttackValue(level){
    let hit = (level*5)- (Math.floor(Math.random() * xp));//level of monster *5 - rando no * xp then round off to whole no
    console.log(hit);   
    return hit;

}
function isMonsterHit(){
    return Math.random() > .2 || health < 20;//80% of the time is a hit 20 % no hit
}


function dodge(){
    text.innerText = "You dodged the attack from the "+monsters[fighting].name+ ".";


}
function lose(){
    update(locations[5]);

}

function winGame(){

    update(locations[6]);
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);//gold needed to defeat the monster
    xp += monsters[fighting].level;//compared player xp with monster
    goldText.innerText =gold;
    xpText.innerText = xp;
    update(locations[4]);

}
function restart(){ //return all valuable to original
    xp = 0;//player xp
    health = 100; //player health
    gold = 50; //player coin
    currentweapon = 0;
    fighting;
    monsterHealth;
    inventory = ["stick"];
    goldText.innerText =gold;
    xpText.innerText = xp;
    healthText.innerText = health;
    goTown();


}
function easterEgg(){
    update(locations[7]);

}
function pickTwo(){
    pick(2)

}

function pickEight(){
    pick(8)

}
function pick(guess){
    let numbers = [];//array with 10 elements
    while (numbers.length < 10){
        numbers.push(Math.floor(Math.random() * 11))//arrays 0-10

    }
    text.innerText = "You picked "  + guess+  " . Here are the random numbers: \n"
    for(let i =0; i<10; i++){ 
        text.innerText += numbers[i] + "\n"
    }
    if(numbers.indexOf(guess) !== -1){
        text.innerText += "You win 20 gold"
        gold += 20
        goldText.innerText = gold

    } else{
        text.innerText -= "Wrong! You lose 10 health"
        health -= 10
        healthText.innerText = health
        if(health <= 0){
            lose()
        }

    }

}














