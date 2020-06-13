// import {ApplicationConfig, LbDemoApplication} from './application';

// export * from './application';

// export async function main(options: ApplicationConfig = {}) {
//   const app = new LbDemoApplication(options);
//   await app.boot();
//   await app.start();

//   const url = app.restServer.url;
//   console.log(`Server is running at ${url}`);
//   console.log(`Try ${url}/ping`);

//   return app;
// }

// if (require.main === module) {
//   // Run the application
//   const config = {
//     rest: {
//       port: +(process.env.PORT ?? 3000),
//       host: process.env.HOST,
//       // The `gracePeriodForClose` provides a graceful close for http/https
//       // servers with keep-alive clients. The default value is `Infinity`
//       // (don't force-close). If you want to immediately destroy all sockets
//       // upon stop, set its value to `0`.
//       // See https://www.npmjs.com/package/stoppable
//       gracePeriodForClose: 5000, // 5 seconds
//       openApiSpec: {
//         // useful when used with OpenAPI-to-GraphQL to locate your application
//         setServersFromRequest: true,
//       },
//     },
//   };
//   main(config).catch(err => {
//     console.error('Cannot start the application.', err);
//     process.exit(1);
//   });
// }
import {LbDemoApplication} from './application';
import {ApplicationConfig, ExpressServer} from './server';

export {ApplicationConfig, ExpressServer, LbDemoApplication};

export async function main(options: ApplicationConfig = {}) {
  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
  console.log('Server is running at http://127.0.0.1:3000');
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST ?? 'localhost',
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      // Use the LB4 application as a route. It should not be listening.
      listenOnStart: false,
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
