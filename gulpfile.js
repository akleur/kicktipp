/* eslint-disable */
// Dependencies
var gulp = require('gulp'),
    log = require('fancy-log'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    PluginError = require('plugin-error'),
    path = require('path'),
    rsync = require('gulp-rsync'),
    fs = require('fs'),
    babel = require('gulp-babel'),
    replace = require('gulp-replace-task'),
    webpack = require('webpack');

// Conf
var webpackConfig = require('./webpack.config.js'),
    webpackServerConfig = require('./webpack.server.config.js'),
    webpackConfigProd = require('./webpack.server.config.js'),
    connectMongo = require('./api/lib/connectMongo'),
    AppVersion = require('./api/lib/AppVersion');

// Paths
var paths = {
    frontend: {
        src: './app/src',
        dist: './app/dist',
        npm: './app/node_modules'
    },
    api: './api'
};

var sassPaths = [
    paths.frontend.npm + '/motion-ui/src',
    paths.frontend.npm + '/foundation-sites/scss',
    paths.frontend.src + '/assets/fonts/foundation-icons',
    paths.frontend.src + '/assets/fonts/kt-icons'

];

var fontPaths = [
    paths.frontend.src + '/assets/fonts/**/*.svg',
    paths.frontend.src + '/assets/fonts/**/*.eot',
    paths.frontend.src + '/assets/fonts/**/*.ttf',
    paths.frontend.src + '/assets/fonts/**/*.woff',
    paths.frontend.src + '/assets/fonts/**/*.scss',
    paths.frontend.src + '/assets/fonts/**/*.css'
];

// Upload Tasks (local stuff)
var sshConnection = {
    username: 'git',
    hostname: '192.168.178.43',
    destination: '/var/www/html/kicktipp2016/'
};

var bananaLive = {
    port: 3000,
    host: 'http://android',
    basePath: 'kicktipp2016'
};

gulp.task('upload:root', function () {
    return gulp.src([
        './package.json',
        './gulpfile.js'
    ])
        .pipe(rsync({
            root: './',
            username: sshConnection.username,
            hostname: sshConnection.hostname,
            destination: sshConnection.destination
        }));
});

gulp.task('upload:frontend', [ 'build:frontend' ], function () {
    return gulp.src([
        paths.frontend.dist + '/**/*.*',
        paths.frontend.dist + '/imgs'
    ])
        .pipe(rsync({
            root: paths.frontend.dist,
            username: sshConnection.username,
            hostname: sshConnection.hostname,
            destination: sshConnection.destination + 'frontend/'
        }));
});

gulp.task('upload:css', [ 'sass' ], function () {
    return gulp.src([
        paths.frontend.dist + '/css/*.*'
    ])
        .pipe(rsync({
            root: paths.frontend.dist,
            username: sshConnection.username,
            hostname: sshConnection.hostname,
            destination: sshConnection.destination + 'frontend/'
        }));
});

gulp.task('upload:js', function () {
    return gulp.src([
        paths.frontend.dist + '/js/*.*'
    ])
        .pipe(rsync({
            root: paths.frontend.dist,
            username: sshConnection.username,
            hostname: sshConnection.hostname,
            destination: sshConnection.destination + 'frontend/'
        }));
});

gulp.task('upload:imgs', [ 'copy:imgs' ], function () {
    return gulp.src([
        paths.frontend.dist + '/imgs/**/*.*'
    ])
        .pipe(rsync({
            root: paths.frontend.dist,
            username: sshConnection.username,
            hostname: sshConnection.hostname,
            destination: sshConnection.destination + 'frontend/'
        }));
});

gulp.task('upload:api', function () {
    return gulp.src([
        paths.api + '/**/*.*',
        !paths.api + '/node_modules'
    ])
        .pipe(rsync({
            root: paths.api,
            username: sshConnection.username,
            hostname: sshConnection.hostname,
            destination: sshConnection.destination + 'api/'
        }));
});

// Server Tasks
gulp.task('run:server', ['build:server'], function () {
    exec('node server.bundle.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build:server', function () {
    return webpack(webpackServerConfig, function (err, stats) {
        if (err) throw new PluginError("webpack", err);
        log('[webpack]', stats.toString({
            colors: true
        }));
    });
});

gulp.task('watch:server', function () {
    webpackConfigServer.watch = true;
    return webpack(webpackConfigServer, function (err, stats) {
        if (err) throw new PluginError("webpack", err);
        log('[webpack]', stats.toString({
            colors: true
        }));
    });
});

// Socket.io Server Tasks
var webpackConfigSocketio = {
    entry: [
        path.join(__dirname, '/socket_server.js')
    ],
    output: {
        path: path.join(__dirname, '/'),
        filename: 'socket_server.bundle.js'
    },
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-eslatest-node6']
                }
            }
        ]
    }
};

gulp.task('build:socket_server', function () {
    return webpack(webpackConfigSocketio, function (err, stats) {
        if (err) throw new PluginError("webpack", err);
        log('[webpack]', stats.toString({
            colors: true
        }));
    });
});

gulp.task('watch:socket_server', function () {
    webpackConfigSocketio.watch = true;
    return webpack(webpackConfigSocketio, function (err, stats) {
        if (err) throw new PluginError("webpack", err);
        log('[webpack]', stats.toString({
            colors: true
        }));
    });
});


// Frontend Tasks
gulp.task('setVersion', function (callback) {
    connectMongo.init();

    var versionObj = {
        date: new Date(),
        timestamp: Date.now()
    };

    var version = new AppVersion(versionObj);
    console.log('version will be set');

    version.save(function (err, msg) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        else {
            console.log('version posted successfully');
            connectMongo.disconnect();
            callback();
        }
    });
});

gulp.task('build:frontend', ['webpack', 'build:sass', 'copy:assets'], function () {
    // Build complete frontend and copy all
});

gulp.task('build:frontendprod', ['webpack:prod', 'build:sass', 'copy:assets', 'setVersion'], function () {
    // Build optimized frontend and copy all
});

gulp.task('copy:assets', ['copy:html', 'copy:imgs', 'copy:fonts', 'copy:randompics'], function () {

});

gulp.task('copy:html', function () {
    return gulp.src(paths.frontend.src + '/*.html')
        .pipe(replace({
            patterns: [
                {
                    match: 'timestamp',
                    replacement: new Date().getTime()
                }
            ]
        }))
        .pipe(gulp.dest(paths.frontend.dist));
});

gulp.task('copy:imgs', function () {
    return gulp.src(paths.frontend.src + '/imgs/**/*.*')
        .pipe(gulp.dest(paths.frontend.dist + '/imgs/'));
});

gulp.task('copy:randompics', function () {
    return gulp.src(paths.frontend.src + '/random_pics/**/*.*')
        .pipe(gulp.dest(paths.frontend.dist + '/random_pics/'));
});

gulp.task('copy:fonts', function () {
    return gulp.src(fontPaths)
        .pipe(gulp.dest(paths.frontend.dist + '/css/fonts/'));
});

gulp.task('watch:frontend', ['watch:js', 'watch:sass'], function () {

});

gulp.task('watch:sass', function () {
    gulp.watch(paths.frontend.src + '/scss/**/*.scss', ['build:sass']);
});

gulp.task('watch:sass:online', [], function () {
    gulp.watch(paths.frontend.src + '/scss/**/*.scss', ['upload:css']);
});

gulp.task('build:sass', function () {
    gulp.src(paths.frontend.src + '/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: sassPaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions'],
            cascade: true
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(paths.frontend.dist + '/css'));
});

gulp.task('watch:js', function () {
    webpackConfig.watch = true;
    return webpack(webpackConfig, function (err, stats) {
        if (err) throw new PluginError("webpack", err);
        log('[webpack]', stats.toString({
            colors: true,
        }));
    });
});

gulp.task('webpack', function () {
    return webpack(webpackConfig, function (err, stats) {
        if (err) throw new PluginError("webpack", err);
        log('[webpack]', stats.toString({
            colors: true
        }));
    });
});

gulp.task('webpack:prod', function () {
    return webpack(webpackConfigProd, function (err, stats) {
        if (err) throw new PluginError("webpack", err);
        log('[webpack]', stats.toString({
            colors: true
        }));
    });
});
