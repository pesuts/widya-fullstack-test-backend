"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors = require("cors");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "8080", 10);
app.use(cors());
app.use(express_1.default.json());
app.use(routes_1.default);
exports.default = app;
// export default function handler(req: any, res: any) {
//   return server.emit("request", req, res);
// }
// const server = createServer(app);
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });
