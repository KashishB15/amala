"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ disableErrorMessages: false }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Customers API')
        .setDescription('A REST API using Nestjs to create CRUD operations on Customer table')
        .setVersion('1.0')
        .addTag('customers')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(7000);
}
bootstrap();
//# sourceMappingURL=main.js.map