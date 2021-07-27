#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var great_1 = require("../lib/great");
var s = great_1.great();
console.log(s);
// console.log(process.argv)
var arg = process.argv.splice(2);
console.log(arg);
