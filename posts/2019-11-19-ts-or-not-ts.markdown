---
title: TypeScript, or not Typescript ?
---

Étant très intéressé par les langages front-end statiquement typés mais utilisant ReactJS sans typage dans le cadre de mes projets professionnels, forcément, il n'a été que naturel que je porte un certain intérêt à TypeScript devant les promesses que ce dernier apportait. Jusqu'alors, je séparais plus ou moins les langages front-end en deux catégories :

1. Ceux qui compilent vers JS, et qui n'ont plus ou moins rien à voir avec JS (Elm, PureScript, ReasonML...)
2. JS et ses inombrables frameworks

TypeScript, lui, est un peu un hybride entre ces deux concepts. On programme toujours en JavaScript, mais il faut compiler le code source vers du JS natif. C'est donc du JavaScript... compilant vers JavaScript.

### Un concept farfelu ?

Farfelu ? Un peu, quand on l'explique comme ça. Mais ce n'est pas, selon moi, une prémisse si stupide. Si on y réfléchit, énormément de projets JS font déjà une opération de transpilation via, assez souvent, un outil comme Babel. Alors pourquoi ne pas créer un langage étendant JavaScript pour lui ajouter un système de types ? L'idée se vaut au moins autant que Flow.

### Le typage en TS : Parlons-en

Tristement, selon moi, l'un des points faibles du langage est justement son typage. Au-delà des outils de typage simples tels que les descriptions de structure (via le mot-clé `interface`, ce qui peut être confusant pour ceux venant de l'orienté objet) et la création de types union, on retrouve énormément de conventions directement héritées de l'orienté objet.

```typescript
interface SomeInterface {
  foo: string,
  bar: number,
  baz: string | void
}
```

Un type union en TS sera plus, en réalité, une sorte d'`enum` de valeurs correspondant à un type primitif JS. Ce n'est pas nécessairement inutile, mais encore une fois, très confusant lorsqu'on s'attend à pouvoir créer un type...

```typescript
type SomeType = 'foo' | 'bar' | 'baz'
```

TypeScript n'est d'ailleurs pas doté d'outils supplémentaires permettant d'appliquer beaucoup de designs de programmation fonctionnelle : pas de pattern matching, de pipe operator, pas de fun. C'est un peu triste, je trouve.

### Le gain

Si je n'ai pas vraiment fait l'éloge du typage avec TS, en revanche, il y a un autre facteur à prendre en compte qui, selon moi, est bien plus important que le seul ajout d'outils de typage : le debug dans l'IDE. Une des sources d'erreur les plus courantes que j'ai pu rencontrer en JS (et je n'ai pas vraiment l'impression d'être le seul), c'est la mauvaise utilisation d'une variable dans du code. Avec à minima l'ajout de descriptions de types simples, on peut supprimer ou à minima réduire les risques liés à ce genre d'erreur... pour peu que l'on utilise TypeScript en mode `strict`.

### Conclusion ?

Je ne suis pas très fan de TypeScript en tant que langage front-end statiquement typé. Un langage comme Elm me convainc beaucoup plus sur le gain que peuvent apporter un typage fort et des outils de programmation fonctionnelle à un projet d'envergure.

Cependant, comparé à JS et aux multitudes de frameworks tentant de mitiger les risques liés aux erreurs de type, TS est un choix que je considère comme très intéressant. En se contentant au moins de décrire les types de ses structures de données et de ses fonctions, on peut déjà ajouter une certaine couche de clareté au code et réduire le risque d'erreurs improbables.

Alors, est-ce qu'on peut au moins considérer que TypeScript est... "mieux que rien" ? Selon moi, probablement, mais en étant conscient qu'il ne s'agit pas ici d'une technologie idéale, mais plus 