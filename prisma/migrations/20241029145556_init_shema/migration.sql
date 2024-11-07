-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_type" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL,
    "is_menejer" BOOLEAN NOT NULL,
    "is_user" BOOLEAN NOT NULL,

    CONSTRAINT "user_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crm_card" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_surname" TEXT NOT NULL,
    "user_patronymic" TEXT NOT NULL,
    "title_card" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "card_photo" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "user_type_id" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "crm_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crm_email" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL,
    "crm_crard_id" INTEGER NOT NULL,

    CONSTRAINT "crm_email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crm_payment" (
    "id" SERIAL NOT NULL,
    "card_title" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "crm_crard_id" INTEGER NOT NULL,

    CONSTRAINT "crm_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crm_address" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "apartment" TEXT NOT NULL,
    "crm_crard_id" INTEGER NOT NULL,

    CONSTRAINT "crm_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "biography" TEXT,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "stock" INTEGER NOT NULL,
    "author_id" INTEGER,
    "category_id" INTEGER,
    "publisher_id" INTEGER,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL,
    "is_awaiting_payment" BOOLEAN NOT NULL,
    "is_paid" BOOLEAN NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL,
    "is_performed" BOOLEAN NOT NULL,
    "is_canceled" BOOLEAN NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "order_status_id" INTEGER NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- AddForeignKey
ALTER TABLE "crm_card" ADD CONSTRAINT "crm_card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm_card" ADD CONSTRAINT "crm_card_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "user_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm_email" ADD CONSTRAINT "crm_email_crm_crard_id_fkey" FOREIGN KEY ("crm_crard_id") REFERENCES "crm_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm_payment" ADD CONSTRAINT "crm_payment_crm_crard_id_fkey" FOREIGN KEY ("crm_crard_id") REFERENCES "crm_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crm_address" ADD CONSTRAINT "crm_address_crm_crard_id_fkey" FOREIGN KEY ("crm_crard_id") REFERENCES "crm_card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_order_status_id_fkey" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
