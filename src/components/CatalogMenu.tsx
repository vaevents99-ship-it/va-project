// src/components/CatalogMenu.tsx
import { useState, useRef, useEffect } from 'react'
import {
  type Category,
  type Subcategory,
  categories,
  birthdaySubcategories,
  corporateSubcategories,
  WEDDING_SUBCATEGORIES,
  GARLAND_SUBCATEGORIES,
} from '../data/catalogData'

interface CatalogMenuProps {
  activeCategory: Category
  activeSubcategory?: Subcategory
  onCategoryChange: (category: Category, subcategory?: Subcategory) => void
}

const CATEGORY_ICONS: Record<Category, string> = {
  'All':                   'layout-grid',
  'Birthday':              'confetti',
  'Wedding & Engagement':  'diamond',
  'Baby Shower':           'baby-carriage',
  'Corporate Events':      'building',
  'Ear Piercing':          'sparkles',
  'House Warming':         'home',
  'Naming Ceremony':       'heart',
  'Puberty':               'flower',
  'Garlands':              'bouquet',
}

const SUBCATEGORY_ICONS: Record<Subcategory, string> = {
  // Birthday
  'Butterfly Theme':          'butterfly',
  'Cartoons Theme':           'mood-happy',
  'Jungle Theme':             'trees',
  'Murugan Theme':            'om',
  'Prince and Queen Theme':   'crown',
  'Space Theme':              'rocket',
  // Corporate
  'Corporate Events':         'briefcase',
  'School or College Events': 'school',
  // Wedding & Engagement
  'Entrance Decor':           'door-enter',
  'Photobooth':               'camera',
  'Reception Decor':          'table',
  'Stage Decor':              'theater',
  'Mandap Decor':             'dome',
  'Table Decor':              'layout-rows',
  'Floral Arrangements':      'flower',
  // Garlands
  'Bridal Veni Flowers':      'rosette',
  'Lotus Garland':            'leaf',
  'Petals Garland':           'cherry',
  'Premium Garlands':         'star',
  'Rose Garland':             'heart',
  'White Garlands':           'snowflake',
}

const SUBCATEGORY_COUNTS: Record<Subcategory, number> = {
  // Birthday
  'Butterfly Theme':          6,
  'Cartoons Theme':           9,
  'Jungle Theme':             7,
  'Murugan Theme':            2,
  'Prince and Queen Theme':   3,
  'Space Theme':              3,
  // Corporate
  'Corporate Events':         2,
  'School or College Events': 4,
  // Wedding & Engagement
  'Entrance Decor':           13,
  'Photobooth':               5,
  'Reception Decor':          4,
  'Stage Decor':              7,
  'Mandap Decor':             0,
  'Table Decor':              0,
  'Floral Arrangements':      0,
  // Garlands
  'Bridal Veni Flowers':      3,
  'Lotus Garland':            4,
  'Petals Garland':           3,
  'Premium Garlands':         4,
  'Rose Garland':             3,
  'White Garlands':           4,
}

const hasDropdown = (cat: Category) =>
  cat === 'Birthday' ||
  cat === 'Corporate Events' ||
  cat === 'Wedding & Engagement' ||
  cat === 'Garlands'

const subcategoriesFor = (cat: Category): Subcategory[] => {
  if (cat === 'Birthday')             return birthdaySubcategories
  if (cat === 'Corporate Events')     return corporateSubcategories
  if (cat === 'Wedding & Engagement') return WEDDING_SUBCATEGORIES
  if (cat === 'Garlands')             return GARLAND_SUBCATEGORIES
  return []
}

export default function CatalogMenu({
  activeCategory,
  activeSubcategory,
  onCategoryChange,
}: CatalogMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<Category | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleCategoryClick = (cat: Category) => {
    if (hasDropdown(cat)) {
      setOpenDropdown(prev => (prev === cat ? null : cat))
    } else {
      setOpenDropdown(null)
      onCategoryChange(cat, undefined)
    }
  }

  const handleSubcategoryClick = (cat: Category, sub: Subcategory) => {
    setOpenDropdown(null)
    onCategoryChange(cat, sub)
  }

  const isTabActive = (cat: Category) => {
    if (cat === 'All') return activeCategory === 'All'
    return activeCategory === cat
  }

  return (
    <div ref={menuRef} style={styles.wrapper}>
      {/* Hide webkit scrollbar for both scrollable rows */}
      <style>{`.cat-scrollable::-webkit-scrollbar { display: none; }`}</style>

      <div
        style={styles.tabBar}
        className="cat-scrollable"
        role="menubar"
        aria-label="Catalog categories"
      >
        {categories.map(cat => {
          const active = isTabActive(cat)
          const dropdown = hasDropdown(cat)
          const isOpen = openDropdown === cat

          return (
            <div key={cat} style={styles.tabItem}>
              <button
                role="menuitem"
                aria-haspopup={dropdown ? 'true' : undefined}
                aria-expanded={dropdown ? isOpen : undefined}
                aria-current={active ? 'page' : undefined}
                style={{
                  ...styles.tabBtn,
                  ...(active ? styles.tabBtnActive : {}),
                }}
                onClick={() => handleCategoryClick(cat)}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  if (!active) el.style.color = 'var(--color-text-primary)'
                  if (!active) el.style.background = 'var(--color-background-secondary)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  if (!active) el.style.color = 'var(--color-text-secondary)'
                  if (!active) el.style.background = 'transparent'
                }}
              >
                <i
                  className={`ti ti-${CATEGORY_ICONS[cat]}`}
                  aria-hidden="true"
                  style={styles.tabIcon}
                />
                <span>{cat}</span>
                {dropdown && (
                  <i
                    className="ti ti-chevron-down"
                    aria-hidden="true"
                    style={{
                      ...styles.chevron,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                )}
              </button>

              {dropdown && isOpen && (
                <div style={styles.dropdown} role="menu" aria-label={`${cat} themes`}>
                  <p style={styles.dropdownLabel}>
                    {cat === 'Birthday'             ? 'Themes'     :
                     cat === 'Wedding & Engagement' ? 'Decor type' :
                     cat === 'Garlands'             ? 'Type'       :
                     'Event type'}
                  </p>
                  {subcategoriesFor(cat).map(sub => {
                    const subActive = activeSubcategory === sub && activeCategory === cat
                    return (
                      <button
                        key={sub}
                        role="menuitem"
                        style={{
                          ...styles.dropdownItem,
                          ...(subActive ? styles.dropdownItemActive : {}),
                        }}
                        onClick={() => handleSubcategoryClick(cat, sub)}
                        onMouseEnter={e => {
                          if (!subActive) {
                            e.currentTarget.style.background = 'var(--color-background-secondary)'
                            e.currentTarget.style.color = 'var(--color-text-primary)'
                          }
                        }}
                        onMouseLeave={e => {
                          if (!subActive) {
                            e.currentTarget.style.background = 'transparent'
                            e.currentTarget.style.color = 'var(--color-text-secondary)'
                          }
                        }}
                      >
                        <i
                          className={`ti ti-${SUBCATEGORY_ICONS[sub]}`}
                          aria-hidden="true"
                          style={styles.dropdownIcon}
                        />
                        <span style={styles.dropdownText}>{sub}</span>
                        {SUBCATEGORY_COUNTS[sub] > 0 && (
                          <span style={styles.countBadge}>
                            {SUBCATEGORY_COUNTS[sub]}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {hasDropdown(activeCategory) && (
        <div
          style={styles.pillRow}
          className="cat-scrollable"
          role="group"
          aria-label="Filter by theme"
        >
          <button
            style={{
              ...styles.pill,
              ...(activeSubcategory === undefined ? styles.pillActive : {}),
            }}
            onClick={() => onCategoryChange(activeCategory, undefined)}
          >
            {activeCategory === 'Corporate Events'      ? 'All events'   :
             activeCategory === 'Wedding & Engagement'  ? 'All decor'    :
             activeCategory === 'Garlands'              ? 'All garlands' :
             'All themes'}
          </button>

          {subcategoriesFor(activeCategory).map(sub => (
            <button
              key={sub}
              style={{
                ...styles.pill,
                ...(activeSubcategory === sub ? styles.pillActive : {}),
              }}
              onClick={() => onCategoryChange(activeCategory, sub)}
            >
              <i
                className={`ti ti-${SUBCATEGORY_ICONS[sub]}`}
                aria-hidden="true"
                style={{ fontSize: 13 }}
              />
              {sub.replace(' Theme', '').replace(' Events', ' Events')}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: 'var(--font-sans, sans-serif)',
    position: 'relative',
  },
  tabBar: {
    display: 'flex',
    flexWrap: 'nowrap',                      // ← no wrapping, scroll instead
    gap: 2,
    overflowX: 'auto',                       // ← horizontal scroll
    scrollbarWidth: 'none' as any,           // ← hide scrollbar Firefox
    msOverflowStyle: 'none' as any,          // ← hide scrollbar IE/Edge
    borderBottom: '0.5px solid var(--color-border-tertiary, #e5e5e5)',
    paddingBottom: 0,
  },
  tabItem: {
    position: 'relative',
    flexShrink: 0,                           // ← prevent tabs from squishing
  },
  tabBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '9px 14px',
    fontSize: 14,
    fontWeight: 400,
    color: 'var(--color-text-secondary)',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s, background 0.15s',
    lineHeight: 1.4,
  },
  tabBtnActive: {
    color: 'var(--color-text-primary)',
    fontWeight: 500,
    borderBottom: '2px solid #7C3AED',
  },
  tabIcon: { fontSize: 15, flexShrink: 0 },
  chevron: {
    fontSize: 13,
    opacity: 0.5,
    transition: 'transform 0.2s',
    marginLeft: 2,
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 1px)',
    left: 0,
    minWidth: 230,
    zIndex: 50,
    background: 'var(--color-background-primary, #fff)',
    border: '0.5px solid var(--color-border-secondary, #d4d4d4)',
    borderRadius: '0 8px 8px 8px',
    padding: '6px 0',
    boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
  },
  dropdownLabel: {
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-text-tertiary)',
    padding: '4px 16px 4px',
    margin: 0,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 16px',
    fontSize: 13,
    color: 'var(--color-text-secondary)',
    background: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'left' as const,
    cursor: 'pointer',
    transition: 'background 0.12s, color 0.12s',
  },
  dropdownItemActive: {
    color: '#7C3AED',
    fontWeight: 500,
  },
  dropdownIcon: { fontSize: 15, flexShrink: 0 },
  dropdownText: { flex: 1 },
  countBadge: {
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--color-text-tertiary)',
    background: 'var(--color-background-tertiary, #f5f5f4)',
    padding: '1px 7px',
    borderRadius: 20,
    marginLeft: 'auto',
  },
  pillRow: {
    display: 'flex',
    flexWrap: 'nowrap',                      // ← no wrapping, scroll instead
    overflowX: 'auto',                       // ← horizontal scroll
    scrollbarWidth: 'none' as any,           // ← hide scrollbar Firefox
    msOverflowStyle: 'none' as any,          // ← hide scrollbar IE/Edge
    gap: 6,
    padding: '12px 2px 4px',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 400,
    color: 'var(--color-text-secondary)',
    background: 'var(--color-background-primary, #fff)',
    border: '0.5px solid var(--color-border-secondary, #d4d4d4)',
    borderRadius: 20,
    cursor: 'pointer',
    transition: 'background 0.12s, color 0.12s, border-color 0.12s',
    whiteSpace: 'nowrap',
    flexShrink: 0,                           // ← prevent pills from squishing
  },
  pillActive: {
    background: '#EDE9FE',
    color: '#6D28D9',
    borderColor: '#C4B5FD',
    fontWeight: 500,
  },
}