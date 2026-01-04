import path from "node:path";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from "./proto/auth";

@Module({
	imports: [
		ConfigModule.forRoot(),
		ClientsModule.register([
			{
				name: AUTH_SERVICE_NAME,
				transport: Transport.GRPC,
				options: {
					package: AUTH_PACKAGE_NAME,
					protoPath: path.join(__dirname, "proto/auth.proto"),
					url: "auth:50000",
				},
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
