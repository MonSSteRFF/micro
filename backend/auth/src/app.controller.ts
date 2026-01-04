import { Controller, Get } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { AUTH_SERVICE_NAME } from "./proto/auth";

interface PingRequest {
	message: string;
}
interface PingResponse {
	message: string;
}

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@GrpcMethod(AUTH_SERVICE_NAME, "Ping")
	ping(data: PingRequest): PingResponse {
		return { message: "pong" };
	}
}
