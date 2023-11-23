// const http = require('http');
// const port = 3000;
// const app = http.createServer();

// // Set up your index route
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });

// // Start the server
// app.listen(port, function () {
//   console.log(`Server is listening on port ${port}`);
// });

const http = require('http');
const fs = require('fs');
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Check if the requested URL is '/'
  if (req.url === '/') {
    // Read the index.html file
    fs.readFile(__dirname + '/index.html', (err, data) => {
      if (err) {
        // If there's an error reading the file, send a 500 status code
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        // Send the contents of the index.html file as the response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // If the requested URL is not '/', send a 404 status code
    res.writeHead(404);
    res.end('Page not found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});