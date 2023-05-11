const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const bcrypt = require("bcrypt");

config();
const app = express();

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const port = process.env.PORT;
const database = process.env.DATABASE;
const mongoUser = process.env.MONGO_USER;

const User = require("./models/users");
const Transaction = require("./models/transactions");
const Account = require("./models/accounts");
const Category = require("./models/categories");
const Type = require("./models/types");

//Connection to MongoDB
mongoose
  .connect(`mongodb+srv://${mongoUser}@${dbHost}:${dbPort}/${database}`, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// Middleware to parse incoming request bodies
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const correctHash = "notyetdeterminded";
const secret = "secret";

app.post("/registration", async (req, res) => {
  try {
    console.log("went to registration endpoint");
    const { firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedInputPW = await bcrypt.hash(password, salt);
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedInputPW,
      isActive: true,
    });

    await user.save();

    res.status(200).send({ message: "User registration successful." });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Error creating User." });
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("went to login endpoint");
    const { password, email } = req.body;
    if (!password.length && !email.length) {
      return res.status(400).send("Incorrect email and/or password");
    }
    const userTryingToLogIn = await User.find({ email: email });
    const userID = userTryingToLogIn[0]._id;
    const correctHashedPW = userTryingToLogIn[0].password;
    const hasAccess = await bcrypt.compare(password, correctHashedPW);

    if (hasAccess) {
      const token = jwt.sign({ email }, secret, { expiresIn: "10days" });
      res.status(200).json({ token, userID });
    } else {
      console.log("unauthorized");
      res.statusCode(401);
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).send({ message: "Error creating User." });
  }
});

app.use("/dashboard", (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, secret);
    if (verified) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.send(401).send("Error", err);
  }
});

app.post("/dashboard", async (req, res) => {
  try {
    const { activityType } = req.body;

    if (activityType === "getUserAccountNames") {
      const { userID } = req.body;
      const userAcc = await User.find({ _id: userID }, { firstName: 1, lastName: 1 });
      return res.status(200).json({ userAcc });
    }

    if (activityType === "getAccountsAndTransactions") {
      const { userID } = req.body;
      const accounts = await Account.find({ userID: userID });
      const transactions = await Transaction.find({ userID: userID });
      // console.log(accounts, transactions);
      return res.status(200).json({ accounts, transactions });
    }

    //add a new account
    if (activityType === "addAccount") {
      const { userID, type, accountName, color, startingBalance, currentBalance, dateCreated } = req.body;

      const account = new Account({
        userID: userID,
        accountName: accountName,
        type: type,
        color: "color",
        startingBalance: startingBalance,
        currentBalance: startingBalance,
        dateCreated: dateCreated,
        isActive: true,
      });

      await account.save();

      return res.status(200).send({ message: "Account Created." });
    }

    //add a new transaction
    if (activityType === "addTransaction") {
      const { userID, type, accountName, amount, category, note, dateCreated } = req.body;
      const accountSelected = await Account.find({ accountName: accountName });
      const accountID = accountSelected[0]._id;

      const transaction = new Transaction({
        userID: userID,
        accountID: accountID,
        type: type,
        amount: amount,
        category: category,
        dateCreated: dateCreated,
        note: "note",
        isActive: true,
      });
      // console.log(transaction);

      await transaction.save();

      // updating the account running balance based on transaction type
      if (type === "Income") {
        Account.updateOne({ accountName: accountName }, { $inc: { currentBalance: amount } })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => console.log(result));
      }
      if (type === "Expense") {
        Account.updateOne({ accountName: accountName }, { $inc: { currentBalance: -amount } })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(result);
          });
      }

      return res.status(200).send({ message: "Transaction Recorded." });
    }
    return res.status(400).send({ message: "Bad Request Data" });
  } catch (err) {
    res.status(500).send({ message: "Error creating Account.", err });
  }
});

app.use("/categories", (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, secret);
    if (verified) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.send(401).send("Error", err);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error retrieving Categories Data." });
  }
});

app.use("/types", (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, secret);
    if (verified) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.send(401).send("Error", err);
  }
});

app.get("/types", async (req, res) => {
  try {
    const categories = await Type.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Categories Data." });
  }
});

app.use("/accountnames", (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, secret);
    if (verified) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.send(401).send("Error", err);
  }
});

app.post("/accountnames", async (req, res) => {
  try {
    const { accountIDs } = req.body;
    const accountNames = await Account.find({ _id: { $in: accountIDs } }, { accountName: 1 });
    res.status(200).json({ accountNames });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Data." });
  }
});

app.patch("/accounts", async (req, res) => {
  try {
    const { userID, accountID, accountName, type, startingBalance } = req.body;
  } catch (err) {
    res.status(500).send({ message: "Error Updating Account." });
  }
});

//Handling unknown routes
app.use((req, res, next) => {
  return next(new HttpError("Route not found", 404));
});

//Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  //if no header was sent
  res.status(error.code || 500).json({ message: error.message || "An error occured!" });
});

// Routes

// Start server
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
