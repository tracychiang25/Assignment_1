import axios from 'axios';
import { useState } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button, Form, message } from 'antd';
import { useNavigate } from 'react-router-dom';


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) =>{
        const { name, value } =e.target;
        if(name === 'username'){
            setUsername(value);
        }else if(name === 'password'){            
            setPassword(value);
        }   
    };

    const handleSubmit = async()=>{
        const userData ={
            username,
            password
        };
        try{
            //http://localhost:5000/users/login
            const path = (process.env.REACT_APP_APIURL ? process.env.REACT_APP_APIURL + '/users/login' : '/users/login');
            const response = await axios.post(path, userData);

            if(response.status === 200){
              const { token } = response.data;
              localStorage.setItem('token', token);
                message.success("User logged in succcessfully!");
                navigate('/gifs');
            }
        }catch(err){
            console.error("Error during login: ", err);
            message.error("Login failed. Please check your credentials and try again.");
        }
    };

    return(
      <>
      <h1>Login</h1>
      <br />
        <Form onFinish={handleSubmit}>
      <Form.Item>
        <Input 
          style={{ width: '15%', borderColor:'#5ce1e6'}} 
          name="username"
          value={username}
          onChange={handleInputChange}
          placeholder="Username"
          prefix={<UserOutlined />} 
        />
      </Form.Item>
      <Form.Item>
        <Input.Password 
        style={{ width: '15%' , borderColor:'#5ce1e6'}} 
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="Password"
          prefix={<LockOutlined />} 
        />
      </Form.Item>
      <Form.Item>
        <Button 
        type="primary" 
        htmlType="submit"
        style={{ backgroundColor: '#5ce1e6', borderColor: '#5ce1e6' }}>
          Login
        </Button>
      </Form.Item>
    </Form>
    </>
  );

}
export default Login;