# Dyuthi | Energy Management Console V1.0.0

Dyuthi is a Energy Management Console where it is used to represent 
the data from the Dyuthi module to the consumers directly. The integration 
of smart grids and conventional grids is possible now.

When renewable are marching towards a better future, conversion to it is
a difficult task. The grid stability is one of the main challenging area.

This software is for the management, forecast and montioring for the Smart Grid.
The stability and connection of smart grids and conventional grid which is an
important task. We use machine learning for the forecasting which uses RNN netwroks
for Time-Series prediction.

#### For Development

Clone the Github repository to your local system:
`git clone https://github.com/sandy85625/reboot-kerala.git`

Go inside to the directory:
`cd reboot-kerala`

Use Node Package Manager (npm) to unpack and install the dependecies:
`npm install`

Start the Development Server for frontend only, use the following command:
`npm test`

---
Docker build for production:
`docker build -t reboot-kerala .`


For running with the backend, Please provide MongoDB Key and 0Auth Keys at ./key.js, then:
`npm start`

If you face any issues:
please create a new key.js file at root folder and copy paste this code:
```
// ------------ Keys ------------- //

// Please provide keys for MongoDB and encryption
module.exports = {
    // for Application
    MONGO: '-',           //mongoDB connection url
    SECRET_KEY: '-',      // any secret key to encrypt

    // facebook credentials 
    // you will find more details on 
    // https://developers.facebook.com/docs/facebook-login/web

    FACEBOOK_APP_ID: '-',           // facebook App Id
    FACEBOOK_APP_SECRET: '-',       // facebook App Secret Code
    FACEBOOK_CALLBACK_URL: 'http://localhost:5429/auth/facebook/callback',

    // google credentials
    // you will find more details on 
    // https://cloud.google.com/community/tutorials/cloud-functions-oauth-gmail

    GOOGLE_CLIENT_ID: '-',          //google clint Id
    GOOGLE_CLIENT_SECRET: '-',      //google clint Secret key
    GOOGLE_CALLBACK_URL: 'http://localhost:5429/auth/google/callback'
}
``` 

Voila! Now your development server will be running at `https://127.0.0.1:8000/`


To understand more on node.js and npm, please refer: 

More on Git and Github at: 
