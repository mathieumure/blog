module.exports = {
    title: "Mathieu Mure",
    description: "Je fais des trucs",
    dest: 'docs',
    themeConfig: {
        // if your docs are not at the root of the repo:
        docsDir: 'src',
        sidebar: 'auto',
        nav: [
            { text: 'Recettes', link: '/recettes/', target:'_self', rel:'' },
        ],
    }
};