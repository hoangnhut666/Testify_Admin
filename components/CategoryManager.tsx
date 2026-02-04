
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  ChevronRight, 
  Trash2, 
  X, 
  FolderTree, 
  Tag as TagIcon,
  Save,
  Grid
} from 'lucide-react';
import { Category } from '../types';

interface CategoryManagerProps {
    categories: Category[];
    onUpdateCategory: (category: Category) => void;
    onCreateCategory: (category: Category) => void;
    onDeleteCategory: (categoryId: number) => void;
}

const EMPTY_CATEGORY: Category = {
    id: 0,
    name: '',
    subcategories: []
};

const CategoryManager: React.FC<CategoryManagerProps> = ({ 
    categories, 
    onUpdateCategory, 
    onCreateCategory, 
    onDeleteCategory 
}) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [categoryFormData, setCategoryFormData] = useState<Category>(EMPTY_CATEGORY);
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (selectedCategoryId) {
            const cat = categories.find(c => c.id === selectedCategoryId);
            if (cat) {
                setCategoryFormData({ ...cat });
            }
        } else {
            setCategoryFormData(EMPTY_CATEGORY);
        }
    }, [selectedCategoryId, categories]);

    const handleCategorySelect = (id: number | null) => {
        setSelectedCategoryId(id);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryFormData(prev => ({ ...prev, name: e.target.value }));
    };

    const handleAddSubcategory = () => {
        if (!newSubcategoryName.trim()) return;
        if (categoryFormData.subcategories.includes(newSubcategoryName.trim())) return;
        setCategoryFormData(prev => ({
            ...prev,
            subcategories: [...prev.subcategories, newSubcategoryName.trim()]
        }));
        setNewSubcategoryName('');
    };

    const handleDeleteSubcategory = (index: number) => {
        setCategoryFormData(prev => ({
            ...prev,
            subcategories: prev.subcategories.filter((_, i) => i !== index)
        }));
    };

    const handleCategorySave = () => {
        if (!categoryFormData.name.trim()) {
            alert("Category name is required");
            return;
        }

        if (selectedCategoryId) {
            onUpdateCategory(categoryFormData);
        } else {
            const newId = Math.max(0, ...categories.map(c => c.id)) + 1;
            onCreateCategory({ ...categoryFormData, id: newId });
            setCategoryFormData(EMPTY_CATEGORY);
        }
    };

    const handleDeleteCategoryAction = () => {
        if (selectedCategoryId) {
            if (confirm("Are you sure? This might affect templates using this category.")) {
                onDeleteCategory(selectedCategoryId);
                setSelectedCategoryId(null);
            }
        }
    };

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 backdrop-blur-xl p-8 rounded-[32px] border border-white shadow-sm ring-1 ring-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Category Structure</h1>
                    <p className="text-slate-500 font-medium">Manage how test suites are organized in the marketplace.</p>
                </div>
                <button 
                    onClick={() => handleCategorySelect(null)} 
                    className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus size={20} /> Create Category
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* LEFT: Category List */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
                        <div className="p-6 border-b border-slate-50">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                                <FolderTree size={14} /> Available Categories
                            </h3>
                            
                            {/* Search Input */}
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Find category..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-500/5 outline-none text-sm font-medium transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-2 py-4">
                            {filteredCategories.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredCategories.map(cat => (
                                        <button 
                                            key={cat.id} 
                                            onClick={() => handleCategorySelect(cat.id)}
                                            className={`w-full text-left p-4 flex items-center justify-between rounded-2xl transition-all ${selectedCategoryId === cat.id ? 'bg-purple-50 text-purple-700 border border-purple-100 shadow-sm' : 'hover:bg-slate-50 text-slate-600'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCategoryId === cat.id ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                    {cat.icon ? <cat.icon size={20} /> : <Grid size={20} />}
                                                </div>
                                                <div>
                                                    <span className="font-bold block text-sm">{cat.name}</span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{cat.subcategories.length} Subcategories</span>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className={selectedCategoryId === cat.id ? 'text-purple-400' : 'text-slate-200'} />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-slate-400">
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Search size={24} />
                                    </div>
                                    <p className="text-sm font-bold">No matches found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Edit Panel */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {selectedCategoryId ? 'Refine Category' : 'New Category'}
                                </h2>
                                <p className="text-sm text-slate-400 font-medium">Configure properties and children.</p>
                            </div>
                            {selectedCategoryId && (
                                <button 
                                    onClick={handleDeleteCategoryAction} 
                                    className="flex items-center gap-2 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-xl transition-all text-sm font-bold"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-10 flex-1">
                            {/* Category Name */}
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    Identity & Label
                                </label>
                                <input 
                                    type="text" 
                                    value={categoryFormData.name} 
                                    onChange={handleCategoryChange}
                                    className="w-full px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50/30 focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-500/5 outline-none text-lg font-bold text-slate-900 transition-all"
                                    placeholder="e.g. Enterprise Cloud"
                                />
                            </div>

                            {/* Subcategories Section */}
                            <div className="space-y-6">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <TagIcon size={14} /> Subcategories
                                </label>
                                
                                <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                                    <div className="flex flex-wrap gap-2 mb-6 min-h-[48px]">
                                        {categoryFormData.subcategories.map((sub, idx) => (
                                            <div key={idx} className="bg-white border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 shadow-sm group hover:border-purple-200 transition-all">
                                                <span>{sub}</span>
                                                <button 
                                                    onClick={() => handleDeleteSubcategory(idx)}
                                                    className="text-slate-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {categoryFormData.subcategories.length === 0 && (
                                            <div className="w-full flex items-center justify-center py-4 border-2 border-dashed border-slate-100 rounded-2xl text-slate-300 text-xs font-bold">
                                                No subcategories defined yet.
                                            </div>
                                        )}
                                    </div>

                                    {/* Add Subcategory */}
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={newSubcategoryName}
                                            onChange={(e) => setNewSubcategoryName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubcategory())}
                                            placeholder="Add subcategory name..."
                                            className="flex-1 px-5 py-3 rounded-xl border border-slate-100 focus:border-purple-200 outline-none bg-white text-sm font-medium transition-all"
                                        />
                                        <button 
                                            onClick={handleAddSubcategory}
                                            className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 mt-10 border-t border-slate-50">
                            <button 
                                onClick={handleCategorySave}
                                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition-all transform active:scale-[0.99] flex items-center justify-center gap-3"
                            >
                                <Save size={18} />
                                {selectedCategoryId ? 'Sync Changes' : 'Initialize Category'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryManager;
