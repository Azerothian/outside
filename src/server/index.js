import express from "express";
import path from "path";
import sourceMapSupport from "source-map-support";

import logger from "utils/logger";

import config from "config";

const log = logger("inb::server:index:");
sourceMapSupport.install();

const app = express();
app.use(express.static(path.resolve(__dirname, "../public/")));
app.listen(config.express.port, () => {
  log.info(`server listening on port ${config.express.port}`);
});
