export default {
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    plugins: ["@trivago/prettier-plugin-sort-imports"],
    importOrder: [
        /* Built-in modules */
        "^(node:)?(fs|path|url)$",

        /* External packages */
        "^[a-z]",
        "^@?\\w",

        "^((\\.\\.\\/)+|\\.\\/)(src|types)",
        "^((\\.\\.\\/)+|\\.\\/)(client)",

        "^[./]"
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    overrides: [
        {
            files: "package.json",
            options: {
                tabWidth: 2
            }
        }
    ]
};
