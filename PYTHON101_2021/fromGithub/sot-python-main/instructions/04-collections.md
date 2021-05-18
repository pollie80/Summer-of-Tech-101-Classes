## Collections

Python exposes several built-in collection types
that can be used with a clean and easy syntax.

In this section we'll introduce these collections
as well as the comprehension syntax for
easily populating them.

## Lists

Lists are an ordered mutable collection of elements.
They can be created with the [] syntax,
passing in comma separated values.

List elements can be of any type,
but its good practice to have all elements
have the same type.

``` python
groceries = ["bread", "eggs", "milk", "marmite"] # groceries is a list of strings
```

You can get a single element out of a list
by passing its index in '[]'

*NOTE:* Indices in Python are zero indexed.

```
>>> groceries[0]
'bread'
>>> groceries[2]
'milk'
>>> groceries[4]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
```

*NOTE:* if you query a list for an element
in an index that isn't there,
the operation will fail with an `IndexError`.

You can loop through all elements of a list
using the `for x in y` syntax.

```
>>> groceries = ["bread", "eggs", "milk", "marmite"]
>>> for grocery in groceries:
...     print(grocery)
...
bread
eggs
milk
marmite
```

You can count the number of elements in a list
using the built-in `len()` function.

```
>>> len(groceries)
4
```

You can add an element to a list
by using the list type's `append()`
function

```
>>> groceries.append("cheese")
>>> print(groceries)
['bread', 'eggs', 'milk', 'marmite', 'cheese']
```

and you can add elements from another list
using the list type's `extend()` function.

```
>>> groceries.extend(["tomato sauce", "pears"])
>>> groceries
['bread', 'eggs', 'milk', 'marmite', 'cheese', 'tomato sauce', 'pears']
```

Finally, you can test that an element is in a list
using the `in` keyword.

```
>>> "milk" in groceries
True
>>> "coconuts" in groceries
False
```

## Tuples

Tuples are an ordered _immutable_ collection of elements.
They can be created with the same syntax as lists,
but using `()` instead of `[]`.

```
>>> t = (1, "hello")
>>> t
(1, 'hello')
>>> t[0]
1
```

Immutable means once you've made a tuple,
you can't modify its elements.
If you try, Python will throw a `TypeError`.

```
>>> t[2] = "goodbye"
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
```

A cool Python feature is tuple unpacking.
It means you unpack a tuple into multiple variables
by separating the variable names by a ','

```
>>> num, word = t
>>> num
1
>>> word
'hello'
```

## Sets

Sets are collections of unique elements.
They are created using the {} syntax,
but empty sets must be created using `set()`.

```
>>> bool_values = {True, False}
>>> bool_values
{False, True}
```

You can add elements to a set
using the set type's add() method,
but if the element is already present
the set will not be changed.

```
>>> bool_values.add(None)
>>> bool_values.add(True)
>>> bool_values
{False, True, None}
```

You can create a set
from another collection e.g. a list
by passing that collection into the `set()` function.
Note that any duplicate elements will be removed.

```
>>> set(groceries)
{'bread', 'cheese', 'pears', 'eggs', 'marmite', 'milk', 'tomato sauce'}
```

You can't put _any_ type of element into a set.
If you want to put something into a set,
it has to be immutable,
and it also has to implement the `__hash__()` and `__eq__()`
methods, but we'll get onto those later.

What you need to know now is,
you can put a tuple into a set
but you can't put a list into one.

```
>>> example_set = {(1,2,3)}
>>> example_set.add([4,5,6])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'list'
```

### Exercise - unique characters

Write a function that returns
the number of unique characters
in a given string.

Hint: Passing a string into `set()`
      will create a set from its characters.

The output should be something like this:
```
>>> count_unique_characters("cake")
4
>>> count_unique_characters("Hello")
4
```

## Dictionaries

Dictionaries map unique keys to values.
They are also created using the `{}` syntax
and can be queried by passing a key
into square brackets
(in a similar way to how lists are queried by index).

Dictionary keys have the same limitations that sets have.

```
>>> asil = {"name": "Asil", "employer": "Microsoft"}
>>> asil["name"]
'Asil'
```

You can also add items to a dictionary using the `[]` syntax.

```
asil["height"] = 168
>>> asil
{'name': 'Asil', 'employer': 'Microsoft', 'height': 168}
```

Its possible to nest lists into dictionaries as values.
In fact, any Python object can be a value for a dictionary.

```
>>> asil["pronouns"] = ["he", "him"]
>>> asil
{'name': 'Asil', 'employer': 'Microsoft', 'height': 168, 'pronouns': ['he', 'him']}
```

## Comprehensions

Comprehensions are a lightweight and versatile syntax
for populating collections according to certain rules.

They combine the collection syntax with the `for` and `if` keywords.

A list of all the even numbers between 0 and 20:
```
>>> [i for i in range(0, 20) if i % 2 == 0]
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

A mapping between the numbers 1 to 10 and their square roots:
```
>>> { num: math.sqrt(num) for num in range(0, 5) }
{0: 0.0, 1: 1.0, 2: 1.4142135623730951, 3: 1.7320508075688772, 4: 2.0}
```

## Next steps

Next, we'll introduce you to how to make classes
and other cool stuff
in [classes, objects and dunders](05-classes.md)
