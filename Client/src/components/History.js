import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { saveAs } from 'file-saver'
import { Button, message } from 'antd';

function History() {
    const [history, setHistory] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            setIsLoggedIn(false);  // If no token, set login status to false
            return;
        }
        const decodedToken = jwtDecode(token);
        const username = decodedToken.username;

        const fetchHistory = async () => {
            try {
                const path = (process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL + '/history' : '/history');
                const response = await axios.get(`${path}/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setHistory(response.data);
            } catch (err) {
                console.error('Error fetching history: ', err);
            }
        };
        fetchHistory();
    }, [token]);
    if (!isLoggedIn) {
        return <Navigate to='/login' />;
    }

    const downloadGif = async (gifUrl) => {
        const tmpList = gifUrl.split('/')
        const fileName = tmpList[tmpList.length - 1];
        //http://localhost:5000/download
        const path = (process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL + '/download' : '/download');
        const resp = await axios.get(`${path}/${fileName}`, {
            responseType: 'blob',
        })

        if (resp.status === 200) {
            saveAs(await resp.data, fileName)
            message.success('Successfully downloaded!')
        } else {
            message.error('Download failed.')
        }
    }

    return (
        <>
            <h2>History</h2>
            {history.length > 0 ? (
                <ul className="history-list">
                    {history.map((item, index) => (
                        <p key={index} className="history-item">
                            <a >GIF {index + 1}</a> - Created at: {new Date(item.createdAt).toLocaleString()}
                            <Button size="small" 
                            onClick={() => downloadGif(item.gifUrl)} 
                            style={{background:'linear-gradient(135deg, #fff7ad, #ffa9f9)', border:"#ffffff"}}> 
                            Download 
                            </Button>
                        </p>
                    ))}
                </ul>
            ) : (
                <p>No history found.</p>
            )}
        </>


    );
}

export default History;