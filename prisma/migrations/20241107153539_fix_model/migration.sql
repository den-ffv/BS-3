-- AlterTable
ALTER TABLE "crm_card" ALTER COLUMN "active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "crm_email" ALTER COLUMN "is_main" SET DEFAULT false;

-- AlterTable
ALTER TABLE "order_status" ALTER COLUMN "is_done" SET DEFAULT false,
ALTER COLUMN "is_awaiting_payment" SET DEFAULT false,
ALTER COLUMN "is_paid" SET DEFAULT false,
ALTER COLUMN "is_confirmed" SET DEFAULT false,
ALTER COLUMN "is_performed" SET DEFAULT false,
ALTER COLUMN "is_canceled" SET DEFAULT false;

-- AlterTable
ALTER TABLE "user_type" ALTER COLUMN "is_admin" SET DEFAULT false,
ALTER COLUMN "is_menejer" SET DEFAULT false,
ALTER COLUMN "is_user" SET DEFAULT false;
