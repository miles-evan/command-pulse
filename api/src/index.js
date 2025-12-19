import express from "express";
import mongoose from "mongoose";
import companyRouter from "./routers/companyRouter.js";
import userRouter from "./routers/userRouter.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import shiftRouter from "./routers/shiftRouter.js";
import cors from "cors";
import payCycleRouter from "./routers/payCycleRouter.js";
import incidentReportRouter from "./routers/incidentReportRouter.js";
import announcementRouter from "./routers/announcementRouter.js";


const app = express();

console.log("I WILL NOW TRY TO CONNECT TO THE DATABASE!")
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/command-pulse";
console.log("MONGO_URL:", MONGO_URL);
await mongoose.connect(MONGO_URL);
console.log("Connected to database")


// --------------------------------


// middleware
app.use(express.json());
app.use(cors({
	origin: true,
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true
}));
app.use(session({
	secret: "command pulse gpE4J8eGjn=]a{f-ig+^FQ)RA",
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		sameSite: "lax",
		secure: false
	},
	store: MongoStore.create({
		client: mongoose.connection.getClient()
	})
}));
app.use(passport.initialize());
app.use(passport.session());
let requestCount = 0;
app.use((request, response, next) => {
	if(["/api/v1", "/api/v1/"].includes(request.originalUrl))
		return next();
	console.log(`
		Request #${++requestCount}
		${request.method} ${request.originalUrl}
		Body: ${JSON.stringify(request.body)}
		User: ${request.user?.id}
		Session: ${request.sessionID}
	`);
	next();
});


// routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/shifts", shiftRouter);
app.use("/api/v1/pay-cycles", payCycleRouter);
app.use("/api/v1/incident-reports", incidentReportRouter);
app.use("/api/v1/announcements", announcementRouter);


// ping
app.get("/api/v1/", (request, response) => {
	response.sendStatus(200);
});


// global error handler
app.use((err, request, response, _) => {
	console.error("internal server error");
	console.error("METHOD:", request.method);
	console.error("URL:", request.originalUrl);
	console.error("BODY:", request.body);
	console.error(err.stack || err);
	
	response.status(500).send("Internal Server Error");
});


// --------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));