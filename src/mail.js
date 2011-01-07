require("./templatefilters");
require("./setup");
    
var Setup = require("nitro/middleware/setup").Setup,
    Path = require("nitro/middleware/path").Path,
    Errors = require("nitro/middleware/errors").Errors,
    Render = require("nitro/middleware/render").Render,
    Dispatch = require("nitro/middleware/dispatch").Dispatch;
    
var Mailrecieve = require('./root/mailrecieve').app; 

exports.mailapp = Setup(Mailrecieve);
