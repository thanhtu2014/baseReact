const config = {
  GSM7: {
    maxSegmentLength: 160,
    maxCharLength: 153,
  },
  unicode: {
    maxSegmentLength: 70,
    maxCharLength: 67,
  },
};

// eslint-disable-next-line max-len, quotes
const charset7bit = { '@': 1, '£': 1, '$': 1, '¥': 1, 'è': 1, 'é': 1, 'ù': 1, 'ì': 1, 'ò': 1, 'Ç': 1, "\n": 1, 'Ø': 1, 'ø': 1, "\r": 1, 'Å': 1, 'å': 1, 'Δ': 1, '_': 1, 'Φ': 1, 'Γ': 1, 'Λ': 1, 'Ω': 1, 'Π': 1, 'Ψ': 1, 'Σ': 1, 'Θ': 1, 'Ξ': 1, 'Æ': 1, 'æ': 1, 'ß': 1, 'É': 1, ' ': 1, '!': 1, '"': 1, '#': 1, '¤': 1, '%': 1, '&': 1, "'": 1, '(': 1, ')': 1, '*': 1, '+': 1, ',': 1, '-': 1, '.': 1, '/': 1, '0': 1, '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1, '8': 1, '9': 1, ':': 1, ';': 1, '<': 1, '=': 1, '>': 1, '?': 1, '¡': 1, 'A': 1, 'B': 1, 'C': 1, 'D': 1, 'E': 1, 'F': 1, 'G': 1, 'H': 1, 'I': 1, 'J': 1, 'K': 1, 'L': 1, 'M': 1, 'N': 1, 'O': 1, 'P': 1, 'Q': 1, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 1, 'W': 1, 'X': 1, 'Y': 1, 'Z': 1, 'Ä': 1, 'Ö': 1, 'Ñ': 1, 'Ü': 1, '§': 1, '¿': 1, 'a': 1, 'b': 1, 'c': 1, 'd': 1, 'e': 1, 'f': 1, 'g': 1, 'h': 1, 'i': 1, 'j': 1, 'k': 1, 'l': 1, 'm': 1, 'n': 1, 'o': 1, 'p': 1, 'q': 1, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 1, 'w': 1, 'x': 1, 'y': 1, 'z': 1, 'ä': 1, 'ö': 1, 'ñ': 1, 'ü': 1, 'à': 1, "\f": 2, '^': 2, '{': 2, '}': 2, '\\': 2, '[': 2, '~': 2, ']': 2, '|': 2, '€': 2 };

const CountBaseOnEnc16 = (charsLength, enc16) => {
  let charactersLeft = 0;
  let Count = 0;

  if (enc16 === false && charsLength <= config.GSM7.maxSegmentLength) {
    charactersLeft = config.GSM7.maxSegmentLength - charsLength;

    return {
      Count: 1,
      charsLeft: charactersLeft,
      charsEntered: charsLength,
      maxSegmentLength: config.GSM7.maxSegmentLength,
      unicode: false,
      language: 'ENG',
    };
  }

  if (enc16 === true && charsLength <= config.unicode.maxSegmentLength) {
    charactersLeft = config.unicode.maxSegmentLength - charsLength;

    return {
      Count: 1,
      charsLeft: charactersLeft,
      charsEntered: charsLength,
      maxSegmentLength: config.unicode.maxSegmentLength,
      unicode: true,
      language: 'Unicode',
    };
  }

  if (enc16 === false) {
    Count = Math.ceil(charsLength / config.GSM7.maxCharLength);
    charactersLeft = (Count * config.GSM7.maxCharLength) - charsLength;
    return {
      Count,
      charsLeft: charactersLeft,
      charsEntered: charsLength,
      maxSegmentLength: (Count * config.GSM7.maxCharLength),
      unicode: false,
      language: 'ENG',
    };
  }

  Count = Math.ceil(charsLength / config.unicode.maxCharLength);
  charactersLeft = (Count * config.unicode.maxCharLength) - charsLength;

  return {
    Count,
    charsLeft: charactersLeft,
    charsEntered: charsLength,
    maxSegmentLength: (Count * config.unicode.maxCharLength),
    unicode: true,
    language: 'Unicode',
  };
};

export const MsgCount = (msg) => {
  const msgSplit = msg.split('');
  let use7bit = true;
  let length7bit = 0;
  let length16bit = 0;

  msgSplit.forEach(char => {
    if (use7bit && charset7bit[`${char}`] === undefined) {
      use7bit = false;
    }

    if (use7bit) {
      length7bit += charset7bit[`${char}`];
    }

    length16bit += 1;
  });

  let result = {};
  if (use7bit) {
    result = CountBaseOnEnc16(length7bit, false);
  } else {
    result = CountBaseOnEnc16(length16bit, true);
  }

  return result;
};

export const CountInitial = () => (
  {
    Count: 1,
    charsEntered: 0,
    maxSegmentLength: config.GSM7.maxSegmentLength,
    unicode: false,
  }
);
