Assignment 1 - Web Server - Response to Criteria
================================================

Overview
------------------------------------------------

- **Name:** Hsin-Yen Chiang
- **Student number:** n11404680
- **Application name:** Vid2Gif
- **Two line description:** This is an application that converts videos to gif files. Users can upload their videos, converted them into gif files, and then downolad them. 


Core criteria
------------------------------------------------

### Docker image

- **ECR Repository name:** 11404680_ass1
- **Video timestamp:**
- **Relevant files:**
    - /Dockerfile
    - /compose.yml
    

### Docker image running on EC2

- **EC2 instance ID:**
- **Video timestamp:**

### User login functionality

- **One line description:** Hard-coded username/password list.  Using JWTs for sessions.
- **Video timestamp:**
- **Relevant files:**
    - /API/controllers/userController.js
    

### User dependent functionality

- **One line description:**Users can upload videos and download the converted files.
- **Video timestamp:**
- **Relevant files:**
    - /API/middleware/auth.js
    - /API/routes/gifs.js
    - /API/controllers/gifController.js

### Web client

- **One line description:** Single page application using React
- **Video timestamp:**
- **Relevant files:**
    - /Client/src/App.js
    - /Client/src/components

### REST API

- **One line description:**Using REST API and HTTP methods(POST, GET) and appropriate status codes
- **Video timestamp:** 
- **Relevant files:**
    - /API/controllers/gifController.js
    - /API/controllers/userController.js

### Two kinds of data

#### First kind

- **One line description:**
- **Type:**
- **Rationale:**
- **Video timestamp:**
- **Relevant files:**
    - 

#### Second kind

- **One line description:**
- **Type:**
- **Rationale:**
- **Video timestamp:**
- **Relevant files:**
  - 

### CPU intensive task

- **One line description:**Uses ffmpeg to convert videos to gif files
- **Video timestamp:** 
- **Relevant files:**
    - /API/services/gifProcessor.js

### CPU load testing method

- **One line description:** Node script to generate many post requests
- **Video timestamp:** 
- **Relevant files:**
    - /Test/loadTester.js

Additional criteria
------------------------------------------------

### Extensive REST API features

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Use of external API(s)

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Extensive web client features

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Sophisticated data visualisations

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Additional kinds of data

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Significant custom processing

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 


### Live progress indication

- **One line description:** Web client presents the live progress of transcoding
- **Video timestamp:** 
- **Relevant files:**
    - /Client/src/components/Progress.js


### Infrastructure as code

- **One line description:** Uses Docker compose and Mongo containers
- **Video timestamp:** 
- **Relevant files:**
    - ./compose.yml


### Other

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 

