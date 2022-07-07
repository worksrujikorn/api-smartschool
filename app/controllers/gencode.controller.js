module.exports.gencode = (code,txt,len) =>{
    code++;
    while (String(code).length < len) {
        code = "0" + code;
    }
    code = txt + code;
    return code;
} 