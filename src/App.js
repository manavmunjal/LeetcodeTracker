import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, X, ChevronDown, ChevronUp, BarChart } from 'lucide-react';

// Style constants
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#4338ca',
    color: 'white',
    padding: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  headerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalButtonsContainer: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  },
  // Notes specific styles
  notesLink: {
    color: '#4338ca',
    textDecoration: 'underline',
    cursor: 'pointer',
    marginLeft: '8px',
    fontSize: '14px'
  },
  formattedNotes: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.5',
    border: '1px solid #e5e7eb'
  },
  notesModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    zIndex: 1000
  },
  notesModalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '24px',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  buttonsContainer: {
    display: 'flex',
    gap: '8px'
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: '0.2s background-color',
  },
  buttonIcon: {
    marginRight: '4px'
  },
  mainContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '16px',
    marginBottom: '24px'
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '24px',
    marginBottom: '24px'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  // Add new styles
  complexityContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginTop: '16px',
    marginBottom: '16px'
  },

  complexityBox: {
    backgroundColor: '#f3f4f6',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb'
  },

  complexityLabel: {
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#374151'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  statItem: (color) => ({
    backgroundColor: color,
    padding: '16px',
    borderRadius: '8px'
  }),
  statLabel: {
    color: '#4b5563',
    margin: '0 0 4px 0'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHead: {
    backgroundColor: '#f9fafb'
  },
  tableHeaderCell: {
    padding: '16px',
    textAlign: 'left',
    color: '#6b7280',
    fontWeight: '500',
    cursor: 'pointer',
    userSelect: 'none'
  },
  tableHeaderContent: {
    display: 'flex',
    alignItems: 'center'
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb',
    '&:hover': {
      backgroundColor: '#f9fafb'
    }
  },
  tableCell: {
    padding: '16px'
  },
  badge: (color, bgColor) => ({
    padding: '4px 8px',
    backgroundColor: bgColor,
    color: color,
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  }),
  categoryBadgesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px'
  },
  searchContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  },
  inputGroup: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  input: {
    width: '100%',
    padding: '8px 8px 8px 36px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px'
  },
  select: {
    width: '100%',
    padding: '8px 8px 8px 36px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '14px',
    appearance: 'none',
    backgroundColor: 'white'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '24px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    color: '#374151',
    marginBottom: '4px',
    fontWeight: '500'
  },
  checkbox: {
    marginRight: '8px'
  },
  editButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    marginLeft: '8px'
  },
  submitButton: (disabled) => ({
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    color: 'white',
    border: 'none',
    backgroundColor: disabled ? '#9ca3af' : '#4f46e5',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: '0.2s background-color'
  }),
  textArea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    resize: 'none',
    height: '96px',
    fontSize: '14px'
  },
  categoriesContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    maxHeight: '160px',
    overflowY: 'auto',
    padding: '8px',
    border: '1px solid #d1d5db',
    borderRadius: '4px'
  },
  emptyState: {
    padding: '16px',
    textAlign: 'center',
    color: '#6b7280'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer'
  },
  categoryStatsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px'
  },
  categoryStatItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryCount: {
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    padding: '4px 8px',
    borderRadius: '4px'
  }
};

// Difficulty level colors
const difficultyStyles = {
  Easy: {
    color: '#065f46',
    bgColor: '#d1fae5'
  },
  Medium: {
    color: '#92400e',
    bgColor: '#fef3c7'
  },
  Hard: {
    color: '#991b1b',
    bgColor: '#fee2e2'
  }
};

// Sample categories
const categories = [
  'Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph', 
  'Dynamic Programming', 'Greedy', 'Binary Search', 'Recursion'
];

// Main App component
const App = () => {
  // State management
  const [problems, setProblems] = useState(() => {
    const savedProblems = localStorage.getItem('leetcodeProblems');
    return savedProblems ? JSON.parse(savedProblems) : [
      { id: 1, number: 1, title: 'Two Sum', difficulty: 'Easy', date: '2025-04-25', notes: 'Used hash map for O(n) solution', categories: ['Array', 'Hash Table'] },
      ];
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedNotes, setSelectedNotes] = useState(null);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  
  // Add new problem
  const [newProblem, setNewProblem] = useState({
    number: '',
    title: '',
    difficulty: 'Medium',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    timeComplexity: '',
    spaceComplexity: '',
    categories: []
  });
  
  // Save to localStorage whenever problems change
  useEffect(() => {
    localStorage.setItem('leetcodeProblems', JSON.stringify(problems));
  }, [problems]);
  
  // Handlers
  const handleAddProblem = () => {
    const problem = {
      ...newProblem,
      id: problems.length > 0 ? Math.max(...problems.map(p => p.id)) + 1 : 1
    };
    
    setProblems([...problems, problem]);
    setShowAddModal(false);
    setNewProblem({
      number: '',
      title: '',
      difficulty: 'Medium',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      categories: []
    });
  };
  
  const handleCategoryToggle = (category) => {
    if (newProblem.categories.includes(category)) {
      setNewProblem({
        ...newProblem,
        categories: newProblem.categories.filter(c => c !== category)
      });
    } else {
      setNewProblem({
        ...newProblem,
        categories: [...newProblem.categories, category]
      });
    }
  };
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Filtering logic
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          problem.number.toString().includes(searchTerm);
    const matchesDifficulty = filterDifficulty === '' || problem.difficulty === filterDifficulty;
    const matchesCategory = filterCategory === '' || problem.categories.includes(filterCategory);
    return matchesSearch && matchesDifficulty && matchesCategory;
  });
  
  // Sorting logic
  const sortedProblems = [...filteredProblems].sort((a, b) => {
    if (sortConfig.key === 'number') {
      return sortConfig.direction === 'asc' ? a.number - b.number : b.number - a.number;
    } else if (sortConfig.key === 'date') {
      return sortConfig.direction === 'asc' 
        ? new Date(a.date) - new Date(b.date) 
        : new Date(b.date) - new Date(a.date);
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });
  
  // Calculate stats
  const stats = {
    total: problems.length,
    easy: problems.filter(p => p.difficulty === 'Easy').length,
    medium: problems.filter(p => p.difficulty === 'Medium').length,
    hard: problems.filter(p => p.difficulty === 'Hard').length,
    categoryCount: {}
  };
  
  problems.forEach(problem => {
    problem.categories.forEach(category => {
      stats.categoryCount[category] = (stats.categoryCount[category] || 0) + 1;
    });
  });
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <h1 style={styles.title}>LeetCode Tracker</h1>
          <div style={styles.buttonsContainer}>
            <button 
              onClick={() => setShowStats(!showStats)}
              style={styles.button}
            >
              <BarChart size={18} style={styles.buttonIcon} /> Stats
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              style={styles.button}
            >
              <Plus size={18} style={styles.buttonIcon} /> Add Problem
            </button>
          </div>
        </div>
      </header>

      <main style={styles.mainContainer}>
        {/* Stats Panel */}
        {showStats && (
          <div style={styles.statsCard}>
            <div style={styles.cardHeader}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Your Progress</h2>
              <button onClick={() => setShowStats(false)} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.statsGrid}>
              <div style={styles.statItem('#f3f4f6')}>
                <p style={styles.statLabel}>Total Problems</p>
                <p style={styles.statValue}>{stats.total}</p>
              </div>
              <div style={styles.statItem('#ecfdf5')}>
                <p style={{ ...styles.statLabel, color: '#065f46' }}>Easy</p>
                <p style={styles.statValue}>{stats.easy}</p>
              </div>
              <div style={styles.statItem('#fffbeb')}>
                <p style={{ ...styles.statLabel, color: '#92400e' }}>Medium</p>
                <p style={styles.statValue}>{stats.medium}</p>
              </div>
              <div style={styles.statItem('#fef2f2')}>
                <p style={{ ...styles.statLabel, color: '#991b1b' }}>Hard</p>
                <p style={styles.statValue}>{stats.hard}</p>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Problems by Category</h3>
              <div style={styles.categoryStatsContainer}>
                {Object.entries(stats.categoryCount)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => (
                    <div key={category} style={styles.categoryStatItem}>
                      <span>{category}</span>
                      <span style={styles.categoryCount}>{count}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Search and filters */}
        <div style={styles.card}>
          <div style={styles.searchContainer}>
            <div style={styles.inputGroup}>
              <Search size={18} style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Search by title or number..."
                style={styles.input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={styles.inputGroup}>
              <Filter size={18} style={styles.inputIcon} />
              <select
                style={styles.select}
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div style={styles.inputGroup}>
              <Filter size={18} style={styles.inputIcon} />
              <select
                style={styles.select}
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {Array.from(new Set(problems.flatMap(p => p.categories))).sort().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Problems Table */}
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableHeaderCell} onClick={() => handleSort('number')}>
                  <div style={styles.tableHeaderContent}>
                    #
                    {sortConfig.key === 'number' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort('title')}>
                  <div style={styles.tableHeaderContent}>
                    Title
                    {sortConfig.key === 'title' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort('difficulty')}>
                  <div style={styles.tableHeaderContent}>
                    Difficulty
                    {sortConfig.key === 'difficulty' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th style={styles.tableHeaderCell} onClick={() => handleSort('date')}>
                  <div style={styles.tableHeaderContent}>
                    Date Solved
                    {sortConfig.key === 'date' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </div>
                </th>
                <th style={styles.tableHeaderCell}>Categories</th>
              </tr>
            </thead>
            <tbody>
              {sortedProblems.length > 0 ? (
                sortedProblems.map(problem => (
                  <tr key={problem.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={styles.tableCell}><strong>{problem.number}</strong></td>
                    <td style={styles.tableCell}>
                    {problem.title}
                    {problem.notes && (
                      <span 
                        style={styles.notesLink}
                        onClick={() => setSelectedNotes(problem)}
                      >
                        View Notes
                      </span>
                    )}
                    </td>
                    <td style={styles.tableCell}>
                      <span style={styles.badge(
                        difficultyStyles[problem.difficulty].color, 
                        difficultyStyles[problem.difficulty].bgColor
                      )}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td style={styles.tableCell}>{problem.date}</td>
                    <td style={styles.tableCell}>
                      <div style={styles.categoryBadgesContainer}>
                        {problem.categories.map(category => (
                          <span key={category} style={styles.badge('#4338ca', '#e0e7ff')}>
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={styles.emptyState}>
                    No problems found. Add your first one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Notes Modal */}
      {selectedNotes && (
          <div style={styles.notesModal}>
            <div style={styles.notesModalContent}>
              <div style={styles.cardHeader}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Notes for Problem #{selectedNotes.number}: {selectedNotes.title}</h2>
                <div style={styles.modalButtonsContainer}>
                  <button 
                    onClick={() => {
                      setIsEditingNotes(false);
                      setSelectedNotes(null);
                    }} 
                    style={styles.closeButton}
                  >
                    <X size={20} />
                  </button>
                  {!isEditingNotes && (
                    <button 
                      onClick={() => setIsEditingNotes(true)} 
                      style={styles.editButton}
                    >
                      Edit Notes
                    </button>
                  )}
                </div>
              </div>
              {isEditingNotes ? (
                <div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Solution Notes</label>
                    <textarea
                      style={{
                        ...styles.textArea,
                        fontFamily: 'monospace',
                        height: '200px'
                      }}
                      value={selectedNotes.notes}
                      onChange={(e) => setSelectedNotes({
                        ...selectedNotes,
                        notes: e.target.value
                      })}
                      placeholder="Describe your approach and solution..."
                    />
                  </div>
                  
                  <div style={styles.complexityContainer}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Time Complexity</label>
                      <input
                        style={styles.input}
                        value={selectedNotes.timeComplexity}
                        onChange={(e) => setSelectedNotes({
                          ...selectedNotes,
                          timeComplexity: e.target.value
                        })}
                        placeholder="e.g., O(n)"
                      />
                    </div>
                    
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Space Complexity</label>
                      <input
                        style={styles.input}
                        value={selectedNotes.spaceComplexity}
                        onChange={(e) => setSelectedNotes({
                          ...selectedNotes,
                          spaceComplexity: e.target.value
                        })}
                        placeholder="e.g., O(1)"
                      />
                    </div>
                  </div>
                  
                  <button
                    style={styles.submitButton(false)}
                    onClick={() => {
                      setProblems(problems.map(p => 
                        p.id === selectedNotes.id ? selectedNotes : p
                      ));
                      setIsEditingNotes(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div>
                  <div style={styles.formattedNotes}>
                    {selectedNotes.notes}
                  </div>
                  
                  <div style={styles.complexityContainer}>
                    <div style={styles.complexityBox}>
                      <div style={styles.complexityLabel}>Time Complexity</div>
                      {selectedNotes.timeComplexity || 'Not specified'}
                    </div>
                    <div style={styles.complexityBox}>
                      <div style={styles.complexityLabel}>Space Complexity</div>
                      {selectedNotes.spaceComplexity || 'Not specified'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      {/* Add Problem Modal */}
      {showAddModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.cardHeader}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Add New Problem</h2>
              <button onClick={() => setShowAddModal(false)} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>
            
            <div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Problem Number</label>
                <input
                  type="number"
                  style={styles.input}
                  value={newProblem.number}
                  onChange={(e) => setNewProblem({...newProblem, number: parseInt(e.target.value) || ''})}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  style={styles.input}
                  value={newProblem.title}
                  onChange={(e) => setNewProblem({...newProblem, title: e.target.value})}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Difficulty</label>
                <select
                  style={styles.select}
                  value={newProblem.difficulty}
                  onChange={(e) => setNewProblem({...newProblem, difficulty: e.target.value})}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Date Solved</label>
                <input
                  type="date"
                  style={styles.input}
                  value={newProblem.date}
                  onChange={(e) => setNewProblem({...newProblem, date: e.target.value})}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Notes</label>
                <textarea
                  style={{
                    ...styles.textArea,
                    fontFamily: 'monospace',
                    tabSize: 2
                  }}
                  value={newProblem.notes}
                  onChange={(e) => setNewProblem({...newProblem, notes: e.target.value})}
                  placeholder="Your approach, time complexity, etc.
              Example format:
              Approach:
              - Used hash map to store complements
              - O(n) time complexity

              Code:
              ```python
              def solution(nums):
                  seen = {}
                  for i, num in enumerate(nums):
                      # your code here
              ```"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Categories</label>
                <div style={styles.categoriesContainer}>
                  {categories.map(category => (
                    <div key={category} style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={newProblem.categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        style={styles.checkbox}
                      />
                      <label htmlFor={`category-${category}`} style={{ fontSize: '14px' }}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleAddProblem}
                disabled={!newProblem.number || !newProblem.title}
                style={styles.submitButton(!newProblem.number || !newProblem.title)}
              >
                Add Problem
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;