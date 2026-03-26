import { Link } from "react-router-dom";
import { MessageSquare, ArrowRight } from "lucide-react";

interface ProductFeedbackBannerProps {
  className?: string;
}

const ProductFeedbackBanner = ({ className }: ProductFeedbackBannerProps) => {
  return (
    <div className={className}>
      <Link to="/support#product-feedback" className="block">
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-400 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-amber-600 shrink-0" />
              <div>
                <span className="text-base font-semibold text-amber-900">
                  Missing or incorrect product information?
                </span>
                <p className="text-sm text-amber-700 mt-0.5">
                  Help us keep the database accurate — report missing products or suggest corrections.
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-amber-600 shrink-0" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductFeedbackBanner;
