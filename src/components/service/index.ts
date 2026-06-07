// src/components/service/index.ts

export { ServiceSelection } from "./ServiceSelection";
export { SERVICES } from "./serviceData";
export type { Service } from "./serviceData";

// ✅ Fix: ServiceCard lives in src/components/, not src/components/service/
export { ServiceCard } from "../ServiceCard";