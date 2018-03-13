exports.log = (function()
{
    var timestamp = function(){};
    
    timestamp.toString = function()
    {
        return "[" + (new Date).toLocaleTimeString() + "]";    
    };

    return console.log.bind(console, '%s', timestamp);
    
})();
