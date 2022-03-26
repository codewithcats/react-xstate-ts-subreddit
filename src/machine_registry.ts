import { MachineEvent } from "./machine_events";

const registry = new Map<string, Map<string, any>>();

export function registerMachine(id: string, events: string[], send: any) {
  console.log("register machine", id, events);
  events.forEach((e) => {
    if (registry.has(e)) {
      const map = registry.get(e);
      map?.set(id, send);
    } else {
      const map = new Map();
      map.set(id, send);
      registry.set(e, map);
    }
  });
}

export function publish(event: MachineEvent) {
  const xs = registry.get(event.type);
  xs?.forEach((send) => send(event));
}
