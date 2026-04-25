import { Head } from '@inertiajs/react';

type SeoHeadProps = {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    robots?: string;
};

const appName = import.meta.env.VITE_APP_NAME || 'applyst';
const defaultDescription =
    'Track job applications, monitor job search effectiveness, and keep follow-ups organized in one place.';

function toAbsoluteUrl(value: string): string {
    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    if (typeof window === 'undefined') {
        return value;
    }

    return new URL(value, window.location.origin).toString();
}

export function SeoHead({
    title,
    description = defaultDescription,
    image = '/og.png',
    url,
    type = 'website',
    robots = 'index, follow',
}: SeoHeadProps) {
    const fullTitle = `${title} - ${appName}`;
    const canonicalUrl =
        url ??
        (typeof window === 'undefined' ? undefined : window.location.href);
    const imageUrl = toAbsoluteUrl(image);

    return (
        <Head title={title}>
            <meta
                head-key="description"
                name="description"
                content={description}
            />
            <meta head-key="robots" name="robots" content={robots} />

            {canonicalUrl ? (
                <link
                    head-key="canonical"
                    rel="canonical"
                    href={canonicalUrl}
                />
            ) : null}

            <meta head-key="og:type" property="og:type" content={type} />
            <meta head-key="og:title" property="og:title" content={fullTitle} />
            <meta
                head-key="og:description"
                property="og:description"
                content={description}
            />
            {canonicalUrl ? (
                <meta
                    head-key="og:url"
                    property="og:url"
                    content={canonicalUrl}
                />
            ) : null}
            <meta head-key="og:image" property="og:image" content={imageUrl} />
            <meta
                head-key="og:site_name"
                property="og:site_name"
                content={appName}
            />

            <meta
                head-key="twitter:card"
                name="twitter:card"
                content="summary_large_image"
            />
            <meta
                head-key="twitter:title"
                name="twitter:title"
                content={fullTitle}
            />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={description}
            />
            <meta
                head-key="twitter:image"
                name="twitter:image"
                content={imageUrl}
            />
        </Head>
    );
}
