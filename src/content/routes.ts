import routeData from './routes.json';

const routes = routeData as Record<string, (number[][] | null)[]>;

export function getRouteSegments(crawlSlug: string): (number[][] | null)[] | undefined {
  return routes[crawlSlug];
}
