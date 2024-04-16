import { Server } from "./app/app.js";
import { PORT, URL_MONGO } from "./src/config/config.js";

const server = new Server(URL_MONGO);
server.connect(PORT);
