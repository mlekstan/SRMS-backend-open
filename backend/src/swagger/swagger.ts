import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";
import { SWAGGER_CUSTOM_OPTIONS } from "./swagger.config";


export function createDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("SRMS REST API docs")
    .setDescription("Sales and Rental Management System REST API documentation")
    .setVersion("1.0")
    .addServer("https://127.0.0.1:3000", "For web app")
    .addServer("http://127.0.0.1:3001", "For mobile app")
    .setExternalDoc("Reference", "http://127.0.0.1:8090")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, SWAGGER_CUSTOM_OPTIONS);
}