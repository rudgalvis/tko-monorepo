export interface EmailConfig {
	user: string;
	password: string;
	host: string;
	port: number;
	tls: boolean;
	tlsOptions: {
		rejectUnauthorized: boolean;
	};
}