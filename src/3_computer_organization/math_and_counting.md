# Math & Counting

## Bits 

You've seen it before in movies, a series of ones and zeros. Now you have a name to go with it: Bits! Here is an example of some Bits:
```python
0100010101001001011101001001001000000000011101101111010111010110
```

According to [Wikipedia](https://en.wikipedia.org/wiki/Bit):
> "The bit is a basic unit of information in computing and digital communications ... The bit represents a logical state with one of two possible values. These values are most commonly represented as either "1" or "0", but other representations such as true/false, yes/no, +/−, or on/off are common."

Let's take emphasis to the "represents a logical state with one of two possible values." So a bit `b`, can be either a `1` or a `0`. That means a single bit has two combinations (1 or 0). Let's make this a little more abstract: a single bit can represent two distinct things.

As an example, let's say we own a light tower at a dock. If the light is on, aka `1`, then a boat can dock now. If the light is off, aka `0`, then the boat can't dock now. Simple, on or off. `1 = dock`; `0 = no dock`. But what if we need to tell the people in the boats more than just two things? Well, we can get more lights (aka more bits). If we have two bits, we now have `2 * 2 = 4` possible combinations, so we can represent 4 things in total now.

Assume the boaters know which light is on the left and which is on the right. Now we can signal four different states of docking:
```
00 = can't dock now
01 = can dock in 1 hour
10 = can dock in 2 hours
11 = can dock now 
```
So if the left light is on, but the right is not, then you can dock in 2 hours. In this way, we just [encoded](https://techterms.com/definition/encoding) 4 different states of being. Pretty cool right? How in only two series of 1's and 0's we got that much information out. So how does it scale? 

### Scaling Bits

If 1 bit can encode `2 data states`. 2 bits can encode `4 data states`. 3 bits can encode `2 * 2 * 2 = 8 data states`. The pattern here is called the power of twos. To get the number of states your bits can represent is simple: raise 2 to the power of the number of states you have. Here is a fancy function for it:

```
states(b) = 2 ^ b
```

Where `b` is the number of bits you have. So if you have `8 bits`, then you have `2 ^ 8 = 256` different states you can represent... Yeah, that scales very fast. If you just had 8 flash lights, you could represent 256 different things to your friend across the street. Pretty cool. You may have noticed already, but its an exponential ramp-up on the number of states you can represent, which is good for us computer scientist.  

## Bits & Bytes 

Often, we need to use more than just a single bit. We call a set of 8 bits a **byte**. Using our earlier maths, a single byte can represent 256 different states. When we use bits to store human data, we usually need much more than 1 byte. This is where our SI table comes for bytes:

```
1 kilobyte (kb) = 1024 bytes = 8192 bits
1 megabyte (mb) = 1024 kb 
1 gigabyte (gb) = 1024 mb
1 terabyte (tb) = 1024 gb
```

You probably have more or equal to 256 GB of disk storage right? That means your disk has `2147483648` bits ready to hold either a `1` or `0` in it's place. That also means that your hard disk can represent `2 ^ 2147483648` different states. That's insane. How they do that with hardware is out of the scope of this handbook, but know that they do it with a little electrical engineering magic.

## Hexadecimal

We talk about bytes so much that it is often easier to refer to a binary number in a completely new counting system called [hexadecimal](https://simple.wikipedia.org/wiki/Hexadecimal) because it is more concise. Hexadecimal is one type of number system. Decimal, the one we usually count in, is another. To understand these `bases` and how to look at hex, watch this [khan academy video](https://www.youtube.com/watch?v=4EJay-6Bioo)

...

As a recap, Hex is converted to decimal and binary like so:
```
0 = 0 (10) = 0000
1 = 1 (10) = 0001
2 = 2 (10) = 0010
3 = 3 (10) = 0011
4 = 4 (10) = 0100
5 = 5 (10) = 0101
6 = 6 (10) = 0110
7 = 7 (10) = 0111
8 = 8 (10) = 1000
9 = 9 (10) = 1001
A = 10 (10) = 1010
B = 11 (10) = 1001
C = 12 (10) = 1100
D = 13 (10) = 1101
E = 14 (10) = 1110
F = 15 (10) = 1111
```

To make it clear that we are writing in hex, and not decimal, we will always append a `0x` to the beginning of the number. So when we say `0x0F`, you know we mean `15` in decimal. 

To tie this all together, we go back to how many bits are in a byte. There are 8 bits in a byte which we usually write like so `0000 0000`. We write it like that because the hex representation is `0x00`. Now we can refer to bigger bit numbers really easy. For instance, if we wanted to refer to `20` decimal we would just write `0x14`, which is `0001 0100` in binary. If you were confused about that conversion, re-watch the video above. 

Remember that hex bytes can also scale just like we did earlier with bits. We can represent **huge** numbers with hex that we would not normally talk about, like:

```python
0x7ffff7dd409
```

Which represents the number `140737351860368` in decimal. Yup that value took 6 bytes to represent. Aka `6*8` bits.

Now that we got that all sorted out, let's go back to the computerz.