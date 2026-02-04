
import React from 'react';
import { 
  ShoppingCart, 
  Shield, 
  Zap, 
  Layout, 
  Database, 
  Smartphone, 
  Globe, 
  Cpu 
} from 'lucide-react';
import { Category, Tag, Template } from './types';

export const CATEGORIES: Category[] = [
  { id: 1, name: "E-Commerce", icon: ShoppingCart, subcategories: ["Checkout", "Inventory", "Payments"] },
  { id: 2, name: "FinTech", icon: Shield, subcategories: ["Banking", "Trading", "Compliance"] },
  { id: 3, name: "Performance", icon: Zap, subcategories: ["Load Testing", "Stress", "Lighthouse"] },
  { id: 4, name: "UI/UX", icon: Layout, subcategories: ["Visual Regression", "Accessibility", "SEO"] },
  { id: 5, name: "Backend & API", icon: Database, subcategories: ["REST", "GraphQL", "gRPC"] },
  { id: 6, name: "Mobile", icon: Smartphone, subcategories: ["iOS", "Android", "Cross-Platform"] },
  { id: 7, name: "Web App", icon: Globe, subcategories: ["SaaS", "Dashboard", "Landing Page"] },
  { id: 8, name: "Cloud Native", icon: Cpu, subcategories: ["Kubernetes", "AWS", "Serverless"] }
];

export const POPULAR_TAGS: Tag[] = [
  { id: 1, name: "Selenium" },
  { id: 2, name: "Cypress" },
  { id: 3, name: "API" },
  { id: 4, name: "Security" },
  { id: 5, name: "Regression" },
  { id: 6, name: "Mobile" },
  { id: 7, name: "Sanity" },
  { id: 8, name: "JMeter" },
  { id: 9, name: "Load Testing" },
  { id: 10, name: "Appium" }
];

export const TEMPLATES: Template[] = [
  {
    id: 101,
    title: "E-commerce Checkout Flow",
    description: "Complete end-to-end verification of guest and user checkout, including payment gateway mocks.",
    longDescription: "This suite covers everything from cart addition to final payment confirmation. It includes specific edge cases like coupon application, invalid card details, and session timeouts.",
    author: "Sarah_QA_Lead",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    categoryId: 1,
    tags: ["Regression", "Selenium", "Payment"],
    stats: { stars: 1240, clones: 856, views: 3400 },
    price: "Free",
    updatedAt: "2 days ago"
  },
  {
    id: 102,
    title: "Banking API Security Suite",
    description: "OWASP Top 10 vulnerability checks for RESTful banking APIs. Includes SQLi and XSS payloads.",
    longDescription: "A specialized suite for high-security environments. It automates testing for authentication bypass, insecure direct object references, and data exposure.",
    author: "CyberSec_Mike",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    categoryId: 2,
    tags: ["Security", "API", "OWASP"],
    stats: { stars: 3200, clones: 1500, views: 8900 },
    price: "Premium",
    updatedAt: "1 week ago"
  },
  {
    id: 103,
    title: "High Load Stress Test",
    description: "JMeter configuration for simulating 10k concurrent users on login endpoints.",
    author: "DevOps_Dave",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dave",
    categoryId: 3,
    tags: ["Load Testing", "JMeter"],
    stats: { stars: 450, clones: 120, views: 900 },
    price: "Free",
    updatedAt: "3 days ago"
  },
  {
    id: 104,
    title: "Mobile App Login Sanity",
    description: "Basic sanity checks for iOS and Android login screens using Appium.",
    author: "Mobile_Lisa",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    categoryId: 6,
    tags: ["Mobile", "Sanity", "Appium"],
    stats: { stars: 890, clones: 430, views: 2100 },
    price: "Free",
    updatedAt: "5 hours ago"
  },
  {
    id: 105,
    title: "GDPR Compliance Check",
    description: "Automated verification of user data deletion and export requests.",
    author: "Privacy_Guard",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guard",
    categoryId: 2,
    tags: ["Legal", "Compliance"],
    stats: { stars: 670, clones: 220, views: 1500 },
    price: "Free",
    updatedAt: "1 month ago"
  },
  {
    id: 106,
    title: "Microservices Inter-comm",
    description: "Contract testing between Gateway and User microservices using Pact.",
    author: "System_Arch",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arch",
    categoryId: 5,
    tags: ["Backend", "Pact", "API"],
    stats: { stars: 540, clones: 180, views: 1100 },
    price: "Premium",
    updatedAt: "2 weeks ago"
  }
];
