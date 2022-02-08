---
title: Un pokédex pour apprendre React-Native, partie 1
---

Étant donné mon intérêt certain pour les technologies web et mon apprentissage actuel de ReactJS, j'ai été plutôt attiré lorsque j'ai découvert l'existence de React-Native. Pouvoir créer une application mobile avec un langage qui permette d'utiliser la syntaxe de Javascript/React et de bénéficier de la totalité de l'écosystème Javascript, et le tout qui compile vers du code natif (et pas vers un pseudo-browser) ? Ça, c'est un deal !

Cet article couvre la création d'un [pokédex en React-Native](https://github.com/FalconPilot/react-pokedex). Il a été rédigé pour donner un premier aperçu et mon impression quand à l'utilisation de React-Native, et potentiellement une idée de ce que donne l'entrée dans le monde du développement mobile par le biais de cette technologie.

Il sera rédigé en plusieurs partie (une par composant, pour être exact) étant donné qu'il s'agit d'un programme assez long à détailler, le but étant de présenter la technologie de manière constructive pour permettre d'offrir le regard d'un apprenant sur React-Native.

## Mais c'est quoi, React-Native ?

Tout simplement, c'est une techno' permettant d'utiliser l'écosystème de Javascript et la syntaxe de ReactJS dans le but de réaliser des applications mobiles. L'idée a ses points forts, comme :

- L'utilisation d'une syntaxe connue et familière
- L'écosystème javascript !
- Une rapidité de développement assez impressionnante...

---

Ces belles qualités sont cependant entâchées par quelques petits problèmes qui ne sont pour autant pas à négliger.

- Le développement est rapide, oui... quand on sait outrepasser certains comportements obscurs 
- Certains comportements à la limite de l'ésotérisme (par exemple, crash bête et brutal de l'application en cas d'erreur de style !)
- Des divergences avec l'écosystème complet du web qui peuvent mener à pas mal d'incompréhensions (je pense notamment aux feuilles de style)

## Premières difficultés : l'environnement de développement

... La joie fut de courte durée lorsque j'ai découvert le temps nécessaire pour setup l'environnement de développement. Entre l'installation d'Android Studio, le setup d'une machine virtuelle, la gestion des erreurs obscures... Il paraît que certains développeurs ont plus de chance et arrivent à avoir un écosystème complet après une demie-heure/une heure, moi, c'est le temps que ça m'a prit juste pour avoir un émulateur fonctionnel.

## Préparations : Générer une table de correspondance pour les assets 

React-Native interdit le chargement dynamique s'assets via `require()`. Ainsi, il m'a fallu créer un petit script ruby tout bête pour générer une table de correspondance permettant de charger tous les assets de façon statique et, ainsi, correspondre aux besoins de React-Native.

```ruby
begin

  # ---------------
  # Local variables
  # ---------------
  exportdir = "./src"
  imgdir = "./assets/pokeapi/sprites/pokemon"
  extension = ".png"

  # ----------------
  # Create main file
  # ----------------
  File.open("#{exportdir}/images.js", "w+") do |file|
    file.puts "export default {"
    # ----------------------
    # Iterate through images
    # ----------------------
    Dir["#{imgdir}/*#{extension}"].each do |img|
      index = img.split(extension)[0].split("/")[-1]
      file.puts "  \"img_#{index}\": require(\".#{img}\"),"
    end
    file.puts "};"
  end

  # --------------------
  # Confirmation message
  # --------------------
  puts "File #{exportdir}/images.js generated !"

end

```

... Un script tout bête, disais-je :)

## Partie 1 : Le constructeur

Nous allons commencer par le coeur de l'application : [l'index, la page principale](https://github.com/FalconPilot/react-pokedex/blob/master/src/index.js). La première fonction que nous allons analyser est le constructeur du composant.

```jsx
  /* Constructor */
  constructor(props) {
    super(props);
    this.state = {
      displayed: null,
      loading: true,
      error: undefined
    };
    /* Globals setting */
    global.baseURL = "http://pokeapi.co/api/v2";
    global.pokeCacheLength = 10;
  }
```

Assez simple, le constructeur se contente d'initialiser deux choses. La première, c'est l'état de l'application, qui va contenir trois clés :

- `displayed` : Définit le pokémon actuellement affiché à droite de l'écran
- `loading` : Définit si l'application est en train de charger
- `error` : Définit une erreur à afficher à l'utilisateur

Ensuite, on définit deux constantes globales utiles au sein de l'application :

- `baseURL` : L'URL racine de l'API
- `pokeCacheLength` : Le nombre maximal de pokémons individuels stockés en cache dans l'application

## Partie 2 : Fonctions utilitaires

Au sein du composant, plusieurs fonctions seront définies pour être utilisées au sein des composants enfants. Pourquoi donc ? La raison est assez simple : pour permettre aux composants enfants de modifier le state du composant parent. On doit définir, plus précisément, trois fonctions.

```jsx
  /* Changing displayed pokemon */
  onChange = (data) => {
    this.setState({
      displayed: data
    });
  }

  /* Add Error */
  addError = (error) => {
    this.setState({
      error: error,
      loading: false
    });
  }

  /* Toggle Loading */
  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  }
```

`onChange` : Cette fonction permet de modifier le pokémon actuellement affiché lorsqu'il est sélectionné. Cela permet à un composant enfant de la liste de pokémons de modifier un composant auquel il n'est pas directement connecté.

`addError` : En étant appelée, cette fonction permet d'ajouter une erreur à l'index pour l'afficher sur la page principale.

`toggleLoading` : Cette fonction active ou désactive le spinner de chargement en inversant son état.

## Partie 3 : Le rendu

Vient enfin le rendu, la vue principale de l'application. Avec ce que nous avons défini auparavant, on peut enfin définir le composant du rendu aisément.

```jsx
  /* Render */
  render() {
      const lookup = require('./images.js');

      /* Loading activity indicator */
      let indicator = this.state.loading === true
        ? <View style={styles.centeredView}>
            <ActivityIndicator/>
          </View>
        : null;

      /* Error display */
      let error = this.state.error !== undefined
        ? <View style={styles.centeredView}>
            <Text>{this.state.error}</Text>
          </View>
        : null

      /* Middle styles */
      let middleStyle = this.state.error !== undefined || this.state.loading === true
        ? styles.hidden
        : styles.middle

      /* Rendering */
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Pokédex</Text>
          <View style={styles.mainContent}>
            {indicator}
            {error}
            <View style={middleStyle}>
              <Pokelist
                lookup={lookup}
                onChange={this.onChange}
                addError={this.addError}
                toggleLoading={this.toggleLoading}
                style={styles.pokelist}
              />
              <Pokecontent
                id={GetId(this.state.displayed)}
                lookup={lookup}
                pokemon={this.state.displayed}
              />
            </View>
          </View>
        </View>
      );
  }
```

Ce composant est assez grand, mais au final assez simple. On définit tout d'abord une table de correspondance (celle générée par le script Ruby détaillé en début d'article), que l'on pourra passer aux deux composants pour charger statiquement les assets.

Ensuite, on créé deux éléments de vue permettant d'afficher respectivement les erreurs ou bien le sacro-saint spinner de chargement. Enfin, on décide de cacher la vue en cas de chargement ou d'erreur. React-Native ignore les objets `null` au sein de la vue, ce qui est bien pratique pour pouvoir afficher de façon conditionnelle certains objets comme le spinner de chargement ou bien le message d'erreur.

Quand à la vue en elle-même, on lui ajoute deux composants, `PokeList` et `PokeContent`, qui représentent respectivement la liste des pokémons ainsi que le pokémon actuellement affiché. Ils seront détaillés plus tard. Dans le prochain article, nous détaillerons un des composants les plus complexes de l'application, `PokeList`.