import * as path from "path";
import * as fs from "fs";

import React from "react";
import ReactDOM from "react-dom";

import babel from "@rollup/plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-import-css";
import cleanup from "rollup-plugin-cleanup";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

const directoriesLib = require("../package.json").directories.lib;
const origin = require("../package.json").directories.origin;

const plugins = [
  // terser(),
  // uglify(),
  // cleanup(),
  typescript(),
  peerDepsExternal(),
  commonjs(),
  babel({
    exclude: "**/node_modules/**",
    // runtimeHelpers: true,
    babelHelpers: "runtime",
    plugins: ["@babel/plugin-external-helpers"],
  }),
  // postcss(),
];

const external = [
  (id) => /\/__expample__|main.tsx/.test(id),
  "react",
  "react-dom",
  "classname",
  "react-is",
  "@fortawesome/fontawesome-svg-core",
  "@fortawesome/free-solid-svg-icons",
  "@fortawesome/react-fontawesome",
  "**/node_modules/**",
];

const config = [
  // {
  //   input: "originLib/index.ts",
  //   output: {
  //     dir: "/Users/user/AsowProject/common-client/lib",
  //     format: "es",
  //   },
  //   plugins: plugins,
  //   external,
  // },
  // {
  //   input: "originLib/index.ts",
  //   output: {
  //     dir: "/Users/user/AsowProject/common-client/lib",
  //     format: "es",
  //   },
  //   plugins: [...plugins, dts()],
  //   external,
  // },
  // ******************************************************
  {
    input: "originLib/hooks/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/hooks",
      format: "es",
    },
    plugins: plugins,
    external,
  },
  {
    input: "originLib/hooks/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/hooks",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, dts()],
    external,
  },
  // ******************************************************
  {
    input: "originLib/utils/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/utils",
      format: "es",
      sourcemap: false,
    },
    plugins: plugins,
    external,
  },
  {
    input: "originLib/utils/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/utils",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, dts()],
    external,
  },
  // ******************************************************
  {
    input: "originLib/components/button/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/components/button",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, postcss({ extract: true })],
    external,
  },
  {
    input: "originLib/components/button/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/components/button",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, postcss({ extract: true }), dts()],
    external,
  },
  // ******************************************************
  {
    input: "originLib/components/input/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/components/input",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, postcss({ extract: true })],
    external,
  },
  {
    input: "originLib/components/input/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/components/input",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, postcss({ extract: true }), dts()],
    external,
  },
  // ******************************************************
  {
    input: "originLib/redux/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/redux",
      format: "es",
      sourcemap: false,
    },
    plugins: plugins,
    external,
  },
  {
    input: "originLib/redux/index.ts",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/redux",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, dts()],
    external,
  },
  // ******************************************************
  {
    input: "originLib/pages/App.tsx",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/pages",
      format: "es",
      sourcemap: false,
    },
    plugins: plugins,
    external,
  },
  {
    input: "originLib/pages/App.tsx",
    output: {
      dir: "/Users/user/AsowProject/common-client/lib/pages",
      format: "es",
      sourcemap: false,
    },
    plugins: [...plugins, dts()],
    external,
  },
];

module.exports = config;
