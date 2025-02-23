import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin,
} from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module "@remix-run/cloudflare" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    hydrogen(),
    cloudflareDevProxyVitePlugin({
      getLoadContext,
    }),
    remix({
      presets: [hydrogen.preset()],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    resolve: {
      conditions: ["workerd", "worker", "browser"],
    },
  },
  resolve: {
    mainFields: ["browser", "module", "main"],
  },
  build: {
    assetsInlineLimit: 0,
    minify: true,
  },
  optimizeDeps: {
    include: [
      'clsx',
      '@headlessui/react',
      'typographic-base',
      'react-intersection-observer',
      'react-use/esm/useScroll',
      'react-use/esm/useDebounce',
      'react-use/esm/useWindowScroll',
    ],
  },
});