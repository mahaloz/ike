# Compilation & Execution

## Introduction
As you know, compilation is the conversion of your high-level C code into assembly and then into machine code that the computer can understand. Lucky for you, nearly every Linux machine comes with the most popular compiler `gcc`. I did say the _most_ popular compiler though, there are actually [a few that people use](https://clang.llvm.org/). For simplicity, we will only refer to gcc as our compiler. 

Let's compile a simple program:
```
int main()
{
    for(int i; i < 10000; i++) {
        puts("hello world");
    }
}
```

> Recall: you can place text in a file using "vim filename"

```bash
$ cat ex.c
int main()
{
    for(int i; i < 10000; i++) {
        puts("hello world");
    }
}
```

Compile it by passing its name to gcc:

```
gcc ex.c
```

Now you will have a file named `a.out` in the same directory. You can execute it by running `./a.out`.

```bash
$ ./a.out
hello world
hello world
hello world 
[truncated]
hello world
```

Yay you can compile and execute now! Let's talk about common compiler flags.

## Common Compiler Flags
### Change output name
First up is `-o`:

```
gcc ex.c -o ex
```

This outputs a file named `ex`. Yes `-o` lets you choose the output file name.

### Change optimizations

Next is `-ON`, where `N` is some number between [1, 3]. The `-O` option lets you choose the optimization level of the code, which you should read more about [from arm docs](https://developer.arm.com/documentation/den0013/d/Optimizing-Code-to-Run-on-ARM-Processors/Compiler-optimizations/GCC-optimization-options). 

Let's do a quick test. Often when you need code faster, you want to use a higher level of optimization. `-O3` is considered to be dangerous since it can more easily introduce bugs into your code, so instead we use `-O2`. Lets see the difference.

```
gcc ex.c -o ex2 -O2
```

You'll notice the program takes about the same time to run as the original. This is because the code is so small and simple. If you want to see larger results, compile larger binaries like [coreutils binaries](https://github.com/coreutils/coreutils). Speaking of coreutils binaries, your system usually has coreutils compiled with `-O2`. As an example, `ls` is a coreutils binary compiled with `-O2`. 

### Change linking

We talked about speed, but what about protability? 

> Recall: in the [computer organizatio memory-segment section](../3_computer_organization/memory_segments.md) we talked about a program being mapped into memory with multiple other programs, one such program was libc. This is because when we compiled the binary it was linked. 

When compiling a binary, gcc automatically [links](https://medium.com/@dkwok94/the-linking-process-exposed-static-vs-dynamic-libraries-977e92139b5f) the binary, which means it maps code from other programs into it's process memory space when running. As an example run this commnad:

```bash
ldd ./ex
```

This will show something like:

```bash
	linux-vdso.so.1 (0x00007ffc0f3d5000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f5b46d4c000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f5b46f59000)
```

All those programs will be mapped into memory when this program runs. This makes sense, since I did not right the `puts` function shown in our code. That `puts` is from `libc` which is shown above.

So what happens if you give a friend this binary and they dont have libc on their system? Or, what if they don't have the same version? Well then they can't run your binary. Luckily, there is a way to include ALL the external code you use in one binary. This is called [static](https://kb.iu.edu/d/akqn) linking. Let's try it:

```bash
gcc ex.c -o ex_static -static
```

This binary runs just like the other binary, but now when we check it with ldd:
```bash
$ ldd
	not a dynamic executable
```

Yup it's not dynamic, so no other programs are mapped. So what is the tradeoff? Run this command to see something:
```bash
ls -lah ex*
```

You will see something like, but with your user:
```bash
-rwxrwxr-x 1 parallels parallels  17K Feb  7 10:00 ex
-rwxrwxr-x 1 parallels parallels  17K Feb  7 09:48 ex2
-rw-rw-r-- 1 parallels parallels   83 Feb  7 09:57 ex.c
-rwxrwxr-x 1 parallels parallels 852K Feb  7 09:57 ex_static
```

Notice, `ex_static` is `852K`! That is 50x bigger than `ex`, for a program so small. What if this program was already big? Well then it would be even huger. This is of course because all the code of the external programs like libc are now in this program. 

If you want, you can also prove to yourself that nothing is mapped into memory when you run the binary with the program below (read the warning below): 
```
while true; do ./ex_static fake_arg & cat /proc/"$!"/maps >> mymaps; done
```

Warning: you will need to `Ctr+C` (kill) this after 10 seconds yourself, since it is a little hard to collect the maps of a short-lived process. The output will be in the mymaps file.


### Debug options
If you compile with the `-g` flag, you include symbols in the binary. For now, just know this means it makes it both bigger, slower, but easier to debug with a debugger. We will cove this more in [debugging-c](./debugging_c.md).


### Developer options

The last thing we would like to mention is that if you see a `-f` at the beginning of an option, like `-fno-pie`, that means the binary is being compiled with a special developer option. These options often do dangerous or interesting things. Like the command above `-fno-pie` turns off an important security mechanic of the program you are compiling. It can also be used if you need to remove specific optimizations from compiling. For most people, you will not need to touch this. If you see it being used for a program you are examining, recall this paragraph about wacky things happening with `-f`.

## Makefiles
We should also mention that nearly every large source base uses something called a `Makefile`, which, when used with the `make` command compiles the binary (and can do other things). You can consider a Makefile as a series of shell commands. Let's make a simple one for compiling our binary with optimization 2 and static linking:

```Makefile
all:
    gcc ex.c -o ex_final -O2 -static
```

The file you put this in MUST be named `Makefile`. Now that you have make the Makefile, run it by running `make`. This will compile the binary `ex_final`. For more useage, see this [tutorial](https://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/).


