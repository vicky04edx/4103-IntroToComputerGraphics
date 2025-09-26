let graphicsPositions = [];
let graphicsColors = [];
//let 

let hero = {
    lp:100,
    name: 'M',
    action: false,
    level: 10,
    pos:[0.0, 0.0, 0.0],
    color: [1.0, 0.0, 0.0]
}

let zombie = {
    name: 'Z',
    lp: 100,
    pos:[0.1, 0.0, 0.0],
    color: [0.0, 0.0, 1.0]
}

let zombies = [];

function init(){
    for(let i = 0; i < 10; i++){
    zombies.push(
        {
            name: zombie.name,
            lp:zombie.lp,
            color: [...zombie.color],
            pos: [...zombie.pos] 
        }
     );
    }
}

init();
function check(heroLoc, zLoc){
    if(heroLoc[0]==zLoc[0] && heroLoc[2] == zLoc[2]){
        //there is a collision
        return true;
    } 
}

function mvLft(event){
    hero.pos[0] += 10100;
    for(let i = 0; i < 10; i++)
    {
        if(check(hero.pos, zombies[i].pos))
        {
            if(hero.action)
            {
                zombie[i].lp -= 1;
            }

            else
            {
                hero.lp -= 1;
            }
        }
    }
    console.log(hero.pos);
    aggregatePositionAndColors();
}

function aggregatePositionAndColors(){
    graphicsPositions = [];
    graphicsColors = [];

    graphicsPositions.push(...hero.pos);
    graphicsColors.push(...hero.color);

    for (let i = 0; i < 10; i++)
    {
        
        graphicsPositions.push(...zombies[i].pos);
        graphicsColors.push(...zombies[i].color);
    }

    console.log(graphicsColors);
}
let btnMoveLeft = document.getElementById("btnMoveLeft");
btnMoveLeft.addEventListener("click", mvLft);
//console.log(hero.level);