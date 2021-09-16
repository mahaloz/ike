# Assembly

Following our talk on section on bits, we can now address the computer
looking section of our chapter, **Assembly**.

An assembly language, better referred to as an [ISA](https://en.wikipedia.org/wiki/Instruction_set_architecture), is the lowest level of instructions that run on a computer. These instructions, or operations on data, are predefined by the hardware you use! At the the lowest level, each instruction in a ISA is a combination of logic gates that you have already learned. Before continuing, watch this 15 minutes video on what an architecture is by Yan [here](https://www.youtube.com/watch?v=9jc0eSnrzF4).

\* \* \*

As far as ISA's go, there are two types:
- [RISC](https://en.wikipedia.org/wiki/Reduced_instruction_set_computer): Reduced Instruction Set Computer
- [CISC](https://en.wikipedia.org/wiki/Complex_instruction_set_computer): Complex Instruction Set Computer

RISC and CISC are competitors and mostly differ in the side-effects their instructions have on memory. If you are interested in this difference, then you can read what [Stanford has to say on the matter](https://cs.stanford.edu/people/eroberts/courses/soco/projects/risc/risccisc/), but its not required. For this handbook we will be only using and referring to assembly for [Intel x86_64](https://en.wikipedia.org/wiki/X86-64).

## Intel x86_64 Assembly

The assembly language we will be studying in this handbook is by no means the best assembly language to start with. Ideally, we would've started with a RISC architecture because they are easier to learn, but, the world had different ideas. 

There is an extremely high probability that you are reading this text on an Intel x86_64 machine. Dell, Lenovo, Apple; they all run x86_64. The only exception is the recent Mac M1 processor, but for the most part, the worlds computers run on the Intel ISA. With that knowledge, we though it was most practical to teach you the most common architecture.

It's time we dive into x86_64, which we will shorthand to _x86_ from now.
Continue onto the next section!