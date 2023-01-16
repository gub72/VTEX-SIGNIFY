const gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  data = require("gulp-data"),
  gcmq = require("gulp-group-css-media-queries"),
  gutil = require("gulp-util"),
  juice = require("@akzhan/gulp-juice"),
  j = require("juice"),
  del = require("del"),
  stripComments = require("gulp-strip-comments"),
  connect = require("gulp-connect"),
  path = require("path"),
  hb = require("gulp-hb"),
  injectPartials = require("gulp-inject-partials"),
  remove = require("gulp-email-remove-unused-css"),
  replace = require("gulp-replace"),
  extReplace = require("gulp-ext-replace"),
  i18n = require("gulp-i18n-localize");
//   filesToSass = [
//     "source/sass/inlined.scss",
//     "source/sass/embedded.scss",
//     "source/sass/tachyons.scss",
//   ],
(filesToWatch = [
  //"source/sass/**/*.scss",
  "source/templates/**/*",
]),
  (orderJsonToRead = "vtex");

j.codeBlocks.HBS = {};

// Partials
gulp.task("partials", function (done) {
  "use strict";
  return gulp
    .src("./source/templates/*.hbs")
    .pipe(
      injectPartials({
        removeTags: true,
      })
    )
    .pipe(gulp.dest("./temp"))
    .on("end", done);
});

// i18n
gulp.task("i18n", function (done) {
  "use strict";
  gulp
    .src(["temp/*.hbs"])
    .pipe(
      i18n({
        locales: ["pt-BR", "en-US"],
        localeDir: "source/locales",
        delimeters: ["((", "))"],
      })
    )
    .pipe(gulp.dest("temp"))
    .on("end", done);
});

// Compile HBS
gulp.task("hbs", function (done) {
  "use strict";
  var hbStream = hb({ bustCache: true })
    // Helpers
    .helpers(require("handlebars-helpers"))
    .helpers("./source/helpers/helpers.js");

  return gulp
    .src("temp/*/*.hbs")
    .pipe(
      data((file) =>
        require(file.path
          .replace(new RegExp("\\temp\\b"), "source")
          .replace(".hbs", ".json")
          .replace(/[a-z]{2}-[A-Z]{2}/, `data${path.sep}vtex`))
      )
    )
    .pipe(hbStream)
    .pipe(gulp.dest("temp"))
    .on("end", done);
});

// Clean HTML
gulp.task("clean:html", function (done) {
  "use strict";

  return gulp
    .src("temp/*/*.hbs")
    .pipe(
      stripComments({
        safe: true,
        trim: true,
      }).on("error", gutil.log)
    )
    .pipe(gulp.dest("temp"))
    .pipe(connect.reload())
    .on("end", done);
});

// Copy data to temp folder
gulp.task("copy-data-to-temp", function (done) {
  "use strict";
  gulp
    .src(["source/data/vtex/*.json"])
    .pipe(gulp.dest("temp/data/vtex"))
    .on("end", done);
});

// Copy temp to public folder
gulp.task("copy-public", function (done) {
  "use strict";
  gulp
    .src(["temp/*/*.hbs"])
    .pipe(extReplace(".html"))
    .pipe(gulp.dest("public"))
    .on("end", done);
});

// Copy temp to dist folder
gulp.task("copy-dist", function (done) {
  "use strict";
  gulp
    .src(["temp/*/*.hbs"])
    .pipe(extReplace(".html"))
    .pipe(gulp.dest("dist"))
    .on("end", done);
});

// Clean temp folder
gulp.task("clean:temp", function (done) {
  "use strict";
  return del(["temp"]).then(function () {
    done();
  });
});

// Clean project folder
gulp.task("clean", function (done) {
  "use strict";

  return del(["public/*"]).then(function () {
    done();
  });
});

// Default
gulp.task(
  "default",
  gulp.series([
    "partials",
    "i18n",
    "copy-data-to-temp",
    "hbs",
    "copy-public",
    "clean:temp",
  ])
);

// Default
gulp.task(
  "preview",
  gulp.series(["partials", "i18n", "hbs", "copy-public", "clean:temp"])
);

// Build
gulp.task(
  "dist",
  gulp.series(["partials", "i18n", "clean:html", "copy-dist", "clean:temp"])
);

// Start server w/ live reload
gulp.task("start", function (done) {
  "use strict";

  connect.server({
    port: 8000,
    root: "public",
    livereload: true,
  });

  done();
});

// Watch
gulp.task("watch", function (done) {
  "use strict";

  gulp.watch(filesToWatch, gulp.series(["default"]));

  done();
});

// Development mode
gulp.task("dev", gulp.series(["default", gulp.parallel(["start", "watch"])]));
