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
- **Video timestamp:** 0:05
- **Relevant files:**
    - /Dockerfile
    - /compose.yml
    

### Docker image running on EC2

- **EC2 instance ID:** i-0f19bb0a26b9e1272
- **Video timestamp:** 0:14

### User login functionality

- **One line description:** Hard-coded username/password list. 
- **Video timestamp:** 1:00
- **Relevant files:**
    - /API/app.js 36
    - /API/controllers/userController.js 
    - /API/routes/users.js 8
    - /API/.db.js
    

### User dependent functionality

- **One line description:** User's data will be stored in their own account.
- **Video timestamp:** 2:06
- **Relevant files:**
    - /API/controllers/gifController.js 45
    - /API/app.js 37
    - /API/routes/gifs.js 16
    - /API/middleware/auth.js

### Web client

- **One line description:** Single page application using React
- **Video timestamp:** 0:39
- **Relevant files:**
    - /Client/src/App.js
    - /Client/src/index.css
    - /Client/src/components

### REST API

- **One line description:**Using REST API and HTTP methods(POST, GET) and appropriate status codes
- **Video timestamp:** 2:30
- **Relevant files:**
    - /API/app.js
    - /API/routes/gifs.js
    - /API/routes/users.js
    - /API/controllers/gifController.js
    - /API/controllers/userController.js
    - /API/middleware/auth.js

### Two kinds of data

#### First kind

- **One line description:** User history
- **Type:** Structured
- **Rationale:** User's gif history will be saved to their username.
- **Video timestamp:** 3:11
- **Relevant files:**
    - /API/controllers/gifControllerjs 45   
    - /API/middleware/auth.js  
    - /API/db.js

#### Second kind

- **One line description:** Gif files
- **Type:** Unstructured
- **Rationale:** Gif files are too large for database. No need for additional functionality 
- **Video timestamp:** 3:18
- **Relevant files:**
    - /API/routes/gifs 12
    - /API/controllers/gifController.js 11
    - /API/services/gifProcessor
    - /API/public/gifs

### CPU intensive task

- **One line description:**Uses ffmpeg to convert videos to gif files
- **Video timestamp:** 3:33
- **Relevant files:**
    - /API/contorllers/gifController.js 11
    - /API/services/gifProcessor.js

### CPU load testing method

- **One line description:** Node script to generate many post requests
- **Video timestamp:** 3:42
- **Relevant files:**
    - /Test/loadTester.js
    - /Test/test.mp4

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

- **One line description:** Using React to build a colourful front end web page
- **Video timestamp:** 0:38
- **Relevant files:**
    - /Client/src/components


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
- **Video timestamp:** 1:30
- **Relevant files:**
    - /Client/src/components/Progress.js
    - /API/routes/gifs.js 18
    - /API/controllers/gifController.js 69


### Infrastructure as code

- **One line description:** Uses Docker compose and Mongo containers
- **Video timestamp:** 0:27
- **Relevant files:**
    - ./compose.yml
    - /API/db.js


### Other

- **One line description:** Not attempted
- **Video timestamp:**
- **Relevant files:**
    - 

