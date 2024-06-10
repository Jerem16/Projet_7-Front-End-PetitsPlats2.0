export const recipes = [
    {
        id: 1,
        image: "Recette01.webp",
        name: "Limonade de Coco",
        servings: 1,
        ingredients: [
            {
                ingredient: "Lait de coco",
                quantity: 400,
                unit: "ml",
            },
            {
                ingredient: "Jus de citron",
                quantity: 2,
            },
            {
                ingredient: "Crème de coco",
                quantity: 2,
                unit: "cuillères à soupe",
            },
            {
                ingredient: "Sucre",
                quantity: 30,
                unit: "grammes",
            },
            {
                ingredient: "Glaçons",
            },
        ],
        time: 10,
        description:
            "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
        appliance: "Blender",
        utensils: ["cuillère à Soupe", "verres", "presse citron"],
    },
    {
        id: 2,
        image: "Recette02.webp",
        name: "Poisson Cru à la tahitienne",
        servings: 2,
        ingredients: [
            {
                ingredient: "Thon Rouge (ou blanc)",
                quantity: 200,
                unit: "grammes",
            },
            {
                ingredient: "Concombre",
                quantity: 1,
            },
            {
                ingredient: "Tomate",
                quantity: 2,
            },
            {
                ingredient: "Carotte",
                quantity: 1,
            },
            {
                ingredient: "Citron Vert",
                quantity: 5,
            },
            {
                ingredient: "Lait de Coco",
                quantity: 100,
                unit: "ml",
            },
        ],
        time: 60,
        description:
            "Découper le thon en dés, mettre dans un plat et recouvrir de jus de citron vert (mieux vaut prendre un plat large et peu profond). Laisser reposer au réfrigérateur au moins 2 heures. (Si possible faites-le le soir pour le lendemain. Après avoir laissé mariner le poisson, coupez le concombre en fines rondelles sans la peau et les tomates en prenant soin de retirer les pépins. Rayer la carotte. Ajouter les légumes au poissons avec le citron cette fois ci dans un Saladier. Ajouter le lait de coco. Pour ajouter un peu plus de saveur vous pouvez ajouter 1 à 2 cuillères à soupe de Crème de coco",
        appliance: "Saladier",
        utensils: ["presse citron"],
    }
];
