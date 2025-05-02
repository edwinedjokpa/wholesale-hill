import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: unknown) {
    let message = 'Internal Server Error';
    let details = '';

    if (exception instanceof Error) {
      message = exception.message || message;
      details = exception.stack || details;
    }

    throw new GraphQLError(message, {
      extensions: {
        code: 'INTERNAL_SERVER_ERROR',
        details,
      },
    });
  }
}
