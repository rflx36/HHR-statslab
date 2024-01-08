
async function SetMonsters() {
    /*
    let response = await fetch("static/statslab/Items-Info/monsters.json");
    let monsters_data = await response.json();
*/
    let FileLocationMonsters = "static/statslab/Items-Info/monsters.json";
    response = await fetch(FileLocationMonsters);
    parsedData = await response.json();
    monsters_data = parsedData;
    for (let monster of monsters_data) {
    
        var m_atk_bonus = 0;

        if (monster.variant) {
      
            m_atk_bonus = monster.variant_atk;
        }


        var monster_dmg = monster.attack * (monster.attack + m_atk_bonus);

        if (monster.name.includes("Sasquatch")) {
            console.log(monster.name);
            monster_dmg = monster_dmg * 2.5; // Punch 250%
        }

        let current_fdef = 0;
        var dmg = 1;
        while(dmg > 0){
            current_fdef+=10;
           var dmg = Math.round(5 * (monster_dmg + 30) / (current_fdef + 30));
           
          
        }
        console.log(monster.name+": "+current_fdef);
    }

}

SetMonsters();