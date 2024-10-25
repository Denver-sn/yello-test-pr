# **API RESTful de Gestion des Cours avec NestJS**

## **Fonctionnalités**

- Création d'un nouveau cours
- Récupération d'un cours par son ID
- Récupération de tous les cours disponibles
- Mise à jour d'un cours existant
- Suppression d'un cours
- Validation des données d'entrée
- Gestion des erreurs et exceptions
- Documentation API avec Swagger

## **Installation**

### **Prérequis**

- [Node.js](https://nodejs.org/) version 16.x ou supérieure
- [PostgreSQL](https://www.postgresql.org/) installé et configuré (soit use une db local)

### **Étapes d'Installation**

1. Clone le projet :

   ```bash
   git clone https://github.com/Denver-sn/yello-test-pr.git
   cd yello-test-pr
   ```

2. Installe les dépendances :

   ```bash
   npm install
   ```

3. Configure la base de données PostgreSQL :

   - Crée une base de données PostgreSQL nommée `pr_db`.
   - Crée un fichier `.env` à la racine du projet avec le contenu suivant :

     ```env
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USER=your_username
     DATABASE_PASSWORD=your_password
     DATABASE_NAME=pr_db
     PORT=3000
     ```

## **Exécution du Projet**

### **Démarrer l'API en mode développement**

Assurez-vous que votre base de données PostgreSQL est en cours d'exécution, puis lancez l'application :

```bash
npm run start:dev
```

### **Accéder à l'API**

L'API sera disponible à l'adresse suivante : [http://localhost:3000](http://localhost:3000)

### **Documentation Swagger**

Une documentation Swagger est disponible à l'adresse : [http://localhost:3000/api](http://localhost:3000/docs)

## **Tests**

### **Exécution des Tests Unitaires**

Pour exécuter les tests unitaires, utilisez la commande suivante :

```bash
npm run test
```

### **Exécution des Tests **

Pour générer un rapport de couverture de tests :

```bash
npm run test:cov
```

Ou simplement si vous souhaitez exécuté les tests:

```bash
npm run test
```

## **Choix Techniques**

### **NESTJS**

NestJS est un framework basé sur Node.js qui permet de créer des applications backend avec une structure modulaire et maintenable
J'ai choisi NestJS pour sa robustesse, sa gestion des dépendances, et son intégration facile avec TypeORM

### **Base de Données**

J'ai utilisé **PostgreSQL** comme base de données relationnelle en raison de sa fiabilité et de sa capacité à gérer des relations complexes et comme ORM **TypeORM** facilite la gestion des entités et des migrations.

### **Sécurité**

- Validation des données d'entrée avec **class-validator**.
- Utilisation de requêtes paramétrées pour éviter les injections SQL.
- Gestion des erreurs centralisée avec des filtres globaux

## **Documentation de l'API**

### **Endpoints**

1. **GET** `/courses` : Récupérer la liste de tous les cours.
2. **GET** `/courses/{id}` : Récupérer un cours spécifique par ID.
3. **POST** `/courses` : Ajouter un nouveau cours (titre, description, niveau).
4. **PUT** `/courses/{id}` : Mettre à jour un cours existant.
5. **DELETE** `/courses/{id}` : Supprimer un cours.

### **Schéma des Données**

- **Course** :
  - `id` : Identifiant unique (UUID)
  - `title` : Titre du cours (string)
  - `description` : Description du cours (string)
  - `level` : Niveau du cours (`Débutant`, `Intermédiaire`, `Avancé`)
