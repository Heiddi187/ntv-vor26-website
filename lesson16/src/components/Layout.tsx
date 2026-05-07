// import type { AppPage } from '@/navigation';
// import type { ReactNode } from 'react';
import { useAuth } from "@/auth/useAuth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// type LayoutProps = {
//   activePage: AppPage;
//   onNavigate: (page: AppPage) => void;
//   children: ReactNode;
// };

function navButtonClassName(isActive: boolean) {
   return [
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive
         ? "bg-primary text-primary-foreground"
         : "text-muted-foreground hover:bg-muted hover:text-foreground",
   ].join(" ");
}

export function Layout() {
   const { isAuthed, logout } = useAuth();

   const navigate = useNavigate();
   const location = useLocation();

   const isActive = (path: string) => location.pathname === path;

   function handleLogout() {
      logout();
      navigate('/');
   }

   return (
      <div className="bg-background min-h-screen">
         <header className="border-border bg-card/50 border-b backdrop-blur-sm">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
               <p className="text-foreground text-sm font-semibold tracking-tight">
                  Lesson 16
               </p>
               {isAuthed && (
                  <button
                     type="button"
                     className={navButtonClassName(isActive("/welcome"))}
                     onClick={() => navigate("/welcome")}
                  >
                     Innskráð(ur)
                  </button>
               )}

               <nav
                  className="flex flex-wrap gap-2"
                  aria-label="Main navigation"
               >
                  <button
                     type="button"
                     className={navButtonClassName(isActive("/"))}
                     onClick={() => navigate("/")}
                  >
                     Home
                  </button>
                  <button
                     type="button"
                     className={navButtonClassName(isActive("/about"))}
                     onClick={() => navigate("/about")}
                  >
                     About
                  </button>
                  {isAuthed ? (
                     <button
                        type="button"
                        className={navButtonClassName(false)}
                        onClick={handleLogout}
                     >
                        Logout
                     </button>
                  ) : (
                     <button
                        type="button"
                        className={navButtonClassName(isActive("/login"))}
                        onClick={() => navigate("/login")}
                     >
                        Login
                     </button>
                  )}
               </nav>
            </div>
         </header>
         <main className="mx-auto w-full max-w-6xl px-4 py-8">
            <Outlet />
         </main>
      </div>
   );
}
