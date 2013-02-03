// API module for querying peachnote.js

(function(global) {
    
    var Peachnote = {
        //url : "http://20.scoresy-hrd.appspot.com/rest/api/v1/ngramCounts?type=chordAffine&q=",
        url : "http://www.peachnote.com/rest/api/v1/ngramCounts?type=chordAffine&q=",
        callback : function (data) {},
        query : function (ngram) {
            console.log("Querying Ngram: "+ngram);
            $.ajax({
                  dataType: "jsonp",
                  url: Peachnote.url+ngram,
                  success: Peachnote.callback
            });
        }
    };
    
    global.Peachnote = Peachnote;
    
})(this);

/*(function(global) {
    
    var pendingRequests = [];
    
    var Peachnote = {
        url : "http://www.peachnote.com/rest/api/v0/ngramCounts?type=chordAffine&q=",
        callback : function (data) {},
        query : function (ngram) {
            console.log("Querying Ngram: "+ngram);
            var req = document.createElement('script');
            req.setAttribute('src',Peachnote.url+ngram)
            req.setAttribute('id',ngram);
            document.body.appendChild(req);
        }
    };
    
    function parseResponse(data) {
        console.log(data);
        var ngram = Object.keys(data)[0];
        document.body.removeChild(document.getElementById(ngram));
        Peachnote.callback(data);
    }

    global.Peachnote = Peachnote;
    global.parseResponse = parseResponse;
    
})(this);*/

/*(function(global) {
    
    var client = new XMLHttpRequest();
    
    var Peachnote = {
        url : "http://www.peachnote.com/rest/api/v0/ngramCounts?type=chordAffine&q=",
        callback : function (data) {},
        query : function (ngram) {
            console.log("Querying Ngram: "+ngram);
            client.open("GET",Peachnote.url+ngram,true); 
            client.send(null);
        }
    };
    
    function parseResponse(data) {
        console.log(data);
        Peachnote.callback(data);
    }

    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200){
            parseResponse(client.responseText);
        }
    };
    
    global.Peachnote = Peachnote;
    
})(this);*/