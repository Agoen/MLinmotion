# VIP - Machine Learning in Motion
## Project Description
The VIP (Vertically Integrated Projects) project Machine Learning in Motion consists of the development of motion analyzing software to help dance choreographers   gather data on their rehearsals and performances, such as distance, speed, and position of the dancers. The project's goal is to provide open-source software for individuals to learn how technology may be utilized to assist artists from a variety of disciplines in using the physical world to impact the electrical and hardware realms. This data can be used in the dance making process and/or performances through the interaction of design elements such as lighting, sound, and projection. The backend implementation tested for the motion tracking of multiple figures uses Pose Net and Move Net and TensorFlow. In the Front-End, the web app flow and UI has been conceptualized and is under development. The final web app flow and UI is going to be intuitional and user-friendly so that individuals who are not familiar with technology can easily navigate throughout the application. 
## How to Setup
## Required Libraries/ Languages
* Import p5
* Import ML5 version (0.12.2)
* Javascript  
* HTML 
* CSS 

***Tested on Window and Mac***

## The Front-End
### Webapge (html and js file): 
* **Description:** The html and javascript files work together to create an interactive webpage where the user can choose what distinct joints will be selected on each pose all while displaying a video that is be taken by the camera. 

* **Input:** These files take in the camera visual and then display it. 

* **Output:** These files will output the user input of the chosen joints to the backend files, so that they can filter the data to only the chosen joints. Thus, allowing the light fixture to only display on the chosen body parts. 

* **Environments:** Works in Windows and Linux  

## The Back-End
### Function setup(): 

* **Description:** The function sets up the canvas to access the webcam, then access the Pose net function from the library ml5 to operate the Pose net model 

* **Input:** This function takes no input 

* **Output:** This function will operate the Pose net model, which will detect of object that consists of the pose, skeleton, key points of joints, confidence key point and the coordinate in x and y of each key point 

### Function gotPoses(): 

* **Description:** The function accesses the pose and skeleton of an object and gain the pose and skeleton key point into the variable  

* **Input:** This function takes object/ person 

* **Output:** This function gives out the pose and skeleton part of a person 

### Function modelLoaded(): 

* **Description:** The purpose of this function is indicating whether the model is ready to load 

* **Input:** This function takes no input 

* **Output:** This function indicates either the model is ready or not 

### Function draw(): 

* **Description:** The function will access the pose and skeleton of an object to label the joint of an object and connect joints together with the skeleton. The function also estimates the distance between camera and the object with the coordinates x and y of the key points 

* **Input:** The function will access the pose, object label, and skeleton of an object 

* **Output:** The function will label the joint and draw lines that connect each joints of an object and will estimate the distance between camera and the object. Also, draws the box around only on object labeled as person.  

### Function tracker(): *(still in progress of implementation)* 

* **Description:** I need to update the object coordinates in every frame to keep track of the same object label for each object. The previous frame is a reference frame, which is compared to the current frame to find the Euclidean distance. 

* **Input:** object’s [x, y, w, h, unique_id] 

* **Output:** Stable object labeling on each person throughout the video 
