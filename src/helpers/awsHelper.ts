import { AWSService } from '../services/awsService'
import * as path from 'path'

export class AWSHelper {
    public awsService: AWSService
    constructor (bucket: string) {
      this.awsService = new AWSService(bucket)
    }

    helper = async () => {
      // sample for create bucket and remove bucket on aws
      const bucket = await this.awsService.createBucket() // eslint-disable-line
      // return bucket
      /*
        const bucket = await this.awsService.removeBucket()
        return {bucket}
        */
      const filePath = path.join(__dirname, 'testingAWS.txt') // eslint-disable-line
      // const result = await this.awsService.uploadFile('firsttest1.txt', filePath)
      // Below methods for fetch signedUrl for file, delete file and get properties for file
      /*
        const result = await this.awsService.deleteFile('firsttest1.txt')
        const result = await this.awsService.getFile('firsttest1.txt')
        const result = await this.awsService.getFileProperties('firsttest1.txt')
        return {result}
        */
    }
}
