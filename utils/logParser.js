let {splitData} = require('./common')

class parseData{
    constructor(file_data){
        this.file_data = file_data
    }

    single_line(line_data, log_event){
        try{
            for (let index = 0; index < log_event.length; index++) {
                if(line_data.includes(`- ${log_event[index]} -`)){
                    let splitLineData = splitData(line_data, `- ${log_event[index]} -`)
                    let jsonData = JSON.parse(splitLineData[1])
                    return {timezone: splitLineData[0].trim(), loglevel: log_event[index], ...jsonData}
                }
            }
        }
        catch(e){
            throw new Error(e)
        }
    }

    bulk(lineTrack, logEvent){
        try{
            let result = []
            let splitBulkData = splitData(this.file_data, lineTrack)
            let checkData = splitBulkData.map(data=>{
                let checklog = this.single_line(data, logEvent)
                if(checklog){
                    result.push(checklog)
                }
            })
            return result;
        }catch(e){
            throw new Error(e)
        }
    }
}


module.exports = {parseData}