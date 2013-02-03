// Javascript module for easy keyboard event handling
// Quim Llimona
// MTG/UPF, 2012

(function( global ) {

    var blockedKeys = ["space","left","right","up","down","enter","backspace"],
        keyCodes = {
            8: "backspace",
            9: "tab",
            13: "enter",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause",
            20: "capslock",
            27: "esc",
            32: "space",
            33: "pageup",
            34: "pagedown",
            35: "end",
            36: "home",
            37: "left",
            38: "up",
            39: "right",
            40: "down",
            45: "insert",
            46: "delete",
            48: "0", 
            49: "1", 
            50: "2", 
            51: "3", 
            52: "4", 
            53: "5", 
            54: "6", 
            55: "7", 
            56: "8", 
            57: "9",
            65: "a", 
            66: "b", 
            67: "c", 
            68: "d", 
            69: "e", 
            70: "f", 
            71: "g", 
            72: "h", 
            73: "i", 
            74: "j", 
            75: "k", 
            76: "l", 
            77: "m", 
            78: "n", 
            79: "o", 
            80: "p", 
            81: "q", 
            82: "r", 
            83: "s", 
            84: "t", 
            85: "u", 
            86: "v", 
            87: "w", 
            88: "x", 
            89: "y", 
            90: "z",
            91: "win",
            93: "select",
            96: "num0", 
            97: "num1", 
            98: "num2", 
            99: "num3", 
            100: "num4",
            101: "num5", 
            102: "num6",
            103: "num7", 
            104: "num8", 
            105: "num9",
            106: "multiply",
            107: "add",
            109: "subtract",
            110: "decimal",
            111: "divide",
            112: "f1", 
            113: "f2", 
            114: "f3", 
            115: "f4", 
            116: "f5", 
            117: "f6", 
            118: "f7", 
            119: "f8", 
            120: "f9", 
            121: "f10", 
            122: "f11", 
            123: "f12",
            144: "numlock",
            145: "scrolllock",
            186: "semicolon",
            187: "equal",
            188: "comma",
            189: "dash",
            190: "period",
            191: "slash",
            192: "graveaccent",
            219: "openbracket",
            220: "backslash",
            221: "closebracket",
            222: "singlequote"
    };
   
    var Key = function() {
        this.isPressed = false;
        this.block = false;
    };
       
    Key.prototype.bindDown = function(callback) {
        this.downCallback = callback;
    };
     
    Key.prototype.bindUp = function(callback) {
        this.upCallback = callback;
    };
    
    Key.prototype.unbind = function() {
        this.downCallback = null;
        this.upCallback = null;
    }
    
    Key.prototype.pressed = function() {
        return this.isPressed;
    }
    
    // Keyboard hash
    var Keyboard = {};
    
    for (var code in keyCodes) {
        var codeStr = keyCodes[code];
        var key = new Key();
        if (codeStr in blockedKeys)
            key.block = true;
        Keyboard[codeStr] = new Key();
    }
    
    // Module methods
    Keyboard.enable = function() {
        if (!document.hasEventListener('keydown', onKeyDown))
            document.addEventListener('keydown', onKeyDown, 1);
        if (!document.hasEventListener('keyup', onKeyDown))
            document.addEventListener('keyup', onKeyDown, 1);
    };

    Keyboard.disable = function() {
        if (document.hasEventListener('keydown', onKeyDown))
            document.removeEventListener('keydown', onKeyDown, 1);
        if (document.hasEventListener('keyup', onKeyDown))
            document.removeEventListener('keyup', onKeyDown, 1);
    };
    
    Keyboard.enabled = function() {
        var isEnabled = document.hasEventListener('keydown', onKeyDown);
        isEnabled = isEnabled || document.hasEventListener('keyup', onKeyDown);
        return isEnabled;
    };

    // Document callbacks
    function onKeyDown(evt) {
        var key = Keyboard[keyCodes[+evt.keyCode]] || new Key();
        key.isPressed = true;
        if (key.block && evt.preventDefault)
            evt.preventDefault();
        if (key.downCallback)
            key.downCallback(evt);
    }
    
    function onKeyUp(evt) {
        var key = Keyboard[keyCodes[+evt.keyCode]] || new Key(); 
        key.isPressed = false;
        if (key.upCallback)
            key.upCallback(evt);
    }
    
    // Maybe it should wait until $(document).ready....
    // Maybe it should be attached to this (objectural behavior)
    document.addEventListener('keydown', onKeyDown, 1);
    document.addEventListener('keyup',   onKeyUp, 1);
    
    // Public interface
    global.Keyboard = Keyboard;
        
})( this );