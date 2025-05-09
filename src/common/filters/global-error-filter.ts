import { Catch, HttpException, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { appConfig } from 'src/config';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GraphQLExceptionFilter.name);

  catch(exception: unknown) {
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let message: string | object;
    if (exception instanceof HttpException) {
      message = exception.getResponse();
    } else {
      message = 'Internal Server Error';
    }

    if (appConfig.NODE_ENV !== 'production') {
      this.logger.error(
        'Error details:',
        exception instanceof Error ? exception.stack : message,
      );
    }

    throw new GraphQLError(
      typeof message === 'string'
        ? message
        : (message as any).message || 'GraphQL Error',
      {
        extensions: {
          code:
            exception instanceof HttpException
              ? 'HTTP_EXCEPTION'
              : 'INTERNAL_SERVER_ERROR',
          details: message,
          statusCode: status,
        },
      },
    );
  }
}
