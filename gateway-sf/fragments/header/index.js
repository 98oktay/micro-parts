const express = require('express');
const fs = require('fs');
const app = express();
//const React  =  require('react');
import React from 'react'
const ReactDOMServer = require('react-dom/server');

app.get("/" , (req, res)=>{

    setTimeout(()=>{

        res.send({
            type: "fragment",
            content: fs.readFileSync(__dirname + "/index.html").toString(),
        })

    },3000)

} );



module.exports = app;
