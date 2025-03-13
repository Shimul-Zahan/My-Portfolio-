/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                tertiary: 'var(--color-tertiary)',
                textPrimary: 'var(--color-text-primary)',
                textSecondary: 'var(--color-text-secondary)',
                background: 'var(--color-background)',
            },
            fontFamily: {
                'sans': ['Inter var', ...defaultTheme.fontFamily.sans],
                'display': ['Clash Display', 'Inter var', ...defaultTheme.fontFamily.sans],
                'heading': ['Cabinet Grotesk', 'Inter var', ...defaultTheme.fontFamily.sans],
                'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '85ch',
                        h1: {
                            fontFamily: 'Cabinet Grotesk',
                            fontWeight: '700',
                            letterSpacing: '-0.02em',
                            fontSize: '2.5rem',
                            lineHeight: '1.2',
                        },
                        h2: {
                            fontFamily: 'Cabinet Grotesk',
                            fontWeight: '600',
                            letterSpacing: '-0.015em',
                            fontSize: '2rem',
                            lineHeight: '1.3',
                        },
                        h3: {
                            fontFamily: 'Cabinet Grotesk',
                            fontWeight: '600',
                            letterSpacing: '-0.015em',
                            fontSize: '1.5rem',
                            lineHeight: '1.4',
                        },
                        h4: {
                            fontFamily: 'Cabinet Grotesk',
                            fontWeight: '500',
                            letterSpacing: '-0.01em',
                            fontSize: '1.25rem',
                            lineHeight: '1.4',
                        },
                        p: {
                            fontFamily: 'Inter var',
                            lineHeight: '1.75',
                            fontSize: '1.125rem',
                            marginTop: '1.5em',
                            marginBottom: '1.5em',
                        },
                        strong: {
                            fontWeight: '600',
                            color: 'inherit',
                        },
                        a: {
                            fontWeight: '500',
                            textDecoration: 'none',
                            color: 'inherit',
                            '&:hover': {
                                color: 'var(--tw-prose-links)',
                            },
                        },
                        code: {
                            fontFamily: 'JetBrains Mono',
                            fontWeight: '400',
                            fontSize: '0.875em',
                            borderRadius: '0.25rem',
                            padding: '0.2em 0.4em',
                            backgroundColor: 'var(--tw-prose-pre-bg)',
                        },
                        pre: {
                            fontFamily: 'JetBrains Mono',
                            backgroundColor: 'var(--tw-prose-pre-bg)',
                            borderRadius: '0.5rem',
                            padding: '1.25em 1.5em',
                            overflow: 'auto',
                            code: {
                                backgroundColor: 'transparent',
                                padding: '0',
                                fontSize: 'inherit',
                            },
                        },
                        blockquote: {
                            fontStyle: 'normal',
                            fontWeight: '500',
                            borderLeftWidth: '0.25rem',
                            borderLeftColor: 'var(--tw-prose-quote-borders)',
                            quotes: '"\\201C""\\201D""\\2018""\\2019"',
                            marginTop: '2em',
                            marginBottom: '2em',
                        },
                    },
                },
                dark: {
                    css: {
                        '--tw-prose-body': '#8892b0',
                        '--tw-prose-headings': '#ccd6f6',
                        '--tw-prose-links': '#64ffda',
                        '--tw-prose-bold': '#ccd6f6',
                        '--tw-prose-code': '#ccd6f6',
                        '--tw-prose-pre-code': '#ccd6f6',
                        '--tw-prose-pre-bg': '#112240',
                        '--tw-prose-quote-borders': '#64ffda',
                        '--tw-prose-quotes': '#ccd6f6',
                    },
                },
                light: {
                    css: {
                        '--tw-prose-body': '#64748b',
                        '--tw-prose-headings': '#1e293b',
                        '--tw-prose-links': '#2563eb',
                        '--tw-prose-bold': '#1e293b',
                        '--tw-prose-code': '#1e293b',
                        '--tw-prose-pre-code': '#1e293b',
                        '--tw-prose-pre-bg': '#f1f5f9',
                        '--tw-prose-quote-borders': '#2563eb',
                        '--tw-prose-quotes': '#1e293b',
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
} 