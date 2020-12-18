
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