import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import Header from "./src/js/App";
import distStatic from "../search/static";

const app = express();
global.__SERVER__ = true;
const __FRAGMENT__ = "header";

app.get("/", (req, res) => {
    const baseUrl = req.originalUrl;
    res.send({
        type: "fragment",
        content: ` <div class="${__FRAGMENT__} box" id="${__FRAGMENT__}-react">${renderToString(<Header/>)}</div>`,
        styles: [
            baseUrl + '/vendors-index.style.css',
            baseUrl + '/index.style.css']       ,
        scripts: [
            baseUrl + '/vendors-index.bundle.js',
            baseUrl + '/index.bundle.js']
    })
});
app.use(express.static(__dirname + '/dist/'));
app.use(distStatic(__FRAGMENT__));


export default app;
