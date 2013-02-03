(function(global) {
    
    var UI = {
        
        // callbacks
        onChartSizeChange : function (n) {},
        onMinLengthChange: function (n) {},
        onMaxLengthChange: function (n) {},
        onFlushRequest : function () {},
        
        // Methods
        setResult : function (r) {
            setHTML("result","<h1>"+r+"</h1>");
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
        }
        
    };
    
    global.UI = UI;
    
})(this);
        
        
        
        