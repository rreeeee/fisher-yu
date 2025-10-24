import  { Fragment } from "react";
import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer, type ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ALL_ROUTES from './router'

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const DEFAULT_TOAST_OPTIONS: ToastContainerProps = {
	autoClose: 5000,
	closeButton: false,
	icon: false,
	hideProgressBar: true,
	toastClassName: "toastify__wrapper",
	//bodyClassName: "toastify__body",
	position: "bottom-right",
};

root.render(
	<Fragment>
		<ToastContainer {...DEFAULT_TOAST_OPTIONS} />
		<RouterProvider router={ALL_ROUTES} />
	</Fragment>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
