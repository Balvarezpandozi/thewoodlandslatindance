if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { ExpressError, errorHandler } = require("./utils/ErrorHandler");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const Database = require("./services/database");

const homepageRouter = require("./routes/homepage");
const eventsRouter = require("./routes/events");
const specialClassRouter = require("./routes/specialClass");
const studentResourcesRouter = require("./routes/studentResources");
const qrCodeRouter = require("./routes/qrCode");
const adminRouter = require("./routes/admin/index");
const userRouter = require("./routes/user");
const trackRouter = require("./routes/track");

const db = new Database();
db.connect();

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  express.static(path.join(__dirname, "./public"), {
    //maxAge: "30d", // Cache for 30 days (in milliseconds or a string accepted by the ms module)
    //immutable: true, // (Optional) Indicates that the file won't change (for supported clients)
  }),
);
app.use(
  "/sitemap.xml",
  express.static(path.join(__dirname, "public", "sitemap.xml")),
);
app.use("/track", express.text({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    store: db.createMongoStore(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

//Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    User.authenticate(),
  ),
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", homepageRouter);
app.use("/salsa-bachata-event-class", eventsRouter);
app.use("/bachata-crash-course", specialClassRouter);
app.use("/studentResources", studentResourcesRouter);
app.use("/qrCode", qrCodeRouter);
app.use("/adminportal", adminRouter);
app.use("/auth", userRouter);
app.use("/track", trackRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found", 404));
});

app.use(errorHandler);

module.exports = app;
