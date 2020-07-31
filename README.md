# FrontWebShop
This is the frontend part of an REST applicaton. Implemented in Angular.

Every page except login and sign up is reachable only logged in users. If an unlogged in user want to
reach this pages directly they will be redirect to log in page.

# Funcions

## Public funcitons
- Login
- Sign up

## User functions
- List of products
- Add new products
- List of sold prodcuts
- Show every details of product
    - If this product belongs to the current user he can modify or delete the product
    - If this product belongs to an another user there is a buy button.
- User can see own datas and modify them. 
- Modify own address datas
- Every own products lists: Active products, Unvalid products, Already sold products
- List of own purchases
- Logout

## Admin functions
- Admin can reach every user function.
- Admin has permission to modify and delete on every products
- Admin can see the list of unvalid products. They have 2 buttons to: validate or delete it.
    Every new product came to this list. The users can only see the product after the validation.
- List of users
- Modify user datas. Set user role status to Admin or User.

-----------------------------------------------
# FrontWebShop
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


