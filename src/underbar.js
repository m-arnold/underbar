/* global _: false */
(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    if (n > array.length) {
      n = array.length;
    }
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var prop in collection) {
        if (collection.hasOwnProperty(prop)) {
          iterator(collection[prop], prop, collection);
        }
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    var result = [];
    _.each(collection, function (elem) {
      if (test(elem)) {
        result.push(elem);
      }
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var rejects = [];
    _.filter(collection, function (elem) {
      if (!test(elem)) {
        rejects.push(elem);
      }
    });
    return rejects;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (array) {
    var uniqs = [];
    for (var i = 0; i < array.length; i++) {
      if (_.indexOf(uniqs, array[i]) === -1) {
        uniqs.push(array[i]);
      }
    }
    return uniqs;
  };


  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(collection, function (elem) {
      results.push(iterator(elem));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function (collection, iterator, accumulator) {
    _.each(collection, function (elem) {
      if (accumulator !== undefined) {
        accumulator = iterator(accumulator, elem);
      } else {
        accumulator = elem;
      }
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (iterator === undefined) {
      iterator = _.identity;
    }
    return _.reduce(collection, function (passed, elem) {
      if (!passed) {
        return false;
      }
      if (!iterator(elem)) {
        return false;
      }
      return true;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined) {
      iterator = _.identity;
    }
    return !_.every(collection, function (item) {
      return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function () {
    var to = arguments[0];
    var from = Array.prototype.slice.call(arguments, 1);

    _.each(from, function (currObj) {
      _.each(currObj, function (prop, key) {
        to[key] = prop;
      });
    });

    return to;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function () {
    var to = arguments[0];
    var from = Array.prototype.slice.call(arguments, 1);

    _.each(from, function (currObj) {
      _.each(currObj, function (prop, key) {
        if (to[key] === undefined) {
          to[key] = prop;
        }
      });
    });

    return to;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    var cache = {};

    return function () {
      var arg = Array.prototype.slice.call(arguments);
      if (arg in cache) {
        return cache[arg];
      } else {
        cache[arg] = func.apply(this, arguments);
        return cache[arg];
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function () {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array) {
      return false;
    }

    // compare lengths
    if (this.length !== array.length) {
      return false;
    }

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i])) {
          return false;
        }
      } else if (this[i] !== array[i]) {
        return false;
      }
    }
    return true;
  };

  _.shuffle = function (array) {
    var copy = array.slice(0);
    var shuffled = new Array(array.length);

    for (var i = 0; i < array.length; i++) {
      var randomIndex = Math.floor(Math.random() * array.length);
      if (copy[randomIndex] !== null) {
        shuffled[i] = copy[randomIndex];
        copy[randomIndex] = null;
      } else {
        i -= 1;
      }
    }

    if (shuffled.equals(array)) {
      shuffled = _.shuffle(shuffled);
    }

    return shuffled;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {
    var results = [];
    _.map(collection, function (value) {
      if (typeof functionOrKey === 'string') {
        functionOrKey = value[functionOrKey];
      }
      results.push(functionOrKey.apply(value, args));
    });
    return results;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {
    if (typeof iterator === 'string') {
      collection.sort(function (a, b) {
        if (a[iterator] < b[iterator]) {
          return -1;
        }
        if (a[iterator] > b[iterator]) {
          return 1;
        }
        if (a[iterator] === b[iterator]) {
          return 0;
        }
      });
    } else if (iterator instanceof Function) {
      collection.sort(function (a, b) {
        if (iterator(a) < iterator(b)) {
          return -1;
        }
        if (iterator(a) > iterator(b)) {
          return 1;
        }
        if (iterator(a) === iterator(b)) {
          return 0;
        }
      });
    }
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function () {
    //get arguments in array form
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    //initialize vars
    var zipped = [];
    var longest = [];

    //get length of longest array in args
    _.each(args, function (arr) {
      if (arr.length > longest.length) {
        longest = arr;
      }
    });
    longest = longest.length;

    //iterate over each array and add it to correct subarray of zipped
    _.each(args, function (arr) {
      _.each(arr, function (value, idx) {
        if (zipped[idx] === undefined) {
          zipped[idx] = [value];
        } else {
          zipped[idx].push(value);
        }
      });
    });

    //check that all zipped subarrays are the same length as longest
    //if not, fill in with undefined
    _.each(zipped, function (subarray) {
      if (subarray.length < longest) {
        for (var i = 0; i < longest - subarray.length; i++) {
          subarray.push(undefined);
        }
      }
    });

    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result) {
    result = result || [];
    _.each(nestedArray, function (value) {
      if (Array.isArray(value)) {
        return _.flatten(value, result);
      } else {
        result.push(value);
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function () {
    //get arguments in array form
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var result = [];
    //flatten arrays to make comparison easier
    var flatArgs = _.flatten(args);

    //compare each value with every following value
    //add to results if true
    _.each(flatArgs, function (value, idx) {
      for (var i = idx + 1; i < flatArgs.length; i++) {
        if (flatArgs[i] === value) {
          result.push(value);
        }
      }
    });

    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
    //get arguments in array form
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var result = [];

    _.each(array, function (value) {
      var addVal = true;
      for (var i = 1; i < args.length; i++) {
        _.each(args[i], function (compVal) {
          if (value === compVal) {
            addVal = false;
          }
        });
      }
      if (addVal) {
        result.push(value);
      }
    });

    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
    var called = false;
    var lastCalledAt;

    return function () {
      if (!called) {
        called = true;
        lastCalledAt = Date.now();
        return func.apply(this, arguments);
      } else if (called) {
        setTimeout(function () {
          called = false;
        }, lastCalledAt + wait);
      }
    };
  };
}());
