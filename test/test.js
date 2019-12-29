jsjs = require("../dist/main")
// language=JavaScript
jsjs.run("function f() {\n    for (let i = 1; i <= 9; i++) {\n        let s = \"\"\n        for (let j = 1; j <= i; j++) {\n            s += j + \" x \" + i + \" = \" + (i * j) + \"     \";\n        }\n        console.log(s)\n    }\n}\n\nf()")