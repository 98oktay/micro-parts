const fs = require('fs');
const path = require('path');
const staticBasePath = __dirname + '/dist/';

const distStatic = (moduleName)=>(req, res) => {
    const resolvedBase = path.resolve(staticBasePath);
    const safeSuffix = path.normalize(req.url).replace(/^(\.\.[\/\\])+/, '');
    const fileLoc = path.join(resolvedBase, safeSuffix);

    fs.readFile(fileLoc, (err, data) => {
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }

        res.statusCode = 200;

        res.write(data.toString().replace(/webpackJsonp/gm, `webpackJsonp${moduleName}`));
        return res.end();
    });
};

module.exports = distStatic;
