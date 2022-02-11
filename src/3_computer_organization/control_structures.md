# Control Structures

## Introduction
Control structures are patterns of assembly code that create some kind of more abstract flow controlling thing. As an example, the `if` statement we used earlier is a control structure. Control structures are used to make our code do interesting and complex things like make decisions in a loop, conditional do stuff, and easily make code reusable and understandable. 

The first up of these control structures is one that makes code easy to reuse: functions!

## Functions

A function is a piece of code that you can reuse more than once that can take some arguments and return some values. It's essentially just like a normal math function. Take for instance the classic `f` in math:
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

Cool right? Note we can easily reuse `sum4` as many times as we like. Just as a refresher, every function ends with a `ret` so that you can reliably use `call` on it as in the example above. 

### Functions and the Stack
It's important to know that functions often use stacks to save arguments right at the beginning of the function. This is called the [function prolouge](https://en.wikipedia.org/wiki/Function_prologue_and_epilogue). The reason we save things on the stack is because we might need to reuse the original argument registers:

```c
// takes 3 args
my_func:
call some_other_func 
ret
```

The way to fix this is by saving things on the stack:

```c
//takes 3 args
my_func:
push rdi
push rsi
push rdx
call some_other_func
pop rdx
pop rsi
pop rdi
ret
```

This is very easy to do with pops and pushes, but is often not exactly correct. In real function, you will see use of `rbp` as well. Here is a snippet of code we used in the [instructions](./instructions.md) section:

```c
000000000000112d <main>:
112d:       push   rbp
112e:       mov    rbp,rsp
1131:       mov    [rbp-0x8], 0x0
1138:       mov    [rbp-0x4], 0x4
113f:       mov    eax, [rbp-0x4]
1142:       add    eax, 0x5
1145:       mov    [rbp-0x8], eax
1148:       mov    eax, [rbp-0x8]
114b:       imul   eax, [rbp-0x4]
114f:       mov    [rbp-0x8], eax
```

This code is a very accurate representation of what you will see in the real world. We use the special register rbp to save the original place the stack was at the start of the function. `bp` in rbp stands for Base Pointer. It's the base pointer of the stack, or where it was before calling this function. 

To explain the above code more:
1. the current base pointer is saved (to be popped at the end by a leave; ret;)
2. the stack pointer becomes the base pointer
3. the base pointer is used as if it was the sp

This allows us to modify the sp as we like, then when the function is done, it gets fixed up. This idea will be expanded more in the EmbryoASM challenges.


## Conditionals
Conditionals run the world. Below you will find the most common structures translated into assembly, originally shown in python like code.
### if statements
High-level:
```python
if x > 0:
    y = 1
else:
    y = 0
```

ASM:
```c
// rdi = x; rax = y
cmp rdi, 0
jle else_label
mov rbx, 1
jmp end_label

else_label:
mov rbx, 0

end_label:
mov rax, rbx
```

### else-if statements 
```python
if x == 0:
    y = 1
elif x < 0:
    y = -1
else
    y = 0
```

ASM:
```c
// rdi = x; rax = y
cmp rdi, 0
je if_label
jl else_if_label
mov rbx, 0
jmp end_label

if_label:
mov rbx, 1
jmp end_label

else_if_label:
mov rbx, -1

end_label:
mov rax, rbx
```

## Loops
Loops allow you to do something many times. Like: "walk forward 18 times" actually translates to "walk forward"*18. 
Here are two types of loops you can use:

### For-loop
When you know how many times you want to iterate, like the example above, you use a for-loop:
High-Level:
```python 
for i=0...18:
    walk_forward() 
``` 

ASM:
```c
mov rcx, 0
loop_head:
cmp rcx, 18
jge loop_end
call walk_forward
jmp loop_head 
loop_end:
// any code after loop
mov rax, 0
```


### while loop
When you don't know how many times you want to iterate, or your stopping condition is something special, you use a while loop:

High-Level:
```python
x = 80
y = 0
while x != 0:
    x = x - 2
    y += 1
```

ASM:
```c
// rdi = x, rax = y
mov rdi, 80
mov rbx, 0

loop_head:
cmp rdi, 0
je loop_end
sub rdi, 2
add rbx, 1
jmp loop_head

loop_end:
mov rax, rbx
//any code after loop 
```

## Conclusion
With the general knowledge of these structures, you should be ready to start making some simple programs in x86.