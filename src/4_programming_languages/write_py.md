# Writing Code

Writing code in Python is *very* similar to writing code in 
any other language, but has the subtle difference of being able
to test ideas quickly in a interactive interpreter. 

First, go and follow everything done in the [Writing C](./write_c.md)
section. This will get you setup with Vim and tmux. 

## Testing ideas as you go

Python is very fast to write and even faster to test. For this reason
I recommend almost always writing code in the terminal using vim,
tmux, and a secret new tool called `IPython`.

First install it:
```bash
sudo apt-get install ipython3
```

What we just installed is an upgraded interactive python interpreter.
Run it:

```bash
ipython3
```

Now you are in a nice interpreter:

```
▶ ipython3
Python 3.6.9 (default, Oct  8 2020, 12:12:24)
Type "copyright", "credits" or "license" for more information.

IPython 5.5.0 -- An enhanced Interactive Python.
?         -> Introduction and overview of IPython's features.
%quickref -> Quick reference.
help      -> Python's own help system.
object?   -> Details about 'object', use 'object??' for extra details.

In [1]:
```

Now you can test ideas quickly and instantly see the output. I recommend
always having this open as a pane when you are writing code. It will
allow you to test ideas very quickly and do other very interesting things.

Assume we have a python file called `my_program.py`, and it looks like this:
```python
def reverse(lst):
    return lst[::-1]
```

Yes it's just a function. Now open up `ipython3` and do this:

```python
In [1]: from my_program import reverse

In [2]: my_lst = [1,2,3,4]

In [3]: reverse(my_lst)
Out[3]: [4, 3, 2, 1]
```

Yup, we can directly execute the function inside our file. It makes for good writing.