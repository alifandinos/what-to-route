import EditableCell from "./EditableCell";
import { generateDeviceIps } from "../lib/deviceList";

export default function DeviceList({
  segmentResult,
  getDeviceName,
  setDeviceName,
}) {
  const ips = generateDeviceIps(segmentResult, segmentResult.requestedHosts);

  return (
    <div className="bg-gray-50 rounded border p-3 space-y-1">
      <p className="text-xs text-gray-500 mb-2">
        {ips.length} device(s) — double-click a name to rename
      </p>
      <table className="w-full text-sm table-fixed">
        <tbody>
          {ips.map((ip, index) => (
            <tr key={index} className="border-b last:border-0">
              <td className="px-2 py-1 w-1/2">
                <EditableCell
                  value={getDeviceName(segmentResult.id, index, segmentResult.name)}
                  onSave={(name) => setDeviceName(segmentResult.id, index, name)}
                />
              </td>
              <td className="px-2 py-1 font-mono text-gray-600">{ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}