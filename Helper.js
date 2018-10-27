var Helper = {
    randomIntervalGenerator: function(leftDelimiter, rightDelimiter){
        let size = rightDelimiter -leftDelimiter;
        return ()=>Math.random()*size+leftDelimiter;
    },
    iterateParallelArrays(func, ...args) {
        arguments = [];
        args.forEach((array)=>{
            arguments.push(array.splice(0,1));
        })
        func(arguments)
        this.iterateParallelArrays(func, ...args);
    }
}

var Logger = {
    cssLoggerGenerator :  function(cssProperty) {
        return (message)=>{
            console.log("%c" + message, cssProperty);
        }
    }
}

var logRed = Logger.cssLoggerGenerator("color:red");
var logGreen = Logger.cssLoggerGenerator("color:green");