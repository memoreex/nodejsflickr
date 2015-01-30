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

