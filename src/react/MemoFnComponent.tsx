import React, { Component, ComponentType, createElement, FC, forwardRef, memo, ReactNode } from 'react';

type TypeOnError = (error: Error, info: ErrorInfo) => boolean | void;

interface PropsErrorBoundary {
    onError?: TypeOnError;
    children: ReactNode;
}
interface StateErrorBoundary {
    error?: Error;
}

export interface ErrorInfo {
    componentStack: string;
}

export interface Config {
    onError?: TypeOnError;
    ErrorBoundary?: any;
}

let _config: Config = {};

export function configureMemoFnComponent(config: Config) {
    _config = config || {};
}

class DefaultErrorBoundary extends Component<PropsErrorBoundary, StateErrorBoundary> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
        };
    }
    componentDidCatch(error: Error, info: ErrorInfo): void {
        if (_config.onError) {
            try {
                let handled: boolean | undefined;
                if (this.props.onError) {
                    handled = this.props.onError(error, info) as boolean | undefined;
                }

                if (!handled) {
                    _config.onError(error, info);
                }
            } catch (ignoredError) {
                console.log(ignoredError);
            }
        }

        this.setState({ error });
    }

    render() {
        const { children } = this.props;
        const { error } = this.state;

        if (error !== null) {
            debugger;
            return null;
        }

        return children || null;
    }
}

export function MemoFnComponent<T extends ComponentType<any>>(Component: T, onError?: TypeOnError): T {
    onError = onError || _config.onError;
    let out = Component as any;
    if (onError) {
        const ErrorBoundary = _config.ErrorBoundary || DefaultErrorBoundary;
        out = (props: any) => <ErrorBoundary onError={onError}>{createElement(Component, props)}</ErrorBoundary>;
    }
    return memo(out) as unknown as T;
}

export function MemoFnComponentWithRef<T extends ComponentType<any>>(Component: T, onError?: TypeOnError): T {
    let out = Component as any;
    onError = onError || _config.onError;
    if (onError) {
        const ErrorBoundary = _config.ErrorBoundary || DefaultErrorBoundary;
        const Wrapped = (props: any, ref: any) => (
            <ErrorBoundary onError={onError}>{createElement(Component, Object.assign({ ref }, props))}</ErrorBoundary>
        );
        out = forwardRef(Wrapped);
    }

    return memo(out) as unknown as T;
}
