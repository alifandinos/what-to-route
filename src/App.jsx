import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useVlsmState } from "./hooks/useVlsmState";
import SegmentForm from "./components/SegmentForm";
import ResultTable from "./components/ResultTable";

export default function App() {
  
  const {
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
  } = useVlsmState();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">What to Route?</h1>
          <p className="text-gray-500 text-sm">
            IP Calculator & VLSM otomatis
          </p>
        </div>

        <SegmentForm
          baseCidr={baseCidr}
          setBaseCidr={setBaseCidr}
          segments={segments}
          addSegment={addSegment}
          removeSegment={removeSegment}
          updateSegmentName={updateSegmentName}
          updateSegmentHosts={updateSegmentHosts}
        />

        <ResultTable   vlsmResult={vlsmResult}
  onRename={updateSegmentName}
  expandedSegments={expandedSegments}
  toggleExpand={toggleExpand}
  getDeviceName={getDeviceName}
  setDeviceName={setDeviceName} />
      </div>
    </div>
  );
}

