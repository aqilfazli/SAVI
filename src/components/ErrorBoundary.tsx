import React from 'react';

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // You can log the error to an external service here
    // console.error('ErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-2">Terjadi kesalahan</h2>
            <p className="text-sm text-gray-600 mb-4">Aplikasi mengalami error saat menampilkan halaman. Informasi error:</p>
            <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto">{String(this.state.error)}</pre>
            <p className="text-sm text-gray-500 mt-4">Silakan cek console browser untuk stack trace, atau hubungi pengembang.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
