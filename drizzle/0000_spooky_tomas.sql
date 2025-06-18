CREATE TABLE "users" (
	"uuid" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "watched" (
	"uuid" varchar(255) PRIMARY KEY NOT NULL,
	"user_uuid" varchar(255) NOT NULL,
	"movie_uuid" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"uuid" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "movies" (
	"uuid" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"category_uuid" varchar(255) NOT NULL,
	"release" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "watched" ADD CONSTRAINT "watched_user_uuid_users_uuid_fk" FOREIGN KEY ("user_uuid") REFERENCES "public"."users"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "watched" ADD CONSTRAINT "watched_movie_uuid_movies_uuid_fk" FOREIGN KEY ("movie_uuid") REFERENCES "public"."movies"("uuid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_category_uuid_categories_uuid_fk" FOREIGN KEY ("category_uuid") REFERENCES "public"."categories"("uuid") ON DELETE no action ON UPDATE no action;
