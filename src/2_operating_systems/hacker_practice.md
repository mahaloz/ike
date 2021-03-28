# Hacker Practice

To practice, we are going to be using a hacking practice site called a Wargame site. These sites
are similar to a CTF in that they offer challenging puzzles that require technical knowledge. 
They are different in the fact that they have no time limit to the competition. People from across
the world can use the challenges on the site at any time.

The site we are using is called Over The Wire. 

The wargame Over The Wire has a lot of different modules that you can practice on, but for the sake
of speed in getting up to hacking whitebelt in a reasonable time, we will only be doing the
[bandit](https://overthewire.org/wargames/bandit/) challenges. Before you start, let's talk about how you will play them.
If you already know how to use SSH, skip to the [practice](#practice).

## SSH 

[SSH](https://en.wikipedia.org/wiki/SSH_(Secure_Shell)) stands for Secure Shell. It's a protocol 
(messaging language) used to get a remote shell on another machine. A remote shell is what it sounds 
like: an interactive shell you can use on a machine you don't have physical access too. After using it a 
few times it becomes clearer what this means. 

Recall the Ubuntu container we used in the [containers](./containers.md) section. We ran our 
docker command and it gave us a shell into a different Ubuntu version.

```bash
docker run -it ubuntu:16.04
```

It resulted in a shell. And to get out of the shell, and subsequently the container, we used:

```bash
exit
```

In the shell we had, which returned us to our machine. SSHing is very similar. Let's SSH into
the first level of bandit, which is [here](https://overthewire.org/wargames/bandit/bandit0.html).

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Input the password, `bandit0`, and now we are in a shell: 

```bash
bandit0@bandit:~$
```

As you guessed it, this is likely a different version of Ubuntu then what you are running. Use our 
earlier command from the containers section to check what that is. To confirm that this is  
a machine we don't own, let's check what the ip address is. An ip address is an address that is 
associated with a device on the internet. Ideally, this is a unique address that no other device
should share, but nowadays this is not always true. For now, assume it is unique. 

Run:

```bash
curl https://ipinfo.io/ip
```

Take a note of the address, then `exit` the machine just like before:

```bash
exit
```

Now we are back on our host machine. Run the same `curl` command again to get the ip address of 
your machine:

```bash
curl https://ipinfo.io/ip
```

Notice the numbers are fairly different? This confirms that the machine is at least not local 
(on our current network). If you want to take it further, you can even look up the location 
associated with the ip address of `Over The Wire`. 

### SSH Semantics

Lastly, let's talk about the semantics of the actual `SSH` command we ran:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Like logging into any machine, it requires a username. The first part of the ssh command is
the username, which is `bandit` in this case. Next is the `@` symbol to signify where the end
of the username is and where the remote address begins. The address here is
`bandit.labs.overthewire.org`. You may be confused here because it does not look like a normal
ip address, which is just numbers. This is due to [DNS](https://www.cloudflare.com/learning/dns/what-is-dns/).
DNS is outside the scope of this section, but just know it allows you to have fancy names point 
to normal looking ip addresses. 

So far we have learned SSH looks like:

```bash
ssh <username>@<ip_address>
```

The last thing we have to talk about is the `-p 2220` in the command. This is an option that specifies 
a [port](https://en.wikipedia.org/wiki/Port_(computer_networking)) to connect over. You can learn more 
about all the options of `ssh` by running:

```bash
man ssh
```

## Practice

Now that you have this last tool, SSH, in your arsenel, you are ready to start some hacking practice.
To show you are truely ready to progress to the next section, you must prove you are competent 
with the shell. 

On [OverTheWire: Bandit](https://overthewire.org/wargames/bandit/) do levels [0](https://overthewire.org/wargames/bandit/bandit0.html)
through [15](https://overthewire.org/wargames/bandit/bandit15.html). These levels should take you a day or two
to complete depending on how fast you get the later levels done. Good luck, and when you complete this
head over to the next section! 




