import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: 'json' };

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// app.use("/users", authRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});


export default app;