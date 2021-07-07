'use strict';

const fs = require('fs');
const https = require('https');

let iconDestination = `${__dirname}/icons/`;
const availableFormats = ['64x64', '32x32', '16x16', '128x128'];
const avaibableNames = ['symbol', 'slug', 'rank'];

let chosenFormat = availableFormats[0];
let chosenName = avaibableNames[0];

let cryptocurrencyDownloadUrls = [];
let CMCresult = '';

for (const format of availableFormats) {
  if (process.argv.includes(format)) {
    chosenFormat = format;
  }
}

for (const name of avaibableNames) {
  if (process.argv.includes(name)) {
    chosenName = name;
  }
}

iconDestination = `${iconDestination}${chosenName}/${chosenFormat}`;
console.log(iconDestination);
!fs.existsSync(iconDestination) &&
  fs.mkdirSync(iconDestination, { recursive: true }, (err) => {
    console.error(err.message);
  });

// update limit if icons more than 50k
const url =
  'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=50000&sortBy=market_cap&sortType=desc&convert=USD&cryptoType=all&tagType=all&audited=false';

https
  .get(url, (response) => {
    response.on('data', (chunk) => {
      CMCresult += chunk;
    });
    response.on('end', () => {
      CMCresult = JSON.parse(CMCresult);
      // console.log(CMCresult);
      CMCresult = CMCresult.data.cryptoCurrencyList;
      for (let i = 0; i < CMCresult.length; i++) {
        cryptocurrencyDownloadUrls.push(
          `https://s2.coinmarketcap.com/static/img/coins/${chosenFormat}/${CMCresult[i].id}.png`
        );
      }
      // extract out, check file before write a new png???
      (async function loop() {
        console.log('Started saving icons...');
        for (let i = 0; i < cryptocurrencyDownloadUrls.length; i++) {
          await new Promise((resolve, reject) => {
            https
              .get(cryptocurrencyDownloadUrls[i], (response) => {
                if (response.statusCode !== 200) {
                  let err = new Error(
                    `The file ${CMCresult[i].slug}.png couldn\'t be retrieved :(`
                  );
                  err.status = response.statusCode;
                  return reject(err);
                }
                let chunks = '';
                response.setEncoding('binary');
                response
                  .on('data', (chunk) => {
                    chunks += chunk;
                  })
                  .on('end', () => {
                    let stream;
                    if (chosenName === avaibableNames[2]) {
                      stream = fs.createWriteStream(
                        `${iconDestination}/${i + 1}.png`
                      );
                    } else {
                      stream = fs.createWriteStream(
                        `${iconDestination}/${CMCresult[i][chosenName]}.png`
                      );
                    }
                    stream.write(chunks, 'binary');
                    stream.on('finish', () => {
                      resolve(
                        `${iconDestination}/${CMCresult[i].slug}.png saved succesfully :)`
                      );
                      console.log(
                        `Saved ${CMCresult[i][chosenName]}.png in ${iconDestination}`
                      );
                    });
                    response.pipe(stream);
                  });
              })
              .on('error', (err) => {
                console.log(`Oops, an error occurred: ${err.message}`);
                reject(err.message);
              });
          });
          if (i === cryptocurrencyDownloadUrls.length - 1) {
            console.log('Done! Thank you for using.');
          }
        }
      })();
    });
  })
  .on('error', (err) => {
    console.log(`Oops, an error occurred: ${err.message}`);
  });
