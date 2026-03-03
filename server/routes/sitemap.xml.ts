interface CategoryNode {
    slug: string;
    children?: CategoryNode[];
}

interface ProductItem {
    slug: string;
}

function extractCategorySlugs(cats: CategoryNode[]): string[] {
    return cats.flatMap(cat => [cat.slug, ...extractCategorySlugs(cat.children ?? [])]);
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const SITE_URL = (config.public.siteUrl as string);
    const API_BASE = config.public.apiBaseUrl as string;

    const today = new Date().toISOString().split('T')[0];

    const staticPages = [
        { url: '/',                                       priority: '1.0', changefreq: 'daily'   },
        { url: '/services',                               priority: '0.8', changefreq: 'weekly'  },
        { url: '/services/university-management-system',  priority: '0.7', changefreq: 'monthly' },
        { url: '/services/scholarship-management-system', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact',                                priority: '0.7', changefreq: 'monthly' },
        { url: '/privacy-policy',                         priority: '0.3', changefreq: 'yearly'  },
        { url: '/terms-and-conditions',                   priority: '0.3', changefreq: 'yearly'  },
    ];

    let categorySlugs: string[] = [];
    let productSlugs: string[] = [];

    // Fetch all category slugs (tree, recursive)
    try {
        const catRes = await $fetch<{ data: CategoryNode[] }>(
            `${API_BASE}/api/v1/categories/tree`,
        );
        categorySlugs = extractCategorySlugs(catRes.data ?? []);
    } catch {
        // proceed with static pages if API is unreachable
    }

    // Fetch all product slugs (paginated, 100 per page)
    try {
        const firstPage = await $fetch<{ data: ProductItem[]; meta: { last_page: number } }>(
            `${API_BASE}/api/v1/products?per_page=100`,
        );
        productSlugs = (firstPage.data ?? []).map(p => p.slug);

        const lastPage = firstPage.meta?.last_page ?? 1;
        if (lastPage > 1) {
            const rest = await Promise.allSettled(
                Array.from({ length: lastPage - 1 }, (_, i) =>
                    $fetch<{ data: ProductItem[] }>(`${API_BASE}/api/v1/products?per_page=100&page=${i + 2}`),
                ),
            );
            rest.forEach(r => {
                if (r.status === 'fulfilled') {
                    productSlugs.push(...(r.value.data ?? []).map(p => p.slug));
                }
            });
        }
    } catch {
        // proceed with what we have
    }

    const urlEntries = [
        ...staticPages.map(p => ({
            loc: `${SITE_URL}${p.url}`,
            priority: p.priority,
            changefreq: p.changefreq,
        })),
        ...categorySlugs.map(slug => ({
            loc: `${SITE_URL}/categories/${slug}`,
            priority: '0.9',
            changefreq: 'daily',
        })),
        ...productSlugs.map(slug => ({
            loc: `${SITE_URL}/products/${slug}`,
            priority: '0.8',
            changefreq: 'weekly',
        })),
    ];

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urlEntries.map(u =>
            `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
        ),
        '</urlset>',
    ].join('\n');

    setHeader(event, 'Content-Type', 'application/xml; charset=UTF-8');
    setHeader(event, 'Cache-Control', 'public, max-age=43200'); // 12-hour cache
    return xml;
});
