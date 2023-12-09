const keyMap: Record<number, string> = {
	0x30: '0',
	0x31: '1',
	0x32: '2',
	0x33: '3',
	0x34: '4',
	0x35: '5',
	0x36: '6',
	0x37: '7',
	0x38: '8',
	0x39: '9',
	0x41: 'A',
	0x42: 'B',
	0x43: 'C',
	0x44: 'D',
	0x45: 'E',
	0x46: 'F',
	0x47: 'G',
	0x48: 'H',
	0x49: 'I',
	0x4a: 'J',
	0x4b: 'K',
	0x4c: 'L',
	0x4d: 'M',
	0x4e: 'N',
	0x4f: 'O',
	0x50: 'P',
	0x51: 'Q',
	0x52: 'R',
	0x53: 'S',
	0x54: 'T',
	0x55: 'U',
	0x56: 'V',
	0x57: 'W',
	0x58: 'X',
	0x59: 'Y',
	0x5a: 'Z',
	0x61: 'a',
	0x62: 'b',
	0x63: 'c',
	0x64: 'd',
	0x65: 'e',
	0x66: 'f',
	0x67: 'g',
	0x68: 'h',
	0x69: 'i',
	0x6a: 'j',
	0x6b: 'k',
	0x6c: 'l',
	0x6d: 'm',
	0x6e: 'n',
	0x6f: 'o',
	0x70: 'p',
	0x71: 'q',
	0x72: 'r',
	0x73: 's',
	0x74: 't',
	0x75: 'u',
	0x76: 'v',
	0x77: 'w',
	0x78: 'x',
	0x79: 'y',
	0x7a: 'z',
	0x2d: '-',
	0x2e: '.',
	0x5f: '_',
	0x7e: '~',
} as const;

export function encode(stringOrByteArray: string | Uint8Array) {
	return new Promise<string>((resolve, reject) => {
		try {
			const byteArray = typeof stringOrByteArray === 'string'
				? new TextEncoder().encode(stringOrByteArray)
				: stringOrByteArray;

			let result = '';

			for (const byte of byteArray) {
				if (byte in keyMap) {
					result += keyMap[byte];
					continue;
				}

				const hex = byte.toString(16).toUpperCase();
				result += `%${hex.length === 1 ? `0${hex}` : hex}`;
			}

			resolve(result);
		} catch (err) {
			reject(err);
		}
	});
}

export function decode(string: string) {
	return new Promise<string>((resolve, reject) => {
		try {
			const result = new Uint8Array(string.length);
			let index = 0;

			for (let i = 0; i < string.length; i++) {
				const char = string[i];

				if (char === '%') {
					// get the next two characters
					// example: %20 -> 20
					const hexAsString = string.slice(i + 1, i + 3);
					// convert the hex string to a hex number
					// parseInt('20', 16) would work here but it's deprecated
					// Number needs the 0x prefix manually added
					result[index++] = Number(`0x${hexAsString}`);
					i += 2;
					continue;
				}

				result[index++] = char.charCodeAt(0);
			}

			resolve(new TextDecoder().decode(result.slice(0, index)));
		} catch (err) {
			reject(err);
		}
	});
}
