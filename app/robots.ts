import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://bus.lintrahub.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/', // 숨기고 싶은 경로가 있다면 추가
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
