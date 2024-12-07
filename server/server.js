import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from "./config/repository.js";

import scenarioRoutes from "./routes/scenario.route.js";
import performanceRoutes from "./routes/costPerformance.route.js";
import selectionRoutes from "./routes/selection.route.js"
import terraformRoutes from './routes/terraform.route.js';
import aiRoutes from "./routes/aiPrompt.route.js"

import cors from "cors";

import { startWatching } from "./utils/fileWatcher.utils.js";
import { checkSubmoduleAndProcess } from './utils/subModuleProcessor.utils.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({
  origin: 'http://localhost:5173', // Frontend'in çalıştığı adres
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); //java RESTCONTROLLER -> allows us to accept JSON data in the req body

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Query:`, req.query, "- Body:", req.body);
  next();
});

app.use("/api/scenarios", scenarioRoutes)
app.use("/api/costPerformance", performanceRoutes)
app.use("/api/selection", selectionRoutes); // selection route
app.use("/api/terraform", terraformRoutes)
app.use('/api/ai', aiRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});


app.use(cors());

console.log(process.env.MONGO_URI);

checkSubmoduleAndProcess()
  .then(() => console.log("Submodule processing complete."))
  .catch((error) => console.error("Error during submodule processing:", error.message));
startWatching();

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Internal Server Error' });
});


app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT)
})
