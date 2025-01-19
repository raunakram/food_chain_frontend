import React, { useEffect, useState } from 'react';
import CardOne from '../components/Cards/CardOne';
import '../scss/dashboard.scss'
import axios from 'axios';


const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
                
    
    const token = localStorage.getItem("token")

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
            },
        })
        .then(response => {
            console.log(response.data, "dateaaa"); 
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an error!', error);
            setError(error);
            setLoading(false);
        });
    }, []);  

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='cards-section'>
            <CardOne data={data} />
            <CardOne data={data} />
            <CardOne data={data} />
        </div>
    );
};

export default Dashboard;
