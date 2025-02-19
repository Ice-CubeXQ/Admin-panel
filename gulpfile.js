const gulp = require("gulp");
const { debug } = require("webpack");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const ghPages = require("gulp-gh-pages-will");

const dist = "D:/Software/OpenServer/OSPanel/home/react-admin.local/admin";

gulp.task("copy-html", () => {
  return gulp.src("./app/src/index.html").pipe(gulp.dest(dist));
});

gulp.task("build-js", () => {
  return gulp
    .src("./app/src/main.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.(?:js|mjs|cjs)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  targets: "defaults",
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                    "@babel/react",
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist));
});

gulp.task("build-sass", () => {
  return gulp.src("./app/scss/style.scss").pipe(sass().on("error", sass.logError)).pipe(gulp.dest(dist));
});

gulp.task("copy-api", () => {
  return gulp.src("./app/api/**/*.*").pipe(gulp.dest(dist + "/api"));
});
gulp.task("copy-assets", () => {
  return gulp.src("./app/assets/**/*.*").pipe(gulp.dest(dist + "/assets"));
});

gulp.task("watch", () => {
  gulp.watch("./app/src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./app/assets/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./app/api/**/*.*", gulp.parallel("copy-api"));
  gulp.watch("./app/scss/**/*.*", gulp.parallel("build-sass"));
  gulp.watch("./app/src/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "copy-api", "build-sass", "build-js"));

gulp.task("deploy", () => {
  return gulp.src(`D:/Software/OpenServer/OSPanel/home/react-admin.local/**/*`).pipe(
    ghPages({
      remoteUrl: "https://github.com/Ice-CubeXQ/Admin-panel",
      branch: "gh-pages",
    })
  );
});

gulp.task("default", gulp.parallel("watch", "build"));
