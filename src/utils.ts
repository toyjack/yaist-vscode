const idsData ="";
const variants ={
  "a":"a",
};

export function fixedCharCodeAt(str: string, idx?: number) : number {
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt#using_charcodeat
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;
  
    if (0xD800 <= code && code <= 0xDBFF) {
      hi = code;
      low = str.charCodeAt(idx + 1);
      if (isNaN(low)) {
        throw new Error('High surrogate not followed by low surrogate in fixedCharCodeAt()');
      }
      return (
        (hi - 0xD800) * 0x400) +
        (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
      return 0;
    }
    return code;
  }
  
  export function charCode2Unicode(charCode: number) {
    return "U+"+charCode.toString(16).toUpperCase();
  }
  
  export function char2Unicode(char: string) {
    return charCode2Unicode(fixedCharCodeAt(char,0));
  }
  
  export function getUnicodeBlock(char: string){
    const blocks = [
      {"name": "CJK", "start": "U+4E00", "end":"U+9FFC"},
      {"name": "Ext. A", "start": "U+3400", "end":"U+4DBF"},
      {"name": "Ext. B", "start": "U+20000", "end":"U+2A6DD"},
      {"name": "Ext. C", "start": "U+2A700", "end":"U+2B734"},
      {"name": "Ext. D", "start": "U+2B740", "end":"U+2B81D"},
      {"name": "Ext. E", "start": "U+2B820", "end":"U+2CEA1"},
      {"name": "Ext. F", "start": "U+2CEB0", "end":"U+2EBE0"},
      {"name": "Ext. G", "start": "U+30000", "end":"U+3134A"},    
    ];
    const charPoint = fixedCharCodeAt(char);
    // console.log(charPoint)
    for (let block of blocks){
      const start = parseInt("0x"+block.start.substring(2),10);
      const end =parseInt("0x"+block.end.substring(2),10);
      if (charPoint>= start && charPoint<= end){
        return block.name;
      }
    }
    return "Unknown";
  }
  
  
  export function getGwPngUrl(char:string) {
    const code = "u" + char2Unicode(char).substring(2).toLowerCase();
    const url = "https://glyphwiki.org/glyph/" + code + ".png";
    return url;
  }
  export function getGwSvgUrl(char : string) {
    const code = "u" + char2Unicode(char).substring(2).toLowerCase();
    const url = "https://glyphwiki.org/glyph/" + code + ".svg";
    return url;
  }
  
  export function convertCodePoints(str : string)  : string[]{
    return Array.from(str).map((char) => {
      const charCode =char.codePointAt(0) || 0;
      return charCode.toString(16);
    });
  }
