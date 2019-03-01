const gulp = require ("gulp");//подключаем gulp
const uglify = require ("gulp-uglify");//минифицирование js
const concat = require ("gulp-concat");//конкатынация файлов, склеивает файдлы
const minifyCss = require ("gulp-minify-css");
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const shell = require('gulp-shell');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const path = {
	src:{
		html:"app/index.html",
		styles:[
			"app/css/vendors/*.css",
			"app/css/fonts.css",
			"app/css/style.css",
			"app/css/font-awesome.css"
		],
		js: [
			"app/js/libs/*.js",
			"app/js/bootstrap.js"
		],
		fonts: ["app/fonts/**/*","app/webfonts/**/*"],
		images:"app/img/**/*"
	},
	build :{
		html:"build",
		js: "build/js/",
		css: "build/css/",
		fonts:"build/webfonts/",
		images:"build/img/"
	}
};

gulp.task("js",function() {
	return gulp
	.src(path.src.js)
	.pipe(uglify())
	.pipe(concat("main.js"))
	.pipe(gulp.dest(path.build.js));
});
gulp.task("css",function(){
	return gulp
	.src(path.src.styles)
	.pipe(minifyCss())
	.pipe(concat("main.css"))
	.pipe(gulp.dest(path.build.css));
});
gulp.task("html",function(){
	return gulp
		.src(path.src.html)
		.pipe(gulp.dest(path.build.html));
});
gulp.task("img",function(){
	return gulp
	.src(path.src.images)
	.pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
]
				  ,
				  {
    verbose: true
}))
	.pipe(gulp.dest(path.build.images))
});

gulp.task("clean",function(){
	return gulp.src('build').pipe(clean())
});
gulp.task("build",shell.task([
	'gulp clean',
	'gulp img',
	'gulp html',
	'gulp css',
	'gulp js',
	'gulp font',
	
]));
gulp.task("font",function(){
	return gulp
	.src(path.src.fonts)
	.pipe(gulp.dest(path.build.fonts));
});
gulp.task("browser-sync",function(){
	browserSync({
		startPath: '/',
		server:{
			baseDir:"build",
			
		},
		notify:false
	});
});
