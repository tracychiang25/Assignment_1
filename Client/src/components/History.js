import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Logout from './Logout';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { saveAs } from 'file-saver'
import { message } from 'antd';

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
                const response = await axios.get(`http://localhost:5000/history/${username}`, {
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
        const resp = await axios.get(`http://localhost:5000/download/${fileName}`, {
            responseType: 'blob',
        })

        if (resp.status === 200) {
            saveAs(await resp.data, fileName)
            message.success('download success')
        } else {
            message.error('download failed')
        }
    }

    return (
        <>
            <h2>History</h2>
            {history.length > 0 ? (
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            <a onClick={() => downloadGif(item.gifUrl)}>GIF {index + 1}</a> - Created at: {new Date(item.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No history found.</p>
            )}
        </>


    );
}

export default History;