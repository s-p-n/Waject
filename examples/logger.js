let waject = require('waject');

let o = waject();

o.foo = 'bar';

// Log all sets
o.on('set', result => {
  console.log(`set:${result.key}`);
});

// Log all gets
o.on('get', result => {
  console.log(`get:${result.key}`);
});

console.log(o.foo);

o.baz = 'boom!';

console.log(o);