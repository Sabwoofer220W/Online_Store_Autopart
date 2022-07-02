
window.addEventListener("load", function() {

  let archivePhoto=['acura.png','audi.png','bmw.png','chevrolet.png','chrysler.png','citroen.png',
  'daewoo.webp','fiat.png','ford.png','gaz.png','honda.png','hyundai.png','infiniti.png','jaguar.png',
  'jeep.jpg','kadillak.jpg','kia.png','lada.png','land-rover.png','lexus.png','mazda.png','mercedes.png',
  'mini.png','mitsubishi.png','nissan.png','opel.png','peugeot.png','pontiac.jpg','renault.png','skoda.jpg',
  'subaru.jpg','suzuki.png','toyota.png','volkswagen.png','volvo.png'];

  let MarkName=['Acura','Audi','BMW','Chevrolet','Chrysler','Citroen','Daewoo','Fiat','Ford','Gaz','Honda','Hyundai','Infiniti','Jaguar',
  'Jeep','Kadillak','KIA','Lada','Land-Rover','Lexus','Mazda','Mercedes','Mini','Mitsubishi','Nissan','Opel','Peugeot','Pontiac',
  'Renault','Skoda','Subaru','Suzuki','Toyota','Volkswagen','Volvo']

  let content =  document.querySelector('.Content_Mark');
  let a;
  let img;
  let div;
  for (var i = 0; i < archivePhoto.length; i++) {

    a =  document.createElement('a');
    a.className = "Content_categories_a";
    img = document.createElement('img');
    img.className = "Content_categories_a_img";
    img.src = '../public/img/LogoAuto/'+archivePhoto[i];
    div = document.createElement('div');
    div.className = "Content_categories_a_textMarkLogo";
    div.innerHTML = MarkName[i];
    a.append(img,div);

    content.append(a);
  }

}, false);
