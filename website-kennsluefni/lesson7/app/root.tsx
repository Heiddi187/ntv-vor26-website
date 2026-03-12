import type { LinksFunction } from "@remix-run/node";
import { ThemeToggle } from './components/ThemeToggle'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import appStyles from "./app.css?url";
import { createContext, useContext, useState } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyles },
];

export function meta() {
  return [
    { title: "Remix Theme App" },
    { name: "description", content: "Simple Remix app with light and dark theme" },
  ];
}

const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme}}>
      <Toolbar /> 
        <html lang="en" suppressHydrationWarning>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
          </head>
          <body>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                (function() {
                  var k = 'theme';
                    var s = localStorage.getItem(k);
                    var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var theme = s === 'dark' || s === 'light' ? s : (dark ? 'dark' : 'light');
                    document.documentElement.setAttribute('data-theme', theme);
                  })();
                `,
              }}
            />
            <Outlet />
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      
    </ThemeContext.Provider>
  );
}

function Toolbar() { return <ThemeButton />; }

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current Theme: {theme}
    </button>
  );
}