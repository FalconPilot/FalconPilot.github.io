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

## Chargement des assets

Une des premières difficultés assez gênantes que j'ai rencontré était pour le chargement des images des pokémons. En effet, React-Native empêche **complètement** le chargement d'assets de façon dynamique via `require(...)`. Tous les assets chargés localement doivent ainsi l'être de façon statique.

Après une longue recherche, j'ai fini par écrire un [bête script Ruby](https://github.com/FalconPilot/react-pokedex/blob/master/generate_table.rb) qui génère une table de correspondance dans un fichier **.js** qui permettra ainsi de charger tous les assets de façon statique. En vérité, c'est même la seule solution que j'ai pu trouver de mon côté.

## Obtenir la liste des Pokémons

Pour charger la liste des pokémons, on peut observer les données renvoyées par la PokeAPI. Ce qui nous intéresse, c'est de savoir qu'à chaque requête, on récupère au moins :

- 20 pokémons avec leurs noms
- L'URL de la requête permettant de récupérer les 20 pokémons suivants (peut être `null`)

Ainsi la solution que j'ai décidé d'adopter était l'écriture d'une fonction récursive permettant de charger la liste des pokémons.

```javascript
  /* Recursively get pokemons */
  getPokemons(next) {
    /* Load next pokemons */
    if (next !== null && next !== undefined) {
      fetch(next)
        .then(response => response.json())
        .then(data => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.dataSource._dataBlob.s1.concat(data.results))
          });
          this.getPokemons(data.next);
        })
        .catch(error => {
          console.warn(error);
        });
    /* AsyncStorage caching */
    } else {
      AsyncStorage
        .getItem('pokelist', (err, result) => {
          if (result !== null && result !== undefined) {
            const data = JSON.parse(result);
            const ds = this.state.dataSource._dataBlob.s1;
            if (data.dataSource._dataBlob.s1.length < ds.length) {
              AsyncStorage.setItem('pokelist', JSON.stringify(ds));
            }
          } else {
            AsyncStorage.setItem('pokelist', JSON.stringify(ds));
          }
        })
        .catch(error => {
          console.warn(error);
        });
    }

```

Cette fonction est le coeur de l'application. Tout bêtement, elle reçoit un argument `next` qui représente l'URL à charger, ou bien `null` dans le cas où on soit arrivé à la fin de la liste de pokémons. Dans le cas où on dispose d'une valeur nulle, on tente de mettre en cache les données chargées. Dans le cas contraire, on effectue une requête à l'API, on ajoute les données ainsi chargées dans un storage (AsyncStorage) ainsi qu'au State du composant.