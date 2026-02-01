import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, TrendingUp, TrendingDown, Users, Package, CheckCircle, Clock, AlertCircle, BarChart, ArrowUpRight, ArrowDownRight, MoreVertical, Eye, Edit, Trash2, Download } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  // Stats Cards
  stats = signal([
    {
      title: 'Total Lost Items',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'bg-red-500',
      description: 'This month'
    },
    {
      title: 'Total Found Items',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: Package,
      color: 'bg-green-500',
      description: 'This month'
    },
    {
      title: 'Active Users',
      value: '2,345',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
      description: 'Currently online'
    },
    {
      title: 'Resolution Rate',
      value: '78%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-purple-500',
      description: 'Items returned'
    }
  ]);

  // Recent Items
  recentItems = signal([
    {
      id: 1,
      type: 'lost',
      title: 'MacBook Pro 14"',
      category: 'Electronics',
      status: 'pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      date: '15 Jan, 2024',
      location: 'Main Library',
      user: 'John Doe'
    },
    {
      id: 2,
      type: 'found',
      title: 'Student ID Card',
      category: 'Documents',
      status: 'claimed',
      statusColor: 'bg-green-100 text-green-800',
      date: '14 Jan, 2024',
      location: 'Student Center',
      user: 'Jane Smith'
    },
    {
      id: 3,
      type: 'lost',
      title: 'Ray-Ban Sunglasses',
      category: 'Accessories',
      status: 'active',
      statusColor: 'bg-blue-100 text-blue-800',
      date: '14 Jan, 2024',
      location: 'Sports Complex',
      user: 'Mike Johnson'
    },
    {
      id: 4,
      type: 'found',
      title: 'Car Keys with Remote',
      category: 'Keys',
      status: 'pending',
      statusColor: 'bg-yellow-100 text-yellow-800',
      date: '13 Jan, 2024',
      location: 'Parking Lot A',
      user: 'Sarah Wilson'
    },
    {
      id: 5,
      type: 'lost',
      title: 'iPhone 14 Pro Max',
      category: 'Electronics',
      status: 'resolved',
      statusColor: 'bg-green-100 text-green-800',
      date: '12 Jan, 2024',
      location: 'Cafeteria',
      user: 'Robert Brown'
    }
  ]);

  // Recent Activities
  recentActivities = signal([
    {
      id: 1,
      type: 'item_added',
      title: 'New Lost Item Reported',
      description: 'MacBook Pro reported by John Doe',
      time: '2 minutes ago',
      user: 'John Doe',
      icon: Package,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      type: 'item_matched',
      title: 'Item Match Found',
      description: 'Wallet matched with found item',
      time: '15 minutes ago',
      user: 'System',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      type: 'user_registered',
      title: 'New User Registration',
      description: 'Mike Johnson joined the platform',
      time: '1 hour ago',
      user: 'Mike Johnson',
      icon: Users,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 4,
      type: 'item_claimed',
      title: 'Item Successfully Claimed',
      description: 'Student ID claimed by owner',
      time: '3 hours ago',
      user: 'Jane Smith',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 5,
      type: 'report_generated',
      title: 'Monthly Report Generated',
      description: 'January 2024 report created',
      time: '5 hours ago',
      user: 'System',
      icon: BarChart,
      color: 'text-orange-600 bg-orange-50'
    }
  ]);

  // Chart Data
  chartData = signal({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    lost: [12, 19, 8, 15, 12, 18, 14],
    found: [8, 12, 6, 9, 11, 14, 10]
  });

  // Top Categories
  topCategories = signal([
    { name: 'Electronics', count: 56, percentage: 35, color: 'bg-blue-500' },
    { name: 'Documents', count: 42, percentage: 26, color: 'bg-green-500' },
    { name: 'Keys & ID', count: 32, percentage: 20, color: 'bg-purple-500' },
    { name: 'Clothing', count: 18, percentage: 11, color: 'bg-yellow-500' },
    { name: 'Others', count: 12, percentage: 8, color: 'bg-gray-500' }
  ]);

  // Quick Actions
  quickActions = signal([
    {
      title: 'Add Lost Item',
      description: 'Report a new lost item',
      icon: Package,
      color: 'bg-red-500',
      route: '/admin/items/lost'
    },
    {
      title: 'Add Found Item',
      description: 'Report a new found item',
      icon: Package,
      color: 'bg-green-500',
      route: '/admin/items/found'
    },
    {
      title: 'Manage Users',
      description: 'View and manage users',
      icon: Users,
      color: 'bg-blue-500',
      route: '/admin/users'
    },
    {
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: BarChart,
      color: 'bg-purple-500',
      route: '/admin/reports'
    }
  ]);

  ngOnInit(): void {
    // Initialize any data
  }

  getStatusIcon(status: string): any {
    switch(status) {
      case 'pending': return Clock;
      case 'active': return AlertCircle;
      case 'resolved': return CheckCircle;
      case 'claimed': return CheckCircle;
      default: return Package;
    }
  }

  exportReport(): void {
    // Implement export functionality
    console.log('Exporting report...');
  }

  refreshData(): void {
    // Implement refresh functionality
    console.log('Refreshing data...');
  }
}