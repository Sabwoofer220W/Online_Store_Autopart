function CalculatingThePrice() {
let Finalresult = document.querySelector('.FinalPrice');
let FinalPriceAll = document.querySelectorAll('#FinalPrice');
let Priceresult = 0;
let strFinalPriceAll = '';

for (var i = 0; i < FinalPriceAll.length; i++) {
  let FinalPriceAllSplit = (FinalPriceAll[i].innerHTML).split(" ");
  if (FinalPriceAllSplit.length == 3){
    strFinalPriceAll = (FinalPriceAllSplit)[1];
    Priceresult = Priceresult + Number(strFinalPriceAll);
  } else if (FinalPriceAllSplit.length == 4){
    strFinalPriceAll = FinalPriceAllSplit[1] + FinalPriceAllSplit[2];
    Priceresult = Priceresult + Number(strFinalPriceAll);
  }

}

Finalresult.innerHTML = 'Итог: '+Priceresult+' руб.';
}

function ShowProductsLocalStorage() {
  let Content_product = document.querySelector('.Content_product');
  for (var i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if(key.slice(0, 2) == 'id'){
      let localArr = localStorage.getItem(key).split('|');
      let localArrIMG = localArr[4].split('/');
      //console.log(localArrIMG);
      let SrcImg = localArrIMG[5];
      //console.log(SrcImg);
      //console.log(localStorage.getItem(key).split('|'));
      //--------------------------------------------------------------
      let divContent_productOne = document.createElement('div');
      divContent_productOne.className = "Content_productOne";
      //--------------------------------------------------------------
      let divContent_productOne_div = document.createElement('div');
      //--------------------------------------------------------------
      let imgContent_productOne_img = document.createElement('img');
      imgContent_productOne_img.className = "Content_productOne_img";
      imgContent_productOne_img.src = '../public/img/details/'+SrcImg;
      //--------------------------------------------------------------
      let divContent_productOne_description = document.createElement('div');
      divContent_productOne_description.className = "Content_productOne_description";
      //--------------------------------------------------------------
      let Content_productOne_description_points = document.createElement('div');
      Content_productOne_description_points.className = "Content_productOne_description_points";
      Content_productOne_description_points.innerHTML = '<p><b>Наименование: </b>'+ localArr[1] +'</p><div class="Content_productOne_description_points_smallText"><p><b>Тип: '+ localArr[2] +'</b> </p><p><b>Артикул: '+ localArr[3] +'</b> </p><p><b>Марка и модель: '+ localArr[5] +'/'+ localArr[6] +'</b>  </p><p><b>Производитель: '+ localArr[9] +'</b>  </p>  </div>'
      //--------------------------------------------------------------
      let divContent_productOne_description_descriptionOne = document.createElement('div');
      divContent_productOne_description_descriptionOne.className = "Content_productOne_description_descriptionOne";
      divContent_productOne_description_descriptionOne.innerHTML ='<p><b>Описание:</b>'+ localArr[8] +'</p>';
      //--------------------------------------------------------------
      let divContent_productOne_description_price = document.createElement('div');
      divContent_productOne_description_price.className = "Content_productOne_description_price";
      //divContent_productOne_description_price.innerHTML = '<p style="display:flex;flex-direction: column; align-items: center;" id="Price"> '+ localArr[7] +'руб. <span style="font-size:12px">Цена за 1шт</span>  </p><span style="padding:5px;"> x </span> <input type="text" value="1" name="CategoryOne" class="Content_productOne_description_price_input"></input><span style="padding:5px;" id="FinalPrice"> = 1200руб. </span>';
      //--------------------------------------------------------------
      let p1 = document.createElement('p');
      p1.style="display:flex;flex-direction: column; align-items: center;";
      p1.id="Price";
      p1.innerHTML = localArr[7] + 'руб. <span style="font-size:12px">Цена за 1шт</span>';
      let span1 = document.createElement('span');
      span1.style="padding:5px;";
      span1.innerHTML = 'x';
      let input1 = document.createElement('input');
      input1.type="text"; input1.value="1"; input1.name = "pricenum"; input1.className="Content_productOne_description_price_input";

      let span2 = document.createElement('span'); span2.style="padding:5px;";span2.id="FinalPrice";span2.innerHTML='= '+localArr[7]+' руб.';

      let p2 =  document.createElement('p'); p2.className="Content_productOne_description_price_Del"; p2.innerHTML = 'Удалить';

      //Подсчет кол * цену
      input1.addEventListener('change',function () {
        let price = localArr[7].replace(/\s/g, '');
        let num = input1.value;
        span2.innerHTML = '= '+(price * num) + ' руб.';
      });

      p2.addEventListener('click',function () {
        divContent_productOne.remove();
        localStorage.removeItem(key);
         CheckEmptinessBasket(); // проверка на пустоту
         CalculatingThePrice(); // подсчитать итог
      });


      divContent_productOne_description_price.append(p1,span1,input1,span2,p2);


      //--------------------------------------------------------------
      /*divContent_productOne.prepend(imgContent_productOne_img);
      divContent_productOne_description.append(Content_productOne_description_points);
      divContent_productOne_description.append(divContent_productOne_description_descriptionOne);
      divContent_productOne_description.append(divContent_productOne_description_price);
      divContent_productOne.append(divContent_productOne_description);*/

      divContent_productOne_description.append(imgContent_productOne_img);
      divContent_productOne_description.append(Content_productOne_description_points);
      divContent_productOne_description.append(divContent_productOne_description_descriptionOne);

      divContent_productOne_div.append(divContent_productOne_description);

      divContent_productOne.append(divContent_productOne_description);
      divContent_productOne.append(divContent_productOne_description_price);


      Content_product.append(divContent_productOne);
    }
  }

}

function CheckEmptinessBasket() {
  let Content_product_basketempty = document.querySelector('.Content_product_basketempty');
let FinalPriceAll = document.querySelectorAll('#FinalPrice');
let BasketStady2 = document.querySelector('#BasketStady2');
let BlockFillings = document.querySelector('#BlockFillings');

if(FinalPriceAll.length == 0){
BasketStady2.style.display ="none";
Content_product_basketempty.style.display = 'block';
BlockFillings.style.display = 'block';
CalculatingThePrice();
}
}



//Проверка способа связи
let inputCallMe = document.querySelector('#inputCallMe');
let inputMailMe = document.querySelector('#inputMailMe');
let inputTelegramMe = document.querySelector('#inputTelegramMe');
let inputСommunication = document.querySelector('#inputСommunication');
let inputСommunicationTitle = inputСommunication.getElementsByTagName('b');
let inputСommunicationInput = inputСommunication.getElementsByTagName('input');

inputСommunicationInput[0].addEventListener('focus',function () {
  if (inputСommunicationInput[0].value == '79112223345' || inputСommunicationInput[0].value == 'primer@mail.ru' || inputСommunicationInput[0].value == '@TelegramName'){
    inputСommunicationInput[0].value = '';
    inputСommunicationInput[0].style.color = 'black';
  }
});

inputСommunicationInput[0].addEventListener('blur',function () {
if (inputСommunicationInput[0].value == '' && inputСommunicationInput[0].type == 'tel'){
    inputСommunicationInput[0].value = '79112223345';
    inputСommunicationInput[0].style.color = '#969696';
  } else if (inputСommunicationInput[0].value == '' && inputСommunicationTitle[0].innerHTML == 'Напишите свою почту: '){
    inputСommunicationInput[0].value = 'primer@mail.ru';
    inputСommunicationInput[0].style.color = '#969696';
  } else if (inputСommunicationInput[0].value == '' && inputСommunicationInput[0].type == 'text'){
    inputСommunicationInput[0].value = '@TelegramName';
    inputСommunicationInput[0].style.color = '#969696';
  }

});

 inputCallMe.addEventListener('change',function () {
   inputСommunicationInput[0].type = 'tel';
   inputСommunicationTitle[0].innerHTML = 'Напишите свой номер: '
   inputСommunication.style.display = 'block';
   inputСommunicationInput[0].value = '79112223345';
 });

 inputMailMe.addEventListener('change',function () {
   inputСommunicationInput[0].type = 'mail';
   inputСommunicationTitle[0].innerHTML = 'Напишите свою почту: '
   inputСommunication.style.display = 'block';
   inputСommunicationInput[0].value = 'primer@mail.ru';
 });

 inputTelegramMe.addEventListener('change',function () {
   inputСommunicationInput[0].type = 'text';
   inputСommunicationTitle[0].innerHTML = 'Напишите свой телеграм: '
   inputСommunication.style.display = 'block';
   inputСommunicationInput[0].value = '@TelegramName';
 });

//отправка формы
function СheckingTheCorrectnessOfTheForm() {
let Form2Name = document.querySelector('#Form2Name');
let inputСommunicationInput = document.querySelector('#inputСommunicationInput');
let FormTextarea = document.querySelector('#FormTextarea');
let Content_FormCommunication_Error = document.querySelector('.Content_FormCommunication_Error');
let Form2 = document.querySelector('#Form2');

let inputCallMe = document.querySelector('#inputCallMe');
let inputMailMe = document.querySelector('#inputMailMe');
let inputTelegramMe = document.querySelector('#inputTelegramMe');

let order = document.querySelector('#order');
let orderTotalPrice = document.querySelector('#orderTotalPrice');
let FinalPriceGet = document.querySelector('.FinalPrice');

let orderNum = document.querySelector('#orderNum');
let Content_productOne_description_price_input = document.querySelectorAll('.Content_productOne_description_price_input');
let arrOrderNum = [];
for (var i = 0; i < Content_productOne_description_price_input.length; i++) {
  arrOrderNum.push(Content_productOne_description_price_input[i].value);
}

for (var i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  if(key.slice(0, 2) == 'id'){
    let localArr = localStorage.getItem(key).split('|');
    order.value = order.value + '|' + localArr[0] ;
    orderNum.value = arrOrderNum;
    orderTotalPrice.value =  FinalPriceGet.innerHTML;
  }
}

if(inputСommunicationInput.value == '' ||  FormTextarea.value == '' || Form2Name.value == ''){
    Content_FormCommunication_Error.style.display = "block";
    setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 300);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 600);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 900);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 1200);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 1500);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 1800);
  Content_FormCommunication_Error.innerHTML = 'Заполните все поля!';
} else if (inputCallMe.checked == true) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    let phone = inputСommunicationInput.value;
    if(!regex.test(phone)){
      Content_FormCommunication_Error.style.display = "block";
    Content_FormCommunication_Error.innerHTML = 'Номер телефона введен не корректно!';
    setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 300);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 600);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 900);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 1200);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 1500);
    setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 1800);
    }else{
      Content_FormCommunication_Error.style.display = "none";
      Form2.submit();
      DeleteLocalStorage();
    }
} else if (inputMailMe.checked == true) {
  let regex = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  let mail = inputСommunicationInput.value;
  if(!regex.test(mail)){
    Content_FormCommunication_Error.style.display = "block";
  Content_FormCommunication_Error.innerHTML = 'Почта введена не корректно!';
  setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 300);
  setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 600);
  setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 900);
  setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 1200);
  setTimeout(() => {Content_FormCommunication_Error.style.color = "black";}, 1500);
  setTimeout(() => {Content_FormCommunication_Error.style.color = "red";}, 1800);
  }else{

    Content_FormCommunication_Error.style.display = "none";
    Form2.submit();
    DeleteLocalStorage();
  }
} else {
Content_FormCommunication_Error.style.display = "none";
Form2.submit();
DeleteLocalStorage();
}

}

async function DeleteLocalStorage() { //очистка корзины после отправки
  localStorage.clear();
  /*for (var i = 0; i < localStorage.length; i++) {
    let key = await localStorage.key(i);
    if(key.slice(0, 2) == 'id'){
  await localStorage.removeItem(key);
    console.log(key);
    }
  }
  localStorage.removeItem('id0');
  localStorage.removeItem('id3');*/
}

/*<div class="Content_productOne">
<div>
 <img class="Content_productOne_img" src="../public/img/SparePartsCatalog/exterior.png">
  <div class="Content_productOne_description">

    <div  class="Content_productOne_description_points">
    <p><b>Наименование:</b>213213 2132 </p>
    <div class="Content_productOne_description_points_smallText">
    <p><b>Тип:</b> </p>
    <p><b>Артикул:</b>  </p>
    <p><b>Марка и модель:</b>  </p>
    <p><b>Производитель:</b>  </p>
    </div>
    </div>

    <div class="Content_productOne_description_descriptionOne">
      <p><b>Описание:</b> fgdfgdfgdf dfgdfsgdfg fgdsfgdfgdf fdgdsfgdsg dfgdfg dfgdfg</p>
    </div>
</div>
    <div class="Content_productOne_description_price">
      <p style="display:flex;flex-direction: column; align-items: center;"> 1200руб. <span style="font-size:12px">Цена за 1шт</span>  </p>
      <span style="padding:5px;"> x </span> <input type="text" value="1" name="CategoryOne" class="Content_productOne_description_price_input"></input>
      <span id="FinalPrice" style="padding:5px;"> = 1200руб. </span>
    </div>

   </div>
</div>*/
