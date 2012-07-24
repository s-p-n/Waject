var o = waject();
o.mk('foo', 'bar', function(value) {
	console.log("Foo was set!");
}, function() { 
	console.log("Foo was accessed!")
});

console.log(o.foo);
//Foo was accessed!
//bar

o.mk({
	property: 'baz',
	value: 'bam!',
	preset: function(value) {
		console.log("Overwriting baz!")
	}
});

o.baz = "boom!";
//Overwriting baz!
console.log("o:" + o);// foo is "bar" and baz is "boom!"  
