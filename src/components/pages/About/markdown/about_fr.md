# Pourquoi avons-nous développé PseuToPy ?

L'apprentissage de la programmation est difficile. En effet, il faut connaître un grand
nombre de concepts avant de pouvoir rédiger mêmes les programmes les plus simples. Et
quand bien même ces concepts sont acquis, il faut ensuite les appliquer en utilisant un
langage de programmation qu'il faut aussi apprendre.

Un langage de programmation, comme tout autre langage naturel, est constitué d'une
grammaire et d'un vocabulaire. Le _code_ peut être considéré comme des phrases que le
développeur va utiliser pour parler à sa machine. Cependant, **un défaut des langages de** 
**programmation les plus populaires est qu'ils utilisent tous des mots issus de la langue** 
**anglaise**. De plus, les instructions ainsi formées sont souvent grammaticalement
incorrectes. Par conséquent, des personnes non anglophones peuvent trouver l'apprentissage
d'un langage de programmation difficile puisqu'elles manipulent des mots dont elles ne
comprennent pas forcément le sens.

Nous avons donc développé PseuToPy pour introduire des personnes non anglophones à
la programmation en utilisant leurs langues maternelles. PseuToPy définit un langage de
programmation basé sur du pseudocode écrit dans différentes langues, et a pour objectif
d'être le plus proche possible du langage naturel.

# Comment fonctionne PseuToPy ?

PseuToPy utilise [Lark](https://lark-parser.readthedocs.io/) pour spécifier les grammaires
de pseudocode en plusieurs langues afin que des personnes non anglophones puissent écrire
du code en utilisant leurs langues maternelles. Lark offre aussi un analyseur de syntaxe
qui permet de générer un arbre de syntaxe à partir d'instructions valides selon la
grammaire spécifiée.

Plus d'informations sont à venir avec le développement de nouvelles fonctionnalités...

PseuToPy est développé sous licence MIT. Le code source se trouve sur
[GitHub](https://github.com/PseuToPy) et est principalement développé par [Patrick
Wang](https://patrickwang.fr), avec l'aide très appréciée des contributeurs ayant aussi
travaillé sur ce projet.
