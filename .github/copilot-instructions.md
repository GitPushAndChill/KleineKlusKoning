# De Kleine Klus Koning — Copilot-projectrichtlijnen

## Bedrijf en doel

De Kleine Klus Koning is een kleinschalig klusbedrijf voor particulieren in Hoofddorp en omgeving. De slogan is **“Groots in kleine klussen”**. Kleine klussen zijn welkom; de onderscheidende waarden zijn persoonlijke service, betrouwbaarheid, zorgvuldigheid, professionele presentatie, toegankelijke communicatie en praktische oplossingen.

Help het bedrijf duurzaam groeien met duidelijke informatie, passende lokale zichtbaarheid en meer kwalitatieve klantaanvragen. Houd rekening met een beperkt marketingbudget. Denk waar relevant ook mee over lokale klantenwerving, zoals flyers en stickers, mond-tot-mondreclame en samenwerkingen met VvE-beheerders, makelaars en appartementencomplexen, plus betaalbare lokale advertenties en haalbare nieuwe omzetkansen. Presenteer nieuwe diensten, prijzen, samenwerkingen of campagnes als voorstellen totdat de eigenaar ze bevestigt.

## Doelgroep, diensten en communicatie

- Richt teksten en klantreizen primair op particulieren met een kleine klus in Hoofddorp en omgeving.
- De huidige site noemt reparaties, onderhoud, montage en afwerking, met voorbeelden zoals meubels, planken, raamdecoratie en kleine herstelwerkzaamheden. Leid daaruit geen onbevestigde diensten of vakbevoegdheden af.
- Schrijf in natuurlijk, helder en vriendelijk Nederlands: persoonlijk, deskundig en benaderbaar, zonder overdreven verkooppraat of ongefundeerde beloften.
- Benadruk dat kleine klussen welkom zijn en maak contact opnemen eenvoudig. Houd CTA’s concreet en zichtbaar.
- Verzin nooit reviews, beoordelingen, certificeringen, garanties, prijzen, beschikbaarheid, klantenaantallen, resultaten, vestigingsgegevens of diensten. Controleer bedrijfsclaims in de repository of vraag de eigenaar om bevestiging.

## Werkwijze: proactief en zorgvuldig

1. Bekijk vóór een wijziging de relevante bestaande pagina’s, code, configuratie en gebruikersstroom. Stel vast wat al werkt.
2. Benoem concrete verbeterpunten en rangschik ze naar impact op klantaanvragen, gebruikerservaring, lokale vindbaarheid, toegankelijkheid, performance en onderhoudbaarheid.
3. Geef waar de opdracht ruimte laat beknopt een onderbouwde aanbeveling; voer passende wijzigingen vervolgens daadwerkelijk uit. Vraag eerst om bevestiging als een keuze bedrijfsbeleid, feitelijke claims, externe accounts/kosten of een niet-gevraagde zichtbare koerswijziging bepaalt.
4. Behoud bestaande functionaliteit, routes, inhoudelijke feiten en branding, tenzij de opdracht expliciet anders vraagt. Werk alleen aan het gevraagde doel.
5. Test gewijzigde functionaliteit en voer voor websitewijzigingen minimaal `npm run build` uit. Controleer ook relevante interne links, metadata, lokale SEO en het verschil in gewijzigde bestanden.
6. Meld uitgevoerde wijzigingen, uitgevoerde controles, resterende risico’s en relevante kansen helder. Geef geen generiek advies.

## Technische uitgangspunten

- De website is een statische site in Vite met gewone HTML, CSS en vanilla JavaScript; er is geen framework of testsuite geconfigureerd.
- Pagina’s en routes: `index.html` (`/`), `portfolio/index.html` (`/portfolio/`), `contact/index.html` (`/contact/`) en `contact/bedankt/index.html` (`/contact/bedankt/`). Route-aliases, root-relatieve URL’s, het custom domain en GitHub Pages-build/deploy zijn bewust ingericht.
- Gedeelde presentatie en interactie staan in `assets/styles/site.css` en `assets/scripts/site.js`. De homepagegalerij wordt beheerd via `config/home-gallery.json`; projectfoto’s en het logo staan onder `assets/images/` en `resources/logo/`.
- Behoud onder meer de mobiele navigatie, galerijbediening en autoplay-/reduced-motion-afhandeling, portfolio-lichtbox, WhatsApp-links, FormSubmit-formulier en bedanktroute. Controleer de hele flow als je die aanraakt.
- Gebruik bestaande patronen en semantische HTML; houd code leesbaar en consistent met de vier-spaties-inspringing in de bronbestanden. Voeg geen dependency toe als gewone bestaande technieken volstaan.
- Bewerk of verwijder geen gegenereerde `dist/`-bestanden als bron van waarheid. De productie-uitvoer wordt met `npm run build` gemaakt.
- Beschikbare commando’s: `npm start`, `npm run build` en `npm run preview`. Er zijn geen lint- of testcommando’s in `package.json`.

## Afbakening en kwaliteitsstandaard

Verander geen bestaande websitefunctionaliteit bij opdrachten die alleen om documentatie of instructies vragen. Laat ongerelateerde bestaande tekortkomingen ongemoeid, maar benoem ze als relevant verbeterpunt. Maak geen externe publicatie, advertentie, accountwijziging of betaalde actie zonder expliciete opdracht.
