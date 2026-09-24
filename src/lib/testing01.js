import { allocateVLSM } from "./vlsm";

const segments = [
  { id: "1", name: "Sales", hostCount: 50 },
  { id: "2", name: "Server", hostCount: 50 },
];

console.log(allocateVLSM(segments, "192.168.1.0/24"));