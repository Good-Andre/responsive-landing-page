const { src, dest, parallel, series, watch } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');
const imageminWebp = require('imagemin-webp');
const htmlmin = require('gulp-htmlmin');
const groupMedia = require('gulp-group-css-media-queries');
const gulpStylelint = require('gulp-stylelint');

function lintCss() {
  return src('src/scss/**/*.scss').pipe(
    gulpStylelint({
      reporters: [{ formatter: 'string', console: true }],
    })
  );
}
exports.lintCss = lintCss;

const imgToApp = () => {
  return src(['./src/img/**/*.{svg,jpg,JPG,jpeg,png,gif,ico,tiff}'])
    .pipe(dest('./app/img'))
    .pipe(browserSync.stream());
};

const webpToApp = () => {
  return src(['./src/img/webp/*.{jpg,JPG,jpeg,png,webp}'])
    .pipe(webp())
    .pipe(dest('./app/img/webp'))
    .pipe(browserSync.stream());
};

const htmlInclude = () => {
  return src(['./src/*.html'])
    .pipe(fileinclude())
    .pipe(dest('./app'))
    .pipe(browserSync.stream());
};

// gulp otf2ttf (ВРУЧНУЮ)
const otf2ttf = () => {
  return src([source_folder + '/fonts/*.otf'])
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(dest(source_folder + '/fonts/'));
};

const fonts = () => {
  return src('./src/fonts/**.ttf')
    .pipe(ttf2woff2())
    .pipe(dest('./app/fonts/'))
    .pipe(browserSync.stream());
};

const checkWeight = (fontname) => {
  let weight = 400;
  switch (true) {
    case /Thin/.test(fontname):
      weight = 100;
      break;
    case /ExtraLight/.test(fontname):
      weight = 200;
      break;
    case /Light/.test(fontname):
      weight = 300;
      break;
    case /Regular/.test(fontname):
      weight = 400;
      break;
    case /Medium/.test(fontname):
      weight = 500;
      break;
    case /SemiBold/.test(fontname):
      weight = 600;
      break;
    case /Semi/.test(fontname):
      weight = 600;
      break;
    case /Bold/.test(fontname):
      weight = 700;
      break;
    case /ExtraBold/.test(fontname):
      weight = 800;
      break;
    case /Heavy/.test(fontname):
      weight = 700;
      break;
    case /Black/.test(fontname):
      weight = 900;
      break;
    default:
      weight = 400;
  }
  return weight;
};

const cb = () => {};

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts/';

const fontsStyle = (done) => {
  let file_content = fs.readFileSync(srcFonts);

  fs.writeFile(srcFonts, '', cb);
  fs.readdir(appFonts, function (err, items) {
    if (items) {
      let c_fontname;
      for (var i = 0; i < items.length; i++) {
        let fontname = items[i].split('.');
        fontname = fontname[0];
        let font = fontname.split('-')[0];
        let weight = checkWeight(fontname);

        if (c_fontname != fontname) {
          fs.appendFile(
            srcFonts,
            '@include font-face("' +
              font +
              '", "' +
              fontname +
              '", ' +
              weight +
              ');\r\n',
            cb
          );
        }
        c_fontname = fontname;
      }
    }
  });
  done();
};

const styles = () => {
  return src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError()))
    .pipe(groupMedia())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css/'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src('./src/js/main.js')
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: 'main.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      })
    )
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(sourcemaps.init())
    .pipe(uglify().on('error', notify.onError()))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/js'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app',
    },
    notify: false,
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', scripts);
  watch('./src/html/*.html', htmlInclude);
  watch('./src/*.html', htmlInclude);
  watch('./src/img/**/*.{svg,jpg,JPG,jpeg,png,gif,ico,tiff}', imgToApp);
  watch('./src/img/**/*.{jpg,JPG,jpeg,png,webp}', webpToApp);
  watch('./src/fonts/**', fonts);
};

const clean = () => {
  return del(['app/*']);
};

exports.fileinclude = htmlInclude;
exports.styles = styles;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.fonts = fonts;
exports.fontsStyle = fontsStyle;

exports.default = series(
  clean,
  parallel(
    htmlInclude,
    scripts,
    fonts,
    imgToApp,
    webpToApp
  ),
  styles,
  watchFiles
);

const imgToBuild = () => {
  return src(['./src/img/**.{svg,jpg,JPG,jpeg,png,gif,ico,tiff}'])
    .pipe(
      imagemin([
        imageminGiflossy({
          optimizationLevel: 3,
          optimize: 3,
          lossy: 2,
        }),
        imageminPngquant({
          speed: 8,
          quality: [0.7, 0.9],
        }),
        imageminZopfli({
          more: true,
        }),
        imageminMozjpeg({
          progressive: true,
          quality: 90,
        }),
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { removeUnusedNS: false },
            { removeUselessStrokeAndFill: false },
            { cleanupIDs: false },
            { removeComments: true },
            { removeEmptyAttrs: true },
            { removeEmptyText: true },
            { collapseGroups: true },
          ],
        }),
      ])
    )
    .pipe(dest('./app/img'));
};

const webpToBuild = () => {
  return src(['./src/img/webp/**.{jpg,JPG,jpeg,png,webp}'])
  .pipe(
    webp(
      imageminWebp({
        lossless: true,
        quality: 100,
        alphaQuality: 100,
      })
    )
  )
  .pipe(dest('./app/img/webp'))
}


const stylesBuild = () => {
  return src('./src/scss/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', notify.onError())
    )
    .pipe(groupMedia())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest('./app/css/'));
};

const scriptsBuild = () => {
  return src('./src/js/main.js')
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'main.js',
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      })
    )
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('./app/js'));
};

const htmlMinify = () => {
  return src('app/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('app'));
};

exports.imgToBuild = imgToBuild;
exports.webpToBuild = webpToBuild;


exports.build = series(
  clean,
  parallel(
    htmlInclude,
    scriptsBuild,
    fonts,
    imgToApp,
    webpToApp
  ),
  stylesBuild,
  htmlMinify,
  imgToBuild,
  webpToBuild
);
