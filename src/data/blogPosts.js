const BLOG_POSTS = [
  // Recettes
  {
    title: "Filet mignon aux champignons",
    slug: "filet-mignon",
    image: "/blog/filet-mignon.jpg",
    category: "recettes",
    excerpt: "Plat délicieux à base de viande fondante, de champignons des bois et d'oignons du potager.",
    content: `<p>Ce week-end, nous nous retrouvons pour un plat délicieux à base de viande fondante, de champignons des bois et d'oignons du potager.</p>
<p><strong>Accord mets-vins :</strong> Pour ce plat, la bonne bouteille à sortir est le <strong>Pinot Noir</strong>. En effet, le filet mignon est une viande tendre et fine qui nécessite un vin fruité mais fin en bouche pour accompagner la viande de ses arômes.</p>
<h3>Ingrédients (pour 4 personnes) :</h3>
<ul>
<li>500 g de filet mignon</li>
<li>500 g de champignons</li>
<li>2 oignons</li>
<li>3 gousses d'ail</li>
<li>20 cl de crème fraîche liquide</li>
<li>1 grand verre de vin rouge</li>
<li>1 verre d'eau</li>
<li>1 pincée de poivre de Cayenne</li>
<li>Sel et poivre</li>
<li>Une bouteille de Pinot Noir</li>
</ul>
<h3>Préparation :</h3>
<p>Faire revenir les oignons émincés au beurre dans une sauteuse. Saisir le filet mignon sur toutes ses faces jusqu'à ce qu'il soit doré. Ajouter les champignons et l'ail haché finement. Laisser mijoter environ 1/2 heure avec le vin rouge et l'eau. Ajouter les champignons réservés et la crème fraîche, laisser mijoter 5 minutes, puis assaisonner avec sel et poivre.</p>`
  },
  {
    title: "Poisson à la crème",
    slug: "poisson-creme",
    image: "/blog/poisson-creme.jpg",
    category: "recettes",
    excerpt: "Une recette à base de poisson à la crème.",
    content: `<p>Nouveau mois = nouvelles recettes à découvrir. L'occasion aujourd'hui de vous présenter une recette à base de poisson à la crème.</p>
<p><strong>Accord mets-vins :</strong> La cuvée <strong>Marsanne AOC Valais</strong> est le vin parfait pour cet accord. Ce vin blanc puissant et complexe en bouche aux arômes de pêches blanches, framboises et vanille, élevé en barrique sur lies.</p>
<h3>Ingrédients (pour 4 personnes) :</h3>
<ul>
<li>4 tranches de poisson</li>
<li>25 cl de vin blanc</li>
<li>1 pincée de poudre de curry</li>
<li>1 pincée de ciboulette</li>
<li>3 c. à soupe d'huile d'olive</li>
<li>3 oignons blancs</li>
<li>20 cl de crème fraîche liquide</li>
<li>1 pincée de poivre de Cayenne</li>
<li>20 g de beurre</li>
<li>Sel et poivre</li>
<li>Une bouteille de Marsanne</li>
</ul>
<h3>Préparation :</h3>
<p>Préchauffer le four à 200°C. Émincer les oignons et les faire revenir à l'huile. Garnir un plat beurré de ce mélange. Rincer les filets, retirer les arêtes, saler et poivrer, disposer sur le lit d'oignons. Chauffer la crème avec le vin blanc, le poivre de Cayenne et le curry jusqu'à épaississement. Napper les filets de sauce et enfourner 20 minutes. Parsemer de ciboulette avant de servir.</p>`
  },
  {
    title: "Rôti de cerf aux airelles",
    slug: "roti-cerf",
    image: "/blog/roti-cerf.jpg",
    category: "recettes",
    excerpt: "Recette automnale: un rôti de cerf aux airelles accompagné de vins rouges.",
    content: `<p>On se retrouve cette semaine avec une nouvelle recette automnale : un rôti de cerf aux airelles.</p>
<p><strong>Accord mets-vins :</strong> Cette viande s'accompagne de vins rouges puissants. Le <strong>Syrah - Maison Rouge</strong> est particulièrement recommandé, élevé en barrique, avec sa bouche épicée, puissante et tanique.</p>
<h3>Ingrédients (pour 4 personnes) :</h3>
<ul>
<li>500 g de filet de cerf</li>
<li>225 g d'airelles fraîches</li>
<li>500 g de choux de Bruxelles</li>
<li>125 g de sucre</li>
<li>1 cuil. à café de cacao en poudre</li>
<li>50 g de beurre</li>
<li>1 cuil. à soupe d'huile</li>
<li>5 cl de vinaigre de vin</li>
<li>5 cl d'eau-de-vie de fruit</li>
<li>Sel et poivre</li>
<li>Une bouteille de Syrah</li>
</ul>
<h3>Préparation :</h3>
<p>Rincer les airelles et les cuire 15 minutes avec le sucre et l'eau-de-vie. Blanchir les choux 15 minutes à l'eau salée, puis les couper en deux. Assaisonner le filet de sel, poivre et cacao. Dorer la viande 5-6 minutes dans le beurre et l'huile, couvrir partiellement et cuire 10 minutes supplémentaires. Laisser reposer 10 minutes sous papier-alu. Déglacer avec le vinaigre et le coulis d'airelles, ajouter le beurre et les choux.</p>`
  },
  {
    title: "Magret de canard aux figues",
    slug: "magret-figues",
    image: "/blog/magret-figues.jpg",
    category: "recettes",
    excerpt: "Une recette automnale de circonstance en cette période de chasse.",
    content: `<p>En cette période de chasse, nous vous partageons une recette automnale de circonstance. En effet, l'automne et le froid arrive et c'est l'occasion de cuisiner de savoureux et fondants magrets de canard accompagnés de morceaux de figues de saison.</p>
<p><strong>Accord mets-vins :</strong> L'<strong>Humagne Rouge - Maison Rouge</strong> est le vin parfait pour cet accord ! Ses odeurs de baies des bois et d'écorces soulignent la finesse du magret.</p>
<h3>Ingrédients (pour 4 personnes) :</h3>
<ul>
<li>6 figues fraîches</li>
<li>1 magret de canard</li>
<li>2 c à s de miel</li>
<li>Quelques brins de romarin</li>
<li>Sel et poivre</li>
<li>Une bouteille d'Humagne Rouge</li>
</ul>
<h3>Préparation :</h3>
<p>Préchauffer le four à 210°C. Laver et fendre les figues en croix. Entailler la peau du magret. Dans une poêle chaude, cuire le magret côté peau 2 minutes. Retourner et poursuivre 2 minutes. Déposer magret et figues au four avec miel et romarin. Enfourner 7-10 minutes. Laisser reposer 5 minutes avant de trancher finement et servir avec le jus.</p>`
  },
  {
    title: "Velouté châtaigne-foie gras à l'Humagne Blanc",
    slug: "veloute-chataigne",
    image: "/blog/veloute-chataigne.jpg",
    category: "recettes",
    excerpt: "Entrée chic mariant châtaigne, foie gras et Humagne Blanc.",
    content: `<p>Pour une entrée chic mariant avec subtilité châtaigne, foie gras et Humagne Blanc.</p>
<p><strong>Accord mets-vins :</strong> <strong>Humagne Blanc</strong></p>
<h3>Ingrédients (pour 4 personnes) :</h3>
<ul>
<li>10 cl de Humagne Blanc</li>
<li>420 g de châtaigne</li>
<li>50 g de foie gras</li>
<li>1/2 oignon</li>
<li>1/2 sachet d'herbes aromatiques</li>
<li>1 cube de bouillon de volaille</li>
<li>50 cl d'eau</li>
<li>40 cl de crème liquide entière</li>
</ul>
<h3>Recette :</h3>
<p>Pelez et hachez finement le ½ oignon. Dans une casserole, mettez un filet d'huile et faites revenir l'oignon pendant 2-3 mn. Ajoutez les châtaignes, le vin blanc, l'eau, le cube de volaille et le ½ sachet d'herbes aromatiques. Laissez cuire 15 mn à feu doux. Mixez, ajoutez la crème liquide et mixez à nouveau. Répartissez dans des verrines et répartissez le foie gras coupé en petits morceaux.</p>`
  },
  {
    title: "Magret de canard au Cornalin",
    slug: "magret-cornalin",
    image: "/blog/magret-cornalin.jpg",
    category: "recettes",
    excerpt: "Cuisinez un magret de canard au Cornalin pour les fêtes.",
    content: `<p>Moelleux et goûteux, cuisinez un magret de canard au Cornalin pour les fêtes de fin d'année !</p>
<h3>Ingrédients (pour 4 personnes) :</h3>
<ul>
<li>20 cl de Cornalin</li>
<li>2 magrets de canard</li>
<li>4 échalottes</li>
<li>4 cuil. à café de fond de veau</li>
<li>40 cl d'eau</li>
</ul>
<h3>Recette :</h3>
<p>Epluchez les échalotes et coupez-les en petits morceaux.</p>
<p>Mettez 1 c à café d'huile dans une poêle et faites revenir les échalotes pendant 3 à 5 mn.</p>
<p>Ajoutez le vin rouge et laissez réduire de moitié. Ajoutez l'eau, les épices et le fond de veau, mélangez et laissez réduire à feu doux. La sauce doit épaissir un peu et devenir onctueuse. La réserver.</p>
<p>Incisez la peau du magret, la mettre dans une poêle chaude du coté de la peau et cuire quelques minutes avant de retourner pendant 2-3 mn.</p>
<p>Coupez le magret en lamelles et versez un peu de sauce dessus.</p>
<p>Servez le reste de sauce dans une petite coupelle à côté de la viande.</p>`
  },
  {
    title: "Feuilleté de volaille à l'Humagne Blanc",
    slug: "feuillete-volaille",
    image: "/blog/feuillete-volaille.jpg",
    category: "recettes",
    excerpt: "Recette simple en apéritif ou en entrée.",
    content: `<p>Feuilletage de volaille à l'Humagne Blanc, une recette simple à réaliser en apéritif ou en entrée.</p>
<h3>Ingrédients (pour 2 personnes) :</h3>
<ul>
<li>15 cl d'Humagne Blanc</li>
<li>2 grandes bouchées de pâte feuilletée</li>
<li>2 filets de poulet</li>
<li>10 cl de crème liquide</li>
<li>5 g de fécule de maïs</li>
<li>150 g de potiron</li>
<li>Huile d'olive</li>
<li>Sel et poivre</li>
</ul>
<h3>Recette :</h3>
<p>Préchauffer le four à 180°C.</p>
<p>Couper les filets de poulet en petits cubes. Eplucher et couper le potiron en petits dés.</p>
<p>Faire chauffer la pâte feuilletée dans le four préchauffé à 180°C pendant quelques minutes.</p>
<p>Dans une poêle chaude, arroser d'huile d'olive et faire dorer les morceaux de poulet de chaque côté, puis laisser cuire encore 1 minute.</p>
<p>Ajouter ensuite le potiron coupé en dés. Saler et laisser cuire quelques minutes. Déglacer avec l'Humagne Blanc et réduire de moitié.</p>
<p>Ajouter la crème et porter à ébullition. Saler et poivrer, puis ajouter la maïzena et un peu d'eau froide. Faire bouillir jusqu'à l'obtention d'une sauce onctueuse.</p>
<p>Lorsqu'il est chaud, le napper du mélange de crème et le servir immédiatement.</p>`
  },
  {
    title: "Truffes choco - Sion doux",
    slug: "truffes-choco",
    image: "/blog/truffes-choco.jpg",
    category: "recettes",
    excerpt: "Recette incontournable de Noël : les truffes au chocolat.",
    content: `<p>Une recette incontournable de Noël : les truffes au chocolat ! A offrir ou déguster avec une bouteille de Sion doux.</p>
<h3>Ingrédients (pour 6 personnes) :</h3>
<ul>
<li>1 cuil. à soupe de Sion doux</li>
<li>150 g de chocolat noir</li>
<li>50 g de beurre</li>
<li>1 jaune d'oeuf</li>
<li>1 cuil. à soupe de sucre glace</li>
<li>200 ml de crème liquide</li>
<li>Cacao en poudre</li>
</ul>
<h3>Recette :</h3>
<p>Cassez le chocolat en petits morceaux dans une casserole.</p>
<p>Ajoutez le lait et faites fondre la préparation à feu doux. Mélangez avec une spatule en bois pour obtenir une pâte lisse.</p>
<p>Ajoutez le beurre en parcelles et mélangez.</p>
<p>Incorporez le jaune d'œuf puis la crème liquide. Mélangez bien.</p>
<p>Ajoutez le sucre glace et le Sion doux en fouettant.</p>
<p>Versez la pâte dans un saladier et placez au frais pendant au moins 2 heures.</p>
<p>Étalez le cacao dans un grand plat. Prenez une petite quantité de pâte et un peu de cacao pour en former des boules. Reposez les boules aussitôt et gardez au frais.</p>`
  },
  {
    title: "Panna Cotta framboise à l'Humagne Rouge",
    slug: "panna-cotta",
    image: "/blog/panna-cotta.jpg",
    category: "recettes",
    excerpt: "Dessert frais qui enchantera vos convives avec notre Humagne Rouge.",
    content: `<p>Simple et rapide à réaliser, un dessert frais qui enchantera vos convives avec notre Humagne Rouge.</p>
<h3>Ingrédients :</h3>
<ul>
<li>20 cl d'Humagne Rouge</li>
<li>25 cl de crème</li>
<li>30 g de sucre</li>
<li>1 feuille de gélatine</li>
<li>30 g de miel</li>
<li>½ cc de mélange d'épices</li>
<li>100 g de framboises</li>
</ul>
<h3>Recette :</h3>
<p>Caramélisez le miel, puis ajoutez l'Humagne Rouge et les épices. Faites réduire jusqu'à obtenir une consistance sirupeuse, puis laisser refroidir.</p>
<p>Mettez la gélatine à tremper dans de l'eau froide environ 5 minutes.</p>
<p>Faites bouillir la crème avec le sucre puis, hors du feu, ajoutez la gélatine essorée.</p>
<p>Mélangez, puis remplissez des verrines à moitié. Réservez au réfrigérateur pendant 1 h.</p>
<p>Dressez le coulis de vin rouge et les framboises fraîches sur la panna cotta.</p>`
  },
  {
    title: "Risotto del mar au Païen",
    slug: "risotto-paien",
    image: "/blog/risotto.jpg",
    category: "recettes",
    excerpt: "Recette associant notre vin blanc Païen avec les produits de la mer.",
    content: `<p>Une recette inratable et délicieuse pour les fêtes associant notre vin blanc Païen avec les produits de la mer.</p>
<h3>Ingrédients (pour 4 personnes) :</h3>
<ul>
<li>30 cl de Païen</li>
<li>400 g de fruit de mer</li>
<li>150 g de crevette décortiquées</li>
<li>250 g de riz</li>
<li>2 échalotes hachées</li>
<li>2 gousses d'ail haché</li>
<li>1 cuillère à soupe d'aneth haché</li>
<li>1 cuillère à soupe de crème fraîche</li>
<li>3 tomates</li>
<li>75 cl de fumet de poisson</li>
<li>100 g d'oignon émincés</li>
<li>Huile d'olive</li>
<li>Sel et poivre</li>
</ul>
<h3>Recette :</h3>
<p>Dans une cocotte à fond épais, faites sauter le riz dans 2 cuillères à soupe d'huile d'olive jusqu'à ce qu'il devienne translucide.</p>
<p>Ajoutez alors le fumet de poisson et laisser mijoter 20 min en remuant souvent.</p>
<p>Pendant ce temps, faites sauter les oignons, l'ail et l'échalote.</p>
<p>Lorsqu'ils sont dorés, ajoutez les fruits de mer, les crevettes et les tomates. Laissez mijoter 2 min et mouillez de vin blanc Païen. Laisser encore cuire 5 min.</p>
<p>Lorsque le riz est presque cuit, ajoutez les fruits de mer, assaisonnez. Au bout de 5 min ajoutez l'aneth et la crème.</p>
<p>Dégustez chaud.</p>`
  },
  {
    title: "Vin chaud au Merlot",
    slug: "vin-chaud",
    image: "/blog/vin-chaud.jpg",
    category: "recettes",
    excerpt: "Vin chaud parfumé aux épices de Noël, à savourer au coin du feu.",
    content: `<p>Une recette d'un bon vin chaud, parfumé aux épices de Noël, à savourer au coin du feu pour se réchauffer et se détendre.</p>
<h3>Ingrédients :</h3>
<ul>
<li>1 bouteille de Merlot</li>
<li>1 cuil. à café d'épices de Noël</li>
<li>2 cuil. à s. de sucre de canne</li>
<li>1 cuil. à s. de miel</li>
<li>1 filtre à thé</li>
<li>Des rondelles d'orange</li>
</ul>
<h3>Recette :</h3>
<p>Mettez vos épices de Noël dans votre filtre à thé, en laissant un peu d'espace pour que les épices puissent gonfler au cours de leur infusion.</p>
<p>Dans une casserole, versez votre vin, ajoutez vos épices de Noël, le sucre et le miel. Faire chauffer jusqu'à ce que l'ensemble frémisse sans faire bouillir. Poursuivre la cuisson à petits frémissements entre 8 et 15 minutes, en remuant gentiment de temps en temps. Vous sortirez vos épices lorsque votre vin chaud est suffisamment épicé. A partir de 8 minutes, commencez à goûter et prolongez l'infusion selon votre ressenti, par tranche de 2 minutes.</p>
<p>Un vin chaud se boit assez sucré, sinon, ce n'est pas très bon. Pour trouver le bon dosage de sucre et miel, il faut vraiment goûter et rectifier le dosage à la fin de l'infusion d'épices pour avoir la meilleure restitution possible. N'hésitez pas à en remettre si ce n'est pas assez sucré.</p>
<p>Servir aussitôt, bien chaud !</p>`
  },
  {
    title: "Dinde farcie au Pinot Noir de Sierre",
    slug: "dinde-pinot",
    image: "/blog/dinde-pinot.jpg",
    category: "recettes",
    excerpt: "La dinde de Noël revisitée avec une sauce au Pinot noir de Sierre.",
    content: `<p>La fameuse dinde de Noël revisitée avec une sauce au Pinot noir de Sierre.</p>
<h3>Ingrédients (pour 8 personnes) :</h3>
<ul>
<li>75 cl de Pinot noir de Sierre</li>
<li>1 dinde</li>
<li>150 g de beurre</li>
<li>500 g de porc</li>
<li>500 g de veau</li>
<li>4 oeufs</li>
<li>10 cl de crème</li>
<li>1 petite boîte de truffe</li>
<li>80 g de pain</li>
<li>10 cl de lait</li>
<li>3 cl de cognac</li>
<li>3 cl de liqueur de porto</li>
<li>50 g de beurre</li>
<li>50 g de farine</li>
<li>2 gousses d'ail haché</li>
<li>Sel et poivre</li>
</ul>
<h3>Recette :</h3>
<p>Préchauffez le four à 180°C.</p>
<p>Faites tremper le pain de mie dans le lait durant 10 minutes puis essorez-le.</p>
<p>Malaxez le veau et le porc avec la mie de pain, les oeufs et les truffes puis parfumer de porto et de cognac. Salez et poivrez.</p>
<p>Farcissez la dinde puis recoudre l'ouverture pour éviter que la farce ne s'échappe durant la cuisson.</p>
<p>Déposez la dinde dans un plat et l'enduire de beurre.</p>
<p>Enfournez et comptez 30 minutes de cuisson pour 500 g de viande soit 2 heures pour une dinde de 2 kg.</p>
<p>Arrosez régulièrement la dinde de jus de cuisson.</p>
<p>Pendant la cuisson, faites chauffer le Pinot noir de Sierre avec le cognac et le porto. Faites réduire jusqu'à ce que le mélange nappe la cuillère.</p>
<p>Ajoutez le jus de cuisson de la dinde puis le mélange farine beurre pour lier la sauce.</p>
<p>Laissez épaissir sur feu doux et servir avec la dinde.</p>`
  },
  // Événements
  {
    title: "Oenotourisme",
    slug: "oenotourisme-blog",
    image: "/blog/oenotourisme.jpg",
    category: "evenements",
    excerpt: "Envie de découvrir nos vins ? Visiter nos vignobles et nos caves ?",
    content: `<p>Bienvenue à Sion : Envie de découvrir nos vins ? Visiter nos vignobles et nos caves ?</p>
<p>Willkommen in Sion : Wollen Sie unsere Weine degustieren? Unsere Weinberge und unsere Kellereien besuchen ?</p>
<p>Plus d'informations sur <a href="https://www.sionwine.ch/" target="_blank" rel="noopener noreferrer">www.sionwine.ch</a></p>`
  },
  // Vins / Millésimes
  {
    title: "Millésime 2016", slug: "millesime-2016", image: "/blog/millesime-2016.jpg", category: "vins",
    excerpt: "Retour sur le millésime 2016, une année marquée par des conditions climatiques contrastées.",
    content: `<p>Ces vendanges 2016 ont été marquées par des maturités contrastées en fonction des cépages et des situations dans le vignoble, ce qui a rallongé la durée habituelle des vendanges. L'état sanitaire irréprochable du vignoble a permis de récolter des raisins de haute qualité. Après 3 années de faibles récoltes, les quantités encavées sont supérieures à la moyenne décennale.</p>
<p>La première partie de saison fut marquée par des températures plutôt fraîches et des précipitations abondantes. La floraison est ainsi survenue avec une dizaine de jours de retard. Puis les conditions météo du début de l'été ont exigé une vigilance constante des vignerons pour maîtriser les maladies fongiques, notamment le mildiou.</p>
<p>Dès la fin du mois de juillet, des conditions chaudes et particulièrement sèches ont prévalu sur l'ensemble du vignoble. Des conditions qui ont perduré jusqu'aux vendanges qui se sont étalées plus que de coutume en raison de l'hétérogénéité des récoltes.</p>`
  },
  {
    title: "Millésime 2015", slug: "millesime-2015", image: "/blog/millesime-2015.jpg", category: "vins",
    excerpt: "Le millésime 2015, un grand cru solaire aux arômes généreux.",
    content: `<p>Un millésime solaire, avec des teneurs en sucre élevées : 2015 a été caractérisé par un été chaud et un bel automne. Le débourrement a débuté mi-avril, avec un très léger retard. Après un mois de mai particulièrement arrosé, la floraison s'est déroulée début juin, dans des conditions chaudes et humides.</p>
<p>Le temps sec et chaud qui a prévalu en été a fortement limité le développement des maladies, contribuant ainsi au développement d'un feuillage sain. La sécheresse du mois de juillet a permis l'installation d'une contrainte hydrique modérée recherchée en phase de maturation des raisins.</p>
<p>L'accumulation rapide des sucres a entraîné une ouverture précoce des vendanges qui ont bénéficié d'une météo ensoleillée et sèche. Après un millésime 2014 très exigeant en termes de tri, les vignerons ont apprécié, cette année, la très belle qualité des raisins.</p>`
  },
  {
    title: "Millésime 2014", slug: "millesime-2014", image: "/blog/millesime-2014.jpg", category: "vins",
    excerpt: "Le millésime 2014, une année d'élégance et de fraîcheur.",
    content: `<p>Encore une récolte très modeste, même si le Valais a produit un peu plus qu'en 2013. Mais c'est la désormais célèbre drosophile Suzukii qui restera la triste vedette de ce millésime 2014 en exigeant parfois des vignerons un tri sévère à la vendange.</p>
<p>Mais 2014 fut déjà marqué par un été capricieux réclamant une attention de tous les instants pour lutter efficacement contre le développement de maladies comme l'oïdium, et assurer une récolte de qualité.</p>
<p>Encore une fois, les conditions climatiques de septembre et octobre ont été heureusement optimales pour la maturation du raisin et ont favorisé une bonne accumulation des sucres. Les nuits fraîches ont permis de préserver tout le potentiel aromatique du raisin.</p>`
  },
  {
    title: "Millésime 2013", slug: "millesime-2013", image: "/blog/millesime-2013.jpg", category: "vins",
    excerpt: "Le millésime 2013, un millésime tardif aux tanins soyeux.",
    content: `<p>Ce millésime 2013 restera dans les mémoires comme une année tardive avec de très faibles rendements. Printemps maussade et floraison tardive avec son lot de coulure et de millerandage.</p>
<p>Heureusement, juillet et août ont été splendides, hormis quelques violents épisodes orageux accompagnés de grêle localisée. Le mois de septembre a été favorable à la maturation du raisin, offrant notamment de très belles conditions en début et fin de mois.</p>
<p>Les raisins ont mûri lentement, ce qui se traduit positivement sur le potentiel aromatique et phénolique. Quant aux rendements, ils sont les plus faibles enregistrés depuis les années 50.</p>`
  },
  {
    title: "Millésime 2012", slug: "millesime-2012", image: "/blog/millesime-2012.jpg", category: "vins",
    excerpt: "Le millésime 2012, une récolte équilibrée et prometteuse.",
    content: `<p>Ce millésime restera dans les mémoires comme une année viticole difficile. Après un débourrement précoce, le développement de la végétation a stagné durant le mois d'avril. Le mois de mai a été marqué par un gel de printemps qui a touché plus de 150 ha de vignoble.</p>
<p>Les pluies du mois de juin ont favorisé localement la coulure et le millerandage ainsi qu'une pression d'oïdium supérieure à la moyenne. Heureusement, les mois de juillet et août ont permis à la formation des baies de se dérouler dans des conditions optimales et la maturation de la vendange a été lente en automne.</p>
<p>Les quantités récoltées ont été faibles, comparables à 2005. Mais les maturités sont réjouissantes et bien équilibrées.</p>`
  },
  {
    title: "Millésime 2011", slug: "millesime-2011", image: "/blog/millesime-2011.jpg", category: "vins",
    excerpt: "Le millésime 2011, une année précoce aux rendements maîtrisés.",
    content: `<p>Des températures largement supérieures à la normale et un déficit hydrique conséquent ont caractérisé la période de végétation 2011. Une longue période ensoleillée et sèche a permis à la floraison et à la formation des baies de se dérouler de façon optimale dans tous les secteurs du vignoble.</p>
<p>Après un mois de juillet plus frais et plus humide, un épisode de foehn fin août a accéléré la concentration des sucres de certains cépages comme nos pinots noirs, notamment dans les secteurs précoces.</p>
<p>L'essentiel des vendanges, de qualité irréprochable, s'est déroulé courant septembre sous un climat ensoleillé. Résultat : des quantités plus importantes que la moyenne, des sondages bien équilibrés et des raisins d'une belle qualité sanitaire.</p>`
  },
  {
    title: "Millésime 2010", slug: "millesime-2010", image: "/blog/millesime-2010.jpg", category: "vins",
    excerpt: "Le millésime 2010, un millésime classique du Valais.",
    content: `<p>Faible en quantité, mais belles pour ce qui est de l'état sanitaire et des maturités : voilà en trois points résumé le millésime 2010.</p>
<p>Le climat a montré de brusques et importantes variations durant toute la période végétative. Après un mois d'avril marqué par la sécheresse et des températures très élevées, une période fraîche s'est installée durant la première quinzaine de mai. Ce mois a d'ailleurs enregistré trois fois plus de précipitations que la norme sur 30 ans.</p>
<p>Une deuxième vague de fraîcheur s'est manifestée à mi-juin, alors que les vignes de mi-coteau étaient en pleine floraison. La fin de l'été s'est caractérisée par des températures normales. Les conditions clémentes des mois de septembre et d'octobre ont une fois de plus permis de récolter une vendange saine et à maturité optimale. Seul bémol, on l'a dit : les quantités plutôt faibles, comparables à 2007.</p>`
  },
  {
    title: "Millésime 2009", slug: "millesime-2009", image: "/blog/millesime-2009.jpg", category: "vins",
    excerpt: "Le millésime 2009, une année solaire d'une grande richesse aromatique.",
    content: `<p>Une qualité sanitaire exemplaire, des maturités optimales, des quantités supérieures à la moyenne décennale : l'année 2009 est remarquable à tous les niveaux.</p>
<p>Un temps exceptionnel et très sec a régné sans interruption en Valais de la mi-août à la deuxième semaine d'octobre. Ces conditions idéales ont permis de récolter des grappes d'une qualité sanitaire irréprochable. Qui plus est, dans des quantités bien supérieures à la moyenne, et des raisins avouant des taux de sucre importants.</p>`
  },
  {
    title: "Millésime 2008", slug: "millesime-2008", image: "/blog/millesime-2008.jpg", category: "vins",
    excerpt: "Le millésime 2008, une année fraîche aux vins structurés et fins.",
    content: `<p>Magnifique ! Une épithète suffit à résumer l'impression générale au terme des vendanges 2008. Les producteurs valaisans expriment leur satisfaction qui résonne comme un « Ouf ! » de soulagement. Quelques semaines plus tôt, les visages étaient fermés, les mines inquiètes, à l'évocation de la récolte à venir.</p>
<p>Le temps mitigé de septembre avait favorisé l'apparition de quelques foyers de pourriture. Mais une météo idéale a permis de corriger le tir. Les vignerons ont d'abord pu compter sur quelques jours frais et venteux qui ont séché les baies atteintes. L'été indien, long et magnifique a fait le reste.</p>
<p>En terme de quantité, la récolte est plutôt modeste. En termes de qualité, c'est bien mieux. Contrairement aux années très chaudes et précoces, les baies ont pu atteindre une maturité phénolique idéale puisque les taux de sucre ont mis plus de temps à arriver aux seuils souhaités.</p>`
  },
  {
    title: "Millésime 2007", slug: "millesime-2007", image: "/blog/millesime-2007.jpg", category: "vins",
    excerpt: "Le millésime 2007, un cru précoce aux notes fruitées intenses.",
    content: `<p>Pour les viticulteurs valaisans, 2007 aura été une année exigeante. Ils ont dû lutter contre des conditions climatiques pas toujours favorables. Le débourrement a été rapide et les températures exceptionnellement hautes d'avril ont favorisé une floraison très précoce.</p>
<p>Un début d'été maussade et un mois d'août pluvieux ont fortement ralenti le cycle végétatif. Et il a fallu veiller au grain pour éviter les maladies fongiques. Heureusement, les vignerons ont pu compter sur un mois de septembre exceptionnel pour achever la maturation de la récolte.</p>
<p>Au bilan, un excellent état sanitaire du raisin et des teneurs en sucre naturel dans une bonne moyenne. Les quantités sont en revanche plutôt modestes et se situent bien au-dessous de la moyenne décennale.</p>`
  },
  {
    title: "Millésime 2006", slug: "millesime-2006", image: "/blog/millesime-2006.jpg", category: "vins",
    excerpt: "Le millésime 2006, une année chaude aux vins concentrés et puissants.",
    content: `<p>Après un mois d'août humide, une fois de plus, le microclimat particulier à la vallée du Rhône a permis aux vignerons du canton de vendanger dans d'excellentes conditions.</p>
<p>Les vendanges se sont déroulées par un temps généralement sec, avec de longues périodes de foehn, qui ont rapidement séché les quelques gouttes de pluie tombées durant cette période. La récolte a ainsi échappé à la pourriture grise, impitoyable dans les cantons voisins.</p>
<p>Les maturités, la qualité et l'état sanitaire des raisins laissent présager un millésime remarquable. La quantité de raisins récoltés se situe autour de la moyenne et les teneurs en sucre sont élevées.</p>`
  },
  {
    title: "Millésime 2005", slug: "millesime-2005", image: "/blog/millesime-2005.jpg", category: "vins",
    excerpt: "Le millésime 2005, un grand millésime d'exception pour le Valais.",
    content: `<p>De magnifiques maturités, des acidités remarquables : le millésime 2005 fait la synthèse des qualités des deux récoltes qui l'ont précédé. Ces vendanges – petites en quantité – ne font pas mentir l'adage qui veut que les années terminées par 5 permettent d'élever des vins splendides.</p>
<p>Les vendanges se sont déroulées dans des conditions exceptionnelles, sous un magnifique soleil d'automne que bien peu de nuages et de très rares pluies sont venus perturber.</p>
<p>Ce millésime devrait rester dans les mémoires comme celui de l'équilibre entre maturité et acidité, équilibre gage d'une récolte de haut niveau qualitatif.</p>`
  },
  {
    title: "Millésime 2004", slug: "millesime-2004", image: "/blog/millesime-2004.jpg", category: "vins",
    excerpt: "Le millésime 2004, une année de caractère aux vins bien charpentés.",
    content: `<p>Maturité idéale, excellent état sanitaire, quantité correspondant à la moyenne décennale, maîtrise de la production de chasselas et nette progression des spécialités : voilà en quelques mots le bilan de l'année 2004.</p>
<p>En terme de climat, la période viticole peut être qualifiée de favorable puisque sèche, assez chaude, avec notamment un très beau mois de septembre. Et les stades phénologiques de développement de la vigne ont été réguliers, du débourrement à la vendange et avec une bonne maîtrise des rendements, même les cépages à haute exigence qualitative ont pu être récoltés dans des conditions optimales et à parfait degré de maturation.</p>`
  },
];

export default BLOG_POSTS;
