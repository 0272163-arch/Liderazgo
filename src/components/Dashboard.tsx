import { MAIN_LINKS } from "../data/links";
import { motion, AnimatePresence } from "motion/react";
import { Command, ExternalLink, Search } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredLinks = useMemo(() => {
    return MAIN_LINKS.filter(
      (link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Handle Cmd+K to focus search (if needed, but simple pure web is fine).
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch on icons/motion if applicable, though shouldn't matter too much here

  return (
    <div className="min-h-screen bg-[#ebe5db] text-[#8d182f] flex flex-col font-sans p-6 sm:p-12">
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#8d182f] flex items-center justify-center rounded-sm shadow-sm">
              <div className="w-4 h-4 bg-[#ebe5db] rotate-45"></div>
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#b69157]">
              Faculty of Engineering / UP
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:space-x-8 text-xs font-medium tracking-wide text-[#b69157]">
            <span>TERM: SPRING 2024</span>
            <span>PORTAL: ONLINE</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col">
          {/* Main Hero and Search Section */}
          <section className="mb-16">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
              Central Link Hub.<br />
              <span className="text-[#b69157]">Ready for work.</span>
            </h1>

            <div className="relative w-full max-w-2xl group shadow-sm rounded-xl">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[#b69157] group-focus-within:text-[#8d182f] transition-colors" />
              </div>
              <input
                id="search-input"
                type="text"
                placeholder="Search for a platform or resource..."
                className="w-full bg-white/50 border border-[#b69157]/30 rounded-xl py-4 pl-12 pr-4 text-sm text-[#8d182f] focus:outline-none focus:border-[#b69157] transition-colors placeholder-[#8d182f]/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center gap-1 font-sans px-1.5 py-0.5 rounded border border-[#b69157]/20 bg-white/60 text-[10px] font-medium text-[#b69157]">
                  <Command className="w-3 h-3" />K
                </kbd>
              </div>
            </div>
          </section>

          {/* Links Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
            <AnimatePresence mode="popLayout">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={link.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        ease: [0.16, 1, 0.3, 1], // ease out expo
                      }}
                      className="group bg-white/40 border border-[#b69157]/30 p-8 rounded-2xl flex flex-col justify-between hover:bg-white/80 hover:border-[#b69157]/60 hover:shadow-md transition-all min-h-[200px]"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-10 h-10 bg-[#ebe5db] rounded-lg flex items-center justify-center text-[#b69157] transition-colors group-hover:text-[#8d182f]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <svg
                            className="w-5 h-5 text-[#b69157] group-hover:text-[#8d182f] transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                        <p className="text-sm text-[#8d182f]/70">{link.description}</p>
                      </div>
                    </motion.a>
                  );
                })
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-16 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/50 border border-[#b69157]/30 mb-6">
                    <Search className="w-6 h-6 text-[#b69157]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                  <p className="text-sm text-[#8d182f]/70">
                    Try adjusting your search query to find what you're looking for.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </main>

        <footer className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-[#b69157]/30 pt-8 gap-4 pb-8 sm:pb-0">
          <div className="text-[10px] uppercase tracking-widest text-[#b69157]">
            System Status: <span className="text-[#8d182f] font-medium">All operational</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-[#b69157] sm:text-right">
            Universidad Panamericana<br />
            Engineering Faculty Hub v2.1
          </div>
        </footer>
      </div>
    </div>
  );
}
