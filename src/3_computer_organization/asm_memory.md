# Memory

## Introduction 
You've already learned about [memory](./memory.md), how you can access it with addresses, and how programs often live in memory with other memory segments like the Heap and Stack. Surprise, surprise, the programs we can write with instructions live in memory as well. With our new knowledge of instructions, you can use this memory to store things that may be very large or of an unknown length. 

## Memory and Lists
Using instructions like `mov` you can access the data at some memory location. Say another part of the program provided you the memory address to a writeable place in memory. You could write to it like so:
```c
// rax = memory addr

mov [rax], 0x1337
```

Now, let's say we wanted to make a **list** of numbers. We say this list would be 4 numbers large and look like:
```python
my_list = [2, 4, 8, 16]
```

Assuming the memory at `my_list` label has enough space, we could set up the list like so:
```c
// my_list is a label to some free data we can write too
mov rax, my_list
mov [rax], 0x2
mov [rax+4], 0x4
mov [rax+8], 0x8
mov [rax+0xc], 0x10
```

In this example, we assumed that the number will be at a max of 4 bytes large. This is important and changes the way we could get the memory back. Say we now wanted to use the data we stored in memory. We would now need to use 4 byte versions of our registers to assure we get the right number (since its only 4 bytes, not 8):
```c
// my_list is a label to data with numbers of size 4 bytes
mov rax, my_list
mov edi, [rax]
mov esi, [rax+4]
mov edx, [rax+8]
mov ecx, [rax+0xc]
```

## Stack 
You may remember from the [memory-segments](./memory_segments.md) section that we have two special writeable locations in memory: the Stack and the Heap. For the purpose of simplicity, we don't go over how to access and use the Heap in this module since it requires using more complicated instructions. For now, we can just use writeable program memory as we would the Heap since we can consider the case where all we get is an address to a writeable location.

The Stack is very similar to normal writeable locations. It has addresses and it can be directly dereferenced like a normal address. The Stack is special though because it works like a literal stack (think stacking pancakes), and it has a dedicated register (`rsp`), to tell you where the top of the stack currently is. 

### Working with the Pancake Stack
Say your mom places 3 pancakes on your plate: pancake 1, 2, and 3. 
```
Pancake Stack:

  #######################
  |      pancake 1      |
  #######################
  ~~~~~~~~~~~~~~~~~~~~~~~
  #######################
  |      pancake 2      |
  #######################
  ~~~~~~~~~~~~~~~~~~~~~~~
  #######################
  |      pancake 3      |
  #######################
|=========================|
```

You can't just access pancake 3, that would destroy the stack (and make your mom mad). You need to access pancake 1 first, then 2, then 3. When you access the pacake on the top, we call it a `pop`. Yes you literally `pop` the pancake into your mouth. We represent that with the instruction:
```c
pop mouth
```

Which results in the new pancake stack:
```
Pancake Stack:

  #######################
  |      pancake 2      |
  #######################
  ~~~~~~~~~~~~~~~~~~~~~~~
  #######################
  |      pancake 3      |
  #######################
|=========================|
```

Now, the top of the stack is `pancake 2`. We would say the `pancake stack pointer` is pointing at the location where the second pancake is located now. It was originally pointing at the location of pancake 1, but we poped the stack. 

So you `pop mouth` another pancake:
```
Pancake Stack:

  #######################
  |      pancake 3      |
  #######################
|=========================|
```

Before you can do another pop, your mom pushes a fresh new pancake on your plate with the instruction:
```
push pancake_4
```

Now the stack looks like:
```
Pancake Stack:

  #######################
  |      pancake 4      |
  #######################
  ~~~~~~~~~~~~~~~~~~~~~~~
  #######################
  |      pancake 3      |
  #######################
|=========================|
```

Now the top of the stack points to pancake 4.

### Working with the Real Stack
Now you understand how the stack works. You can save stuff there temporarily with `push` and retrieve with `pop`. The special register `rsp` points to the top of the stack. When you do a `push` it results in `rsp -= 8`. When you `pop` it results in `rsp += 8`.

> Recall: the stack grows _down_ by making the stack address smaller as you need more space. If you need to expand 8 bytes, you would subtract 8 from the rsp. 
