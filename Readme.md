

Question1:

Decided to use Map instead of Array collection, since elements are accessed not by index but by key (cowId).
I didn't put any validation for cowId. If task didn't stated that cowId should be passed as parameter I would
add unique id generation as part of the GiveBirth() method.


Question2:

For second question I decided to use tree structure because it seems that this i implied in the task.
Since there is one original root element with descendants and every element can have it's own descendants.

Since we are forbidden to use syntax with build-in data structures, and syntax like "this[key] = value"
is not an option, I created a simple class/collection with limited number of elements and with a generator function
so that I can iterate over and access child elements of a tree node.

Without limitations I would use 'Array' inside 'Farm' class to represent my tree structure.
