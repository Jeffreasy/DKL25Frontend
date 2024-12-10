export interface Video {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export const videos: Video[] = [
  {
    id: 'video1',
    url: 'https://streamable.com/e/tt6k80?loop=0&autoplay=0&muted=0&controls=1&title=0',
    title: 'Video 1',
    description: 'Bekijk de sfeerimpressie van De Koninklijke Loop'
  },
  {
    id: 'video2',
    url: 'https://streamable.com/e/cvfrpi?loop=0&autoplay=0&muted=0&controls=1&title=0',
    title: 'Video 2',
    description: 'Interviews met deelnemers'
  },
  {
    id: 'video3',
    url: 'https://streamable.com/e/0o2qf9?loop=0&autoplay=0&muted=0&controls=1&title=0',
    title: 'Video 3',
    description: 'Hoogtepunten van vorig jaar'
  }
]; 