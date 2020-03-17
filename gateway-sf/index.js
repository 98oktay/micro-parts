const express = require('express');
const app = express();
const router = express.Router();
const Header = require("./fragments/header/bootstrap");

const gatewayInfo = {
    name: "store-front",
    version: "1.0.0"
};

router.get("/", (req, res) => res.send(gatewayInfo));
router.use("/header", Header.default);

app.use(router).listen("8082");