(function (waject) {
    "use strict";
    var o = waject();
    o.mk('foo', 'bar', function(value) {
        console.log("Foo was set!");
        
    }, function() { 
        console.log("Foo was denied accessed!");
        return false;
    });
    
    console.log(o.foo);
    //Foo was denied accessed!
    //undefined
    
    o.mk({
        property: 'baz',
        value: 'bam!',
        preset: function(value)
        {
            console.log("Blocking baz Overwrite!")
            return false; //return false to cancel set.
        }
    });
    
    o.baz = "boom!";
    //Blocking Baz Overwrite!
    console.log("o:" + o);// foo is "bar" and baz is "bam!"
    
}(waject));
