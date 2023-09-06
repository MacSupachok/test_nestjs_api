import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger (app: INestApplication) {
    const options = new DocumentBuilder()
    .setTitle('Test NestJS API Authentication.')
    .setDescription("Test API for signup login and getuser.")
    .setVersion('1.0')
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
}