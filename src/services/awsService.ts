import * as fs from 'fs'
const AWS = require('aws-sdk')

const accessKey = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_KEY
const region = process.env.REGION

const s3bucket = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region
})
export class AWSService {
    public bucket:string

    constructor (bucket:string) {
      this.bucket = bucket
    }

    createBucket = async () => {
      const params = {
        Bucket: this.bucket
      }
      const result = await s3bucket.createBucket(params)
      return result
    }

    removeBucket = async () => {
      const params = {
        Bucket: this.bucket
      }
      const result = await s3bucket.deleteBucket(params)
      return result
    }

    uploadFile = async (fileName: string, filepath: string) => {
      const readStream = fs.readFileSync(filepath)
      const params = {
        Bucket: this.bucket,
        Key: fileName,
        Body: readStream
      }
      const result = await s3bucket.upload(params)
      return result
    }

    deleteFile = async (fileName:string) => {
      const params = {
        Bucket: this.bucket,
        Key: fileName
      }
      const result = await s3bucket.deleteObject(params)
      return result
    }

    getFile = async (fileName: string) => {
      const params = {
        Bucket: this.bucket,
        Key: fileName,
        Expires: 120 // seconds
      }
      const result = await s3bucket.getSignedUrl('getObject', params)
      return result
    }

    getFileProperties = async (fileName: string) => {
      const params = {
        Bucket: this.bucket,
        Key: fileName
      }
      const result = await s3bucket.getObject(params)
      return result
    }
}
