import createPino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

export const logger = createPino({
  level: process.env.LOG_LEVEL || 'info',
  ...(isProd
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
      }),
});

export default logger;
