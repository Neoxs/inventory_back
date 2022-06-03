import { Router} from "express"

// Routes
import { itemRoutes } from "./itemRoutes"
import { categoryRoutes } from "./categoryRoutes"
import { statisticRoutes } from "./statisticRoutes"

// Consume routes
const router = Router()
router.use("/items", itemRoutes)
router.use("/categories", categoryRoutes)
router.use("/statistics", statisticRoutes)

export { router } 