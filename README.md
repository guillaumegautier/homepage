# Homepage

Page d’accueil personnelle pour navigateur, construite avec Jekyll, Liquid,
Sass et Bootstrap. Elle propose une recherche Google et une grille de favoris.

Le site est entièrement statique. Les sources se trouvent dans `src/` et
`assets/`, puis Gulp génère la version prête à servir dans `dist/`.

## Prérequis

Installer les outils suivants :

- Ruby avec RubyGems ;
- Bundler ;
- Node.js et npm.

Les versions actuellement utilisées pour le projet sont Jekyll 4.4.1,
Gulp 4 et Bootstrap 5.2.

Vérifier les outils disponibles :

```sh
ruby --version
bundle --version
node --version
npm --version
```

Si Bundler n’est pas installé :

```sh
gem install bundler
```

Il n’est pas nécessaire d’installer Jekyll globalement : Bundler utilise la
version déclarée dans le `Gemfile`.

## Installation

Depuis la racine du projet, installer les dépendances Ruby :

```sh
bundle install
```

Puis installer les dépendances Node à partir du fichier verrouillé :

```sh
npm ci
```

`bundle install` installe Jekyll et ses plugins. `npm ci` installe Gulp,
Sass, Bootstrap et les outils de compilation des ressources.

Pour confirmer que Jekyll est disponible :

```sh
bundle exec jekyll --version
```

## Développement local

Lancer l’environnement de développement :

```sh
npx gulp
```

Cette commande :

1. supprime le contenu existant de `dist/` ;
2. génère les pages avec Jekyll ;
3. compile le SCSS avec Sass et Bootstrap ;
4. copie les images et les favicons ;
5. démarre BrowserSync sur le site généré ;
6. surveille les changements dans `src/` et `assets/`.

Les modifications sont recompilées automatiquement et le navigateur est
actualisé.

## Compilation

Pour produire une version complète du site :

```sh
npx gulp build
```

Le résultat est écrit dans `dist/`. Cette compilation :

- génère le HTML avec `bundle exec jekyll build` ;
- compile et préfixe le CSS ;
- optimise les images ;
- copie les favicons, polices et animations disponibles.

Pour tester uniquement la génération Jekyll :

```sh
bundle exec jekyll build --config src/_config.yml
```

Cette commande écrit également le résultat dans `dist/`, conformément à
`src/_config.yml`.

## Structure du projet

```text
.
├── assets/
│   ├── favicon/        Favicons et manifeste web
│   ├── img/            Logos, miniatures et arrière-plans
│   └── scss/           Styles Sass et imports Bootstrap
├── src/
│   ├── _includes/      Fragments Liquid réutilisables
│   ├── _layouts/       Structure générale des pages
│   ├── _config.yml     Configuration Jekyll
│   └── index.html      Contenu de la page d’accueil
├── dist/               Site compilé
├── Gemfile             Dépendances Ruby
├── Gemfile.lock        Versions Ruby verrouillées
├── gulpfile.js         Pipeline de développement et de compilation
├── package.json        Dépendances Node
└── package-lock.json   Versions Node verrouillées
```

## Modifier le contenu

Les favoris et leurs sections sont définis dans `src/index.html`. Chaque
favori indique un nom, un lien, un logo et un dégradé, puis utilise le fragment
`src/_includes/bm/bm-new.html`.

Les styles principaux sont définis dans `assets/scss/style.scss`. Bootstrap
est importé depuis `node_modules` pendant la compilation.

Après une modification, utiliser `npx gulp` pour travailler avec le
rechargement automatique ou `npx gulp build` pour régénérer `dist/`.

## Résolution des problèmes

### La commande `jekyll` est introuvable

Utiliser la commande du projet :

```sh
bundle exec jekyll --version
```

Si elle échoue, réinstaller les gems :

```sh
bundle install
```

### Une dépendance Node manque

Recréer l’installation depuis le verrou :

```sh
npm ci
```

### Repartir d’une sortie vide

```sh
npx gulp clean
npx gulp build
```

Attention : `clean` supprime entièrement le dossier généré `dist/`.
