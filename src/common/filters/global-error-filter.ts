import { Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Request } from 'express';
import { appConfig } from 'src/config';

type ExceptionResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  [key: string]: any;
};

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // First check if this is a GraphQL request
    const isGraphQL = this.isGraphQLRequest(host);

    if (isGraphQL) {
      return this.handleGraphQLError(exception, host);
    }

    // If it's not GraphQL, let NestJS handle it normally
    return exception;
  }

  private isGraphQLRequest(host: ArgumentsHost): boolean {
    try {
      const gqlHost = GqlArgumentsHost.create(host);
      const info = gqlHost.getInfo();
      return !!info;
    } catch (e) {
      return false;
    }
  }

  private handleGraphQLError(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (exception instanceof GraphQLError) {
      return exception;
    }

    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, request);
    }

    if (exception instanceof Error) {
      return this.handleError(exception, request);
    }

    return this.handleUnknownError(exception, request);
  }

  private handleHttpException(exception: HttpException, request: Request) {
    const status = exception.getStatus();
    const response = exception.getResponse() as ExceptionResponse;
    const message = this.extractErrorMessage(response);

    return new GraphQLError(message, {
      extensions: {
        code: 'HTTP_EXCEPTION',
        statusCode: status,
        details: response,
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
    });
  }

  private handleError(error: Error, request: Request) {
    return new GraphQLError('Internal Server Error', {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        details:
          appConfig.NODE_ENV !== 'production'
            ? {
                message: error.message,
              }
            : undefined,
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
    });
  }

  private handleUnknownError(exception: unknown, request: Request) {
    return new GraphQLError('Internal Server Error', {
      extensions: {
        code: 'UNKNOWN_ERROR',
        statusCode: 500,
        details:
          appConfig.NODE_ENV !== 'production'
            ? {
                rawError: JSON.stringify(exception),
              }
            : undefined,
        timestamp: new Date().toISOString(),
        path: request?.url,
      },
    });
  }

  private extractErrorMessage(response: ExceptionResponse): string {
    if (typeof response === 'string') {
      return response;
    }

    if (Array.isArray(response.message)) {
      return response.message.join(', ');
    }

    return response.message || response.error || 'Unexpected error occurred';
  }
}
