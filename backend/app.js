const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const db = require("./models/queries");
const cors = require("cors");

const app = express();

const postsRouter = require("./routes/postsRouter.js");
const mainController = require("./controllers/mainController");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

const JWT_SECRET = "your_jwt_secret_key";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByName(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await db.getUserById(jwtPayload.id);
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.json(req.body);
});

app.get("/signup", mainController.getSignUp);
app.post("/signup", mainController.createUser);
app.get("/login", mainController.getSignin);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info.message });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    const role = user.role;
    const id = user.id;
    res.json({ token, role, id });
  })(req, res, next);
});

app.get("/logout", (req, res, next) => {
  // Inform the client to discard the token
  res
    .status(200)
    .json({ message: "Logged out successfully. Please discard your token." });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      message: "You have accessed a protected route!",
      user: req.user,
    });
  }
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
