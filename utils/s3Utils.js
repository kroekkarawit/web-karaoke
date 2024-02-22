import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadImageToS3 = async (fileBuffer, fileName) => { // Accept a file buffer as an argument
  try {
    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer, // Use the file buffer
    };

    const res = await s3Client.send(new PutObjectCommand(uploadParams));

    return res;
  } catch (error) {
    console.error("Error handling file upload:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

const deleteImageFromS3 = async (objectKey) => {
  try {
    const deleteParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: objectKey,
    };

    const res = await s3Client.send(new DeleteObjectCommand(deleteParams));
    return res;
  } catch (error) {
    console.error("Error deleting object from S3:", error);
    throw error;
  }
};

export { uploadImageToS3, deleteImageFromS3 };
