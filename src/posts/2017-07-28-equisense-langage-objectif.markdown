---
title: Retour d'expérience sur Go et PHP
---

Cela va faire environ un mois que j'ai commencé à travailler à Equisense, une startup dans laquelle je me plais bien. La quantité de choses que j'ai pu apprendre en un mois me parait absolument gigantesque, et pourtant l'une des choses les plus importantes que j'ai pu constater me vient de par l'utilisation de deux langages envers lesquels j'avais, à l'origine, des à-prioris relativement négatifs : PHP et Go. Je ne suis devenu expert dans l'utilisation d'aucun des deux, mais j'ai eu l'occasion de me poser une question qui me semble très importante.

## Si on utilise un langage que l'on n'aime pas, mais que c'est pour une bonne cause, ça s'annule ?

Pour moi, la réponse est "oui", mais je suis bien conscient que ce n'est que mon ressenti personnel. Je n'aime toujours pas spécialement Go plus que cela, et encore moins PHP (attention, ce n'est ici pas un jugement objectif mais une préférence personnelle, je développerai plus loin). Et pourtant, malgré cela, je n'ai pas trouvé le fait de les utiliser spécialement désagréable, pour la simple et bonne raison que l'objectif derrière était, à lui-seul, une raison suffisante pour les utiliser tout de même : rendre un grand service à des non-programmeurs qui gagneront un temps considérable grâce au code que j'aurais produit.

Tôt ou tard, un programme informatique est destiné (dans la plupart des cas, au moins) à servir à un public constitué de personnes ne pratiquant pas la programmation. C'est avec cette idée en tête que l'on doit prendre en compte le code legacy : parfois moche, souvent vieux, et surtout écrit dans un langage que l'on peut ne pas aimer. Dans mon cas, c'était PHP.

Et pourtant, quelques jours de travail économiseront à l'avenir potentiellement des heures et des heures de travail long et rébarbatif à au moins une personne de la boîte où je travaille qui fournit beaucoup d'efforts pour nous au quotidien. Pour moi, ce genre de chose rentre dans le spectre de *l'éthique de la programmation*, qui est un très vaste sujet sur lequel je n'ai pas la prétention de savoir grand chose au sens large.

## Go : absence de generics = mauvais langage ?

C'était le raccourci beaucoup trop rapide que j'employais, avant. En tant qu'amateur de programmation fonctionnelle, l'absence de polymorphisme paramétrique m'avait laissé un goût salé dans la bouche. Et puis je me suis rendu compte qu'en réalité, implémenter un concept de ce genre dans un langage était compliqué; très compliqué, même.

Ainsi, je préfère aujourd'hui rectifier ma position : l'absence de généricité dans le langage est certes gênante, mais **pas forcément pour tous les usecases de Go** qui, eux, fonctionnent très bien sans. Je dirais plutôt que sur le sujet, la seule chose qui me gêne encore, c'est l'argument parfois ressorti par quelques personnes visant à prétendre que "*Le polymorphisme paramétrique est inutile*". Qu'on puisse s'en passer dans certains cas, je peux l'admettre, mais la généricité serait selon moi tout de même un plus non-négligeable au langage.

De nombreuses discussions en interne ainsi que la lecture de nombreux articles sur le sujet m'ont permis de découvrir que la communauté de Go était bien plus réceptive à la problématique que ce que je voulais bien admettre, et que le langage avait de belles perspectives d'évolution. J'irais même dire qu'avec quelques nouveautés, je pourrais me mettre à aimer ce langage pourtant que je haïssais avant... Affaire à suivre !

## PHP : Langage déprimant et incompréhensible ?

Avant, en lisant du code PHP, j'avais envie de me laver les yeux avec de l'eau de Javel et regarder 3 ou 4 fois "*Erlang : the Movie*" tant j'avais du mal avec. Pourtant, j'ai pu constater que cela n'était pas nécessairement du au langage, mais au code lui-même qui était, en général, constitué de vieux frameworks legacy pleins de code bordélique au possible. Même si je n'ai pas trouvé PHP plus agréable que ça à utiliser, je n'ai pas trouvé de limitation spéciale forçant le code à être "illisible" (au contraire, j'ai même trouvé qu'en tant que langage impératif/orienté objet, il était plutôt clair à lire... tant que le code ne ressemble pas à un plat de spaghetti).

## Sortir de sa zone de confort

Ce dernier mois, je suis complètement sorti de ma zone de confort en utilisant deux langages très fortement impératifs et relativement peu adaptés à la programmation fonctionnelle, comparativement à ceux que j'ai l'habitude d'utiliser. Et pourtant, je ne regrette rien, je dirais même que je suis content d'avoir pu les utiliser. Ça aura été une bonne grosse leçon d'humilité, qui m'a rappelé qu'avant tout, être programmeur, ce n'est pas juste devenir un maître dans quelques langages que l'on aime bien : c'est savoir sortir de sa zone de confort, toujours apprendre des choses nouvelles, et se spécialiser sans jamais bouder l'inconnu, qu'il paraisse alléchant ou repoussant.

Parfois, c'est en allant dans des endroits que l'on déteste que l'on peut rendre le plus service aux gens, et même si on ne doit pas considérer ça comme une fatalité, il faut garder l'objectif et le résultat final en tête : aider ses collègues. Pour moi, c'est ça, mon éthique de programmation.