import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { INestApplication } from "@nestjs/common";


export function createDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("SRMS REST API docs")
    .setDescription("Sales and Rental Management System REST API documentation")
    .setVersion("1.0")
    .addServer("https://127.0.0.1:3000", "For web app")
    .addServer("http://127.0.0.1:3001", "For mobile app")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT"
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}