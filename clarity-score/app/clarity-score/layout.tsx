import Link from 'next/link';

export default function ClarityScoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-bg-primary/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 max-w-4xl items-center px-4 md:px-6">
                    <Link href="/clarity-score" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded">
                        <span className="font-heading text-lg font-bold uppercase tracking-widest text-white">PSYCHAGE</span>
                    </Link>
                    <div className="ml-auto">
                        {/* Minimal auth status component would go here */}
                    </div>
                </div>
            </header>
            <main className="relative w-full flex-1">
                {children}
            </main>
        </div>
    );
}
