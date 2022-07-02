const nodemailer = require('nodemailer')
var express = require('express');
let app = express();
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
  const mongoClient = new mongodb.MongoClient(MongoPass, {
          useUnifiedTopology: true
        });

        var MarkAuto;
        var ColAutoParts;
        var ReceivingGoods;
        var SortIncreasing;
        var SortDecreasing;
        var StartWithNewOnes;
      //  var FindTextAutoPartsChara;
      var connectMongoDB = function () {
        mongoClient.connect(async function(error, mongo) {
          if (!error) {
            let db = mongo.db('NurmotorsAutopart');// подключение к бд
      			let autopart = db.collection('autopart');//подключение коллеуции
            let autoPartsChara = db.collection('autoPartsChara');
             MarkAuto = await autopart.find().toArray(); // получение Марок авто
            ColAutoParts = await autoPartsChara.count();// получение колличества запчастей в базе
            StartWithNewOnes = await autoPartsChara.find().sort({$natural: -1}).toArray();// сортировка с новых запчастей
          } else {
            console.error(err);
          }
    });
    }
    //-----------------------------------------------------------------------------------
    var connectMongoDBMainCatalog = function () { //для каталога
      mongoClient.connect(async function(error, mongo) {
        if (!error) {
          let db = mongo.db('NurmotorsAutopart');// подключение к бд
          let autopart = db.collection('autopart');//подключение коллеуции
          let autoPartsChara = db.collection('autoPartsChara');
           MarkAuto = await autopart.find().toArray();
          ReceivingGoods = await autoPartsChara.find().toArray();
          SortIncreasing = await autoPartsChara.find().sort({price: 1}).toArray();
          SortDecreasing = await autoPartsChara.find().sort({price: -1}).toArray();
        } else {
          console.error(err);
        }
      });
    }
  //connectMongoDB();

  var connectMongoDBSearch =  function () {
    mongoClient.connect(async function(error, mongo) {
      if (!error) {
        let db = mongo.db('NurmotorsAutopart');// подключение к бд
        let autoPartsChara = db.collection('autoPartsChara');
         ReceivingGoods = await autoPartsChara.find().toArray();
      } else {
        console.error(err);
      }
    });
  }

//===============================================================================
app.set("view engine","ejs");

app.use('/public', express.static('public'));
//===============================================================================
app.get('/', function(req, res) {
  connectMongoDB();
res.render('index',{MarkAuto: MarkAuto,ColAutoParts:ColAutoParts,StartWithNewOnes:StartWithNewOnes});
});

app.get('/index.ejs', function(req, res) {
  connectMongoDB();
res.render('index',{MarkAuto: MarkAuto,ColAutoParts:ColAutoParts,StartWithNewOnes:StartWithNewOnes});
});
//===============================================================================
app.get('/autopart.ejs', function(req, res) {
res.render('autopart');
});
//===============================================================================
app.get('/BrandCatalog.ejs', function(req, res) {
res.render('BrandCatalog',{MarkAuto: MarkAuto});
});
//===============================================================================
app.get('/MainCatalog.ejs', function(req, res) {
connectMongoDBMainCatalog();
  if(req.query.Sort == 'ЦенаВоз'){
res.render('MainCatalog',{MarkAuto: MarkAuto,ReceivingGoods:SortIncreasing,query:req.query});
  } else if(req.query.Sort == 'ЦенаУбыв'){
res.render('MainCatalog',{MarkAuto: MarkAuto,ReceivingGoods:SortDecreasing,query:req.query});
  } else{
res.render('MainCatalog',{MarkAuto: MarkAuto,ReceivingGoods:ReceivingGoods,query:req.query});
}
});
//===============================================================================
app.get('/BrandCatalogOne.ejs', function(req, res) {
  connectMongoDBMainCatalog();
  if(req.query.Sort == 'ЦенаВоз'){
    res.render('BrandCatalogOne',{MarkAuto: MarkAuto,ReceivingGoods:SortIncreasing,query:req.query});
  } else if(req.query.Sort == 'ЦенаУбыв'){
    res.render('BrandCatalogOne',{MarkAuto: MarkAuto,ReceivingGoods:SortDecreasing,query:req.query});
  } else {
    res.render('BrandCatalogOne',{MarkAuto: MarkAuto,ReceivingGoods:ReceivingGoods,query:req.query});
  }

});
//===============================================================================
app.get('/MainCatalogOne.ejs', function(req, res) {
connectMongoDBMainCatalog();
  if(req.query.Sort == 'ЦенаВоз'){
res.render('MainCatalogOne',{MarkAuto: MarkAuto,ReceivingGoods:SortIncreasing,query:req.query});
  } else if(req.query.Sort == 'ЦенаУбыв'){
res.render('MainCatalogOne',{MarkAuto: MarkAuto,ReceivingGoods:SortDecreasing,query:req.query});
  } else{
res.render('MainCatalogOne',{MarkAuto: MarkAuto,ReceivingGoods:ReceivingGoods,query:req.query});
}
});
//===============================================================================
app.get('/basket.ejs', function(req, res) {
connectMongoDBMainCatalog();

  if(req.query.FIO && req.query.communication && req.query.TextСommunication && req.query.text && req.query.order &&  req.query.orderNum && req.query.orderTotalPrice){
    //-------------------------------------------------------------------------------------------------------------
    console.log(req.query.orderTotalPrice);
    if (req.query.communication == 'inputCallMe' || req.query.communication == 'inputTelegramMe') {
    var today  = new Date().toLocaleString();

    let orderId = req.query.order;
    let orderIdsplit = orderId.split('|');
    orderIdsplit.shift();
    let NewOrder = {
      Name:req.query.FIO,
      communication:req.query.TextСommunication,
      text:req.query.text,
      order:orderIdsplit,
      orderNum:req.query.orderNum,
      orderTotalPrice:req.query.orderTotalPrice,
      date: today,
      condition:'created'
    }
    mongoClient.connect(async function(error, mongo) {
      if (!error) {
        let db = mongo.db('NurmotorsAutopart');// подключение к бд
        let autopart = db.collection('Orders');//подключение коллеуции
        autopart.insertOne(NewOrder);
      } else {
        console.error(err);
      }
    });
  //-------------------------------------------------------------------------------------------------------------
  } else if (req.query.communication == 'inputMailMe') {
    let orderId = req.query.order;
    let orderIdsplit = orderId.split('|');
    orderIdsplit.shift();

    mongoClient.connect( async function(error, mongo) {
      if (!error) {
        let db = mongo.db('NurmotorsAutopart');// подключение к бд
        let autoPartsChara = db.collection('autoPartsChara');//подключение коллеуции
        var arr =[];
        for (var i = 0; i < orderIdsplit.length; i++) {
          let OneOrderIdsplit = await autoPartsChara.findOne({"_id" : {"$in" : [ObjectId(orderIdsplit[i])]}});
          let str =  OneOrderIdsplit.nameTitle +'|'+OneOrderIdsplit.type+'|'+OneOrderIdsplit.Article+'|'+OneOrderIdsplit.markAuto+'/'+OneOrderIdsplit.modelAuto+'|'+OneOrderIdsplit.price+'|'+OneOrderIdsplit.description+'|'+OneOrderIdsplit.manufacturer;
          arr.push(str);
        }
        //let res = await autoPartsChara.find({"_id" : {"$in" : [ObjectId(orderIdsplit[0]), ObjectId(orderIdsplit[1])]}}).toArray();
        //console.log(res);
      }else {
        console.error(err);
      }
      var StrInnerHTML = '';
      for (var i = 0; i < arr.length; i++) {
        let arrSplit = arr[i].split('|');
        let arrOrderNum = req.query.orderNum.split(',')
        let div = `
        <div style="display: flex; color:black;-webkit-box-shadow: 0 0 20px rgb(0 0 0 / 10%);margin: 20px;">
        <div style ="display: flex;align-items: center;justify-content: center; padding-left:20px;width:90%;text-align:center;"><b>Наименование:</b> ${arrSplit[0]}</div>
        <div style="margin-left: 25px; margin-right: 25px; width: 25vw;width:80%">
        <p><b>Характеристики:</b></p>
        <div>
        <p style="padding: 2px;margin: 2px;">Тип: ${arrSplit[1]}</p>
        <p style="padding: 2px;margin: 2px;">Артикул: ${arrSplit[2]}</p>
        <p style="padding: 2px;margin: 2px;">Марка и модель: ${arrSplit[3]}</p>
        <p style="padding: 2px;margin: 2px;">Производитель: ${arrSplit[6]}</p>
        </div>
        </div>

        <div style ="display: flex;align-items: center;justify-content: center;width:100%">
        <p style="text-align:center;"><b>Описание:</b> ${arrSplit[5]}</p>
        </div>

        <div style ="display: flex;align-items: center;justify-content: center;width:100%">
        <p>Цена за шт: ${arrSplit[4]} </p>
        <p>Всего: ${arrOrderNum[i]}</p>
        </div>

        </div>
        `;
        StrInnerHTML = StrInnerHTML + div;
      }


let transporter = nodemailer.createTransport(
  {
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'nurmotors92@mail.ru',
    pass: 'tmbmRtM5ntLavknKmEqy' // пароль из mailRu
  }
},{
  from: 'Mailer Test <nurmotors92@mail.ru>'
}
)
let result = transporter.sendMail({
  from: '"Nurmotors" <nurmotors92@mail.ru>', // название почты
  to: req.query.TextСommunication, // кому отправить
  subject: 'Заказ Nurmotors', // заголовок
  html:`
  <div style="color:white; background-color:#4682B4; padding:10px;">
  <p style="text-align: center; font-size:20px;"><b>Внимание!</b></p>
  <p style="text-align: center; font-size:23px;">Это письмо сформировано автоматически<br> </p>
  <p style="text-align: center; font-size:18px;"> <i>Не нужно отвечать на него!</i> </p>
  <div style="background-color:white; padding:20px; width:95%; height: auto; margin:0 auto;">
  <span style="color:black; font-size:20px;"> Ваш заказ: </span>
  ${StrInnerHTML}
  <div style="display:flex;justify-content: flex-end;color:black;font-size:22px;"><p>${req.query.orderTotalPrice}</p></div>
  <div style="text-align: center;;color:black;font-size:22px;">Ваша заявка сформирована и обрабатывается, в ближайшее время наш сотрудник свяжется с вами!</div>
  </div>
  </div>

  `, // текст сообщения
})

var today2  = new Date().toLocaleString();

let orderId2 = await req.query.order;
let orderIdsplit2 = await orderId2.split('|');
orderIdsplit2.shift();
let NewOrder = {
  Name:req.query.FIO,
  communication:req.query.TextСommunication,
  text:req.query.text,
  order:orderIdsplit2,
  orderNum:req.query.orderNum,
  orderTotalPrice:req.query.orderTotalPrice,
  date: today2,
  condition:'created'
}
    let db = mongo.db('NurmotorsAutopart');// подключение к бд
    let autopart = db.collection('Orders');//подключение коллеуции
    autopart.insertOne(NewOrder);
});//===========

}
//-------------------------------------------------------------------------------------------------------------
  }

res.render('basket',{ReceivingGoods:ReceivingGoods,query:req.query});
});
//===============================================================================
app.get('/search.ejs', function(req, res) {
connectMongoDBSearch();
    res.render('search',{query:req.query,ReceivingGoods:ReceivingGoods});
});
//===============================================================================

app.use(function(req, res) {
	res.status(404).send('not found');
});

app.listen(3000, function() {
	console.log('running');
});
//===============================================================================
