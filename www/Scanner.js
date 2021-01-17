export default class Scanner {
    constructor(templateStr) {
        this.templateStr = templateStr
        this.poi = 0
        this.tail = templateStr
    }
    scan(){

    }
    scanUtil(flag){
        if(this.templateStr.indexOf(flag)!==-1){
            let now = this.templateStr.indexOf(flag)
            this.tail = this.templateStr.substring(this.poi,now)
            this.poi = now
        }
        return this.tail
    }
}