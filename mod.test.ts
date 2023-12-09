import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { decode, encode } from './mod.ts';

const decodedToEncoded = {
	'Hello Ladies + Gentlemen, a signed OAuth request!':
		'Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21',
	'😊': '%F0%9F%98%8A',
	'Ladies + Gentlemen': 'Ladies%20%2B%20Gentlemen',
	'An encoded string!': 'An%20encoded%20string%21',
	'Dogs, Cats & Mice': 'Dogs%2C%20Cats%20%26%20Mice',
	'☃': '%E2%98%83',
	'!@#%$^&*(){}[]|":?><,./;\'\\`~': '%21%40%23%25%24%5E%26%2A%28%29%7B%7D%5B%5D%7C%22%3A%3F%3E%3C%2C.%2F%3B%27%5C%60~',
	'☺': '%E2%98%BA',
	'☹': '%E2%98%B9',
	'☠': '%E2%98%A0',
	'0123456789': '0123456789',
	abcdefghijklmnopqrstuvwxyz: 'abcdefghijklmnopqrstuvwxyz',
	ABCDEFGHIJKLMNOPQRSTUVWXYZ: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	'!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~':
		'%21%22%23%24%25%26%27%28%29%2A%2B%2C-.%2F%3A%3B%3C%3D%3E%3F%40%5B%5C%5D%5E_%60%7B%7C%7D~',
	' ': '%20',
	'   ': '%20%20%20',
};

Deno.test('encode function', async (t) => {
	for (const [decoded, encoded] of Object.entries(decodedToEncoded)) {
		await t.step(`encode "${decoded}" from string`, async () => {
			assertEquals(await encode(decoded), encoded);
		});

		await t.step(`encode "${decoded}" from ByteArray`, async () => {
			assertEquals(await encode(new TextEncoder().encode(decoded)), encoded);
		});
	}
});

Deno.test('decode function', async (t) => {
	for (const [decoded, encoded] of Object.entries(decodedToEncoded)) {
		await t.step(`decode ${encoded}`, async () => {
			assertEquals(await decode(encoded), decoded);
		});
	}
});
