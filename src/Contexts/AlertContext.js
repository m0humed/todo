import { createContext, useState, useContext } from "react";
import AlertMessage from "../components/AlertMessage";


const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState();
    const [messageSt , setMessageSt] = useState();
	function showHideToast(message , messageSt) {
		setOpen(true);
		setMessage(message);
        setMessageSt(messageSt)
		setTimeout(() => {
			setOpen(false);
		}, 2000);
	}

	return (
		<ToastContext.Provider value={{ showHideToast }}>
			<AlertMessage open={open} message={message} messageSt={messageSt} />
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	return useContext(ToastContext);
};