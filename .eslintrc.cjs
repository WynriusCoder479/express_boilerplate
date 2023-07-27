module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'eslint-plugin-prettier',
		'prettier'
	],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.cjs'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'prettier/prettier': [
			'error',
			{
				arrowParens: 'avoid',
				bracketSameLine: false,
				bracketSpacing: true,
				endOfLine: 'lf',
				useTabs: true,
				tabWidth: 2,
				printWidth: 80,
				editorconfig: true,
				singleQuote: true,
				trailingComma: 'none',
				semi: false,
				quoteProps: 'as-needed'
			}
		]
	}
}
