# Projet_7-Front-End-PetitsPlats2.0

Développez un algorithme de recherche en JavaScript

## Démarrer le projet

## Installation

1. Clonez ce dépôt sur votre machine : https://github.com/Jerem16/Projet_7-Front-End-PetitsPlats2.0.git

2. Accédez au répertoire du projet : cd Projet_7-Front-End-PetitsPlats2.0

3. Installez les dépendances : yarn install

4. Démarrez l'application : yarn start

5. Construisez l'application pour la production : Yarn run build

6. Prévisualisez l'application : Yarn run preview

## Utilisation

Pour démarrer le serveur de développement, utilisez la commande : Yarn start
Commandes Scss: npm run sass / npm run copy / npm run prefix

## Prérequis

Assurez-vous d'avoir Node.js et npm installés sur votre machine.

## Auteur

Jérémy Lemaignent

## Licence

ISC

## Contributions

Les contributions sont les bienvenues ! Pour soumettre des suggestions ou des problèmes, veuillez ouvrir une issue sur GitHub.

## Workflow Git pour le Projet

```bash
1. **Créer une nouvelle branche pour le développement CSS depuis main :**


    git checkout main
    git pull origin main
    git checkout -b css


2. **Push les modifications branche CSS :**

    git add .
    git commit -m "Fonctionnalité HTML CSS Template JS: [Description de la modification]"
    git push origin css


3. **Créer une nouvelle branche pour le développement JavaScript depuis main :**

    git checkout main
    git pull origin main
    git checkout -b js

4. **Push les modifications branche JavaScript :**

    git add .
    git commit -m "Fonctionnalité JavaScript: [Description de la modification]"
    git push origin js

5. **Merger les branches CSS (css) et JavaScript (js) dans la branche main lorsque le travail est terminé :**

    git checkout main
    git merge css
    git merge js
    git push origin main
```
