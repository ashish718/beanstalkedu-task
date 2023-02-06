let {parseData} = require('../utils/logParser')
const {logTrack, lineTrack} = require('../utils/helper')
const httpStatusCodes = require('../utils/httpCode/response')
const Api404Error = require('../utils/errorHandler/api404Error')


exports.check_parselog = (req, res, next) => {
    try{
        if(!req.file){
            throw new Api404Error("file required!!")
        }
        const bufferData = req.file.buffer.toString()

        if(!bufferData){
            throw new Api404Error("no data found in file!!")
        }
        
        const checkData = new parseData(bufferData)
        
        let checkLog = checkData.bulk(lineTrack, req.body.logEvent?req.body.logEvent:logTrack)

        if(checkLog.length <= 0) throw new Api404Error(`no ${logTrack.join(', ')} log found`)

        return res.status(httpStatusCodes.OK).json({result: checkLog, message: "sucess.."})
    }
    catch(e){
        next(e)
    }
}