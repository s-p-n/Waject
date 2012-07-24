(function (waject) {
    "use strict";
    var o = waject({
        a: 1, 
        b: 2, 
        c: {
            d: 3, 
            e: 4
        }
    }, function (obj, property, val) { // this function is applied to each properties' setter.
        console.log(property
            + " change from "
            + obj[property]
            + " to: "
            + val
        );
    });
    o.c.d += o.a * o.b;
    console.log("o: " + o);
}(waject));
//console output:
//d change from 3 to: 5
//o: {
//	"a": 1,
//	"b": 2,
//	"c": {
//		"d": 5,
//		"e": 4
//	}
//}
