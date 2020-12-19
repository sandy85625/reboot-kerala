
// ------- Serving the
const express = require('express')
const app = express();
const port = 8000;

app.use('/', express.static(__dirname));

app.listen(port, () => {
  console.log('Preparing the server...')
  console.log(`Application is running on port: ${port}!`)
});
