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
        
        ready : function() {
            setHTML("result","Please start playing :)");
        },
        
        // UI linking
        postChartSize : function(e) {
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
        }
        
    };
    
    global.UI = UI;
    
})(this);
        
        
        
        