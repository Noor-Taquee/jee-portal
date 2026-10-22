export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );

  const hashBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 1000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  // Convert salt and hash to hex strings for safe storage in SQLite/D1
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const hashHex = Array.from(new Uint8Array(hashBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${saltHex}:${hashHex}`;
}

function constantTimeEquals(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let index = 0; index < a.length; index += 1) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return diff === 0;
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [saltHex, originalHashHex] = storedHash.split(":");
  if (!saltHex || !originalHashHex) return false;

  const saltMatches = saltHex.match(/.{1,2}/gu);
  if (!saltMatches || saltMatches.length !== saltHex.length / 2) return false;

  const salt = new Uint8Array(saltMatches.map((byte) => parseInt(byte, 16)));
  const encoder = new TextEncoder();

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  );

  const hashBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  const hashHex = Array.from(new Uint8Array(hashBits))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return constantTimeEquals(hashHex, originalHashHex);
}
