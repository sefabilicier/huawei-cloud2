import mongoose from "mongoose";

export const connectDB = async () => {

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 failure, 0 means success
	}
};


/*
mongodb+srv://sefabilicier:<db_password>@cluster0.x0znb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sefabilicier:<db_password>@cluster0.x0znb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/