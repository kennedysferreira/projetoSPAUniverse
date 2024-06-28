import { Router } from "./router.js";

const router = new Router();

router.add("/", "/pages/home.html");
router.add("/oUniverso", "/pages/oUniverso.html");
router.add("/exploracao", "/pages/exploracao.html");


router.initializeLinks();

