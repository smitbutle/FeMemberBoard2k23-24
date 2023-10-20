const http = require('http');

const data = JSON.stringify({
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '1234567890',
  reason: 'Some reason',
  yearOfStudy: '2023',
  isDualBooted: true,
  branch: 'Computer Science',
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/createUser',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
