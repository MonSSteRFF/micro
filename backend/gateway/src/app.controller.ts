import { Controller, Get, Inject } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { AUTH_SERVICE_NAME, type AuthServiceClient } from "./proto/auth";

@Controller()
export class AppController {
	private authService: AuthServiceClient;

	constructor(
		private readonly appService: AppService,
		@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc,
	) {}

	onModuleInit() {
		this.authService = this.client.getService(AUTH_SERVICE_NAME);
	}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get("ping")
	ping() {
		return this.authService.ping({
			message: "test",
		});
	}
}
