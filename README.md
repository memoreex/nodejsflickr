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


