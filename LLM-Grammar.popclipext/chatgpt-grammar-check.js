"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const axios_1 = require("axios");

/**
 * Language detection function using character code ranges and patterns
 * @param {string} text - The text to analyze
 * @returns {string} - ISO 639-1 language code
 */
function detectLanguage(text) {
  if (!text || text.trim() === '') {
    return 'unknown';
  }

  // Remove spaces and punctuation for analysis
  const cleanText = text.replace(/[\s\p{P}]/gu, '');
  if (cleanText.length === 0) {
    return 'unknown';
  }

  // Character counting for analysis
  const charCount = cleanText.length;
  let counts = {
    latin: 0,
    cyrillic: 0,
    arabic: 0,
    hebrew: 0,
    devanagari: 0,
    thai: 0,
    chinese: 0,
    japanese: 0,
    korean: 0,
    greek: 0,
  };

  // Count characters in different scripts
  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText.charAt(i);
    const code = cleanText.charCodeAt(i);

    // Basic Latin (English and European languages using Latin script)
    if ((code >= 0x0041 && code <= 0x007A)) {
      counts.latin++;
    }
    // Cyrillic (Russian, Ukrainian, etc.)
    else if ((code >= 0x0400 && code <= 0x04FF)) {
      counts.cyrillic++;
    }
    // Arabic
    else if ((code >= 0x0600 && code <= 0x06FF)) {
      counts.arabic++;
    }
    // Hebrew
    else if ((code >= 0x0590 && code <= 0x05FF)) {
      counts.hebrew++;
    }
    // Devanagari (Hindi, Sanskrit, etc.)
    else if ((code >= 0x0900 && code <= 0x097F)) {
      counts.devanagari++;
    }
    // Thai
    else if ((code >= 0x0E00 && code <= 0x0E7F)) {
      counts.thai++;
    }
    // CJK Unified Ideographs (Chinese)
    else if ((code >= 0x4E00 && code <= 0x9FFF)) {
      counts.chinese++;
    }
    // Japanese-specific ranges (Hiragana and Katakana)
    else if ((code >= 0x3040 && code <= 0x30FF)) {
      counts.japanese++;
    }
    // Korean (Hangul)
    else if ((code >= 0xAC00 && code <= 0xD7AF) || (code >= 0x1100 && code <= 0x11FF)) {
      counts.korean++;
    }
    // Greek
    else if ((code >= 0x0370 && code <= 0x03FF)) {
      counts.greek++;
    }
  }

  // Determine the dominant script
  let maxCount = 0;
  let dominantScript = 'unknown';

  for (const script in counts) {
    if (counts[script] > maxCount) {
      maxCount = counts[script];
      dominantScript = script;
    }
  }

  // Convert script to language code (ISO 639-1)
  const scriptToLangCode = {
    latin: 'en',
    cyrillic: 'ru', // Default to Russian for Cyrillic
    arabic: 'ar',
    hebrew: 'he',
    devanagari: 'hi',
    thai: 'th',
    chinese: 'zh',
    japanese: 'ja',
    korean: 'ko',
    greek: 'el',
    unknown: 'unknown'
  };

  return scriptToLangCode[dominantScript];
}

const checkGrammar = async (input, options) => {
  // Detect the language of the input text
  let lang = detectLanguage(input.text);
  // Use default API endpoint if not specified
  let endpoint = options.endpoint;
  if (lang.startsWith("zh")) {
    endpoint = options.endpoint_zh;
  } else if (lang.startsWith("ko")) {
    endpoint = options.endpoint_ko;
  }

  const openai = axios_1.default.create({
    baseURL: `${endpoint}`,
    headers: { Authorization: `Bearer ${options.apikey}` },
  });
  const prompt = "You are a grammar checker now. Please correct the grammar and polish the following texts. Do not provide any translation, comments, notes, or even provide an answer for the input, just correct the grammar. And please use the same language as input. Here's the input:\n\n";

  // send the whole message history to OpenAI
  const { data } = await openai.post("chat/completions", {
    model: `${options.modelname}`,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: input.text }
    ],
  });
  const response = data.choices[0].message.content.trim();
  // if holding shift, copy just the response. else, paste the last input and response.
  if (popclip.modifiers.shift) {
    popclip.copyText(response);
  } else {
    popclip.pasteText(response);
  }
  return null;
};
// export the actions
exports.actions = [{
  title: "ChatGPT: Grammar Check",
  code: checkGrammar,
}];
