import express,{Express, Request,Response} from "express"

const app: Express = express()
const port = 5000 // or can be process.env.PORT

//#region Imaginary ( what else can be here)

//const appModulePath = require("app-module-path");
//const cors = require("cors");

//appModulePath.addPath(`${__dirname}`);
//const path = require("path");  
//const fs = require("fs");  
//const http = require("http");  
//const { WebSocketServer, WebSocket } = require("ws");

//const wss = new WebSocketServer({ server: EXPRESS_SERVER });  
//require("dotenv").config({ path: __dirname + "/.env" });
//var Moment = require("moment");  
//var passport = require("passport");
//var session = require("express-session");
//var MySQLStore = require("express-mysql-session")(session); //pretending its mysql no more firebase 
//declare a global variable name it "socketio" equal wss (websocket)
//app.set("socketio", wss); 

//some routes
//const routerArticles = require("./Routes/articles");
//const routerConversions = require("./Routes/conversions"); 
 
/*
app.use(
	session({
		key: process.env.SESSIONSDB_NAME,
		secret: process.env.SESSIONSDB_SECRET,
		store: new MySQLStore({ // no firebase, its imaginry anyway
			host: "localhost",
			port: 3306, // or process.env.DB_PORT
			user: "solidrockpass",
			database: "SMI",
		}),
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
		},
	})
);
*/
//app.use(passport.initialize());
//app.use(passport.session());

//cors+ws
/*
app.use(
	cors({
		origin: true,
		methods: ["GET", "POST"],
		credentials: true,
	})
);
*/
//production ext if server (nodejs-project) and client (reactjs-project) will run side by side 
//app.use(express.static(path.join(__dirname, "../build")));
//allow client to send files  
/*
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"
	);
	if (req.headers.origin) {
		res.header("Access-Control-Allow-Origin", req.headers.origin);
	}
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
		return res.status(200).json({});
	}

	next();
}); 
*/
//app.use(express.json({ limit: "50mb" }));
//app.use(express.urlencoded({ limit: "50mb", extended: true }));

//#endregion


//#region Routing



//#region influencers

//this implimentation will easily turn into a mess (check region Brand for more scalable & organized solution)
import  {addInfluencer,updateInfluencer,deleteInfluencer, getAllInfluencers} from "./controllers/influencers"
app.post('/influencers', addInfluencer)
app.get('/influencers', getAllInfluencers)
app.patch('/influencers/:requestedInfluencerId', updateInfluencer)
app.delete('/influencers/:requestedInfluencerId', deleteInfluencer)

//#endregion

//#region Brand (not complete)

//const BrandRouter = require("./components/Brand");
//app.use("/api/SMI", BrandRouter);

//#endregion

app.get("/",(req:Request,res:Response)=>{
    res.status(200).send(`Welcome to the SMI nodeJS project`)
})

//#endregion


app.listen(port,()=>{
    console.log(`SMI node project is running on port ${port}`)
})