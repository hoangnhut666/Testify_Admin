
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Filter, 
  LayoutGrid, 
  List, 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Command,
  LayoutTemplate,
  Library,
  Settings,
  X,
  Settings2,
  Grid
} from 'lucide-react';
import { CATEGORIES as INITIAL_CATEGORIES, POPULAR_TAGS, TEMPLATES } from './constants';
import { Template, SortOption, Category } from './types';
import TemplateCard from './components/TemplateCard';
import CategoryManager from './components/CategoryManager';

const Header = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (p: string) => void }) => (
  <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50">
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentPage('marketplace')}>
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200 transition-transform group-hover:scale-105">
          <Command size={22} />
        </div>
        <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">TESTIFY</span>
      </div>
      
      <nav className="hidden lg:flex items-center gap-1 font-semibold text-sm">
        <button 
          onClick={() => setCurrentPage('marketplace')}
          className={`px-4 py-2 transition-all rounded-lg ${currentPage === 'marketplace' ? 'bg-purple-50 text-purple-700' : 'text-slate-400 hover:text-slate-900'}`}
        >
          Marketplace
        </button>
        <button 
          onClick={() => setCurrentPage('admin')}
          className={`px-4 py-2 transition-all rounded-lg flex items-center gap-2 ${currentPage === 'admin' ? 'bg-purple-50 text-purple-700' : 'text-slate-400 hover:text-slate-900'}`}
        >
          <Settings2 size={16} />
          Admin
        </button>
        <a href="#" className="px-4 py-2 text-slate-400 hover:text-slate-900 transition-colors">Projects</a>
        <a href="#" className="px-4 py-2 text-slate-400 hover:text-slate-900 transition-colors">Library</a>
      </nav>
    </div>

    <div className="flex items-center gap-5">
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-500 uppercase tracking-widest">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        Live Cloud
      </div>
      <button className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-500">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
      </button>
      <div className="flex items-center gap-3 pl-5 border-l border-slate-100">
        <div className="text-right">
          <p className="text-xs font-bold text-slate-900">Felix Johnson</p>
          <p className="text-[10px] text-slate-400 font-medium">Head of Quality</p>
        </div>
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
          className="w-10 h-10 rounded-xl ring-2 ring-white shadow-sm border border-slate-200"
          alt="User" 
        />
      </div>
    </div>
  </header>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState("marketplace");
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const filteredTemplates = useMemo(() => {
    return TEMPLATES.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory ? t.categoryId === selectedCategory : true;
      const matchTags = selectedTags.length === 0 || selectedTags.every(st => t.tags.includes(st));
      return matchSearch && matchCategory && matchTags;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.stats.stars - a.stats.stars;
      if (sortBy === 'cloned') return b.stats.clones - a.stats.clones;
      return 0; // newest
    });
  }, [searchTerm, selectedCategory, selectedTags, sortBy]);

  const handleClone = (id: number) => {
    alert(`Cloning template #${id}... This will be added to your library.`);
  };

  // Admin Actions
  const handleUpdateCategory = (cat: Category) => {
    setCategories(prev => prev.map(c => c.id === cat.id ? cat : c));
  };
  const handleCreateCategory = (cat: Category) => {
    setCategories(prev => [...prev, cat]);
  };
  const handleDeleteCategory = (id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-900 pb-20">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === 'marketplace' ? (
        <>
          {/* Hero Section */}
          <section className="relative px-8 pt-12 pb-24 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-slate-900 rounded-b-[100px] shadow-2xl z-0">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/30 blur-[120px] rounded-full"></div>
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center space-y-8 max-w-4xl mx-auto pt-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest float-animation">
                  <Sparkles size={14} className="text-amber-400" /> Discover Pro Test Suites
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
                  Elevate Your Testing with <span className="gradient-text">Verified Templates</span>
                </h1>
                
                <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
                  Don't start from scratch. Clone battle-tested suites from industry leaders and optimize your pipeline in minutes.
                </p>

                <div className="max-w-3xl mx-auto pt-4">
                  <div className="group relative bg-white rounded-3xl p-2.5 shadow-2xl flex items-center gap-2 border-8 border-white/10 backdrop-blur-xl transition-all hover:scale-[1.01] focus-within:ring-4 focus-within:ring-purple-500/20">
                    <Search className="ml-4 text-slate-400" size={24} />
                    <input 
                      type="text" 
                      placeholder="Search 10k+ templates by name, tech stack, or author..."
                      className="flex-1 h-14 px-4 text-slate-900 text-lg font-medium focus:outline-none placeholder:text-slate-400"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="h-14 px-8 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Area */}
          <main className="max-w-[1400px] mx-auto px-8 -mt-10 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Sidebar Filters */}
              <aside className="lg:col-span-3 space-y-8">
                <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm sticky top-28">
                  <div className="space-y-10">
                    
                    {/* Categories */}
                    <div className="space-y-6">
                      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <LayoutGrid size={14} /> Categories
                      </h3>
                      <div className="space-y-1.5">
                        <button 
                          onClick={() => setSelectedCategory(null)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${!selectedCategory ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          <span>All Suites</span>
                          <span className="opacity-50 font-medium">{TEMPLATES.length}</span>
                        </button>
                        {categories.map(cat => (
                          <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all ${selectedCategory === cat.id ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 group'}`}
                          >
                            <div className="flex items-center gap-3">
                              {cat.icon ? (
                                <cat.icon size={18} className={`${selectedCategory === cat.id ? 'text-white' : 'text-slate-400 group-hover:text-purple-500'} transition-colors`} />
                              ) : (
                                /* Fix: Added Grid import and ensuring it is used correctly here */
                                <Grid size={18} className={`${selectedCategory === cat.id ? 'text-white' : 'text-slate-400 group-hover:text-purple-500'} transition-colors`} />
                              )}
                              <span>{cat.name}</span>
                            </div>
                            <span className="opacity-50 font-medium">{TEMPLATES.filter(t => t.categoryId === cat.id).length}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular Tags */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <TrendingUp size={14} /> Tags
                        </h3>
                        {selectedTags.length > 0 && (
                            <button onClick={() => setSelectedTags([])} className="text-[10px] font-bold text-rose-500 flex items-center gap-1">
                                <X size={10} /> Clear
                            </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_TAGS.map(tag => {
                          const active = selectedTags.includes(tag.name);
                          return (
                            <button 
                              key={tag.id}
                              onClick={() => toggleTag(tag.name)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${active ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'}`}
                            >
                              {tag.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              </aside>

              {/* Grid Area */}
              <div className="lg:col-span-9 space-y-8">
                {/* Control Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-4 rounded-[28px] border border-white shadow-sm ring-1 ring-slate-100">
                  <div className="flex items-center gap-2 px-2">
                    <span className="text-xl font-black tracking-tight text-slate-900">
                      {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Templates'}
                    </span>
                    <span className="text-sm font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg ml-2">
                      {filteredTemplates.length} results
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-slate-100/50 rounded-xl p-1 border border-slate-100">
                      <button 
                        onClick={() => setSortBy('popular')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${sortBy === 'popular' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Popular
                      </button>
                      <button 
                        onClick={() => setSortBy('cloned')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${sortBy === 'cloned' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Most Cloned
                      </button>
                      <button 
                        onClick={() => setSortBy('newest')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${sortBy === 'newest' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        Newest
                      </button>
                    </div>
                  </div>
                </div>

                {/* Templates Grid */}
                {filteredTemplates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTemplates.map(template => (
                      <TemplateCard 
                        key={template.id} 
                        template={template} 
                        onClone={handleClone} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-24 flex flex-col items-center justify-center bg-white rounded-[40px] border border-slate-100 border-dashed space-y-6">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200">
                      <Search size={40} />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">No templates found</h3>
                      <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto">
                        Try adjusting your filters or search terms to discover more pro suites.
                      </p>
                    </div>
                    <button 
                      onClick={() => { setSearchTerm(""); setSelectedCategory(null); setSelectedTags([]); }}
                      className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </>
      ) : (
        <main className="max-w-[1400px] mx-auto px-8 py-12">
          <CategoryManager 
            categories={categories}
            onUpdateCategory={handleUpdateCategory}
            onCreateCategory={handleCreateCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </main>
      )}
    </div>
  );
}
