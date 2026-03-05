# Phase 1 API Structure - Customer Enhancement

**Implementation Target**: Week 1-2 of Phase 1  
**Core Functionality**: Customer management, contacts, and basic interactions

## 🗂️ API Endpoint Structure

### **Customer Management**
```
GET    /api/customers                    # List customers with filtering
GET    /api/customers/[id]               # Get customer details + contacts + interactions
PUT    /api/customers/[id]               # Update customer information
POST   /api/customers/[id]/convert       # Convert prospect → customer
DELETE /api/customers/[id]               # Soft delete customer (admin only)

# Customer search and filtering
GET    /api/customers?type=CUSTOMER      # Filter by customer type
GET    /api/customers?source=WEBSITE     # Filter by lead source
GET    /api/customers?search=company     # Search by name/company/email
GET    /api/customers?industry=tech      # Filter by industry
```

### **Customer Contacts**
```
GET    /api/customers/[id]/contacts        # List customer contacts
POST   /api/customers/[id]/contacts        # Add new contact
GET    /api/customers/[id]/contacts/[contactId] # Get contact details
PUT    /api/customers/[id]/contacts/[contactId] # Update contact
DELETE /api/customers/[id]/contacts/[contactId] # Remove contact

# Contact management
POST   /api/customers/[id]/contacts/[contactId]/primary    # Set as primary
POST   /api/customers/[id]/contacts/[contactId]/roles      # Update roles
```

### **Customer Interactions**
```
GET    /api/customers/[id]/interactions    # List interactions for customer
POST   /api/customers/[id]/interactions    # Log new interaction
GET    /api/interactions/[id]              # Get interaction details
PUT    /api/interactions/[id]              # Update interaction
DELETE /api/interactions/[id]              # Delete interaction

# Interaction management
GET    /api/interactions/upcoming          # Scheduled interactions
GET    /api/interactions/overdue           # Overdue follow-ups
POST   /api/interactions/[id]/complete     # Mark interaction completed
POST   /api/interactions/[id]/reschedule   # Reschedule interaction
```

### **Customer Tags**
```
GET    /api/customers/[id]/tags           # Get customer tags
POST   /api/customers/[id]/tags           # Add tag to customer
DELETE /api/customers/[id]/tags/[tagId]   # Remove tag from customer

# Tag management
GET    /api/tags                          # List all tags (admin)
POST   /api/tags                          # Create new tag type (admin)
PUT    /api/tags/[id]                     # Update tag (admin)
```

### **Analytics & Dashboards**
```
GET    /api/dashboard/customers           # Customer dashboard data
GET    /api/analytics/customers           # Customer analytics
GET    /api/analytics/interactions        # Interaction statistics
GET    /api/analytics/pipeline            # Basic pipeline metrics
```

---

## 📁 File Structure

### **API Routes** (`/pages/api/`)
```
api/
├── customers/
│   ├── index.ts                      # GET /api/customers
│   ├── [id]/
│   │   ├── index.ts                  # GET/PUT /api/customers/[id]
│   │   ├── convert.ts                # POST /api/customers/[id]/convert
│   │   ├── contacts/
│   │   │   ├── index.ts              # Customer contacts CRUD
│   │   │   └── [contactId]/
│   │   │       ├── index.ts          # Individual contact management
│   │   │       ├── primary.ts        # Set primary contact
│   │   │       └── roles.ts          # Update contact roles
│   │   ├── interactions/
│   │   │   └── index.ts              # Customer interactions
│   │   └── tags/
│   │       ├── index.ts              # Customer tags
│   │       └── [tagId].ts            # Remove tag
├── interactions/
│   ├── index.ts                      # Global interaction queries
│   ├── [id]/
│   │   ├── index.ts                  # GET/PUT/DELETE interaction
│   │   ├── complete.ts               # Mark completed
│   │   └── reschedule.ts             # Reschedule
│   ├── upcoming.ts                   # Upcoming interactions
│   └── overdue.ts                    # Overdue follow-ups
├── tags/
│   ├── index.ts                      # Global tag management
│   └── [id].ts                       # Individual tag operations
├── dashboard/
│   └── customers.ts                  # Customer dashboard data
└── analytics/
    ├── customers.ts                  # Customer analytics
    ├── interactions.ts               # Interaction statistics
    └── pipeline.ts                   # Pipeline metrics
```

### **TypeScript Types** (`/types/`)
```
types/
├── customer.ts                       # Customer-related types
├── interaction.ts                    # Interaction types
├── contact.ts                        # Contact types
├── tag.ts                           # Tag types
└── api.ts                           # API response types
```

### **Database Operations** (`/lib/`)
```
lib/
├── database/
│   ├── customers.ts                  # Customer database operations
│   ├── contacts.ts                   # Contact database operations
│   ├── interactions.ts               # Interaction database operations
│   └── tags.ts                       # Tag database operations
├── utils/
│   ├── validation.ts                 # Input validation schemas
│   ├── auth.ts                       # Authentication helpers
│   └── formatters.ts                 # Data formatting utilities
└── analytics/
    ├── customers.ts                  # Customer analytics calculations
    └── interactions.ts               # Interaction analytics
```

---

## 🔧 Implementation Plan

### **Week 1: Database & Core APIs**

#### **Days 1-2: Database Setup**
- [ ] Configure DATABASE_URL for development
- [ ] Run Prisma migration: `npx prisma migrate dev --name add_customer_enhancement`
- [ ] Test database changes with sample data
- [ ] Verify all relationships work correctly

#### **Days 3-4: Core Customer APIs**
- [ ] Implement `/api/customers` (list, search, filter)
- [ ] Implement `/api/customers/[id]` (get, update)
- [ ] Implement customer type conversion
- [ ] Add input validation and error handling

#### **Day 5: Contact Management APIs**
- [ ] Implement `/api/customers/[id]/contacts` (CRUD)
- [ ] Add contact role management
- [ ] Implement primary contact designation
- [ ] Test contact relationships

### **Week 2: Interactions & Frontend**

#### **Days 6-7: Interaction APIs**
- [ ] Implement `/api/customers/[id]/interactions` (CRUD)
- [ ] Add interaction scheduling and completion
- [ ] Implement follow-up tracking
- [ ] Add overdue interaction queries

#### **Days 8-9: Tag System & Analytics**
- [ ] Implement customer tagging system
- [ ] Add tag management APIs
- [ ] Create basic dashboard data API
- [ ] Implement customer analytics

#### **Day 10: Testing & Documentation**
- [ ] Comprehensive API testing
- [ ] Error handling verification
- [ ] API documentation
- [ ] Performance optimization

---

## 📋 TypeScript Type Definitions

### **Customer Types**
```typescript
// types/customer.ts
import { User, CompanySize, LeadSource, CustomerType, PreferredContact } from '@prisma/client'

export interface EnhancedCustomer extends User {
  companyName?: string
  jobTitle?: string
  phone?: string
  website?: string
  industry?: string
  companySize?: CompanySize
  leadSource?: LeadSource
  customerType: CustomerType
  lifetimeValue?: number
  lastContactDate?: Date
  preferredContact: PreferredContact
  timezone?: string
  notes?: string
  
  // Relations
  contacts: CustomerContact[]
  interactions: CustomerInteraction[]
  tags: CustomerTag[]
  
  // Computed fields
  totalOrders?: number
  totalRevenue?: number
  lastInteractionDate?: Date
  interactionCount?: number
}

export interface CustomerListItem {
  id: string
  name: string
  email: string
  companyName?: string
  customerType: CustomerType
  lastContactDate?: Date
  lifetimeValue?: number
  interactionCount: number
  tags: { tag: string; color: string }[]
}

export interface CustomerFilters {
  search?: string
  type?: CustomerType
  source?: LeadSource
  industry?: string
  hasContacts?: boolean
  hasInteractions?: boolean
  tags?: string[]
}
```

### **Contact Types**
```typescript
// types/contact.ts
import { CustomerContact } from '@prisma/client'

export interface CustomerContactWithInteractions extends CustomerContact {
  interactions: CustomerInteraction[]
  interactionCount: number
  lastInteractionDate?: Date
}

export interface ContactRole {
  isPrimary: boolean
  isDecisionMaker: boolean
  isTechnical: boolean
  isBilling: boolean
}
```

### **Interaction Types**
```typescript
// types/interaction.ts
import { CustomerInteraction, InteractionType } from '@prisma/client'

export interface InteractionWithDetails extends CustomerInteraction {
  customer: {
    id: string
    name: string
    companyName?: string
  }
  contact?: {
    id: string
    fullName: string
    jobTitle?: string
  }
}

export interface InteractionFilters {
  customerId?: string
  type?: InteractionType
  dateFrom?: Date
  dateTo?: Date
  followUpOverdue?: boolean
  completed?: boolean
}
```

---

## ✅ Success Criteria

### **Week 1 Completion**
- [ ] Database migration successfully applied
- [ ] All customer APIs functional and tested
- [ ] Contact management working
- [ ] Basic interaction logging operational
- [ ] Data validation and error handling complete

### **Week 2 Completion**
- [ ] Full interaction management system
- [ ] Customer tagging and organization
- [ ] Dashboard data APIs ready
- [ ] Customer analytics calculations
- [ ] System ready for frontend development

### **Quality Checkpoints**
- [ ] All APIs return consistent response formats
- [ ] Input validation prevents invalid data
- [ ] Error messages are clear and actionable
- [ ] Performance is acceptable with sample data
- [ ] Security and authentication properly implemented

---

## 🚀 Next Steps

1. **Configure DATABASE_URL** in `.env.local`
2. **Run database migration** to apply schema changes
3. **Begin API development** starting with core customer endpoints
4. **Test iteratively** with Postman or similar tools
5. **Document as we build** for frontend integration

**This API structure provides the foundation for a professional customer management system that scales with business growth.**