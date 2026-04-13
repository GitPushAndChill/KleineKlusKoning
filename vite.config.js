import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

function normalizeBasePath(basePath = "/") {
    if (!basePath || basePath === "/") {
        return "/";
    }

    const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`;
    return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

const siteBase = normalizeBasePath(process.env.SITE_BASE);

const htmlRoutes = new Map([
    ["/", "/index.html"],
    ["/portfolio", "/portfolio/index.html"],
    ["/portfolio/", "/portfolio/index.html"],
    ["/portfolio.html", "/portfolio/index.html"],
    ["/contact", "/contact/index.html"],
    ["/contact/", "/contact/index.html"],
    ["/contact.html", "/contact/index.html"],
    ["/contact/bedankt", "/contact/bedankt/index.html"],
    ["/contact/bedankt/", "/contact/bedankt/index.html"],
    ["/contact/bedankt.html", "/contact/bedankt/index.html"]
]);

function htmlRouteAliases() {
    const rewriteUrl = (url) => {
        if (!url) {
            return url;
        }

        const [pathname, search] = url.split("?");
        const rewrittenPath = htmlRoutes.get(pathname);

        if (!rewrittenPath) {
            return url;
        }

        return search ? `${rewrittenPath}?${search}` : rewrittenPath;
    };

    const applyRewrite = (server) => {
        server.middlewares.use((req, _res, next) => {
            req.url = rewriteUrl(req.url);
            next();
        });
    };

    return {
        name: "html-route-aliases",
        configureServer: applyRewrite,
        configurePreviewServer: applyRewrite
    };
}

export default defineConfig({
    base: siteBase,
    plugins: [htmlRouteAliases()],
    server: {
        open: "/"
    },
    preview: {
        open: "/"
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                portfolio: resolve(__dirname, "portfolio/index.html"),
                contact: resolve(__dirname, "contact/index.html"),
                contactThankYou: resolve(__dirname, "contact/bedankt/index.html")
            }
        }
    }
});