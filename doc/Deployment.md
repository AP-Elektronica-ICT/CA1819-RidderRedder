## Deployment documentatie
In dit document worden de stappen beschreven om RidderRedder succesvol te deployen.

RidderRedder bestaat uit twee delen. 

Het ene deel is een zelfgemaakte Web API. Deze API gebruiken wij om gegevens op te slaan over de gebruiken, gegevens op te halen en verschillende data random te laten genereren. De API is geschreven in ASP.NET Core met Entity Framework als ORM (Object Relational Mapper). Om het project werkend te krijgen zullen we eerst een aantal dingen moeten installeren. Vervolgens moeten we wat stappen doorlopen om de juiste instellingen te configureren zodat de Ionic app met de API kan verbinden. Hieronder meer uitleg over deze stappen.

Het andere deel is een zelfgemaakte Ionic app. In de app kunnen we het spel RidderRedder spelen. Hier moeten ook een aantal dingen voor geinstalleerd worden. Vervolgens moeten we ook voor de app wat instellingen aanpassen zodat de app kan communiceren met de API. Hieronder staat beschreven welke stappen je moet doorlopen om dit te realiseren.

### Requirements
#### API
Software | Uitleg Software | Download
---------|-----------------------|----------------------------
.NET Core 2.1 SDK | De API draait op .NET Core 2.1 |[download hier](https://dotnet.microsoft.com/download/dotnet-core/2.1)
Visual Studio 2017 versie 15.7+ | Om aanpassingen te maken in het project gebruiken we Visual Studio 2017 | [update uitleg](https://docs.microsoft.com/en-us/visualstudio/install/update-visual-studio?view=vs-2017)
MySQL Server 8.0+ | Als database gebruiken we MySQL Server | [download hier](https://dev.mysql.com/downloads/mysql/)
MySQL Workbench | Om aanpassingen te maken in de database gebruiken we MySQL Workbench | Deze zit bij de installatie van MySQL Server


### ASP.NET Core API Deployment
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
 * Start nu het project door op de start knop te drukken of via de commandline te navigeren naar het project en type ``dotnet run``
### Ionic Deployment


