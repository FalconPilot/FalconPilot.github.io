---
title: Un pokédex pour apprendre React-Native
---

Étant donné mon intérêt certain pour les technologies web et mon apprentissage actuel de ReactJS, j'ai été plutôt attiré lorsque j'ai découvert l'existence de React-Native. Pouvoir créer une application mobile avec un langage qui permette d'utiliser la syntaxe de Javascript/React et de bénéficier de la totalité de l'écosystème Javascript, et le tout qui compile vers du code natif (et pas vers un pseudo-browser) ? Ça, c'est un deal !

Cet article couvre la création d'un [pokédex en React-Native](https://github.com/FalconPilot/react-pokedex). Il a été rédigé pour donner un premier aperçu et mon impression quand à l'utilisation de React-Native, et potentiellement une idée de ce que donne l'entrée dans le monde du développement mobile par le biais de cette technologie.

## Mais c'est quoi, React-Native ?

Tout simplement, il s'agit d'un "binding" utilisant une structure en Java permettant d'utiliser l'écosystème de Javascript (et plus précisément ReactJS par défaut) dans le but de réaliser des applications mobiles. L'idée a ses points forts, comme :

- L'utilisation d'une syntaxe connue et familière
- L'écosystème javascript !
- Une rapidité de développement assez impressionnante...

---

Ces belles qualités sont cependant entâchées par quelques petits problèmes qui ne sont pour autant pas à négliger.

- Le développement est rapide... quand on sait outrepasser certains comportements obscurs
- Certains comportements à la limite de l'ésotérisme (par exemple, crash bête et brutal de l'application en cas d'erreur de style !)
- Des divergences avec l'écosystème complet du web qui peuvent mener à pas mal d'incompréhensions

## Premières difficultés : l'environnement de développement

... La joie fut de courte durée lorsque j'ai découvert le temps nécessaire pour setup l'environnement de développement. Entre l'installation d'Android Studio, le setup d'une machine virtuelle, la gestion des erreurs obscures... Il paraît que certains développeurs ont plus de chance et arrivent à avoir un écosystème complet après une demie-heure/une heure, moi, c'est le temps que ça m'a prit juste pour avoir un émulateur fonctionnel.

## Implémentation du pokédex : par où commencer ?

La première étape est tout bêtement de créer un index principal qui contiendra toutes les données de l'application. La première vue, ainsi, est créée en suivant ce pattern (je passe les lignes d'imports)

```javascript
export default class App extends Component {
  /* Render */
  render() {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Pokédex</Text>
          <View style={styles.mainContent}>
            <View style={middleStyle}>
              <Pokelist/>
              <Pokecontent/>
            </View>
          </View>
        </View>
      );
  }
}
```

Ce bloc de code basique me donne au moins une idée de ce que je dois implémenter dans mon application pour la rendre fonctionnelle :

- Un composant "Pokelist" qui représentera la liste des pokémons à afficher
- Un composant "Pokécontent" qui affichera les informations du pokémon sélectionné, s'il existe
