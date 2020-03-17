import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';

import Header from "./src/js/App";

const app = express();
global.__SERVER__ = true;

app.get("/", (req, res) => {
    const baseUrl = req.originalUrl;
    res.send({
        type: "fragment",
        content: ` <div class="header box" id="header-react">${renderToString(<Header/>)}</div>`,
        styles: [
            baseUrl + '/vendors-index.style.css',
            baseUrl + '/index.style.css']       ,
        scripts: [
            baseUrl + '/vendors-index.bundle.js',
            baseUrl + '/index.bundle.js']
    })
});
app.use(express.static(__dirname + '/dist/'));


export default app;
