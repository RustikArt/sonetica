# Documentation de transfert - Projet Sonetica

## Introduction

Ce document est destiné à un autre compte Manus qui reprendra le développement du projet Sonetica. Il contient toutes les informations nécessaires pour comprendre l'état actuel du projet, les attentes du client, et comment poursuivre le développement.

## État actuel du projet

Sonetica est une application web de création de playlists personnalisées basée sur les goûts, intentions et besoins de l'utilisateur. L'application permet aux utilisateurs de répondre à une série de questions, puis utilise une IA pour analyser ces réponses et générer une playlist adaptée.

### Fonctionnalités implémentées

- Interface utilisateur complète avec thème clair/sombre
- Design responsive adapté aux mobiles et ordinateurs
- Système de questionnaire interactif avec différents types de questions
- Navigation avec navbar (Accueil, Ma bibliothèque, Créer, Découvrir)
- Authentification utilisateur (simulée)
- Gestion des playlists (affichage, modification, suppression de morceaux)
- Système de partage de playlists
- Mode surprise pour générer des playlists aléatoires
- Panel d'administration

### Fonctionnalités partiellement implémentées ou simulées

- Intégration avec l'API Spotify (actuellement simulée)
- Système d'IA pour l'interprétation des réponses (actuellement simulé)
- Gestion de l'expiration des playlists

### URL de déploiement

Le site est actuellement déployé à l'adresse : https://ntzunemu.manus.space

## Attentes du client

D'après les derniers retours du client, voici les principales attentes :

1. **Implémentation d'une véritable IA générative** pour créer des playlists basées sur les réponses des utilisateurs (point crucial)
2. **Refonte de l'interface utilisateur** selon les retours détaillés (voir section dédiée)
3. **Stabilisation des interactions** et finalisation des fonctionnalités incomplètes
4. **Intégration réelle avec Spotify** pour la recherche et la création de playlists

## Retours détaillés du client

Le client a fourni un document détaillé avec des retours spécifiques pour chaque section de l'application. Voici un résumé des points principaux :

### Accueil
- Retirer l'émoji "dés" du mode surprise
- Ajouter des dégradés verts dynamiques sous les bulles des durées
- Remplacer la section "Comment ça marche ?" par des avis utilisateurs
- Ajouter des flèches directionnelles entre les étapes
- Créer un pop-up de contact accessible depuis un nouvel onglet dans la navbar
- Rédiger et intégrer les mentions légales et confidentialité
- Améliorer le thème clair/sombre avec des icônes
- Enrichir le menu utilisateur avec options de langue et abonnement

### Ma bibliothèque
- Proposer une playlist de départ avec titres aléatoires
- Améliorer l'interface de preview des playlists
- Créer des collages d'images pour les playlists

### Créer
- Déplacer les conseils dans la bulle d'aide
- Ajouter plus de réponses proposées et une option "Autre"
- Améliorer la visualisation des choix actifs
- Implémenter une véritable génération par IA
- Structurer le processus en étapes claires après le questionnaire

### Découvrir
- Améliorer les interactions sur les playlists
- Créer des playlists par Sonetica avec images générées par IA
- Implémenter une barre de recherche fonctionnelle
- Mettre en place un système dynamique de popularité

## Structure du code

Le projet est structuré comme suit :

```
sonetica/
├── dist/                 # Fichiers de build pour le déploiement
├── node_modules/         # Dépendances
├── public/               # Ressources statiques
├── src/
│   ├── components/       # Composants React
│   │   ├── AdminPanel.tsx
│   │   ├── AuthForm.tsx
│   │   ├── Navbar.tsx
│   │   ├── Playlist.tsx
│   │   ├── QuestionnaireForm.tsx
│   │   └── ShareModal.tsx
│   ├── lib/              # Bibliothèques et utilitaires
│   │   ├── AIGenerator.tsx
│   │   ├── ExpirationManager.tsx
│   │   └── SpotifyIntegration.tsx
│   ├── styles/           # Fichiers CSS
│   │   ├── animations.css
│   │   └── spotify-theme.css
│   ├── App.tsx           # Composant principal
│   ├── index.css         # Styles globaux
│   └── index.tsx         # Point d'entrée
├── package.json          # Configuration du projet
├── tsconfig.json         # Configuration TypeScript
└── vite.config.js        # Configuration Vite
```

## Fonctionnement du code

### Composants principaux

1. **App.tsx** : Composant racine qui gère l'état global et la navigation entre les différentes vues.

2. **Navbar.tsx** : Barre de navigation avec les sections principales et le contrôle du thème.

3. **QuestionnaireForm.tsx** : Formulaire de questions pour recueillir les préférences musicales de l'utilisateur.

4. **Playlist.tsx** : Affichage et gestion des playlists générées.

5. **AuthForm.tsx** : Formulaire d'authentification (email + OAuth Spotify).

6. **ShareModal.tsx** : Modal pour partager les playlists.

7. **AdminPanel.tsx** : Panel d'administration pour la gestion des playlists et utilisateurs.

### Bibliothèques et utilitaires

1. **AIGenerator.tsx** : Simulation de génération de playlists par IA (à remplacer par une véritable implémentation).

2. **SpotifyIntegration.tsx** : Simulation d'intégration avec l'API Spotify (à remplacer par une véritable intégration).

3. **ExpirationManager.tsx** : Gestion de l'expiration des playlists.

### Styles

1. **animations.css** : Animations et transitions pour l'interface.

2. **spotify-theme.css** : Styles inspirés de Spotify pour l'interface.

## Comment poursuivre le développement

### 1. Implémentation de l'IA générative

La priorité absolue est d'implémenter une véritable IA pour générer des playlists basées sur les réponses des utilisateurs. Voici les étapes recommandées :

1. Analyser les réponses du questionnaire pour extraire les préférences musicales
2. Utiliser ces préférences pour générer une requête à une API d'IA (OpenAI, Hugging Face, etc.)
3. Traiter la réponse de l'IA pour créer une playlist cohérente
4. Intégrer cette logique dans le composant AIGenerator.tsx

### 2. Intégration avec Spotify

Pour une véritable intégration avec Spotify, il faudra :

1. Créer une application dans le dashboard développeur Spotify
2. Implémenter l'authentification OAuth
3. Utiliser l'API Spotify pour rechercher des morceaux et créer des playlists
4. Remplacer la simulation actuelle dans SpotifyIntegration.tsx

### 3. Refonte de l'interface utilisateur

Suivre les retours détaillés du client pour améliorer l'interface utilisateur :

1. Modifier la page d'accueil selon les spécifications
2. Améliorer la bibliothèque et l'interface de preview des playlists
3. Restructurer le processus de création en étapes claires
4. Enrichir la section Découvrir avec les fonctionnalités demandées

### 4. Finalisation et déploiement

1. Tester toutes les fonctionnalités
2. Corriger les bugs et optimiser les performances
3. Builder l'application pour la production
4. Déployer la nouvelle version

## Dépendances et environnement

Le projet utilise :
- React avec TypeScript
- Tailwind CSS pour les styles
- Vite comme bundler

Pour installer les dépendances :
```bash
cd sonetica
pnpm install
```

Pour lancer le serveur de développement :
```bash
pnpm run dev
```

Pour builder le projet :
```bash
pnpm run build
```

## Ressources et documentation

- [Documentation React](https://reactjs.org/docs/getting-started.html)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation API Spotify](https://developer.spotify.com/documentation/web-api/)

## Conclusion

Le projet Sonetica est bien avancé mais nécessite encore des améliorations significatives, notamment l'implémentation d'une véritable IA pour la génération de playlists et l'intégration réelle avec Spotify. Les retours détaillés du client fournissent une feuille de route claire pour finaliser le projet.

N'hésitez pas à explorer le code existant pour comprendre la structure et la logique actuelles avant d'apporter des modifications.

Bon développement !
