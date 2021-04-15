# Why did we develop PseuToPy?

Learning to program is difficult. There are lots of concepts and skills to learn before
even writing a small simple program. And once these concepts are understood, they need to
be applied using a programming language which also needs to be learned.

A programming language, just like any natural language, has its own words and grammar.
Programming _instructions_ can be regarded as sentences that the developer will use to
speak to the machine. However, **a limiting aspect of most popular programming languages**
**is that they are all using English words**. On top of that, the instructions written
form grammatically incorrect sentences. As a consequence, non-English speakers can find it
even harder to learn these languages as they are manipulating words that do not
necessarily make any sense to them.

We have thus developed PseuToPy to allow non-English speakers to get introduced to
programming in their own native languages. PseuToPy defines pseudocode-based programming
languages in several tongues with the objective of making the PseuToPy language as natural
as possible.

# How does PseuToPy work?

PseuToPy uses [Lark](https://lark-parser.readthedocs.io/) to define pseudocode grammars in
several languages so that non-native English speakers can write basic instructions in
their own tongue when learning to program. Lark also provides tools to parse instructions
based on the provided grammar files, and produces the corresponding syntax trees. These
syntax trees are then used to generate the corresponding Python instructions.

More information will come as we develop more main features...

PseuToPy is developed under the MIT license. The source code can be found on
[GitHub](https://github.com/PseuToPy) and is mainly developed by [Patrick
Wang](https://patrickwang.fr), with the very much appreciated help of all the contributors
who also worked on this project.
