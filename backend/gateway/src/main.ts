import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { FastifyInstance } from "fastify";
import { AppModule } from "./app.module";

(async () => {
	const app = await NestFactory.create(AppModule, new FastifyAdapter());
	const logger = new Logger("HTTP");

	const fastifyInstance: FastifyInstance = app.getHttpAdapter().getInstance();

	fastifyInstance.addHook("onRequest", (request, _reply, done) => {
		logger.log(`${request.method} ${request.url}`);
		done();
	});

	await app.listen(process.env.PORT ?? 8080, "0.0.0.0");
})();
