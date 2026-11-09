# Knacka – mobilappen (iOS + Android)

Expo SDK 58 / React Native. Samma Firebase-projekt (`knacka-fiskaren`) som webbappen på app.fiskaren.nu, så allt syns i båda.

- Karta med statusnålar, områden, + för ny nål (adress fylls i automatiskt), peek-kort, detaljsida med Info/Anteckningar/Aktivitet
- Starta/Avsluta dagen: GPS-rutt i bakgrunden (`live/{uid}`, `tracks/{uid}_{datum}`), chefen ser teamet live
- Leads, Kalender (rutt + grupp-SMS till dagens Inte hemma), Tävling, Mer (team, språk)
- Påminnelser 08:00 för återbesök och 30 min före möten

Köra: `npx expo start` (Expo Go räcker för allt utom bakgrunds-GPS).
Bakgrunds-GPS kräver en development build: `npx eas-cli@latest build --profile development -p ios`.
Android-kartan behöver en Google Maps API-nyckel i app.json (`android.config.googleMaps.apiKey`).

