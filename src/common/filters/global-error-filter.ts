import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isGraphQL = request.url.includes('/graphql');

    const status =
      exception instanceof HttpException ? Number(exception.getStatus()) : 500;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    if (isGraphQL) {
      throw new GraphQLError(
        typeof message === 'string'
          ? message
          : (message as any).message || 'GraphQL Error',
        {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            details: message,
          },
        },
      );
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }
}
