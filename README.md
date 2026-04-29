# KleineKlusKoning

Statische website voor De kleine Klus Koning.

## Lokaal starten

1. Installeer dependencies:
	`npm install`
2. Start de ontwikkelserver:
	`npm start`

De site draait daarna lokaal via Vite en opent direct op de homepage via `/`.

Beschikbare pagina's tijdens lokaal ontwikkelen:

- `/`
- `/portfolio/`
- `/contact/`

## Productiebouw

Gebruik voor een build:

`npm run build`

Een lokale preview van de build start u met:

`npm run preview`

## Deploy naar GitHub Pages

De repo bevat een workflow in `.github/workflows/deploy-pages.yml` die de site bij iedere push naar `main` buildt en publiceert naar GitHub Pages.

De productiebuild is ingericht voor het custom domain `kleinekluskoning.nl`:

- de workflow bouwt met base-path `/`
- `public/CNAME` wordt meegekopieerd naar de Pages-artifact

Eenmalig instellen in GitHub:

1. Ga naar `Settings` > `Pages`.
2. Kies bij `Source` voor `GitHub Actions`.
3. Controleer dat `Custom domain` op `kleinekluskoning.nl` staat.
4. Zet `Enforce HTTPS` aan zodra GitHub Pages meldt dat het certificaat actief is.

Benodigde DNS-records voor het domein:

- `A` record voor `kleinekluskoning.nl` naar `185.199.108.153`
- `A` record voor `kleinekluskoning.nl` naar `185.199.109.153`
- `A` record voor `kleinekluskoning.nl` naar `185.199.110.153`
- `A` record voor `kleinekluskoning.nl` naar `185.199.111.153`
- `CNAME` record voor `www.kleinekluskoning.nl` naar `GitPushAndChill.github.io`

Voor een lokale controle van een GitHub Pages-build kunt u dit gebruiken:

`$env:SITE_BASE='/'; npm run build`

## Contactformulier

Het contactformulier gebruikt de gratis dienst FormSubmit en stuurt aanvragen door naar `kleinekluskoning@gmail.com`.

Belangrijk:

- De eerste keer dat iemand het formulier verzendt, stuurt FormSubmit een activatiemail naar `kleinekluskoning@gmail.com`.
- Open die mail en bevestig het formulier eenmalig.
- Daarna worden nieuwe aanvragen automatisch doorgestuurd.