# Control Structures

## Introduction
Control structures are a pattern of assembly code that create some kind of more abstract flow controlling thing. As an example, the `if` statement we used earlier is a control structure. Control structures are used to make our code do interesting and complext things like make decisions in a loop, conditional do stuff, and easily make code reusable and understandable. 

The first up of these control structures is one that makes code easy to reuse: functions!

## Functions

A function is a peice of code that you can reuse more than once that can take some arguments and return some values. It's essentially just like a normal math funciton. Take for instance the classic `f` in math:
```
f(x) = y
```

In this function above, it takes `x` and outputs `y`. You may not know how it translates `x` -> `y`, but you know you get `y` from inputting `x`. You can make the same type of functions in x86 and most assembly languages. Earlier in [call-instructions](./instructions.md#call-instructions), we actually provided you with a function. Here it is again:
```c
// args in rdi, output in rax
make_even:
mov rdx, rdi
mov rax, 2 
idiv 
mov rax, rdx    
cmp rax, 0 
je make_even_done
add rdi, 1
make_even_ret:
mov rax, rdi
ret
```

A very simple function to take whatever number it is given and make it even. If you are not sure how it does that, review [instructions](./instructions.md) and how even and odd numbers work in math.

### Calling Convention

In this example, the first argument to the function (the input), is passed in rdi. The output is passed in rax. This passing of arguments and returns actually is called something. A _calling convention_. A calling convention is the way in which you pass arguments to a callable _thing_. The _thing_ in this case is functions in x86. Just like flavors of syntax, there are [many different calling conventions](https://riptutorial.com/x86/topic/3261/calling-conventions). The most widely used calling convention, and the one you are most likely to see in the wild, is the [64-bit System V](https://riptutorial.com/x86/example/11197/64-bit-system-v) calling convention. 

In System V (**the one we use here**), this is how args are passed:

| Argument | 1   | 2   | 3   | 4   | 5  | 6  | 7   | 8   | 9   | 10+... | return |
|----------|-----|-----|-----|-----|----|----|-----|-----|-----|--------|--------|
| Location | rdi | rsi | rdx | rcx | r8 | r9 | r10 | r11 | rsp | rsp+n  | rax    |
|          |     |     |     |     |    |    |     |     |     |        |        |

Arguments passed 8 are all passed on the stack. Argument 9 would be `rsp`, 10 `rsp + 8`, and so forth. System V is the calling convention we will be using for the rest of the handbook and the EmbryoASM modules we will have you do at the end of this section. The return value is always one thing and its passed in rax. 

Though we only use System V in the handbook, we felt it was worth it to mention that the 32 bit version of x86 uses [cdecl](https://riptutorial.com/x86/example/11196/32-bit-cdecl) (commonly said as "C-deck-ul). The cdecl calling convention passes all the arguments on the stack just like System V does for arguments 9 and above.  

Now back to our concrete examples. Say we have a function called `sum4` that returns the sum of four numbers. If we have some assembly code and we wanted to call that function with the values `2, 4, 8, 16`, this is how we would do it:

```c 
// some earlier code...

mov rdi, 2
mov rsi, 4
mov rdx, 8
mov rcx, 16
call sum4

// some code after...
```

Cool right? No we can easily reuse `sum4` as many times as we like. Just as a referesher, every function ends with a `ret` so that you can reliably use `call` on it as in the example above. 

### Functions and the Stack
todo

## Conditionals
todo
### if statements
todo

### else-if statements 
todo

### switch statements
todo

## Loops
todo
### while loop
todo
### do-while loop
todo
### for loop
todo

## Conclusion
todo