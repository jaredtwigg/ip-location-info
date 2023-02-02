var express = require("express");
var axios = require('axios');
var cors = require("cors");

var app = express();

app.use(cors());

process.setMaxListeners(0);

app.get("/api/:ip", async (req, res) => {
  const ip = req.params.ip;

  await axios.get(`https://geolite.info/geoip/v2.1/city/` + ip, {
    auth: {
      username: "820069",
      password: "TPpXteRrxdLHQ5ir"
    }
  })
  .then(response => {
    res.json({
        ip_latitude: response.data.location.latitude,
        ip_longitude: response.data.location.longitude,
        ip_timezone: response.data.location.time_zone,
        ip_address: response.data.traits.ip_address,
        ip_error: response.data.code,
        ip_errormessage: response.data.error
    })
  })
})

app.listen(5050, () => {console.log("server started on port 5050")})