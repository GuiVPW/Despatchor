# Migration `20201012035457-fixed-post-bugs`

This migration has been generated by Xubili at 10/12/2020, 12:54:57 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_userId_fkey"

ALTER TABLE "public"."Post" DROP COLUMN "userId"

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201012035345-removed-duplicated-posts..20201012035457-fixed-post-bugs
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
@@ -26,13 +26,12 @@
   title        String
   description  String?
   published    Boolean     @default(false)
   authorId     Int
+  author       User        @relation(fields: [authorId], references: [id])
   postImageUrl String?
   comment      Comment[]
   likes        Int         @default(0)
-  User         User?       @relation(fields: [userId], references: [id])
-  userId       Int?
   likers       PostsLike[]
 }
 model PostsLike {
```


