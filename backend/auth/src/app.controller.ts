import { Controller, Get } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { AppService } from "./app.service";
import {
	AUTH_SERVICE_NAME,
	AuthServiceController,
	PingRequest,
	PingResponse,
} from "./proto/auth";

@Controller()
export class AppController implements AuthServiceController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@GrpcMethod(AUTH_SERVICE_NAME, "ping")
	ping(_request: PingRequest): PingResponse {
		return { message: "pong" };
	}
}
