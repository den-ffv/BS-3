import {Router} from "express";
import { authRouter } from "./auth.routes";
import { crmCardRouter } from "./crmCard.routers";

const apiRoutes = Router();

apiRoutes.use('/auth', authRouter );
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API for managing User
 *   - name: CRM Cards
 *     description: API for managing CRM cards
 */
apiRoutes.use('/crm_card', crmCardRouter );

export default apiRoutes;