import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";
import pretty from "pino-pretty";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fileErrorStream = createWriteStream(
  join(__dirname, "../logs/error.ndjson")
);

const fileInfoStream = createWriteStream(
  join(__dirname, "../logs/info.ndjson")
);

const stdOutStream = pretty({
  colorize: true,
  translateTime: "SYS:standard",
  ignore: "pid,hostname",
});

const streams = [
  { level: "error", stream: fileErrorStream },
  { level: "info", stream: fileInfoStream },
  { stream: stdOutStream },
];

export default pino({}, pino.multistream(streams));
