import { createBrowserRouter } from "react-router-dom";
import Landing from "./landing";
import GetFormation from "./get-formation";
const ALL_ROUTES = [
	{
		path: "*",
		element: <Landing />,
	},
	{
		path: "connect",
		element: <GetFormation />, 
	},

];

export default createBrowserRouter(ALL_ROUTES);
