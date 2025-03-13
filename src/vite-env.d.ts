/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GITHUB_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
} 