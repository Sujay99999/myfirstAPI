const fs = require('fs');
const http = require('http');
const url = require('url');

const data_json = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const data_obj = JSON.parse(data_json);

const server = http.createServer((req, res) => {
    //routing
    const pathName = req.url;


    if((pathName === '/')||(pathName === '/overview'))
    {
        res.end('this is the overview');
    }
    else if((pathName === '/product'))
    {
        res.end('this is the product');
    }
    else if((pathName === '/api'))
    {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data_json);
    }
    else
    {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('the server now can listen to the incoming requests')
});