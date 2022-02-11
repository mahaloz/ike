# Hacker Practice

## EmbryoASM

For `'ike` we developed a module to teach and test x86 with the intention of serving it to people who have never programmed before. The hacker practice for this chapter will involve you solving all the challenges on `EmbryoASM`, which will cover every subsection of Assembly in this chapter and test your knowledge of logic, memory, and how an architecture works. 

For now, we have `EmbryoASM` deployed on `pwn.college` as the `Assembly Refresher` module. To play the levels, first register an account on [dojo.pwn.college](https://dojo.pwn.college/register). After that, skip all other modules and go right to [ASM](https://dojo.pwn.college/challenges/asm).

## How to use pwn.college

To play a level, first click the `start` button. Next, you have two options:
1. You can play in browser by now clicking the `Workspace` tab which will open a VS code instance in your browser with an embedded terminal
2. (**Recommended**) You can `ssh` onto the box after hitting play. It will start a Docker container ready for you to connect at `dojo.pwn.college` as user `hacker`

To do option `2`, you must first upload an ssh key in the [settings](https://dojo.pwn.college/settings#key) tab of your profile. You will use this same key to ssh onto the pwn.college instance. After that you can connect like so:
```bash
ssh -i /path/to/key hacker@dojo.pwn.college
```