# Addressing

In the last section about [programs in memory](./programs_in_mem.md) we talked about loading Minecraft into memory (RAM). It was briefly mentioned that:
> When you click buttons in the Minecraft game, it simply transitions to different locations in memory where those button's code exists.

The way it transitions to different locations in memory is through addressing. Like real life, addressing helps us find the places things live, in-memory for this case. In real life, someone would give you a unique string, their address, where you could find them in real life. Something like `411 North Central Ave, Phoenix, AZ`. In memory, we follow these same rules, but to a more simplified manner. 

## Linear Addresses

The simplified manner is that memory has a very specific set of rules:
1. Each address is unique
2. Each address is a number

The number starts at zero and continues to whatever the `bit` count of the computer is. This fact should now help you realize what it means to have a `64bit` computer vs a `32bit` computer. In the old days, everything was `32bit`, but now everything is `64bit`. If you find some old applications, you may notice the option to download either—since programs made in 32bit are cross-compatible for 64bit. 

Anyway, we will assume you are on a 64bit computer. That means the starting address, or the smallest address, is `0x0000000000000000` and the largest address is `0xFFFFFFFFFFFFFFFF`. You will notice this is an 8 byte range (also 64bit). Here is how you can visualize the memory in your computer:


```
*----*----*----*----* 0x0000000000000000
|                   |
|-------------------|
|                   |
|-------------------|
|                   |
|-------------------|
|                   |
|         .         |
|         .         |
|         .         | 
|                   |
|-------------------| 
|                   |
*----*----*----*----* 0xFFFFFFFFFFFFFFFF
```

At each address is exactly 1 byte of data. 
However, to make make things more concise, we often like to talk about address in terms of **8 bytes** (4 on 32bit machines).
As such, we usually say each address points to an 8-byte slot of data (the 8 bytes following that exact address).
This means one referenced address could store 2**(64) combinations of things.

## Reading & Writing Data

To simplify things, lets define two functions:
```python
read(address) -> outputs 8 bytes of data
write(address, content) -> writes 8 bytes of data to address
execute(data) -> executes the 8 bytes it's given
```

You can consider that when Minecraft launches the OS know where the beginning and end of Minecraft is. It records it with **labels**:
```
minecraft_start = 0x0000000040000000
minecraft_end = 0x0000000050000000
```

Minecraft will of course take up a large portion of space:

```
*----*----*----*----* 0x0000000000000000
|                   |
|                   |
|                   |
|-------------------| 0x0000000040000000
|                   |
|                   |
|     MINECRAFT     |
|                   |
|                   |
|-------------------| 0x0000000050000000
|                   |
*----*----*----*----* 0xFFFFFFFFFFFFFFFF
```

Notice that Minecraft neither starts at the beginning nor at the end of memory. Any program can be loaded at any random place in memory. In addition, other magical things happen to actually allow you to break up a program into multiple places, called [Virtual Addressing](https://whatis.techtarget.com/definition/virtual-address). For now, consider things to be linear and continuous.

The OS does not know the exact location of the Minecraft Quit Button code. Instead, it only knows an **offset** from `minecraft_start`. Something like:
```
mc_quit_btn_offset = 0x80
```

Note: assume there are the correct amount of 0's on the other side of values when they are small like `0x80`. This is all still 64bits

Now to run the Minecraft Quit Button, the OS simply reads the offset, then executes it. 
```python
code = read(minecraft_start + mc_quit_btn_offset)
execute(code)
```

```
*----*----*----*----* 0x0000000000000000
|                   |
|                   |
|                   |
|-------------------| 0x0000000040000000
|                   | <--------- mc_quit_btn_offset
|                   |
|     MINECRAFT     |
|                   | 
|                   |
|-------------------| 0x0000000050000000
|                   |
*----*----*----*----* 0xFFFFFFFFFFFFFFFF
```

Other things happen, but for now understand that each thing is accessed as an offset. The same goes for writing over the contents of the map:
```python
write(minecraft_start + mc_map_offset)
```

## Summary

Things are laid-out in memory in a linear format. Each location in memory can be addressed by an address (usually referred to in hex). At each address you can store data and read data. All-in-all, we have a large place that we can read and write too using numbers as our address. We usually refer to locations as offsets of known labels.


