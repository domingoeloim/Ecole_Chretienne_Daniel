# École Chrétienne Daniel

Site statique bilingue (français/anglais) pour l'École Chrétienne Daniel à
Fifadji, Cotonou. Il n'y a pas de dépendance npm ni de service externe requis.

## Pages

- `index.html` — accueil
- `ecole.html` — présentation et devise
- `maternelle.html` et `primaire.html` — cycles scolaires
- `vie-scolaire.html` — repères sur la vie scolaire
- `actualites/index.html` — actualités
- `actualites/culte-rentree-scolaire.html` — résumé attribué aux publications Facebook
- `galerie.html` — illustrations originales en attendant les photos autorisées
- `contact.html` — adresse publique à confirmer et contact via la page officielle

Le sélecteur de langue traduit chaque page et ses métadonnées. Le menu mobile,
les liens entre pages et les actualités fonctionnent sans formulaire ni espace
parents.

## Prévisualisation locale

Depuis ce dossier, lancer un serveur local :

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Ouvrir ensuite `http://127.0.0.1:4173`.

## Tests

Depuis ce dossier, lancer les vérifications de routes, navigation, ressources,
traductions et limites de contenu :

```bash
node --test tests/site.test.mjs
```

## Contenus à confirmer avant publication

- Ajouter le numéro de téléphone officiel pour activer un lien d'appel.
- Ajouter des photos seulement après validation et autorisation de publication.
- Choisir plus tard le mode de publication des actualités par l'enseignant.
- Confirmer l'adresse précise affichée sur Facebook, les horaires et les
  conditions d'admission avant publication.

Le site ne contient ni préinscription en ligne, ni espace parents, ni
coordonnées inventées. Les rapports de projet et la direction approuvée se
trouvent dans `../../../PROJECT_CONTEXT.md` et `../../../TASKS.md`.
