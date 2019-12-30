// import * as interpreter from './main'
import * as interpreter from './main'

// 解释器执行 hello world

let code = `
const test = (a)=>a+1
console.log(test('hello world'))
`
interpreter.run(code)

// // 自举解释器代码
// declare const require, __dirname
// const fs = require('fs')
// const interpreter_code = fs.readFileSync('./dist/main.js', 'utf-8')
// const bootstrap = interpreter.run(interpreter_code)
// console.log(2)
// // 自举的解释器实行 hello world
// bootstrap.run(code)
