import express from "express";
import db from "./db.js";
import passport from "passport";
import Authorization from "./auth.js";
import path from "path";
import fs from "fs";
import CryptoJS from "crypto-js";
import Bcrypt from "bcrypt";

const dirname = fs.realpathSync(".");

class MovieAppServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: false }));

    const authorization = new Authorization(app);

    app.get("/login/", this.login);
    app.post(
      "/login/",
      passport.authenticate("local", { failureRedirect: "/login/" })
    );
    app.get("/", authorization.checkAuthenticated, this.goHome);

    app.get("/register/", this.register);
    app.post("/register/", this.doRegister);

    app.get("/logout/", this.doLogout);

    app.get("/reviews/", authorization.checkAuthenticated, this.review);
    app.post("/reviews/", authorization.checkAuthenticated, this.doReview);
    app.get("/reviews-actuales", authorization.checkAuthenticated, this.getReviews)

    app.listen(3000, () => console.log("Listening on port 3000"));
  }

  async login(req, res) {
    res.sendFile(path.join(dirname, "public/login.html"));
  }

  async register(req, res) {
    res.sendFile(path.join(dirname, "public/register.html"));
  }

  async goHome(req, res) {
    res.sendFile(path.join(dirname, "public/home.html"));
  }

  async review(req, res) {
    res.sendFile(path.join(dirname, "public/reviews.html"));
  }

  async doRegister(req, res) {
    try {
      const key = "River Plate";
      const registerUsername = CryptoJS.AES.decrypt(
        req.body.username,
        key
      ).toString(CryptoJS.enc.Utf8);
      const registerPassword = CryptoJS.AES.decrypt(
        req.body.password,
        key
      ).toString(CryptoJS.enc.Utf8);
      const saltRounds = 10;
      const salt = await Bcrypt.genSalt(saltRounds);
      const hashedRegisterPassword = await Bcrypt.hash(registerPassword, salt);
      const query = { user: registerUsername };
      const update = { $set: { password: hashedRegisterPassword } };
      const params = { upsert: true };
      const collection = db.collection("users");
      await collection.updateOne(query, update, params);
      console.log("User registered successfully");
      res.redirect("/login"); 
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).send("Error during registration");
    }
  }

  async doLogout(req, res) {
    console.log("Logout exitoso");
    req.logout((err) => {
      if (err) {
        console.log("Error en logout:", err);
      }
      req.session.destroy((err) => {
        if (err) {
          console.log("Error destruyendo sesión:", err);
        } else {
          console.log("Sesión destruida");
        }
        res.clearCookie("connect.sid");
        console.log("Cookie eliminada");
        res.redirect("/login");
      });
    });
  }

  async doReview(req, res) {
    const { movieTitle, reviewText } = req.body;

    const username = req.user.user;

    if (!movieTitle || !reviewText) {
      return res.status(400).send("All fields are required");
    }

    const review = {
      movieTitle,
      reviewText,
      username,
    };

    try {
      const collection = db.collection("reviews");
      await collection.insertOne(review);
      res.status(201).send("Review submitted successfully");
    } catch (error) {
      console.error("Error saving review:", error);
      res.status(500).send("Internal server error");
    }
  }

  async getReviews(req, res) {
    const reviews = await db.collection("reviews").find({}).toArray()
    console.log(reviews)
    res.status(200).send(reviews)
  }
}

new MovieAppServer();
