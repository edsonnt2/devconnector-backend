const express = require("express");
const connectDB = require("../config/db");
const routes = require("./routes");
const path = require("path");
const app = express();

// Conectando mongoDB
connectDB();
app.use(express.json({ extended: false }));
app.use(routes);

// // Servidor statico em produção
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../../web/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "..", "..", "web", "build", "index.html"));
//   });
// }
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor conectado na porta ${PORT}`));
