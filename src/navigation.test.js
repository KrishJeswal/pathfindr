import { describe, it, expect } from 'vitest';
import {
  NODES,
  FLOORS,
  getRoomOptions,
  findShortestPathAStar,
} from './navigation.js';

describe('navigation graph', () => {
  it('exposes the existing ground + first floor rooms', () => {
    expect(NODES['G_LIFT']).toBeTruthy();
    expect(NODES['1_LIFT']).toBeTruthy();
    expect(NODES['G_SEMINAR'].label).toBe('Seminar Hall');
  });

  it('lists floors as metadata for the switcher', () => {
    expect(FLOORS.map(f => f.id)).toContain(0);
    expect(FLOORS.map(f => f.id)).toContain(1);
  });

  it('returns room options sorted by label', () => {
    const opts = getRoomOptions();
    const labels = opts.map(o => o.label);
    const sorted = [...labels].sort((a, b) => a.localeCompare(b));
    expect(labels).toEqual(sorted);
    expect(opts.every(o => o.isRoom)).toBe(true);
  });

  it('finds a same-floor path between two ground-floor rooms', () => {
    const path = findShortestPathAStar('G_MEN', 'G_LAB');
    expect(path[0]).toBe('G_MEN');
    expect(path[path.length - 1]).toBe('G_LAB');
    expect(path.length).toBeGreaterThan(2);
  });

  it('routes between floors through the lift', () => {
    const path = findShortestPathAStar('G_MEN', '1_ET101');
    expect(path).toContain('G_LIFT');
    expect(path).toContain('1_LIFT');
  });

  it('returns [] for unknown nodes', () => {
    expect(findShortestPathAStar('NOPE', 'G_LAB')).toEqual([]);
  });

  it('includes the 2nd and 3rd floors in metadata', () => {
    expect(FLOORS.map(f => f.id)).toContain(2);
    expect(FLOORS.map(f => f.id)).toContain(3);
  });

  it('has all floor-2 rooms in the graph', () => {
    ['2_ET201', '2_ET202', '2_ET203', '2_STAFF', '2_LAB', '2_PG', '2_FREE', '2_LIFT']
      .forEach(id => expect(NODES[id], id).toBeTruthy());
  });

  it('has all floor-3 rooms in the graph', () => {
    ['3_MEN', '3_WOMEN', '3_ET301', '3_LAB', '3_LIFT']
      .forEach(id => expect(NODES[id], id).toBeTruthy());
  });

  it('routes from ground floor to a 2nd-floor room through both lifts', () => {
    const path = findShortestPathAStar('G_MEN', '2_ET201');
    expect(path[0]).toBe('G_MEN');
    expect(path[path.length - 1]).toBe('2_ET201');
    expect(path).toContain('G_LIFT');
    expect(path).toContain('1_LIFT');
    expect(path).toContain('2_LIFT');
  });

  it('routes from ground floor to a 3rd-floor room through every lift', () => {
    const path = findShortestPathAStar('G_LAB', '3_ET301');
    expect(path[path.length - 1]).toBe('3_ET301');
    ['G_LIFT', '1_LIFT', '2_LIFT', '3_LIFT'].forEach(id => expect(path).toContain(id));
  });
});
