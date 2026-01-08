import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  id: string;
  text: string;
  type: 'input' | 'output' | 'success' | 'error' | 'process';
  delay: number;
}

const DataProcessingTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const simulationSteps = [
    { text: '$ mboma-cli process-data --source=raw_data.csv', type: 'input' as const, delay: 0 },
    { text: 'Initializing data pipeline...', type: 'process' as const, delay: 500 },
    { text: '✓ Connected to data source (15.2 GB)', type: 'success' as const, delay: 1500 },
    { text: 'Analyzing data structure...', type: 'process' as const, delay: 2000 },
    { text: '✓ Detected 2.4M records | 156 columns | 12 data types', type: 'success' as const, delay: 3000 },
    { text: 'Cleaning & validation...', type: 'process' as const, delay: 3500 },
    { text: '✓ Removed 12,450 duplicates | Fixed 8,932 anomalies', type: 'success' as const, delay: 4500 },
    { text: 'Applying tokenization...', type: 'process' as const, delay: 5000 },
    { text: '✓ Generated 2,387,550 unique tokens | Blockchain verified', type: 'success' as const, delay: 6500 },
    { text: 'Extracting value metrics...', type: 'process' as const, delay: 7000 },
    { text: '✓ Identified 847 high-value insights | ROI potential: +340%', type: 'success' as const, delay: 8500 },
    { text: 'Deploying to distributed ledger...', type: 'process' as const, delay: 9000 },
    { text: '✓ Data secured on 12 nodes | Consensus achieved', type: 'success' as const, delay: 10500 },
    { text: '', type: 'output' as const, delay: 11000 },
    { text: '$ Process completed in 2.4s | Data value: $2.8M', type: 'success' as const, delay: 11500 },
  ];

  const runSimulation = () => {
    setIsRunning(true);
    setLines([]);

    simulationSteps.forEach((step, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, { ...step, id: `line-${index}` }]);
      }, step.delay);
    });

    setTimeout(() => {
      setIsRunning(false);
    }, 12500);
  };

  useEffect(() => {
    runSimulation();
  }, []);

  return (
    <div className="bg-black/95 border border-institutional-green/30 rounded-lg overflow-hidden font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-institutional-grey px-4 py-3 flex items-center justify-between border-b border-institutional-green/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-white/60 text-xs">mboma-data-processor v2.1.0</span>
        <div className="w-12"></div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-96 overflow-y-auto bg-black space-y-1">
        {lines.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xs leading-relaxed font-mono ${
              line.type === 'input'
                ? 'text-institutional-lightGreen'
                : line.type === 'success'
                ? 'text-green-400'
                : line.type === 'error'
                ? 'text-red-400'
                : line.type === 'process'
                ? 'text-institutional-orange'
                : 'text-white/40'
            }`}
          >
            {line.text}
          </motion.div>
        ))}
        {isRunning && (
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-institutional-lightGreen"
          >
            ▌
          </motion.div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="bg-institutional-grey/50 px-6 py-4 border-t border-institutional-green/20 flex items-center justify-between">
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="bg-institutional-green text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-institutional-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isRunning ? 'Processing...' : 'Relancer Simulation'}
        </button>
        <span className="text-white/40 text-xs">
          {isRunning ? 'Traitement en cours...' : 'Prêt'}
        </span>
      </div>
    </div>
  );
};

export default DataProcessingTerminal;
