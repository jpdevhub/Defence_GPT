import "./global.css"
import { ReactNode } from "react"

export const metadata = {
    title: "DefenseGPT",
    description: "The ultimate place to go for all your defense and military questions!"
}

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
                {/* Favicon and Logo */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" />
                {/* Theme color supported by Chrome, Safari, Edge */}
                <meta name="theme-color" content="#411b8d" />
                <meta name="msapplication-TileColor" content="#411b8d" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />
                {/* Fallback for browsers that don't support theme-color */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        body { background-color: #411b8d; }
                        @media (display-mode: browser) {
                            body { background-color: initial; }
                        }
                    `
                }} />
            </head>
            <body>{children}</body>
        </html>
    )
}
export default RootLayout