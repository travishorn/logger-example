import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pino from "pino";
import pretty from "pino-pretty";

const __dirname = dirname(fileURLToPath(import.meta.url));

const fileStream = pino.transport({
  target: "pino/file",
  options: { destination: join(__dirname, "../log.ndjson") },
});

const stdOutStream = pretty({
  colorize: true,
  translateTime: "SYS:standard",
  ignore: "pid,hostname",
});

const streams = [
  { stream: fileStream },
  { stream: stdOutStream },
];

export default pino({}, pino.multistream(streams));