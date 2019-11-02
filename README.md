# What is a Waject?
`waject()` is a JavaScript library for managing state. 

The `waject` constructor has extensions that may be defined to add functionality to future calls to `waject`. Extensions do not affect wajects created prior to an extension definition.

## Purpose
`waject` is an extendable function that converts a target object into a proxy. The returned proxy may then be used to listen for changes on `get` or `set` occurrences. 

**Listening on `set` occurrences is useful:**
* for keeping HTML elements in sync with objects.
* for keeping server-side objects in sync with client-side objects.
* for objects which contain data that, when changed, should have side-effects on other data in the same object or outside of the object.

**Listening on `get` occurrences is useful:**
* for data that is built using an algorithm.

# Syntax
> `waject(target)`

#### Parameters
> *`Object`*__`target`__

A target object to wrap with `Proxy`. It can be any sort of object, including a native array, a function or even another proxy.

#### Return value
A newly created Proxy with all defined extensions attached.

##### Example:
```JavaScript
// Create a waject
let example = waject({
    message: "hello, world"
});

// Listen for "set" change on "message"
example.on("set", "message", result => {
    console.log(property, "changed to", result.value);
});

// Change "message", triggering a "set" occurrence
example.message = "Goodnight";
// console logs "message changed to Goodnight"

console.log(example.message); // "Goodnight"
```

#### Traps
The returned proxy has a `get` trap and a `set` trap.

Both traps follow this order of interception:
* **Extensions** are intercepted first.
* * `get` will return the extension function, bound to the waject instance.
* * `set` will return false, and log a warning:
* * * `Waject: Ignoring set to '${prop}' property, because it's an extension.`
* **`"*"`** property is intercepted second. `*` represents **all**.
* * Extensions named `*` will override this functionality.
* * `get` will return a static copy of the target object, with every `get` listener resolved.
* * `set` will do one of two things:
* * * If the value is a *compatible* object:
* * * * Assign each value of the compatible object to the target object.
* * * If the value is a non-object, or non-compatible object:
* * * * Assign each property of the target to the new value.
* Any other property.
* * `get`
* * * Default value to `target[key]`
* * * Cycle through `get` listeners bound to `key`
* * * Cycle through `get` listeners bound to all properties.
* * * Return value.
* * `set`
* * * Cycle through `set` listeners bound to `key`
* * * Cycle through `set` listeners bound to all properties.
* * * Set `target[key]` to value and return it.
# Extensions
Extensions are used to add non-enumerable, non-configurable methods bound to future waject instances.

Internally, extensions are stored in an object, `extensions`, with the `interceptProperty` as the property name, and the extension's function as the value bound to a waject instance.

**Source code:**
```JavaScript
    let extensions = {};

    for (let interceptProperty in this.constructor.extensions) {
        extensions[interceptProperty] = this.constructor.extensions[interceptProperty].bind(this);
    }
```

#### *`[[waject]]`*`.`**`on`**`(`*`String`*`group,(`*`String`*`property,)`*`Function`*`callback)`