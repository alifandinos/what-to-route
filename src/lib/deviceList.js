import { ipToInt, intToIp } from "./ipCalc";

/**
 * Generate sequential IPs for a segment's devices, starting from usableFirst.
 * @param {{usableFirst: string}} segmentResult
 * @param {number} count
 * @returns {string[]}
 */
export function generateDeviceIps(segmentResult, count) {
  const startInt = ipToInt(segmentResult.usableFirst);
  const ips = [];
  for (let i = 0; i < count; i++) {
    ips.push(intToIp(startInt + i));
  }
  return ips;
}