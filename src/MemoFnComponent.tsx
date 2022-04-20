import React, { Component, ComponentType, createElement, forwardRef, memo, ReactNode } from 'react';

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
}

let _config: Config = {};

export function ConfigureMemoFnComponent(config: Config) {
    _config = config || {};
}

class ErrorBoundary extends Component<PropsErrorBoundary, StateErrorBoundary> {
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
        out = (props: any) => <ErrorBoundary>{createElement(Component, Object.assign({ onError }, props))}</ErrorBoundary>;
    }
    return (memo(out) as unknown) as T;
}

export function MemoFnComponentWithRef<T extends ComponentType<any>>(Component: T, onError?: TypeOnError): T {
    let out = Component as any;
    if (onError || _config.onError) {
        const Wrapped = (props: any, ref: any) => (
            <ErrorBoundary>{createElement(Component, Object.assign({ onError, ref }, props))}</ErrorBoundary>
        );
        out = forwardRef(Wrapped);
    }

    return (memo(out) as unknown) as T;
}
