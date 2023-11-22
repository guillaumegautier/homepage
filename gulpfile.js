const gulp = require('gulp'),
	  plumber = require('gulp-plumber'),
	  sass = require('gulp-sass')(require('sass')),
	  sourcemaps = require('gulp-sourcemaps'),
	  autoprefixer = require('gulp-autoprefixer'),
	  image = require('gulp-image'),
	  uglify = require('gulp-uglify'),
	  del = require('del'),
	  browserSync = require('browser-sync').create(),
	  gutil = require('gulp-util'),
	  cp = require('child_process'),
	  dependents = require('gulp-dependents'),
	  { parallel, series, watch, src, dest, lastRun } = require('gulp');

var paths = {
	project: {
		dest: './dist',
	},
	jekyll: {
		src: ['src/**/*.html','!src/**/_*.html'],
		dest: './dist/',
		watch: 'src/**/*.html',
	},
	scripts: {
		src: './assets/js/**/*.js',
		dest: './dist/media/js/',
	},
	style: {
		src: './assets/scss/**/*.scss',
		dest: './dist/media/css',
		sourcemaps: '/_maps/',
	},
	fonts: {
		src: './assets/fonts/**/*.{ttf,woff,woff2,eof,eot,svg}',
		dest: './dist/media/fonts',
	},
	img: {
		src: './assets/img/**/*',
		dest: './dist/media/img',
	},
	animations: {
		src: './assets/animations/**/*',
		dest: './dist/media/animations',
	},
	watcher: {
		src: ['./assets/**/*','./src/**/*'],
	},
}

var configs = {
	sass: {
		outputStyle: 'compressed',
		includePaths: 'node_modules',
	},
	image: {
		pngquant: true,
		optipng: false,
		zopflipng: true,
		jpegRecompress: false,
		mozjpeg: true,
		gifsicle: true,
		svgo: true,
		concurrent: 10,
		quiet: false
	},
	jekyll: {
		default: '_config.yml',
	},
}

function browsersyncServe(cb){
	browserSync.init({
		server: {
			baseDir: './dist'
		}    
	});
	cb();
}

function browsersyncReload(cb){
	browserSync.reload();
	cb();
}

function jekyll(cb) {
	var jekyll = cp.spawn(process.platform === 'win32' ? 'jekyll.bat' : 'jekyll', ['build', '--config', 'src/_config.yml'], {stdio: 'inherit'});
	jekyll.on('error', (error) => console.error(error.message))
	jekyll.on('exit', function(code) {
		cb(code === 0 ? null :'ERROR: Jekyll process exited with code: '+ code);
	});
}

function javascript() {
	return gulp
	.src(paths.scripts.src, {since: lastRun(javascript)})
	.pipe(plumber())
	.pipe(uglify())
	.pipe(dest(paths.scripts.dest))
	.pipe(browserSync.stream());
}

function style() {
	return gulp
	.src(paths.style.src, {since: lastRun(style)} )
	.pipe(plumber())
	.pipe(dependents())
	.pipe(sourcemaps.init())
	.pipe(sass(configs.sass).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write(paths.style.sourcemaps))
	.pipe(dest(paths.style.dest))
	.pipe(browserSync.stream());
}

function styleBuild() {
	return gulp
	.src(paths.style.src)
	.pipe(plumber())
	.pipe(sass(configs.sass).on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(dest(paths.style.dest))
	.pipe(browserSync.stream());
}

function fonts(){
	return gulp
	.src(paths.fonts.src, {since: lastRun(fonts)})
	.pipe(dest(paths.fonts.dest))
	.pipe(browserSync.stream());
}

function animations(){
	return gulp
	.src(paths.animations.src, {since: lastRun(animations)})
	.pipe(dest(paths.animations.dest))
	.pipe(browserSync.stream());
}

function images() {
	return gulp
	.src(paths.img.src)
	.pipe(image(configs.image))
	.pipe(dest(paths.img.dest));
}

function imagesCopy() {
	return gulp
	.src(paths.img.src, {since: lastRun(imagesCopy)})
	.pipe(dest(paths.img.dest))
	.pipe(browserSync.stream());
}

// clean

function cleanDist() {
	return del(paths.project.dest)
}

// watch

function watchFiles(){
	gulp.watch(paths.jekyll.watch, series(jekyll, browsersyncReload))
	gulp.watch(paths.style.src, style)
	gulp.watch(paths.scripts.src, javascript)
	gulp.watch(paths.img.src, imagesCopy)
	gulp.watch(paths.fonts.src, fonts)
	gulp.watch(paths.animations.src, animations)
}

const watcher = watch(paths.watcher.src)
watcher.on('change', function(path, stats) {
	console.log(`File ${path} was changed`)
})

watcher.on('add', function(path, stats) {
	console.log(`File ${path} was added`)
})

watcher.on('unlink', function(path, stats) {
	console.log(`File ${path} was removed`)
})

const clean = cleanDist
const build = gulp.parallel(jekyll, styleBuild, javascript, fonts, animations,)
const compile = gulp.parallel(jekyll, style, javascript, fonts, imagesCopy, animations)

exports.clean = clean
exports.build = series(build)
exports.images = images
exports.watch = watchFiles
exports.default = series(clean, compile, browsersyncServe, watchFiles)

