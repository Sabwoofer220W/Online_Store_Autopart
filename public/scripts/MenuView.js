window.onload = function(){
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


// Кнопки поиска при адаптации
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


}

/*var FunFormModelAuto = function(MarkAuto) {
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


}*/
