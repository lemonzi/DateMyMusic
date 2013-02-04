(function(global) {
    
<<<<<<< HEAD
    var debugEnabled = false;
    
=======
>>>>>>> f68ce82b09fa833fe9fcc941a1f9cc6190f1a909
    var UI = {
        
        // callbacks
        onChartSizeChange : function (n) {},
        onMinLengthChange: function (n) {},
        onMaxLengthChange: function (n) {},
        onFlushRequest : function () {},
        
        // Methods
        setResult : function (r) {
<<<<<<< HEAD
            if (r != undefined && r != null)
                setHTML("result",r);
        },
        
        setChord : function(c) {
            if (debugEnabled)
                setHTML("chord",'<b>'+c.join('-')+'</b>');
        },
        
        setStats : function(s) {
            if (debugEnabled)
                setHTML("stats",s);
        },
        
        ready : function() {
            setHTML("result","Please start playing :)");
=======
            setHTML("result","<h1>"+r+"</h1>");
>>>>>>> f68ce82b09fa833fe9fcc941a1f9cc6190f1a909
        },
        
        // UI linking
        postChartSize : function(e) {
<<<<<<< HEAD
            UI.onChartSizeChange(e.innerHtml);
        },
        
        postMinLength: function (e) {
            UI.onMinLengthChange(e.innterHtml);
        },
        
        postMaxLength: function (e) {
            UI.onMaxLengthChange(e.innterHtml);
        },
        
        postFlush: function (e) {
            setHTML("result","Please start playing :)");
            setHTML("stats","");
            setHTML("chord","");
            UI.onFlushRequest();
        },
        
        switchDebug : function() {
            if (debugEnabled) {
                debugEnabled = false;
                setHTML("chord","");
                setHTML("stats","");
            } else {
                debugEnabled = true;
            }
=======
            onChartSizeChange(e.innerHtml);
        },
        
        postMinLength: function (e) {
            onMinLengthChange(e.innterHtml);
        },
        
        postMaxLength: function (e) {
            onMaxLengthChange(e.innterHtml);
        },
        
        postFlush: function (e) {
            onFlushRequest();
>>>>>>> f68ce82b09fa833fe9fcc941a1f9cc6190f1a909
        }
        
    };
    
    global.UI = UI;
    
})(this);
        
        
        
        