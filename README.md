<h1>Steps to run the program</h1>
<h4><b>Step 1: </b>Clone this project</h4>
<h4><b>Step 2: </b>Open terminal "npm install"</h4>
<h4><b>Step 3: </b>Add your own PORT,MONGO_URI and TOKEN_SECRET</h4>
<h4><b>Step 4: </b>Open Postman and run the request</h4>
<br>
<br>
<h4>data encryption, we have use SSL/TLS certifcate to ensure our all api request go to HTTPS secure server</h4>
<h1>steps to generate private and certificate key in openssl</h1>
<h4><b>Step 1: </b>Install OpenSSL using "brew install openssl"</h4>
<h4><b>Step2: </b>Generate a Private Key and a Self-Signed Certificate: "openssl req -nodes -new -x509 -keyout private-key.pem -out certificate.pem -days 365"</h4>
<h4><b>Step 3: </b>In server.js enter correct fike location for Private Key and a Self-Signed Certificate</h4>
<br>
<br>
<h3><b>Postman APi documentation(Updated): </b>https://documenter.getpostman.com/view/27080842/2sA3JFB4bA</h3>
