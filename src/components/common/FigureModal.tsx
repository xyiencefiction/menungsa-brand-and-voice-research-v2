import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

export interface FigureInfo {
  id: string;
  title: string;
  number: number;
  fileName: string;
  purpose: string;
  encoding: string;
  notRepresented: string;
  associatedSection: string;
}

export const FIGURES: FigureInfo[] = [
  {
    id: "fig-01",
    number: 1,
    title: "Research-Domain Relationship Map",
    fileName: "01_domain_relationship_map",
    purpose: "Shows how the seven research domains relate and where literature is shared.",
    encoding: "Node size = corpus weight in synthesis; edge thickness = shared underlying literature.",
    notRepresented: "Evidential independence — edges indicate shared studies, not independent confirmation.",
    associatedSection: "Overview & Methodology"
  },
  {
    id: "fig-02",
    number: 2,
    title: "Mechanism Convergence Across Domains",
    fileName: "02_mechanism_convergence",
    purpose: "Displays the 20 derived mechanisms ordered by cross-domain breadth.",
    encoding: "Recurrence count across 7 domains with qualitative support markers.",
    notRepresented: "Probability of effectiveness. High recurrence != guaranteed causal power.",
    associatedSection: "Mechanisms Explorer & Cross-Report"
  },
  {
    id: "fig-04",
    number: 4,
    title: "Communication Mechanism Model",
    fileName: "04_communication_mechanism_model",
    purpose: "Traces message features through cognitive appraisal, mechanism, and behavioral response.",
    encoding: "Five sequential stages of message processing.",
    notRepresented: "Universal linear progression for all individuals.",
    associatedSection: "Mechanisms & Emotional Resonance"
  },
  {
    id: "fig-05",
    number: 5,
    title: "Need to Response Pathway",
    fileName: "05_need_to_response_pathway",
    purpose: "Shows seven audience states and their reverse-engineered communicative requirements.",
    encoding: "Row-based flow from recipient state to linguistic implementation.",
    notRepresented: "Measured causal effects; pathways are synthesized hypotheses.",
    associatedSection: "Voice Strategy (§25)"
  },
  {
    id: "fig-06",
    number: 6,
    title: "Multidimensional Tone Space",
    fileName: "06_tone_space",
    purpose: "Visualizes the non-binary dimensions of voice and tone.",
    encoding: "Continuous multi-axis spectrum.",
    notRepresented: "Fixed personality archetypes.",
    associatedSection: "Voice Lab"
  },
  {
    id: "fig-07",
    number: 7,
    title: "Context × Tone Matrix",
    fileName: "07_context_tone_matrix",
    purpose: "Maps the 14 communication contexts across 10 tone dimensions.",
    encoding: "Ordinal 1-5 scale across 10 dimensions.",
    notRepresented: "Fixed copywriting templates.",
    associatedSection: "Voice Lab Presets"
  },
  {
    id: "fig-08",
    number: 8,
    title: "Emotional Resonance Map",
    fileName: "08_emotional_resonance_map",
    purpose: "Positions desired emotional states by arousal level and relational safety.",
    encoding: "Low vs high emotional intensity vs relational trust.",
    notRepresented: "A mandate for high emotional arousal.",
    associatedSection: "Emotional Resonance Explorer"
  },
  {
    id: "fig-09",
    number: 9,
    title: "Contradictions and Boundary Conditions",
    fileName: "09_contradictions_boundary_conditions",
    purpose: "Illustrates the 12 apparent contradictions and their distinguishing boundary variables.",
    encoding: "Branching structure; red highlight on unresolved X10 tension.",
    notRepresented: "One simple average compromise.",
    associatedSection: "Contradictions Explorer"
  },
  {
    id: "fig-10",
    number: 10,
    title: "Indonesia versus Global Configuration",
    fileName: "10_indonesia_vs_global",
    purpose: "Contrasts convergent findings that travel with divergent local institutional realities.",
    encoding: "Convergent vs divergent vs gap indicators from 154-study CIS.",
    notRepresented: "Prevalence rates across Indonesian men.",
    associatedSection: "Indonesia Deep Dive"
  },
  {
    id: "fig-11",
    number: 11,
    title: "The Evidence Funnel",
    fileName: "11_evidence_funnel",
    purpose: "Visualizes the dramatic drop from 154 general studies down to 0 Indonesian wording RCTs.",
    encoding: "Funnel layers from global theory to local wording tests.",
    notRepresented: "Research quality of individual studies.",
    associatedSection: "Research Gaps"
  },
  {
    id: "fig-12",
    number: 12,
    title: "Manosphere Function to Ethical Equivalent",
    fileName: "12_manosphere_function_to_ethical_equivalent",
    purpose: "Deconstructs 5 manosphere value propositions into ethical functional alternatives.",
    encoding: "Need -> Compelling appeal -> Harmful implementation -> Ethical alternative.",
    notRepresented: "Endorsement of manosphere ideology.",
    associatedSection: "Manosphere Explorer"
  }
];

interface Props {
  selectedFigure: FigureInfo | null;
  onClose: () => void;
  onSelectFigure: (fig: FigureInfo) => void;
}

/**
 * Figures are addressed by id, never by array position.
 *
 * They used to be reached by array position, so removing one entry silently repointed every
 * later reference at the wrong figure. The ids are stable and the numbers match the
 * printed synthesis, so a gap in the numbering is correct rather than a defect.
 */
export function getFigure(id: string): FigureInfo {
  const found = FIGURES.find((f) => f.id === id);
  if (!found) throw new Error(`Unknown figure id: ${id}`);
  return found;
}

export const FigureModal: React.FC<Props> = ({ selectedFigure, onClose, onSelectFigure }) => {
  const [usePng, setUsePng] = useState(false);

  if (!selectedFigure) return null;

  const currentSrc = `/figures/${selectedFigure.fileName}.${usePng ? 'png' : 'svg'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-label={`Diagram ${selectedFigure.title}`}
        className="relative bg-stone-900 border border-stone-700 rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/70">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-mono text-xs rounded border border-amber-500/30">
              Figure {selectedFigure.number}
            </span>
            <h3 className="text-lg font-semibold text-stone-100">{selectedFigure.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUsePng(!usePng)}
              className="px-2.5 py-1 text-xs font-mono rounded bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer"
              aria-label="Ganti format gambar ke PNG atau SVG"
              title="Toggle SVG / PNG format"
            >
              Format: {usePng ? 'PNG (Bitmap)' : 'SVG (Vector)'}
            </button>
            <a
              href={currentSrc}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition"
              aria-label="Buka gambar ukuran penuh di tab baru"
              title="Open full image in new tab"
            >
              <ExternalLink size={18} />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition cursor-pointer"
              aria-label="Tutup penampil diagram"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Image Display */}
          <div className="bg-stone-950 rounded-lg border border-stone-800 p-4 flex items-center justify-center min-h-[360px] max-h-[550px] overflow-hidden">
            <img
              src={currentSrc}
              alt={selectedFigure.title}
              className="max-h-[500px] w-auto object-contain transition-all hover:scale-[1.02]"
              onError={() => setUsePng(true)}
            />
          </div>

          {/* Epistemic & Methodological Documentation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-3.5 bg-stone-950/60 rounded-lg border border-stone-800/80 space-y-1.5">
              <span className="font-mono text-stone-400 uppercase tracking-wider text-[10px]">Purpose</span>
              <p className="text-stone-200 leading-relaxed">{selectedFigure.purpose}</p>
            </div>
            <div className="p-3.5 bg-stone-950/60 rounded-lg border border-stone-800/80 space-y-1.5">
              <span className="font-mono text-sky-400 uppercase tracking-wider text-[10px]">Visual Encoding</span>
              <p className="text-stone-200 leading-relaxed">{selectedFigure.encoding}</p>
            </div>
            <div className="p-3.5 bg-stone-950/60 rounded-lg border border-rose-900/40 space-y-1.5 bg-rose-950/10">
              <span className="font-mono text-rose-400 uppercase tracking-wider text-[10px]">What It Does NOT Represent</span>
              <p className="text-stone-200 leading-relaxed">{selectedFigure.notRepresented}</p>
            </div>
          </div>

          {/* Quick switcher to other figures */}
          <div className="pt-2 border-t border-stone-800">
            <span className="text-xs font-mono text-stone-400 block mb-2">Switch Figure:</span>
            <div className="flex flex-wrap gap-1.5">
              {FIGURES.map((fig) => (
                <button
                  key={fig.id}
                  onClick={() => onSelectFigure(fig)}
                  className={`px-2 py-1 rounded text-xs font-mono transition ${
                    fig.id === selectedFigure.id
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                  }`}
                >
                  Fig {fig.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
