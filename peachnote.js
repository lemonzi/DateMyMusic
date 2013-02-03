// API module for querying peachnote.js

(function(global) {
    
    var url = "http://www.peachnote.com/api/...";
    var client = new XMLHttpRequest();

    client.onreadystatechange = function() {
        if (client.readyState == 4){
            parseResponse(client.responseText);
        }
    };
            
    //client.open("GET", url, true);
    //client.send(null); 
    
    function parseResponse(text) {
        var data = JSON.parse(text);
        Peachnote.callback(data);
    }
    
})(this);