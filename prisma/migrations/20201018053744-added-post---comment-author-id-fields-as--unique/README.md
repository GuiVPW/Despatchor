# Migration `20201018053744-added-post---comment-author-id-fields-as--unique`

This migration has been generated by Xubili at 10/18/2020, 2:37:44 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Comment.authorId_unique" ON "public"."Comment"("authorId")

CREATE UNIQUE INDEX "Post.authorId_unique" ON "public"."Post"("authorId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201018032952-added-unique-key-to-user-id-in-posts-like-schema..20201018053744-added-post---comment-author-id-fields-as--unique
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -25,9 +25,9 @@
   id           Int         @id @default(autoincrement())
   title        String
   description  String?
   published    Boolean     @default(false)
-  authorId     Int
+  authorId     Int         @unique
   author       User        @relation(fields: [authorId], references: [id])
   postImageUrl String?
   comment      Comment[]
   likes        Int         @default(0)
@@ -44,11 +44,11 @@
 }
 model Comment {
   id        Int      @id @default(autoincrement())
-  createdAt DateTime @default(now())
   author    User     @relation(fields: [authorId], references: [id])
-  authorId  Int
+  authorId  Int      @unique
   post      Post     @relation(fields: [postId], references: [id])
   postId    Int
   comment   String
+  createdAt DateTime @default(now())
 }
```


