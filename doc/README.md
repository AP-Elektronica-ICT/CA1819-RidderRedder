# Informatie over documentatie
Dit is de documentatie van RidderRedder.
Hier plaatsen wij een samenvatting en links van handige documenten.

### Documentatie deployment
  * Op de volgende link wordt volledig in stappen uitgelegd hoe de Dotnet core applicatie en de Ionic applicatie geinstalleerd, ingesteld, en uitgevoerd moeten worden. [Deployment.md](https://github.com/AP-Elektronica-ICT/CA1819-RidderRedder/blob/master/doc/Deployment.md)
  
### Documentatie endpoints API
http://ridderredder.francecentral.cloudapp.azure.com/index.html

## Code guidelines
### Dotnet Core (C#)
Als coding guideline voor de Dotnet core omgeving hebben we de coding guidelines en conventions van Microsoft voor C# gevolgd. Dit document is terug te vinden op de volgende website: [Code conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions).
> Een uitzondering van deze coding guideline is dat wij curly brackets ``{}`` op dezelfde lijn als de ``function`` en ``condition blocks`` plaatsen. Dit omdat wij dit overzichtelijker vinden, en het minder ruimte in beslag neemt.
 
### Ionic (Typescript)
Als coding guideline voor de Ionic omgeving hebben wij de volgende conventions vastgesteld.
* Gebruik ``camelcasing`` voor alle **variabels**.
* Gebruik ``camelCasing`` voor alle **functie** namen en **parameters**. 
* Curly brackets ``{ }`` moeten op dezelfde lijn geplaatst worden voor een ``function`` en ``condition blocks``  
* Als er binnen een ``if() { }`` statement maar 1 regel code staat, mogen de curly brackets ``{}`` weggelaten worden.  
* Namen van **Pages**, **Components** en **Directives** moeten met een kleine letter beginnen.  
* Namen van **Providers** moeten met een hoofdletter beginnen.  

### Unit testing
Voor de API hebben we op de business layer enkele unit tests geschreven. Wij hebben alleen de unit tests geschreven voor functies waar ook daadwerkelijk business logic in verwerkt zit. Om de unit tests uit te voeren, kunnen we dit via Visual Studio doen. Klik in het menu bovenin op ``Test`` => ``Run`` => ``All Tests``. Of druk op ``Ctrl+R, A``.
