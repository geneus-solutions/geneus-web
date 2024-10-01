export const menuItems = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Courses",
        path: "/courses",
    },
    {
        title: "Services",
        submenu: [
            {
                title: "Courses",
                path: "/courses",
            },
            {
                title: "NutriFit",
                submenu: [
                    {
                        title: "NutriFit Details",
                        path: "/nutrifit",
                    },
                ],
            },
        ],
    },
    {
        title: "Nutritional",
        path: "/nutritional",
    },
    {
        title: "Contact Us",
        path: "/contact",
    },
];
