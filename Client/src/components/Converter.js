import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Button, message } from 'antd';
import { saveAs } from 'file-saver'
import Logout from './Logout';
import History from './History';
import Progress from './Progress';

function Converter() {
    // const [file, setFile] = useState(null);
    const [taskName, setTaskName] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const navigate = useNavigate();
    const fileInput = useRef(null);
    
    const handleUpload = async (event) => {
        const selectedFile = event.target.files[0];
        console.log('Selected file:', selectedFile); // Add this line

        // setFile(selectedFile);

        const token = localStorage.getItem('token');

        if (!token) {
            message.error('Please log in first.');
            navigate('/login');
            return;
        }

        // if (!file) {
        //     message.error('Please select a valid video file.');
        //     return;
        // }

        const formData = new FormData();
        formData.append('video', selectedFile);
        fileInput.current.value = []
        try {
            //'http://localhost:5000/upload'
            const path = (process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL + '/upload' : '/upload');
            const response = await axios.post(path, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setTaskName(response.data.taskName);
            message.success('Video uploaded successfully!');
            setDownloadLink(response.data.gifUrl);
            
        } catch (err) {
            console.error('Error:', err);
            message.error('Failed to upload video.');
        }

    }
    const downloadGif = async () => {
        try {
            const tmpList = downloadLink.split('/');
            const fileName = tmpList[tmpList.length - 1];
            const path = (process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL + '/download' : '/download');
            const response = await axios.get(`${path}/${fileName}`, {
                responseType: 'blob', // Ensure the response is treated as a file (blob)
            });

            if (response.status === 200) {
                saveAs(response.data, fileName); // Save the file using the file-saver library
                message.success('GIF downloaded successfully!');
            } else {
                message.error('Failed to download GIF.');
            }
        } catch (err) {
            console.error('Error downloading GIF:', err);
            message.error('Error downloading GIF.');
        }
    };

    return (
        <>
            <br />
            <br />
            <div className="uploadButton">
                <input type="file" ref={fileInput} accept="video/*" onChange={handleUpload} />
            </div>
            {taskName && <Progress taskName={taskName} />}

            <br />
            {downloadLink && (
            <Button type="secondary" onClick={downloadGif}>Download Gif</Button>
            )}
            <br />
            <br />
            <History />
            <br />
            <Logout />
            <br />
            <br />
        </>


    );


}

export default Converter;