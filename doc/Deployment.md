## Deployment documentatie
In dit document worden de stappen beschreven om RidderRedder succesvol te deployen.

RidderRedder bestaat uit twee delen. 

Het ene deel is een zelfgemaakte Web API. Deze API gebruiken wij om gegevens op te slaan over de gebruiken, gegevens op te halen en verschillende data random te laten genereren. De API is geschreven in ASP.NET Core met Entity Framework als ORM (Object Relational Mapper). Om het project werkend te krijgen zullen we eerst een aantal dingen moeten installeren. Vervolgens moeten we wat stappen doorlopen om de juiste instellingen te configureren zodat de Ionic app met de API kan verbinden. Hieronder meer uitleg over deze stappen.

Het andere deel is een zelfgemaakte Ionic app. In de app kunnen we het spel RidderRedder spelen. Hier moeten ook een aantal dingen voor geinstalleerd worden. Vervolgens moeten we ook voor de app wat instellingen aanpassen zodat de app kan communiceren met de API. Hieronder staat beschreven welke stappen je moet doorlopen om dit te realiseren.

### Requirements
#### API
* .NET Core 2.1                     [download hier](https://dotnet.microsoft.com/download/dotnet-core/2.1)
* Visual Studio 2017 versie 15.7+   [update uitleg](https://docs.microsoft.com/en-us/visualstudio/install/update-visual-studio?view=vs-2017)
* MySQL Server 8.0+                 [download hier](https://dev.mysql.com/downloads/mysql/)
* MySQL Workbench                   Deze zit bij de installatie van MySQL Server

### ASP.NET Core API Deployment
1. #### MySQL Configureren
  * Download en installeer MySQL server via de download link hierboven.
  * Gebruik MySQL Workbench om te verbinden naar de lokale MySQL server.
  * Maak een nieuwe database/schema aan en noem deze ``ridderredderapi``.
  * Selecteer deze database als ``standaard database`` of ``default schema``
  * Voer de query van [SQLDump](https://github.com/AP-Elektronica-ICT/CA1819-RidderRedder/blob/master/doc/SQLDump.sql) uit om alle tabellen en standaard data over te nemen.
2. #### Dotnet project instellen

### Ionic Deployment


