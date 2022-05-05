import { container } from '@config';
import { createLogger, format, transports } from 'winston';

const { combine, printf, errors } = format;

const myFormat = printf(info => {
  const sym: string = Symbol.for('splat') as unknown as string;
  const splat = info[sym];

  if (splat) {
    return `[${info.level}] ${info.message} - meta: ${JSON.stringify(splat[0])}`;
  }
  return `[${info.level}] ${info.message} `;
});

export const logger = createLogger({
  exitOnError: false,
  levels: {
    debug: 4,
    info: 3,
    silly: 2,
    warn: 1,
    error: 0,
  },
  format: combine(myFormat, errors({ stack: true })),
  transports: [
    new transports.Console({
      level: container.logger.level,
      handleExceptions: true,
      stderrLevels: ['error', 'warning'],
    }),
  ],
});
