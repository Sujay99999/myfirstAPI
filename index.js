const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replace_placeholders = require('./modules/replace_placeholders');

const data_json = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const data_obj = JSON.parse(data_json);

const overview_html = fs.readFileSync(
  `${__dirname}/templates/overview-template.html`,
  'utf-8'
);
const product_html = fs.readFileSync(
  `${__dirname}/templates/product-template.html`,
  'utf-8'
);
const overview_card_html = fs.readFileSync(
  `${__dirname}/templates/overview-card-template.html`,
  'utf-8'
);
//hello this is just for an extra commitexit
const server = http.createServer((req, res) => {
  //routing
  //const pathName_local = req.url;
  const url_obj = url.parse(req.url, true);
  //console.log(url_obj);
  const { pathname: pathName_local, query: query_local } = url_obj;

  //overview response
  if (pathName_local === '/' || pathName_local === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    //console.log(data_obj);
    const html_obj_arr = data_obj.map((el) => {
      return replace_placeholders(el, overview_card_html);
    });
    //console.log(html_obj_arr);
    const final_html = html_obj_arr.join('');
    const final_overview_html = overview_html.replace(
      `{%PROD_CARD_TEMPLATE%}`,
      final_html
    );
    res.end(final_overview_html);
  }
  // product response
  else if (pathName_local === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    //console.log(data_obj[query_local.id]);
    const final_html = replace_placeholders(
      data_obj[query_local.id],
      product_html
    );
    res.end(final_html);
  }
  //api response
  else if (pathName_local === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data_json);
  }
  //response for other urls
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('the server now can listen to the incoming requests');
});
