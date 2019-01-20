## Deployment documentatie
In dit document worden de stappen beschreven om RidderRedder succesvol te deployen.

RidderRedder bestaat uit twee delen. 

#### Deel 1: De API
Het ene deel is een zelfgemaakte Web API. Deze API gebruiken wij om gegevens op te slaan over de gebruiken, gegevens op te halen en verschillende data random te laten genereren. De API is geschreven in ASP.NET Core met Entity Framework als ORM (Object Relational Mapper). Om het project werkend te krijgen zullen we eerst een aantal dingen moeten installeren. Vervolgens moeten we wat stappen doorlopen om de juiste instellingen te configureren zodat de Ionic app met de API kan verbinden. Hieronder meer uitleg over deze stappen.

#### Deel 2: Ionic app
Het andere deel is een zelfgemaakte Ionic app. In de app kunnen we het spel RidderRedder spelen. Hier moeten ook een aantal dingen voor geinstalleerd worden. Vervolgens moeten we ook voor de app wat instellingen aanpassen zodat de app kan communiceren met de API. Hieronder staat beschreven welke stappen je moet doorlopen om dit te realiseren.

#### Info: Project uitvoeren zonder zelf gehoste API
Standaard staat de Ionic zo ingesteld om verbinding te maken met de API die op Azure gehost wordt. Het is natuurlijk de bedoeling om zonder de API zelf te hosten het spel te kunnen spelen. Het is dus niet verplicht om de API zelf te hosten om het project te laten draaien. Wanneer er gekozen word om de API niet zelf te hosten, dan mag het gedeelte ``ASP.NET Core API Deployment`` overgeslagen worden.

### ASP.NET Core API Deployment
#### Requirements
Software | Uitleg Software | Download
---------|-----------------------|----------------------------
.NET Core 2.1 SDK | De API draait op .NET Core 2.1 |[download hier](https://dotnet.microsoft.com/download/dotnet-core/2.1)
Visual Studio 2017 versie 15.7+ | Om aanpassingen te maken in het project gebruiken we Visual Studio 2017 | [update uitleg](https://docs.microsoft.com/en-us/visualstudio/install/update-visual-studio?view=vs-2017)
MySQL Server 8.0+ | Als database gebruiken we MySQL Server | [download hier](https://dev.mysql.com/downloads/mysql/)
MySQL Workbench | Om aanpassingen te maken in de database gebruiken we MySQL Workbench | Deze zit bij de installatie van MySQL Server

1. #### MySQL server Configureren
  * Download en installeer MySQL server via de download link hierboven.
  * Noteer of onthoud het MySQL wachtwoord goed, deze hebben we later nodig.
  * Gebruik MySQL Workbench om te verbinden naar de lokale MySQL server.
  * Maak een nieuwe database/schema aan en noem deze ``ridderredderapi``.
  * Selecteer deze database als ``standaard database`` of ``default schema``
  * Voer de query van [SQLDump](https://github.com/AP-Elektronica-ICT/CA1819-RidderRedder/blob/master/doc/SQLDump.sql) uit om alle tabellen en standaard data over te nemen.
2. #### .NET Core installeren
 * Download en installeer .NET Core 2.1 SDK via de download link hierboven.
3. #### API configureren
 * Download de laatste versie van RidderRedder door een ``pull`` uit te voeren van de ``master`` branch.
 * Navigeer in explorer/finder naar de directory waar RidderRedder is opgeslagen.
 * Navigeer naar de map ``\CA1819-RidderRedder\src\RidderRedderApi``.
 * Open het bestand ``RidderRedderApi.sln``.
 * In de Solution Explorer openen we het project ``RidderRedderApi.Web.Api``
 * In dit project openen we het bestand ``appsettings.json``
 * Pas hier de volgende regel aan:
 ```"LocalMySQLConnection": "Server=localhost; database=RidderRedderAPI; UID=root; Pwd=123banaan"```
 * Het stukje ``Pwd=123banaan`` moet aangepast worden naar het MySQL wachtwoord van stap 1.2. Bv. ``Pwd=mijnwachtwoord``.
 * Start nu het project door op de start knop te drukken of via de commandline te navigeren naar het project en type ``dotnet run``.
 
### Ionic Deployment
#### Requirements
Software | Uitleg Software | Download
---------|-----------------------|----------------------------
NodeJS | Veel van Ionic's CLI commando's gebruiken NodeJS. Om NPM packages te kunnen installeren hebben we ook NodeJS nodig. | [download](https://nodejs.org/en/)
Ionic Cordova | Ionic Cordova wordt gebruikt om onze app cross-platform te realiseren. | [download](https://ionicframework.com/docs/intro/installation/)
Java JDK 1.8 | Android heeft Java nodig | [download](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
Android Studio | Dit wordt gebruikt om de Ionic app te builden voor Android | [download](https://developer.android.com/studio/)
Xcode | Dit wordt gebruikt om de Ionic app te builden voor iOS | [download](https://developer.apple.com/xcode/)
Visual Studio Code | Gebruiken wij als IDE voor Ionic. | [download](https://code.visualstudio.com)

1. #### NodeJS installeren
 * Download en installeer de laatste TLS versie van NodeJS via de download link hierboven.
 * Test of NodeJS en NPM goed geinstalleerd zijn door ``node -v`` en ``npm -v`` in de command prompt/terminal uit te voeren.
2. #### Ionic Cordova installeren
 * Open de ``Command Prompt`` in Windows of de ``Terminal`` in Mac
 * Type ``npm install -g ionic cordova`` om Ionic Cordova te installeren.
 * Test of Ionic en Cordova goed geinstalleerd zijn door ``ionic -v`` en ``cordova -v`` uit te voeren
3. #### Java installeren
 * Download en installeer Java JDK 1.8 (versie 8) vanaf de download link hierboven.
4. #### Android of Xcode installeren
 * Download en installeer Android Studio of Xcode vanaf de download link hierboven. Afhankelijk van het apparaat waarop getest moet worden. 
 * ANDROID: Zorg zeker en vast dat de Android SDK beschikbaar is vanaf de commandline 
5. #### Ionic project ophalen
 * Download de laatste versie van RidderRedder door een ``pull`` uit te voeren van de ``master`` branch als je dit nog niet hebt gedaan in stap 3 van de API configureren.
 * Navigeer in explorer/finder naar de directory waar RidderRedder is opgeslagen.
 * Navigeer naar de map ``\CA1819-RidderRedder\src\ridder-redder``.
 * Open het project hier in ``Visual Studio Code``.
6. #### Deploy naar device
 * Sluit de telefoon aan de computer met een USB kabel. Android of iPhone worden beiden ondersteund.
7. #### Ionic project configureren
 * Open de geintegreerde Terminal in Visual Studio Code.
 * Typ de volgende commando in om het project te starten: ``ionic cordova run android --device`` voor Android of ``ionic cordova run ios --device`` voor iPhone.
 * Typ ``Y`` bij de volgende prompt: ``? Install @ionic/app-scripts? (Y/n)``
 
