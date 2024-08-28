import axios from 'axios';
import { useState, useEffect } from 'react';
import '../index.css'; 
import {message} from 'antd';

function Progress({ taskName }) {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const path = (process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL + '/progress' : '/progress');
                const response = await axios.get(`${path}/${taskName}`);
                setProgress(response.data.progress);
                
                // Stop polling if the task is complete
                if (response.data.progress >= 100) {
                    message.success("Successfully converted!");
                    clearInterval(intervalId);
                }
            } catch (err) {
                console.error('Error fetching progress:', err);
                clearInterval(intervalId); // Stop polling on error
            }
        }, 1000); // Poll every second

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [taskName]);
   
    return (
        <div className="container">
            {progress !== null ? (
                <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                    <p>{progress}%</p>
                </div>
            ) : (
                <p>Loading progress...</p>
            )}
        </div>
    );
}

export default Progress;
