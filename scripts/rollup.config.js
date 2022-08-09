import * as path from "path";
import * as fs from "fs";

import React from "react";
import ReactDOM from "react-dom";

import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";
import cleanup from "rollup-plugin-cleanup";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

const directoriesLib = require("../package.json").directories.lib;
const origin = require("../package.json").directories.origin;

function mkdirsSync(dirname) {
  //console.log(dirname);
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

const directoriesLibPath = path.join(process.cwd(), directoriesLib);

delDir(directoriesLibPath);

function generatorFileTree(parentPath, targetPath) {
  const complatePath = path.join(parentPath, targetPath);
  const stat = fs.statSync(complatePath);
  const isDirectory = stat.isDirectory();
  if (isDirectory) {
    const fileList = fs.readdirSync(complatePath);
    return {
      isDirectory,
      relative: path.relative(process.cwd(), complatePath),
      path: complatePath,
      fileName: targetPath,
      children: fileList.map((file) => generatorFileTree(complatePath, file)),
    };
  } else {
    return {
      isDirectory,
      relative: path.relative(process.cwd(), complatePath),
      path: complatePath,
      fileName: targetPath,
      children: null,
    };
  }
}

function loadFileTree(tree) {
  const { isDirectory, relative, path, fileName, children } = tree;

  if (!isDirectory && !children) {
    return [
      {
        isDirectory,
        relative,
        path,
        fileName,
      },
    ];
  }

  return children.reduce(
    (pre, next) => {
      let unitRes = loadFileTree(next);
      return [...pre, ...unitRes];
    },
    [
      {
        isDirectory,
        relative,
        path,
        fileName,
      },
    ]
  );
}

const fileTree = generatorFileTree(process.cwd(), origin);

const fileArray = loadFileTree(fileTree);

const needToBeCompiled = (file) => {
  return (
    !/bin/g.test(file.relative) &&
    /\.(ts|tsx|js|jsx|node|mjs)$/.test(file.fileName)
  );
};

const entrys = fileArray.filter(
  (entry) => !entry.isDirectory && needToBeCompiled(entry)
);

const copyList = fileArray.filter(
  (entry) => !entry.isDirectory && !needToBeCompiled(entry)
);

console.log("copyList", copyList);

const baseInputs = entrys
  .map(({ relative, fileName }) => {
    let extname = path.extname(fileName);
    const fileNameWithOutPostfix = fileName.replace(extname, "");
    const dir = path.join(
      process.cwd(),
      directoriesLib,
      path.relative(origin, relative),
      ".."
    );
    // const isUmd = extname === '.mjs' || dir.indexOf('env') >= 0;
    const external = (id) => {
      return id.indexOf(relative) < 0;
    };

    console.log(
      "===============fileNameWithOutPostfix",
      fileNameWithOutPostfix
    );
    console.log("===============relative", relative);
    console.log("===============dir", dir);

    return [
      {
        input: {
          [fileNameWithOutPostfix]: relative,
        },
        external: external,
        output: {
          entryFileNames: `[name].js`,
          dir: dir,
          format: "umd",
          sourcemap: false,
          name: fileNameWithOutPostfix + "-[name]",
        },
        plugins: [
          typescript(),
          cleanup(),
          babel({
            exclude: "**/node_modules/**",
            runtimeHelpers: true,
            plugins: ["@babel/plugin-external-helpers"],
          }),
          nodeResolve({
            extensions: ["ts", "tsx", ".js", ".jsx", ".json", ".node", ".mjs"],
          }),
          commonjs({
            include: "**/node_modules/**",
            namedExports: {
              react: Object.keys(React),
              "react-dom": Object.keys(ReactDOM),
              "styled-components": ["styled", "css", "ThemeProvider"],
              "@emotion/styled": ["styled"],
            },
          }),
          css(),
          terser(),
          uglify(),
        ],
      },
      {
        input: {
          [fileNameWithOutPostfix]: relative,
        },
        external: external,
        output: {
          entryFileNames: `[name].ts`,
          dir: dir,
        },
        plugins: [dts()],
      },
    ];
  })
  .flat();

try {
  if (!fs.existsSync(directoriesLibPath)) {
    // console.log(fs.existsSync(directoriesLibPath))
    // console.log(fs.existsSync(directoriesLibPath))
    fs.mkdirSync(directoriesLibPath);
  }
} catch (e) {
  console.log(e);
}

copyList.forEach((item) => {
  const { path: filePath, relative, fileName } = item;
  const dir = path.join(
    process.cwd(),
    directoriesLib,
    path.relative(origin, relative),
    ".."
  );
  const distPath = path.join(dir, fileName);
  console.log({
    filePath,
    distPath,
    dir,
    origin,
    directoriesLib,
    relative,
    test: path.relative(origin, relative),
  });
  try {
    mkdirsSync(dir);
  } catch (e) {
    console.log("1", item);
  }
  fs.copyFileSync(filePath, distPath);
});

module.exports = baseInputs;
