
let endTime, timeElapsed, startTime;

startTime = performance.now();

let archer_armors,
  archer_helmets,
  archer_pants,
  archer_shoes,
  archer_weapons,
  cowboy_armors,
  cowboy_helmets,
  cowboy_pants,
  cowboy_shoes,
  cowboy_weapons,
  mage_armors,
  mage_helmets,
  mage_pants,
  mage_shoes,
  mage_weapons,
  warrior_armors,
  warrior_helmets,
  warrior_pants,
  warrior_shields,
  warrior_shoes,
  warrior_weapons;

let loading_bar = document.getElementById('loading-progress');
let loading_info = document.getElementById('loading-information');
let loader_cont = document.getElementById('loader-cont');
let loader_cache_cont = document.getElementById('loading-cache-cont');
let quote = document.getElementById('quote');


let skills_data; //load skills.json
let monsters_data; // load monsters.json
let environment_data; // load environment.json
//pre render UI at loading sesion to cache
let UI_images = [
  "bg-snowflake",
  "button-hovered",
  "button",
  "enchanted",
  "icon-archer",
  "icon-armor",
  "icon-base-damage-crit",
  "icon-base-damage",
  "icon-character",
  "icon-checked",
  "icon-close",
  "icon-coin",
  "icon-cowboy",
  "icon-discord-server-xmas",
  "icon-discord-server-2024",
  "icon-element-electric",
  "icon-element-fire",
  "icon-element-poison",
  "icon-equipped",
  "icon-helmets",
  "icon-mage",
  "icon-minus",
  "icon-monster-def",
  "icon-monster-dmg",
  "icon-pants",
  "icon-plus",
  "icon-remove",
  "icon-shoes",
  "icon-single-handed",
  "icon-title",
  "icon-two-handed",
  "icon-unchecked",
  "icon-warrior",
  "monster-toggle-hide",
  "monster-toggle-show",
  "monster-toggle-variant",
  "pve-toggle"
]


async function SetRandomQuote() {
  let response = await fetch("static/statslab/Items-Info/player_quotes.json");
  let QuotesData = await response.json();

  let p_q = Object.keys(QuotesData);

  let quoter_name = Math.floor(Math.random() * p_q.length);
  let r_q = p_q[quoter_name];

  let rand = Math.floor(Math.random() * QuotesData[r_q].length);

  var quote_b = QuotesData[r_q];
  let quote_ = quote_b[rand];
  quote.innerHTML = `` + r_q + ` - "` + quote_ + `"`;
}

function LoadCache(images) {
  if (images.length == 0) {
    return;
  }

  let t = ``;
  for (let img of images) {
    t += `<img src='` + img + `'>`;
  }
  loader_cache_cont.innerHTML += t;
}

let progress_percent = 0;
function UpdateLoadingBar() {

  loading_bar.style.width = progress_percent + "%";
  if (progress_percent >= 100) {
    setTimeout(() => {
      loader_cont.style.opacity = "0";
      setTimeout(() => {
        loader_cont.style.display = "none";
      }, 300);
    }, 500);

  }
}

window.addEventListener("load", function () {

  loading_info.innerHTML = "Loading - Menu ";
  StartLoading();
  SetRandomQuote();

})
async function StartLoading() {
  let c = ["archer", "cowboy", "mage", "warrior"];
  let e = ["armors", "helmets", "pants", "shoes", "weapons", "shields"];
  let response, parsedData;
  var k = 0;
  var images = [];

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 6; j++) {
      if (j == 5 && i != 3) {
        continue;
      }

      var FileLocation = "static/statslab/Items-Info/" + c[i] + "_" + e[j] + ".json";
      response = await fetch(FileLocation);
      parsedData = await response.json();

      loading_info.innerHTML = "Loading - " + c[i] + " " + e[j];
      for (let item of parsedData) {
        images.push("static/statslab/" + item.url);
      }
      AssignItems(k, parsedData);
      var filename = c[i] + "_" + e[j] + ".json";

      k++;
      progress_percent += 4;
      console.log("Progress [" + (progress_percent) + "]: " + filename);
      UpdateLoadingBar();

    }



    LoadCache(images);
    images = [];
  }

  loading_info.innerHTML = "Loading - UI";
  for (let i = 0; i < UI_images.length; i++) {
    images.push("static/statslab/UI/" + UI_images[i] + ".png");
  }
  LoadCache(images);
  progress_percent += 3;
  UpdateLoadingBar();


  let FileLocationMonsters = "static/statslab/Items-Info/monsters.json";
  response = await fetch(FileLocationMonsters);
  parsedData = await response.json();

  monsters_data = parsedData;
  loading_info.innerHTML = "Loading - Monsters";

  for (let monster of parsedData) {
    images.push(monster.url);
  }
  LoadCache(images);
  images = [];
  progress_percent += 5;
  UpdateLoadingBar();



  let FileLocationSkills = "static/statslab/Items-Info/skills.json";
  response = await fetch(FileLocationSkills);
  parsedData = await response.json();

  skills_data = parsedData;
  loading_info.innerHTML = "Loading - Skills";
  for (let skill of parsedData) {
    images.push("static/statslab/" + skill.url);
  }
  LoadCache(images);
  images = [];
  progress_percent += 5;
  UpdateLoadingBar();

  let FileLocationEnvironment = "static/statslab/Items-Info/environment.json";
  response = await fetch(FileLocationEnvironment);
  parsedData = await response.json();
  environment_data = parsedData;
  loading_info.innerHTML = "Loading - PVE";
  for (let pve of parsedData) {
    images.push(pve.url);
  }
  LoadCache(images);
  images = [];
  progress_percent += 3;
  UpdateLoadingBar();


  endTime = performance.now();
  timeElapsed = endTime - startTime;
  console.log(Math.round(timeElapsed) + "ms");
};


function AssignItems(n, ItemData) {
  switch (n) {
    case 0:
      archer_armors = ItemData;
      break;
    case 1:
      archer_helmets = ItemData;
      break;
    case 2:
      archer_pants = ItemData;
      break;
    case 3:
      archer_shoes = ItemData;
      break;
    case 4:
      archer_weapons = ItemData;
      break;
    case 5:
      cowboy_armors = ItemData;
      break;
    case 6:
      cowboy_helmets = ItemData;
      break;
    case 7:
      cowboy_pants = ItemData;
      break;
    case 8:
      cowboy_shoes = ItemData;
      break;
    case 9:
      cowboy_weapons = ItemData;
      break;
    case 10:
      mage_armors = ItemData;
      break;
    case 11:
      mage_helmets = ItemData;
      break;
    case 12:
      mage_pants = ItemData;
      break;
    case 13:
      mage_shoes = ItemData;
      break;
    case 14:
      mage_weapons = ItemData;
      break;
    case 15:
      warrior_armors = ItemData;
      break;
    case 16:
      warrior_helmets = ItemData;
      break;
    case 17:
      warrior_pants = ItemData;
      break;
    case 18:
      warrior_shoes = ItemData;
      break;
    case 19:
      warrior_weapons = ItemData;
      break;
    case 20:
      warrior_shields = ItemData;
      break;
    default:
      console.log("None")
      break;
  }
}

function ReturnItems(UserClass, UserType) {
  if (UserClass == "archer") {
    if (UserType == "armors") {
      return archer_armors;
    } else if (UserType == "helmets") {
      return archer_helmets;
    } else if (UserType == "pants") {
      return archer_pants;
    } else if (UserType == "shoes") {
      return archer_shoes;
    } else {
      return archer_weapons;
    }
  }
  else if (UserClass == "cowboy") {
    if (UserType == "armors") {
      return cowboy_armors;
    } else if (UserType == "helmets") {
      return cowboy_helmets;
    } else if (UserType == "pants") {
      return cowboy_pants;
    } else if (UserType == "shoes") {
      return cowboy_shoes;
    } else {
      return cowboy_weapons;
    }
  }
  else if (UserClass == "mage") {
    if (UserType == "armors") {
      return mage_armors;
    } else if (UserType == "helmets") {
      return mage_helmets;
    } else if (UserType == "pants") {
      return mage_pants;
    } else if (UserType == "shoes") {
      return mage_shoes;
    } else {
      return mage_weapons;
    }
  }
  else {
    if (UserType == "armors") {
      return warrior_armors;
    } else if (UserType == "helmets") {
      return warrior_helmets;
    } else if (UserType == "pants") {
      return warrior_pants;
    } else if (UserType == "shoes") {
      return warrior_shoes;
    } else {
      return warrior_weapons;
    }
  }
}



var selected_helmet = {
  name: "",
  attack: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-helmets.png"
};
var selected_armor = {
  name: "",
  attack: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-armor.png"
};
var selected_pants = {
  name: "",
  attack: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-pants.png"
};
var selected_shoes = {
  name: "",
  attack: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-shoes.png"
};
var equipped_two_hander = false;
var sheathed_two_hander = false;
var selected_primary_weapon = {
  name: "",
  power: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-single-handed.png",
  twohanded: false,
  enchanted: false
}
var selected_secondary_weapon = {
  name: "",
  power: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-single-handed.png",
  twohanded: false,
  enchanted: false
}



var sheated_primary_weapon = {
  name: "",
  power: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-single-handed.png",
  twohanded: false,
  enchanted: false
}
var sheated_secondary_weapon = {
  name: "",
  power: 0,
  defense: 0,
  price: 0,
  class: "",
  url: "UI/icon-single-handed.png",
  twohanded: false,
  enchanted: false
}

let dex_crit_chance = [
  1.00, 1.21, 1.37, 1.50, 1.62, 1.72, 1.82, 1.91, 2.00, 2.08, 2.16, 2.23, 2.30, 2.37, 2.44,
  2.50, 2.56, 2.62, 2.68, 2.74, 2.79, 2.85, 2.90, 2.95, 3.00, 3.05, 3.10, 3.15, 3.19, 3.24,
  3.28, 3.33, 3.37, 3.42, 3.46, 3.50, 3.54, 3.58, 3.62, 3.66, 3.70, 3.74, 3.78, 3.82, 3.85,
  3.89, 3.92, 3.96, 4.00, 4.04, 4.08, "", "", "", "", "", "", "", "", 4.37, "", "", "", "", 4.53, "",
  4.59, "", "", 4.68, "", "", "", "", "", "", "", "", "", "", 5.00
];












var bonus_enchant_damage = 0;
let weapon_enchanted = false;
var current_fdef = 0;
var current_fatk_p = 0;
var current_fatk_s = 0;
var selected_level = 1;
var current_totalprice = 0;
var points = 0;
var shield_ability = 0;
var booster_ability = 0;
var selected_class = "warrior";
var hp = 0;
var mp = 0;
var atk = 0;
var def = 0;
var dex = 0;
var speed = 100;
var equipped_hander_type = null;
var sheathed_hander_type = null;
let class_container = document.getElementById('class-cont');
let class_label = document.getElementById('class-label');
let items_container = document.getElementById('items');
let set_items = document.getElementById('set-items-cont');

let item_helmet = document.getElementById('item-helmet');
let item_armor = document.getElementById('item-armor');
let item_pants = document.getElementById('item-pants');
let item_shoes = document.getElementById('item-shoes');
let item_primary = document.getElementById('item-weapon-primary')
let item_secondary = document.getElementById('item-weapon-secondary')
let item_sheath_primary = document.getElementById('item-sheath-primary');
let item_sheath_secondary = document.getElementById('item-sheath-secondary');

let hp_amount = document.getElementById('hp-amount');
let mp_amount = document.getElementById('mp-amount');
let atk_amount = document.getElementById('atk-amount');
let def_amount = document.getElementById('def-amount');
let dex_amount = document.getElementById('dex-amount');

let level_input = document.getElementById('level-input');
let fdef_ = document.getElementById('fdef');
let fatk_ = document.getElementById('fatk');
let fspeed = document.getElementById('fspeed');
let fdex = document.getElementById('fdex');
let fprice = document.getElementById('tcost');
let fenchantprice = document.getElementById('ecost');
let minus_hp = document.getElementById('minus-hp');
let minus_mp = document.getElementById('minus-mp');
let minus_atk = document.getElementById('minus-atk');
let minus_def = document.getElementById('minus-def');
let minus_dex = document.getElementById('minus-dex');

var plus_ = document.getElementsByClassName("icon-plus");
let plus_hp = document.getElementById('plus-hp');
let points_label = document.getElementById('points-label-value');


let shield_cont = document.getElementById('shield-container');
let shield_input = document.getElementById('shield-skill-input');
let shield_label = document.getElementById('shield-skill-label');
var shielded = false;

let booster_cont = document.getElementById('booster-container');
let booster_input = document.getElementById('booster-skill-input');
let booster_label = document.getElementById('booster-skill-label');


let secondary_equip = document.getElementById('item-weapon-secondary');
let secondary_sheath = document.getElementById('item-sheath-secondary');

let monster_cont = document.getElementById('cont-monster');


let enchant_e1 = document.getElementById('w-e1');
let enchant_e2 = document.getElementById('w-e2');
let enchant_s1 = document.getElementById('w-s1');
let enchant_s2 = document.getElementById('w-s2');
let enchant_cont = document.getElementById('div-cont-enchanted-id');

let cont_saving = document.getElementById('cont-saving-id');
let save_details = document.getElementById('save-details-id');

let save_action_1 = document.getElementById('actions-1');
let save_action_2 = document.getElementById('actions-2');
let save_action_3 = document.getElementById('actions-3');
let save_list_cont = document.getElementById('save-list-id');
let save_name = "";
let selected_save = -1;

let delete_action = document.getElementById('action-delete-id');

let shield_guard = 0;
let is_shield_guarded = false;

let guard_cont = document.getElementById('shield-guard-bg-id');

function ClearEquips() {


  selected_helmet = {
    name: "",
    attack: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-helmets.png"

  };
  selected_armor = {
    name: "",
    attack: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-armor.png"
  };
  selected_pants = {
    name: "",
    attack: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-pants.png"
  };
  selected_shoes = {
    name: "",
    attack: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-shoes.png"
  };
  equipped_two_hander = null;
  secondary_sheath.style.display = "none";
  secondary_equip.style.display = "none";
  sheathed_two_hander = null;

  selected_primary_weapon = {
    name: "",
    power: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-single-handed.png",
    twohanded: false,
    enchanted: false
  };
  selected_secondary_weapon = {
    name: "",
    power: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-single-handed.png",
    twohanded: false,
    enchanted: false
  };


  sheated_primary_weapon = {
    name: "",
    power: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-single-handed.png",
    twohanded: false,
    enchanted: false
  }
  sheated_secondary_weapon = {
    name: "",
    power: 0,
    defense: 0,
    price: 0,
    class: "",
    url: "UI/icon-single-handed.png",
    twohanded: false,
    enchanted: false
  }

  item_helmet.style.backgroundImage = "url('static/statslab/UI/icon-helmets.png')";
  item_armor.style.backgroundImage = "url('static/statslab/UI/icon-armor.png')";
  item_pants.style.backgroundImage = "url('static/statslab/UI/icon-pants.png')";
  item_shoes.style.backgroundImage = "url('static/statslab/UI/icon-shoes.png')";
  item_primary.style.backgroundImage = "url('static/statslab/UI/icon-single-handed.png')";
  item_secondary.style.backgroundImage = "url('static/statslab/UI/icon-single-handed.png')";
  item_sheath_primary.style.backgroundImage = "url('static/statslab/UI/icon-single-handed.png')";
  item_sheath_secondary.style.backgroundImage = "url('static/statslab/UI/icon-single-handed.png')";

}




function CloseSetItems() {
  set_items.style.display = "none";
  if (shielded) {

    shield_cont.style.transform = "translateY(0px)";
  }
  booster_cont.style.transform = "translateY(0px)";





}

function SetClass(s_class) {
  selected_class = s_class;
  ResetSkillPoint();
  class_container.style.display = "none";


  class_label.innerHTML = "Class: " + s_class;
  ClearEquips();
  UpdateStats();

  booster_cont.style.transform = "translateY(0px)";

}
function LoadClass() {
  class_container.style.display = "flex";

  shield_cont.style.transform = "translateY(-80px)";
  booster_cont.style.transform = "translateY(-80px)";
  Monster_selection = 1;
  Monster_toggle_variant = false;

  Monster_stat_cont.style = "transform:translateY(159px);";
  Monster_image_cont.style = " background-image:url('static/statslab/UI/monster-toggle-hide.png');";
}
function UpdateShield() {
  shield_ability = shield_input.value;
  shield_label.textContent = (shield_input.value * 5) + "%";
  UpdateStats();
}

function UpdateStats() {
  //console.log(parseInt(selected_secondary_weapon.defense * Math.floor(1 + ((shield_ability * 5) / 100))));
  //console.log (1 + ((shield_ability * 5) / 100));

  if (selected_helmet.class != selected_class) {
    selected_helmet.attack = 0;

  }

  if (selected_armor.class != selected_class) {
    selected_armor.attack = 0;
  }


  if (selected_pants.class != selected_class) {
    selected_pants.attack = 0;
  }


  if (selected_shoes.class != selected_class) {
    selected_shoes.attack = 0;
  }

  if ((selected_secondary_weapon.defense != 0 || sheated_primary_weapon.defense != 0) && !shielded) {
    shielded = true;
    // shield_cont.style.display = "block";
    shield_cont.style.transform = "translateY(0px)";
  }
  else if (selected_secondary_weapon.defense == 0 && sheated_primary_weapon.defense == 0 && shielded) {
    shielded = false;
    // shield_cont.style.display = "none";
    shield_cont.style.transform = "translateY(-80px)";

  }
  let shield_guard_value = 1;
  if (is_shield_guarded && shielded) {
    shield_guard_value = 2;

  }
 
  document.getElementById('toggle-guard-button-id').style.display = (shielded)?"block":"none";
  
  current_fdef = (def + 8) * (2 + parseInt(selected_helmet.defense) + parseInt(selected_armor.defense) + parseInt(selected_pants.defense) + parseInt(selected_shoes.defense) + parseInt(selected_secondary_weapon.defense * (shield_guard_value + ((shield_ability * 5) / 100))) + parseInt(Math.floor(Math.floor(sheated_primary_weapon.defense * 0.35) * (shield_guard_value + ((shield_ability * 5) / 100)))));
  if (is_shield_guarded && shielded) {
    current_fdef = Math.floor(current_fdef * (1+( shield_guard * 0.03)));
  }

  fdef_.textContent = current_fdef.toLocaleString('en-US');

  let total_enchantment_cost = 0;
  let p_helmet = parseInt(selected_helmet.price);
  let p_armor = parseInt(selected_armor.price);
  let p_pants = parseInt(selected_pants.price);
  let p_shoes = parseInt(selected_shoes.price);

  let p_primary = parseInt(selected_primary_weapon.price);
  let p_secondary = parseInt(selected_secondary_weapon.price);

  let p_primary_sheath = parseInt(sheated_primary_weapon.price);
  let p_secondary_sheath = parseInt(sheated_secondary_weapon.price);

  if (selected_primary_weapon.enchanted) {
    total_enchantment_cost += Math.round(Math.sqrt(selected_primary_weapon.price) * 2);
    p_primary *= 2;
  }
  if (selected_secondary_weapon.enchanted) {
    total_enchantment_cost += Math.round(Math.sqrt(selected_secondary_weapon.price) * 2);
    p_secondary *= 2;
  }
  if (sheated_primary_weapon.enchanted) {
    total_enchantment_cost += Math.round(Math.sqrt(sheated_primary_weapon.price) * 2);
    p_primary_sheath *= 2;
  }
  if (sheated_secondary_weapon.enchanted) {
    total_enchantment_cost += Math.round(Math.sqrt(sheated_secondary_weapon.price) * 2);
    p_secondary_sheath *= 2;
  }
  fenchantprice.textContent = total_enchantment_cost;

  current_totalprice = p_helmet + p_armor + p_pants + p_shoes + p_primary + p_secondary + p_primary_sheath + p_secondary_sheath;
  fprice.textContent = current_totalprice.toLocaleString('en-US');

  if (dex_crit_chance[dex] == null || dex_crit_chance[dex] == "") {
    fdex.textContent = "Unavailable";
  } else {
    fdex.textContent = dex_crit_chance[dex] + "x";
  }
  var bonus_sheath_damage = 0;
  var sheated_primary_weapon_pow = sheated_primary_weapon.power;
  var sheated_secondary_weapon_pow = sheated_secondary_weapon.power;

  if (sheated_primary_weapon.class != selected_class) {

    sheated_primary_weapon_pow = sheated_primary_weapon.power * 0.25;
  }
  if (sheated_secondary_weapon.class != selected_class) {
    sheated_secondary_weapon_pow = sheated_secondary_weapon.power * 0.25;
  }
  //console.log("p:"+sheated_primary_weapon_pow +":"+ sheated_primary_weapon.class);
  //console.log("s:"+sheated_secondary_weapon_pow + ":"+ sheated_secondary_weapon.class);


  if (sheathed_two_hander == false) {

    if (sheated_primary_weapon.name != "" && sheated_secondary_weapon.name != "") {

      speed = 110;
      bonus_sheath_damage = (Math.floor(sheated_primary_weapon_pow * 0.06) + Math.floor(sheated_secondary_weapon_pow * 0.06));
    }
    else if (sheated_primary_weapon.name != "" || sheated_secondary_weapon.name != "") {

      if (sheated_primary_weapon.power > 0) {
        speed = 105;
      }


      if (sheated_primary_weapon.name != "") {
        bonus_sheath_damage = Math.floor(sheated_primary_weapon_pow * 0.06);
      }
      else {
        bonus_sheath_damage = Math.floor(sheated_secondary_weapon_pow * 0.06);
      }
    }

  }
  else {
    bonus_sheath_damage = Math.floor(sheated_primary_weapon_pow * 0.25);
    speed = 100;
  }


  current_fatk_p = parseInt(selected_primary_weapon.power) * (1 + bonus_sheath_damage + atk + parseInt(selected_helmet.attack) + parseInt(selected_armor.attack) + parseInt(selected_pants.attack) + parseInt(selected_shoes.attack));
  current_fatk_s = parseInt(selected_secondary_weapon.power) * (1 + bonus_sheath_damage + atk + parseInt(selected_helmet.attack) + parseInt(selected_armor.attack) + parseInt(selected_pants.attack) + parseInt(selected_shoes.attack));
  //console.log(selected_primary_weapon.name + ":" + selected_primary_weapon.class);

  current_fatk_p = Math.floor(current_fatk_p * (1 + (booster_ability / 100)));

  current_fatk_s = Math.floor(current_fatk_s * (1 + (booster_ability / 100)));
  if (selected_primary_weapon.class != selected_class) {
    current_fatk_p = Math.floor(current_fatk_p * 0.25);
  }
  if (selected_secondary_weapon.class != selected_class) {
    current_fatk_s = Math.floor(current_fatk_s * 0.25);
  }


  fatk_.textContent = (!equipped_two_hander) ? current_fatk_p.toLocaleString('en-US') + " & " + current_fatk_s.toLocaleString('en-US') : current_fatk_p.toLocaleString('en-US');
  fspeed.textContent = speed + "%";

  UpdateMonsterStat();
  if (sheated_primary_weapon.enchanted && sheated_secondary_weapon.enchanted) {
    bonus_enchant_damage = 0.25;
  }
  else if (sheated_primary_weapon.enchanted || sheated_secondary_weapon.enchanted) {
    bonus_enchant_damage = 0.125;
  }
  else {
    bonus_enchant_damage = 0;
  }
}
function UpdateLevel() {
  if (level_input.value == "") {
    level_input.value = 1;
  }
  else if (level_input.value > 1000000) {
    level_input.value = 1;
  }
  selected_level = level_input.value;
  points = (level_input.value - 1) * 3;
  points_label.innerHTML = points;
  hp = 0;
  mp = 0;
  atk = 0;
  def = 0;
  dex = 0;

  DisplayStat(hp, mp, atk, def, dex);
  UpdateStats();
  DisablePointReset();
}
function ResetSkillPoint() {

  hp = 0;
  mp = 0;
  atk = 0;
  def = 0;
  dex = 0;

  UpdateLevel();
  DisplayStat(hp, mp, atk, def, dex);
  UpdateStats();
  DisablePointReset();
}
function DisplayStat(hp, mp, atk, def, dex) {
  hp_amount.value = (3 + hp) * 5;
  mp_amount.value = mp * 3;

  atk_amount.value = 1 + atk;
  def_amount.value = 1 + def;
  dex_amount.value = 1 + dex;

  if (hp == 0) {
    minus_hp.setAttribute('disabled', '');
    minus_hp.style.opacity = "0";
    minus_hp.style.cursor = "default";
  }
  else if (minus_hp.hasAttribute("disabled")) {
    minus_hp.removeAttribute('disabled');
    minus_hp.style.opacity = "1";
    minus_hp.style.cursor = "pointer";
  }

  if (mp == 0) {
    minus_mp.setAttribute('disabled', '');
    minus_mp.style.opacity = "0";
    minus_mp.style.cursor = "default";
  }
  else if (minus_mp.hasAttribute("disabled")) {
    minus_mp.removeAttribute('disabled');
    minus_mp.style.opacity = "1";
    minus_mp.style.cursor = "pointer";
  }

  if (atk == 0) {
    minus_atk.setAttribute('disabled', '');
    minus_atk.style.opacity = "0";
    minus_atk.style.cursor = "default";
  }
  else if (minus_atk.hasAttribute("disabled")) {
    minus_atk.removeAttribute('disabled');
    minus_atk.style.opacity = "1";
    minus_atk.style.cursor = "pointer";
  }


  if (def == 0) {
    minus_def.setAttribute('disabled', '');
    minus_def.style.opacity = "0";
    minus_def.style.cursor = "default";
  }
  else if (minus_def.hasAttribute("disabled")) {
    minus_def.removeAttribute('disabled');
    minus_def.style.opacity = "1";
    minus_def.style.cursor = "pointer";
  }


  if (dex == 0) {
    minus_dex.setAttribute('disabled', '');
    minus_dex.style.opacity = "0";
    minus_dex.style.cursor = "default";
  }
  else if (minus_dex.hasAttribute("disabled")) {
    minus_dex.removeAttribute('disabled');
    minus_dex.style.opacity = "1";
    minus_dex.style.cursor = "pointer";
  }
  CheckPlusPoint();
}

function SetStat(stat_type) {

  var point_release = 0;
  let temp_stat_ = 0;
  let selected_input = document.getElementById(stat_type + "-amount");
  let selected_stat_default = 0;
  let temp_stat_selection_ = 0;
  if (stat_type == "hp") {

    temp_stat_ = Math.floor(selected_input.value / 5) - 3;  // 15

    temp_stat_selection_ = hp;

    selected_stat_default = 5;
  }
  else if (stat_type == "mp") {

    temp_stat_ = Math.floor(selected_input.value / 3);
    temp_stat_selection_ = mp;

  }
  else if (stat_type == "atk") {
    temp_stat_ = selected_input.value - 1;
    temp_stat_selection_ = atk;
    selected_stat_default = 1;
  }
  else if (stat_type == "def") {
    temp_stat_ = selected_input.value - 1;
    temp_stat_selection_ = def;

    selected_stat_default = 1;
  }
  else if (stat_type == "dex") {
    temp_stat_ = selected_input.value - 1;
    temp_stat_selection_ = dex;

    selected_stat_default = 1;
  }

  point_release = temp_stat_selection_ - temp_stat_;
  if (points + point_release < 0 || temp_stat_ < 0) {

    DisplayStat(hp, mp, atk, def, dex);
    return;
  }
  points = points + point_release;
  points_label.innerHTML = points;

  if (stat_type == "hp") {
    hp = temp_stat_;
  }
  else if (stat_type == "mp") {
    mp = temp_stat_;
  }
  else if (stat_type == "atk") {
    atk = temp_stat_;
  }
  else if (stat_type == "def") {
    def = temp_stat_;
  }
  else if (stat_type == "dex") {
    dex = temp_stat_;
  }
  DisplayStat(hp, mp, atk, def, dex);
  UpdateStats();

}
function CheckPlusPoint() {

  if (points == 0) {

    for (var i = 0; i < plus_.length; i++) {
      var plus = plus_[i];

      plus.style.opacity = "0";
      plus.style.cursor = "default";
      plus.setAttribute("disabled", "true");
    }
  }
  else if (plus_hp.hasAttribute("disabled")) {
    for (var i = 0; i < plus_.length; i++) {
      var plus = plus_[i];

      plus.style.opacity = "1";
      plus.style.cursor = "pointer";
      plus.removeAttribute('disabled');
    }
  }
}
function UpdateStat(stat_type, is_add) {
  (is_add) ? points-- : points++;
  points_label.innerHTML = points;
  if (stat_type == 'hp') {
    (is_add) ? hp++ : hp--;
  }
  else if (stat_type == 'mp') {
    (is_add) ? mp++ : mp--;
  }
  else if (stat_type == 'atk') {
    (is_add) ? atk++ : atk--;
  }
  else if (stat_type == 'def') {
    (is_add) ? def++ : def--;
  }
  else {
    (is_add) ? dex++ : dex--;
  }
  UpdateStats();
  DisplayStat(hp, mp, atk, def, dex);


  if (points == ((level_input.value - 1) * 3)) {
    DisablePointReset();
  }
  else {
    EnablePointReset();
  }
}
function UpdateBooster() {
  booster_ability = booster_input.value;
  booster_label.textContent = booster_input.value + "%";
  UpdateStats();
}


let reset_points = document.getElementById('reset-points');
function DisablePointReset() {
  reset_points.style.background = "#636363";
  reset_points.style.borderColor = "#111211";
  reset_points.style.cursor = "default";
  reset_points.style.pointerEvents = "none";
  reset_points.setAttribute("disabled", "");
}
function EnablePointReset() {
  reset_points.style.background = "#0060C6";
  reset_points.style.borderColor = "#001825";
  reset_points.style.cursor = "pointer";
  reset_points.style.pointerEvents = "all";
  reset_points.removeAttribute("disabled");
}
function SetItems(type, item_name, item_url, item_pow, item_def, item_price, item_hander, weapon_slot, type_class) {
  if (item_pow == undefined) {
    item_pow = 0;
    console.log("pow" + item_pow);
  }
  if (item_def == undefined) {
    item_def = 0;

    console.log("def" + item_def);
  }
  set_items.style.display = "none";
  items_container.innerHTML = '';
  switch (type) {
    case "helmets":
      selected_helmet.name = item_name;
      selected_helmet.attack = item_pow;
      selected_helmet.defense = item_def;
      selected_helmet.price = item_price;
      selected_helmet.class = type_class;
      item_helmet.style.backgroundImage = `url("static/statslab/${item_url}")`;
      if (item_url == "default") {
        item_helmet.style.backgroundImage = `url("static/statslab/UI/icon-helmets.png")`;
      }
      selected_helmet.url = item_url;
      break;
    case "armors":
      selected_armor.name = item_name;
      selected_armor.attack = item_pow;
      selected_armor.defense = item_def;
      selected_armor.price = item_price;
      selected_armor.class = type_class;
      item_armor.style.backgroundImage = `url("static/statslab/${item_url}")`;
      if (item_url == "default") {
        item_armor.style.backgroundImage = `url("static/statslab/UI/icon-armor.png")`;
      }
      selected_armor.url = item_url;
      break;
    case "pants":
      selected_pants.name = item_name;
      selected_pants.attack = item_pow;
      selected_pants.defense = item_def;
      selected_pants.price = item_price;
      selected_pants.class = type_class;
      item_pants.style.backgroundImage = `url("static/statslab/${item_url}")`;
      if (item_url == "default") {
        item_pants.style.backgroundImage = `url("static/statslab/UI/icon-pants.png")`;
      }
      selected_pants.url = item_url;
      break;
    case "shoes":
      selected_shoes.name = item_name;
      selected_shoes.attack = item_pow;
      selected_shoes.defense = item_def;
      selected_shoes.price = item_price;
      selected_shoes.class = type_class;
      item_shoes.style.backgroundImage = `url("static/statslab/${item_url}")`;
      if (item_url == "default") {
        item_shoes.style.backgroundImage = `url("static/statslab/UI/icon-shoes.png")`;
      }
      selected_shoes.url = item_url;

      break;
    case "weapons":

      switch (weapon_slot) {

        case "e1":
          selected_primary_weapon.name = item_name;
          selected_primary_weapon.power = item_pow;
          selected_primary_weapon.price = item_price;
          selected_primary_weapon.class = type_class;
          selected_primary_weapon.url = item_url;
          selected_primary_weapon.twohanded = item_hander;
          selected_primary_weapon.enchanted = weapon_enchanted;


          if (weapon_enchanted && item_name != "") {
            enchant_e1.style.opacity = "1";
          }
          else {
            enchant_e1.style.opacity = "0";
          }

          if (item_url == "default") {
            item_primary.style.backgroundImage = `url("static/statslab/UI/icon-single-handed.png")`;
          }
          else {
            item_primary.style.backgroundImage = `url("static/statslab/${item_url}")`;
          }


          if (item_hander == "true" || item_name == "") {
            selected_secondary_weapon = {
              name: "",
              power: 0,
              defense: 0,
              price: 0,
              class: "",
              url: "UI/icon-single-handed.png",
              twohanded: false,
              enchanted: false
            };
            item_secondary.style.backgroundImage = "url('static/statslab/UI/icon-single-handed.png')";
            enchant_e2.style.opacity = "0";
            equipped_two_hander = true;
            secondary_equip.style.display = "none";
          } else {
            equipped_two_hander = false;
            secondary_equip.style.display = "initial";
          }


          break;


        case "e2":
          selected_secondary_weapon.name = item_name;
          selected_secondary_weapon.class = type_class;
          selected_secondary_weapon.power = item_pow;
          selected_secondary_weapon.defense = item_def;
          selected_secondary_weapon.price = item_price;
          selected_secondary_weapon.url = item_url;
          selected_secondary_weapon.enchanted = weapon_enchanted;

          if (item_url == "default") {
            item_secondary.style.backgroundImage = `url("static/statslab/UI/icon-single-handed.png")`;
          }
          else {
            item_secondary.style.backgroundImage = `url("static/statslab/${item_url}")`;
          }

          if (weapon_enchanted && item_pow > 0 && item_name != "") {
            enchant_e2.style.opacity = "1";
          }
          else {
            enchant_e2.style.opacity = "0";
          }

          if (item_def > 0) {
            enchant_e2.style.opacity = "0";
          }

          break;

        case "s1":
          sheated_primary_weapon.name = item_name;
          sheated_primary_weapon.power = item_pow;
          sheated_primary_weapon.class = type_class;
          sheated_primary_weapon.defense = item_def;
          sheated_primary_weapon.price = item_price;
          sheated_primary_weapon.url = item_url;
          sheated_primary_weapon.twohanded = item_hander;
          sheated_primary_weapon.enchanted = false;
          if (item_hander == "true" || item_def > 0 || item_name == "") {
            sheathed_two_hander = true;

            secondary_sheath.style.display = "none";
          }
          else {
            sheathed_two_hander = false;

            secondary_sheath.style.display = "initial";

          }
          if (item_pow > 0 && weapon_enchanted && item_name != "") {
            sheated_primary_weapon.enchanted = true;
            enchant_s1.style.opacity = "1";
          }
          else {
            enchant_s1.style.opacity = "0";
          }


          if (item_url == "default") {
            item_sheath_primary.style.backgroundImage = `url("static/statslab/UI/icon-single-handed.png")`;
          }
          else {
            item_sheath_primary.style.backgroundImage = `url("static/statslab/${item_url}")`;
          }



          item_sheath_secondary.style.backgroundImage = "url('static/statslab/UI/icon-single-handed.png')";
          enchant_s2.style.opacity = "0";
          sheated_secondary_weapon = {
            name: "",
            power: 0,
            defense: 0,
            price: 0,
            class: "",
            url: "UI/icon-single-handed.png",
            twohanded: false,
            enchanted: false
          };

          break;

        case "s2":
          sheated_secondary_weapon.name = item_name;
          sheated_secondary_weapon.power = item_pow;
          sheated_secondary_weapon.price = item_price;
          sheated_secondary_weapon.class = type_class;
          sheated_secondary_weapon.url = item_url;
          sheated_secondary_weapon.enchanted = weapon_enchanted;
          item_sheath_secondary.style.backgroundImage = `url("static/statslab/${item_url}")`;

          if (item_url != "default") {
            enchant_s2.style.opacity = (weapon_enchanted) ? "1" : "0";
          }

          if (item_url == "default") {
            item_sheath_secondary.style.backgroundImage = `url("static/statslab/UI/icon-single-handed.png")`;
          }

          break;

      }
      break;


  }
  UpdateStats();
  if (shielded) {

    shield_cont.style.transform = "translateY(0px)";
  }
  booster_cont.style.transform = "translateY(0px)";
}







function DisplayEquipped(type, item, wslot) {
  let isEquipped = false;
  if (type == "armors") {
    isEquipped = (item.name == selected_armor.name);
  } else if (type == "helmets") {
    isEquipped = (item.name == selected_helmet.name);
  } else if (type == "pants") {

    isEquipped = (item.name == selected_pants.name);
  } else if (type == "shoes") {

    isEquipped = (item.name == selected_shoes.name);
  } else {
    if (wslot == "e1") {

      isEquipped = (item.name == selected_primary_weapon.name);
    }
    else if (wslot == "e2") {

      isEquipped = (item.name == selected_secondary_weapon.name);
    }
    else if (wslot == "s1") {

      isEquipped = (item.name == sheated_primary_weapon.name);
    }
    else if (wslot == "s2") {

      isEquipped = (item.name == sheated_secondary_weapon.name);
    }
  }
  let text_val = "";
  if (isEquipped) {
    text_val = `<div class='item-equipped-cont'><div class='item-equipped'></div></div>`
  }

  return text_val;

}




let include_all = false;
let enchanted = false;

let btn_image = document.getElementById("toggle-class-img");
let btn_image_2 = document.getElementById("toggle-enchanted-img");
function ToggleInclude() {
  set_items.style.display = "none";

  //btn_image.src = (include_all)?"static/statslab/UI/icon-checked.png":"static/statslab/UI/icon-unchecked.png";
  items_container.innerHTML = '';

  if (include_all) {
    include_all = false;
    btn_image.src = "static/statslab/UI/icon-unchecked.png";
    LoadItems(current_type_selected);

  }
  else {
    include_all = true;
    btn_image.src = "static/statslab/UI/icon-checked.png";
    LoadItems(current_type_selected);
  }


}
function ToggleEnchanted() {
  set_items.style.display = "none";
  items_container.innerHTML = '';

  if (enchanted) {
    enchanted = false;
    btn_image_2.src = "static/statslab/UI/icon-unchecked.png";
    LoadItems(current_type_selected);
  }
  else {
    enchanted = true;
    btn_image_2.src = "static/statslab/UI/icon-checked.png";
    LoadItems(current_type_selected);
  }

  weapon_enchanted = enchanted;

}

current_type_selected = "";

function LoadItems(type) {
  shield_cont.style.transform = "translateY(-80px)";
  booster_cont.style.transform = "translateY(-80px)";
  let parsedData;
  flags = 0;
  let weapon_slot = "";
  let shields;
  var temp_parse = "";
  current_type_selected = type;
  if (type == 'weapons-e1') {
    type = "weapons";
    weapon_slot = "e1";
  }
  else if (type == 'weapons-e2') {
    type = "weapons";
    weapon_slot = "e2";


    if (selected_class == 'warrior') {

      shields = warrior_shields;

    }
  }
  else if (type == 'weapons-s1') {
    type = "weapons";
    weapon_slot = "s1";


    if (selected_class == 'warrior') {
      shields = warrior_shields;
    }
  }
  else if (type == 'weapons-s2') {
    type = "weapons";
    weapon_slot = "s2";
  }

  let jsonfile = "";
  if (!include_all) {
    //jsonfile = "static/statslab/Item-Info/" + selected_class + "_" + type + ".json";
    parsedData = ReturnItems(selected_class, type);
  }


  else {
    //jsonfile = "static/statslab/Item-Info/warrior_" + type + ".json";
    parsedData = ReturnItems("warrior", type);

    //  console.log(type);


    temp_parse = ReturnItems("mage", type);

    temp_parse = ReturnItems("cowboy", type).concat(temp_parse);

    temp_parse = ReturnItems("archer", type).concat(temp_parse);



  }
  set_items.style.display = "flex";
  let shield_sheath = false;

  var out = "";

  if (selected_class == 'warrior') {
    if (weapon_slot == 's1') {
      parsedData = parsedData.concat(shields);
    }
    else if (weapon_slot == 'e2') {
      parsedData = parsedData.concat(shields);
    }
  }
  if (include_all) {
    parsedData = parsedData.concat(temp_parse);
    /* if (weapon_slot == 's1') {
       parsedData = parsedData.concat(shields);
     }
     else if (weapon_slot == 'e2') {
       parsedData = parsedData.concat(shields);
     }*/
    //console.log(temp_parse);
  }

  enchant_cont.style.display = (type == "weapons") ? "flex" : "none";
  for (let item of parsedData) {
    if (weapon_slot == "e2" || weapon_slot == "s2") {
      try {
        if (item.twohanded == null) {
          item.twohanded = false;

          //   console.log("Sets twohanded to false");
        }
        if (item.twohanded == true) {
          continue;
        }
      }
      catch (ex) {
        //  console.log(ex, item.name);

        ReloadItems(type, weapon_slot);

      }
    }
    try {
      if (item.power == null) {
        item.power = 0;
        // console.log("Sets power to 0");

      }
      if (item.defense == null) {
        item.defense = 0;
        // console.log("Sets defense to 0");

      }
      if (item.level == null) {
        item.level = 0;
        // console.log("Sets level to 0");

      }
      //item.power = item.power || 0;
      //item.defense = item.defense || 0;

    }
    catch (ex) {
      //     console.log(ex, item.name);
      ReloadItems(type, weapon_slot);
    }
    if (selected_level >= item.level) {

      out += `<div class="item" onclick='SetItems("` + type + `","` + item.name + `","` + item.url + `","` + item.power + `","` + item.defense + `","` + item.price + `","` + item.twohanded + `","` + weapon_slot + `","` + item.class + `");'>`;
    }
    else {
      out += `<div class="item-underleveled"> `;
    }
    if (item.power == 0) {
      item.power = null;
    }
    if (item.defense == 0) {
      item.defense = null;
    }
    let d_equipped_text = "";
    d_equipped_text = DisplayEquipped(type, item, weapon_slot);
    let enchantment_detail_img = "";
    out += d_equipped_text;
    let enchantment_value = 0;
    if (enchanted && type == "weapons" && item.power > 0) {
      out += `<div class="item-enchanted-cont"><img class="item-enchanted" src="static/statslab/UI/enchanted.png"></div>`;
      enchantment_detail_img = ` <div class="item-enchanted-cont"><img class="item-enchanted-detail" src="static/statslab/UI/enchanted.png"></div>`;
      enchantment_value = Math.round(Math.sqrt(item.price) * 2);
    }
    if (d_equipped_text != "") {
      out += `<img id="item-id-unhoverable" class="item-display"src='static/statslab/${item.url}'>`;
    }
    else {
      out += `<img class="item-display"src='static/statslab/${item.url}'>`;
    }
    out += `
            <div class="item-details">
              <p class="details-title">${item.name}</p> 
              ${enchantment_detail_img}
              <img class="details-img"src='static/statslab/${item.url}'>`;
    if (include_all) {
      out += `<p class="details-p"`;
      if (item.class == selected_class) {
        out += `id ="class-valid"`;
      }
      else {
        out += `id ="class-invalid"`;
      }
      out += `>Class: ${item.class}</p>`;
    }
    if (item.defense != null) {
      out += `<p class="details-p" >Defense: ${item.defense}</p>`;
    }
    if (item.power != null) {
      out += `<p class="details-p">`;
      out += (type == "weapons") ? `Power:` : `Attack:`;
      out += ` ${item.power}</p>`;
    }

    if (item.rpm != null) {
      out += `<p class="details-p">RPM: ${item.rpm}</p>`;
    }
    if (item.twohanded == true) {
      out += `<p class="details-p">TWO HANDED </p>`;
    }

    var temp_price = item.price.toLocaleString('en-US');
    out +=
      ` <p class="details-p" id="underleveled">Required Level: ${item.level}</p>
              <p class="details-p">Price: `+ temp_price + `</p>
      `;
    if (enchantment_value > 0) {
      out += `<p class="details-p details-enchanted">Enchantment Cost: ${enchantment_value}`;
    }
    out += `
        </div>
      </div>
      `;
  }
  out_remove =
    `<div class="item-remove" onclick='SetItems("` + type + `","","default","0","0","0","false","` + weapon_slot + `","");'>
    <img class="item-display"src='static/statslab/UI/icon-remove.png'>
  </div>
  `;

  items_container.innerHTML = out_remove + out;



}
var flags = 0;



function ReloadItems(items, w_slot) {
  items_container.innerHTML = '';
  if (w_slot != "") {
    w_slot = "-" + w_slot;
  }
  LoadItems(items + w_slot);
}


const inputElements = document.querySelectorAll('input[type="number"]');

inputElements.forEach(inputElement => {
  inputElement.addEventListener('input', function (event) {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/^0+/, '');

    inputValue = inputValue.replace(/[^0-9-]+/g, '');

    inputValue = inputValue.replace(/^-/, '');

    event.target.value = inputValue;
  });
});


function formatNumberWithAbbreviation(num) {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    return (num / 1000).toFixed(0) + 'k';
  } else if (num < 1000000000) {
    return (num / 1000000).toFixed(0) + 'm';
  } else if (num < 1000000000000) {
    return (num / 1000000000).toFixed(0) + 'b';
  } else {
    return (num / 1000000000000).toFixed(0) + 't';
  }
}

var m_dmg = [];
var m_def = [];

//SetMonsters();

function UpdateMonsterStat() {
  for (var i = 0; i < m_dmg.length; i++) {
    var temp_dmg = document.getElementById("m_dmg_" + i);
    var temp_def = document.getElementById("m_def_" + i);
    var dmg = Math.round(5 * (m_dmg[i] + 30) / (current_fdef + 30));
    console.log(dmg);
    temp_dmg.innerHTML = formatNumberWithAbbreviation(dmg);
    if (dmg >= 1) {
      temp_dmg.style.background = "linear-gradient(180deg, #EC0002 0%, #A9000B 100%)";
    }
    else {
      temp_dmg.style.background = "lime";
    }
    temp_def.innerHTML = formatNumberWithAbbreviation(Math.round(5 * (current_fatk_p + 30) / (m_def[i] + 30)));
  }
}


var Monster_selection = 1;
var Monster_toggle_variant = false;
var Pve_toggle = false;
var Monster_image_cont = document.getElementById('toggle-monster-img');
var Monster_stat_cont = document.getElementById('cont-stat-monster');
function ToggleMonsters() {
  Monster_selection++;
  if (Monster_selection > 4) {
    Monster_selection = 1;
  }



  if (Monster_selection == 1) {

    Monster_stat_cont.style = "transform:translateY(159px);";
    Pve_toggle = false;

    Monster_image_cont.style = " background-image:url('static/statslab/UI/monster-toggle-hide.png');";
  }
  else if (Monster_selection == 2) {

    Monster_stat_cont.style = "transform:translateY(0px);";
    Monster_toggle_variant = true;
    monster_cont.innerHTML = '';
    SetMonsters();
    Monster_image_cont.style = " background-image:url('static/statslab/UI/monster-toggle-show.png');";
  }
  else if (Monster_selection == 3) {

    Monster_toggle_variant = false;
    monster_cont.innerHTML = '';
    SetMonsters();
    Monster_image_cont.style = " background-image:url('static/statslab/UI/monster-toggle-variant.png');";
  }
  else {
    monster_cont.innerHTML = '';
    Pve_toggle = true;
    SetEnvironments();
    Monster_image_cont.style = "background-image:url('static/statslab/UI/pve-toggle.png');";
  }

  //console.log(Monster_selection)
}


function SetEnvironments() {


  var out = ``;
  var i = 0;
  m_dmg.length = 0;
  m_def.length = 0;

  for (let pve of environment_data) {

    let pve_dmg = 0;
    let pve_def = 0;


    let dmg_text = ``;

    let pve_dmg_ab = 0;
    let pve_def_ab = 0;
    let pve_dmg_disable = `style="display:none;"`;
    let pve_def_disable = `style="display:none;"`;
    if (pve.attack != undefined) {
      pve_dmg = pve.attack * pve.attack;
      let dmg_pve = Math.round(5 * (pve_dmg + 30) / (current_fdef + 30));
      pve_dmg_ab = formatNumberWithAbbreviation(dmg_pve);
      console.log("here:" + dmg_pve);

      dmg_text = `style="background:` + ((dmg_pve > 0) ? 'linear-gradient(180deg, #EC0002 0%, #A9000B 100%)' : 'lime') + `"`;
      console.log(dmg_text);
      pve_dmg_disable = ``;
    }

    if (pve.defense != undefined) {
      pve_def = pve.defense * pve.defense;
      let def_pve = Math.round((current_fatk_p + 30) / (pve_def) * 5);
      pve_def_ab = formatNumberWithAbbreviation(def_pve);
      pve_def_disable = ``;
    }

    m_dmg.push(pve_dmg);
    m_def.push(pve_def);



    out += `<div class='monster-index' >
          <div class='monster-image' title='${pve.name}' style='background-image:url(${pve.url});'></div>
          <div class='monster-stat'>
            <div class='monster-dmg' title='${pve.name} Damage to you' ${pve_dmg_disable}>
              <div class='monster-dmg-icon'> </div>
              <p id="m_dmg_`+ i + `" ${dmg_text}  >` + pve_dmg_ab + `</p>
            </div>
            <div class='monster-def' title='Your Damage Dealt' ${pve_def_disable}>
              <div class='monster-def-icon'> </div>
              <p id="m_def_`+ i + `">` + pve_def_ab + `</p>
            </div>
          </div>
    </div>`;

    i++;
  }

  monster_cont.innerHTML = out;
  // UpdateMonsterStat();
  console.log(m_dmg);
  console.log(m_def);

}

function SetMonsters() {


  var out = ``;


  var i = 0;
  m_dmg.length = 0;
  m_def.length = 0;


  for (let monster of monsters_data) {

    var m_def_bonus = 0;
    var m_atk_bonus = 0;
    if (Monster_toggle_variant && monster.variant) {
      continue;
    }

    if (monster.variant) {
      m_def_bonus = monster.variant_def;
      m_atk_bonus = monster.variant_atk;
    }


    var monster_dmg = monster.attack * (monster.attack + m_atk_bonus);
    var monster_def = monster.defense * (monster.defense + m_def_bonus);

    if (monster.name.includes("Sasquatch")) {
      monster_dmg = monster_dmg * 2.5; // Punch 250%
    }
    let d_dmg = monster_dmg;
    let d_def = monster_def;

    m_dmg.push(monster_dmg);
    m_def.push(monster_def);
    var dmg = Math.round(5 * (monster_dmg + 30) / (current_fdef + 30));
    var monster_dmg = formatNumberWithAbbreviation(dmg);
    var monster_def = formatNumberWithAbbreviation(Math.round(((current_fatk_p + 30) / ((monster_def + 30) * 5))));


    out += `<div class='monster-index' onclick="DisplayMonsterDetail(${d_dmg},${d_def},'${monster.url}','${monster.hp}','${monster.name}');">
          <div class='monster-image' title='${monster.name}' style='background-image:url(${monster.url});'></div>
          <div class='monster-stat'>
            <div class='monster-dmg' title='Monster Damage to you'>
              <div class='monster-dmg-icon'> </div>
              <p id="m_dmg_`+ i + `" style='color:` + ((dmg >= 1) ? 'red' : '#00EA00') + `'>` + monster_dmg + `</p>
            </div>
            <div class='monster-def' title='Your Damage Dealt'>
              <div class='monster-def-icon'> </div>
              <p id="m_def_`+ i + `">` + monster_def + `</p>
            </div>
          </div>
    </div>`;

    i++;
  }
  monster_cont.innerHTML = out;
  UpdateMonsterStat();

}


function DisplayMonsterDetail(dmg, def, url, hp, m_name) {

  current_m_name = m_name;
  UpdateSkillCase();
  RequestSkillsInfo(dmg, def, url, hp);
  DisplayDetailedDamage();


  //console.log(dmg + ":" + def + ":" + url);
}


function SetWarriorDamage() {

  return;
}



let d_cont = document.getElementById('damage-cont');
let t_cont = document.getElementById('cont-title-id');
var skill_weapon_case = "";
let cont_skills = document.getElementById('cont-skills-id');
let cont_damage = document.getElementById('cont-damage-id');





function UpdateSkillCase() {
  if (equipped_two_hander == null) {
    equipped_two_hander = false;
  }
  if (equipped_two_hander) {
    skill_weapon_case = "two hander";
  }
  else if (shielded) {
    skill_weapon_case = "shield";
  }
  else {
    skill_weapon_case = "dual";
  }
}

var skill_level = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //data saves
var skills = [];
var current_m_def = 0;
var current_m_hp = 0;
var current_m_name = "";
function RepaintSkillLevel(id, val, j) {

  let p_lvl = document.getElementById('skill-lvl-id-' + id);
  p_lvl.innerHTML = "lvl: " + val;

  let p_skill = document.getElementById('skill-type-' + id);
  let p_skill_crit = document.getElementById('skill-type-crit-' + id);
  let p_label = document.getElementById('skill-label-type-' + id);

  let hit_identifier = document.getElementById('skill-onehit-' + id);
  let hit_identifier_crit = document.getElementById('skill-onehit-crit-' + id);

  skill_level[id] = val; //updates skill data
  skills[j].skill_level = parseInt(val); //updates skill data


  let p_skill_mp = document.getElementById('skill-mana-'+id);
  
  let s_base_val = skills[j].base_value;
  let s_increase_val = skills[j].value_increase;
  let s_level = skills[j].skill_level;
  let s_base_mp = skills[j].base_mp;
  let s_increase_mp = skills[j].mp_increase;

  p_skill_mp.innerHTML = s_base_mp + (s_increase_mp * s_level);

  /*
  let p_dmg = Math.round(5 * (current_fatk_p + 30) / (m_def + 30));
  let p_dmg_crit = Math.floor(p_dmg * dex_crit_chance[dex]);
  let temp_p = (5 * (current_fatk_p + 30) / (m_def + 30));

  temp_p = temp_p.toFixed(6);

  let skill_damage = Math.round(temp_p * (skill.base_value + (skill.value_increase * skill_level[i])));
  let skill_damage_crit = Math.floor(skill_damage * dex_crit_chance[dex]);
  */
  let p_dmg = (5 * (current_fatk_p + 30) / (current_m_def + 30));
  let p_dmg_crit = Math.floor(Math.round(p_dmg) * dex_crit_chance[dex]);
  p_dmg = p_dmg.toFixed(6);

  if (skills[j].is_multiply) {


    p_skill.innerHTML = Math.round(p_dmg) + "<span> x" + (s_level + 1) + "</span>";
    p_skill_crit.innerHTML = p_dmg_crit;

    p_label.innerHTML = "";


    hit_identifier.innerHTML = (Math.round(p_dmg * (s_level + 1)) >= current_m_hp) ? "1 Shot" : "";
    hit_identifier_crit.innerHTML = ((p_dmg_crit * (s_level + 1)) >= current_m_hp) ? "1 Shot" : "";
  }
  else {



    p_label.innerHTML = "(" + Math.round((s_base_val + (s_increase_val * s_level)) * 100) + "%)";


    let skill_damage = Math.round(p_dmg * (s_base_val + (s_increase_val * s_level)));
    let skill_damage_crit = Math.floor(skill_damage * dex_crit_chance[dex]);

    p_skill.innerHTML = skill_damage;
    p_skill_crit.innerHTML = skill_damage_crit;

    hit_identifier.innerHTML = (skill_damage >= current_m_hp) ? "1 Hit" : "";
    hit_identifier_crit.innerHTML = (skill_damage_crit >= current_m_hp) ? "1 Hit" : "";
  }

  /*
  "base_value": skill.base_value,
    "value_increase": skill.value_increase,
      "skill_id": i + 1,
        "is_multiply": skill.is_multiply,
          "skill_level": i
  */



}
function RequestSkillsInfo(m_dmg, m_def, m_url, m_hp) {
  skills = [];
  if (isNaN(dex_crit_chance[dex])) {
    dex_crit_chance[dex] = 0;
  }


  var skill_info_data = "";
  let skill_damage_info = "";

  let i = 0;
  current_m_def = m_def;
  current_m_hp = m_hp;
  let p_dmg = Math.round(5 * (current_fatk_p + 30) / (m_def + 30));

  let p_dmg_crit = Math.floor(p_dmg * dex_crit_chance[dex]);

  let p_dmg_fire = Math.round(((5 * (current_fatk_p + 30) / (m_def + 30)) * 0.1) * (1 + bonus_enchant_damage));
  let p_dmg_electric = Math.round(((5 * (current_fatk_p + 30) / (m_def + 30)) * 0.35) * (1 + bonus_enchant_damage));
  let p_dmg_poison = 0;
  let p_dmg_ice = 0;


  let text_crit_display = "Base Damage Crit";
  if (dex_crit_chance[dex] == 0) {
    text_crit_display = "Dex Unavailable";
  }
  let text_element_display = `
  <div class="damage-dealt-m-cont">
          <div class="dealt-element-cont" title="10% of base damage per tick (10 ticks) for 6 seconds">
            <img src="static/statslab/UI/icon-element-fire.png">
            ${(p_dmg_fire >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
            <p class="element-fire" >${p_dmg_fire}</p>
          </div>

          <div class="dealt-element-cont"  title="35% of base damage">
            <img src="static/statslab/UI/icon-element-electric.png">
            ${(p_dmg_electric >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
            <p class="element-electric">${p_dmg_electric}</p>
          </div>
        </div>

        <div class="damage-dealt-m-cont">
          <div class="dealt-element-cont">
            <img src="static/statslab/UI/icon-element-poison.png">
            ${(p_dmg_poison >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
            <p class="element-poison">${p_dmg_poison}</p>
          </div>
        
          <div class="dealt-element-cont">
            <p id="element-reserved" >ICE RESERVED</p>
          </div>
        </div>`;
  if (!(selected_primary_weapon.enchanted || selected_secondary_weapon.enchanted)) {
    text_element_display = `<p id="active-elements-info"><i>To display elemental damage equip an enchanted weapon</i></p>`;
  }

  skill_damage_info +=
    `
      <div class="base-damage-detail-cont">
        <div class="base-info-detail-cont">
          <img src="${m_url}">
          <div class="base-info-detail">
          
              <p>${current_m_name.substring(0, 33)}</p>
          
              <p id="hp-val" ><span>HP:</span> ${m_hp}</p>
           
          </div>
        </div>
      </div>
      <div class="skill-damage-detail-cont">
        ${text_element_display}

        <div class="damage-dealt-m-cont">
          <div class="dealt-cont">
            <label>Base Damage</label>
            <img src="static/statslab/UI/icon-base-damage.png">
            ${(p_dmg >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
            <p>${p_dmg}</p>
          </div>
          <div class="dealt-cont">
            <label style="text-align: center;width: 100%;">${text_crit_display}</label>
            <img src="static/statslab/UI/icon-base-damage-crit.png">
            ${(p_dmg_crit >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
            <p>${p_dmg_crit}</p>
          </div>
        </div>

        
      `;
  let j = 0;
  for (let skill of skills_data) {

    if (skill.class == selected_class) {
      let disable_cont = `disable-skill-cont`;

      if (skill.weapon_type == skill_weapon_case || skill.weapon_type == "any") {
        disable_cont = ``;

      }
      skill_info_data +=
        `
            <div  class="skill-detail-cont skill-class-${selected_class} ${disable_cont}">
            
              <img src="static/statslab/${skill.url}">
              <div class="skill-detail-more-cont">
                <p>${skill.name}</p> 
                <div class="range-level-cont">
                  <input type="range" min="0" max="${skill.max_level}" value="${skill_level[i]}" onchange="RepaintSkillLevel(${i},this.value,${j});">
                  <p id="skill-lvl-id-${i}">lvl: ${skill_level[i]}</p>
                  <div class="mana-cont">
                    <div class="mana-icon">
                    </div>
                    <p id="skill-mana-${i}">${skill.base_mp + (skill.mp_increase * skill_level[i])}</p>
                  </div>
                </div>
              </div> 

            </div>
            
            `;

      if (skill.weapon_type == skill_weapon_case || skill.weapon_type == "any") {
        j++;
        //Math.round(5 * (current_fatk_p + 30) / (m_def + 30));

        let temp_p = (5 * (current_fatk_p + 30) / (m_def + 30));
        temp_p = temp_p.toFixed(6);


        let skill_damage = Math.round(temp_p * (skill.base_value + (skill.value_increase * skill_level[i])));
        let skill_damage_crit = Math.floor(skill_damage * dex_crit_chance[dex]);

        let temp_skill = {
          "base_value": skill.base_value,
          "value_increase": skill.value_increase,
          "skill_level": skill_level[i],
          "is_multiply": skill.is_multiply,
          "base_mp":skill.base_mp,
          "mp_increase":skill.mp_increase
        }
        skills.push(temp_skill);
        let text = "";
        let text_display_multiplier = "(" + Math.round((skill.base_value + (skill.value_increase * skill_level[i])) * 100) + "%)";

        let text_damage = skill_damage;
        let text_damage_crit = skill_damage_crit;


        let crit_class_identifier = "Skill Crit";

        if (skill.is_multiply) {
          text = "x" + (parseInt(skill_level[i]) + 1);

          text_damage = p_dmg;
          text_damage_crit = p_dmg_crit;
          text_display_multiplier = "";

          if (skill.class == "archer") {
            crit_class_identifier = "per arrow Crit";
          }
          else if (skill.class == "cowboy") {
            crit_class_identifier = "per bullet Crit";
          }
          else if (skill.class == "mage") {
            crit_class_identifier = "per orb Crit";
          }

        }

        if (dex_crit_chance[dex] == 0) {
          crit_class_identifier = "Dex Unavailable";
        }

        let hit_identifier = (text_damage >= m_hp) ? "1 Hit" : "";
        let hit_identifier_crit = (text_damage_crit >= m_hp) ? "1 Hit" : "";

        let skill_dmg = (skill.base_value + (skill.value_increase * skill_level[i]));
        let base_dmg = (5 * (current_fatk_p + 30) / (m_def + 30));
        let skill_element_fire = Math.round(((base_dmg * 0.1) * skill_dmg) * (1 + bonus_enchant_damage));
        let skill_element_electric = Math.round(((base_dmg * 0.35) * skill_dmg) * (1 + bonus_enchant_damage));
        let skill_element_poison = 0;


        let skill_damage_more_info = ``;

        if (skill.is_multiply) {
          hit_identifier = ((text_damage * (parseInt(skill_level[i]) + 1)) >= m_hp) ? "1 Shot" : "";
          hit_identifier_crit = ((text_damage_crit * (parseInt(skill_level[i]) + 1)) >= m_hp) ? "1 Shot" : "";
        }
        else if (selected_primary_weapon.enchanted || selected_secondary_weapon.enchanted) {
          skill_damage_more_info += `
          <div class="skill-damage-list-cont" id="skill-class-${selected_class}" >
            <h6>${skill.name} elemental damage </h6>
            <div class="skill-dealt-element-cont" title="10% of skill damage per tick (10 ticks) for 6 seconds">
              <img src="static/statslab/UI/icon-element-fire.png">
              ${(skill_element_fire >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
              <p class="element-fire" >${skill_element_fire}</p>
            </div>
            <div class="skill-dealt-element-cont" title="35% of skill damage ">
              <img src="static/statslab/UI/icon-element-electric.png">
              ${(skill_element_fire >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
              <p class="element-electric" >${skill_element_electric}</p>
            </div>
            <div class="skill-dealt-element-cont" >
              <img src="static/statslab/UI/icon-element-poison.png">
              ${(skill_element_poison >= m_hp) ? "<div class='display-one-hit'>1 Hit</div>" : ""}
              <p class="element-poison">${skill_element_poison}</p>
            </div>
            
          </div>  
        `;
        }
        skill_damage_info += `
                <div class="damage-dealt-m-cont">
                  ${skill_damage_more_info}
                  <div class="dealt-cont">
                    <label >${skill.name} <span id="skill-label-type-${i}"> ${text_display_multiplier} </span></p></label>
                    <img src="static/statslab/UI/icon-base-damage.png">
                    <div class='display-one-hit' id="skill-onehit-${i}" >${hit_identifier}</div>
                    <p id="skill-type-${i}">${text_damage} <span id="skill-label-multiplier-${i}">${text}</span></p>
                  </div>
                  <div class="dealt-cont">
                    <label style="text-align: center;width: 100%;">${crit_class_identifier}</label>
                    <img src="static/statslab/UI/icon-base-damage-crit.png">
                    <div class='display-one-hit' id="skill-onehit-crit-${i}" >${hit_identifier_crit}</div>
                    <p id="skill-type-crit-${i}">${text_damage_crit}</p>
                  </div>
                </div>
                  `;
      }

    }
    i++;


  }

  skill_damage_info += `</div>`;
  skill_info_data += `<p id="active-skills-info"> <i>Active skills depends on your equipped weapon type</i> </p>`;
  cont_skills.innerHTML = skill_info_data;
  cont_damage.innerHTML = skill_damage_info;
}








function DisplayDetailedDamage() {
  d_cont.style.display = "flex";
  t_cont.innerHTML = "YOUR DAMAGE DEALT ";
  booster_cont.style.transform = "translateY(-80px)";
  shield_cont.style.transform = "translateY(-80px)";


}
function CloseDetailedDamage() {
  d_cont.style.display = "none";

  t_cont.innerHTML = "REBORN STAT LAB";

  booster_cont.style.transform = "translateY(0px)";

  if (shielded) {
    shield_cont.style.transform = "translateY(0px)";
  }


}











function SetLoad() {



  UpdateStats();
}
function SetSave() {

  //get input value
  let saveNameInput = document.getElementById('save-name-input');
  let enteredName = saveNameInput.value.trim().toLowerCase();

  if (enteredName == "") {
    alert("Please enter a name before saving.");
    return;
  }


  CloseSavingTab();

  let save_data = [];
  let saves = JSON.parse(localStorage.getItem("SaveData"));
  if (saves == null) {
    saves = [];
  }
  SaveActionControl(0);

  let save_name = "";

  if (saves.includes(enteredName)) {

    alert("name already exist");
    return;
  }
  save_name = enteredName;
  saveNameInput.value = "";
  saves.push(save_name);
  saves.sort();
  localStorage.setItem("SaveData", JSON.stringify(saves));

  save_data.push(save_name);
  save_data.push(selected_level);
  save_data.push(shield_ability);
  save_data.push(booster_ability);
  save_data.push(selected_class);
  save_data.push(hp);
  save_data.push(mp);
  save_data.push(atk);
  save_data.push(def);
  save_data.push(dex);
  save_data.push(selected_helmet);
  save_data.push(selected_armor);
  save_data.push(selected_pants);
  save_data.push(selected_shoes);
  save_data.push(selected_primary_weapon);
  save_data.push(selected_secondary_weapon);
  save_data.push(sheated_primary_weapon);
  save_data.push(sheated_secondary_weapon);
  save_data.push(skill_level);
  localStorage.setItem(save_name, JSON.stringify(save_data));
  //call set items();
  //let test = JSON.parse(localStorage.getItem("Save 1"));
  /*console.log(test[0]);
  console.log(test[1]);
  console.log(test[2]);*/

}


function TriggerSaves() {

  cont_saving.style.display = "flex";
  SaveDisplayDetails();
}

function CloseSavingTab() {
  cont_saving.style.display = "none";
}
function RequestTextIdentifier(i_name, identifier_value) {
  let text
    = `
    <div class="save-detail-h">
      <div class="save-selected-info">
          <p class="save-info-type">${i_name}: </p>
          <p id="display-${i_name}">${identifier_value}</p>
      </div>
    </div>
  `;
  return text;
}

function SaveDisplayDetails() {

  DisplaySavesList();

  let temp_name = "Current";
  SaveActionControl(1);
  temp_name = "Current";

  let out = `<h1 style="margin:20px;" id="display-name" >${temp_name}</h1>`;

  out += `
    <div class="save-detail-h">
      <div class="save-selected-info">
          <p class="save-info-type">Class: </p>
          <p id="display-class">${selected_class}</p>
      </div>
    </div>
  `;

  out += RequestTextIdentifier("level", selected_level);
  out += RequestTextIdentifier("hp", (15 + (hp * 5)));
  out += RequestTextIdentifier("mp", (mp * 3));
  out += RequestTextIdentifier("atk", (atk + 1));
  out += RequestTextIdentifier("def", (def + 1));
  out += RequestTextIdentifier("dex", (dex + 1));

  save_details.innerHTML = out;


  //SaveActionControl(3); UPDATE

  //2ND TIME pressing the "load" cause bug not workiing to load current save data
}


function SaveActionControl(n) {
  save_action_1.style.display = "none";
  save_action_2.style.display = "none"
  save_action_3.style.display = "none";
  if (n == 1) {
    save_action_1.style.display = "flex";
  }
  else if (n == 2) {
    save_action_2.style.display = "flex";
  }
  else if (n == 3) {
    save_action_3.style.display = "flex";
  }
}

function DisplaySavesList() {

  let saves_data = JSON.parse(localStorage.getItem("SaveData"));
  let saves_list_text = ``;
  if (saves_data == null) {
    return;
  }
  for (let i = 0; i < saves_data.length; i++) {

    let current_save_data = JSON.parse(localStorage.getItem(saves_data[i]));
    if (current_save_data == null) {
      continue;
    }
    let current_img_url = current_save_data[10].url;
    if (current_img_url == "") {
      current_img_url = "UI/icon-helmets.png";
    }
    let s_text = ``;
    if (i == selected_save) {
      s_text = `id="save-data-active"`;
    }
    saves_list_text += `
      <div class="saved-data-cont" ${s_text} onclick="SelectSaveSlot(${i});">
        <img src="static/statslab/${current_img_url}">
        <p>${current_save_data[0]}</p>
      </div>
    `;
  }

  save_list_cont.innerHTML = saves_list_text;

}

function SelectSaveSlot(slot_n) {
  let saves_data = JSON.parse(localStorage.getItem("SaveData"));
  let selected_save_data = JSON.parse(localStorage.getItem(saves_data[slot_n]));
  SaveActionControl(2);
  let action_button = document.getElementById("button-load");
  let display_name = document.getElementById("display-name");
  let display_class = document.getElementById("display-class");
  let display_level = document.getElementById("display-level");
  let display_hp = document.getElementById("display-hp");
  let display_mp = document.getElementById("display-mp");
  let display_atk = document.getElementById("display-atk");
  let display_def = document.getElementById("display-def");
  let display_dex = document.getElementById("display-dex");

  action_button.value = slot_n;
  display_name.innerHTML = selected_save_data[0];
  display_class.innerHTML = selected_save_data[4];
  display_level.innerHTML = selected_save_data[1];
  display_hp.innerHTML = (15 + (parseInt(selected_save_data[5]) * 5));
  display_mp.innerHTML = (parseInt(selected_save_data[6]) * 3);
  display_atk.innerHTML = (parseInt(selected_save_data[7]) + 1);
  display_def.innerHTML = (parseInt(selected_save_data[8]) + 1);
  display_dex.innerHTML = (parseInt(selected_save_data[9]) + 1);

  let del_button = document.getElementById("action-delete-id");
  del_button.setAttribute("onclick", "DeleteSaveSlot('" + slot_n + "')");
}

function LoadSaveSlot(slot_n) {
  let saves_data = JSON.parse(localStorage.getItem("SaveData"));
  let sd = JSON.parse(localStorage.getItem(saves_data[slot_n]));

  SetClass(sd[4]);

  selected_save = slot_n;
  save_name = sd[0];
  selected_level = sd[1];
  shield_ability = sd[2];
  booster_ability = sd[3];

  level_input.value = sd[1];
  UpdateLevel();

  hp = sd[5];
  mp = sd[6];
  atk = sd[7];
  def = sd[8];
  dex = sd[9];
  points -= hp + mp + atk + def + dex;
  points_label.innerHTML = points;

  DisplayStat(hp, mp, atk, def, dex)
  UpdateStats();

  booster_input.value = booster_ability;
  UpdateBooster();
  shield_input.value = shield_ability;
  UpdateShield();
  if (sd[14].enchanted == undefined) {
    sd[14].enchanted = false;
  }
  if (sd[15].enchanted == undefined) {
    sd[15].enchanted = false;
  }
  if (sd[16].enchanted == undefined) {
    sd[16].enchanted = false;
  }
  if (sd[16].enchanted == undefined) {
    sd[16].enchanted = false;
  }




  LoadSaveItems(sd[10], "helmets", "");
  LoadSaveItems(sd[11], "armors", "");
  LoadSaveItems(sd[12], "pants", "");
  LoadSaveItems(sd[13], "shoes", "");

  weapon_enchanted = sd[14].enchanted;
  LoadSaveItems(sd[14], "weapons", "e1");

  weapon_enchanted = sd[15].enchanted;
  LoadSaveItems(sd[15], "weapons", "e2");

  weapon_enchanted = sd[16].enchanted;
  LoadSaveItems(sd[16], "weapons", "s1");

  weapon_enchanted = sd[17].enchanted;
  LoadSaveItems(sd[17], "weapons", "s2");
  weapon_enchanted = enchanted;
  UpdateStats();

  if (shielded) {
    shield_cont.style.transform = "translateY(0px)";
  }

  booster_cont.style.transform = "translateY(0px)";
  skill_level = sd[18];
  CloseSavingTab();
}
function LoadSaveItems(s_data, type, w_slot) {

  let s_name = s_data.name;
  let s_url = s_data.url;
  let s_atk = s_data.attack;
  let s_def = s_data.defense;
  let s_price = s_data.price;

  let s_class = s_data.class;

  let s_hander = "";
  if (type == "weapons") {
    s_atk = s_data.power;
    s_hander = s_data.twohanded;
  }
  SetItems(type, s_name, s_url, s_atk, s_def, s_price, s_hander, w_slot, s_class);
}


function DeleteSaveSlot(slot_id) {
  CloseSavingTab();
  /*
  let saves = JSON.parse(localStorage.getItem("SaveData"));
  if (saves == null) {
    saves = [];
  }
  for (let i = 0; i < saves.length - 1; i++) {
    if (i == slot_id) {
      continue;
    }
    save_name = "Save " + (parseInt(saves.length) + 1);
    saves.push(save_name);
  }








  localStorage.setItem("SaveData", JSON.stringify(saves));

*/

  let saves = JSON.parse(localStorage.getItem("SaveData"));
  localStorage.removeItem(saves[slot_id]);
  saves.splice(slot_id, 1);
  localStorage.setItem("SaveData", JSON.stringify(saves));

  DisplaySavesList();
}



function TutorialLink() {
  let newTab = window.open();

  newTab.location.href = "https://www.youtube.com/watch?v=ILISxC_CF30&ab_channel=BlueHairedDirt";
}


function ToggleGuard(toggle_case) {
  is_shield_guarded = toggle_case;
  UpdateStats();
  let guard_button_off = document.getElementById('toggle-guard-off');
  let guard_button_on = document.getElementById('toggle-guard-on');

  guard_button_off.style.background = (toggle_case) ? "#636363" : "#00C500";
  guard_button_on.style.background = (!toggle_case) ? "#636363" : "#00C500";

  guard_button_on.style.borderColor = (toggle_case) ? "#002000" : "#111211";
  guard_button_off.style.borderColor = (!toggle_case) ? "#002000" : "#111211";

}

const CloseGuard = () => guard_cont.style.display = "none";
const OpenGuard = () => guard_cont.style.display = "block";

const UpdateGuardSkill = (g_skill_val) => {

  document.getElementById('guard-skill-label').innerHTML = g_skill_val + "%";
  shield_guard = g_skill_val;
  UpdateStats();
}



// electric element 35% of base attack
// x = math.round(5*(a*a + 30) / (b + 30))

