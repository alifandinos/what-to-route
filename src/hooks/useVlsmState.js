import { useState, useMemo } from "react";
import { allocateVLSM } from "../lib/vlsm";

let idCounter = 1;
const nextId = () => String(idCounter++);

export function useVlsmState() {
  
  const [baseCidr, setBaseCidr] = useState("192.168.1.0/24");
  const [segments, setSegments] = useState([
    { id: nextId(), name: "Segment 1", hostCount: 10 },
  ]);

  const addSegment = () => {
    setSegments((prev) => [
      ...prev,
      { id: nextId(), name: `Segment ${prev.length + 1}`, hostCount: 10 },
    ]);
  };

  const removeSegment = (id) => {
    setSegments((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSegmentName = (id, name) => {
    setSegments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name } : s))
    );
  };

  const updateSegmentHosts = (id, hostCount) => {
    setSegments((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, hostCount: Math.max(1, hostCount) } : s
      )
    );
  };

  // otomatis re-kalkulasi tiap segments atau baseCidr berubah
  const vlsmResult = useMemo(() => {
    if (segments.length === 0) {
      return { success: true, results: [] };
    }
    try {
      return allocateVLSM(segments, baseCidr);
    } catch (e) {
      return { success: false, error: "Format base network tidak valid (contoh: 192.168.1.0/24)" };
    }
  }, [segments, baseCidr]);
  const [expandedSegments, setExpandedSegments] = useState(new Set());
  const [deviceNames, setDeviceNames] = useState({}); // key: "segmentId-index" -> custom name

  const toggleExpand = (segmentId) => {
  setExpandedSegments((prev) => {
    const next = new Set(prev);
    next.has(segmentId) ? next.delete(segmentId) : next.add(segmentId);
    return next;
  });
};

const getDeviceName = (segmentId, index, segmentName) => {
  const key = `${segmentId}-${index}`;
  return deviceNames[key] ?? `${segmentName} ${index + 1}`; // template default
};

const setDeviceName = (segmentId, index, name) => {
  const key = `${segmentId}-${index}`;
  setDeviceNames((prev) => ({ ...prev, [key]: name }));
};
  return {
    baseCidr,
    setBaseCidr,
    segments,
    addSegment,
    removeSegment,
    updateSegmentName,
    updateSegmentHosts,
    vlsmResult,
    expandedSegments,
    toggleExpand,
    getDeviceName,
    setDeviceName,
  };
}