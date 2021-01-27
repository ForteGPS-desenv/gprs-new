CREATE TABLE "chips" (
  "id" SERIAL PRIMARY KEY,
  "operadora" text,
  "iccid" text UNIQUE,
  "number" text UNIQUE,
  "active" timestamp,
  "status" text NOT NULL,
  "location" text,
  "value_true" int,
  "value" int,
  "created_at" timestamp,
  "members_id" int NOT NULL
);

CREATE TABLE "members" (
  "id" SERIAL PRIMARY KEY,
  "name_social" text,
  "name" text,
  "cnpj" text,
  "address" text,
  "name_contato" text,
  "email" text,
  "phone" text,
  "vencimento" timestamp,
  "created_at" timestamp
);

ALTER TABLE "chips" ADD FOREIGN KEY ("members_id") REFERENCES "members" ("id");