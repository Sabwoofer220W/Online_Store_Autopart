
let inputSearch = document.querySelector('#inputSearch');
inputSearch.addEventListener('focus',() => {
  inputSearch.style.color = "black";
  if (inputSearch.value == 'Поиск запчасти по VIN') {
    inputSearch.value = '';
  }
});
inputSearch.addEventListener('blur',() => {
  if(inputSearch.value == ""){
      inputSearch.style.color = "#d9d9d9";
      inputSearch.value = 'Поиск запчасти по VIN';
    }
  });

  let FormMenu4Submit = document.querySelector('#FormMenu4Submit');
  let FormMenu4 = document.querySelector('#FormMenu4');
  FormMenu4Submit.addEventListener('click',()=>{
    if (inputSearch.value == "Поиск запчасти по VIN" || inputSearch.value == ""){

    } else {
      document.querySelector('#FormMenu4').submit();
    }
});
