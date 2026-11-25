import { useState, useEffect } from 'react';
import './PharmacistNotifications.css';

type NotificationCategory = 'Stock' | 'Compliance' | 'System';
type NotificationType = 'info' | 'warning' | 'compliance' | 'success';

interface NotificationItem {
  id: string;
  category: NotificationCategory;
  type: NotificationType;
  title: string;
  description: string;
  dateTime: string;
  read: boolean;
  actionText?: string;
  actionType?: 'navigate_inventory' | 'open_detail';
  detailData?: {
    medicineName?: string;
    currentBalance?: number;
    threshold?: number;
    lastUpdated?: string;
    alertType?: string;
    inspectorName?: string;
    status?: string;
  };
}

interface PharmacistNotificationsProps {
  onNavigateTab?: (tab: 'dashboard' | 'inventory' | 'sales' | 'reports' | 'notifications') => void;
  onUnreadCountChange?: (count: number) => void;
}

export default function PharmacistNotifications({ onNavigateTab, onUnreadCountChange }: PharmacistNotificationsProps) {
  const [filterCategory, setFilterCategory] = useState<'All' | NotificationCategory>('All');
  const [selectedNotif, setSelectedNotif] = useState<NotificationItem | null>(null);

  // Initialize notifications dynamically based on daily stock submission status
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const isSubmitted = localStorage.getItem('kompounder_daily_stock_submitted') === 'true';
    const lastTime = localStorage.getItem('kompounder_daily_stock_last_time') || '2026-09-01 09:30 AM';

    return [
      isSubmitted
        ? {
            id: 'notif-daily-stock',
            category: 'System',
            type: 'success',
            title: 'Daily stock submitted successfully',
            description: `Today's inventory declaration submitted to Dr. A. K. Sharma (Drugs Inspector, Zone 4).`,
            dateTime: lastTime,
            read: false,
            actionText: 'View Submission',
            actionType: 'open_detail',
            detailData: {
              inspectorName: 'Dr. A. K. Sharma (Zone 4)',
              status: 'Submitted Today',
              lastUpdated: lastTime,
            },
          }
        : {
            id: 'notif-daily-stock',
            category: 'Compliance',
            type: 'warning',
            title: 'Daily stock update pending',
            description: `Today's stock information has not yet been submitted to your assigned Drug Inspector Dr. A. K. Sharma.`,
            dateTime: '2026-09-01 08:00 AM',
            read: false,
            actionText: 'Update Stock',
            actionType: 'navigate_inventory',
            detailData: {
              inspectorName: 'Dr. A. K. Sharma (Zone 4)',
              status: 'Pending',
              lastUpdated: 'Not submitted today',
            },
          },
      {
        id: 'notif-low-stock-fentanyl',
        category: 'Stock',
        type: 'warning',
        title: 'Low stock detected for Fentanyl 50mcg Patch',
        description: 'Current lockbox inventory is 40 units, which is below the recommended threshold of 50 units.',
        dateTime: '2026-09-01 08:15 AM',
        read: false,
        actionText: 'Inspect Item',
        actionType: 'open_detail',
        detailData: {
          medicineName: 'Fentanyl 50mcg Patch',
          currentBalance: 40,
          threshold: 50,
          lastUpdated: '2026-08-20',
          status: 'Low Stock',
        },
      },
      {
        id: 'notif-antibiotic-surge',
        category: 'Compliance',
        type: 'compliance',
        title: 'Antibiotic usage threshold alert',
        description: 'Amoxicillin 500mg recorded +42% usage increase over baseline this week.',
        dateTime: '2026-08-31 05:45 PM',
        read: false,
        actionText: 'Review Trend',
        actionType: 'open_detail',
        detailData: {
          medicineName: 'Amoxicillin 500mg',
          alertType: 'Schedule H1 Distribution Surge',
          currentBalance: 1120,
          threshold: 800,
          status: 'Attention',
        },
      },
      {
        id: 'notif-narcotic-audit',
        category: 'System',
        type: 'info',
        title: 'Narcotic lockbox audit log verified',
        description: 'All 100% of double-lock opioid releases match prescribing doctor credentials.',
        dateTime: '2026-08-31 10:20 AM',
        read: true,
        actionText: 'View Audit Log',
        actionType: 'open_detail',
        detailData: {
          alertType: 'Narcotic Verification Audit',
          inspectorName: 'Dr. A. K. Sharma',
          status: 'Verified',
        },
      },
      {
        id: 'notif-cipro-stock',
        category: 'Stock',
        type: 'info',
        title: 'New stock batch received for Ciprofloxacin 500mg',
        description: 'Batch #CPR-7703 (200 units) successfully added to pharmacy register.',
        dateTime: '2026-08-30 02:30 PM',
        read: true,
        actionText: 'View Batch',
        actionType: 'open_detail',
        detailData: {
          medicineName: 'Ciprofloxacin 500mg',
          currentBalance: 740,
          lastUpdated: '2026-08-30',
          status: 'In Stock',
        },
      },
    ];
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (onUnreadCountChange) {
      onUnreadCountChange(unreadCount);
    }
  }, [unreadCount, onUnreadCountChange]);

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    // Mark as read
    setNotifications(prev =>
      prev.map(n => (n.id === notif.id ? { ...n, read: true } : n))
    );
  };

  const handleActionClick = (e: React.MouseEvent, notif: NotificationItem) => {
    e.stopPropagation();
    handleNotificationClick(notif);

    if (notif.actionType === 'navigate_inventory') {
      if (onNavigateTab) {
        onNavigateTab('inventory');
      }
    } else {
      setSelectedNotif(notif);
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterCategory === 'All') return true;
    return notif.category === filterCategory;
  });

  const getCategoryIcon = (category: NotificationCategory, type: NotificationType) => {
    if (type === 'success') {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    }
    if (category === 'Stock') {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    }
    if (category === 'Compliance') {
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  };

  return (
    <div className="notifications-view-content">
      {/* 1. Page Header */}
      <div className="notifications-view-header">
        <div className="header-left-box">
          <div className="title-row">
            <h2 className="notifications-view-title">Notifications</h2>
            {unreadCount > 0 && (
              <span className="unread-badge-pill">{unreadCount} Unread</span>
            )}
          </div>
          <p className="notifications-view-desc">
            Stay informed about stock updates, dispensing activity, and compliance requirements.
          </p>
        </div>

        <button className="btn btn-outline mark-read-btn" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
          Mark all as read
        </button>
      </div>

      {/* 2. Notification Category Tabs */}
      <div className="notifications-category-bar">
        {(['All', 'Stock', 'Compliance', 'System'] as const).map(cat => (
          <button
            key={cat}
            className={`cat-chip ${filterCategory === cat ? 'active' : ''}`}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Notification List */}
      <div className="notifications-list">
        {filteredNotifications.map(notif => (
          <div
            key={notif.id}
            className={`notification-item-card type-${notif.type} ${notif.read ? 'read' : 'unread'}`}
            onClick={() => handleNotificationClick(notif)}
          >
            <div className="notif-icon-col">
              <span className="notif-icon">{getCategoryIcon(notif.category, notif.type)}</span>
              {!notif.read && <span className="unread-dot"></span>}
            </div>

            <div className="notif-content-col">
              <div className="notif-top-row">
                <h4 className="notif-title">{notif.title}</h4>
                <div className="notif-meta-tags">
                  <span className={`category-tag tag-${notif.category.toLowerCase()}`}>{notif.category}</span>
                  <span className="notif-time">{notif.dateTime}</span>
                </div>
              </div>

              <p className="notif-desc">{notif.description}</p>

              {notif.actionText && (
                <div className="notif-action-row">
                  <button
                    className={`btn-notif-action btn-${notif.type}`}
                    onClick={e => handleActionClick(e, notif)}
                  >
                    {notif.actionText} →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="empty-notifications-card">
            <p>No notifications found in {filterCategory} category.</p>
          </div>
        )}
      </div>

      {/* 4. Notification Detail Modal */}
      {selectedNotif && (
        <div className="modal-overlay" onClick={() => setSelectedNotif(null)}>
          <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <div className="modal-header">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <h3 className="modal-title">{selectedNotif.title}</h3>
                <span className={`status-badge tag-${selectedNotif.category.toLowerCase()}`} style={{ marginTop: '4px', display: 'inline-block' }}>
                  {selectedNotif.category} Alert
                </span>
              </div>
            </div>

            <div className="notif-detail-body">
              <p className="detail-desc">{selectedNotif.description}</p>

              <div className="detail-meta-grid">
                <div className="meta-card">
                  <span className="meta-label">Date &amp; Time</span>
                  <span className="meta-val font-semibold">{selectedNotif.dateTime}</span>
                </div>

                {selectedNotif.detailData?.medicineName && (
                  <div className="meta-card">
                    <span className="meta-label">Related Medicine</span>
                    <span className="meta-val font-semibold">{selectedNotif.detailData.medicineName}</span>
                  </div>
                )}

                {selectedNotif.detailData?.currentBalance !== undefined && (
                  <div className="meta-card">
                    <span className="meta-label">Current Balance</span>
                    <span className="meta-val font-bold text-primary">{selectedNotif.detailData.currentBalance} units</span>
                  </div>
                )}

                {selectedNotif.detailData?.threshold !== undefined && (
                  <div className="meta-card">
                    <span className="meta-label">Threshold Limit</span>
                    <span className="meta-val font-semibold text-warning">{selectedNotif.detailData.threshold} units</span>
                  </div>
                )}

                {selectedNotif.detailData?.inspectorName && (
                  <div className="meta-card" style={{ gridColumn: 'span 2' }}>
                    <span className="meta-label">Assigned Drug Inspector</span>
                    <span className="meta-val font-semibold">{selectedNotif.detailData.inspectorName}</span>
                  </div>
                )}

                {selectedNotif.detailData?.status && (
                  <div className="meta-card">
                    <span className="meta-label">Current Status</span>
                    <span className="meta-val font-bold text-success">{selectedNotif.detailData.status}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => setSelectedNotif(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
