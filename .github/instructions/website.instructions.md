---
description: "Use when creating or changing this website's HTML, CSS, JavaScript, responsive layouts, visual design, accessibility, performance, or conversion paths."
applyTo: ["**/*.html", "assets/styles/*.css", "assets/scripts/*.js", "vite.config.js"]
---

# Websiteontwikkeling

## Ervaring en visuele richting

- Analyseer eerst de bestaande pagina, gedeelde componenten en interacties. Ontwerp voor De Kleine Klus Koning, niet voor een generiek klusbedrijf-template.
- Streef naar een onderscheidende, premium en minimalistische uitstraling: hoofdzakelijk zwart, wit en subtiele neutrale tinten, met terughoudende accentkleuren. Behoud herkenbare merkelementen en het bestaande logo; vernieuw de stijl als een consistente evolutie, niet als een losstaand thema.
- Gebruik duidelijke visuele hiërarchie, ruime witruimte, een beperkt palet, professionele typografie en geloofwaardige fotografie van echt werk. Gebruik geen generieke AI-beelden of decoratie die de inhoud verdringt. Bewerk of vervang echte bedrijfsfoto’s niet zonder reden.
- Houd pagina’s, navigatie, knoppen, formulieren, kaarten en focus-/hoverstaten onderling consistent. Laat de vormgeving vertrouwen en zorgvuldigheid uitstralen.
- Schrijf interface- en klantteksten in helder Nederlands en in de persoonlijke, toegankelijke merkstem. Maak waardepropositie, werkgebied, contactopties en vervolgstap snel begrijpelijk.

## UX en conversie

- Ontwerp mobile-first voor particulieren die snel willen weten of hun klus past en hoe zij contact opnemen. Maak primaire contactacties goed vindbaar, tappable en makkelijk bereikbaar zonder de inhoud te blokkeren.
- Verminder onnodige stappen en velden in het contactpad; verander de huidige WhatsApp-, formulier-, upload- of bedankflow alleen als alle bestaande stappen en fout-/succesgevallen behouden en getest zijn.
- Laat CTA’s aansluiten op het daadwerkelijke aanbod. Gebruik geen urgentie, prijs, reactietijd of garantie die niet door de eigenaar is bevestigd.
- Controleer layouts op smalle telefoons, tablets en brede schermen; voorkom horizontaal scrollen, afgesneden tekst en te kleine aanraakdoelen.

## Toegankelijkheid

- Gebruik semantische landmarks en een logische koppenvolgorde, betekenisvolle link- en knopnamen, labels voor formuliervelden, passende alt-teksten en zichtbare toetsenbordfocus.
- Zorg dat alle interacties met toetsenbord en aanraakbediening bruikbaar zijn. Respecteer `prefers-reduced-motion`; autoplay mag geen noodzakelijke informatie bevatten.
- Houd tekst- en interfacecontrast bruikbaar en gebruik kleur niet als enige informatiedrager. Behoud skip-link-, ARIA- en focusgedrag bij wijzigingen.

## Snelheid en onderhoudbaarheid

- Behoud de bestaande statische Vite-architectuur en gedeelde bestanden; voeg geen framework of dependency toe zonder aantoonbare noodzaak.
- Beperk JavaScript tot noodzakelijke interactie. Houd HTML, CSS en JavaScript leesbaar, herbruikbaar waar dat de bestaande structuur helpt, en vrij van ongebruikte regels of dubbele oplossingen.
- Behoud passende afbeeldingsafmetingen, `width`/`height`, lazy loading en efficiënte laadprioriteit; laad de belangrijkste zichtbare afbeelding niet lui.
- Controleer prestaties en layoutverschuivingen bij elke wijziging aan beeld, lettertype, animatie of component. Vermijd zware effecten en onnodige netwerkverzoeken.

## Behoud en verificatie

- Houd de bestaande routes, root-relatieve links, GitHub Pages-configuratie, metadata en inhoudelijke feiten intact, tenzij de opdracht anders vraagt.
- Verander geen galerij-, mobiele navigatie-, lichtbox-, formulier- of WhatsApp-functionaliteit zonder de betrokken interacties opnieuw te controleren.
- Voer na websitewijzigingen `npm run build` uit en controleer ook de relevante pagina op mobiel gedrag, toetsenbordtoegang, formulieren, links en SEO-metadata.
