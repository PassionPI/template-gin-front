import { Card, Result, Typography } from "antd";
import type { PropsWithRef } from "react";
import { PureComponent, Suspense, lazy, memo } from "react";

const { Paragraph, Text } = Typography;

const fallback = <Card loading bordered={false} />;

const parseMsg = (e: unknown) => {
  const error = e || "Unknown error";
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return JSON.stringify(error);
};

class ErrorBoundary extends PureComponent<{ children: JSX.Element }> {
  state = {
    hasError: false,
    outdate: false,
    msg: "",
    stack: "",
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
      outdate: true,
    };
  }

  componentDidCatch(e: unknown, info: { componentStack: string }) {
    const msg = parseMsg(e);

    if (msg.startsWith("Failed to fetch dynamically imported module: http")) {
      window.location.reload();
      return;
    }

    this.setState({
      msg,
      stack: info?.componentStack,
      outdate: false,
    });
  }

  render() {
    if (this.state.outdate) {
      return fallback;
    }
    if (this.state.hasError) {
      return (
        <Result status="error" title="Something went wrong!">
          <Paragraph>
            <Text strong>Error message:</Text>
            <br />
            {this.state.msg}
          </Paragraph>
          <Paragraph>
            <Text strong>Error stack:</Text>
            <br />
            {this.state.stack}
          </Paragraph>
        </Result>
      );
    }
    return this.props.children;
  }
}

export function suspense<P>(
  factory: () => Promise<{
    default: React.ComponentType<P>;
  }>,
) {
  const Lazy = lazy(factory);
  return memo((props: P) => (
    <ErrorBoundary>
      <Suspense fallback={fallback}>
        <Lazy {...(props as JSX.IntrinsicAttributes & PropsWithRef<P>)} />
      </Suspense>
    </ErrorBoundary>
  ));
}
