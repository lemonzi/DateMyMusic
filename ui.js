(function(global) {
    
    var debugEnabled = false;
    
    var UI = {
        
        // callbacks
        onChartSizeChange : function (n) {},
        onMinLengthChange: function (n) {},
        onMaxLengthChange: function (n) {},
        onFlushRequest : function () {},
        
        // Methods
        setResult : function (r) {
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
        
        // UI linking
        postChartSize : function(e) {
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
        },
        
        switchDebug : function() {
            if (debugEnabled) {
                debugEnabled = false;
                setHTML("chord","");
                setHTML("stats","");
            } else {
                debugEnabled = true;
            }
        }
        
    };
    
    global.UI = UI;
    
})(this);
        
        
        
        