import React, { useContext } from 'react';
import { ContextApi, useGetContext } from '../customHook/contextApi';

const NotificationComponent = () => {
    // const { notification } = useGetContext()

    const { notification } = useContext(ContextApi)

    return (
        <div>
            <h2>Live Notifications</h2>
            <ul>
                {notification.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
