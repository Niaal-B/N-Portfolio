import {

  remix({
    routes(defineRoutes) {
      return defineRoutes(route => {
        route('/', 'routes/home/route.js', { index: true });
      });
    },
  }),
  jsconfigPaths(),
  ],
});
