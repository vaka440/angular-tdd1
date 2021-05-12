/*
- En général, lors de la simulation d'une dépendance, une classe factice est fournie avec plusieurs des mêmes méthodes que l'original.
  Ces méthodes ne fournissent pas de fonctionnalités, mais elles peuvent simplement renvoyer des valeurs prévisibles que nous pouvons utiliser à des fins de test.

- Par exemple, vous souhaiterez peut-être :
  - simuler des appels réseau,
  - renvoyer une valeur connue et voir si vos composants et services se comportent comme ils le devraient.
  - Vous souhaiterez peut-être renvoyer volontairement les erreurs des services simulés pour voir si votre application gère correctement les erreurs.
  - Vous pouvez même vous moquer des fonctionnalités angulaires telles que le routeur.
*/


export class MockInventoryService {
  inventoryCount: number = 0;

  constructor() { }

  incrementCount() {}
  decrementCount() {}
}
