# crypto-icons-cmc

* Updated from  https://github.com/MitchDorrestijn/coinmarketcap-icons.git 

## Key Features

* Build with Node.js
* Downloads all icons in 16x16, 32x32, 64x64 or 128x128 pixels
* Names icons based on slug, symbol or rank in .png format
* 1 second per image, so leave it running and you should also go outside running
## How To Use

By default, the script downloads all cryptocurrency icons from [CoinMarketCap](https://coinmarketcap.com/) \
in the format 64x64px with the symbol as name. However, you can give a couple extra arguments to change this behaviour, like:

```bash
# Download all icons in 128x128px with the slug as name
node index.js slug 128x128

# Download all icons in 64x64px with the slug as name
node index.js slug 64x64

# Download all icons in 32x32px with the slug as name
node index.js slug 32x32

# Download all icons in 16x16px with the slug as name
node index.js slug 16x16

# Download all icons in 128x128px with the ticker symbol as name
node index.js symbol 128x128

# Download all icons in 64x64px with the ticker symbol as name (default)
node index.js symbol 64x64

# Download all icons in 32x32px with the ticker symbol as name
node index.js symbol 32x32

# Download all icons in 16x16px with the ticker symbol as name
node index.js symbol 16x16

# Download all icons in 128x128px with the rank number as name
node index.js rank 128x128

# Download all icons in 64x64px with the rank number as name
node index.js rank 64x64

# Download all icons in 32x32px with the rank number as name
node index.js rank 32x32

# Download all icons in 16x16px with the rank number as name
node index.js rank 16x16
```

The icons will be saved in the `icons/symbol/64x64` (from cmdline arguments) directory.\
If this directory doesn't exist the script will make one.