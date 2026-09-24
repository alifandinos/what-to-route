// src/lib/ipCalc.js

/**
 * Ubah string IP (misal "192.168.1.0") jadi integer 32-bit
 */
export function ipToInt(ip) {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

/**
 * Ubah integer 32-bit balik jadi string IP
 */
export function intToIp(int) {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join(".");
}

/**
 * Dari prefix length (misal 27) hasilkan subnet mask string (255.255.255.224)
 */
export function cidrToMask(prefix) {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return intToIp(mask);
}

/**
 * Hitung jumlah IP total dalam block (termasuk network & broadcast)
 */
export function blockSize(prefix) {
  return Math.pow(2, 32 - prefix);
}

/**
 * Cari prefix length minimal yang cukup menampung sejumlah host
 * (host + 2, untuk network address & broadcast address)
 */
export function hostsToPrefix(hostCount) {
  const needed = hostCount + 2;
  let prefix = 32;
  while (Math.pow(2, 32 - prefix) < needed) {
    prefix--;
  }
  return prefix;
}

/**
 * Parse "192.168.1.0/24" jadi { networkInt, prefix }
 */
export function parseCidr(cidrString) {
  const [ip, prefixStr] = cidrString.trim().split("/");
  return {
    networkInt: ipToInt(ip),
    prefix: parseInt(prefixStr, 10),
  };
}