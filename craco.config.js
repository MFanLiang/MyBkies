/* craco.config.js */

const CracoLessPlugin = require("craco-less")

module.exports = {

	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: { '@primary-color': '#f9c700' },
						javascriptEnabled: true,
					},
				},
			},
		},
	],

	devServer: {
		port: 9090
	}
};