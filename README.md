# FrontWebShop
REST applikáció fejlesztése. A webshop nevű java backendhez tartozó frontend oldali rész.
A frontend Angularban került implementálásra. 

Az oldalon a bejelentkezezés és a regisztráláson kívül minden oldal elérése bejelentkezéshez kötött.
A nem bejelentkezett felhasználót átirányítjuk a bejelentkezési felületre. 

# Funkciók
- Bejelentkezése
- Regisztrálás

## User funkciók
- Termék listázás
- Új termék rögzítés
- Már eladott termékek listázása
- Termék részleteinek megjelenítése
    - Saját termék esetén módosítási és törlési funkció
    - Más terméke esetén vásárlási funkció
- Felhasználó adatok, és azok módosítása
- Cím adat módosítása
- Saját termékek listázása: Actív termékeké, validálásra váró termékeké, eladott termékeké
- Saját vásárolt termékek listázása
- Kijelentkezés

## Admin funkciók
- Minden funkció ami a userek számára is elérhető.
- Minden termék esetén editálási és törlési lehetőség.
- Unvalid termékek listázáse és validálási vagy törlési opció. Validálás nélkül az új termékek a Userek számára nem jelennek meg.
- Userek listázása
- Userek adatainak módosítása vagy user törlésen


-----------------------------------------------
# FrontWebShop
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


