import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Button, message } from 'antd';
import Logout from './Logout';
import History from './History';

function Converter() {
    const [file, setFile] = useState(null);
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
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            message.success('Video uploaded successfully!');
            setDownloadLink(response.data.gifUrl);
        } catch (err) {
            console.error('Error:', err);
            message.error('Failed to upload video.');
        }

    }
    return (
        <>
            <div className="uploadButton">
                <input type="file" ref={fileInput} accept="video/*" onChange={handleUpload} />
            </div>
            {downloadLink && (
                <a href={`http://localhost:5000${downloadLink}`} download>
                    <Button type="secondary">Download Gif</Button>
                </a>
            )}
            <History />
            <br />
            <Logout />

        </>


    );


}

export default Converter;