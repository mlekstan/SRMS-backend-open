import { SwaggerCustomOptions } from "@nestjs/swagger";

export const SWAGGER_CUSTOM_OPTIONS: SwaggerCustomOptions = {
  customSiteTitle: "SRMS REST API docs",
  swaggerOptions: {
    persistAuthorization: true,
    filter: true,
    displayRequestDuration: true,
    docExpansion: 'none',
  }
}