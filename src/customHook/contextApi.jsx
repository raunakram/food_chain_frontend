import { createContext, useContext, useEffect, useState } from "react";


export const ContextApi = createContext();


export const ContextProvider = ({ children }) => {

    const [notification, setNotification] = useState([])

    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/notifications/')

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setNotification((prev) => [...prev, data.message]);
        };

        socket.onclose = () => {
            console.error('WebSocket closed unexpectedly');
        };

        return () => {
            socket.close();
        };
    }, [])


    return (
        <ContextApi.Provider value={{ notification }}>
            {children}
        </ContextApi.Provider>
    )
}

export const useGetContext = () => {
    return useContext(ContextApi)
}

