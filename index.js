import { Server } from "../backend/app/app.js";
import { PORT, URL_MONGO } from "../backend/src/config/config.js";

const server = new Server(URL_MONGO);
server.connect(PORT);
