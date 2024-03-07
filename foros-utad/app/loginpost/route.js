const { loginController } = require("../../mysql/controller/auth");

export async function POST(req) {
	return loginController(req);
}
