import { Component, OnInit, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

// Icons
import { LucideAngularModule, Bell, Search, User, Menu, X, Settings, LogOut, Home, Package, Users, BarChart, Tag, HelpCircle, ChevronRight, CheckCircle, AlertCircle, Info } from 'lucide-angular';

interface MenuItem {
  title: string;
  icon: any;
  route: string;
  badge?: number;
  badgeColor?: string;
}

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  icon: any;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  @ViewChild('sidebar') sidebar: any;
  
  // State
  isSidebarOpen = signal(false);
  isMobileMenuOpen = signal(false);
  currentRoute = signal('/admin/dashboard');
  searchQuery = signal('');
  
  // Admin Stats
  adminStats = signal({
    totalLostItems: 156,
    totalFoundItems: 89,
    pendingLostItems: 12,
    pendingFoundItems: 8,
    totalUsers: 234,
    unreadNotifications: 3,
    resolutionRate: 78,
    avgResponseTime: '2.5h'
  });
  
  // Menu Items
  menuItems = computed<MenuItem[]>(() => [
    { 
      title: 'Dashboard', 
      icon: Home, 
      route: '/admin/dashboard',
      badge: undefined
    },
    { 
      title: 'Lost Items', 
      icon: Package, 
      route: '/admin/items/lost', 
      badge: this.adminStats().pendingLostItems,
      badgeColor: 'bg-red-500'
    },
    { 
      title: 'Found Items', 
      icon: Package, 
      route: '/admin/items/found', 
      badge: this.adminStats().pendingFoundItems,
      badgeColor: 'bg-green-500'
    },
    { 
      title: 'Users', 
      icon: Users, 
      route: '/admin/users'
    },
    { 
      title: 'Reports', 
      icon: BarChart, 
      route: '/admin/reports'
    },
    { 
      title: 'Categories', 
      icon: Tag, 
      route: '/admin/categories'
    },
    { 
      title: 'Settings', 
      icon: Settings, 
      route: '/admin/settings'
    }
  ]);
  
  // Notifications
  notifications = signal<Notification[]>([
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'Item Matched!',
      description: 'Lost wallet matched with found item',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      icon: AlertCircle,
      title: 'Urgent: Expiring Items',
      description: '3 items will be removed in 24 hours',
      time: '15 min ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      icon: Info,
      title: 'New User Registered',
      description: 'John Doe joined the platform',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      icon: CheckCircle,
      title: 'Monthly Report Ready',
      description: 'January report has been generated',
      time: '2 hours ago',
      read: true
    }
  ]);
  
  // Current User
  currentUser = computed(() => ({
    name: 'Alex Johnson',
    email: 'admin@lostfound.com',
    role: 'Administrator',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  }));
  
  // Quick Stats
  quickStats = computed(() => [
    {
      label: 'Today\'s Reports',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: BarChart,
      color: 'bg-blue-500'
    },
    {
      label: 'Response Time',
      value: this.adminStats().avgResponseTime,
      change: '-15%',
      trend: 'down',
      icon: Bell,
      color: 'bg-green-500'
    },
    {
      label: 'Satisfaction',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-500'
    }
  ]);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute.set(event.url);
      this.isSidebarOpen.set(false);
    });
  }

  ngOnInit(): void {
    this.checkMobileView();
    window.addEventListener('resize', () => this.checkMobileView());
  }

  checkMobileView(): void {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    } else {
      this.isSidebarOpen.set(true);
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  getPageTitle(): string {
    const route = this.currentRoute();
    const titles: {[key: string]: string} = {
      '/admin/dashboard': 'Dashboard',
      '/admin/items/lost': 'Lost Items',
      '/admin/items/found': 'Found Items',
      '/admin/users': 'User Management',
      '/admin/reports': 'Reports & Analytics',
      '/admin/categories': 'Categories',
      '/admin/settings': 'Settings'
    };
    return titles[route] || 'Admin Dashboard';
  }

  markNotificationAsRead(id: number): void {
    this.notifications.update(notifications => 
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllNotificationsAsRead(): void {
    this.notifications.update(notifications => 
      notifications.map(n => ({ ...n, read: true }))
    );
  }

  getUnreadNotificationsCount(): number {
    return this.notifications().filter(n => !n.read).length;
  }

  getNotificationIcon(type: string): any {
    switch(type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  }

  getNotificationColor(type: string): string {
    switch(type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'error': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  }
}