import "./global.css"
import { ReactNode } from "react"

export const metadata = {
    title: "DefenseGPT",
    description: "The ultimate place to go for all your defense and military questions!",
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
    themeColor: "#411b8d",
    appleWebAppCapable: "yes",
    appleWebAppStatusBarStyle: "default"
}

interface RootLayoutProps {
    children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
                <meta name="theme-color" content="#411b8d" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />
            </head>
            <body>{children}</body>
        </html>
    )
}

export default RootLayout