# Projet_7-Front-End-PetitsPlats2.0

## Développez un algorithme de recherche en JavaScript

### Description du Projet

Ce projet a pour objectif de développer un algorithme de recherche efficace pour une plateforme de recettes de cuisine, en utilisant des outils et méthodes avancées de JavaScript, ainsi que Bootstrap pour styliser l'interface.

### Objectifs Principaux

-   Concevoir l'interface utilisateur du site en utilisant Bootstrap.
-   Développer deux versions d'un algorithme de recherche capable de parcourir et de filtrer efficacement un fichier JSON.
-   Analyser et comparer les performances des algorithmes.
-   Documenter le processus et justifier le choix de l'algorithme optimal.
-   Appliquer les principes du Green Code pour un développement respectueux de l'environnement.

### Structure du Projet

1. **Conception de l'Interface Utilisateur**

    - Utilisation de Bootstrap pour créer une interface intuitive et réactive.
    - Mise en place d'une interface conviviale et accessible sur différents appareils.

2. **Développement des Algorithmes de Recherche**

    - Implémentation de deux versions distinctes de l'algorithme de recherche en JavaScript.
    - Les algorithmes parcourent et filtres efficacement les données.

3. **Analyse des Performances**

    - Utilisation de Jsben.ch pour évaluer et comparer les performances des algorithmes.

4. **Documentation et Justification**

    - Le processus de développement de chaque algorithme à été documenté.
    - Analyse des performances et justifications des choix basées sur les tests.
    - L'algorithme sélectionné est le plus adapté et performant pour la plateforme de recettes.

5. **Principes du Green Code**
    - Intégrez des pratiques de développement durable tout au long du projet.
    - Optimisez le code pour minimiser la consommation de ressources et l'impact environnemental.

### Compétences Acquises

#### Techniques

-   Analyse de problèmes informatiques complexes.
-   Développement et optimisation d'algorithmes de recherche.
-   Utilisation avancée de JavaScript et Bootstrap.

## Démarrer le Projet

### Installation

1. Clonez ce dépôt sur votre machine :

    ```bash
    git clone https://github.com/Jerem16/Projet_7-Front-End-PetitsPlats2.0.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd Projet_7-Front-End-PetitsPlats2.0
    ```

3. Installez les dépendances :

    ```bash
    yarn install
    ```

4. Démarrez l'application :

    ```bash
    yarn start
    ```

5. Construisez l'application pour la production :

    ```bash
    yarn run build
    ```

6. Prévisualisez l'application :
    ```bash
    yarn run preview
    ```

### Utilisation

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
