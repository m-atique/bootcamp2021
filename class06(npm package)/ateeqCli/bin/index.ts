#!/usr/bin/env node

import { great } from "../lib/great";

let s:string =great()
console.log(s)
// console.log(process.argv)
let arg :string[]= process.argv.splice(2)
console.log(arg)
