import { Router } from 'express';
import { z } from 'zod';
import crypto from 'node:crypto';

export const mapRouter = Router();

const markers: any[] = [];

mapRouter.get('/markers', (req, res) => {
  const schema = z.object({
    bbox: z
      .string()
      .optional()
      .refine((val) => !val || val.split(',').length === 4, 'bbox formatı minLng,minLat,maxLng,maxLat'),
  });
  schema.parse(req.query);

  res.json({
    data: { markers, clusters: clusterMarkers(markers) },
    meta: { safetyDisclaimer: req.safetyDisclaimer },
  });
});

mapRouter.post('/markers', (req, res) => {
  const schema = z.object({
    markerType: z.enum(['camp', 'water', 'sighting', 'danger']),
    coordinates: z.object({ lat: z.number(), lng: z.number() }),
    notes: z.string().max(240).optional(),
    relatedSpeciesId: z.string().uuid().optional(),
  });

  const body = schema.parse(req.body);
  const marker = {
    id: crypto.randomUUID(),
    ...body,
    createdAt: new Date().toISOString(),
  };
  markers.push(marker);

  res.status(201).json({
    data: marker,
    meta: { safetyDisclaimer: req.safetyDisclaimer },
  });
});

mapRouter.get('/offline-tiles', (req, res) => {
  const schema = z.object({ region: z.string() });
  schema.parse(req.query);
  res.json({
    data: {
      region: req.query.region,
      downloadUrl: 'https://cdn.terraguard.app/map/tiles-' + req.query.region + '.mbtiles',
      sizeMb: 120,
      checksum: 'sha256-123abc',
    },
    meta: { safetyDisclaimer: req.safetyDisclaimer },
  });
});

function clusterMarkers(list: any[]) {
  if (list.length < 3) return [];
  // Basit grid kümeleme
  const cell = 0.5;
  const map = new Map<string, { lat: number; lng: number; count: number }>();
  for (const marker of list) {
    const key = `${Math.round(marker.coordinates.lat / cell)}:${Math.round(marker.coordinates.lng / cell)}`;
    const entry = map.get(key);
    if (!entry) {
      map.set(key, { lat: marker.coordinates.lat, lng: marker.coordinates.lng, count: 1 });
    } else {
      entry.count += 1;
      entry.lat = (entry.lat + marker.coordinates.lat) / 2;
      entry.lng = (entry.lng + marker.coordinates.lng) / 2;
    }
  }
  return Array.from(map.values());
}

