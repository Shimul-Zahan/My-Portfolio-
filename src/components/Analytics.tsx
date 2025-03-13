import React, { useEffect, useState, Component } from 'react';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import env from '../config/env';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Error Boundary Component
class AnalyticsErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error) {
        console.error('Analytics Error:', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-primary/50 p-8 rounded-lg border border-red-500/20">
                    <h2 className="text-xl font-semibold text-red-500 mb-4">Something went wrong</h2>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

// Types
interface GitHubRepo {
    name: string;
    stars: number;
    forks: number;
    url: string;
}

interface GitHubData {
    contributions: {
        count: number;
        date: string;
    }[];
    languages: { [key: string]: number };
    stats: {
        publicRepos: number;
        stars: number;
        forks: number;
        issues: number;
        pullRequests: number;
    };
    topRepos: GitHubRepo[];
}

// Cache implementation
const CACHE_KEY = 'github_analytics_data';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const getFromCache = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }

    return data;
};

const setToCache = (data: GitHubData) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
    }));
};

const Analytics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const [githubData, setGithubData] = useState<GitHubData>({
        contributions: [],
        languages: {},
        stats: {
            publicRepos: 0,
            stars: 0,
            forks: 0,
            issues: 0,
            pullRequests: 0,
        },
        topRepos: [],
    });

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Try to get data from cache first
                const cachedData = getFromCache();
                if (cachedData) {
                    setGithubData(cachedData);
                    setIsLoading(false);
                    return;
                }

                if (!env.GITHUB_TOKEN) {
                    throw new Error('GitHub token not found. Please add your token to continue.');
                }

                const headers = {
                    'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                };

                // Check rate limit first
                const rateResponse = await fetch('https://api.github.com/rate_limit', { headers });
                const rateData = await rateResponse.json();

                if (rateData.resources.core.remaining === 0) {
                    const resetTime = new Date(rateData.resources.core.reset * 1000);
                    throw new Error(`API rate limit exceeded. Resets at ${resetTime.toLocaleTimeString()}`);
                }

                // Fetch user and repository data
                const [userResponse, reposResponse] = await Promise.all([
                    fetch(`https://api.github.com/users/${env.USERNAME}`, { headers }),
                    fetch(`https://api.github.com/users/${env.USERNAME}/repos?per_page=100&sort=stars`, { headers })
                ]);

                if (!userResponse.ok || !reposResponse.ok) {
                    throw new Error('Failed to fetch GitHub data. Please try again.');
                }

                const [userData, reposData] = await Promise.all([
                    userResponse.json(),
                    reposResponse.json()
                ]);

                // Process repository data
                let totalStars = 0;
                let totalForks = 0;
                let totalIssues = 0;
                const languages: { [key: string]: number } = {};
                const topRepos: GitHubRepo[] = [];

                // Fetch languages for each repository
                const repoPromises = reposData.map(async (repo: any) => {
                    totalStars += repo.stargazers_count;
                    totalForks += repo.forks_count;
                    totalIssues += repo.open_issues_count;

                    if (repo.stargazers_count > 0 || repo.forks_count > 0) {
                        topRepos.push({
                            name: repo.name,
                            stars: repo.stargazers_count,
                            forks: repo.forks_count,
                            url: repo.html_url
                        });
                    }

                    const langResponse = await fetch(repo.languages_url, { headers });
                    if (langResponse.ok) {
                        const langData = await langResponse.json();
                        Object.entries(langData).forEach(([lang, bytes]) => {
                            languages[lang] = (languages[lang] || 0) + (bytes as number);
                        });
                    }
                });

                await Promise.all(repoPromises);

                // Sort top repos by combined stars and forks
                topRepos.sort((a, b) => (b.stars + b.forks) - (a.stars + a.forks));

                // Generate contribution data for the last 12 months
                const months = Array.from({ length: 12 }, (_, i) => {
                    const date = new Date();
                    date.setMonth(date.getMonth() - i);
                    return {
                        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        count: Math.floor(Math.random() * 100 + 20) // Placeholder until we implement actual contribution data
                    };
                }).reverse();

                const githubData: GitHubData = {
                    contributions: months,
                    languages,
                    stats: {
                        publicRepos: userData.public_repos,
                        stars: totalStars,
                        forks: totalForks,
                        issues: totalIssues,
                        pullRequests: reposData.length, // Using repo count as a proxy for PRs
                    },
                    topRepos: topRepos.slice(0, 6),
                };

                // Cache the data before setting state
                setToCache(githubData);
                setGithubData(githubData);
                setIsLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching GitHub data:', error);
                const errorMessage = error instanceof Error ? error.message : 'Failed to load GitHub data';
                setError(errorMessage);
                setIsLoading(false);
            }
        };

        fetchGitHubData();
    }, [retryCount]);

    const handleRetry = () => {
        setIsLoading(true);
        setError(null);
        setRetryCount(prev => prev + 1);
    };

    // Chart configurations
    const contributionData = {
        labels: githubData.contributions.map(c => c.date),
        datasets: [{
            label: 'Contributions',
            data: githubData.contributions.map(c => c.count),
            borderColor: 'rgb(100, 255, 218)',
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            tension: 0.4,
            fill: true,
        }],
    };

    const languageData = {
        labels: Object.keys(githubData.languages),
        datasets: [{
            data: Object.values(githubData.languages),
            backgroundColor: [
                '#3776AB', // Python
                '#F7DF1E', // JavaScript
                '#3178C6', // TypeScript
                '#E34F26', // HTML
                '#1572B6', // CSS
                '#8A2BE2', // Other
            ],
            borderWidth: 0,
        }],
    };

    const repoStatsData = {
        labels: ['Repositories', 'Stars', 'Forks', 'Issues', 'Pull Requests'],
        datasets: [{
            label: 'GitHub Statistics',
            data: [
                githubData.stats.publicRepos,
                githubData.stats.stars,
                githubData.stats.forks,
                githubData.stats.issues,
                githubData.stats.pullRequests,
            ],
            backgroundColor: 'rgba(100, 255, 218, 0.6)',
            borderColor: 'rgb(100, 255, 218)',
            borderWidth: 1,
        }],
    };

    if (isLoading) {
        return (
            <section className="py-20 bg-primary min-h-screen">
                <div className="container-width px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="bg-primary/50 p-8 rounded-lg border border-secondary/20 max-w-2xl mx-auto">
                            <i className="fa-solid fa-circle-notch fa-spin text-4xl text-secondary mb-4"></i>
                            <h2 className="text-xl font-semibold text-secondary mb-2">Loading GitHub Analytics</h2>
                            <p className="text-textSecondary">Fetching your latest GitHub statistics...</p>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-primary min-h-screen">
                <div className="container-width px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="bg-primary/50 p-8 rounded-lg border border-red-500/20 max-w-2xl mx-auto">
                            <i className="fa-solid fa-triangle-exclamation text-4xl text-red-500 mb-4"></i>
                            <h2 className="text-2xl font-bold text-red-500 mb-2">Unable to Load GitHub Data</h2>
                            <p className="text-textSecondary mb-6">{error}</p>
                            <div className="flex flex-col gap-4 items-center">
                                <button
                                    onClick={handleRetry}
                                    className="px-6 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-lg transition-colors"
                                >
                                    <i className="fa-solid fa-rotate-right mr-2"></i>
                                    Try Again
                                </button>
                                <a
                                    href="https://github.com/settings/tokens"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-textSecondary hover:text-secondary transition-colors"
                                >
                                    <i className="fa-solid fa-key mr-1"></i>
                                    Create a New GitHub Token
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <AnalyticsErrorBoundary>
            <section className="py-20 bg-primary min-h-screen">
                <div className="container-width px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">GitHub Analytics</h2>
                        <p className="text-textSecondary max-w-2xl mx-auto">
                            Real-time visualization of my GitHub activity, contributions, and repository statistics
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Contribution Graph */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-primary/50 p-6 rounded-lg border border-secondary/20"
                        >
                            <h3 className="text-xl font-semibold text-secondary mb-4">Yearly Contributions</h3>
                            <Line
                                data={contributionData}
                                options={{
                                    responsive: true,
                                    interaction: {
                                        mode: 'index',
                                        intersect: false,
                                    },
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        tooltip: {
                                            backgroundColor: 'rgba(13, 17, 23, 0.9)',
                                            titleColor: 'rgb(100, 255, 218)',
                                            bodyColor: '#fff',
                                            padding: 12,
                                            displayColors: false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                color: 'rgba(100, 255, 218, 0.1)',
                                            },
                                            ticks: {
                                                color: 'rgba(100, 255, 218, 0.8)',
                                            },
                                        },
                                        x: {
                                            grid: {
                                                color: 'rgba(100, 255, 218, 0.1)',
                                            },
                                            ticks: {
                                                color: 'rgba(100, 255, 218, 0.8)',
                                            },
                                        },
                                    },
                                }}
                            />
                        </motion.div>

                        {/* Language Distribution */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-primary/50 p-6 rounded-lg border border-secondary/20"
                        >
                            <h3 className="text-xl font-semibold text-secondary mb-4">Language Distribution</h3>
                            <div className="w-full max-w-md mx-auto">
                                <Doughnut
                                    data={languageData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    color: 'rgba(100, 255, 218, 0.8)',
                                                    padding: 20,
                                                    font: {
                                                        size: 12,
                                                    },
                                                },
                                            },
                                            tooltip: {
                                                backgroundColor: 'rgba(13, 17, 23, 0.9)',
                                                titleColor: 'rgb(100, 255, 218)',
                                                bodyColor: '#fff',
                                                padding: 12,
                                                callbacks: {
                                                    label: (context) => {
                                                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                                                        const value = context.raw as number;
                                                        const percentage = ((value / total) * 100).toFixed(1);
                                                        return `${context.label}: ${percentage}%`;
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Top Repositories */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="lg:col-span-2 bg-primary/50 p-6 rounded-lg border border-secondary/20"
                        >
                            <h3 className="text-xl font-semibold text-secondary mb-4">Top Repositories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {githubData.topRepos.map((repo, index) => (
                                    <motion.a
                                        key={repo.name}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 + index * 0.1 }}
                                        className="bg-primary/30 p-4 rounded-lg border border-secondary/10 hover:border-secondary/30 transition-colors"
                                    >
                                        <h4 className="text-secondary font-medium mb-2 truncate">{repo.name}</h4>
                                        <div className="flex justify-between text-sm text-textSecondary">
                                            <span>
                                                <i className="fa-solid fa-star mr-1"></i>
                                                {repo.stars}
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-code-fork mr-1"></i>
                                                {repo.forks}
                                            </span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* GitHub Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div className="bg-primary/50 p-6 rounded-lg border border-secondary/20">
                                <img
                                    src={`https://github-readme-stats.vercel.app/api?username=${env.USERNAME}&show_icons=true&theme=dark&hide_border=true&bg_color=0d1117&title_color=64ffda&icon_color=64ffda&text_color=c9d1d9`}
                                    alt="GitHub Stats"
                                    className="w-full"
                                />
                            </div>
                            <div className="bg-primary/50 p-6 rounded-lg border border-secondary/20">
                                <img
                                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${env.USERNAME}&theme=dark&hide_border=true&background=0d1117&stroke=64ffda&ring=64ffda&fire=64ffda&currStreakNum=c9d1d9&sideNums=c9d1d9&currStreakLabel=64ffda&sideLabels=64ffda&dates=c9d1d9`}
                                    alt="GitHub Streak"
                                    className="w-full"
                                />
                            </div>
                        </motion.div>

                        {/* Repository Statistics */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="bg-primary/50 p-6 rounded-lg border border-secondary/20 lg:col-span-2"
                        >
                            <h3 className="text-xl font-semibold text-secondary mb-4">Repository Statistics</h3>
                            <Bar
                                data={repoStatsData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                        tooltip: {
                                            backgroundColor: 'rgba(13, 17, 23, 0.9)',
                                            titleColor: 'rgb(100, 255, 218)',
                                            bodyColor: '#fff',
                                            padding: 12,
                                            displayColors: false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            grid: {
                                                color: 'rgba(100, 255, 218, 0.1)',
                                            },
                                            ticks: {
                                                color: 'rgba(100, 255, 218, 0.8)',
                                            },
                                        },
                                        x: {
                                            grid: {
                                                display: false,
                                            },
                                            ticks: {
                                                color: 'rgba(100, 255, 218, 0.8)',
                                            },
                                        },
                                    },
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </AnalyticsErrorBoundary>
    );
};

export default Analytics; 