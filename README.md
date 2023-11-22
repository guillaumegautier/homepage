# Cobblestone 
### Jekyll/Sass starter workflow, powered by Bootstrap.

## Features
#### Gulp
#### Bootstrap 5.2.3

## Usage
#### Installation :
`npm install`

#### Start coding :
`gulp` :  Builds Jekyll, scss and js, copy images, starts browser-sync server , then starts watcher  

`gulp build` : Builds Jekyll, scss and js, removes sourcemaps

`gulp image` : Image compression

## Documentation

### Folder structure

```
    dist
     ├ index.html
     ⎩ media
        ├ animations
        ├ css
        ├ fonts
        ⎩ js
    
    assets
     ├ animations
     ├ fonts
     ├ js
     │  ├ src
     │  ⎩ vendor
     ⎩ scss
        ⎩ style.scss
    
    src
     ├ _includes
     ├ _layouts
     ⎩ index.html
```

## Log

**04052023**
- Updated Bootstrap to 5.2.3
- Switched Liveroad to Browser-sync
- Removed clean from build and moves image compression to a separate job

**11092021 - Major update**
- Updated node modules and package
- Upgraded to Gulp 4
- Updated gulpfile
- Removed Combatproof mixins
- Removed scripts
- Removed Cobblestone CSS, replaced by Bootstrap 5.1.3 import in style.scss
- Updated Readme

**11162016**
- Updated 'Combatproof mixins' to v1.6.2
- Modified grid system and breakpoints for more balance
- Separated `_guides.scss` into `_grid-guides.scss` and `_reponsive-guides` guides
- Adapted gutter width in grid guide (now linked to `gutter`)
- Modified gulp file : `image` task is now independant and replaced by `image-copy` task
- Added `.scss-lint.yml` linter configuration file

**06092016**
- Updated 'Combatproof mixins' to v1.6
- Switched to Gulp instead of separated jekyll and sass commands
