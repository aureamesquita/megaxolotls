import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GitCommit, Calendar, User } from 'lucide-react';
import { useLocation } from 'wouter';

interface Commit {
  hash: string;
  author: string;
  date: string;
  message: string;
  timestamp: number;
}

export default function Changelog() {
  const [, navigate] = useLocation();
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/commits');
        if (!response.ok) {
          throw new Error('Failed to fetch commits');
        }
        const data = await response.json();
        setCommits(data.commits || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Fallback mock data if API fails
        setCommits([
          {
            hash: 'ec5b3b85',
            author: 'Manus Agent',
            date: '2026-02-17',
            message: 'Corrigido draw condition - agora mostra 🤝 DRAW quando ambos chegam a 0 HP',
            timestamp: 1739821200,
          },
          {
            hash: '461de195',
            author: 'Manus Agent',
            date: '2026-02-17',
            message: 'Sistema de batalha turn-based com HP/Energy bars e AI opponent',
            timestamp: 1739734800,
          },
          {
            hash: 'c043153c',
            author: 'Manus Agent',
            date: '2026-02-10',
            message: 'First-Use Flow com Tutorial Screen e PlaytimeTracker global',
            timestamp: 1739116800,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-black/80 text-white p-4 sm:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-neon-cyan hover:text-neon-pink transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <h1 className="text-4xl font-black bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
          Changelog
        </h1>
        <p className="text-gray-400 mt-2">Project development history</p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-neon-cyan border-r-2 border-neon-pink"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-400">Error loading commits: {error}</p>
        </div>
      )}

      {/* Commits List */}
      {!loading && commits.length > 0 && (
        <div className="space-y-4">
          {commits.map((commit, index) => (
            <motion.div
              key={commit.hash}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-neon-cyan/30 rounded-lg p-4 hover:border-neon-pink/50 hover:bg-black/40 transition-all"
            >
              <div className="flex gap-4">
                {/* Commit Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center">
                    <GitCommit className="w-5 h-5 text-black" />
                  </div>
                </div>

                {/* Commit Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white break-words">{commit.message}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-neon-cyan" />
                      <span>{commit.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-neon-pink" />
                      <span>{formatDate(commit.date)}</span>
                    </div>
                    <code className="text-neon-cyan font-mono text-xs bg-black/40 px-2 py-1 rounded">
                      {commit.hash.slice(0, 7)}
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && commits.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-400">No commits found</p>
        </div>
      )}
    </div>
  );
}
