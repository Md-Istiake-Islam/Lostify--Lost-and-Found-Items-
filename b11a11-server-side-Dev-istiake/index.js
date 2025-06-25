import express from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 5000;

// Setup middleware,
app.use(
   cors({
      origin: ["http://localhost:5173", "https://lostify-app-1c967.web.app"],
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
   const token = req?.cookies?.token;
   if (!token) {
      return res.status(401).send({ message: "unauthorize access" });
   }
   jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
      if (error) {
         return res.status(401).send({ message: "unauthorize access" });
      }
      req.decoded = decoded;
      next();
   });
};

// Setup root Api,
app.get("/", (req, res) => {
   res.send("Hello from the server!");
});

// Connect to Mongodb Client Server

// MongoDB connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rt8s4hc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions Object to set the stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});

// Connect the client to the server
const run = async () => {
   try {
      //Api for Jwt Access token
      app.post("/jwt", async (rep, res) => {
         const userData = rep.body;
         const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "5d",
         });
         const isProduction = process.env.NODE_ENV === "production";

         res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax",
         });

         res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
         });

         res.send({ success: true });
      });

      //DataBase Collections
      //Users collection
      const usersCollection = client
         .db("lostAndFoundItemsDB")
         .collection("users");

      //Slider items collection
      const sliderCollection = client
         .db("lostAndFoundItemsDB")
         .collection("sliderItems");

      //Post items collection
      const PostCollection = client
         .db("lostAndFoundItemsDB")
         .collection("PostItems");

      //recovered post items collection
      const RecoveredCollection = client
         .db("lostAndFoundItemsDB")
         .collection("RecoveredItems");

      //Api Configuration
      //post users data
      app.post("/users", async (req, res) => {
         const user = req.body;
         const result = await usersCollection.insertOne(user);
         res.send(result);
      });
      //get users data
      app.get("/users", verifyToken, async (req, res) => {
         const email = req.query.email;
         const query = { email: email };
         const result = await usersCollection.findOne(query);
         res.send(result);
      });

      //get slider data
      app.get("/sliderItems", async (req, res) => {
         const result = await sliderCollection.find().toArray();
         res.send(result);
      });

      //post PostItems data
      app.post("/postItems", verifyToken, async (req, res) => {
         const postItems = req.body;
         const result = await PostCollection.insertOne(postItems);
         res.send(result);
      });

      //get PostItems data
      app.get("/postItems", async (req, res) => {
         const result = await PostCollection.find().toArray();
         res.send(result);
      });

      //get latest post data
      app.get("/latestPost", async (req, res) => {
         const limit = Number(req.query.limit) || 0;
         const sortOption = {
            postDate: -1,
         };
         const result = await PostCollection.find({})
            .sort(sortOption)
            .limit(limit)
            .toArray();
         res.send(result);
      });

      //get PostItems by Category
      app.get("/categorizePostItem", async (req, res) => {
         const category = req.query.category;
         const query = { category: category };
         const result = await PostCollection.find(query).toArray();
         res.send(result);
      });

      //get postItem by search option
      app.get("/searchPostItem", async (req, res) => {
         const search = req.query.search?.toLocaleLowerCase();
         const query = {
            $or: [
               {
                  title: { $regex: search, $options: "i" },
               },
               {
                  location: { $regex: search, $options: "i" },
               },
            ],
         };
         const result = await PostCollection.find(query).toArray();
         res.send(result);
      });

      //get postItems By Id
      app.get("/viewDetails", verifyToken, async (req, res) => {
         const id = req.query.id;
         const query = {
            _id: new ObjectId(id),
         };
         const result = await PostCollection.findOne(query);
         res.send(result);
      });

      //get postItems By email
      app.get("/userPosts", verifyToken, async (req, res) => {
         const email = req.query.email;
         const query = { email: email };
         const result = await PostCollection.find(query).toArray();
         res.send(result);
      });

      //Update postItems By Id patch
      app.patch("/updatePost", verifyToken, async (req, res) => {
         const id = req.query.id;
         const query = { _id: new ObjectId(id) };
         const options = { upsert: true };
         const statusUpdate = req.body;
         const updateDoc = {
            $set: statusUpdate,
         };

         const result = await PostCollection.updateOne(
            query,
            updateDoc,
            options
         );
         res.send(result);
      });

      //Update user post by id put
      app.put("/updateUserPost", verifyToken, async (req, res) => {
         const id = req.query.id;
         const query = { _id: new ObjectId(id) };
         const options = { upsert: true };
         const updateData = req.body;
         const updateDoc = {
            $set: updateData,
         };

         const result = await PostCollection.updateOne(
            query,
            updateDoc,
            options
         );
         res.send(result);
      });

      //delete post data
      app.delete("/deleteItems", verifyToken, async (req, res) => {
         const id = req.query.id;
         const query = {
            _id: new ObjectId(id),
         };
         const result = await PostCollection.deleteOne(query);
         res.send(result);
      });

      //post recovered data
      app.post("/recoveredItems", verifyToken, async (req, res) => {
         const recoveredItems = req.body;
         const result = await RecoveredCollection.insertOne(recoveredItems);
         res.send(result);
      });

      //get recovered data
      app.get("/recoveredItems", verifyToken, async (req, res) => {
         const result = await RecoveredCollection.find().toArray();
         res.send(result);
      });

      //get recoveredData by Category
      app.get("/categorizeRecoveredItems", async (req, res) => {
         const category = req.query.category;
         const query = { category: category };
         const result = await RecoveredCollection.find(query).toArray();
         res.send(result);
      });

      //get recoveredData by search option
      app.get("/searchRecoveredItems", async (req, res) => {
         const search = req.query.search?.toLocaleLowerCase();
         const query = {
            $or: [
               {
                  title: { $regex: search, $options: "i" },
               },
               {
                  recoveredLocation: { $regex: search, $options: "i" },
               },
            ],
         };
         const result = await RecoveredCollection.find(query).toArray();
         res.send(result);
      });

      // Check the express server is connected successfully to the MongoDB using MongoClient with Ping command
      /* await client.db("admin").command({ ping: 1 });
      console.log(
         "Pinged your deployment. You are successfully connected to MongoDB!"
      ); */
   } finally {
   }
};
run().catch(console.dir);

// Listen to the server
app.listen(port, () => {
   console.log(`server is running on the ${port}`);
});
