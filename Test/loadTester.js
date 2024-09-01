const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const base_url = 'http://13.210.148.164';
const file = './test.mp4';

const login = async () => {
    const user = {
        "username": "2",
        "password": "2"
    };
    const path = `${base_url}/users/login`?`${base_url}/users/login`:'/users/login';
    const response = await axios.post(path, user);
    return response.data.token;
};

const upload = async (token) => {
    try {
        console.log("File to upload:", file);

        const formData = new FormData();
        formData.append('video', fs.createReadStream(file));

        const path = `${base_url}/upload`?`${base_url}/upload`:'/upload';
        const response = await axios.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            }
        });

        return response.data.taskName;
    } catch (err) {
        console.error("Error uploading", err);
        process.exit(1);
    }
};

const progress = async (token, taskName) => {
    try {
        const path = `${base_url}/progress/${taskName}`?`${base_url}/progress/${taskName}`:`/progress/${taskName}`;
        const response = await axios.get(path, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(taskName);
        // console.log(response);
        return response.data.progress;
    } catch (err) {
        console.error('Error loading progress:', err);
        process.exit(1);
    }
};


async function loadTester() {
    try {
        console.log("Login test:");
        const token = await login();
        console.log("Token received:", token);

        for(let i = 1;;i++){
            console.log("test ",i);
            let taskName ='';
            
            taskName = await upload(token, file);
            console.log('Task name: ', taskName);

            let prog = 0;
            while(prog < 100){
                prog = await progress(token, taskName);
                console.log(`Test ${i} progress: ${prog}`);
                await new Promise(resolve => setTimeout(resolve,1000)); // Polling every second
            }
            console.log(`Test ${i} finished`);
        }
    } catch (err) {
        console.error("Error", err);
    }
}

loadTester().catch(err => {
    console.error("Error", err);
    process.exit(1);
});
