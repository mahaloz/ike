# Registers

## Introduction
Welcome to the land of x86. The first things you need to learn is where _things_ are stored when you run instructions. What's in an instruction? What's a thing? Let's start with some simple math examples. 

In math, you often have variables where you store things. Often, those things are numbers. 

```
x = 10
x = x + 4
x = x / 2 
x = x - 1
```

We can assign values, reasign values, and do general computation on them. The nice thing about math is that a variable has no size. When you think about assigning a value to `x`, you never wonder: will the value fit in x? As an example:

```
x = 18446744073709551616
```

> Note: From now on, 'x ** y' means x to the y power and 'x ^ y' means x _xored_ with y. 

In the last section, we talked about bits and hex. This value is actually `0xffffffffffffffff + 1`. The number of bits it would take to represent this number would be `65` bits `(2 ** 64) + 1`. In computer science, when we say: "what is the size of x", we are usually talking about the number of bits that value takes up. To make things easier to say in a short sentnce, we instead say the size in the number of bytes. 

> Recall: 8 bits == 1 byte

In x86, and most assembly languages, you have registers which act as variables for doing computation. In x86 (the 64 bit version), registers are 64 bits large (8 bytes). As you may be guessing, in x86 32 bit, the registers are 32 bits large. 

Each register in x86 has a name. Here are their names:
```
rax
rbx
rcx
rdx
rbp
rsp
rsi
rdi
rip
r8 
r9 
r10
r11
r12
r13
r14
r15
```

For now, we just say that any of these registers can hold a number that is up to 64 bits large. In reality, each of these registers are used for different actions in x86. Here is a good [register use reference list](https://wiki.cdot.senecacollege.ca/wiki/X86_64_Register_and_Instruction_Quick_Start) for later.

## Using Registers 

Each register can be accessed in different ways. Why must you always use all 64 bits of a register. Take this for example: say we want to set `rax` == `0xffffffffffffffff`, but we already know `rax` has `0xffffffff00000000`:

```
// we know rax = 0xffffffff00000000

eax = eax | 0xffffffff 

// now rax = 0xffffffffffffffff
```

In this example we used a logical OR instruction covered in [bits-and-logic](./bits_and_logic.md) to OR the bottom 32 bits of `rax`. The way you access the bottom 32 bits or `rax` is with `eax`. It just so happens that every register has splits like this.
Here is an illustration of all the bits and how you can access them:

```
MSB                  32        16    8   0   
+----------------------------------------+
|                   rax                  |
+--------------------+-------------------+
                     |        eax        |
                     +---------+---------+
                               |   ax    |
                               +----+----+
                               | ah | al |
                               +----+----+
```

MSB here stands for Most Significant Bit, or the high part we refered to earlier. As an example, you can access the first 8 bits of `rax` by reading from `al`. All registers have name access like this. See [this reference](https://wiki.cdot.senecacollege.ca/wiki/X86_64_Register_and_Instruction_Quick_Start) for more use cases. In most cases, you just change the first two letters to access different parts like shown above. 

## Special Registers

Some registers are special and will make more sense later. Here they are:

- rbp: the stack base pointer (bp)
- rip: the instruction pointer (ip)
- rsp: the stack pointer (sp)