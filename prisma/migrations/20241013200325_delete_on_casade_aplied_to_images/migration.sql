-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_media_id_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
