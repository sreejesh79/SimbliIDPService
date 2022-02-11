import { MainController } from "controllers/main.controller";
import { Router } from "express";
import authRouter  from "./routes/auth.router";


class RouterConfig {

    public static routes(router: Router): any {
        router.get("/", MainController.index);
        router.use("/auth", authRouter);
    
    }
}

export default RouterConfig;