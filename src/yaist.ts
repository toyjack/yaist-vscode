import { readFileSync } from "fs";
import * as path from "path";
import { ExtensionContext, workspace, WorkspaceConfiguration } from 'vscode';
import { char2Unicode, getGwPngUrl, getGwSvgUrl } from './utils';

// TODO:  config; clipboard;
export class XmlMaker {
  public context: ExtensionContext;
  public config: WorkspaceConfiguration;
  public hanzi: string;
  public idsData: string;
  public variants: any;

  constructor(context: ExtensionContext, config: WorkspaceConfiguration, hanzi: string) {
    this.context = context;
    this.config = config;
    this.hanzi = hanzi;
    this.idsData = this.readfile(path.join(this.context.extensionPath, 'data', 'cjkvi_ids.txt'));
    this.variants = this.parseFile(path.join(this.context.extensionPath, 'data', 'variants.json'));
  }

  public output() {
    const xmlBlock = this.config.get('xmlTemplate') as string;
    let result = xmlBlock;
    let xmlUnicode = char2Unicode(this.hanzi).replace("U+", "u");
    
    result = result.replaceAll("[[unicode]]", xmlUnicode);
    result = result.replaceAll("[[IDS]]", this.getIDS(this.hanzi));
    result = result.replaceAll("[[hanzi]]", this.hanzi);
    result = result.replaceAll("[[GlyphWikiPNG]]", getGwPngUrl(this.hanzi));
    result = result.replaceAll("[[standard]]", this.getStandard(this.hanzi));
    result = result.replaceAll("[[GlyphWikiSVG", getGwSvgUrl(this.hanzi));

    return result;
  }

  getIDS(char: string) {
    let temp = this.idsData.indexOf("\t" + char + "\t");
    if (temp === -1) {
      return "";
    }
    let temp2 = this.idsData.indexOf("\n", temp);
    // for local 魔法！触るな！
    // let temp3 = this.ids.substring(temp + 3, temp2-1);
    // for netlify
    let temp3 = this.idsData.substring(temp + 3, temp2);
    return temp3.trim();
  }

  getStandard(char: string) {
    if (this.variants[char] === undefined) {
      return "X";
    } else {
      return this.variants[char].join("");
    }
  }
  readfile(fp: string) {
    return readFileSync(fp).toString();
  }

  parseFile(fp: string) {
    return JSON.parse(this.readfile(fp));
  }
}