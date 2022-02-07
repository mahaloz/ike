# Debugging

## Introduction 
A debugger is a tool you use to understand and run analysis on a binary. It allows you to step through instructions and view memory as it is running. Just like `gcc`, there exist a debugger called `gdb`. The `g` in all of these names stands for [GNU](https://www.gnu.org/home.en.html). 

## Debugging Programs You Wrote
When you have the source for a program, debugging it is very easy. You compile the binary we used in the last secion again with `-g` flag which makes it have symbols and be in a ready form for `gdb`.

```
gcc ex.c -o ex -g
```

Now run the binary with
```
gdb ./ex
```

You will now see a bunch of text ending in:
```
Reading symbols from ./ex...
(gdb)
```

You are in the `gdb` prompt now. To exit you can type `exit` and hit enter. For now we will stay and run a few commands. 

Since symbols exist, you can just break at any line in the source you like. Breaking is the stopping of code at a certain condition. When you set a breakpoint you tell the debugger to stop the program at a certain symbol or address. Run:

```
b main:1
r
```

We said `break at line 1 in the main function and run`. Type `l` and now you will see where you are:

```
(gdb) l
1	int main()
2	{
3	    for(int i; i < 10000; i++) {
4	        puts("hello world");
5	    }
6	}
```

Very cool. Now if we enter the command `n` (next) twice, we will be inside the loop. We can print the value of `i` at each iteration:

```
(gdb) n
3	    for(int i; i < 10000; i++) {
(gdb) n
4	        puts("hello world");
(gdb) p i
$1 = 0
```

We can even change the value of `i`:

```
(gdb) set variable i=10000
(gdb) n
hello world
3	    for(int i; i < 10000; i++) {
(gdb)
6	}
```

Now we leave the loop since we set `i`. 

This was all possible because `-g` mapped every symbol that we see in the source to a corresponding address, stack variable, and region in the programs memory. You can find more tutorials on debugging programs you wrote [here](https://cs.baylor.edu/~donahoo/tools/gdb/tutorial.html). This is often where other manuals about debugging in gdb will stop... but not use. A real systems hacker needs to know how to debug programs they did not write and don't have the source too. 

## Debugging Programs You Did Not Write
Let's beging by making this realistic. In the real world, programs are compiled with `-O2` and the no `-g`. Then to make matters worse, they run a speical command on the binary called `strip`. The `strip` command is like the opposite of `-g`. It removes symbols to make the binary smaller and a little faster. Importantly, it removes the names of functions. Lets compile a binary and strip it:

```bash
gcc ex.c -o ex_real -O2
strip ex_real
```

Now run the program in gdb and try to break at main:
```
(gdb) b main
Function "main" not defined.
```

Yeah... there is no symbols. So how the hell do we stop at the start of the program now? Normally this means we have to look at the entry point address of the binary and then break at that specific address then `s` (step) our way to main. Luckily, us hackers have come a long way and we have made upgrades to gdb to make debugging binaries easier. Instead of telling you to use vanilla gdb, lets use a slightly enhanced version you can run on most systems. 

A few gdb extensions exist, but my favorite is [GEF](https://github.com/hugsy/gef) (GDB Enhanced Features). Let's quickly install it and run this binary again.

```
bash -c "$(wget http://gef.blah.cat/sh -O -)"
``` 

Now run gdb on the the binary `ex_real` again and run the command `entry-break`:
```
gef➤  entry-break
Stopped due to shared library event (no libraries added or removed)
[*] PIC binary detected, retrieving text base address
[+] Breaking at entry-point: 0x5555555550a0
...
```

This will now make you screen have a bunch of info on it that you may recognize from the assembly section of this handbook. 
You should also be noticing by now that we can't see the source code anymore. You can't see the source if the symbols are not mapped in the binary, and we have no way or retrieving it. From now on, we will have to use two commands:
- `si`: Step Instruction, steps an instruction (steps into a call)
- `ni`: Next Instruction, to step over instructions (skips stepping into a call)

Now run:
```
si 10
```

This will step 10 instructions. You should now see something like:
```
call   QWORD PTR [rip+0x2f12]        # 0x555555557fe0
```

This call is the function `_libc_start_main`, which initializes the `main` function we know and love. It's always found in the entry of the program and it's first argument in the function address of `main`. Let's get that address and break at it.

> Recall: the first argument in System V 64 bit is `rdi`

```
gef➤  p $rdi
$1 = 0x555555555060
gef➤  b *$rdi
Breakpoint 1 at 0x555555555060
```

Now if we use continue we go to main:
```
c
```

Use `ni` until you see an instruction like
```
call   0x555555555050 <puts@plt>
```

It's the `puts` in the loop. You should also recognize the structure of this assembly as being a loop with the `cmp    ebx, 0x2710` being right after the `puts` if you hit `ni`. Yes `i` is now the register `ebx`. Debugging a binary is much harder. But it is not impossible. We will go indepth on this concept in [processes and debugging](../5_processes/gdb.md) section and with the [EmbryoGDB](https://dojo.pwn.college/challenges/gdb) challenges from pwn.college. 