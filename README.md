===
Installera node.js + express.js
===

Detta gör du genom att gå in på denna länk http://nodejs.org/ och klicka direkt på “Install” som syns på förstasida, alternativt ladda ner node genom “Downloads” och välja korrekt plattform. 

Efter att du installerat node så följer en pakethanterare med som heter Node Package Manager (npm) och via denna kan du enkelt installera de paket som du behöver. 

Nästa steg är att installera ramverket Express.js. Första steget är att du via Terminalen på din Mac först skapar den mapp du vill jobba med, jag väljer att döpa den till “pFlickr” 

```javascript
mkdir pFlickr
cd pFlickr
```

Därefter använder du npm för att installera express.js och dess “dependencies”, dvs de paket som express behöver för att fungera. Detta görs via via terminalen genom att du står i din nya mapp pFlickr och skriver kommandot:

```javascript
npm install express --save
```

Nu finns express installerat och nästa steg är att skapa en mappstruktur för din applikation och för detta finns det en generator som gör detta åt dig, kör kommandot:

```javascript
npm install express-generator
```

Därefter skapar du dina mappar och filer som behöves genom att skriva:

```javascript
express
```

( Det finns en rad olika parametrar som kan skrivas in för att mer specifikt välja vad du vill använda, standard är att applikationen använder css och jade för att rendera olika vyer på klientsidan. Läs om de olika valen på länken http://expressjs.com/starter/generator.html )

När detta är klart måste du installera de olika dependencies och då skriver du:

```javascript
npm install
```

Du har nu skapat din första applikation och kan testa köra den via kommandot:

```javascript
node ./bin/www
```

Och sedan skriva localhost:3000 i din webbläsare. Applikationen körs nu lokalt och lyssnar på port 3000.  Vilket borde visa följande webbsida:

IN MED EN BILD

===
Lite om mappstruktur
===

Välj din favorit-editor, i mitt fall har jag valt att använda Sublime Text 3 http://www.sublimetext.com/3. Sedan skapar du ett nytt projekt och inkluderar mappen med din applikation, dvs pFlickr. 

Du ser att det finns en rad olika mappar och strukturen är som följer: 
Överst syns din bin->www-mapp som hanterar parametrarna för initieringen av applikationen, såsom vilken port som ska lyssnas på. 
I din public-mapp finns css, javascript, och bilder.
I routes-mappen hanteras dina olika http request och skapar genom dessa olika url-strängar. Som synes finns denna rad kod i filen index.js :

```javascript
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
```
Vilken hämtar startsidan (index.jade) och renderar den på klientsidan med inparametern title: “Express”.

I din views-mapp finns dina .jade-filer som hanterar det du vill visa i dina vyer. Jade fungerar som html, men med skillnaden att det är använder en annan typ av indentering och syntax. För mer information se länk http://jade-lang.com/ 

Nederst finns din app.js som inkluderar alla de olika paket som behövs i din applikation. Här kan du också välja att sköta felhanteringen. 

(packages.json listar och hanterar alla dina olika dependencies)

===
Skaffa en API-nyckel från Flickr
===

I denna tutorial används Flickrs API för att hämta bilder med tillhörande information. För att komma i gång med API:t krävs först att man skapar en användare på Flickr. Detta görs genom att gå in på https://www.flickr.com/ och sedan trycka på “Sign up” och följa angivelserna där.

När detta är avklarat så loggar du in och går in via inställningar och under “Sharing & Extending” och där hitta “Your API Keys” och väljer att skapa en. Alternativt följer du denna länk https://www.flickr.com/services/apps/create/apply/. Väl där så väljer du “Apply for Non-commercial key” och fyller i vad appen ska heta och vad den ska används till. Inte jätteviktigt vad man skriver. 

Därefter blir du tilldelad dels en “Key” och dels en “Secret” som kommer att används i applikationen senare.

===
Installera npm-paketet ”flickapi”
===

Nästa steg är att installera ett paket i till din applikation som heter flickrapi https://www.npmjs.org/package/flickrapi som hanterar dels autentisieringen och gör det enklare att använda Flickrs API-dokumentation. Gå till din mapp pFlickr och skriv i terminalen: 

```javascript
npm install flickrapi --save
```
Där efter lägger du till en javascript-fil i din public/javascripts/ mapp och döper den till getPics.js

Där lägger du till följande rader kod: 

```javascript
var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "API key that you get from Flickr",
      secret: "API key secret that you get from Flickr"
    };

Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});
```

Och fyller i din Key och Secret som du fick tidigare. De går att hitta genom under “Your API keys” under https://www.flickr.com/account/sharing/ 

När du sedan fyllt i dina siffror så kör du applikationen via terminalen igen, via kommandot:
```javascript
node ./bin/www
```
Då kommer du bli skickad till en url från Flickr som vill att du ska autentisiera applikationen och där väljer du att gå vidare och sen kommer en kod att genereras till dig. Denna kod skriver du sedan in på raden prompt: oauth_verifier: DIN KOD i terminalen.

(Flickrs API kommer att ladda in alla metoder vilket kan ta någon minut)

Gå in i getPics.js och lägg till följande kod:

```javascript
var FlickrOptions = {
      api_key: "your API key",
      secret: "your API key secret",
      user_id: "...",
      access_token: "...",
      access_token_secret: "..."
    }
```

Där du sen tidigare har din api_key och secret, men nu med tilläggen user_id, access_token och access_token_secret. Dessa värden är de som står i terminalen vid respektive namn:

```javascript
export FLICKR_USER_ID=".........................."
export FLICKR_ACCESS_TOKEN="..............."
export FLICKR_ACCESS_TOKEN_SECRET="..................."
```
Spara och kör applikationen igen. Inga felmeddelanden bör visas. Nu kan vi använda metoderna i Flickrs API som finns dokumenterade på https://www.flickr.com/services/api/

===
En första applikation
===

Denna tutorial kommer att visa hur du kan använda Flickrs API för att söka efter en hashtag och sedan visa motsvarande bilder. För att göra en sökning av bilder används metoden flickr.photos.search enligt https://www.flickr.com/services/api/flickr.photos.search.html. Denna skickar då tillbaka en array med JSON-objekt. Utifrån dessa objekt går det att hämta information om de olika bilderna. Det vi behöver veta om varje bild för att kunna skapa en korrekt url-sträng och därmed kunna visa bilden utgår från följande metod https://www.flickr.com/services/api/misc.urls.html 

https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

Det som behöver sparas undan är alltså farm-id, id, server-id och secret. Detta görs genom att först loopa igenom alla bilder och spara undan data i en array. 

Eftersom vi vill kunna använda metoder, närmare bestämt metoden som heter flick, i andra filer i projektet måste vi exportera denna och det görs genom module.exports{}. Metoden flick tar alltså in två parametrar; en hashtag och en callback. Hashtag-värdet fås genom att användaren skriver in en input i ett inputfält på sidan, mer om detta senare. Sedan skickas denna input med i metoden. För att hämta bilder används alltså Flickr’s API metoder, dessa anrop har gjorts simplare med hjälp av flickrapi-paketet som vi installerade tidigare.

I getPics.js sköts detta genom att lägga till följande kod:

```javascript
module.exports = {

    flick: function(hashtag, callback){

      Flickr.authenticate(flickrOptions, function(error, flickr) {
      //Vi kan nu använda Flick's API

                flickr.photos.search({
                tags: hashtag,
                per_page: 18


            }, function(err, result) {
             ... //Kod som hanterar resultatet
            }
```
Efter anropet har gjorts så fås ett svar tillbaka i form av result som är en objekt-array. Det vi vill göra nu är att loopa i genom varje objekt i arrayen och spara undan viktig data i en egen array som vi döper till arrayResults. Den innehåller fem st objekt som behövs för att sedan kunna generera en URL-sträng för bilderna så att vi kan visa dem.

```javascript
for (var i = 0; i < result.photos.photo.length; i++){
                          
        var pics = result.photos.photo[i];

        arrayResults[i] = {

            photoid : pics.id,
            serverid : pics.server,
            secretid : pics.secret,
            farmid : pics.farm,
            title: pics.title
            
        }

}

callback(arrayResults);

```

---
Nästa steg.
---

Vi vill nu skicka med data från den callback som vi gjorde i föregående steg. Detta görs i /routes->index.js

```javascript
router.post('/',function(req, res){
    var hash = req.body.hashtag;
    flikkr.flick(hash, function(arrayResults, errorResponse) {

      res.send({
      	arr: arrayResults,
        err: errorResponse
      });
    });
});
```

Som använder sig av den exporterade metoden från getPics.js med inparametrerna från callbacken. Därefter så vill vi skicka med responsen med två olika attribut, en med arrayens innehåll och en med det eventuella felet. Värt att notera är att själva hastagen skickas med från inputfältet i index.jade, som sedan tas in via bodyn på klientsidan och sätts till en variabel. Denna variabel skickas med till getPics.js och används där för att hämta respektive bilder. 

Nästa steg.

Nu vill vi kunna visa bilderna som vi precis har hämtas. Vi skapar en javascript-fil som hanterar detta. I mitt fall så döpte jag den till client.js

```javascript
$(document).ready(function(){
	$(document).on('keypress', function (e) {
		if(e.keyCode === 13) {
			$.post("/", { 
				
				hashtag: $("#taginput").val()

			}, function(data){
			……do stuff
			}
```
Inledningsvis så är tanken att funktionen väntar på att användaren skall trycka på Enter på tangetbordet och därmed utföra sin sökning. Enter har nyckelkoden 13. När det är gjort så skickar den med sökordet, alltså själva hashtagen, i en form av en slags ajax-request som innebär att sidan inte behöver laddas om för varje ny sökning. 

---
Nästa steg
---

Därefter är det dags att presentera bilderna som finns i resultatet, i den inparameter som heter data i detta fall. 

```javascript
for(var i = 0; i < data.arr.length; i++) {
							
	jQuery('<div/>', {
		id: 'hejs' + i,
		class: 'col-md-2'
	}).prependTo('#hej');

	jQuery('<a/>', {
		id: 'hejss' + i,
		'data-lightbox': "pics", 
		'data-title': data.arr[i].title,
	    href: "https://farm" + data.arr[i].farmid + ".staticflickr.com/"+ data.arr[i].serverid +"/"+ data.arr[i].photoid +"_"+ data.arr[i].secretid +"_b.jpg"
	}).appendTo('#hejs' + i);


	jQuery('<img/>', {
		class: 'img img-thumbnail pos',
	    src: "https://farm" + data.arr[i].farmid + ".staticflickr.com/"+ data.arr[i].serverid +"/"+ data.arr[i].photoid +"_"+ data.arr[i].secretid +"_q.jpg"
	}).appendTo('#hejss' + i);

}
```

Vi vill loopa igenom arrayen med bilder och skapa en URL som är konstruerad på det sätt som Flickr’s API använder. Vi studerar följande kodsnutt lite mer i detalj.

"https://farm" + data.arr[i].farmid + ".staticflickr.com/"+ data.arr[i].serverid +"/"+ data.arr[i].photoid +"_"+ data.arr[i].secretid +"_q.jpg"

För varje bild i arrayen finns ett av de fem tillhörande arributen som skapades i getPics.js och därefter så skapas URLen genom att den hämtar olika id:en från data.arr.

Själva skapadet av taggar i form divs och img så används jQuery-anrop där olika arrtribut går att skicka med och antingen appenda eller prependa till respektive div och id beroende på vad som är lämpligt.

---
Jade
---
För att kunna lägga till en struktur på webbsidan så använder jag mig av Jade som template istället för HTML. Givetvis går det bra att välja vad som passar bäst men fördelarna med Jade är att det följer en enklare struktur i form av indentering och att man slipper avsluta taggar o.s.v. Det går också bra att kombinera Jade med HTML syntax om så önskas.

Själva strukturen är uppdelad i olika filer för t.ex. header, body och footer.

```javascript
html
  head
    title= title
    meta(name='viewport', content='width=device-width, initial-scale=1.0')
    link(rel='stylesheet', href='//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css')
    link(rel='stylesheet', href='/css/style.css')
    link(rel="stylesheet", href="/css/lightbox.css")
  body
    block content
    
    script(src="//code.jquery.com/jquery-1.11.0.min.js")
    script(src="/js/lightbox.min.js")
    script(src="/js/client.js")
```

För att underlätta struktur delas innehållet upp med hjälp av att body-innehållet refererar till en annan fil, nämligen index.jade som visas nedan.

```javascript
extends layout

block content
  .aligncenter.textcenter
   h1= title
   p(id="sub")= subtitle
   
   .input-group.aligncenter
    span.input-group-addon #
    <input type="text" id="taginput" class="form-control" placeholder="Hashtag" name="hashtag">

  div.container
   div(id="hej").row
```

Här skapas innehållet för själva webbsidan och eftesom tjänsten är relativt simpel så finns det inte så mycket innehåll här. Följ dokumentation för Jade för att se hur syntaxen ska se ut. 

===
Slutresultat
===

Om alla steg har följts så bör du nu ha skapat en tjänst där användaren kan söka efter valfri hashtag och hämta bilder som innhåller denna. Hur själva utseendet på sidan är upplagt bestämmer du själv. Jag valde att använda Bootstrap för enkelhetens skull och sen använde jag lightbox.js för att kunna förstora bilderna och bläddra mellan dem. Nedan visas hur slutresultat skulle kunna se ut.

IN MED BILD1

IN MED BILD2

