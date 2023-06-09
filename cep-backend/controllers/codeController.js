const fs = require('fs');
const { exec } = require('child_process');
const codeHelper = require('../helpers/codeHelper');

const compile = ( req, res, next ) => {
    console.log("Inside compile: ", req.body);
    let code = req.body.code;
    let input = req.body.input;
    let id = req.body.id;
    let lang = req.body.language;


    const sourceExt = {
        'python': '.py',
    }

    const command = {
        'python': `cd ${id} && python3 Main.py < input.txt`,
    }


    codeHelper.createDir(id);
    codeHelper.createFile(`./${id}/Main`, sourceExt[lang], code);
    codeHelper.createFile(`./${id}/input`, '.txt', input);

    exec(command[lang], (error, stdout, stderr) => {
        codeHelper.removeDir(id);
        if (stderr) {
            res.send(stderr);
            return
        }
        else
        console.log("Output: ", stdout);
            res.send(stdout);
    });
}



module.exports = {
    compile
}
