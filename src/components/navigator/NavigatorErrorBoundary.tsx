import React, { Component, ErrorInfo, ReactNode } from 'react';
import { NavigatorButton } from './NavigatorButton';
import { ShieldAlert, RotateCcw, ArrowLeft, XCircle } from 'lucide-react';

interface Props {
    children: ReactNode;
    onReset?: () => void;
    onGoBack?: () => void;
    onExit?: () => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Error boundary scoped to the Navigator flow.
 * Catches errors without taking down the entire app.
 * Provides recovery options: Start Over, Go Back, Exit Navigator.
 */
export class NavigatorErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[NavigatorErrorBoundary] Caught error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        if (this.props.onReset) {
            this.props.onReset();
        }
    };

    private handleGoBack = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        if (this.props.onGoBack) {
            this.props.onGoBack();
        }
    };

    private handleExit = () => {
        if (this.props.onExit) {
            this.props.onExit();
        }
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
                    <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                        {/* Error strip */}
                        <div className="h-2 bg-crisis-red"></div>

                        <div className="p-8 sm:p-12">
                            {/* Icon and heading */}
                            <div className="flex items-start gap-6 mb-6">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-crisis-red/10 flex items-center justify-center border border-crisis-red/20">
                                    <ShieldAlert className="w-8 h-8 text-crisis-red" aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                                        Something went wrong
                                    </h2>
                                    <p className="text-charcoal-200 leading-relaxed">
                                        An unexpected error occurred in the Symptom Navigator. You can try restarting below.
                                    </p>
                                </div>
                            </div>

                            {/* Error details (in development only) */}
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="mb-6 p-4 bg-charcoal-900/50 rounded-lg border border-white/5 overflow-auto">
                                    <p className="text-sm font-mono text-crisis-red mb-2 font-semibold">
                                        {this.state.error.name}: {this.state.error.message}
                                    </p>
                                    {this.state.error.stack && (
                                        <pre className="text-xs text-charcoal-400 overflow-x-auto">
                                            {this.state.error.stack}
                                        </pre>
                                    )}
                                </div>
                            )}

                            {/* Recovery actions */}
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {this.props.onReset && (
                                        <NavigatorButton
                                            variant="primary"
                                            onClick={this.handleReset}
                                            className="flex-1"
                                        >
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Start Over
                                        </NavigatorButton>
                                    )}
                                    {this.props.onGoBack && (
                                        <NavigatorButton
                                            variant="outline"
                                            onClick={this.handleGoBack}
                                            className="flex-1"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Go Back
                                        </NavigatorButton>
                                    )}
                                </div>
                                {this.props.onExit && (
                                    <NavigatorButton
                                        variant="ghost"
                                        onClick={this.handleExit}
                                        className="w-full"
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Exit Navigator
                                    </NavigatorButton>
                                )}
                            </div>

                            {/* Help text */}
                            <p className="mt-6 text-sm text-charcoal-400 text-center">
                                If this problem persists, please try refreshing the page or contact support.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
