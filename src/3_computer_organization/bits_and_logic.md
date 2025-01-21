# Bits & Logic

Continuing our discussion on bits, let's talk more about how we can mess with the states system we described earlier. Before that, lets clarify some notation:

## Logic

You've definitely heard the term often, but how deeply have you understood the fundamentals of it? You can find an elongated definition on Wikipedia for [Mathematical Logic](https://en.wikipedia.org/wiki/Mathematical_logic), but lets define it simply as conclusions and reasoning of truths.

---
### Notation

- ` x = y` means y is assigned to x, or, x is now what y is.
- `x == y` is a statement about equivalence "x is the same as y".

The second thing is a question of whether x is the same as y or not. As an example, say `x = 7; y = 3`. If we now say:
```
x == y
```
The answer to the question would be `False`. We could also write it as:
```
(x == y) -> False
```
This could also be said as `x == y` implies `False`. 

---

To make logic easy to write in concise ways, we define abstract things as variables. Something like:

- S: "Today it's sunny"
- R: "Toady it's rainy"

Now just having truths assigned to variables would make logic very useless, so they only become useful when we apply **operations** to them. These operations are called **logic operations**. There are 4 fundamental logic operators:

- AND
- OR
- NOT
- XOR

Let't talk about each one.

### AND

`AND` works logically like how you use it in english. Its useful for understanding the truth of two things. As an example:

```
S: "Today it's sunny"
R: "Today it's rainy"

S = True
R = False

(S AND R) -> False
```

Let's decode the above. First, we defined S and R as shorthand notation for an abstract thing like the state of the day (being rainy or sunny). Next we described the truth of the states we defined. "Today it's sunny" is True; then we said "Today it's rainy" is False. Lastly, we evaluated the truth value of:

 `(S AND R)`
 
 or the statement:
 
 `Today it is sunny AND it is rainy`, which is `False`.

 It's False because we had earlier said that it was not rainy today. In this way, you can treat `AND` like a function that takes two arguments `AND(x, y)`. The input is two truth variables (which could be true or false), and the output is `True` or `False`. Let's shorten the state `True` to T and `False` to F. With all your knowledge we can easily define all the possible outputs of `AND`, known as a [truth table](https://en.wikipedia.org/wiki/Truth_table).

| X   | Y   | X AND Y |
| ----| ----|---------|
| F   | F   | F       |
| T   | F   | F       |
| T   | T   | T       |
| F   | T   | F       |

As you can see, the output is only ever True if both X and Y are true. After all of this, it will be much easier to define the other operators.

### OR

`OR` is very similar to `AND`. It takes two truth values and outputs `True` if just one of the two are `True`. Here is the truth table:

| X   | Y   | X OR Y |
| ----| ----|--------|
| F   | F   | F      |
| T   | F   | T      |
| T   | T   | T      |
| F   | T   | T      |

### NOT

`NOT` is special because it only takes a single truth value. All `NOT` does is reverse the truth of its argument. Here is the truth value:

| X   | NOT X |
| ----|-------|
| F   | T     |
| T   | F     |

Its useful now though to say that you can compound logical operators:

| X   | Y   | X OR Y | NOT( X OR Y ) |
| ----| ----|--------|--------|
| F   | F   | F      | T      |
| T   | F   | T      | F      |
| T   | T   | T      | F      |
| F   | T   | T      | F      |

In addition to that, NOT also has a special reversing mechanic on `AND` and `OR`. For instance:

```
(NOT(X OR Y)) == (NOT(X) AND NOT(Y))
```

You can test that above by making your own truth table. Notice how you can distribute the `NOT` to each variable and the operator, which flipped it to `AND`. The same is true in the reverse. 

### XOR

`XOR` takes two truth values like the others, but is less used in normal english. Its short for `Exclusive`, which means the output is only true when the inputs differ:

| X   | Y   | X XOR Y |
| ----| ----|--------|
| F   | F   | F      |
| T   | F   | T      |
| T   | T   | F      |
| F   | T   | T      |

Notice how it is only True when things going in are different from each other? Its an interesting mechanic and will be used more later. 

Now that we have a high level understand of logic, we can now relate it 


## Bit Logic

Logic with bits work exactly the same as logic in general. `True` is `1`; `False` is `0`. 

### Notation
Here is our new notation that is generally for bit logic:
```
AND: &
OR: |
NOT: !
XOR: ^
```

All of them still work the same, but now if I want to say `x AND y` I would actually say `x & y`.

### Multi-Bit Logic Operations

Operations on variables with bits work even on the **byte** level:

```
x = 11110101    
y = 00101101

(x & y) == 00100101
```

How did the above work? If you look closely, each logic operation was applied on each individual bit it lined up with. 

Now, recall that bits can also be represented as hex! This means we can do logic operations on things that _look_ like numbers (but remember they are bits under the hood):

```
x = 0x13 (00010011) 
y = 0x32 (00110010)

(x & y) == 0x12 (00110010)
```

This entire time we have been using **bytes**, but to keep with the earlier theme, why don't we assume that we can represent things in 64bits. For conciseness, we don't write leading 0's in a hex number:

```
x = 0xcafe (64 bits)
y = 0xbabe (64 bits)

(x ^ y) == 0x0000000000007040
```

The zeros are shown in the result just to clarify once again that we are in 64bits, but all the operations we have done before still work. Remember you can always compound logic statements on other logic statements (and store them in another variable if you).

### Logic Gates

All these bit operations are actually mechanics of real-world hardware that things run on. Since electricity is like a 1 or a 0, it makes sense that these logic gates are what we first implemented in hardware.

Circuit Engineers annotate these gates like shown [here](https://en.wikipedia.org/wiki/Logic_gate#Symbols). Generally speaking, all things on computers first start with these fundamental logic gates that are implemented in hardware. 

Now that we understand how to truly utilize the power of bits and logic, we can move on to understand a computer at its lowest level. 

