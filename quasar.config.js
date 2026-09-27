const { configure } = require('quasar/wrappers')

const publicPath = process.env.GITHUB_PAGES
  ? '/quasar-pwa-countries/'
  : '/paises/'

module.exports = configure(() => ({
  eslint: {
    warnings: true,
    errors: true
  },

  css: ['app.scss'],
  extras: ['roboto-font', 'material-icons'],

  build: {
    target: {
      browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
      node: 'node22'
    },
    vueRouterMode: 'hash',
    publicPath
  },

  devServer: {
    open: true
  },

  framework: {
    config: {},
    plugins: []
  },

  animations: [],

  sourceFiles: {
    pwaRegisterServiceWorker: 'src-pwa/register-service-worker'
  },

  pwa: {
    workboxMode: 'GenerateSW',
    injectPwaMetaTags: true,
    swFilename: 'sw.js',
    manifestFilename: 'manifest.json',
    useCredentialsForManifestTag: false,
    extendGenerateSWOptions(config) {
      config.skipWaiting = true
      config.clientsClaim = true
      config.runtimeCaching = [
        {
          urlPattern: /^https:\/\/countries\.dev\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-countries'
          }
        },
        {
          urlPattern: /^https:\/\/flagcdn\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'flags',
            expiration: {
              maxEntries: 100
            }
          }
        }
      ]
    },
    extendManifestJson(manifest) {
      manifest.name = 'PWA Countries - demo'
      manifest.short_name = 'Countries-pwa'
      manifest.display = 'standalone'
      manifest.orientation = 'portrait'
      manifest.background_color = '#ffffff'
      manifest.theme_color = '#027be3'
      manifest.start_url = publicPath
      manifest.scope = publicPath
      manifest.version = '1.0'
    }
  }
}))
