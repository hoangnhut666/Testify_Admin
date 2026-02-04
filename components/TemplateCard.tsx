
import React, { useState } from 'react';
import { 
  Star, 
  Download, 
  Share2, 
  Eye, 
  MoreVertical,
  CheckCircle
} from 'lucide-react';
import { Template, Category } from '../types';
import { CATEGORIES } from '../constants';

interface TemplateCardProps {
  template: Template;
  onClone: (id: number) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClone }) => {
  const [isHovered, setIsHovered] = useState(false);

  const category = CATEGORIES.find(c => c.id === template.categoryId);

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-100 p-5 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(168,85,247,0.12)] hover:border-purple-100 flex flex-col h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Info */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          {category && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
              <category.icon size={10} />
              {category.name}
            </span>
          )}
        </div>
        <button className="text-slate-300 hover:text-purple-600 transition-colors">
          <Share2 size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
          {template.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {template.description}
        </p>
        
        <div className="flex flex-wrap gap-1.5 py-2">
          {template.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={template.authorAvatar} 
            alt={template.author} 
            className="w-7 h-7 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100" 
          />
          <span className="text-xs font-semibold text-slate-700">{template.author}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {(template.stats.stars / 1000).toFixed(1)}k
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <Download size={12} className="text-slate-400" />
            {template.stats.clones}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`mt-4 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button 
          onClick={() => onClone(template.id)}
          className="flex-1 px-3 py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
        >
          <Download size={14} /> Clone Suite
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
