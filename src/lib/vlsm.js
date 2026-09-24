// src/lib/vlsm.js
import { intToIp, hostsToPrefix, blockSize, parseCidr } from "./ipCalc";

/**
 * @param {Array<{id: string, name: string, hostCount: number}>} segments
 * @param {string} baseCidr - misal "192.168.1.0/24"
 * @returns {{ success: boolean, results?: Array, error?: string }}
 */
export function allocateVLSM(segments, baseCidr) {
  const { networkInt: baseNetworkInt, prefix: basePrefix } = parseCidr(baseCidr);
  const totalSpace = blockSize(basePrefix);

  // VLSM rule: urutkan dari host terbanyak ke tersedikit dulu
  const sorted = [...segments].sort((a, b) => b.hostCount - a.hostCount);

  let cursor = baseNetworkInt;
  const results = [];

  for (const segment of sorted) {
    const prefix = hostsToPrefix(segment.hostCount);
    const size = blockSize(prefix);

    // cek apakah masih cukup ruang di dalam base network
    if (cursor + size > baseNetworkInt + totalSpace) {
      return {
        success: false,
        error: `Ruang IP tidak cukup untuk segmen "${segment.name}" (butuh ${segment.hostCount} host). Coba pakai base network yang lebih besar.`,
      };
    }

    const networkAddr = cursor;
    const broadcastAddr = cursor + size - 1;

    results.push({
      id: segment.id,
      name: segment.name,
      requestedHosts: segment.hostCount,
      availableHosts: size - 2,
      network: intToIp(networkAddr),
      broadcast: intToIp(broadcastAddr),
      cidr: prefix,
      mask: cidrToMaskFromPrefix(prefix),
      usableFirst: intToIp(networkAddr + 1),
      usableLast: intToIp(broadcastAddr - 1),
    });

    cursor += size;
  }

  // urutkan kembali hasil sesuai urutan input asli user (biar tabel tidak acak)
  const orderedResults = segments.map((s) =>
    results.find((r) => r.id === s.id)
  );

  return { success: true, results: orderedResults };
}

// helper kecil biar tidak import ulang cidrToMask dengan nama beda
function cidrToMaskFromPrefix(prefix) {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return [
    (mask >>> 24) & 255,
    (mask >>> 16) & 255,
    (mask >>> 8) & 255,
    mask & 255,
  ].join(".");
}