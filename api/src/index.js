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


const app = express();

mongoose.connect("mongodb://localhost/command-pulse")
	.then(() => console.log("Connected to database"));

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


// routers
app.use("/command-pulse/api/v1/users", userRouter);
app.use("/command-pulse/api/v1/companies", companyRouter);
app.use("/command-pulse/api/v1/shifts", shiftRouter);
app.use("/command-pulse/api/v1/pay-cycles", payCycleRouter);


// test
app.get("/command-pulse/api/v1/", (request, response) => {
	const { body, query, params } = request;
	console.log({ body, query, params });
	response.sendStatus(200);
});


// --------------------------------

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));