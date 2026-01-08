import { Product, GlossaryItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Baume de suif pour le visage à la calendula',
    category: 'Visage & Corps',
    price: 'à partir de 18',
    description: "Notre baume de suif pour le visage est formulé à partir de suif de bœuf biologique nourri à l'herbe, purifié à la main et infusé à la fleur de calendula biologique pour nourrir et protéger la peau. Enrichi d’huile de rose musqué, ce soin offre une hydratation profonde qui imite la structure naturelle de la peau.",
    ingredients: ['Suif de bœuf bio', 'Huile de rose musquée', 'Macérat de calendula bio', 'Huile de jojoba'],
    image: '/images/baume-visage-calendula.jpg',
    options: [
      { label: '15g', price: 18 },
      { label: '30g', price: 30 }
    ],
    inci: "Tallow, Simmondsia Chinensis (Jojoba) Seed Oil*, Rosa Canina Fruit Oil*, Calendula Officinalis Flower*, Cera Alba (Beeswax)*, Tocopherol.\n* Ingredients issus de l’agriculture biologique"
  },
  {
    id: '2',
    name: 'Baume de suif pour le corps à la rose et lavande',
    category: 'Visage & Corps',
    price: 'à partir de 22',
    description: "Élaboré à partir de suif de bœuf biologique nourri à l'herbe, purifié artisanalement et infusé de fleurs de rose et de lavande biologiques. Sa texture riche procure une hydratation profonde, tout en respectant l'équilibre naturel de la peau.",
    ingredients: ['Suif de boeuf bio', 'Huile de jojoba bio', 'Huile de ricin bio', 'Fleurs de rose et lavande bio'],
    image: '/images/baume-corps-rose-lavande.jpg',
    options: [
      { label: '30g', price: 22 },
      { label: '60g', price: 40 }
    ],
    inci: "Tallow, Simmondsia Chinensis (Jojoba) Seed Oil*, Ricinus Communis (Castor) Seed Oil*, Rosa Damascena Flower*, Lavandula Angustifolia (Lavender) Flower*, Maranta Arundinacea Root Powder, Tocopherol, Parfum (Essential Oil Blend).\n* Ingredients issus de l’agriculture biologique"
  },
  {
    id: '3',
    name: 'Baume à Lèvres',
    category: 'Soin des Lèvres',
    price: 'Bientôt disponible',
    description: 'Une protection onctueuse pour vos lèvres, déclinée en plusieurs saveurs botaniques. Nos baumes sont conçus à la main avec des beurres végétaux précieux et de la cire d\'abeille locale pour une nutrition intense. Ce produit sera bientôt disponible.',
    ingredients: ['Beurre de mangue', 'Beurre de kokum', 'Huile de ricin bio', 'Cire d\'abeille bio'],
    image: '/images/baume-levres.jpg',
    inci: "Le Naturel\nINCI: Mangifera Indica (Mango) Seed Butter, Garcinia Indica (Kokum) Seed Butter, Ricinus Communis (Castor) Seed Oil*, Cera Alba (Beeswax)*\n\nMenthe\nINCI: Mangifera Indica (Mango) Seed Butter, Garcinia Indica (Kokum) Seed Butter, Ricinus Communis (Castor) Seed Oil*, Mentha Piperita (Peppermint) Leaf*, Cera Alba (Beeswax)*, Parfum (Essential Oil Blend)\n\nZeste de café\nINCI: Mangifera Indica (Mango) Seed Butter, Garcinia Indica (Kokum) Seed Butter, Ricinus Communis (Castor) Seed Oil, Cera Alba (Beeswax), Vanilla Planifolia Fruit, Coffea Arabica (Coffee) Seed*, Citrus Sinensis Peel Oil Expressed\n\n* Ingredients issus de l’agriculture biologique"
  },
  {
    id: '4',
    name: 'Huile Élixir',
    category: 'Visage & Corps',
    price: 'à partir de 28',
    description: 'Nos élixirs pour le visage sont des soins concentrés, formulés à partir d’huiles végétales soigneusement sélectionnées et infusées de plantes reconnues pour leurs bienfaits cutanés. Chaque élixir est conçu pour nourrir la peau en profondeur, soutenir la barrière cutanée et rétablir l’équilibre naturel du teint. Ce produit est actuellement en cours de développement et plus de détails suivront.',
    ingredients: ['Huile végétales biologiques', 'Plantes biologiques'],
    image: '/images/huile-elixir.jpg',
    options: [
      { label: '15ml', price: 28 },
      { label: '30ml', price: 49 }
    ]
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    name: "Huile de Jojoba",
    inci: "Simmondsia Chinensis Seed Oil",
    description: "Une cire liquide dont la structure moléculaire est la plus proche du sébum humain. Elle hydrate sans boucher les pores et aide à réguler la production d'huile naturelle de la peau."
  },
  {
    name: "Huile de Ricin",
    inci: "Ricinus Communis Seed Oil",
    description: "Riche en acide ricinoléique, elle possède des propriétés anti-inflammatoires et antibactériennes. Elle est idéale pour nourrir intensément les zones très sèches et renforcer les cils et sourcils."
  },
  {
    name: "Huile de Rose Musquée",
    inci: "Rosa Canina Fruit Oil",
    description: "Exceptionnellement riche en acides gras essentiels (oméga 3, 6, 9) et en vitamines A et C. Elle favorise la régénération cellulaire, atténue les cicatrices et illumine le teint."
  },
  {
    name: "Vitamine E",
    inci: "Tocopherol",
    description: "Un puissant antioxydant naturel qui protège les cellules contre les radicaux libres et previent l'oxydation des huiles végétales dans nos formules, tout en prolongeant l'hydratation cutanée."
  },
  {
    name: "Squalane",
    inci: "Squalane",
    description: "Un émollient stable dérivé de l'olive. Il pénètre rapidement sans fini gras, restaure la souplesse de la peau et protège la barrière d'hydratation."
  },
  {
    name: "Pétales de Rose",
    inci: "Rosa Centifolia Flower",
    description: "Utilisées en infusion or macérat, elles apaisent les rougeurs, tonifient les tissus et apportent une fragrance naturelle délicate aux vertus calmantes."
  },
  {
    name: "Pétales de Lavande",
    inci: "Lavandula Angustifolia Flower",
    description: "Reconnues pour leurs propriétés cicatrisantes et antiseptiques. Elles aident à calmer l'esprit et la peau, particulièrement après une exposition aux éléments."
  },
  {
    name: "Huile d'Abricot",
    inci: "Prunus Armeniaca Kernel Oil",
    description: "Une huile légère qui redonne éclat et tonus aux peaux ternes et fatiguées. Très pénétrante, elle adoucit la peau sans laisser de film occlusif."
  },
  {
    name: "Coenzyme Q10",
    inci: "Ubiquinone",
    description: "Un actif anti-âge puissant qui protège la peau contre le stress oxydatif et aide à maintenir la fermeté en stimulant la production de collagène."
  },
  {
    name: "Poudre d'Arrow-root",
    inci: "Maranta Arundinacea Root Powder",
    description: "Utilisée dans nos baumes pour créer une texture soyeuse et non-grasse. Elle aide à absorber l'excess d'humidité sans dessécher la peau."
  },
  {
    name: "Calendula",
    inci: "Calendula Officinalis Flower Extract",
    description: "La plante amie des peaux sensibles. Elle possède des vertus cicatrisantes exceptionnelles, apaise les irritations et soutient la réparation tissulaire."
  },
  {
    name: "Cire d'Abeille",
    inci: "Cera Alba",
    description: "Forme une barrière protectrice légère sur la peau pour emprisonner l'hydratation tout en laissant respirer les pores. Elle donne également leur texture onctueuse à nos baumes."
  }
];

export const SYSTEM_INSTRUCTION = "Vous êtes l'assistant botanique d'Espace Naturaē, une marque québécoise de soins artisanaux à base de suif et d'ingrédients naturels. Votre rôle est de conseiller les clients sur les rituels de soin, les bienfaits du suif de bœuf bio, et d'orienter vers les produits de la gamme : Baume de suif (visage/corps), Baume à lèvres, et Huile Élixir. Soyez bienveillant, expert et utilisez un ton naturel et épuré.";