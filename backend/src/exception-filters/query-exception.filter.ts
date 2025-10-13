import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter{
  // Some of Postge SQL codes: https://www.postgresql.org/docs/current/errcodes-appendix.html
  private sqlCodes: Record<string, { status: number; message: string }> = {
    "00": { status: HttpStatus.OK, message: "Successful completion" },
    "01": { status: HttpStatus.NO_CONTENT, message: "No data" },
    "02": { status: HttpStatus.NOT_FOUND, message: "No data found" },
    "03": { status: HttpStatus.BAD_REQUEST, message: "SQL statement not yet complete" },
    "08": { status: HttpStatus.SERVICE_UNAVAILABLE, message: "Database connection error" },
    "09": { status: HttpStatus.BAD_REQUEST, message: "Triggered action exception" },
    "0A": { status: HttpStatus.NOT_IMPLEMENTED, message: "Feature not supported" },
    "22": { status: HttpStatus.BAD_REQUEST, message: "Invalid input data" },
    "23": { status: HttpStatus.CONFLICT, message: "Integrity constraint violation" },
    "25": { status: HttpStatus.CONFLICT, message: "Invalid transaction state" },
    "28": { status: HttpStatus.UNAUTHORIZED, message: "Authorization failure" },
    "40": { status: HttpStatus.CONFLICT, message: "Transaction rollback or deadlock" },
    "42": { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "SQL syntax or schema error" },
    "53": { status: HttpStatus.SERVICE_UNAVAILABLE, message: "Insufficient resources" },
    "54": { status: HttpStatus.SERVICE_UNAVAILABLE, message: "Program limit exceeded" },
    "55": { status: HttpStatus.SERVICE_UNAVAILABLE, message: "Object in use or lock issue" },
    "57": { status: HttpStatus.SERVICE_UNAVAILABLE, message: "Operation cancelled" },
    "58": { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "System error" },
    "F0": { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Configuration file error" },
    "P0": { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "PL/pgSQL runtime error" },
    "XX": { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal PostgreSQL error" },
  };
  
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { code, detail, error: info }: { code: string, detail: string, error: string } = exception.driverError as any;
    const codePrefix = code.slice(0, 2);

    const errorProps = this.sqlCodes[codePrefix] || { status: HttpStatus.INTERNAL_SERVER_ERROR, message: "Unexpected database error" };

    response
      .status(errorProps.status)
      .json({
        code: code,
        message: errorProps.message,
        detail: `${info} -> ${detail}`,
        path: request.url,
      })
     
  }
}