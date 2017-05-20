---
title: Redux et Elm, une bonne inspiration ?
---

## Redux et Elm, une bonne inspiration ?

Les créateurs de Redux ne s'en cachent pas, une de leurs sources d'inspiration nette et visible est la Elm Architecture. On y retrouve des points communs flagrants et prometteurs : des données centralisées, un design modulaire et un cycle d'update pour chaque composant par le biais de messages. Seulement, une question me vient alors à l'esprit : est-ce que les résultats suivent ? Après tout, Elm est une technologie statiquement typée inspirée des familles de langages ML, tandis que Redux voit son utilisation principale se faire via React-Redux, un framework Javascript. Les deux univers sont donc assez distants, et on peut être en droit de se demander si un tel portage est possible. Je ne prétend pas avoir de réponse définitive, mais voici mon avis sur le sujet.

## Bref aperçu de la Elm Architecture

Une introduction à la Elm Architecture peut être intéressante pour ceux qui ignorent totalement son fonctionnement. Il existe déjà des tas d'articles passionnants et simples permettant de comprendre son principe, ainsi qu'un [talk donné à LilleFP fin Février](https://www.youtube.com/watch?v=rVZRCXutfng&t=10s&ab_channel=LilleFP) par moi-même et [@xvw](https://github.com/xvw) pour introduire le langage de façon simple et concise (hou, la vilaine auto-promotion !).

## Redux, concrètement, c'est quoi ?

Dans les faits, Redux est un conteneur pour applications Javascript reprenant des idées popularisées par Elm pour rendre bien plus évident le développement de projets à grande échelle en Javascript. Bien qu'il soit très souvent utilisé avec ReactJS, il est utilisable avec n'importe-quelle autre librairie dans la théorie.

## Redux a-t-il des points forts ?

En outre, la réponse est "oui". Tout d'abord, la centralisation des données rend bien plus simple l'organisation d'un grand projet en Javascript sans avoir à se poser de question quand au scope des actions entreprises. Son binding avec ReactJS est parfait en terme d'homogénéité et peut apporter un vrai plus en terme d'organisation et de logique de projet.

Également, Redux est léger. Dépendances inclues, il ne pèse que 2ko (selon les dires de ses créateurs, en tout cas), ce qui est, on peut le dire, plus que raisonnable. En prenant en compte les craintes de certains développeurs sur le poids final de certains projets Javascript, un framework aussi léger est plutôt rassurant.

## Oui, mais...

N'oublions pas que Redux s'inspire de la Elm Architecture qui vient avec son propre langage, Elm. Ainsi parfois, les limites de Redux peuvent se sentir. Notamment, l'absence de typage statique en Javascript est un énorme manque à ce modèle de données. Ainsi un des points forts du langage, à savoir la garantie d'absence d'erreur au runtime en dehors des effets de bord sous réserve que le programme compile, disparait complètement avec Redux.

Également, Redux reste destiné, selon moi, à des projets de grande envergure. Son implémentation le rend beaucoup trop overkill pour une utilisation dans de plus petits projets, qui ne feront que gagner en complexité sans grande nécessité. Avec React-Redux, je ne peux que recommander Flux pour ce genre de petit projet sans un grand besoin d'accessibilité à un scope complexe et profond.

## En résumé, les points forts...

- Profite de tout l'écosystème et du tooling Javascript sans devoir passer par de l'interop
- Framework très léger
- Intégration parfaite avec ReactJS
- Une bonne évolution du framework

## ... mais aussi les points faibles

- Réellement pertinent sur des projets à grand scope, trop complexe pour réellement profiter à de plus petits projets
- Absence de typage statique dans l'architecture (même si ce défaut est lié à Javascript, et non à Redux, on peut en souffrir dans Redux)
- Peu d'usages en dehors de ReactJS ([certaines personnes ont bien fait des bindings avec d'autres librairies](https://github.com/markerikson/react-redux-links/blob/master/redux-without-react.md), mais l'usage le plus majoritaire est, de façon écrasante, ReactJS)