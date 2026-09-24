export default function SegmentForm({
  baseCidr,
  setBaseCidr,
  segments,
  addSegment,
  removeSegment,
  updateSegmentName,
  updateSegmentHosts,
}) {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Base Network
        </label>
        <input
          className="border rounded px-3 py-2 w-full max-w-xs text-sm"
          value={baseCidr}
          onChange={(e) => setBaseCidr(e.target.value)}
          placeholder="192.168.1.0/24"
        />
      </div>

      <div className="space-y-2">
        {segments.map((seg) => (
          <div key={seg.id} className="flex items-center gap-2">
            <input
              className="border rounded px-2 py-1 text-sm flex-1"
              value={seg.name}
              onChange={(e) => updateSegmentName(seg.id, e.target.value)}
            />
            <input
              type="number"
              min="1"
              className="border rounded px-2 py-1 text-sm w-24"
              value={seg.hostCount}
              onChange={(e) =>
                updateSegmentHosts(seg.id, parseInt(e.target.value, 10) || 1)
              }
            />
            <button
              onClick={() => removeSegment(seg.id)}
              className="text-red-500 hover:text-red-700 text-sm px-2"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addSegment}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        + Tambah Segmen
      </button>
    </div>
  );
}