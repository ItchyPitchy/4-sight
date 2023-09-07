import { lineIntersection } from "./line-intersection";
import { endpointCompare } from "./endpoint-compare";
import { segmentInFrontOf } from "./segment-in-front-of";
import { Point } from "./point";
import { EndPoint } from "./end-point";
import { Segment } from "./segment";

function getTrianglePoints(
  origin: Point,
  angle1: number,
  angle2: number,
  segment: Segment
): Point[] {
  const p1 = origin;
  const p2 = new Point(
    origin.x + Math.cos(angle1),
    origin.y + Math.sin(angle1)
  );
  const p3 = new Point(0, 0);
  const p4 = new Point(0, 0);

  if (segment) {
    p3.x = segment.p1.x;
    p3.y = segment.p1.y;
    p4.x = segment.p2.x;
    p4.y = segment.p2.y;
  } else {
    p3.x = origin.x + Math.cos(angle1) * 200;
    p3.y = origin.y + Math.sin(angle1) * 200;
    p4.x = origin.x + Math.cos(angle2) * 200;
    p4.y = origin.y + Math.sin(angle2) * 200;
  }

  const pBegin = lineIntersection(p3, p4, p1, p2);

  p2.x = origin.x + Math.cos(angle2);
  p2.y = origin.y + Math.sin(angle2);

  const pEnd = lineIntersection(p3, p4, p1, p2);

  return [pBegin, pEnd];
}

export function calculateVisibility(
  origin: Point,
  endpoints: EndPoint[]
): Point[][] {
  const openSegments = [];
  const output = [];
  let beginAngle = 0;

  endpoints.sort(endpointCompare);

  for (let pass = 0; pass < 2; pass += 1) {
    for (const endpoint of endpoints) {
      const openSegment = openSegments[0];

      if (endpoint.beginsSegment) {
        let index = 0;
        let segment = openSegments[index];
        while (segment && segmentInFrontOf(endpoint.segment, segment, origin)) {
          index += 1;
          segment = openSegments[index];
        }

        if (!segment) {
          openSegments.push(endpoint.segment);
        } else {
          openSegments.splice(index, 0, endpoint.segment);
        }
      } else {
        const index = openSegments.indexOf(endpoint.segment);
        if (index > -1) {
          openSegments.splice(index, 1);
        }
      }

      if (openSegment !== openSegments[0]) {
        if (pass === 1) {
          const trianglePoints = getTrianglePoints(
            origin,
            beginAngle,
            endpoint.angle,
            openSegment
          );
          output.push(trianglePoints);
        }
        beginAngle = endpoint.angle;
      }
    }
  }

  return output;
}
