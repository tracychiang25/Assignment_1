import React, { useContext } from 'react';
import { ReactTyped } from 'react-typed';
import '../index.css';
import { Button, ConfigProvider, Space } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useNavigate } from 'react-router-dom';

function Index() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleNavigate = ()=>{
    if(!token){
      navigate('/login');
    }else{
      navigate('/gifs');
    }
  }

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #ffde59, #fc5a3d);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;
    return(
    <div className='heroimage'>
      <div className="animated-text">
        A tool {' '} 
        <ReactTyped  //Display texts in typing effect
          strings={[
            "that's simple",
            "that's easy",
            "for free"
          ]}
          //Speed of the typing effects
          typeSpeed={150} 
          backSpeed={90}      
          loop
        />
      </div>
      
      <ConfigProvider
      button={{
        className: linearGradientButton,
      }}
    >
      <Space>
        <Button 
          type="primary" 
          size="large" 
          icon={<CloudUploadOutlined/>}
          onClick={handleNavigate}>
          Get started!
        </Button>
      </Space>
    </ConfigProvider>
      
    </div>);
  }
  
  
  export default Index;
  