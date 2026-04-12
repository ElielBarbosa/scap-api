-- CreateTable
CREATE TABLE "tb_campus" (
    "id" SERIAL NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,

    CONSTRAINT "tb_campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_category" (
    "id" SERIAL NOT NULL,
    "name_category" VARCHAR(255) NOT NULL,

    CONSTRAINT "tb_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_category_objeto" (
    "tb_category_id" INTEGER NOT NULL,
    "tb_objeto_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "tb_notification" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "messager" VARCHAR(255),

    CONSTRAINT "tb_notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_object" (
    "id" SERIAL NOT NULL,
    "name_objetct" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "status" CHAR(1),
    "location_found" VARCHAR(255),
    "object_image" TEXT,
    "registered_object" INTEGER NOT NULL,
    "removed_by" INTEGER,
    "campus_id" INTEGER NOT NULL,
    "create_at" DATE DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_objeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "user_type" INTEGER NOT NULL DEFAULT 1,
    "email" VARCHAR(255),
    "password_hash" VARCHAR(255),
    "campus_id" INTEGER NOT NULL,
    "update_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "create_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registration" VARCHAR(50) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_category_name_category_key" ON "tb_category"("name_category");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_registration_key" ON "tb_user"("registration");

-- AddForeignKey
ALTER TABLE "tb_category_objeto" ADD CONSTRAINT "fk_cat_obj_category" FOREIGN KEY ("tb_category_id") REFERENCES "tb_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_category_objeto" ADD CONSTRAINT "fk_cat_obj_objeto" FOREIGN KEY ("tb_objeto_id") REFERENCES "tb_object"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_notification" ADD CONSTRAINT "fk_notification_user" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_object" ADD CONSTRAINT "fk_objeto_campus" FOREIGN KEY ("campus_id") REFERENCES "tb_campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_object" ADD CONSTRAINT "fk_objeto_registered" FOREIGN KEY ("registered_object") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_object" ADD CONSTRAINT "fk_objeto_removed" FOREIGN KEY ("removed_by") REFERENCES "tb_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "fk_user_campus" FOREIGN KEY ("campus_id") REFERENCES "tb_campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
