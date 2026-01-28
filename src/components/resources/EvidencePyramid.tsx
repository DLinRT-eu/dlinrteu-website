import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EvidenceImpactMatrix from "./EvidenceImpactMatrix";

const EvidencePyramid = () => {
  return (
    <div className="w-full">
      {/* Show only the dual-axis matrix */}
      <EvidenceImpactMatrix interactive showLabels />

      {/* Link to full guide */}
      <div className="mt-6 text-center">
        <Link 
          to="/evidence-impact-guide" 
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          View full methodology guide
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default EvidencePyramid;
