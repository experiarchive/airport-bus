import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bus.lintrahub.com';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        // 나중에 개별 버스 노선 페이지가 생긴다면 여기에 동적으로 추가할 수 있습니다.
    ];
}
