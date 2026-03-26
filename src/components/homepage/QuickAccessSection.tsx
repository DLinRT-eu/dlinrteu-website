import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp,
  Building2,
  BookOpen,
  Brain,
  Shield
} from 'lucide-react';

interface QuickAccessSectionProps {
  productCount: number;
  companyCount: number;
  aiProductCount: number;
  nonAIProductCount: number;
}

const QuickAccessSection: React.FC<QuickAccessSectionProps> = ({
  productCount,
  companyCount,
  aiProductCount,
  nonAIProductCount
}) => {
  return (
    <section className="py-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 py-6 px-8 bg-card border border-border rounded-lg">
          <Link 
            to="/products"
            className="flex items-center space-x-2 hover:text-primary transition-colors group"
          >
            <TrendingUp className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground">
              <span className="font-semibold text-foreground">{productCount}</span> Products
              <span className="text-xs ml-1.5 inline-flex items-center gap-1">
                (<Brain className="h-3 w-3 text-primary inline" />{aiProductCount} AI
                <span className="text-muted-foreground/60">•</span>
                <Shield className="h-3 w-3 text-emerald-600 dark:text-emerald-400 inline" />{nonAIProductCount} QA)
              </span>
            </span>
          </Link>
          <Link 
            to="/companies"
            className="flex items-center space-x-2 hover:text-primary transition-colors group"
          >
            <Building2 className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground">
              <span className="font-semibold text-foreground">{companyCount}+</span> companies featured
            </span>
          </Link>
          <Link 
            to="/resources-compliance"
            className="flex items-center space-x-2 hover:text-primary transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground">
              <span className="font-semibold text-foreground">20+</span> compliance resources
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;