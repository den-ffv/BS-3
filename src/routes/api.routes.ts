import {Router} from "express";
import { authRouter } from "./auth.routes";
import { crmCardRouter } from "./crmCard.routers";
import { userTypeRouter } from "./userType.routes";
import { crmEmailRouter } from "./crmEmail.routes";
import { crmPaymentCardRouter } from "./crmPaymentCard.routes";
import { crmAddressRouter } from "./crmAddress.routes";
import { authorRouter } from "./author.routes";
import { categoriesRouter } from "./categories.routes";
import { publishersRouter } from "./publishers.routes";
import { authenticateToken } from "../middleware/jwt.middleware";

const apiRoutes = Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API for managing User
 *   - name: User Type
 *     description: API for managing User type
 *   - name: CRM Cards
 *     description: API for managing CRM cards
 *   - name: Crm Email
 *     description: API for managing CRM email
 *   - name: Crm Payment Card
 *     description: API for managing CRM payment card
 *   - name: Crm Address
 *     description: API for managing CRM address
 *   - name: Author
 *     description: API for managing Author
 *   - name: Categories
 *     description: API for managing Categories
 *   - name: Publishers
 *     description: API for managing Publishers
 *   - name: Book
 *     description: API for managing Book
 *   - name: OrderStatus
 *     description: API for managing Order status
 *   - name: Order
 *     description: API for managing Order
 *   - name: OrderItem
 *     description: API for managing Order item
 */
apiRoutes.use('/auth', authRouter );
apiRoutes.use('/user_type', userTypeRouter );
apiRoutes.use('/crm_card', crmCardRouter );
apiRoutes.use('/crm_email', crmEmailRouter );
apiRoutes.use('/crm_payment_card', crmPaymentCardRouter );
apiRoutes.use('/crm_address', crmAddressRouter );
apiRoutes.use('/author', authenticateToken, authorRouter );
apiRoutes.use('/categories', categoriesRouter );
apiRoutes.use('/publishers', publishersRouter );

export default apiRoutes;