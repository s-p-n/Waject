let waject = require('waject');

// Create a waject.
let o = waject();

// log when 'foo' is set.
o.on('set', 'foo', result => {
  console.log('foo was set!');
});

// disallow 'get' access for 'foo'
o.on('get', 'foo', result => {
  console.log('Read access denied for foo.');
  result.value = undefined;
  result.cycle = false;
});

// setting foo still works
o.foo = 'secret value of foo.';

// getting foo does not work.
console.log(o.foo);
// Read access denied for foo.
// returns undefined

// set baz
o.baz = 'bam!';

// disallow 'set' for baz.
o.on('set', 'baz', result => {
  console.log('Write access to baz denied.')
  result.value = result.target.baz;
  result.cycle = false;
});

// setting baz does not work.
o.baz = "boom!";
//Blocking Baz Overwrite!

// create a getter for properties that don't "exist"
// Use this to extract the value of foo.
o.on('get', 'bar', result => {
  result.value = result.target.foo;
});

// Get a static copy of all the properties.
console.log(o['*']);
// foo is undefined
// baz is still "bam!"
// bar is not listed.


// We can use bar to get the value of foo.
console.log(o.bar); 
// 'secret value of foo.'