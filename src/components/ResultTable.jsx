import EditableCell from "./EditableCell";
import DeviceList from "./DeviceList";

export default function ResultTable({
  vlsmResult,
  onRename,
  expandedSegments,
  toggleExpand,
  getDeviceName,
  setDeviceName,
}) {
  if (!vlsmResult.success) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
        {vlsmResult.error}
      </div>
    );
  }

  if (vlsmResult.results.length === 0) {
    return (
      <div className="text-gray-400 text-sm italic p-4">
        No segments yet. Add one above to get started.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border">
      <table className="w-full text-sm table-fixed border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b text-left text-gray-600">
            <th className="px-3 py-2 w-32">Segment</th>
            <th className="px-3 py-2 w-32">Network</th>
            <th className="px-3 py-2 w-32">Mask</th>
            <th className="px-3 py-2 w-16">CIDR</th>
            <th className="px-3 py-2 w-32">Broadcast</th>
            <th className="px-3 py-2 w-40">Usable Range</th>
            <th className="px-3 py-2 w-20 text-right">Req.</th>
            <th className="px-3 py-2 w-20 text-right">Avail.</th>
            <th className="px-3 py-2 w-24">Devices</th>
          </tr>
        </thead>
        <tbody>
          {vlsmResult.results.map((r) => (
            <>
              <tr key={r.id} className="border-b last:border-0">
                <td className="px-3 py-2 font-medium">
                  <EditableCell value={r.name} onSave={(name) => onRename(r.id, name)} />
                </td>
                <td className="px-3 py-2 font-mono">{r.network}</td>
                <td className="px-3 py-2 font-mono">{r.mask}</td>
                <td className="px-3 py-2">/{r.cidr}</td>
                <td className="px-3 py-2 font-mono">{r.broadcast}</td>
                <td className="px-3 py-2 font-mono">
                  {r.usableFirst} – {r.usableLast}
                </td>
                <td className="px-3 py-2 text-right">{r.requestedHosts}</td>
                <td className="px-3 py-2 text-right">{r.availableHosts}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => toggleExpand(r.id)}
                    className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                  >
                    {expandedSegments.has(r.id) ? "Hide" : "List devices"}
                  </button>
                </td>
              </tr>
              {expandedSegments.has(r.id) && (
                <tr key={`${r.id}-expanded`}>
                  <td colSpan={9} className="px-3 py-2 bg-gray-50">
                    <DeviceList
                      segmentResult={r}
                      getDeviceName={getDeviceName}
                      setDeviceName={setDeviceName}
                    />
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}