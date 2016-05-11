face++ nodejs SDK
================

1. 开始之前请配置api_key, api_secret, country

```javascript
var face = require('facemirror');
face.config({
  api_key: 'YOUR_KEY',
  api_secret: 'YOU_SECRET',
  country: 'china' // ('china' or 'us')
});

face.detection.detect('http://pic.mmfile.net/2013/08/131T954O-5.jpg', {},
    function(err, data){
    if(err) console.log(err);
    console.log(data);
    })
```
