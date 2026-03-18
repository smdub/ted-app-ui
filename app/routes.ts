import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('about', "routes/about/index.tsx"),
    route('entities', "./routes/entities/index.tsx"),
    route('entities/:id', "./routes/entities/details.tsx"),    
    route('search', './routes/search/index.tsx')
] satisfies RouteConfig;
