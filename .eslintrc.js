const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: [
      path.resolve(__dirname, './tsconfig.json'),
    ],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module"
  },

  env: {
    browser: true,
    node: true,
    es6: true
  },

  plugins: [
    "@typescript-eslint",
    "import",
    "prettier",
    "react-hooks",
    "simple-import-sort"
  ],

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/electron",
    "eslint-config-airbnb-base",
    "eslint-config-airbnb/rules/react",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",
    "prettier/standard"
  ],

  settings: {
    react: {
      version: "detect"
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      {
        name: "Link",
        linkAttribute: "to"
      }
    ],
    "import/extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ],
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx"
      ]
    },
    "import/resolver": {
      "typescript": {},
      node: {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },

  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**', 'test/**'],
      env: {
        "jest/globals": true
      },
      plugins: [
        "jest", 
        "jest-formatting"
      ],
      extends: [
        "plugin:jest/recommended", 
        "plugin:jest-formatting/recommended"
      ],
      rules: {
        "import/no-extraneous-dependencies": [
          "error", { "devDependencies": true }
        ]
      }
    },
  ],

  rules: {
    "prettier/prettier": "error",
    "simple-import-sort/sort": "error",

    // TypeScript's `noFallthroughCasesInSwitch` option is more robust
    "default-case": "off",
    // 'tsc' already handles this
    "no-dupe-class-members": "off",
    // 'tsc' already handles this
    "no-undef": "off",

    // Add TypeScript specific rules (and turn off ESLint equivalents)
    '@typescript-eslint/consistent-type-assertions': 'warn',
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'warn',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/restrict-template-expressions': ['error', {allowAny: true}],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'warn',

    // Misc
    "radix": "off",
    "no-nested-ternary": "off",
    "no-shadow": "off",
    "consistent-return": "off",
    "camelcase": ["error", {"properties": "always"}],
    "import/prefer-default-export": "off",
    "import/extensions": ["error", "never"],
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      {
        "props": "never",
        "children": "ignore"
      }
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".tsx"
        ]
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true
      }
    ],
    "@typescript-eslint/prefer-optional-chain": "error",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": ["error"]
  }
}