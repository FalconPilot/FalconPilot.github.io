---
title: Redux et Elm, une bonne inspiration ?
---

## Redux et Elm, une bonne inspiration ?

Les créateurs de Redux ne s'en cachent pas, une de leurs sources d'inspiration nette et visible est la Elm Architecture. On y retrouve des points communs flagrants et prometteurs : des données centralisées, un design modulaire et un cycle d'update pour chaque composant par le biais de messages. Seulement, une question me vient alors à l'esprit : est-ce que les résultats suivent ? Après tout, Elm est une technologie statiquement typée inspirée des familles de langages ML, tandis que Redux voit son utilisation principale se faire via React-Redux, un framework Javascript. Les deux univers sont donc assez distants, et on peut être en droit de se demander si un tel portage est possible. Je ne prétend pas avoir de réponse définitive, mais voici mon avis sur le sujet.

## Bref aperçu de la Elm Architecture

Une introduction à la Elm Architecture peut être intéressante pour ceux qui ignorent totalement son fonctionnement. Il existe déjà des tas d'articles passionnants et simples permettant de comprendre son principe, ainsi qu'un [talk donné à LilleFP fin Février](https://www.youtube.com/watch?v=rVZRCXutfng) par moi-même et [xvw](https://github.com/xvw) pour introduire le langage de façon simple et concise (hou, la vilaine auto-promotion !).

## Redux, concrètement, c'est quoi ?

Dans les faits, Redux est un conteneur pour applications Javascript reprenant des idées popularisées par Elm pour rendre bien plus évident le développement de projets à grande échelle en Javascript. Bien qu'il soit très souvent utilisé avec ReactJS, il est utilisable avec n'importe-quelle autre bibliothèque dans la théorie.

Pour une question de clareté, cependant, l'article utilisera le binding React-Redux pour avoir une base commune et éprouvée.

## Update dans Elm et React-Redux

Elm et React-Redux étant très différents, je vais essayer de présenter des exemples de code dans ces deux langages pour bien exprimer la différence entre ceux-ci.

La fonction de mise à jour du modèle, en Elm, ressemblera en général à ceci (sans inférence de type)

```haskell
type Msg
	= Increment
	| Decrement
	| Reset

update: Msg -> Model -> (Model, Msg)
update msg model =
	case msg of
		Increment ->
			model + 1
		Decrement ->
			model - 1
		Reset ->
			0
```

Avec React-Redux, voilà à quoi cette même méthode de mise à jour pourrait ressembler.

```javascript
function update(state = 0, action) {
	switch (action.type) {
    	case 'INCREMENT':
      		return state + 1
    	case 'DECREMENT':
    		return state - 1
     	case 'RESET':
      		return 0
      	default:
        	return state
	}
}
```

On peut voir une énorme ressemblance au niveau de la structure : une fonction, prenant d'abord un message (ou une "action", avec Redux), puis un modèle (ou un "état" avec Redux). Le message définira comment le modèle devra être modifié puis renvoyé.

Un point d'honneur des deux langages (ainsi que de React, d'ailleurs) est de prôner l'immutabilité des données, ce qui est, de mon point de vue, une très bonne pratique. Avoir des données immutables est bien plus sûr au niveau du code et bien plus propre.

Seulement, vient un des points capitaux qui peut avantager Elm : toutes les erreurs d'un programme Elm seront annoncées à la compilation. Ainsi, avec Redux, envoyer un message invalide (ici, imaginons qu'un utilisateur envoie un message `COUCOU` à l'update, dans Elm, la compilation échouera pour notifier l'utilisateur de son erreur, dans Redux, il se contentera d'exécuter du code par défaut au runtime - dans notre exemple, renvoyer l'état non modifié). Cela ne condamne pas Redux pour autant, mais c'est une divergence importante pour comprendre les limitations éventuelles qu'un écosystème Javascript peut avoir lorsqu'il s'inspire d'une technologie statiquement typée. Pour autant, Redux n'est pas à jeter pour autant.

## Générer une vue : JSX et Elm

La génération d'une vue est également très différente. En Elm, on optera pour une syntaxe proche du langage d'origine, tandis qu'avec React-Redux, on peut tout simplement utiliser JSX. Un exemple en code, d'abord en Elm...

```haskell
view: Model -> Html Msg
view model =
	div [ id "content" ]
		[ h1 [] [ model.title ]
		, p [] [ "I <3 Elm" ]
		]
```

Puis l'équivalent avec JSX

```javascript
render {
  return (
    <div id="content">
    	<h1>{this.state.title}</h1>
    	<p>I <3 Elm</p>
    </div>
  );
}
```

On se rend compte que JSX permet d'avoir une syntaxe de markup plus proche de celle du HTML. Ici, on pourrait croire à une grande différence, mais en réalité, il s'agit du même fonctionnement : chaque balise est une fonction prenant une certaine quantité de paramètres. La différence principale vient de la méthodologie employée : avec JSX, on passe tous ses paramères de la même façon qu'en HTML. Avec Elm, on soumet deux listes à la fonction, la première représentant les attributs et la seconde les noeuds enfants de l'élément.

Ainsi React-Redux, pouvant profiter de JSX, permet d'avoir une syntaxe avec laquelle les développeurs seront déjà habitués, ce qui peut être un avantage pour React-Redux.

## Redux a-t-il des avantages ?

La centralisation des données rend bien plus simple l'organisation d'un grand projet en Javascript sans avoir à se poser de question quand au scope des actions entreprises. Son binding avec ReactJS est parfait en terme d'homogénéité et peut apporter un vrai plus en terme d'organisation et de logique de projet, ce qui peut être très bienvenu pour développer notamment des projets collaboratifs.

Également, Redux est léger. Dépendances inclues, il ne pèse que 2ko (selon les dires de ses créateurs, en tout cas), ce qui est, on peut le dire, plus que raisonnable. En prenant en compte les craintes de certains développeurs sur le poids final de certains projets Javascript, un framework aussi léger est plutôt rassurant.

L'inspiration de la Elm Architecture est un point très positif pour Redux, cette dernière reposant sur des concepts et principes solides de la programmation fonctionnelle encourageant (voire forçant) à l'emploi de bonnes pratiques. Il ne faut pas oublier que Redux s'utilise avec Javascript, et qu'énormément de développeurs utilisent Javascript, ce qui le rend plus accessible pour beaucoup de personnes.

La réponse à la question de l'intitulé de cette section est, sans aucun doute, "Oui" : Redux a bel et bien des avantages dans certains cas de figure.

## Oui, mais...

N'oublions pas que Redux s'inspire de la Elm Architecture qui vient avec son propre langage, Elm. Ainsi parfois, les limites de Redux peuvent se sentir. Notamment, l'absence de typage statique en Javascript est un énorme manque à ce modèle de données. En outre l'un des points forts du langage, à savoir la garantie d'absence d'erreur au runtime en dehors des effets de bord sous réserve que le programme compile, disparait complètement avec Redux.

Également, Redux reste destiné, selon moi, à des projets de grande envergure. Son implémentation le rend beaucoup trop overkill pour une utilisation dans de plus petits projets, qui ne feront que gagner en complexité sans grande nécessité. Avec React-Redux, je ne peux que recommander la gestion interne des composants de React pour ce genre de petit projet sans un grand besoin d'accessibilité à un scope complexe et profond.

## En résumé, les points forts...

- Profite de tout l'écosystème et du tooling Javascript sans devoir passer par de l'interop
- Framework très léger
- Intégration parfaite avec ReactJS
- Une bonne évolution du framework
- La communauté Javascript, gigantesque, ainsi qu'un énorme nombre d'utilisateurs

## ... mais aussi les points faibles

- Réellement pertinent sur des projets à grand scope, trop complexe pour réellement profiter du moindre avantage sur de plus petits projets
- Absence de typage statique dans l'architecture (même si ce défaut est lié à Javascript, et non à Redux, on en souffre quand même)
- Peu d'usages en dehors de ReactJS ([certaines personnes ont fait des bindings avec d'autres bibliothèques](https://github.com/markerikson/react-redux-links/blob/master/redux-without-react.md), mais l'usage le plus majoritaire est, de façon écrasante, ReactJS)