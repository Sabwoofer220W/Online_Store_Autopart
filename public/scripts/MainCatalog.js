//window.onload = function(){
let ButtonMenu = document.querySelector(".Header_Top_ButMenu");
let ButtonMenuShow = document.querySelector(".Header_Top_ButMenu_Menu");
let ButtonMenuShow_bool=false;

ButtonMenu.addEventListener('click', () =>{
  if(ButtonMenuShow_bool == false){
    ButtonMenuShow.style.display="flex";
    ButtonMenuShow_bool=true;
  } else if(ButtonMenuShow_bool == true){
      ButtonMenuShow.style.display="none";
      ButtonMenuShow_bool=false;
  }

});
document.addEventListener('click', function(e) {
if(e.target.className != "Header_Top_ButMenu_Menu" && e.target.className != "Header_Top_ButMenu"){
  ButtonMenuShow.style.display="none";
  ButtonMenuShow_bool=false;
}

});

let ButtonAdaptiveHead = document.querySelector("#ButtonAdaptiveHead");
let ButtonAdaptiveSerch = document.querySelector("#ButtonAdaptiveSerch");
let ButtonViewSerch = document.querySelector("#ButtonViewSerch");
let ButtonBack = document.querySelector("#ButtonBack");
let ButtonViewSerchBool = false;

ButtonViewSerch.addEventListener('click', () =>{
ButtonAdaptiveHead.style.display = "none";
ButtonAdaptiveSerch.style.display="flex";
});
ButtonBack.addEventListener('click', () =>{
ButtonAdaptiveSerch.style.display="none";
ButtonAdaptiveHead.style.display = "flex";
});

var formMarkAuto = document.querySelector('#formMarkAuto');
var formModelAuto = document.getElementById('formModelAuto');
var ModelAutotext = document.getElementById('ModelAutotext');

//}

var FunFormModelAuto = function(MarkAuto) {
  formModelAuto.innerHTML = '<option>Все</option>';

    if(formMarkAuto.value != "Выбрать" && formMarkAuto.value != "Все"){
      for (var i = 0; i < MarkAuto.length; i++) {
        if (MarkAuto[i].brandAuto == formMarkAuto.value) {
          let modelAutoLength = MarkAuto[i].modelAuto.length;
          	for (let j = 0; j < modelAutoLength; j++) {
              let option = document.createElement('option');
               option.innerHTML = MarkAuto[i].modelAuto[j].Model;
               formModelAuto.append(option)
            }
        }

      }

      formModelAuto.style.display = 'inline';
      ModelAutotext.style.display = 'inline';
    } else {
      formModelAuto.style.display = 'none';
        ModelAutotext.style.display = 'none';
    }


}
var formManufacturer = document.querySelector('#formManufacturer');
var FunManufacturer = function(AllManufacturer) {
  function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}
let AllManufacturerMass = unique(AllManufacturer);
formManufacturer.innerHTML ='';
formManufacturer.innerHTML='<option>Все</option>';
  for (let i = 0; i < AllManufacturerMass.length; i++) {
  	let option2 = document.createElement('option');
   	option2.innerHTML = AllManufacturerMass[i]
   	formManufacturer.append(option2)

  }
}

function displayBasket() {
let Content_categories_a_Button = document.querySelectorAll(".Content_categories_a_Button");

for (var i = 0; i < localStorage.length; i++) {

  let key = localStorage.key(i);
  for (var j = 0; j < Content_categories_a_Button.length; j++) {
  if(key.slice(0, 2) == 'id'){
    let localArr = localStorage.getItem(key).split('|');
    if(Content_categories_a_Button[j].id == localArr[0]){
      Content_categories_a_Button[j].style.backgroundColor = '#9c9c9c';
    }

  }
  }

}
}

// Пагинация -------------------------------------------------------------------
let Content_categories_a = document.querySelectorAll(".Content_categories_a");
if (Content_categories_a.length > 20) {
for (var i = 21; i < Content_categories_a.length; i++) {
  Content_categories_a[i].style.display = "none";
}
}

let ShowMore = document.querySelector("#ShowMore");
ShowMore.addEventListener('click', ()=>{
  for (var i = 21; i < Content_categories_a.length; i++) {
    Content_categories_a[i].style.display = "flex";
  }
  ShowMore.style.display = 'none';
});
//---------------------------------------------------------------------------------
