Waject
======

Monitor every move an object makes! Did a property change? Did a somebody reference this property? Did this certain method get called?

Are these questions you are asking your code? If so, Waject is for you.

Seriously though. Waject is a very simple way to monitor objects recursively in javascript. It works by applying getters and setters on every property and method in the object's emutable prototype chain, and also running the waject again on interior objects- so you can manage events on those, too. Waject is recursive and was designed for Node.JS library development. I'm sharing this with everyone because.. Well it's already on the internet but GitHub is a nice official spot for it.

PS: By nature, it's recursive so it doesn't like circulars and it's not very cheap applying methods on every get/set in a large stack- so use this sparingly. 

Use it if you dare (It's good if you don't over-do it)! There are some example files.

	waject([OBJECT], [GETTER], [SETTER]);

There are two ways to make a waject. Both ways use the 'waject' function. Here's the simplest way:

	var foo = waject();


Another option is to call waject with the first argument an object to watch on:

	var foo = {"fruit": ['apples', 'oranges', 'pears'], animals_alive: true};

	foo = waject(foo); // overwrites foo with a waject of itself. Yeeha!

You can also call the waject with setters and getters:
	foo = waject(foo, function (obj, prop, val) {
		console.log("Object:", obj);
		console.log("Property:", prop);
		console.log("Value:", val);
	});

Once you have a waject, you can use the mk() method to do stuff with the data:

	waject().mk(ObjectForm/PROPERTY, VALUE, SETTER, GETTER);

The foo.mk method will surely come in handy. 
	foo.mk("fruit", function (obj, prop) {
		console.log(prop + " touched!");
	});

	foo.fruit[2]; //fruit touched!
	// apples

alternatively,

	foo.mk({

		property: 'fruit',
		value: o.fruit,
		got: function (o, prop) {
			console.log(prop + " touched!");
		},
		preset: function (o, prop, val) {
			var old_val = o[prop];
			console.log(prop + " changed from " + old_val + " to " + val);
		}

	});



the 'mk' method takes 4 arguments. The first is the either an object representation of the arguments or the property. The second argument is the value for that propert The third value is the setter for that property, and the forth and last value is the getter for the given propery.


Getters provide 2 arguments: the object they are inside of and the property name.
Setters provide 3 arguments: the object they are inside of, the property name, and the new value. Note that you may access the current value (it hasn't been overwritten yet!) before it gets set using the previous 2 arguments.

Contact me if you have any questions.
