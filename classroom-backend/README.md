# 🚀 Installation & démarrage
## 1. Installer les dépendances
```bash
npm install
```

## 2. Créer un fichier .env

À la racine du backend :
```bash
PORT=3000
```
3. Lancer le serveur

Depuis le dossier classroom-backend :
```bash
node server.js
```

Le serveur démarre sur :
👉 http://localhost:3000

[Bcrypt](https://www.npmjs.com/package/bcrypt) Permet de hasher les mots de passe

[Dotenv](https://www.npmjs.com/package/dotenv) Permet d'utiliser les .env

[Express](https://expressjs.com/) Est un framework backend pour Node.js

# 🏗️ Structure du projet
* classroom-backend/
* │
* ├── server.js          # Point d’entrée de l’application
* ├── app.js             # Configuration d’Express (middlewares + routes globales)
* ├── .env               # Variables d'environnement
* │
* ├── App/
* │   ├── controllers/   # Logique de traitement des requêtes
* │   ├── services/      # Logique métier
* │   ├── repositories/  # Accès aux données (DB, fichiers…)
* │   └── routes/        # Définition des endpoints Express
* │
* └── package.json

## 📄 server.js (lance Express + gère le serveur HTTP)
```bash
require("dotenv").config({ path: __dirname + "/.env" });
const http = require("node:http");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
    console.error("Failed to start server:", err.message);
});
```

## 📄 app.js (configuration Express)
```bash
const express = require("express");

// Import des routes
// Exemple :
// const userRoutes = require("./App/routes/userRoutes"); 
```
Ici on importe les routes que l'on aura crée autant que l'on a d'entité [Exemple](#-exempleroutejs-dans-le-dossier-routes)
```bash
const app = express();

// Middlewares globaux
app.use(express.json());
// Enregistrement des routes
// Exemple :
// app.use("/users", userRoutes);
```
Ici on dira a notre application d'utiliser l'ensemble des routes défini sur userRoutes uniquement quand l'url sera localhost:8080/users
C'estt ensuite userRoutes qui prendra le relai pour la suite par exemple /users/login ou users/register etc etc

```bash
// 404
app.use((req, res) => {
    res.status(404).json({ message: "404 Not Found" });
});

module.exports = app;
```

## 📄 exempleRoute.js (Dans le dossier routes)

Ca nous permet de créer les différentes routes de notre projet
On organise les fichiers JS en fonction des entités que l'on a besoin de récupérer 
Exemple userRoute.js / bookRoute.js 

```bash
const express = require("express"); On import express
const userController = require("../Controllers/UserController"); Le controlleur correspondant (ici user)

const userRoutes = () => {
    const router = express.Router();
    router.post("/register", userController.createUser); Une route se découpe toujours en 3 morceaux 
    
    POST ici permet de définir la méthode a utiliser (GET, DELETE, PUT, POST)

    Ensuite on vient indiquer le chemin sur laquel cela sera accessible ici "/register" ce qui pourra nous donner localhost:8080/api/users/register
    Pour terminer on donne la fonction du controller qui va être utilisé pour cette route ici ca sera la fonction createUser de notre controller userController

    return router;
};
module.exports = userRoutes;
```

## 📄 exempleController.js (Dans le dossier controller)

On va donc créer une class pour chaque controller 
Ici UserController
```bash
const UserService = require("../Services/UserService.js");
const { validateUser } = require("../Validators/userValidator.js");

class UserController {
    //Créer un utilisateur avec mot de passe et email
    async createUser(req, res) {
```
Ici on va manipuler 2 choses la req-uest (demande) et res-ponse (réponse)
Notre req c'est les données entrante, on récupérera généralement un body que l'on pourra extraire
```bash 
        try {
            const { email, password } = validateUser(req.body); //Validation format et existance des champs

            const user = await UserService.createUser(email, password); //Vérification de l'email et création en bdd

            //Validation de la création
            res.status(201).json({
                message: "Utilisateur créé avec succès",
                user,
            });
```
On revois ici notre res avec un status et un message/information (ici l'objet user crée en en bdd)
```bash
        } catch (error) {
            //Gestion des erreurs
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
```


## BONUS

Concernant services et repository rien de nouveau ni d'unique au framework Express