const express = require('express')
const app = express()
const splitHtml = require('split-html');
const fs = require('fs');
const $ = require('cheerio')

app.use(express.static("./assets/"));

app.get("/" , (req, res)=>{
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Connection", "keep-alive");


    fs.readFile('parts/index.html', 'utf8', function(err, contents) {

        var result = findParts(contents);

        res.write(result.starter);

        resolveParts(result, res);
    });
})



async function resolveParts(result, res){

    const parts = result.parts
    const works = parts.map(part=>partResolver(part, res));
    
    await Promise.all(works).then((allres)=>{
        res.write & res.write(result.finisher);
        res.end && res.end();
    });

}


async function partResolver(part, res) {

    const $partDom = $(part);
    const filePath = `parts/${$partDom.attr("file")}`;
    const hideClass = $partDom.attr("hideclass");
    await new Promise(_ => setTimeout(_, 1000 + Math.random()* 3000));
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if(hideClass) {
            res.write && res.write(`<style>${hideClass}{display:none}</style>`);
            res.write && res.write("\n");
        }
        res.write && res.write(content);
      }
    return true;
}


function findParts(contents){

    var parts = contents.match(/<part[^>]*\/>/gim);
    if(!parts) {
        return {
            starter: contents,
            finisher: "",
            parts: []
        }
    }

    var lastPart = parts[parts.length-1];
    var starter = contents.substring(0, contents.indexOf(parts[0]));
    var finisher = contents.substring(contents.indexOf(lastPart) + lastPart.length, contents.length);

    return {
        starter,
        finisher,
        parts
    }
}


app.listen("8080");