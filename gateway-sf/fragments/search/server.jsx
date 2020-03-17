import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Search from "./src/js/App";
import distStatic from "./static";

const app = express();

global.__SERVER__ = true;
const __FRAGMENT__ = "search";

app.get("/", (req, res) => {
    const baseUrl = req.originalUrl;
    res.send({
        type: "fragment",
        content: `<div class="${__FRAGMENT__} box" id="${__FRAGMENT__}-react">${renderToString(<Search/>)}</div>`,
        styles: [
            baseUrl + '/vendors-index.style.css',
            baseUrl + '/index.style.css'],
        scripts: [
            baseUrl + '/vendors-index.bundle.js',
            baseUrl + '/index.bundle.js']
    })
});

app.use(distStatic(__FRAGMENT__));

export default app;
