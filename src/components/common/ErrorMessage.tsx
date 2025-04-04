import React from "react";

interface ErrorMessageProps {
    error: string;
    onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => (
    <div className="container mt-5 text-center">
        <div className="alert alert-danger" role="alert">
            {error}
        </div>
        <button className="btn btn-primary" onClick={onRetry}>
            Retry
        </button>
    </div>
);

export default ErrorMessage;