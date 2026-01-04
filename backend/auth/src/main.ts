import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import path from "node:path";

(async () => {
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.GRPC,
		options: {
			package: "auth",
			protoPath: path.join(__dirname, "proto/auth.proto"),
			url: "0.0.0.0:50000",
		},
	});

	await app.listen();
})();
