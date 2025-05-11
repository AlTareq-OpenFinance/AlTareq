
import express from 'express';
import serveStatic from 'serve-static';
import path from 'path';
import { fileURLToPath } from 'url';
//initialise the express package
const app = express()
//use the serve-static package to serve the bundled app files in the dist directory
const __dirname = fileURLToPath(new URL('.', import.meta.url));
app.use('/', serveStatic(path.join(__dirname, 'dist')));
// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})
//heroku automatically assigns port so leave it to do it's
//work, don't set a port in the heroku dashboard. while the
//5000 or whatever number you set will be for your local
//machine.
const port = process.env.PORT || 5000
app.listen(port)
console.log(`app is listening on port: ${port}`)