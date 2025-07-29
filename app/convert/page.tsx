"use client";

import * as React from "react";
// import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, ArrowRight, Copy, RefreshCw } from "lucide-react";
import Link from "next/link";

// Conversion maps from the working code
const bijoy_string_conversion_map: { [key: string]: string } = {
  "i¨": "র‌্য",
  "ª¨": "্র্য",
  "°": "ক্ক",
  "±": "ক্ট",
  "³": "ক্ত",
  "K¡": "ক্ব",
  "¯Œ": "স্ক্র",
  µ: "ক্র",
  "K¬": "ক্ল",
  "¶": "ক্ষ",
  ÿ: "ক্ষ",
  "·": "ক্স",
  "¸": "গু",
  "»": "গ্ধ",
  Mœ: "গ্ন",
  "M¥": "গ্ম",
  "M­": "গ্ল",
  "¼": "ঙ্ক",
  "•¶": "ঙ্ক্ষ",
  "•L": "ঙ্খ",
  "½": "ঙ্গ",
  "•N": "ঙ্ঘ",
  "•": "ক্স",
  "”P": "চ্চ",
  "”Q": "চ্ছ",
  "”Q¡": "চ্ছ্ব",
  "”T": "চ্ঞ",
  "¾¡": "জ্জ্ব",
  "¾": "জ্জ",
  À: "জ্ঝ",
  Á: "জ্ঞ",
  "R¡": "জ্ব",
  Â: "ঞ্চ",
  Ã: "ঞ্ছ",
  Ä: "ঞ্জ",
  Å: "ঞ্ঝ",
  Æ: "ট্ট",
  "U¡": "ট্ব",
  "U¥": "ট্ম",
  Ç: "ড্ড",
  È: "ণ্ট",
  É: "ণ্ঠ",
  Ý: "ন্স",
  Ê: "ণ্ড",
  "š‘": "ন্তু",
  "Y\\^": "ণ্ব",
  Ë: "ত্ত",
  "Ë¡": "ত্ত্ব",
  Ì: "ত্থ",
  "Z¥": "ত্ম",
  "š—¡": "ন্ত্ব",
  "Z¡": "ত্ব",
  Î: "ত্র",
  "_¡": "থ্ব",
  "˜M": "দ্গ",
  "˜N": "দ্ঘ",
  Ï: "দ্দ",
  "×": "দ্ধ",
  "˜¡": "দ্ব",
  Ø: "দ্ব",
  "™¢": "দ্ভ",
  Ù: "দ্ম",
  "`ª“": "দ্রু",
  aŸ: "ধ্ব",
  "a¥": "ধ্ম",
  "›U": "ন্ট",
  Ú: "ন্ঠ",
  Û: "ন্ড",
  šÍ: "ন্ত",
  "š—": "ন্ত",
  "š¿": "ন্ত্র",
  "š’": "ন্থ",
  "›`": "ন্দ",
  "›Ø": "ন্দ্ব",
  Ü: "ন্ধ",
  bœ: "ন্ন",
  "š\\^": "ন্ব",
  "b¥": "ন্ম",
  Þ: "প্ট",
  ß: "প্ত",
  cœ: "প্ন",
  à: "প্প",
  cø: "প্ল",
  "c­": "প্ল",
  á: "প্স",
  "d¬": "ফ্ল",
  â: "ব্জ",
  ã: "ব্দ",
  ä: "ব্ধ",
  eŸ: "ব্ব",
  "e­": "ব্ল",
  å: "ভ্র",
  gœ: "ম্ন",
  "¤ú": "ম্প",
  ç: "ম্ফ",
  "¤\\^": "ম্ব",
  "¤¢": "ম্ভ",
  "¤£": "ম্ভ্র",
  "¤§": "ম্ম",
  "¤­": "ম্ল",
  "i“": "রু",
  iæ: "রু",
  iƒ: "রূ",
  é: "ল্ক",
  ê: "ল্গ",
  ë: "ল্ট",
  ì: "ল্ড",
  í: "ল্প",
  î: "ল্ফ",
  "j¦": "ল্ব",
  "j¥": "ল্ম",
  jø: "ল্ল",
  ï: "শু",
  ð: "শ্চ",
  kœ: "শ্ন",
  kø: "শ্ল",
  "k¦": "শ্ব",
  "k¥": "শ্ম",
  "k­": "শ্ল",
  "®‹": "ষ্ক",
  "®Œ": "ষ্ক্র",
  ó: "ষ্ট",
  ô: "ষ্ঠ",
  ò: "ষ্ণ",
  "®ú": "ষ্প",
  õ: "ষ্ফ",
  "®§": "ষ্ম",
  "¯‹": "স্ক",
  "÷": "স্ট",
  ö: "স্খ",
  "¯—": "স্ত",
  "¯Í": "স্ত",
  "¯‘": "স্তু",
  "¯¿": "স্ত্র",
  "¯’": "স্থ",
  mœ: "স্ন",
  "¯ú": "স্প",
  ù: "স্ফ",
  "¯\\^": "স্ব",
  "¯§": "স্ম",
  "¯­": "স্ল",
  û: "হু",
  nè: "হ্ণ",
  ý: "হ্ন",
  þ: "হ্ম",
  "n¬": "হ্ল",
  ü: "হৃ",
  "©": "র্",
  Av: "আ",
  A: "অ",
  B: "ই",
  C: "ঈ",
  D: "উ",
  E: "ঊ",
  F: "ঋ",
  G: "এ",
  H: "ঐ",
  I: "ও",
  J: "ঔ",
  K: "ক",
  L: "খ",
  M: "গ",
  N: "ঘ",
  O: "ঙ",
  P: "চ",
  Q: "ছ",
  R: "জ",
  S: "ঝ",
  T: "ঞ",
  U: "ট",
  V: "ঠ",
  W: "ড",
  X: "ঢ",
  Y: "ণ",
  Z: "ত",
  _: "থ",
  "`": "দ",
  a: "ধ",
  b: "ন",
  c: "প",
  d: "ফ",
  e: "ব",
  f: "ভ",
  g: "ম",
  h: "য",
  i: "র",
  j: "ল",
  k: "শ",
  l: "ষ",
  m: "স",
  n: "হ",
  o: "ড়",
  p: "ঢ়",
  q: "য়",
  r: "ৎ",
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
  v: "া",
  w: "ি",
  x: "ী",
  y: "ু",
  z: "ু",
  "~": "ূ",
  "„": "ৃ",
  "‡": "ে",
  "†": "ে",
  "‰": "ৈ",
  "\\ˆ": "ৈ",
  Š: "ৗ",
  Ô: "‘",
  Õ: "’",
  "\\|": "।",
  Ò: "“",
  Ó: "”",
  s: "ং",
  t: "ঃ",
  u: "ঁ",
  ª: "্র",
  Ö: "্র",
  "«": "্র",
  "¨": "্য",
  "\\&": "্",
  "…": "ৃ",
};

const uni2bijoy_string_conversion_map: { [key: string]: string } = {
  "।": "|",
  "‘": "Ô",
  "’": "Õ",
  "“": "Ò",
  "”": "Ó",
  "্র্য": "ª¨",
  র‌্য: "i¨",
  ক্ক: "°",
  ক্ট: "±",
  ক্ত: "³",
  ক্ব: "K¡",
  স্ক্র: "¯Œ",
  ক্র: "µ",
  ক্ল: "K¬",
  ক্ষ: "¶",
  ক্স: "·",
  গু: "¸",
  গ্ধ: "»",
  গ্ন: "Mœ",
  গ্ম: "M¥",
  গ্ল: "M­",
  গ্রু: "Mªy",
  ঙ্ক: "¼",
  ঙ্ক্ষ: "•¶",
  ঙ্খ: "•L",
  ঙ্গ: "½",
  ঙ্ঘ: "•N",
  চ্চ: "”P",
  চ্ছ: "”Q",
  চ্ছ্ব: "”Q¡",
  চ্ঞ: "”T",
  জ্জ্ব: "¾¡",
  জ্জ: "¾",
  জ্ঝ: "À",
  জ্ঞ: "Á",
  জ্ব: "R¡",
  ঞ্চ: "Â",
  ঞ্ছ: "Ã",
  ঞ্জ: "Ä",
  ঞ্ঝ: "Å",
  ট্ট: "Æ",
  ট্ব: "U¡",
  ট্ম: "U¥",
  ড্ড: "Ç",
  ণ্ট: "È",
  ণ্ঠ: "É",
  ন্স: "Ý",
  ণ্ড: "Ê",
  ন্তু: "š‘",
  ণ্ব: "Y^",
  ত্ত: "Ë",
  ত্ত্ব: "Ë¡",
  ত্থ: "Ì",
  ত্ন: "Zœ",
  ত্ম: "Z¥",
  ন্ত্ব: "š—¡",
  ত্ব: "Z¡",
  থ্ব: "_¡",
  দ্গ: "˜M",
  দ্ঘ: "˜N",
  দ্দ: "Ï",
  দ্ধ: "×",
  দ্ব: "˜¡",
  দ্ব2: "Ø",
  দ্ভ: "™¢",
  দ্ম: "Ù",
  দ্রু: "`ª“",
  ধ্ব: "aŸ",
  ধ্ম: "a¥",
  ন্ট: "›U",
  ন্ঠ: "Ú",
  ন্ড: "Û",
  ন্ত্র: "š¿",
  ন্ত: "š—",
  স্ত্র: "¯¿",
  ত্র: "Î",
  ন্থ: "š’",
  ন্দ: "›`",
  ন্দ্ব: "›Ø",
  ন্ধ: "Ü",
  ন্ন: "bœ",
  ন্ব: "š^",
  ন্ম: "b¥",
  প্ট: "Þ",
  প্ত: "ß",
  প্ন: "cœ",
  প্প: "à",
  প্ল: "c­",
  প্স: "á",
  ফ্ল: "d¬",
  ব্জ: "â",
  ব্দ: "ã",
  ব্ধ: "ä",
  ব্ব: "eŸ",
  ব্ল: "e­",
  ভ্র: "å",
  ম্ন: "gœ",
  ম্প: "¤ú",
  ম্ফ: "ç",
  ম্ব: "¤^",
  ম্ভ: "¤¢",
  ম্ভ্র: "¤£",
  ম্ম: "¤§",
  ম্ল: "¤­",
  রু: "i“",
  রূ: "iƒ",
  ল্ক: "é",
  ল্গ: "ê",
  ল্ট: "ë",
  ল্ড: "ì",
  ল্প: "í",
  ল্ফ: "î",
  ল্ব: "j¦",
  ল্ম: "j¥",
  ল্ল: "jø",
  শু: "ï",
  শ্চ: "ð",
  শ্ন: "kœ",
  শ্ব: "k¦",
  শ্ম: "k¥",
  শ্ল: "kø",
  ষ্ক: "®‹",
  ষ্ক্র: "®Œ",
  ষ্ট: "ó",
  ষ্ঠ: "ô",
  ষ্ণ: "ò",
  ষ্প: "®ú",
  ষ্ফ: "õ",
  ষ্ম: "®§",
  স্ক: "¯‹",
  স্ট: "÷",
  স্খ: "ö",
  স্ত: "¯—",
  স্তু: "¯‘",
  স্থ: "¯’",
  স্ন: "mœ",
  স্প: "¯ú",
  স্ফ: "ù",
  স্ব: "¯^",
  স্ম: "¯§",
  স্ল: "¯­",
  হু: "û",
  হ্ণ: "nè",
  হ্ন: "ý",
  হ্ম: "þ",
  হ্ল: "n¬",
  হৃ: "ü",
  র্: "©",
  "্র": "«",
  "্য": "¨",
  "্": "&",
  আ: "Av",
  অ: "A",
  ই: "B",
  ঈ: "C",
  উ: "D",
  ঊ: "E",
  ঋ: "F",
  এ: "G",
  ঐ: "H",
  ও: "I",
  ঔ: "J",
  ক: "K",
  খ: "L",
  গ: "M",
  ঘ: "N",
  ঙ: "O",
  চ: "P",
  ছ: "Q",
  জ: "R",
  ঝ: "S",
  ঞ: "T",
  ট: "U",
  ঠ: "V",
  ড: "W",
  ঢ: "X",
  ণ: "Y",
  ত: "Z",
  থ: "_",
  দ: "`",
  ধ: "a",
  ন: "b",
  প: "c",
  ফ: "d",
  ব: "e",
  ভ: "f",
  ম: "g",
  য: "h",
  র: "i",
  ল: "j",
  শ: "k",
  ষ: "l",
  স: "m",
  হ: "n",
  ড়: "o",
  ঢ়: "p",
  য়: "q",
  ৎ: "r",
  "০": "0",
  "১": "1",
  "২": "2",
  "৩": "3",
  "৪": "4",
  "৫": "5",
  "৬": "6",
  "৭": "7",
  "৮": "8",
  "৯": "9",
  "া": "v",
  "ি": "w",
  "ী": "x",
  "ু": "y",
  "ূ": "~",
  "ৃ": "…",
  "ে": "‡",
  "ৈ": "‰",
  "ৗ": "Š",
  "ং": "s",
  "ঃ": "t",
  "ঁ": "u",
};


function IsBanglaKar(CUni: string): boolean {
  return IsBanglaPreKar(CUni) || IsBanglaPostKar(CUni);
}

function IsBanglaBanjonborno(CUni: string): boolean {
  return "কখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমশষসহযরলয়ংঃঁৎ".includes(CUni);
}

function IsBanglaHalant(CUni: string): boolean {
  return CUni === "্";
}

function IsBanglaNukta(CUni: string): boolean {
  return CUni === "ং" || CUni === "ঃ" || CUni === "ঁ";
}

function IsSpace(C: string): boolean {
  return C === " " || C === "\t" || C === "\n" || C === "\r";
}
// Rearrange functions
function ReArrangeUnicodeConvertedText(str: string): string {
  for (let i = 0; i < str.length; i++) {
    if (
      i > 0 &&
      str.charAt(i) === "\u09CD" &&
      (IsBanglaKar(str.charAt(i - 1)) || IsBanglaNukta(str.charAt(i - 1))) &&
      i < str.length - 1
    ) {
      let temp =
        str.substring(0, i - 1) +
        str.charAt(i) +
        str.charAt(i + 1) +
        str.charAt(i - 1) +
        str.substring(i + 2, str.length);
      str = temp;
    }
    if (
      i > 0 &&
      i < str.length - 1 &&
      str.charAt(i) === "\u09CD" &&
      str.charAt(i - 1) === "\u09B0" &&
      str.charAt(i - 2) !== "\u09CD" &&
      IsBanglaKar(str.charAt(i + 1))
    ) {
      let temp =
        str.substring(0, i - 1) +
        str.charAt(i + 1) +
        str.charAt(i - 1) +
        str.charAt(i) +
        str.substring(i + 2, str.length);
      str = temp;
    }
    if (
      i < str.length - 1 &&
      str.charAt(i) === "র" &&
      IsBanglaHalant(str.charAt(i + 1)) &&
      !IsBanglaHalant(str.charAt(i - 1))
    ) {
      let j = 1;
      while (true) {
        if (i - j < 0) break;
        if (
          IsBanglaBanjonborno(str.charAt(i - j)) &&
          IsBanglaHalant(str.charAt(i - j - 1))
        )
          j += 2;
        else if (j === 1 && IsBanglaKar(str.charAt(i - j))) j++;
        else break;
      }
      let temp =
        str.substring(0, i - j) +
        str.charAt(i) +
        str.charAt(i + 1) +
        str.substring(i - j, i) +
        str.substring(i + 2, str.length);
      str = temp;
      i += 1;
      continue;
    }
    if (
      i < str.length - 1 &&
      IsBanglaPreKar(str.charAt(i)) &&
      !IsSpace(str.charAt(i + 1))
    ) {
      let temp = str.substring(0, i);
      let j = 1;
      while (IsBanglaBanjonborno(str.charAt(i + j))) {
        if (IsBanglaHalant(str.charAt(i + j + 1))) j += 2;
        else break;
      }
      temp += str.substring(i + 1, i + j + 1);
      let l = 0;
      if (str.charAt(i) === "ে" && str.charAt(i + j + 1) === "া") {
        temp += "ো";
        l = 1;
      } else if (str.charAt(i) === "ে" && str.charAt(i + j + 1) === "ৗ") {
        temp += "ৌ";
        l = 1;
      } else {
        temp += str.charAt(i);
      }
      temp += str.substring(i + j + l + 1, str.length);
      str = temp;
      i += j;
    }
    if (
      i < str.length - 1 &&
      str.charAt(i) === "ঁ" &&
      IsBanglaPostKar(str.charAt(i + 1))
    ) {
      let temp =
        str.substring(0, i) +
        str.charAt(i + 1) +
        str.charAt(i) +
        str.substring(i + 2, str.length);
      str = temp;
    }
  }
  return str;
}

function ReArrangeUnicodeText(str: string): string {
  let barrier = 0;
  for (let i = 0; i < str.length; i++) {
    if (i < str.length && IsBanglaPreKar(str.charAt(i))) {
      let j = 1;
      while (IsBanglaBanjonborno(str.charAt(i - j))) {
        if (i - j < 0 || i - j <= barrier) break;
        if (IsBanglaHalant(str.charAt(i - j - 1))) j += 2;
        else break;
      }
      let temp =
        str.substring(0, i - j) +
        str.charAt(i) +
        str.substring(i - j, i) +
        str.substring(i + 1, str.length);
      str = temp;
      barrier = i + 1;
      continue;
    }
    if (
      i < str.length - 1 &&
      IsBanglaHalant(str.charAt(i)) &&
      str.charAt(i - 1) === "র" &&
      !IsBanglaHalant(str.charAt(i - 2))
    ) {
      let j = 1;
      let found_pre_kar = 0;
      while (true) {
        if (
          IsBanglaBanjonborno(str.charAt(i + j)) &&
          IsBanglaHalant(str.charAt(i + j + 1))
        )
          j += 2;
        else if (
          IsBanglaBanjonborno(str.charAt(i + j)) &&
          IsBanglaPreKar(str.charAt(i + j + 1))
        ) {
          found_pre_kar = 1;
          break;
        } else break;
      }
      let temp =
        str.substring(0, i - 1) +
        str.substring(i + j + 1, i + j + found_pre_kar + 1) +
        str.substring(i + 1, i + j + 1) +
        str.charAt(i - 1) +
        str.charAt(i) +
        str.substring(i + j + found_pre_kar + 1, str.length);
      str = temp;
      i += j + found_pre_kar;
      barrier = i + 1;
      continue;
    }
  }
  return str;
}

// Helper functions
function IsBanglaPreKar(CUni: string): boolean {
  return CUni === "ি" || CUni === "ৈ" || CUni === "ে";
}

function IsBanglaPostKar(CUni: string): boolean {
  return (
    CUni === "া" ||
    CUni === "ো" ||
    CUni === "ৌ" ||
    CUni === "ৗ" ||
    CUni === "ু" ||
    CUni === "ূ" ||
    CUni === "ী" ||
    CUni === "ৃ"
  );
}


// Conversion functions
function convertToBijoy(text: string): string {
  let line = text;
  let myRegExp = new RegExp("ো", "g");
  line = line.replace(myRegExp, "ো");
  myRegExp = new RegExp("ৌ", "g");
  line = line.replace(myRegExp, "ৌ");
  line = ReArrangeUnicodeText(line);
  for (const unic in uni2bijoy_string_conversion_map) {
    myRegExp = new RegExp(escapeRegExp(unic), "g");
    line = line.replace(myRegExp, uni2bijoy_string_conversion_map[unic]);
  }
  return line;
}

function convertToUnicode(text: string): string {
  let line = text;
  let conversion_map = bijoy_string_conversion_map;
  for (const ascii in conversion_map) {
    const myRegExp = new RegExp(escapeRegExp(ascii), "g");
    line = line.replace(myRegExp, conversion_map[ascii]);
  }
  line = ReArrangeUnicodeConvertedText(line);
  const myRegExp = new RegExp("অা", "g");
  line = line.replace(myRegExp, "আ");
  return line;
}

// Escape special characters for regex
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function BanglaConverter() {
  const [unicodeText, setUnicodeText] = React.useState("");
  const [bijoyText, setBijoyText] = React.useState("");

  const handleUnicodeToBijoy = () => {
    if (!unicodeText.trim()) {
      // toast.error("ইউনিকোড টেক্সট প্রবেশ করুন।");
      return;
    }
    try {
      const convertedText = convertToBijoy(unicodeText);
      setBijoyText(convertedText);
      // toast.success("বিজয় ফরম্যাটে রূপান্তরিত হয়েছে!");
    } catch (error) {
      console.error("Conversion Error:", error);
      // toast.error("টেক্সট রূপান্তর করা যায়নি।");
    }
  };

  const handleBijoyToUnicode = () => {
    if (!bijoyText.trim()) {
      // toast.error("বিজয় টেক্সট প্রবেশ করুন।");
      return;
    }
    try {
      const convertedText = convertToUnicode(bijoyText);
      setUnicodeText(convertedText);
      // toast.success("ইউনিকোড ফরম্যাটে রূপান্তরিত হয়েছে!");
    } catch (error) {
      console.error("Conversion Error:", error);
      // toast.error("টেক্সট রূপান্তর করা যায়নি।");
    }
  };

  const handleClear = () => {
    setUnicodeText("");
    setBijoyText("");
    // toast.info("দুটি টেক্সট ফিল্ড মুছে ফেলা হয়েছে।");
  };

  const handleCopyToClipboard = (textToCopy: string, type: string) => {
    if (!textToCopy.trim()) {
      // toast.error(`${type} টেক্সট কপি করার জন্য কিছু নেই।`);
      return;
    }
    navigator.clipboard.writeText(textToCopy);
    // toast.success(`${type} টেক্সট ক্লিপবোর্ডে কপি করা হয়েছে!`);
  };

  return (
    <div className='min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex flex-col items-center relative'>
      <Link href="/all-tools" className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
        <ArrowLeft size={24} />
      </Link>
      {/* <ToastContainer */}
        {/* position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme='colored'
      /> */}
      <div className='w-full max-w-5xl space-y-5'>
        {/* Unicode Input Section */}
        <div>
          <label
            htmlFor='unicode-input'
            className='block mb-2 text-base font-semibold text-gray-700 dark:text-gray-300'
          >
            ইউনিকোড কি-বোর্ডের লেখা এখানে পেস্ট করুন
          </label>
          <div className='relative'>
            <textarea
              id='unicode-input'
              value={unicodeText}
              onChange={(e) => setUnicodeText(e.target.value)}
              className='w-full h-56 sm:h-64 p-4 text-lg border-2 border-blue-400 rounded-lg bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-sm font-noto'
              placeholder='ইউনিকোড টেক্সট লিখুন...'
            />
            <button
              onClick={() => handleCopyToClipboard(unicodeText, "ইউনিকোড")}
              className='absolute bottom-3 right-3 p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors'
              aria-label='Copy Unicode Text'
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className='flex justify-center items-center gap-2 sm:gap-4 flex-wrap rounded-lg'>
          <button
            onClick={handleUnicodeToBijoy}
            className='flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors transform hover:scale-105 font-noto'
          >
            <ArrowRight size={16} />
            ইউনিকোড টু বিজয়
          </button>
          <button
            onClick={handleBijoyToUnicode}
            className='flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors transform hover:scale-105 font-noto'
          >
            <ArrowLeft size={16} />
            বিজয় টু ইউনিকোড
          </button>
          <button
            onClick={handleClear}
            className='flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-colors transform hover:scale-105 font-noto'
          >
            <RefreshCw size={16} />
            মুছে ফেলুন
          </button>
        </div>

        {/* Bijoy Input/Output Section */}
        <div>
          <label
            htmlFor='bijoy-input'
            className='block mb-2 text-base font-semibold text-gray-700 dark:text-gray-300'
          >
            বিজয় কি-বোর্ডের লেখা এখানে পেস্ট করুন
          </label>
          <div className='relative'>
            <textarea
              id='bijoy-input'
              value={bijoyText}
              onChange={(e) => setBijoyText(e.target.value)}
              className='w-full h-56 sm:h-64 p-4 text-lg border-2 border-gray-300 rounded-lg bg-[#fdfaf5] focus:ring-2 focus:ring-gray-300 focus:outline-none shadow-sm font-sutonny'
              placeholder='বিজয় টেক্সট লিখুন...'
            />
            <button
              onClick={() => handleCopyToClipboard(bijoyText, "বিজয়")}
              className='absolute bottom-3 right-3 p-2 rounded-full text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors'
              aria-label='Copy Bijoy Text'
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
