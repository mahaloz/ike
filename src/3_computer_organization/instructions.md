# Instructions

## Introduction
So you've learned where to store numbers in assembly, [registers](./registers.md). Your next logical question would be: **how** do I store values in those registers? Good question. You store them using _instructions_. 

Instructions are _atmoic_ pieces of logic that run in order on the CPU. That sounds complicated, so let's break it down. Here is an example of something we want to do:

```c
x = 10 
```

In assembly, where `x is rax`, this translates to:

```c
mov rax, 10
```

> It's important to note that this format of x86 is in the flavor of Intel. There are two flavors: [Intel and AT&T](https://imada.sdu.dk/~kslarsen/dm546/Material/IntelnATT.htm). For all the challenge, and this handbook, we will be using Intel format. 

This instruction atomic because nothing can interupt it and it is the lowest level of logic on a computer. In a contrast we could show this operation:

```c
x = x + 10
```

The thing we are asking to do above is not atmoic. It is actually composed of 3 parts (normally):

```c
mov rbx, rax     // make a temp for x
add rbx, 10      // add 10 to that temp
mov rax, rbx     // move the temp back into x
```

You will also notice that these intstructions execute one-after-another. They are linearly executed.

## Instruction Syntax

This syntax may be confusing but most instructions follow the same format:
```
<instruction_mnemonic>  <destination>, <source>
```

So saying: `mov rax, rbx` means `move rbx to rax`. 

There are some other more subtle things in this syntax, like the use of `[<register_name>]` in instructions. 

> Recall: when we say [0x400000] this refers to the data at the address 0x400000. Review [memory](./memory.md) for a recap.

For instance:
```
mov rax, [rbx]
```

This means move the **the value at the address stored in rbx** to rax. Usually other blogs and such will refer to this process as dereferencing rbx. 


## Instruction Execution

In the [registers](./registers.md) section we talked a little about special registers. Now its time to talk about the most important of those special registers: **rip** (aslo refered to as ip).

IP in assembly land refers to the Instruction Pointer register. You can find an ip register in every architecture. This instruction is responsible for storing the address of the instruction we are supposed to be executing right now. Normally, when you have instructions that are a program they are laid out in memory. Here is how a typical memory layout full of instructions could look:

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

There are some important things to note here. First, you can dereference registers while adding or subtracting an offset to it like in `[rbp - 0x4]`. Second, the address each instruction is associated with is not singly incremental. Notice how the difference in address between some instructions is `7`, while others are only `1`. You may have guessed it, but the difference in addresses for each instruction is based on that instructions size.

Each instruction is composed of bytes that encode it. Here is the same code from above, but printed with its encoding:

```c
000000000000112d <main>:
112d:       55                      push   rbp
112e:       48 89 e5                mov    rbp,rsp
1131:       c7 45 f8 00 00 00 00    mov    [rbp-0x8], 0x0
1138:       c7 45 fc 04 00 00 00    mov    [rbp-0x4], 0x4
113f:       8b 45 fc                mov    eax, [rbp-0x4]
1142:       83 c0 05                add    eax, 0x5
1145:       89 45 f8                mov    [rbp-0x8], eax
1148:       8b 45 f8                mov    eax, [rbp-0x8]
114b:       0f af 45 fc             imul   eax, [rbp-0x4]
114f:       89 45 f8                mov    [rbp-0x8], eax
```

There is a lot of different semantics to encoding instructions, such as their type and operation, but I won't be talking about how you can encode instructions by hand in this handbook. If you are interested, check [this out](https://wiki.osdev.org/X86-64_Instruction_Encoding#Opcode).

If you are curious about how an instruction encodes into its bytes (or the other way around), use [this site](https://defuse.ca/online-x86-assembler.htm) to encode and decode x86 instructions as you like. I use it often for CTFs since its so easy to use.

Now back to our earlier discussion, the instruction pointer. Execution of instructions follows the [fetch-and-execute](https://en.wikipedia.org/wiki/Instruction_cycle) cycle:
1. Get the instruction at the address of the ip
2. Decode it
3. Execute it 
4. Add the size of the current instruction to the ip
5. Repeat 

So if in our previous example we are about to execute `mov [rbp-0x8], 0x0`, that means that `rip = 0x1131`. This also means that `[0x1131]` is the bytes of the instruction `mov [rbp-0x8], 0x0`.

The last thing to know about `rip`, and `ip` in genral, is that you are not allowed to modify this register yourself. Obviously you just having instructions in memory modifies `rip`, but you are not allowed to do things like:
```
mov rip, 0x1138
```

That is an illegal instruction.

## Common Instructions
So you know instructions can do things, but what kind of instructions exist? Here are the most common instructions you will use/see in the wild:

> Note: when you see <x | y> it means that thing could be an `x` or a `y`; `C` means a constant, like `10`; `stack` means the stack (a region of memory) and is represented by a list.

### Math Operations

| Mnemonic | Arguments                 | Description                                          | Python Equiv |   |
|----------|---------------------------|------------------------------------------------------|--------------|---|
| add      | r1, <r2 \| C>             | Adds r2 to r1.                                       | r1 += r2     |   |
| sub      | r1, <r2 \| C>             | Subtracts r2 from r1.                                | r1 -= r2     |   |
| idiv     | rax=divisor; rdx=dividend | Divides rdx by rax. Result in rax, remainder in rdx. | rdx // rax; rdx % rax   |   |
| imul     | r1, <r2 \| C>             | Multiplies r1 by r2.                                 | r1 *= r2     |   |

> Note: modulo can be accomplished with idiv and reading the value in rdx.

The math operations above can be done both in a [signed and unsigned](https://math.libretexts.org/Bookshelves/PreAlgebra/Book%3A_Fundamentals_of_Mathematics_(Burzynski_and_Ellis)/10%3A_Signed_Numbers/10.06%3A_Multiplication_and_Division_of_Signed_Numbers) way. This means that the numbers can be represented negatively or non-negatively which changes how we represent the output of the number.

> Recall: in [bits-and-logic](./bits_and_logic.md) that we can represent negative values in x86 using [Two's Complement](https://en.wikipedia.org/wiki/Two%27s_complement), which makes the upper bits of a value `1` to represent negative. This affects how instructions output values. 

### Logic Operations

| Mnemonic | Arguments     | Description                         | Python Equiv |   |
|----------|---------------|-------------------------------------|--------------|---|
| and      | r1, <r2 \| C> | Logically ANDs r1 with r2           | r1 &= r2     |   |
| or       | r1, <r2 \| C> | Logically ORs r1 with r2            | r1 \|= r2    |   |
| xor      | r1, <r2 \| C> | Logically XORs r1 with r2           | r1 ^= r2     |   |
| not      | r1            | Logically NOTs r1 and sets it to r1 | r1 = ~r1     |   |

### Storage Operations

| Mnemonic | Arguments     | Description                                 | Python Equiv     |   |
|----------|---------------|---------------------------------------------|------------------|---|
| mov      | r1, <r2 \| C> | Copies value in r2 and stores it in r1      | r1 = r2          |   |
| lea      | r1, [r2 + C]  | Stores computed address of r2+C in r1       | r1 = r2 + C      |   |
| push     | <r1 \| C>     | Places r1 on the top of the stack           | stack += [r1]    |   |
| pop      | r1            | Removes value on top of stack, places in r1 | r1 = stack.pop() |   |

You don't know what the stack is yet, but we will get to it in the [asm-memory](./asm_memory.md) section.

---

There is actually one more set of instructions we need to cover, and thats _control flow operations_, or operations that change the execution of the program (alter ip). They are so important that they get their own header.

## Control Flow Instructions

You understand how to do things linearlly, but thats boring. You don't always want to do things so linearly. You often want conditions! Something like:

```python
if(x is even):
    y = x + 1
else:
    y = x
```

In x86 you represent these types of things with conditional jumps. 

### Jump Instructions

All jump instructions start with a `j`, go figure. Normal jumps, called unconditional jumps look like this:
```
jmp 0xdeadbeef
```

Where you replace 0xdeadbeef with an address of some sort. This also works with registers, so `jmp [rax]` is a very valid thing too and introduces its own complexities. Conditional jumps start with a `j` and end with some mnemonic to signify what they are dependent on. As an example, you have _jump if less than or equal_:
```
jle 0xdeadbeef
```

`le` is dependent on something called the [flags register](https://en.wikipedia.org/wiki/FLAGS_register), which is altered based on instructions that cause comparisons and tests. The two most common comparisons are:
```
cmp r1, <r2 | C>
test r1, r2
```

`cmp` will subtract `r2` from `r1` to tell the difference. `test` will `AND` the two to tell the difference. These differences are stored in the flags registers. The most common format of their use is like so:
```
cmp rax, rdx
jle addr2
addr1:
mov rbx, 1
jmp addr3
addr2:
mov rbx, 0
addr3:
mov rax, rbx
``` 

The use of the names like `addr1` here are labels. You can place labels anywhere in assembly and use them in jump instructions later. Thse labels will be converted into relative jumps at the time the code is assembled (right before running it).

**RECAP**:
- Unconditional Jump: `jmp address`
- List of all conditional jumps: [here](http://unixwiz.net/techtips/x86-jumps.html)
- Register flags: [here](https://riptutorial.com/x86/example/6976/flags-register)
- cmp instruction: [here](https://www.aldeid.com/wiki/X86-assembly/Instructions/cmp)
- test instruction [here](https://en.wikipedia.org/wiki/TEST_(x86_instruction))


### Call Instructions

Finally, we have the last subset of instructions and that's call related instructions. They are a sub-set of control flow altering instructions and they work very much like jumps. There are two instructions:
1. [call](https://www.felixcloutier.com/x86/call)
2. [ret](https://www.felixcloutier.com/x86/ret)

Call works like this:
```
call <r1 | C>
```

So you can call an address, label (like in the jumps), or a dereferenced register (`[rax]`). When you call something it actuall does two things:
```
call addr:
1. decode instruction
2. push (rip + current_instruction_size)
3. jmp addr
```

You still don't know what the stack is, but know that its somewhere you can save stuff just like normal memory. If you push something on the stack, it is now saved on the stack until a corresponding pop. So, from this, we can extrapolate that a call instruction does a jump while saving the original next address on the stack. This save is for the corresponding instruction `ret`. The `ret` instruction takes optional args, but for now we will consider it takes nothing:
```
ret
```

The ret instruction does the following:
```
ret:
1. pop rip
```

So it directly modifies `rip` by taking whatever is on top of the stack and putting it into `rip`. So, in normal code, you can make a region of code you can reuse many times, called a _function_:
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

_start:
mov rdi, 10
call make_even
mov rdi, rax
...
```

This code above shows off the power of the `call`, `ret` combo, allowing you to return to execution after you do some action with registers and values. It also shows how to make a function, which we will cover more in [control-structures](./control_structures.md).


## Conclusion 

There are many instructions that make up the x86-64 architecture. It's actually one of the largest. You can find all instructions at the [felixcloutier site](https://www.felixcloutier.com/x86/), which I often use for references of hard-to-remember instructions. 