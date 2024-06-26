const server = require("./server");
const User = require("./src/repository/user");

const validate = async (decoded, request, h) => {
  let user = await User.findOne(decoded.id, request.logger);
  if (user) {
    global.user = user
    return { isValid: true };
  } else {
    return { isValid: false };
  }
};

const generateDataToSensors = () => {
  const virtualSensors = require('./src/helpers/virtual_sensors');
  const cron = require('node-cron');

  cron.schedule('*/30 * * * *', () => {
    virtualSensors.randomizer(server)
  });
};

(async () => {
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      logPayload: true,
      mergeHapiLogData: true,
      ignorePaths: ['/alive.txt', '/private'],
      ignoreFunc: (options, request) => request.path.startsWith('/private'),
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          minimumLevel: 'info',
          levelFirst: true,
          messageFormat: true,
          timestampKey: 'time',
          translateTime: true,
          singleLine: false,
          mkdir: true,
          append: true,
          hideObject: true
        }
      }
    }
  });

  await server.register({
    plugin: require("@hapi/inert"),
    options: {}
  });

  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt', { key: process.env.JWT_SECRET, validate });

  server.auth.default('jwt');

  await server.start();
  server.logger.info(`Server listening: ${server.info.uri}`);

  generateDataToSensors();
})();